import './style.css';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Tile size in pixels and map dimensions in tiles
const TILE_SIZE = 32;
const MAP_COLS = 16;
const MAP_ROWS = 12;

canvas.width = MAP_COLS * TILE_SIZE;
canvas.height = MAP_ROWS * TILE_SIZE;

// Temporary: fill canvas to verify setup
ctx.fillStyle = '#4a8';
ctx.fillRect(0, 0, canvas.width, canvas.height);
