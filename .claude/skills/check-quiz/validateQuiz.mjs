// クイズアプリの構文・問題データ・書き方のルールを確認する
// 使い方: node validateQuiz.mjs <アプリのフォルダ>
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import vm from "node:vm";

const appDir = process.argv[2];
if (!appDir) {
  console.error("使い方: node validateQuiz.mjs <アプリのフォルダ>");
  process.exit(2);
}

const results = [];
const check = (label, ok, detail = "") => results.push({ ok, text: `${ok ? "OK " : "NG "} ${label}${detail ? " … " + detail : ""}` });

// 3ファイルがそろっているか
for (const name of ["index.html", "style.css", "script.js"]) {
  check(`${name} がある`, existsSync(join(appDir, name)));
}

const scriptPath = join(appDir, "script.js");
if (existsSync(scriptPath)) {
  // 構文チェック
  try {
    execFileSync(process.execPath, ["--check", scriptPath], { stdio: "pipe" });
    check("script.js に構文エラーがない", true);
  } catch (error) {
    check("script.js に構文エラーがない", false, String(error.stderr).trim());
  }

  const source = readFileSync(scriptPath, "utf8");

  // 書き方のルール（CLAUDE.md）
  const forbidden = [
    [/\bvar\s/, "var"],
    [/innerHTML/, "innerHTML"],
    [/getElementById|getElementsBy/, "getElementById / getElementsBy*"]
  ];
  for (const [pattern, label] of forbidden) {
    const lines = source.split("\n").map((line, i) => (pattern.test(line) ? i + 1 : 0)).filter(Boolean);
    check(`${label} を使っていない`, lines.length === 0, lines.length ? `${lines.join(", ")}行目` : "");
  }

  // 問題データを取り出して検証する
  const match = source.match(/const questions = (\[[\s\S]*?\n\]);/);
  if (!match) {
    check("問題データ（const questions = [...]）が見つかる", false);
  } else {
    let questions;
    try {
      questions = vm.runInNewContext(`(${match[1]})`);
    } catch (error) {
      check("問題データを読み込める", false, error.message);
    }
    if (questions) {
      check("問題が30問ある", questions.length === 30, `${questions.length}問`);
      const duplicated = questions.length - new Set(questions.map((q) => q.question)).size;
      check("問題文が重複していない", duplicated === 0, duplicated ? `${duplicated}件重複` : "");
      questions.forEach((q, i) => {
        const problems = [];
        if (typeof q.question !== "string" || !q.question.trim()) problems.push("問題文がない");
        if (!Array.isArray(q.choices) || q.choices.length !== 4) problems.push("選択肢が4つでない");
        else if (new Set(q.choices).size !== 4) problems.push("選択肢が重複している");
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) problems.push("正解番号が0〜3でない");
        if (typeof q.explanation !== "string" || !q.explanation.trim()) problems.push("解説がない");
        if (problems.length) check(`${i + 1}問目「${q.question}」`, false, problems.join("・"));
      });
      if (questions.every((q) => Array.isArray(q.choices) && q.choices.length === 4 && Number.isInteger(q.answer) && q.explanation)) {
        check("全問が4択で、正解番号・解説がそろっている", true);
      }
    }
  }
}

console.log(results.map((r) => r.text).join("\n"));
const ngCount = results.filter((r) => !r.ok).length;
console.log(ngCount === 0 ? "\n結果: すべてOK" : `\n結果: NG ${ngCount}件`);
process.exit(ngCount === 0 ? 0 : 1);
