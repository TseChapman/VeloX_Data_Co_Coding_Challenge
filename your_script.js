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

module.exports = {
  readFileByFileName,
  validateElementsString,
}