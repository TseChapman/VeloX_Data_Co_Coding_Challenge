// Helper function to read a file by file name
async function readFileByFileName(filePath) {
  if (filePath === null || typeof(filePath) !== 'string') {
    throw new Error('readFileByFileName: Expect string from filePath');
  }

  try {
    const fs = require('fs').promises;
    const EMPTY_CHAR = /\s+/g;
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return fileContents.replace(EMPTY_CHAR, '');
  } catch (error) {
    throw new Error('readFileByFileName: File not found');
  }
}

// Helper function to validate elements in a comma separated elements string
function validateElementsString(elementsString) {
  if (elementsString === null || typeof(elementsString) !== 'string') {
    throw new Error('validateElementsString: Expect string from elementsString');
  }

  const VALID_ELEMENT_REGEX = /^[a-zA-Z0-9]+$/;
  const elements = elementsString.split(',');
  return elements.filter(element => VALID_ELEMENT_REGEX.test(element));
}

// Step 1: Count unique elements
async function step1(elements) {
  if (elements === null || !Array.isArray(elements)) {
    throw new Error('step1: Expect array type from elements');
  }

  const counts = {};

  for (const element of elements) {
    counts[element] = (counts[element] || 0) + 1;
  }

  // Sort the counts by key, starting from number to text
  const sortedKeys = Object.keys(counts).sort((a, b) => {
    const aIsNumber = !isNaN(a);
    const bIsNumber = !isNaN(b);

    if (aIsNumber && bIsNumber) {
      return a - b;
    } else if (aIsNumber) {
      return -1;
    } else if (bIsNumber) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  // create a sorted counts and return it
  const sortedCounts = {};
  for (const key of sortedKeys) {
    sortedCounts[key] = counts[key];
  }

  console.log("Step 1 Result: ", JSON.stringify(sortedCounts, null, 2));
  console.log("==============================================");
  return sortedCounts;
}

module.exports = {
  readFileByFileName,
  validateElementsString,
  step1,
}