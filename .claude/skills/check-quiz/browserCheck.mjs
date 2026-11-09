// ヘッドレス Chrome（なければ Edge）を DevTools Protocol で操作して、クイズアプリを一通り動作確認する
// 使い方: node browserCheck.mjs <index.htmlのパス> <スクリーンショット保存先フォルダ>
// 外部パッケージは使わない（Node.js 22 以降の組み込み WebSocket / fetch を使う）
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const [htmlArg, shotArg] = process.argv.slice(2);
if (!htmlArg) {
  console.error("使い方: node browserCheck.mjs <index.htmlのパス> <スクリーンショット保存先フォルダ>");
  process.exit(2);
}
const htmlPath = resolve(htmlArg);
const shotDir = resolve(shotArg || join(tmpdir(), "quiz-check-screenshots"));
mkdirSync(shotDir, { recursive: true });

const browserCandidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium"
];
const browserPath = browserCandidates.find((path) => existsSync(path));
if (!browserPath) {
  console.error("NG  Chrome / Edge が見つからないため、ブラウザ確認ができません");
  process.exit(2);
}

const port = 9300 + Math.floor(Math.random() * 500);
const profileDir = mkdtempSync(join(tmpdir(), "quiz-check-profile-"));
const browser = spawn(browserPath, [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`,
  "--no-first-run", "--no-default-browser-check", "about:blank"
], { stdio: "ignore" });

const wait = (ms) => new Promise((done) => setTimeout(done, ms));

// 終了時にブラウザを閉じ、このスクリプトが作った一時プロファイルだけを片付ける
async function shutdown(code) {
  browser.kill();
  await wait(800);
  try { rmSync(profileDir, { recursive: true, force: true }); } catch { /* 片付けに失敗しても確認結果には影響しない */ }
  process.exit(code);
}

let targets;
for (let i = 0; i < 50 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await wait(200); }
}
if (!targets) {
  console.error("NG  ブラウザに接続できませんでした");
  await shutdown(2);
}
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((done) => ws.addEventListener("open", done));

let msgId = 0;
const pending = new Map();
const consoleProblems = [];
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
  if (msg.method === "Runtime.exceptionThrown") consoleProblems.push("例外: " + (msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text));
  if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) consoleProblems.push(msg.params.type + ": " + msg.params.args.map((a) => a.value ?? a.description).join(" "));
  if (msg.method === "Log.entryAdded" && ["error", "warning"].includes(msg.params.entry.level)) consoleProblems.push("log " + msg.params.entry.level + ": " + msg.params.entry.text);
});
const send = (method, params = {}) => new Promise((done) => { const id = ++msgId; pending.set(id, done); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => {
  const res = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (res.result.exceptionDetails) throw new Error(res.result.exceptionDetails.exception?.description ?? res.result.exceptionDetails.text);
  return res.result.result.value;
};
const screenshots = [];
const screenshot = async (name) => {
  const res = await send("Page.captureScreenshot", { format: "png" });
  const path = join(shotDir, `${name}.png`);
  writeFileSync(path, Buffer.from(res.result.data, "base64"));
  screenshots.push(path);
};

const results = [];
const check = (label, ok, detail = "") => results.push({ ok, text: `${ok ? "OK " : "NG "} ${label}${detail ? " … " + detail : ""}` });

// 1問ぶん回答する（correct=true なら正解を、false なら不正解を選ぶ）。「次へ」は押さない
const answerJs = (correct) => `(() => {
  const q = activeQuestions[currentIndex];
  const buttons = [...document.querySelectorAll(".choice-button")];
  const target = buttons.find((b) => (Number(b.dataset.choiceIndex) === q.answer) === ${correct});
  const info = {
    count: buttons.length,
    unique: new Set(buttons.map((b) => b.textContent)).size,
    question: document.querySelector("#question").textContent,
    progress: document.querySelector("#progress").textContent,
    correctPos: buttons.findIndex((b) => Number(b.dataset.choiceIndex) === q.answer)
  };
  target.click();
  info.allDisabled = buttons.every((b) => b.disabled);
  info.feedback = document.querySelector("#feedback").textContent;
  info.nextVisible = !document.querySelector("#next-button").hidden;
  info.nextLabel = document.querySelector("#next-button").textContent;
  info.hasCorrectMark = buttons.some((b) => b.classList.contains("correct"));
  info.hasWrongMark = buttons.some((b) => b.classList.contains("wrong"));
  return info;
})()`;
const clickNext = () => evaluate(`document.querySelector("#next-button").click()`);
const state = () => evaluate(`({
  quiz: !document.querySelector("#quiz-screen").hidden,
  result: !document.querySelector("#result-screen").hidden,
  score: document.querySelector("#score").textContent,
  retryVisible: !document.querySelector("#retry-wrong-button").hidden,
  total: activeQuestions.length
})`);

try {
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Page.enable");
  // スマホ幅（375px）で表示する
  await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: pathToFileURL(htmlPath).href });
  await wait(1500);

  // --- 1回目：10問を交互に正解・不正解で回答 ---
  const firstSet = await evaluate(`activeQuestions.map((q) => q.question)`);
  check("開始時に10問が選ばれている", firstSet.length === 10, `${firstSet.length}問`);
  check("10問に重複がない", new Set(firstSet).size === firstSet.length);
  await screenshot("3-question");

  const positions = [];
  for (let i = 0; i < firstSet.length; i++) {
    const correct = i % 2 === 0;
    const info = await evaluate(answerJs(correct));
    positions.push(info.correctPos);
    const feedbackOk = correct ? info.feedback.includes("正解！") : info.feedback.includes("正解は「");
    const ok = info.count === 4 && info.unique === 4 && info.question.trim() !== ""
      && info.progress === `第${i + 1}問 / 全${firstSet.length}問`
      && info.allDisabled && feedbackOk && info.nextVisible && info.hasCorrectMark && (correct || info.hasWrongMark);
    check(`第${i + 1}問（${correct ? "正解" : "不正解"}を選択）`, ok, ok ? "" : JSON.stringify(info));
    if (i === 1) await screenshot("1-feedback-wrong");
    if (i === firstSet.length - 1) check("最後の問題でボタンが「結果を見る」", info.nextLabel === "結果を見る", info.nextLabel);
    await clickNext();
  }

  let s = await state();
  check("結果画面が表示される", s.result && !s.quiz);
  check("スコアが「10問中5問正解」", s.score === "10問中5問正解", s.score);
  check("「間違えた問題を解く」ボタンが表示される", s.retryVisible);
  await screenshot("2-result");

  // --- 間違えた問題を解く：全問正解する ---
  await evaluate(`document.querySelector("#retry-wrong-button").click()`);
  s = await state();
  check("「間違えた問題を解く」で間違えた5問だけ出題される", s.quiz && s.total === 5, `${s.total}問`);
  for (let i = 0; i < s.total; i++) { await evaluate(answerJs(true)); await clickNext(); }
  s = await state();
  check("やり直し後のスコアが「5問中5問正解」", s.score === "5問中5問正解", s.score);
  check("全問正解時は「間違えた問題を解く」が隠れる", !s.retryVisible);

  // --- もう一度最初から：新しく10問がランダムに選ばれる ---
  await evaluate(`document.querySelector("#restart-button").click()`);
  s = await state();
  const secondSet = await evaluate(`activeQuestions.map((q) => q.question)`);
  check("「もう一度最初から」で10問から再スタート", s.quiz && s.total === 10, `${s.total}問`);
  check("出題される問題が前回と変わる（ランダム選出）", JSON.stringify(firstSet) !== JSON.stringify(secondSet));

  // 正解の位置のばらつきを集計する（選択肢シャッフルの確認）
  for (let round = 0; round < 3; round++) {
    const total = (await state()).total;
    for (let i = 0; i < total; i++) { positions.push((await evaluate(answerJs(true))).correctPos); await clickNext(); }
    await evaluate(`document.querySelector("#restart-button").click()`);
  }
  const dist = [0, 0, 0, 0];
  positions.forEach((p) => { if (p >= 0) dist[p]++; });
  check("正解の位置が1〜4番目にばらつく（選択肢シャッフル）", dist.every((n) => n > 0), `1番目:${dist[0]} 2番目:${dist[1]} 3番目:${dist[2]} 4番目:${dist[3]}`);

  const overflow = await evaluate(`document.documentElement.scrollWidth > window.innerWidth`);
  check("スマホ幅(375px)で横にはみ出さない", !overflow);
} catch (error) {
  check("テストを最後まで実行できた", false, error.message);
}

check("コンソールにエラー・警告がない", consoleProblems.length === 0, consoleProblems.join(" / "));

console.log(`使用ブラウザ: ${browserPath}`);
console.log(results.map((r) => r.text).join("\n"));
console.log("\nスクリーンショット:\n" + screenshots.join("\n"));
const ngCount = results.filter((r) => !r.ok).length;
console.log(ngCount === 0 ? "\n結果: すべてOK" : `\n結果: NG ${ngCount}件`);
ws.close();
await shutdown(ngCount === 0 ? 0 : 1);
