import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import UserProfile from "views/UserProfile.js";
import ManageEvents from "views/ManageEvents.js";
import CitiesCountries from "views/cities&countries.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
    path: "/manage-events",
    name: "Manage Events",
    rtlName: "إخطارات",
    icon: "tim-icons icon-calendar-60",
    component: ManageEvents,
    layout: "/admin",
  },
  {
    path: "/Cities-Countries",
    name: "Cities & Countries",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-bookmark",
    component: CitiesCountries,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Manage Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
];
export default routes;
