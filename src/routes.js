/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import TableList from "views/TableList.js";
import GameSpecificProps from "views/GameSpecificProps";
import BoostRegularTables from "views/OddsBoostTableList";
import {
  faBaseballBall,
  faBasketballBall,
  faFootballBall,
  faQuestion,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import FAQ from "views/Faq.js";

var dashRoutes = [
  {
    path: "/OddsBoosts",
    sport: "Odds Boosts",
    name: "Odds Boosts",
    icon: faRocket,
    component: BoostRegularTables,
    layout: "/sports",
  },
  {
    path: "/NFL",
    sport: "NFL",
    name: "NFL",
    icon: faFootballBall,
    component: TableList,
    layout: "/sports",
  },
  {
    path: "/NCAAF",
    sport: "NCAAF",
    name: "NCAAF",
    icon: faFootballBall,
    component: TableList,
    layout: "/sports",
  },
  {
    path: "/NBA",
    sport: "NBA",
    name: "NBA",
    icon: faBasketballBall,
    component: TableList,
    layout: "/sports",
  },
  {
    path: "/NCAAB",
    sport: "NCAAB",
    name: "NCAAB",
    icon: faBasketballBall,
    component: TableList,
    layout: "/sports",
  },
  {
    pro: true,
    path: "/FAQ",
    name: "FAQ",
    icon: faQuestion,
    component: FAQ,
    layout: "/info",
  },
];
export default dashRoutes;
