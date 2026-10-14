// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Cookie Clicker Square Edition";

//images
const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const counterText = document.createElement("p");
counterText.textContent = "Cookies: 0";

// Update Display
function updateDisplay() {
  counterText.textContent = `Cookies: ${Math.floor(cookieCount)}`;
  upgradeClickerButton.disabled = cookieCount < clickerUpgradeCost;
  upgradeAutoClickerButton.disabled = cookieCount < autoClickerUpgradeCost;
}

// Update Growth Rate
let cookiesPerSecond = 0;
function addGrowth(amount: number) {
  cookiesPerSecond += amount;
  updateDisplay();
}

// Timed Growth
let lastFrameTime = performance.now(); // Time stamp of previous frame
function tick(now: number) {
  const elapsedTime = (now - lastFrameTime) / 1000; // time (sec) between frames
  lastFrameTime = now;
  cookieCount += cookiesPerSecond * elapsedTime;
  updateDisplay();

  requestAnimationFrame(tick); // inside: schedules the next frame
}
requestAnimationFrame(tick); // outsite: starts the loop

//Clicker Section
let cookieCount = 0;
image.addEventListener("click", () => {
  cookieCount += cookiesPerClick;
  updateDisplay();
});

// Upgrade Section

//Click Upgrade
let clickerUpgradeCost = 20;
let cookiesPerClick = 1;
const upgradeClickerButton = document.createElement("button");
upgradeClickerButton.disabled = true;
upgradeClickerButton.textContent = "Upgrade Clicker Cost: 20 Cookies";
upgradeClickerButton.addEventListener("click", () => {
  if (cookieCount >= clickerUpgradeCost) {
    cookieCount -= clickerUpgradeCost;
    cookiesPerClick++;
    clickerUpgradeCost += 15;

    upgradeClickerButton.textContent =
      `Upgrade Clicker Cost: ${clickerUpgradeCost} Cookies`;
    updateDisplay();
  }
});

//AutoClicker Upgrade
let autoClickerUpgradeCost = 40;
const upgradeAutoClickerButton = document.createElement("button");
upgradeAutoClickerButton.disabled = true;
upgradeAutoClickerButton.textContent = "Upgrade AutoClicker Cost: 40 Cookies";
upgradeAutoClickerButton.addEventListener("click", () => {
  if (cookieCount >= autoClickerUpgradeCost) {
    cookieCount -= autoClickerUpgradeCost;
    addGrowth(1);
    autoClickerUpgradeCost += 15;

    upgradeAutoClickerButton.textContent =
      `Upgrade AutoClicker Cost: ${autoClickerUpgradeCost} Cookies`;
    updateDisplay();
  }
});
app.append(
  heading,
  image,
  counterText,
  upgradeClickerButton,
  document.createElement("br"),
  upgradeAutoClickerButton,
);
