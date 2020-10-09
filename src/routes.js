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
import { faBaseballBall, faBasketballBall, faFootballBall } from '@fortawesome/free-solid-svg-icons';


var dashRoutes = [
  {
    path: "/NFL",
    sport: "NFL",
    name: "NFL",
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
    path: "/MLB",
    sport: "MLB",
    name: "MLB",
    icon: faBaseballBall,
    component: TableList,
    layout: "/sports",
  }
];
export default dashRoutes;
