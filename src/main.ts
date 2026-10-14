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

// Updates
function updateDisplay() {
  counterText.textContent = `Cookies: ${cookieCount}`;
}

// Timed Growth
setInterval(() => {
  cookieCount++;
  updateDisplay();
}, 1000);

//Clicker Section
let cookieCount = 0;
image.addEventListener("click", () => {
  cookieCount++;
  updateDisplay();
});

app.append(heading, image, counterText);
