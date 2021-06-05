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
import TableList from "app/Games/TableList";
import BoostRegularTables from "app/OddsBoosts/OddsBoostTableList";
import {
  faBasketballBall,
  //faFootballBall,
  faBaseballBall,
  faQuestion,
  faRocket,
  faHockeyPuck,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import FAQ from "app/Faq/Faq";

type route = {
  path: string;
  sport?: string;
  name: string;
  icon: IconDefinition;
  component: any;
  layout: string;
  pro?: boolean;
};

var dashRoutes: route[] = [
  {
    path: "/OddsBoosts",
    sport: "Odds Boosts",
    name: "Odds Boosts",
    icon: faRocket,
    component: BoostRegularTables,
    layout: "/sports",
  },
  {
    path: "/MLB",
    sport: "MLB",
    name: "MLB",
    icon: faBaseballBall,
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
    path: "/NHL",
    sport: "NHL",
    name: "NHL",
    icon: faHockeyPuck,
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
