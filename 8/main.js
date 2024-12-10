import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2024, 8);
const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

function processInput(input) {
    return input.trim().split(/\r?\n/).map(line => line.split(''));
}

const input = processInput(realInput);
const uniqueFrequencies = [...new Set(realInput)];
uniqueFrequencies.splice(uniqueFrequencies.indexOf('.'), 1);
uniqueFrequencies.splice(uniqueFrequencies.indexOf('\n'), 1);



function processFrequency(grid, frequency,) {
    const antennaLocations = [];
    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];
        for (let x = row.indexOf(frequency); x >= 0 && x < row.length;) {
            antennaLocations.push([y, x]);
            x = row.indexOf(frequency, x + 1);
        }
    }

    const antinodeLocations = [];
    for (let i = 0; i < antennaLocations.length; i++) {
        const antennaA = antennaLocations[i];
        for (let ii = i + 1; ii < antennaLocations.length; ii++) {
            const antennaB = antennaLocations[ii];
            const xDiff = antennaA[1] - antennaB[1];
            const yDiff = antennaA[0] - antennaB[0];
            if (grid?.[antennaA[0] + yDiff]?.[antennaA[1] + xDiff]) {
                antinodeLocations.push(`${antennaA[0] + yDiff}-${antennaA[1] + xDiff}`)
            }
            if (grid?.[antennaB[0] - yDiff]?.[antennaB[1] - xDiff]) {
                antinodeLocations.push(`${antennaB[0] - yDiff}-${antennaB[1] - xDiff}`)
            }
        }
    }
    return antinodeLocations;
}

const allAntinodeLocations = []

for (let i = 0; i < uniqueFrequencies.length; i++) {
    const frequency = uniqueFrequencies[i];
    allAntinodeLocations.push(...processFrequency(input, frequency));
}

console.log(new Set(allAntinodeLocations).size)

// for (let x = 0; x < allAntinodeLocations.length; x++) {
//     const pos = allAntinodeLocations[x].split('-');
//     input[pos[0]][pos[1]] = '%';
// }

// console.log(input.map(line => line.join("")).join('\n'))