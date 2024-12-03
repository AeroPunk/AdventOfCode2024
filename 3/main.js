import fetchInput from "../fetch-input.mjs";

const input = await fetchInput(2024, 3);

// Part 1
const result = input.match(/mul\(\d{1,3},\d{1,3}\)/g)
  .map(mul => mul.slice(4, mul.length - 1).split(','))
  .reduce((sum, calculation) => {
    return sum + (calculation[0] * calculation[1])
  }, 0);

console.log(result)

// Part 2

const result2 = input
  .replace(/don't\(\).*?(?:do\(\)|$)/gs, '')
  .match(/mul\(\d{1,3},\d{1,3}\)/g)
  .map(mul => mul.slice(4, mul.length - 1).split(','))
  .reduce((sum, calculation) => {
    return sum + (calculation[0] * calculation[1])
  }, 0);

console.log(result2)

