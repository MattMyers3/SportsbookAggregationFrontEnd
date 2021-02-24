import OddsConverter from "./OddsConverter";
import WinningsCalculator from "./WinningsCalculator";

export default class ArbitrageCalculator {
  static getUnderdogBetFavoriteFirstCalculator(
    favoriteOdds: number,
    favoriteBetAmount: number,
    underdogOdds: number
  ): number {
    const favoriteGrossPayout = WinningsCalculator.calculateGrossWinnings(
      favoriteBetAmount,
      favoriteOdds
    );
    const decimalUnderdogOdds = OddsConverter.americanToDecimalOdds(
      underdogOdds
    );
    const underdogBetAmount = favoriteGrossPayout / decimalUnderdogOdds;
    return WinningsCalculator.calculateGrossWinnings(
      underdogOdds,
      underdogBetAmount
    );
  }

  static getFavoriteBetUnderdogFirstCalculator(
    favoriteOdds: number,
    underdogOdds: number,
    underdogBetAmount: number
  ): number {
    const underdogGrossPayout = WinningsCalculator.calculateGrossWinnings(
      underdogOdds,
      underdogBetAmount
    );
    const decimalFavoriteOdds = OddsConverter.americanToDecimalOdds(
      underdogOdds
    );
    const favoriteBetAmount = underdogGrossPayout / decimalFavoriteOdds;
    return WinningsCalculator.calculateGrossWinnings(
      favoriteOdds,
      favoriteBetAmount
    );
  }
}
