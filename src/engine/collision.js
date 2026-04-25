const walkable = { 0: true, 1: true, 2: false }

export function canMoveTo(map, tileX, tileY) {
    if (tileY < 0 || tileY >= map.length || tileX < 0 || tileX >= map[0].length) {
        return false;
    }
    return walkable[map[tileY][tileX]];
}