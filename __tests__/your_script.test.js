const {
  readFileByFileName,
  validateElementsString,
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

  it('should handle file read errors', async () => {
    const FILENAME = 'nonExistentFile.txt'; // A non-existent file name

    // Mock fs.readFile to throw an error
    fs.readFile = jest.fn().mockRejectedValue(new Error('File not found'));

    // Expect the function to throw exception on running fs.readFile on non-existent file
    await expect(readFileByFileName(FILENAME)).rejects.toThrowError('readFileByFileName: File not found');
    expect(fs.readFile).toHaveBeenCalledWith(FILENAME, 'utf-8');
  });

  it('should throws error when string is not inputted', async () => {
    // Define the non-string input
    const NON_STRING = 1;

    try {
      await readFileByFileName(NON_STRING);
      // If the function doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
      // Verify the error message
      expect(error.message).toBe('readFileByFileName: Expect string from filePath');
    }
  });
});

describe('validateElementsString', () => {
  it('should return an array of valid elements', () => {
    // Define the valid elements string
    const ELEMENTS_STRING = '1,2,1,1,3,hello,4,1,2,hello,text';

    // Call validateElementsString on the valid elements string
    const result = validateElementsString(ELEMENTS_STRING);

    // Expect a list of valid elements
    const EXPECTED = ['1', '2', '1', '1', '3', 'hello', '4', '1', '2', 'hello', 'text'];
    expect(result).toEqual(EXPECTED);
  });

  it('should filter out invalid elements', () => {
    // Define the invalid elements string
    const ELEMENTS_STRING = '1,2,1,1,3,hello,invalid!,4,1,2,hello,text';

    // Call validateElementsString on the invalid elements string
    const result = validateElementsString(ELEMENTS_STRING);

    // Expect a list of valid elements
    const EXPECTED = ['1', '2', '1', '1', '3', 'hello', '4', '1', '2', 'hello', 'text'];
    expect(result).toEqual(EXPECTED);
  });
});