You will be writing a node.js script which reads a file containing comma-separated values and performs various operations on that input.  The file to be read from must be taken as an argument on the command line: `node your_script.js file_to_read.txt`.  Your script must validate the input and discard any element that contains anything other than upper and lower-case letters and numbers.

1. Write a function called `step1` which returns an object (key/value pairs) with each key representing 1 unique object in the input array and the value is the number of times that unique object exists in the input.  The output must be sorted by numbers followed by text in ascending order.

For example, a file containing `1,2,1,1,3,hello,invalid!,4,1,2,hello,text` would result in the following output:

    {
      "1": 4,
      "2": 2,
      "3": 1,
      "4": 1,
      "hello": 2,
      "text": 1
    }

2. Create a new function called `step2` in which you will return an object similar to `step1` except the value is now an array containing the location in the input of each matching item in the original input array.  For example:

    {
      "1": [0, 2, 3, 7],
      "2": [1, 8],
      "3": [4],
      "4": [6],
      "hello": [5, 9],
      "text": [10]
    }

3. Create a new function called `step3` which takes the output of steps 1 and 2 and combines them into a single output where each value in each key/value pair will be an object containing 2 keys: `count` (value from `step1`) and `indices` (value from `step2`).  For example:

    {
      "1": {
        "count": 4,
        "indices": [0, 2, 3, 7]
      },
      "2": {
        "count": 2,
        "indices": [1, 8]
      },
      ...
    }

4. (optional) Add unit tests for your code using a testing library of your choice.

You can print the output to the console using `console.log` - just be sure to use `JSON.stringify` to ensure everything gets printed.  You can pretty print the output as well if you desire.

Your code must have consistent formatting, be easily understood by another engineer, and be fault tolerant.  Use promises over callbacks wherever possible.

Use git for source control to commit your work as you go.  Use a recent version of node.js (at least v16), and do not use any third-party packages (with the exception of a testing library).

When finished, delete the node_modules directory (if applicable) and create either a tar.gz file or zip file for your entire project directory - including your git repository.  Make sure that only this coding challenge is included and no extra/unnecessary files exist in the finished product.
