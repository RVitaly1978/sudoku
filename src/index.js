module.exports = function solveSudoku(matrix) {
  // your solution
  
  fillSingleValues(matrix);
  if (getEmptyValues(matrix).length === 0) {
    return matrix;
  } else if (getEmptyValues(getValues(matrix)).length === 0) {
    return matrix;
  } else {
    throw new Error(`solution is not found`);
  }

  function getValues(matrix) {
    let emptyValuesList = getEmptyValues(matrix);
    if (emptyValuesList.length === 0) return matrix;
    
    let [row, column] = emptyValuesList[0];
    let candidatesList = getCandidatesList(matrix, row, column);
    
    let j = 0;
    while (j <= candidatesList.length - 1) {
      matrix[row][column] = candidatesList[j];
      if (getValues(matrix) === false) {
        j++;
      } else return matrix;
    }
    matrix[row][column] = 0;
    return false;
  }

  function fillSingleValues(matrix) {
    let counter;
    do {
      counter = 0;
      let emptyValuesList = getEmptyValues(matrix);
      for (let i = 0; i < emptyValuesList.length; i++) {
        let [row, column] = emptyValuesList[i];
        if (matrix[row][column] === 0
          && getCandidatesList(matrix, row, column).length === 1) {
          matrix[row][column] = getCandidatesList(matrix, row, column)[0];
          counter++;
        }
      }
    } while (counter !== 0);
    return matrix;
  }

  function getEmptyValues(matrix) {
    let emptyValues = [];
    for (let i = 0; i < 9; i++) {
      if (matrix[i].includes(0)) {
        for (let j = 0; j < 9; j++) {
          if (matrix[i][j] === 0) {
            emptyValues.push([i, j]);
          }
        }
      }
    }
    return emptyValues;
  }

  function getCandidatesList(matrix, row, column) {
    let candidatesList = [];
    for (let value = 1; value < 10; value++) {
      if (!isValueInRowColumnArea(matrix, row, column, value)) {
        candidatesList.push(value);
      }
    }
    return candidatesList;
  }

  function isValueInRowColumnArea(matrix, row, column, value) {
    let areaBlock = [];
    let columnBlock =[];
    let rowBlock = matrix[row];
    
    for (let i = 0; i < 9; i++) {
      columnBlock.push(matrix[i][column]);
    }

    let rowAreaBorder = Math.floor(row / 3) * 3;
    let columnAreaBorder = Math.floor(column / 3) * 3;
    for (let i = rowAreaBorder; i < rowAreaBorder + 3; i++) {
      for (let j = columnAreaBorder; j < columnAreaBorder + 3; j++) {
        areaBlock.push(matrix[i][j]);
      }
    }
   
    return rowBlock.includes(value)
          || columnBlock.includes(value)
          || areaBlock.includes(value);
  }

}