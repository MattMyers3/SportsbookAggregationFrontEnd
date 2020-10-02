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


var dashRoutes = [
  {
    path: "/NFL",
    sport: "NFL",
    name: "NFL",
    icon: "files_paper",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/NBA",
    sport: "NBA",
    name: "NBA",
    icon: "files_paper",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/MLB",
    sport: "MLB",
    name: "MLB",
    icon: "files_paper",
    component: TableList,
    layout: "/admin",
  }
];
export default dashRoutes;
