const questions = [
  {
    question: "ホウセンカのたねをまいたあと、はじめに出てくる葉を何という？",
    choices: ["子葉", "花びら", "根", "実"],
    answer: 0,
    explanation: "たねからはじめに出てくる葉は子葉です。"
  },
  {
    question: "植物が大きく育つために、土の中から根が取り入れるものはどれ？",
    choices: ["水", "日光", "風", "音"],
    answer: 0,
    explanation: "根は土の中から水を取り入れます。"
  },
  {
    question: "植物の葉に日光がよく当たると、どうなる？",
    choices: ["育ちやすくなる", "すぐに石になる", "根がなくなる", "たねに戻る"],
    answer: 0,
    explanation: "多くの植物は、日光を受けて育ちます。"
  },
  {
    question: "アゲハチョウのたまごから、次にうまれるものはどれ？",
    choices: ["さなぎ", "幼虫", "成虫", "花"],
    answer: 1,
    explanation: "アゲハチョウは、たまご→幼虫→さなぎ→成虫の順に育ちます。"
  },
  {
    question: "チョウの幼虫が成虫になる前に、動かずにすごす時期を何という？",
    choices: ["子葉", "さなぎ", "たね", "根"],
    answer: 1,
    explanation: "幼虫の次はさなぎになり、そのあと成虫になります。"
  },
  {
    question: "バッタの育ち方で、たまごからかえったばかりのものは何に似ている？",
    choices: ["小さなバッタ", "チョウのさなぎ", "魚", "花"],
    answer: 0,
    explanation: "バッタは、たまごから成虫に似た形の幼虫がかえります。"
  },
  {
    question: "かげができるのは、光がどう進むから？",
    choices: ["まっすぐ進むから", "曲がって進むから", "音になるから", "消えてしまうから"],
    answer: 0,
    explanation: "光はまっすぐ進み、ものにさえぎられるとかげができます。"
  },
  {
    question: "太陽の光をさえぎると、地面にできるものはどれ？",
    choices: ["かげ", "磁石", "音", "電気"],
    answer: 0,
    explanation: "光がものにさえぎられると、その反対側にかげができます。"
  },
  {
    question: "鏡に太陽の光を当ててはね返すと、光はどうなる？",
    choices: ["別の向きに進む", "水に変わる", "音になる", "その場で止まる"],
    answer: 0,
    explanation: "鏡に当たった光は反射して、別の向きに進みます。"
  },
  {
    question: "虫めがねで太陽を見てもよい？",
    choices: ["よい", "目をいためるので見てはいけない", "夜だけならよい", "片目ならよい"],
    answer: 1,
    explanation: "虫めがねを通して太陽を見ると目をいためるので、絶対に見てはいけません。"
  },
  {
    question: "磁石の同じ極どうしを近づけると、どうなる？",
    choices: ["しりぞけ合う", "引き合う", "くっついて一つになる", "光る"],
    answer: 0,
    explanation: "磁石の同じ極どうしは、しりぞけ合います。"
  },
  {
    question: "磁石のちがう極どうしを近づけると、どうなる？",
    choices: ["しりぞけ合う", "引き合う", "音が出る", "色が変わる"],
    answer: 1,
    explanation: "磁石のちがう極どうしは、引き合います。"
  },
  {
    question: "方位磁針の色のついた針が指す方角はどれ？",
    choices: ["北", "南", "東", "西"],
    answer: 0,
    explanation: "方位磁針の色のついた針は、北の方角を指します。"
  },
  {
    question: "磁石につくものはどれ？",
    choices: ["鉄のくぎ", "木のえんぴつ", "紙", "ガラスのコップ"],
    answer: 0,
    explanation: "鉄は磁石につきます。木や紙、ガラスはつきません。"
  },
  {
    question: "電気を通すものはどれ？",
    choices: ["金ぞくのスプーン", "紙の皿", "木のぼう", "プラスチックの下じき"],
    answer: 0,
    explanation: "金ぞくは電気を通します。紙・木・プラスチックなどは電気を通しません。"
  },
  {
    question: "豆電球をつけるには、電池と豆電球をどうつなぐ？",
    choices: ["電気の通り道を輪のようにつなぐ", "片方だけつなぐ", "紙で包む", "水に入れる"],
    answer: 0,
    explanation: "電池から出た電気が通る道を輪のようにつなぐと、豆電球がつきます。"
  },
  {
    question: "こん虫のからだは、いくつの部分に分かれている？",
    choices: ["3つ", "2つ", "4つ", "5つ"],
    answer: 0,
    explanation: "こん虫のからだは、頭・むね・はらの3つの部分に分かれています。"
  },
  {
    question: "豆電球がつかないとき、まず確かめることとしてよいのはどれ？",
    choices: ["つなぎ方が輪になっているか", "部屋の色", "紙の大きさ", "時計の時こく"],
    answer: 0,
    explanation: "電気の通り道が切れていると豆電球はつきません。つなぎ方を確かめましょう。"
  },
  {
    question: "音が出ているものにさわると、どんなことが多い？",
    choices: ["ふるえている", "凍っている", "磁石になっている", "光っている"],
    answer: 0,
    explanation: "音が出ているものは、ふるえていることが多いです。"
  },
  {
    question: "太鼓を強くたたくと、音の大きさはどうなる？",
    choices: ["大きくなる", "小さくなる", "変わらない", "聞こえなくなる"],
    answer: 0,
    explanation: "太鼓を強くたたくと、ふるえが大きくなり、音も大きくなります。"
  },
  {
    question: "音が伝わるとき、音を出したものから何が広がっていく？",
    choices: ["ふるえ", "砂", "磁力", "影"],
    answer: 0,
    explanation: "音は、もののふるえがまわりに伝わって聞こえます。"
  },
  {
    question: "同じ大きさのねん土を丸めたものと平らにしたもの。重さはどうなる？",
    choices: ["同じ", "丸めたほうが重い", "平らなほうが重い", "形で重さはなくなる"],
    answer: 0,
    explanation: "形を変えても、ねん土の量が同じなら重さは同じです。"
  },
  {
    question: "ものの重さをはかる道具はどれ？",
    choices: ["はかり", "温度計", "方位磁針", "虫めがね"],
    answer: 0,
    explanation: "ものの重さは、はかりを使ってはかります。"
  },
  {
    question: "風の力を受けて進む乗りものはどれ？",
    choices: ["ヨット", "地下鉄", "エレベーター", "自転車"],
    answer: 0,
    explanation: "ヨットは、帆で風を受けて水の上を進みます。"
  },
  {
    question: "うちわで風を送ると、紙の車はどうなる？",
    choices: ["動き出す", "必ず重くなる", "磁石につく", "水に変わる"],
    answer: 0,
    explanation: "風が紙の車を押すので、車は動きます。"
  },
  {
    question: "ゴムを引っぱって手をはなすと、ゴムはどうなる？",
    choices: ["もとの形にもどろうとする", "鉄になる", "光を出す", "水にとける"],
    answer: 0,
    explanation: "引っぱられたゴムには、もとの形にもどろうとする力があります。"
  },
  {
    question: "次のうち、こん虫はどれ？",
    choices: ["トンボ", "クモ", "ダンゴムシ", "ミミズ"],
    answer: 0,
    explanation: "トンボは、からだが頭・むね・はらに分かれていて、あしが6本あるこん虫です。クモ（あしが8本）やダンゴムシ、ミミズはこん虫ではありません。"
  },
  {
    question: "太陽はどちらからのぼる？",
    choices: ["東", "西", "南", "北"],
    answer: 0,
    explanation: "太陽は東からのぼり、西にしずみます。"
  },
  {
    question: "晴れた日に、太陽の位置とかげの向きにはどんな関係がある？",
    choices: ["かげは太陽と反対側にできる", "かげは太陽と同じ場所にできる", "かげはいつも北だけにできる", "かげはできない"],
    answer: 0,
    explanation: "かげは、光をさえぎるものをはさんで太陽と反対側にできます。"
  },
  {
    question: "こん虫のあしは、からだのどこに何本ついている？",
    choices: ["むねに6本", "はらに6本", "頭に8本", "むねに8本"],
    answer: 0,
    explanation: "こん虫のあしは6本で、すべてむねについています。"
  }
];

const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const progressEl = document.querySelector("#progress");
const progressBarEl = document.querySelector("#progress-bar");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const feedbackEl = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const scoreEl = document.querySelector("#score");
const resultMessageEl = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");
const retryWrongButton = document.querySelector("#retry-wrong-button");

let activeQuestions = [];
let wrongQuestions = [];
let currentIndex = 0;
let score = 0;

function shuffleQuestions(questionList) {
  const shuffled = [...questionList];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function startQuiz(questionList) {
  activeQuestions = questionList;
  wrongQuestions = [];
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

function showQuestion() {
  const current = activeQuestions[currentIndex];
  progressEl.textContent = `第${currentIndex + 1}問 / 全${activeQuestions.length}問`;
  progressBarEl.style.width = `${(currentIndex / activeQuestions.length) * 100}%`;
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.hidden = true;
  choicesEl.replaceChildren();

  // 正解の位置がかたよらないよう、選択肢の順番を毎回シャッフルする
  const shuffledIndexes = shuffleQuestions(current.choices.map((_, index) => index));
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

function selectAnswer(selectedIndex) {
  const current = activeQuestions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-button");
  const isCorrect = selectedIndex === current.answer;

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
    feedbackEl.textContent = `正解！ ${current.explanation}`;
    feedbackEl.classList.add("correct");
  } else {
    wrongQuestions.push(current);
    feedbackEl.textContent = `おしい！正解は「${current.choices[current.answer]}」。${current.explanation}`;
    feedbackEl.classList.add("wrong");
  }

  const isLast = currentIndex === activeQuestions.length - 1;
  nextButton.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
  nextButton.focus();
}

function goNext() {
  currentIndex++;
  if (currentIndex < activeQuestions.length) {
    showQuestion();
    return;
  }
  showResult();
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  progressBarEl.style.width = "100%";

  const total = activeQuestions.length;
  scoreEl.textContent = `${total}問中${score}問正解`;

  if (score === total) {
    resultMessageEl.textContent = "全問正解！理科はかせだね！";
  } else if (score >= total / 2) {
    resultMessageEl.textContent = `よくできました！間違えた問題は${wrongQuestions.length}問です。`;
  } else {
    resultMessageEl.textContent = `もう一度チャレンジしてみよう！間違えた問題は${wrongQuestions.length}問です。`;
  }

  retryWrongButton.hidden = wrongQuestions.length === 0;
}

nextButton.addEventListener("click", goNext);
restartButton.addEventListener("click", () => startQuiz(shuffleQuestions(questions).slice(0, 10)));
retryWrongButton.addEventListener("click", () => startQuiz([...wrongQuestions]));

startQuiz(shuffleQuestions(questions).slice(0, 10));
