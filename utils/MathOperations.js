class MathOperations {
  static add(x, y) {
    return x + y;
  }
  static odd(x, y) {
    return x - y;
  }
  static multiply(x, y) {
    return x * y;
  }
  static divide(x, y) {
    return x / y;
  }
  static pow(x, n) {
    return Math.pow(x, n);
  }
  static root(x, n) {
    return Math.pow(x, 1 / n);
  }
}

module.exports = MathOperations;
