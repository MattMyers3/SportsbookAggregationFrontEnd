export default class OddsFormater {
    static americanOddSignage(odds){
        if (odds > 0) {
            return "+" + odds;
          } else if (odds == 0) {
            return "N/A";
          } else { 
            return odds;
          }
    }
}