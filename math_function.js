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

  const ratios = new Array(n).fill(1);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += matrix[i][j] * ratios[j];
    }
    ratios[i] = 1;
    for (let k = i + 1; k < n; k++) {
      ratios[i] -= matrix[i][k] * ratios[k];
    }
    ratios[i] /= matrix[i][i];
  }

  const baseRatio = ratios[0];
  for (let i = 0; i < n; i++) {
    ratios[i] /= baseRatio;
  }

  return ratios;
}
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

module.exports = { gaussElimination, transpose };
