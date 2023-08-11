const {
  readFileByFileName,
  validateElementsString,
  sortObjectKeys,
  step1,
  step2,
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

  it('should handle empty string', () => {
    // Define the empty elements string
    const ELEMENTS_STRING = '';

    // Call validateElementsString on the empty elements string
    const result = validateElementsString(ELEMENTS_STRING);

    // Expect an empty list
    const EXPECTED = [];
    expect(result).toEqual(EXPECTED);
  });

  it('should throws error when string is not inputted', () => {
    // Define the non-string input
    const NON_STRING = 1;

    try {
      validateElementsString(NON_STRING);
      // If the function doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
      // Verify the error message
      expect(error.message).toBe('validateElementsString: Expect string from elementsString');
    }
  });
});

describe('sortObjectKeys', () => {
  it('should sort object keys with numbers followed by text in ascending order', () => {
    // Define an object that is not ordered and the expected object from calling sortObjectKeys
    const INPUT = {
      '3': 1,
      'hello': 2,
      '1': 4,
      'text': 1,
      '4': 1,
      '2': 2,
    };
    const EXPECTED = {
      '1': 4,
      '2': 2,
      '3': 1,
      '4': 1,
      'hello': 2,
      'text': 1,
    };

    // Run the sortObjectKeys using the unordered object
    const sorted = sortObjectKeys(INPUT);

    // Expect the sorted object to be the same as expected object
    expect(sorted).toEqual(EXPECTED);
  });

  it('should throws error when object type is not inputted', () => {
    try {
      sortObjectKeys(null);
      // If the function doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
      // Verify the error message
      expect(error.message).toBe('sortObjectKeys: Expect object type from object');
    }
  });
});

describe('step1', () => {
  it('should count and sort unique elements by numbers followed by text in ascending order', async () => {
    // Define the elements input for calling step1 and the expected result from calling step1
    const INPUT = ['1', '2', '1', '1', '3', 'hello', '4', '1', '2', 'hello', 'text'];
    const EXPECTED = {
      '1': 4,
      '2': 2,
      '3': 1,
      '4': 1,
      'hello': 2,
      'text': 1,
    };

    // Call step1 using the elements input
    const result = await step1(INPUT);

    // Verify the result is equal to the expected sorted object
    expect(JSON.stringify(result)).toEqual(JSON.stringify(EXPECTED));
  });

  it('should throws error when array is not inputted', async () => {
    // Define the non-string input
    const NON_ARRAY = 1;

    try {
      await step1(NON_ARRAY);
      // If the function doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
      // Verify the error message
      expect(error.message).toBe('step1: Expect array type from elements');
    }
  });
});

describe('step2', () => {
  it('should find and sort indices of matching items by numbers followed by text in ascending order', async () => {
    // Define the elements input for calling step1 and the expected result from calling step1
    const INPUT = ['1', '2', '1', '1', '3', 'hello', '4', '1', '2', 'hello', 'text'];
    const EXPECTED = {
      '1': [0, 2, 3, 7],
      '2': [1, 8],
      '3': [4],
      '4': [6],
      'hello': [5, 9],
      'text': [10],
    };

    // Call step1 using the elements input
    const result = await step2(INPUT);

    // Verify the result is equal to the expected sorted object
    expect(JSON.stringify(result)).toEqual(JSON.stringify(EXPECTED));
  });

  it('should throws error when array is not inputted', async () => {
    // Define the non-string input
    const NON_ARRAY = 1;

    try {
      await step2(NON_ARRAY);
      // If the function doesn't throw an error, fail the test
      fail('Expected an error to be thrown');
    } catch (error) {
      // Verify the error message
      expect(error.message).toBe('step2: Expect array type from elements');
    }
  });
});

describe('step3', () => {
  it('should combine counts and indices into a new object', () => {
    // Define counts from step1
    const counts = {
      '1': 4,
      '2': 2,
      '3': 1,
      '4': 1,
      'hello': 2,
      'text': 1,
    };

    // Define indices from step3
    const indices = {
      '1': [0, 2, 3, 7],
      '2': [1, 8],
      '3': [4],
      '4': [6],
      'hello': [5, 9],
      'text': [10],
    };

    // Define the expected result from calling step3
    const EXPECTED = {
      '1': {
        count: 4,
        indices: [0, 2, 3, 7],
      },
      '2': {
        count: 2,
        indices: [1, 8],
      },
      '3': {
        count: 1,
        indices: [4],
      },
      '4': {
        count: 1,
        indices: [6],
      },
      'hello': {
        count: 2,
        indices: [5, 9],
      },
      'text': {
        count: 1,
        indices: [10],
      },
    };

    // Call the step3 function using the counts and indices
    const result = step3(counts, indices);

    // Verify that the result is equal to the expected result
    expect(JSON.stringify(result)).toEqual(JSON.stringify(EXPECTED));
  });
});