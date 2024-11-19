'use client'
let data;
let readerText = null
let delayTime,
  index = Number();
index = 0;
let selectedString,
  no_words,
  fontSet,
  fontSize,
  wording,
  stringArr = [],
  playPauseFlag = 0,
  setWordLimit = Number();
function dragElement(e) {
  var t = 0,
    o = 0,
    n = 0,
    l = 0;
  function r(e) {
    (e = e || window.event).preventDefault(),
      (n = e.clientX),
      (l = e.clientY),
      (document.onmouseup = d),
      (document.onmousemove = i);
  }
  function i(r) {
    (r = r || window.event).preventDefault(),
      (t = n - r.clientX),
      (o = l - r.clientY),
      (n = r.clientX),
      (l = r.clientY),
      (e.style.top = e.offsetTop - o + "px"),
      (e.style.left = e.offsetLeft - t + "px");
  }
  function d() {
    (document.onmouseup = null), (document.onmousemove = null);
  }
  document.getElementById(e.id + "header")
    ? (document.getElementById(e.id + "header").onmousedown = r)
    : (e.onmousedown = r);
}
function changeColor() {
  "green" != document.getElementById("lbthchange").style.color || playPauseFlag
    ? ((playPauseFlag = 0),
      (document.getElementById("lbthchange").style.color = "green"),
      (document.getElementById("lbthchange").innerHTML = "Start"))
    : ((playPauseFlag = 1),
      showWords(),
      (document.getElementById("lbthchange").style.color = "red"),
      (document.getElementById("lbthchange").innerHTML = "Stop"));
}
function createOption(e) {
  let t = document.createElement("option");
  return (t.value = e), (t.innerText = e), t;
}
const createPopupOnScreen = (e) => {
  var t = document.getElementById("lbth_main");
  t.style.display = "block"
  let o = document.getElementById("lbthSelectorId");
  for (let e = 2; e <= 8; e++) {
    let t = createOption(100 * e);
    o.append(t);
  }
  no_words = document.getElementById("no_words");
  for (let e = 1; e <= 8; e++) {
    let t = createOption(e);
    no_words.append(t);
  }
  fontSet = document.getElementById("fontSize");
  for (let e = 4; e <= 20; e++) {
    let t = createOption(5 * e);
    fontSet.append(t);
  }
  const localTime = JSON.parse(localStorage.getItem("setTime"))
  dragElement(document.getElementById("lbthmydiv")),
    (document.getElementById("lbthchange").onclick = changeColor),
    document.getElementById("lbthchange").click(),
    (document.getElementById("lbthSelectorId").onchange = (e) => {
      let t = e.target.value;
      localStorage.setItem("setTime", JSON.stringify(t)),
        (delayTime = calLoopTime(t));
    }),
    document
      .getElementById("removePopup")
      .addEventListener("click", () => {
        (index = 0),
          (stringArr = []),
          sleep(1e3).then((e) => {
          }),
          document.getElementById("lbth_main").style.display = "none";
      }),
    (document.getElementById("undoImg").src = "https://d3jrelxj5ogq5g.cloudfront.net/webapp/lexical-editor/arrow-counterclockwise.svg"),
    (document.getElementById("redoImg").src = "https://d3jrelxj5ogq5g.cloudfront.net/webapp/lexical-editor/arrow-clockwise.svg"),
    // (document.getElementById("closePopup").src = "/images/minimize.png"),
    // (document.getElementById("removePopup").src = "/images/close.png"),
    (document.getElementById("closePopup").style.cursor = "pointer"),
    (document.getElementById("removePopup").style.cursor = "pointer"),
    (selectedString = window.getSelection().toString() || readerText.toString()),

    (() => {
      localTime?.setTime && localTime.setTime
        ? setTimeout(() => {
          (document.getElementById("lbthSelectorId").value =
            localTime.setTime),
            (delayTime = calLoopTime(Number(e.setTime)));
        }, 1e3)
        : ((delayTime = calLoopTime(200)));
    })(),
    (stringArr = stringBreak(selectedString)),
    showWords(),
    (document.getElementById("undoImg").onclick = () =>
      timeChange("back")),
    (document.getElementById("redoImg").onclick = () =>
      timeChange("forward"));
  const localFont = JSON.parse(localStorage.getItem("font"));
  const localWord = JSON.parse(localStorage.getItem("wordLimit"));
  (() => {
    localFont?.font && localFont.font
      && setTimeout(() => {
        (document.getElementById("myTextModalLabel").style.fontSize =
          localFont.font + "px"),
          (fontSet.value = e.font);
      }, 1e3);
  })(),
    (() => {
      localWord?.wordLimit && localWord.wordLimit
        && setTimeout(() => {
          (setWordLimit = localWord.wordLimit), (no_words.value = localWord.wordLimit);
        }, 1e3);
    })();
  // }
}
function sleep(e) {
  return new Promise((t) => setTimeout(t, e));
}

const stringBreak = (e) => {
  let t = e.split(" "),
    o = [];
  return (
    t.forEach((e) => {
      e && o.push(e);
    }),
    o
  );
};
function calLoopTime(e) {
  return 1e3 / (e / 60);
}
async function showWords() {
  (document.getElementById("lbthmydivheader").style.maxHeight = "250px"),
    (document.getElementById("lbthmydivheader").style.minHeight = "250px"),
    (document.getElementById("lbthmydivheader").style.padding = "25px"),
    (document.getElementById("lbthmydivheader").style.overflowY = "auto"),
    checkWordLimit();
  let e = [];
  if (
    ((e = stringArr.slice(index, index + setWordLimit)),
      (data = e.join(" ")),
      (document.getElementById("myTextModalLabel").innerHTML = data),
      await sleep(delayTime),
      (index += setWordLimit),
      index < stringArr.length && playPauseFlag)
  )
    showWords();
  else if (index >= stringArr.length) {
    document.querySelector("#lbth_main") &&
      (index = 0),
      (stringArr = []),
      await sleep(1e3),
      document.getElementById("lbth_main").style.display = "none"
  }
}
function timeChange(e) {
  const t = e;
  var o = index,
    n = delayTime * o;
  if (("back" === t)) {
    const e = delayTime * o;
    (n -= 1e4),
      -1 === Math.sign(n)
        ? (
          (index = 0),
          (data = stringArr[index]),
          (document.getElementById("myTextModalLabel").innerHTML = data))
        : (
          (index = Math.floor((n * o) / e)),
          (data = stringArr[index]),
          (document.getElementById("myTextModalLabel").innerHTML = data));
  } else if ("forward" === t) {
    const e = delayTime * o;
    (n += 1e4),
      n > delayTime * stringArr.length
        ? ((index = stringArr.length - 1),
          (data = stringArr[index]),
          (document.getElementById("myTextModalLabel").innerHTML = data))
        : n < delayTime * stringArr.length &&
        ((index = Math.floor((n * o) / e)),
          (data = stringArr[index]),
          (document.getElementById("myTextModalLabel").innerHTML = data)
        );
  }
}
function checkWordLimit() {
  (setWordLimit = Number(no_words.value)),
    (wording = Number(no_words.value)),
    localStorage.setItem("wordLimit", JSON.stringify(wording)),
    (
      (no_words.value = wording)
    ),
    (fontSize = Number(fontSet.value)),
    (document.getElementById("myTextModalLabel").style.fontSize =
      fontSize + "px"),
    localStorage.setItem("font", JSON.stringify(60));
}

export const speedRead = (text) => {
  readerText = text;
  if(window.getSelection() || readerText){
    createPopupOnScreen();
  }
}