import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2024, 10);

function processInput(input) {
    return input.trim().split(/\r?\n/).map(line => line.split('').map(pos => +pos));
}

function walkToUniqueSummits(y, x, startingPoint, visited = new Set()) {
    const point = `${y}-${x}`;
    const height = input[y][x];

    if (visited.has(point)) return;

    // Mark the current node as visited
    visited.add(point);

    // Process the node (e.g., print it)
    if (height === 9) {
        trailHeadsP1[startingPoint].reachablePeaks.add(point);
    }

    // Recursively visit all neighbors of the current node
    if (input?.[y-1]?.[x] && input?.[y-1]?.[x] - height === 1) {
        walkToUniqueSummits(y-1, x,startingPoint, visited)
    }
    if (input?.[y]?.[x+1] && input?.[y]?.[x+1] - height === 1) {
        walkToUniqueSummits(y, x+1,startingPoint, visited)
    }
    if (input?.[y+1]?.[x] && input?.[y+1]?.[x] - height === 1) {
        walkToUniqueSummits(y+1, x,startingPoint, visited)
    }
    if (input?.[y]?.[x-1] && input?.[y]?.[x-1] - height === 1) {
        walkToUniqueSummits(y, x-1,startingPoint, visited)
    }
}

function walkDistinctTrails(y, x, startingPoint) {
    const height = input[y][x];

    // Process the node (e.g., print it)
    if (height === 9) {
        trailHeadsP2[startingPoint].uniqueTrails++;
    }

    // Recursively visit all neighbors of the current node
    if (input?.[y-1]?.[x] && input?.[y-1]?.[x] - height === 1) {
        walkDistinctTrails(y-1, x, startingPoint)
    }
    if (input?.[y]?.[x+1] && input?.[y]?.[x+1] - height === 1) {
        walkDistinctTrails(y, x+1, startingPoint)
    }
    if (input?.[y+1]?.[x] && input?.[y+1]?.[x] - height === 1) {
        walkDistinctTrails(y+1, x, startingPoint)
    }
    if (input?.[y]?.[x-1] && input?.[y]?.[x-1] - height === 1) {
        walkDistinctTrails(y, x-1, startingPoint)
    }
}

const input = processInput(realInput);

// Part 1
const trailHeadsP1 = {};

for ( let i = 0; i < input.length; i++ ) {
    for ( let j = 0; j < input[i].length; j++ ) {
        if (input[i][j] === 0) {
            trailHeadsP1[`${i}-${j}`] = { 'reachablePeaks': new Set() };
            walkToUniqueSummits(i, j, `${i}-${j}`)
        }
    }
}

let trailHeadScore = 0;
for ( const [trailHeadKey, stats] of Object.entries(trailHeadsP1)) {
    trailHeadScore += stats.reachablePeaks.size;
}
console.log(trailHeadScore)

// Part 2
const trailHeadsP2 = {};

for ( let i = 0; i < input.length; i++ ) {
    for ( let j = 0; j < input[i].length; j++ ) {
        if (input[i][j] === 0) {
            trailHeadsP2[`${i}-${j}`] = { 'uniqueTrails': 0 };
            walkDistinctTrails(i, j, `${i}-${j}`)
        }
    }
}

let trailHeadRating = 0;
for ( const [trailHeadKey, stats] of Object.entries(trailHeadsP2)) {
    trailHeadRating += stats.uniqueTrails;
}
console.log(trailHeadRating)

