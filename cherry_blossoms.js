const bgm = new Audio("bgm.mp3");
bgm.loop = true; // ตั้งค่าให้เพลงเล่นวนลูปไปเรื่อยๆ
bgm.volume = 0.5; // ปรับความดัง (0.0 ถึง 1.0)

const clickSound = new Audio("Click.mp3");
clickSound.volume = 0.4;

const state = {
  Sakura: 0,
  clickPowerLuv: 1,
  autoPowerLuv: 0,
  clickUpgradeCost: 10,
  autoUpgradeCost: 25,
  CherryBlossoms: 50,
};

const sakuraCount = document.getElementById("Sakura-count");
const clickPower = document.getElementById("click-power");
const autoPower = document.getElementById("auto-power");
const sakuraBnt = document.getElementById("btn-sakura");
const buyClickButton = document.getElementById("click-Upgrade");
const buyAutoButton = document.getElementById("click-autoUpgrade");
const buySakuraButton = document.getElementById("click-Sakura");
const displayText = document.getElementById("text-display");

function render() {
  sakuraCount.textContent = `Sakura: ${state.Sakura}`;
  if (state.Sakura >= 50) {
    displayText.textContent = "もう少し頑張ってみて。!";
    displayText.style.background = "white";
    displayText.style.borderRadius = "50px";
  } else if (state.Sakura >= 20) {
    displayText.textContent = "それは素晴らしい。!";
    displayText.style.background = "white";
    displayText.style.borderRadius = "50px";
  } else {
    displayText.style.background = "transparent";
    displayText.textContent = "";
  }

  clickPower.textContent = `Click powerLuv: ${state.clickPowerLuv}`;

  autoPower.textContent = `Auto ClickLuv: ${state.autoPowerLuv} / sec`;

  buyClickButton.textContent = `Buy click upgrade (${state.clickUpgradeCost})`;

  buyAutoButton.textContent = `Buy auto clicker (${state.autoUpgradeCost})`;

  buySakuraButton.textContent = `Buy sakura (${state.CherryBlossoms})`;

  buyClickButton.disabled = state.Sakura < state.clickUpgradeCost;

  buyAutoButton.disabled = state.Sakura < state.autoUpgradeCost;

  buySakuraButton.disabled = state.Sakura < state.CherryBlossoms;
}

function createSakura() {
  const petal = document.createElement("div");
  petal.className =
    "fixed pointer-events-none z-[999] text-pink-400 select-none transition-all duration-300 ease-linear opacity-0";
  petal.innerHTML = "🌸";

  const startLeft = Math.random() * 100;
  petal.style.left = startLeft + "vw";
  petal.style.top = "-5vh";
  petal.style.fontSize = Math.random() * 10 + 15 + "px";

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.classList.replace("opacity-0", "opacity-100");
    petal.style.top = "110vh"; // ให้ร่วงลงไปล่างจอ
    petal.style.left = startLeft + (Math.random() * 20 - 10) + "vw"; // ให้ร่วงแบบเฉียงๆ นิดหน่อย
    petal.style.transform = `rotate(${Math.random() * 360}deg)`; // หมุนดอกไม้ตอนร่วง
    petal.style.transitionDuration = Math.random() * 3 + 2 + "s"; // สุ่มความเร็ว 2-5 วินาที
  }, 100);

  setTimeout(() => {
    petal.remove();
  }, 5000);
}

sakuraBnt.addEventListener("click", () => {
  state.Sakura += state.clickPowerLuv;
  clickSound.currentTime = 0;
  clickSound.play();
  render();
});

buyClickButton.addEventListener("click", () => {
  if (state.Sakura < state.clickUpgradeCost) {
    return;
  }

  state.Sakura -= state.clickUpgradeCost;
  state.clickPowerLuv += 1;
  state.clickUpgradeCost += 10;

  render();
});

buyAutoButton.addEventListener("click", () => {
  if (state.Sakura < state.autoUpgradeCost) {
    return;
  }

  state.Sakura -= state.autoUpgradeCost;
  state.autoPowerLuv += 1;
  state.autoUpgradeCost += 20;

  render();
});

window.setInterval(() => {
  state.Sakura += state.autoPowerLuv;
  render();
}, 1000);

render();

buySakuraButton.addEventListener("click", () => {
  // เช็คว่ามี Sakura พอซื้อไหม (ราคาคือ CherryBlossoms: 50)
  if (state.Sakura >= state.CherryBlossoms) {
    state.Sakura -= state.CherryBlossoms;
    bgm.play();

    // เริ่มทำงาน: เสกดอกไม้ร่วงทุกๆ 0.3 วินาที
    setInterval(createSakura, 300);

    buySakuraButton.Sakura -= state.CherryBlossoms;
    state.CherryBlossoms += 20;
  }
});
render();
