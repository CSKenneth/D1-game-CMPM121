// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import breadUrl from "./assets/bread.png";
import breadCutUrl from "./assets/cut bread.png";
import "./style.css";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Bread Clicker Loaf Edition";

// Images
const breadImage = document.createElement("img");
breadImage.src = breadUrl;
breadImage.alt = "A loaf of bread";
breadImage.width = 96;
breadImage.height = 96;

breadImage.addEventListener("mousedown", () => {
  breadImage.src = breadCutUrl;
});

breadImage.addEventListener("mouseup", () => {
  breadImage.src = breadUrl;
});

breadImage.addEventListener("mouseleave", () => {
  breadImage.src = breadUrl;
});

const rateText = document.createElement("p");
const counterText = document.createElement("p");
counterText.textContent = "Bread Slices: 0";

// Update Display
function updateDisplay() {
  counterText.textContent = `Bread Slices: ${Math.floor(breadCount)}`;
  rateText.textContent = `${
    slicesPerSecond.toFixed(1)
  } Bread Slices/sec | ${slicesPerClick} Bread Slices per click`;

  // Button text
  for (let i = 0; i < upgrades.length; i++) {
    const upgrade = upgrades[i];
    const button = upgradeButtons[i];

    button.textContent =
      `${upgrade.owned}x ${upgrade.name} | +${upgrade.amountPerUpgrade} S/${upgrade.upgradeType} | (cost: ${upgrade.cost} Bread Slices)`;
    button.disabled = !upgrade.canPurchase(breadCount);
  }
}

// Update Growth Rate
let slicesPerSecond = 0;
function addGrowth(amount: number) {
  slicesPerSecond += amount;
}

// Update Click Power
let slicesPerClick = 1;
function addClickPower(amount: number) {
  slicesPerClick += amount;
}

// Timed Growth
let lastFrameTime = performance.now(); // Time stamp of previous frame
function tick(now: number) {
  const elapsedTime = (now - lastFrameTime) / 1000; // time (sec) between frames
  lastFrameTime = now;
  breadCount += slicesPerSecond * elapsedTime;
  updateDisplay();

  requestAnimationFrame(tick); // inside: schedules the next frame
}
requestAnimationFrame(tick); // outside: starts the loop

// Clicker Section
let breadCount = 0;
breadImage.addEventListener("click", () => {
  breadCount += slicesPerClick;
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

  canPurchase(slices: number): boolean {
    return slices >= this.cost;
  }
}

// Upgrade data
const upgrades: Upgrade[] = [
  new Upgrade("Knife Upgrade🔪", 20, 15, 1, "click", addClickPower),

  new Upgrade("AutoCutter Upgrade🔪🔪", 40, 15, 1, "second", addGrowth),

  new Upgrade("Bread Workers🧑‍🏭🧑‍🏭", 80, 25, 5, "second", addGrowth),

  new Upgrade("Bread Factory🍞🏭", 150, 150, 40, "second", addGrowth),

  new Upgrade("Bread Monopoly🎩🧐", 400, 600, 120, "second", addGrowth),
];

// Create Upgrade Buttons
const upgradeButtons: HTMLButtonElement[] = [];

for (const upgrade of upgrades) {
  const button = document.createElement("button");

  button.addEventListener("click", () => {
    if (!upgrade.canPurchase(breadCount)) return;
    breadCount -= upgrade.cost;
    upgrade.purchase();
  });
  upgradeButtons.push(button);
}

app.append(
  heading,
  breadImage,
  counterText,
  rateText,
  ...upgradeButtons.flatMap((button) => [button, document.createElement("br")]),
);
