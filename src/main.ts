// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Cookie Clicker Square Edition";

// Images
const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const rateText = document.createElement("p");
const counterText = document.createElement("p");
counterText.textContent = "Cookies: 0";

// Update Display
function updateDisplay() {
  counterText.textContent = `Cookies: ${Math.floor(cookieCount)}`;
  rateText.textContent = `${
    cookiesPerSecond.toFixed(1)
  } cookies/sec | ${cookiesPerClick} cookies per click`;

  // Button text
  for (let i = 0; i < upgrades.length; i++) {
    const upgrade = upgrades[i];
    const button = upgradeButtons[i];

    button.textContent =
      `${upgrade.owned}x ${upgrade.name} | +${upgrade.amountPerUpgrade} C/${upgrade.upgradeType} | (cost: ${upgrade.cost} cookies)`;
    button.disabled = !upgrade.canPurchase(cookieCount);
  }
}

// Update Growth Rate
let cookiesPerSecond = 0;
function addGrowth(amount: number) {
  cookiesPerSecond += amount;
}

// Update Click Power
let cookiesPerClick = 1;
function addClickPower(amount: number) {
  cookiesPerClick += amount;
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
requestAnimationFrame(tick); // outside: starts the loop

// Clicker Section
let cookieCount = 0;
image.addEventListener("click", () => {
  cookieCount += cookiesPerClick;
  updateDisplay();
});

// Upgrade Class
class Upgrade {
  owned = 0;
  cost: number;

  constructor(
    public name: string,
    public startingCost: number,
    public costIncrease: number,
    public amountPerUpgrade: number,
    public upgradeType: "click" | "second",
    public applyEffect: (amount: number) => void,
  ) {
    this.cost = startingCost;
  }

  purchase() {
    this.owned++;
    this.cost += this.costIncrease;
    this.applyEffect(this.amountPerUpgrade);
  }

  canPurchase(cookies: number): boolean {
    return cookies >= this.cost;
  }
}

// Upgrade data
const upgrades: Upgrade[] = [
  new Upgrade("Clicker", 20, 15, 1, "click", addClickPower),

  new Upgrade("AutoClicker", 40, 15, 1, "second", addGrowth),

  new Upgrade("Farm", 80, 25, 5, "second", addGrowth),
];

// Create Upgrade Buttons
const upgradeButtons: HTMLButtonElement[] = [];

for (const upgrade of upgrades) {
  const button = document.createElement("button");

  button.addEventListener("click", () => {
    if (cookieCount < upgrade.cost) return;
    cookieCount -= upgrade.cost;
    upgrade.purchase();
  });
  upgradeButtons.push(button);
}

app.append(
  heading,
  image,
  counterText,
  rateText,
  ...upgradeButtons.flatMap((button) => [button, document.createElement("br")]),
);
