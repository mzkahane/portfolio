import './style.css';
import { startLoop } from './engine/gameLoop';
import { renderMap } from './engine/tileMap';
import { testMap } from './data/maps/testMap';
import { update as playerUpdate, draw as playerDraw } from './engine/player';
import { applyScale } from './engine/scale';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Tile size in pixels and map dimensions in tiles
const TILE_SIZE = 16;

canvas.width = 240;
canvas.height = 160;

function update(dt) {
    playerUpdate(dt, TILE_SIZE);
    return;
}

applyScale();
window.addEventListener('resize', applyScale);

startLoop(update, () => {
    renderMap(ctx, testMap, TILE_SIZE);
    playerDraw(ctx, TILE_SIZE);
});
