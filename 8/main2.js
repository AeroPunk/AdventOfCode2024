import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2024, 8);

function processInput(input) {
    return input.trim().split(/\r?\n/).map(line => line.split(''));
}

const input = processInput(realInput);
const uniqueFrequencies = [...new Set(realInput)];
uniqueFrequencies.splice(uniqueFrequencies.indexOf('.'), 1);
uniqueFrequencies.splice(uniqueFrequencies.indexOf('\n'), 1);

function processFrequency(grid, frequency) {
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
        for (let ii = 0; ii < antennaLocations.length; ii++) {
            const antennaB = antennaLocations[ii];
            if (antennaA[0] === antennaB[0] && antennaA[1] === antennaB[1]) {
                continue;
            }
            antinodeLocations.push(`${antennaA[0]}-${antennaA[1]}`)

            let x = (antennaA[1] - antennaB[1]) + antennaA[1];
            let y = (antennaA[0] - antennaB[0]) + antennaA[0];
            let inBounds = true;
            while (inBounds) {
                if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
                    antinodeLocations.push(`${y}-${x}`);
                    x += antennaA[1] - antennaB[1];
                    y += antennaA[0] - antennaB[0];
                } else {
                    inBounds = false;
                }
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