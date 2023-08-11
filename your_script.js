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

// Helper function to sort the object by the object keys starting from number to text
function sortObjectKeys(object) {
  // Check if object is valid
  if (object === null || typeof object !== 'object') {
    throw new Error('sortObjectKeys: Expect object type from object');
  }

  // Sort the object by key, starting from number to text
  const sortedKeys = Object.keys(object).sort((a, b) => {
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

  // create a sorted object and return it
  const sortedObject = {};
  for (const key of sortedKeys) {
    sortedObject[key] = object[key];
  }

  return sortedObject;
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

  // create a sorted counts and return it
  const sortedCounts = sortObjectKeys(counts);

  console.log("Step 1 Result: ", JSON.stringify(sortedCounts, null, 2));
  console.log("==============================================");
  return sortedCounts;
}

// Step 2: Find indices of matching items
async function step2(elements) {
  if (elements === null || !Array.isArray(elements)) {
    throw new Error('step2: Expect array type from elements');
  }

  const indices = {};

  for (let i = 0; i < elements.length; i++) {
    if (!indices[elements[i]]) {
      indices[elements[i]] = [];
    }
    indices[elements[i]].push(i);
  }

    // create a sorted indices and return it
    const sortedIndices = sortObjectKeys(indices);

  console.log("Step 2 Result: ", JSON.stringify(sortedIndices, null, 2));
  console.log("==============================================");
  return sortedIndices;
}

module.exports = {
  readFileByFileName,
  validateElementsString,
  sortObjectKeys,
  step1,
  step2,
}