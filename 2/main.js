const { testInput, input } = require('./input');

function processInput(x) {
  return x.split(/\r?\n/).map(report => report.split(/\s+/).map(level => +level));
}

const reports = processInput(input)

function isSafe(report, isAscending = false) {
  for (let i = 0; i < report.length; i++) {
    const level = report[i];
    const nextLevel = report[i + 1];
    if (nextLevel) {
      const diff = isAscending ? nextLevel - level : level - nextLevel;
      if (diff > 0 && diff < 4) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}

// Part 1
let safeReports = 0;

reports.forEach(report => {
  if (isSafe(report, true) || isSafe(report)) {
    safeReports++;
  }
});

console.log(safeReports)

// Part 2
let problemDampenedSafeReports = 0;

function generateProblemDampenerOptions(report) {
  const extraReports = [];
  for (let i = 0; i < report.length; i++) {
    extraReports.push(report.toSpliced(i, 1))
  }
  return extraReports;
}

reports.forEach(report => {
  if (isSafe(report, true) || isSafe(report)) {
    problemDampenedSafeReports++;
  } else {
    generateProblemDampenerOptions(report).some(newReport => {
      if (isSafe(newReport, true) || isSafe(newReport)) {
        problemDampenedSafeReports++;
        return true;
      }
    });
  }
});

console.log(problemDampenedSafeReports);