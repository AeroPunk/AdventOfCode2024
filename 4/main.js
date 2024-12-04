import fetchInput from "../fetch-input.mjs";

// Input
let input = await fetchInput(2024, 4);
input = input.trim().split(/\r?\n/).map(line => line.split(""));

// Helpers
const maxX = input[0].length - 1;
const maxY = input.length -1 ;

// Part 1
function checkForXmas(x, y){
    let matches = 0;
    //check horizontal
    if (x + 3 <= maxX) {
        if (input[y][x + 1] === 'M' && input[y][x + 2] === 'A' && input[y][x + 3] === 'S') {
            matches++;
        }
    }
    //check mirrored
    if (x - 3 >= 0) {
        if (input[y][x - 1] === 'M' && input[y][x - 2] === 'A' && input[y][x - 3] === 'S') {
            matches++;
        }
    }
    //check down
    if (y + 3 <= maxY) {
        if (input[y + 1][x] === 'M' && input[y + 2][x] === 'A' && input[y + 3][x] === 'S') {
            matches++;
        }
    }
    //check up
    if (y - 3 >= 0) {
        if (input[y - 1][x] === 'M' && input[y - 2][x] === 'A' && input[y - 3][x] === 'S') {
            matches++;
        }
    }
    //check diagonal up-normal
    if (y - 3 >= 0 && x + 3 <= maxX) {
        if (input[y - 1][x + 1] === 'M' && input[y - 2][x + 2] === 'A' && input[y - 3][x + 3] === 'S') {
            matches++;
        }
    }
    //check diagonal up-mirrored
    if (y - 3 >= 0 && x - 3 >= 0) {
        if (input[y - 1][x - 1] === 'M' && input[y - 2][x - 2] === 'A' && input[y - 3][x - 3] === 'S') {
            matches++;
        }
    }
    //check diagonal down-normal
    if (y + 3 <= maxY && x + 3 <= maxX) {
        if (input[y + 1][x + 1] === 'M' && input[y + 2][x + 2] === 'A' && input[y + 3][x + 3] === 'S') {
            matches++;
        }
    }
    //check diagonal down-mirrored
    if (y + 3 <= maxY && x - 3 >= 0) {
        if (input[y + 1][x - 1] === 'M' && input[y + 2][x - 2] === 'A' && input[y + 3][x - 3] === 'S') {
            matches++;
        }
    }
    return matches;
}

let XMAScount = 0;

for ( let y = 0; y < input.length; y++ ) {
    for ( let x = 0; x < input[y].length; x++ ) {
        if (input[y][x] === 'X') {
            XMAScount = XMAScount + checkForXmas(x, y);
        }
    }
}

console.log(XMAScount)

// Part 2
function checkForMas(x, y) {
    const grid = [
        input?.[y-1]?.[x-1],
        input?.[y-1]?.[x+1],
        input?.[y+1]?.[x+1],
        input?.[y+1]?.[x-1],
    ]

    return ((grid[0] === 'M' && grid[2] === 'S') || (grid[2] === 'M' && grid[0] === 'S')) && ((grid[1] === 'M' && grid[3] === 'S') || (grid[3] === 'M' && grid[1] === 'S'));
}

let MAScount = 0;

for ( let y = 0; y < input.length; y++ ) {
    for ( let x = 0; x < input[y].length; x++ ) {
        if (input[y][x] === 'A') {
            MAScount = checkForMas(x, y) ? ++MAScount : MAScount;
        }
    }
}

console.log(MAScount);

// Part 2.1 - Shorter but unreadable

let MAScount2 = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        MAScount2 = ((input[y][x] === 'A') && ((input?.[y - 1]?.[x - 1] === 'M' && input?.[y + 1]?.[x + 1] === 'S') || (input?.[y + 1]?.[x + 1] === 'M' && input?.[y - 1]?.[x - 1] === 'S')) && ((input?.[y - 1]?.[x + 1] === 'M' && input?.[y + 1]?.[x - 1] === 'S') || (input?.[y + 1]?.[x - 1] === 'M' && input?.[y - 1]?.[x + 1] === 'S'))) ? ++MAScount2 : MAScount2;
    }
}

console.log(MAScount2);
