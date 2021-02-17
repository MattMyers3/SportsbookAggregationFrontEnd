export default class WinningsCalculator {
  static calculateNetWinnings(betAmount: number, odds: number): number {
    return (odds / 100) * betAmount;
  }
  static calculateGrossWinnings(betAmount: number, odds: number): number {
    const net = this.calculateNetWinnings(betAmount, odds);
    return net + betAmount;
  }
}
