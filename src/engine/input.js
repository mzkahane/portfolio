const pressed = new Set();
const GAME_KEYS = new Set(['w', 'a', 's', 'd', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']);

window.addEventListener("keydown", e => {
    if (GAME_KEYS.has(e.key)) {
        e.preventDefault();
        pressed.add(e.key);
    }
})

window.addEventListener("keyup", e => {
    if (GAME_KEYS.has(e.key)) {
        e.preventDefault();
        pressed.delete(e.key);
    }
})

export function isKeyDown(key) {
    return pressed.has(key);
}