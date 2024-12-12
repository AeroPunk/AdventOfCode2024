import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2024, 11);
const testInput = `125 17`;

function processInput(input) {
    return input.trim().split(' ').map(x => BigInt(+x));
}

function processNumber(x) {
    if (x == 0) {
        return [BigInt(1)];
    }
    const numberString = x.toString();
    if (numberString.length % 2 === 0) {
        return [BigInt(numberString.slice(0, numberString.length / 2)), BigInt(numberString.slice(numberString.length / 2))];
    }
    return [x * BigInt(2024)];
}

const baseList = processInput(realInput);

let stoneCount = 0;

for ( let i = 0; i < baseList.length; i++ ) {
    console.log(baseList.length - i)
    let loopCount2 = 75;
    let currentVersion = [baseList[i]];
    while ( loopCount2 > 0 ) {
        console.log(loopCount2)
        let nextVersion = []
        for ( let i = 0; i < currentVersion.length; i++ ) {
            const x = currentVersion[i];
            nextVersion.push( ...processNumber( x ) )
        }
        currentVersion = [...nextVersion];
        loopCount2--;
    }

    stoneCount += currentVersion.length;
}

console.log(stoneCount)
