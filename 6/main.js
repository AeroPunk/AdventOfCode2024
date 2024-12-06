import fetchInput from "../fetch-input.mjs";

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
    return input.trim().split(/\r?\n/).map(line => line.split(''));
}

function displayGrid(output) {
    return output.map(line => line.join('')).join('\n');
}

function countVisitedSpots(output) {
    return output.reduce((sum, line) => sum + line.filter(x => x === "X").length, 0);
}

function updateGuardDirection(prevGuardDirection) {
    return prevGuardDirection + 1 > 3 ? 0 : ++prevGuardDirection;
}

function findStartingPos(output) {
    for ( let i = 0; i < output.length; i++ ) {
        if (output[i].includes('^')) {
            return [output[i].indexOf('^'), i];
        }
    }
}

function hasLoopingPattern(array) {
    // Thank you ChatGPT
    for (let patternLength = 4; patternLength <= Math.floor(array.length / 2); patternLength++) {
        const pattern = array.slice(-patternLength); // Get the last potential pattern

        const previousSegment = array.slice(-2 * patternLength, -patternLength);

        if (pattern.join() === previousSegment.join()) {
            return true;
        }
    }
    return false;
}


function walkLines(grid) {
    let guardDirection = 0;
    for (let x = startPos[0], y = startPos[1]; x >= 0 && x < maxX && y >= 0 && y < maxY;) {
        let deltaX = directionDelta[guardDirection][0];
        let deltaY = directionDelta[guardDirection][1];
        const nextSpot = grid?.[y + deltaY]?.[x + deltaX];
        if (nextSpot === undefined) {
            return countVisitedSpots(grid);
        }
        if (nextSpot === '#') {
            guardDirection = updateGuardDirection(guardDirection);
            continue;
        }
        x = x + deltaX;
        y = y + deltaY;
        grid[y][x] = 'X';
    }
}

function walkLinesFindLoop(grid) {
    let guardDirection = 0;
    let lastTurns = [];
    for (let x = startPos[0], y = startPos[1]; x >= 0 && x < maxX && y >= 0 && y < maxY;) {
        let deltaX = directionDelta[guardDirection][0];
        let deltaY = directionDelta[guardDirection][1];
        const nextSpot = grid?.[y + deltaY]?.[x + deltaX];
        if (nextSpot === undefined) {
            return 0;
        }
        if (nextSpot === '#' || nextSpot === '@') {
            guardDirection = updateGuardDirection(guardDirection);
            lastTurns.push(`${x},${y}`);
            if (lastTurns.length > 4 && hasLoopingPattern(lastTurns)) {
                return 1;
            }
            continue;
        }
        x = x + deltaX;
        y = y + deltaY;
        grid[y][x] = 'X';
    }
    return 0;
}


const baseGrid = processInput(realInput);
const gridPartOne = processInput(realInput);
const startPos = findStartingPos(baseGrid);

//0 - North/Up, 1 - East/Right, 2 - South/down, 3 - West/Left
const directionDelta = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
]

const maxX = baseGrid[0].length;
const maxY = baseGrid.length;

console.log('Part 1: ', walkLines(gridPartOne))

// Part 2
let loopOptions = 0;

for (let i = 0; i < baseGrid.length; i++) {
    process.stdout.write(`\r${Math.round(i / baseGrid.length * 100)}`)
    const line = baseGrid[i];
    for (let ii = 0; ii < line.length; ii++) {
        const position = line[ii];
        if (position == '.') {
            const newGrid = processInput(realInput);
            newGrid[i][ii] = '@';
            loopOptions += walkLinesFindLoop(newGrid);
        }
    }
}

console.log('\n', loopOptions)