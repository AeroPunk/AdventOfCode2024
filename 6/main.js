import fetchInput from "../fetch-input.mjs";

// Input
const realInput = await fetchInput(2024, 6);
const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

function processInput(input) {
    input.replace('\^', 'N');
    return input.trim().split(/\r?\n/).map(line => line.split(''));
}

const inputP1 = processInput(realInput);

// Helpers
const directionDelta = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
]

const maxX = inputP1[0].length;
const maxY = inputP1.length;

function displayGrid(output) {
    return output.map(line => line.join('')).join('\n');
}

function countVisitedSpots(output) {
    return output.reduce((sum, line) => sum + line.filter(x => x === "X").length, 0);
}

// Part 1
let guardDirection = 0; //0 - North/Up, 1 - East/Right, 2 - South/down, 3 - West/Left
let currPos = findStartingPos(inputP1);

function updateGuardDirection(){
    guardDirection = guardDirection + 1 > 3 ? 0 : ++guardDirection;
}

function findStartingPos(output) {
    for ( let i = 0; i < output.length; i++ ) {
        if (output[i].includes('^')) {
            return [output[i].indexOf('^'), i];
        }
    }
}

function walkLines() {
    for ( let x = currPos[0], y = currPos[1]; x >= 0 && x < maxX && y >= 0 && y < maxY;) {
        currPos = [x, y];
        let deltaX = directionDelta[guardDirection][0];
        let deltaY = directionDelta[guardDirection][1];
        x = x + deltaX;
        y = y + deltaY;
        const nextSpot = inputP1?.[y]?.[x];
        if (nextSpot === undefined) {
            return false;
        }
        if (nextSpot === '#') {
            updateGuardDirection();
            return true;
        }
        inputP1[y][x] = 'X';
    }
}

let inBoundsP1 = true;

while (inBoundsP1) {
    inBoundsP1 = walkLines();
}

// console.log(displayGrid(inputP1))
console.log(countVisitedSpots(inputP1))

// Part 2
const inputP2 = processInput(testInput);
guardDirection = 0; //0 - North/Up, 1 - East/Right, 2 - South/down, 3 - West/Left
currPos = findStartingPos(inputP2);

function walkLinesDetectLoops() {
    for ( let x = currPos[0], y = currPos[1]; x >= 0 && x < maxX && y >= 0 && y < maxY;) {
        currPos = [x, y];
        let deltaX = directionDelta[guardDirection][0];
        let deltaY = directionDelta[guardDirection][1];
        x = x + deltaX;
        y = y + deltaY;
        const nextSpot = inputP2?.[y]?.[x];
        if (nextSpot === undefined) {
            return false;
        }
        if (nextSpot === '#') {
            lastTurns.push(currPos.join());
            updateGuardDirection();
            return true;
        }
        inputP2[y][x] = 'X';
    }
}

let inBoundsP2 = true;
const lastTurns = [];
let loopOptions = 0;

while (inBoundsP2) {
    inBoundsP2 = walkLinesDetectLoops();
    if (lastTurns.length === 5) {
        if (lastTurns[0] === lastTurns[4]) {
            loopOptions++;
            break;
        }
    }
}
