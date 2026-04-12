export function renderMap(ctx, map, tileSize) {
    const tileLookup = {0: '#7ec850', 
                        1: '#d4a853', 
                        2: '#3890e8'};

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            ctx.fillStyle = tileLookup[map[y][x]];
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}