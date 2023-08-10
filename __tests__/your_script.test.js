const {
  readFileByFileName,
} = require('../your_script');

const fs = require('fs').promises;

describe('readFileByFileName', () => {
  it('should read and clean file contents', async () => {
    // Arrange constant variables
    const FILENAME = 'file_to_read.txt';
    const MOCK_FILE_CONTENTS = '1, 2, 1, 1, 3, hello, invalid!, 4, 1, 2, hello, text';

    // Mock fs.readFile to return the mock file contents
    fs.readFile = jest.fn().mockResolvedValue(MOCK_FILE_CONTENTS);

    // Run the readFileByFileName using the constant file name variable
    const result = await readFileByFileName(FILENAME);

    // Expect the function to return a trimmed file content string and call fs.readFile
    const EXPECTED_RESULT = '1,2,1,1,3,hello,invalid!,4,1,2,hello,text';
    expect(result).toBe(EXPECTED_RESULT);
    expect(fs.readFile).toHaveBeenCalledWith(FILENAME, 'utf-8');
  });
});