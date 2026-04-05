/**
 * Game Loop
 *
 * Runs a continuous update/render cycle using requestAnimationFrame.
 * Tracks delta time so movement stays consistent regardless of frame rate.
 */

export function startLoop(update, render) {
    let lastTime = 0;

    function loop(currentTime) {
        let dt = (lastTime === 0 ? 0 : currentTime - lastTime) / 1000;

        update(dt);
        render();

        lastTime = currentTime;
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}
