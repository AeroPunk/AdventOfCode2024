import fetchInput from "../fetch-input.mjs";

// Input
const input = await fetchInput(2024, 5);

const rules = {};
let pageList = []

function processInput(input) {
  const x = input.split(/\n{2,}/);
  x[0].trim().split(/\r?\n/).map(line => line.split('|')).map(line => {
    if (rules?.[line[0]]) {
      rules[line[0]].push(line[1])
    } else {
      rules[line[0]] = [line[1]];
    }
  })
  pageList = x[1].trim().split(/\r?\n/).map(line => line.split(','))
}

processInput(input)

// Helpers
function findCommonItemCount(array1, array2) {
  return array2.filter(item => array1.includes(item)).length;
}

// Part 1
const correctLines = [];
const incorrectLines = []

for (let i = 0; i < pageList.length; i++) {
  const pages = pageList[i];
  const processed = [];
  let valid = true;
  for (let ii = 0; ii < pages.length; ii++) {
    const page = pages[ii];
    if (ii === 0) {
      processed.push(page);
      continue;
    }
    if (rules?.[page] && rules[page].some(pageBefore => processed.includes(pageBefore))) {
      valid = false;
      break;
    }
    processed.push(page);
  }
  if (valid) {
    correctLines.push(pages);
  } else {
    incorrectLines.push(pages);
  }
}

const result = correctLines.reduce((sum, line) => sum + +line[(line.length - 1) / 2], 0);
console.log(result)

// Part 2
const fixedLines = [];

for (let i = 0; i < incorrectLines.length; i++) {
  const line = incorrectLines[i];
  const fixedOrder = {};
  for (let ii = 0; ii < line.length; ii++) {
    const page = line[ii];
    if (rules?.[page]) {
      fixedOrder[page] = findCommonItemCount(rules?.[page], line.toSpliced(ii, 1))
    } else {
      fixedOrder[page] = 0;
    }
  }
  fixedLines.push(Object.entries(fixedOrder).sort((a, b) => b[1] - a[1]).map(([key]) => key))
}

const result2 = fixedLines.reduce((sum, line) => sum + +line[(line.length - 1) / 2], 0);
console.log(result2)

