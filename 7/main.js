import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2024, 7);

function processInput(input) {
    return input.trim().split(/\r?\n/).map(line => {
        return {
            target: +line.split(': ')[0],
            numbers: line.split(': ')[1].trim().split(' ').map(x => +x)
        }
    });
}

function generateCombinations(numbers, separators) {
    // Thank you ChatGPT
    const result = [];

    function helper(index, current) {
        if (index === numbers.length - 1) {
            // If at the last number, add the current combination to the result
            result.push([...current, numbers[index]]);
            return;
        }

        // Add the current number
        current.push(numbers[index]);

        // Try each separator
        for (const separator of separators) {
            current.push(separator);
            helper(index + 1, current); // Recursive call
            current.pop(); // Backtrack: remove the separator
        }

        current.pop(); // Backtrack: remove the number
    }

    helper(0, []);
    return result;
}

function doNextCalculation(arraySlice) {
    switch (arraySlice[1]) {
        case 'add':
            return arraySlice[0] + arraySlice[2];
        case 'multiply':
            return arraySlice[0] * arraySlice[2];
        case 'concat':
            return +[arraySlice[0], arraySlice[2]].join('')
    }
}

function testCalibration(equation, target, separators) {
    const calcOptions = generateCombinations(equation, separators);
    for (let i = 0; i < calcOptions.length; i++) {
        let option = calcOptions[i];
        while (option.length > 1) {
            option.unshift(doNextCalculation(option.splice(0, 3)));
        }
        if (option[0] === target) {
            return true;
        }
    }
    return false;
}

const input = processInput(realInput);
let total = 0;

for (let i = 0; i < input.length; i++) {
    const line = input[i];
    total = testCalibration(line.numbers, line.target, ['add', 'multiply']) ? total + line.target : total;
}

console.log(total)

let total2 = 0;

for (let i = 0; i < input.length; i++) {
    process.stdout.write(`\rProcessing: ${Math.round(i / input.length * 100)}%`)
    const line = input[i];
    total2 = testCalibration(line.numbers, line.target, ['add', 'multiply', 'concat']) ? total2 + line.target : total2;
}

console.log(`\n${total2}`)

