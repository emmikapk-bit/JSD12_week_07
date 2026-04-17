const state = {
  Sakura: 0,
  clickPowerLuv: 1,
  autoPowerLuv: 0,
  clickUpgradeCost: 10,
  autoUpgradeCost: 25,
};

const sakuraCount = document.getElementById("Sakura-count");
const clickPower = document.getElementById("click-power");
const autoPower = document.getElementById("auto-power");
const sakuraBnt = document.getElementById("btn-sakura");
const buyClickButton = document.getElementById("click-Upgrade");
const buyAutoButton = document.getElementById("click-autoUpgrade");
const displayText = document.getElementById("text-display");

function render() {
  sakuraCount.textContent = `Sakura: ${state.Sakura}`;

  clickPower.textContent = `Click powerLuv: ${state.clickPowerLuv}`;

  autoPower.textContent = `Auto ClickLuv: ${state.autoPowerLuv} / sec`;

  buyClickButton.textContent = `Buy click upgrade (${state.clickUpgradeCost})`;

  buyAutoButton.textContent = `Buy auto clicker (${state.autoUpgradeCost})`;

  buyClickButton.disabled = state.Sakura < state.clickUpgradeCost;

  buyAutoButton.disabled = state.Sakura < state.autoUpgradeCost;
}

sakuraBnt.addEventListener("click", () => {
  state.Sakura += state.clickPowerLuv;
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
