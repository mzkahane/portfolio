import './style.css';
import { startLoop } from './engine/gameLoop';
import { renderMap } from './engine/tileMap';
import { testMap } from './data/maps/testMap';
import { update as playerUpdate, draw as playerDraw } from './engine/player';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Tile size in pixels and map dimensions in tiles
const TILE_SIZE = 32;
const MAP_COLS = 16;
const MAP_ROWS = 12;

canvas.width = MAP_COLS * TILE_SIZE;
canvas.height = MAP_ROWS * TILE_SIZE;

function update(dt) {
    playerUpdate(dt, TILE_SIZE);
    return;
}

startLoop(update, () => {
    renderMap(ctx, testMap, TILE_SIZE);
    playerDraw(ctx, TILE_SIZE);
});
