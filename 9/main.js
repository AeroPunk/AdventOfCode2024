import fetchInput from "../fetch-input.mjs";

function processInput(input) {
    return input.trim().replace(/\r?\n/, '').split('');
}

function generateDiskMap(inputString) {
    let freeSpace = false;
    let id = 0;
    const diskMap = [];

    for (let i = 0; i < inputString.length; i++) {
        const val = freeSpace ? '.' : id;
        for (let ii = 0; ii < inputString[i]; ii++) {
            diskMap.push(val);
        }
        if (freeSpace) {
            freeSpace = false;
        } else {
            freeSpace = true;
            id++;
        }
    }
    return diskMap;
}

function fixDiskMap(diskMap) {
    const fixedDiskMap = [...diskMap];
    for (let i = fixedDiskMap.length - 1; i >= 0; i--) {
        const file = fixedDiskMap[i];
        const firstFreeSpace = fixedDiskMap.indexOf('.');
        if (firstFreeSpace && firstFreeSpace < i) {
            fixedDiskMap[firstFreeSpace] = file;
            fixedDiskMap[i] = '.';
            continue;
        }
        break;
    }
    return fixedDiskMap;
}

function calculateChecksum(diskMap) {
    let checksum = 0;
    for (let i = 0; i < diskMap.length; i++) {
        const fileId = diskMap[i];
        if (fileId !== '.') {
            checksum += fileId * i;
            continue;
        }
        break;
    }
    return checksum;
}

function generateDiskMapP2(inputString) {
    let freeSpace = false;
    let id = 0;
    const diskMap = [];

    for (let i = 0; i < inputString.length; i++) {
        if (+inputString[i] > 0) {
            diskMap.push(
                {
                    ID: freeSpace ? '.' : id,
                    fileLength: +inputString[i],
                    isFree: freeSpace,
                    wasMoved: false
                }
            )
        }
        if (freeSpace) {
            freeSpace = false;
        } else {
            freeSpace = true;
            id++;
        }
    }
    return diskMap;
}

function fixDiskMapP2(diskMap) {
    const fixedDiskMap = [...diskMap];
    for (let i = fixedDiskMap.length - 1; i >= 0; i--) {
        const file = fixedDiskMap[i];
        if (file.isFree || file.wasMoved) {
            continue;
        }
        const firstFreeSpace = fixedDiskMap.findIndex((spot) => spot.isFree && spot.fileLength >= file.fileLength);
        if (firstFreeSpace > -1 && firstFreeSpace < i) {
            if (fixedDiskMap[firstFreeSpace].fileLength === file.fileLength) {
                fixedDiskMap[firstFreeSpace].ID = file.ID;
                fixedDiskMap[firstFreeSpace].isFree = false;
                fixedDiskMap[firstFreeSpace].wasMoved = true;
                fixedDiskMap[i].ID = '.';
                fixedDiskMap[i].isFree = true;
            } else {
                fixedDiskMap.splice(firstFreeSpace + 1, 0, { ID: '.', fileLength: fixedDiskMap[firstFreeSpace].fileLength - file.fileLength, isFree: true, wasMoved: false });
                fixedDiskMap[firstFreeSpace].ID = file.ID;
                fixedDiskMap[firstFreeSpace].fileLength = file.fileLength;
                fixedDiskMap[firstFreeSpace].isFree = false;
                fixedDiskMap[firstFreeSpace].wasMoved = true;
                fixedDiskMap[i + 1].ID = '.';
                fixedDiskMap[i + 1].isFree = true;
                i++;
            }
        }
    }
    return fixedDiskMap;
}

function calculateChecksumP2(diskMap) {
    let checksum = 0;
    let pos = 0;

    for (let i = 0; i < diskMap.length; i++) {
        const file = diskMap[i];
        if (file.isFree) {
            pos += file.fileLength;
            continue;
        }
        for (let ii = 0; ii < file.fileLength; ii++) {
            checksum += (pos + ii) * file.ID;
        }
        pos += file.fileLength;
    }
    return checksum;
}

const realInput = await fetchInput(2024, 9);
const input = processInput(realInput);

const diskMapP1 = generateDiskMap(input);
const fixedDiskMapP1 = fixDiskMap(diskMapP1);
const checksumP1 = calculateChecksum(fixedDiskMapP1);
console.log(checksumP1);

const diskMapP2 = generateDiskMapP2(input);
const fixedDiskMapP2 = fixDiskMapP2(diskMapP2);
const checksumP2 = calculateChecksumP2(fixedDiskMapP2);
console.log(checksumP2)
