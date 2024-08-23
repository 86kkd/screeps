function gaussElimination(matrix) {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = k;
      }
    }

    [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

    for (let j = i + 1; j < n; j++) {
      const factor = matrix[j][i] / matrix[i][i];
      for (let k = i; k < n; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
    }
  }

  const ratios = new Array(n).fill(0);
  ratios[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += matrix[i][j] * ratios[j];
    }
    // for (let k = i + 1; k < n; k++) {
    //   ratios[i] -= matrix[i][k] * ratios[k];
    // }
    ratios[i] = -sum / matrix[i][i];
  }

  return ratios;
}
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

module.exports = { gaussElimination, transpose };
