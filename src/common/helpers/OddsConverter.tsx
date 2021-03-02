export default class OddsConverter {
  static americanToDecimalOdds(americanOdds: number): number {
    if (americanOdds > 0) {
      return 1 + americanOdds / 100;
    } else {
      return 1 - 100 / americanOdds;
    }
  }

  static americanToImpliedOdds(americanOdds: number): number {
    const decimal = this.americanToDecimalOdds(americanOdds);
    return 1 / decimal;
  }

  static decimalToAmerican(decimalOdds: number): number {
    if (decimalOdds >= 2) {
      return (decimalOdds - 1) * 100;
    } else {
      return 100 / (1 - decimalOdds);
    }
  }
  static impliedOddsToDecimal(impliedOdds: number): number {
    return 1 / impliedOdds;
  }
}
