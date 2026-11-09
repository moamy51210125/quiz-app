// 問題データ（answer は choices の中の正解のインデックス）
const questions = [
  {
    question: "日本で一番高い山はどれ？",
    choices: ["北岳", "富士山", "槍ヶ岳", "奥穂高岳"],
    answer: 1,
    explanation: "富士山の標高は3,776mで、日本で一番高い山です。"
  },
  {
    question: "1ダースは何個？",
    choices: ["10個", "12個", "20個", "24個"],
    answer: 1,
    explanation: "1ダースは12個です。"
  },
  {
    question: "太陽系で一番大きい惑星はどれ？",
    choices: ["地球", "土星", "木星", "海王星"],
    answer: 2,
    explanation: "太陽系で一番大きい惑星は木星です。"
  },
  {
    question: "うるう年ではない年（平年）の1年は何日？",
    choices: ["360日", "364日", "365日", "366日"],
    answer: 2,
    explanation: "平年は365日、うるう年は366日です。"
  },
  {
    question: "1気圧のもとで、水が沸騰するのはおよそ何℃？",
    choices: ["50℃", "80℃", "100℃", "120℃"],
    answer: 2,
    explanation: "1気圧のもとで、水はおよそ100℃で沸騰します。"
  },
  {
    question: "国会議事堂がある都道府県はどこ？",
    choices: ["大阪府", "京都府", "神奈川県", "東京都"],
    answer: 3,
    explanation: "国会議事堂は東京都千代田区永田町にあります。"
  },
  {
    question: "1時間は何秒？",
    choices: ["600秒", "1,800秒", "3,600秒", "6,000秒"],
    answer: 2,
    explanation: "60秒 × 60分 = 3,600秒です。"
  },
  {
    question: "日本で一般的に、虹は何色といわれている？",
    choices: ["5色", "6色", "7色", "8色"],
    answer: 2,
    explanation: "日本では、虹は一般的に7色といわれています。"
  },
  {
    question: "歩行者用の信号で「止まれ」を表す色は？",
    choices: ["青", "黄", "赤", "白"],
    answer: 2,
    explanation: "歩行者用の信号では、赤が「止まれ」を表します。"
  },
  {
    question: "日本で、1年のうち昼の時間が最も長い日を何という？",
    choices: ["春分", "夏至", "秋分", "冬至"],
    answer: 1,
    explanation: "昼の時間が最も長い日は夏至、最も短い日は冬至です。"
  },
  {
    question: "1週間は何日？",
    choices: ["5日", "6日", "7日", "8日"],
    answer: 2,
    explanation: "1週間は月曜日から日曜日までの7日です。"
  },
  {
    question: "日本の都道府県はいくつある？",
    choices: ["43", "45", "47", "49"],
    answer: 2,
    explanation: "日本の都道府県は、1都1道2府43県の合計47です。"
  },
  {
    question: "日本で一番面積が大きい都道府県はどこ？",
    choices: ["岩手県", "北海道", "長野県", "福島県"],
    answer: 1,
    explanation: "日本で一番面積が大きい都道府県は北海道です。"
  },
  {
    question: "日本で一番長い川はどれ？",
    choices: ["利根川", "石狩川", "信濃川", "北上川"],
    answer: 2,
    explanation: "日本で一番長い川は信濃川で、長さは367kmです。"
  },
  {
    question: "日本で一番大きい湖はどれ？",
    choices: ["霞ヶ浦", "琵琶湖", "猪苗代湖", "浜名湖"],
    answer: 1,
    explanation: "日本で一番大きい湖は、滋賀県にある琵琶湖です。"
  },
  {
    question: "太陽系で、太陽に一番近い惑星はどれ？",
    choices: ["金星", "地球", "火星", "水星"],
    answer: 3,
    explanation: "太陽に一番近い惑星は水星です。"
  },
  {
    question: "1kmは何m？",
    choices: ["10m", "100m", "1,000m", "10,000m"],
    answer: 2,
    explanation: "1kmは1,000mです。"
  },
  {
    question: "三角形の3つの角の大きさをたすと、何度になる？",
    choices: ["90度", "180度", "270度", "360度"],
    answer: 1,
    explanation: "三角形の内角の和は、どんな三角形でも180度です。"
  },
  {
    question: "オリンピックのシンボルマークには、輪がいくつある？",
    choices: ["3つ", "4つ", "5つ", "6つ"],
    answer: 2,
    explanation: "オリンピックのシンボルマークは、5つの輪でできています。"
  },
  {
    question: "日本の国会は、衆議院と何でできている？",
    choices: ["参議院", "貴族院", "最高裁判所", "内閣"],
    answer: 0,
    explanation: "日本の国会は、衆議院と参議院の二院制です。"
  },
  {
    question: "1気圧のもとで、水が凍り始めるのは何℃？",
    choices: ["-10℃", "0℃", "4℃", "10℃"],
    answer: 1,
    explanation: "1気圧のもとで、水は0℃で凍り始めます。"
  },
  {
    question: "サッカーで、1チームが試合中にフィールドに出られる人数は？",
    choices: ["9人", "10人", "11人", "12人"],
    answer: 2,
    explanation: "サッカーは、ゴールキーパーを含めて1チーム11人でプレーします。"
  },
  {
    question: "野球で、守備につく1チームの人数は？",
    choices: ["7人", "8人", "9人", "11人"],
    answer: 2,
    explanation: "野球の守備は、ピッチャーやキャッチャーを含めて9人です。"
  },
  {
    question: "全身に血液を送り出す臓器はどれ？",
    choices: ["肺", "心臓", "胃", "肝臓"],
    answer: 1,
    explanation: "心臓がポンプのように動いて、血液を全身に送り出しています。"
  },
  {
    question: "ひな祭り（桃の節句）は何月何日？",
    choices: ["1月7日", "3月3日", "5月5日", "7月7日"],
    answer: 1,
    explanation: "ひな祭り（桃の節句）は3月3日です。"
  },
  {
    question: "国民の祝日「こどもの日」は何月何日？",
    choices: ["3月3日", "4月29日", "5月5日", "11月3日"],
    answer: 2,
    explanation: "こどもの日は5月5日です。"
  },
  {
    question: "1世紀は何年？",
    choices: ["10年", "50年", "100年", "1,000年"],
    answer: 2,
    explanation: "1世紀は100年です。"
  },
  {
    question: "光の三原色に入っていない色はどれ？",
    choices: ["赤", "緑", "青", "黄"],
    answer: 3,
    explanation: "光の三原色は赤・緑・青です。"
  },
  {
    question: "日本の国鳥はどれ？",
    choices: ["ツル", "キジ", "スズメ", "トキ"],
    answer: 1,
    explanation: "日本の国鳥はキジです。"
  },
  {
    question: "日本で現在発行されているお札のうち、一番金額が大きいものは？",
    choices: ["二千円札", "五千円札", "一万円札", "十万円札"],
    answer: 2,
    explanation: "現在発行されているお札で一番金額が大きいのは一万円札です。"
  }
];

// 1回に出題する問題数
const questionsPerRound = 10;

// 画面の要素
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const progressEl = document.querySelector("#progress");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const feedbackEl = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const scoreEl = document.querySelector("#score");
const resultMessageEl = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");
const retryWrongButton = document.querySelector("#retry-wrong-button");

// 進行状況
let activeQuestions = []; // 今回出題する問題の一覧
let wrongQuestions = []; // 今回間違えた問題の一覧
let currentIndex = 0;
let score = 0;

// 配列をランダムに並べかえた新しい配列を返す（元の配列は変えない）
function shuffle(list) {
  const shuffled = [...list];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

// 全問題からランダムに出題数ぶんを選ぶ
function pickRandomQuestions() {
  return shuffle(questions).slice(0, questionsPerRound);
}

// 指定した問題の一覧でクイズを始める
function startQuiz(questionList) {
  activeQuestions = questionList;
  wrongQuestions = [];
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

// 現在の問題を表示する
function showQuestion() {
  const current = activeQuestions[currentIndex];

  progressEl.textContent = `第${currentIndex + 1}問 / 全${activeQuestions.length}問`;
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.hidden = true;

  choicesEl.replaceChildren();
  // 正解の位置がかたよらないよう、選択肢の順番を毎回シャッフルする
  const shuffledIndexes = shuffle(current.choices.map((_, index) => index));
  shuffledIndexes.forEach((choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = current.choices[choiceIndex];
    button.dataset.choiceIndex = String(choiceIndex);
    button.addEventListener("click", () => selectAnswer(choiceIndex));
    choicesEl.appendChild(button);
  });
}

// 選択肢ボタンに赤い〇／×の印を付ける
function addMark(button, mark) {
  const markEl = document.createElement("span");
  markEl.className = "choice-mark";
  markEl.textContent = mark;
  markEl.setAttribute("aria-label", mark === "〇" ? "正解" : "不正解");
  button.appendChild(markEl);
}

// 選択肢が選ばれたときの処理
function selectAnswer(selectedIndex) {
  const current = activeQuestions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-button");
  const isCorrect = selectedIndex === current.answer;

  // 回答後はボタンを押せなくし、正解と選んだ答えに色を付ける
  buttons.forEach((button) => {
    const index = Number(button.dataset.choiceIndex);
    button.disabled = true;
    if (index === current.answer) {
      button.classList.add("correct");
      addMark(button, "〇");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
      addMark(button, "×");
    }
  });

  if (isCorrect) {
    score++;
    feedbackEl.textContent = `⭕ 正解！ ${current.explanation}`;
    feedbackEl.classList.add("correct");
  } else {
    wrongQuestions.push(current);
    feedbackEl.textContent = `❌ 不正解… 正解は「${current.choices[current.answer]}」。${current.explanation}`;
    feedbackEl.classList.add("wrong");
  }

  const isLast = currentIndex === activeQuestions.length - 1;
  nextButton.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
  nextButton.focus();
}

// 次の問題へ進む（最後なら結果を表示）
function goNext() {
  currentIndex++;
  if (currentIndex < activeQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 結果を表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const total = activeQuestions.length;
  scoreEl.textContent = `${total}問中${score}問正解`;

  let message;
  if (score === total) {
    message = "全問正解！すばらしい！";
  } else if (score >= total / 2) {
    message = `よくできました！間違えた問題は${wrongQuestions.length}問です。`;
  } else {
    message = `もう一度チャレンジしてみよう！間違えた問題は${wrongQuestions.length}問です。`;
  }
  resultMessageEl.textContent = message;

  // 間違えた問題がないときは「間違えた問題を解く」を出さない
  retryWrongButton.hidden = wrongQuestions.length === 0;
}

nextButton.addEventListener("click", goNext);
restartButton.addEventListener("click", () => startQuiz(pickRandomQuestions()));
retryWrongButton.addEventListener("click", () => startQuiz([...wrongQuestions]));

startQuiz(pickRandomQuestions());
