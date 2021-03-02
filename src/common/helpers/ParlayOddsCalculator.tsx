import OddsConverter from "./OddsConverter";

export default class ParlayOddsCalculator {
  static calculateAmericanParlayOdds(americanOdds: number[]): number {
    let parlayDecimalOdds = 1;
    for (const odd of americanOdds) {
      const decimalOdd = OddsConverter.americanToDecimalOdds(odd);
      parlayDecimalOdds *= decimalOdd;
    }
    return OddsConverter.decimalToAmerican(parlayDecimalOdds);
  }
}
