import { isKeyDown } from "./input";
import { testMap } from "../data/maps/testMap";
import { canMoveTo } from "./collision";

const MOVE_SPEED = 5;

const player = {
    tileX: 0, 
    tileY: 0, 
    pixelX: 0, 
    pixelY: 0, 
    moving: false, 
    moveProgress: 0, 
    startPixelX: 0, 
    startPixelY: 0, 
    targetTileX: 0, 
    targetTileY: 0
}; 

function startMove(map, dx, dy) {
    player.targetTileX = player.tileX + dx;
    player.targetTileY = player.tileY + dy;

    player.startPixelX = player.pixelX;
    player.startPixelY = player.pixelY;
    player.moving = canMoveTo(map, player.targetTileX, player.targetTileY);
    player.moveProgress = 0;
}

// LERP formula: startPixel = (targetPixel - startPixel) * moveProgress
export function update(dt, tileSize) {
    if (!player.moving) {
        if (isKeyDown('w') || isKeyDown('ArrowUp')) {
            startMove(testMap, 0, -1);
        } else if (isKeyDown('a') || isKeyDown('ArrowLeft')) {
            startMove(testMap, -1, 0);
        } else if (isKeyDown('s') || isKeyDown('ArrowDown')) {
            startMove(testMap, 0, 1);
        } else if (isKeyDown('d') || isKeyDown('ArrowRight')) {
            startMove(testMap, 1, 0);
        }

    } else if (player.moving) {
        if (player.moveProgress < 1) {
            player.moveProgress += dt * MOVE_SPEED;
            player.pixelX = player.startPixelX + ((player.targetTileX * tileSize) - player.startPixelX) * player.moveProgress;
            player.pixelY = player.startPixelY + ((player.targetTileY * tileSize) - player.startPixelY) * player.moveProgress;

            if (player.moveProgress >= 1) {
                player.tileX = player.targetTileX;
                player.tileY = player.targetTileY;
                player.pixelX = player.targetTileX * tileSize;
                player.pixelY = player.targetTileY * tileSize;
                player.moving = false;
            }
        }

    }
}

export function draw(ctx, tileSize) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(player.pixelX + 5, player.pixelY + 5, tileSize - 10, tileSize - 10);
}