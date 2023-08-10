// Helper function to read a file by file name
async function readFileByFileName(filePath) {
    const fs = require('fs').promises;
    const EMPTY_CHAR = /\s+/g;
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return fileContents.replace(EMPTY_CHAR, '');
}

module.exports = {
  readFileByFileName,
}