const NATIVE_GAP = 8;
const TOTAL_WIDTH = 240 + NATIVE_GAP + 72;
const TOTAL_HEIGHT = 160 + NATIVE_GAP + 48;

export function applyScale() {
    const widthScale = Math.floor(window.innerWidth / TOTAL_WIDTH);
    const heightScale = Math.floor(window.innerHeight / TOTAL_HEIGHT);

    const scale = Math.max(1, Math.min(widthScale, heightScale));

    document.documentElement.style.setProperty('--scale', scale);
}