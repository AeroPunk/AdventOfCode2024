import fetchInput from "../fetch-input.mjs";

const input = await fetchInput(2024, 1);

const left = [], right = [];
let totaldistance = 0;

function processInput(x) {
  const a = x.trim().split(/\r?\n/);
  a.forEach(line => {
    const lineArray = line.split(/\s+/);
    left.push(+lineArray[0]);
    right.push(+lineArray[1]);
  });

  left.sort((a, b) => a - b)
  right.sort((a, b) => a - b)
}

processInput(input)

// Part 1
left.forEach((line, index) => {
  totaldistance = totaldistance + Math.abs((right[index] - line));
});

console.log("Part 1 - Total distance: ", totaldistance)

// Part 2

let similarityScore = 0;

let counts = {};
for (let num of right) {
  counts[num] = (counts[num] || 0) + 1;
}

left.forEach(line => {
  let score = line * (counts[line] || 0);
  similarityScore += score;
});

console.log("Part 2 - Similarity score: ", similarityScore);