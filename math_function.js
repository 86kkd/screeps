function gaussElimination(augmentedMatrix) {
  const numRows = augmentedMatrix.length;
  const numCols = augmentedMatrix[0].length;
  for (let i = 0; i < numRows; i++) {
    let maxRow = i;
    for (let j = i + 1; j < numRows; j++) {
      if (
        Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])
      ) {
        maxRow = j;
      }
    }
    [augmentedMatrix[i], augmentedMatrix[maxRow]] = [
      augmentedMatrix[maxRow],
      augmentedMatrix[i],
    ];

    for (let j = i + 1; j < numRows; j++) {
      const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];

      for (let k = i; k < numCols; k++) {
        augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
      }
    }
  }
  const solution = [];

  for (let i = numRows - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < numCols - 1; j++) {
      sum += augmentedMatrix[i][j] * solution[numCols - 2 - j + i];
    }

    solution.push(
      (augmentedMatrix[i][numCols - 1] - sum) / augmentedMatrix[i][i],
    );
  }
  return solution.reverse();
}

module.exports = { gaussElimination };
