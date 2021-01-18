export default class OddsFormater {
    static americanOddSignage(odds:number){
        if (odds > 0) {
            return "+" + odds;
          } else if (odds == 0) {
            return "N/A";
          } else { 
            return odds;
          }
    }
}