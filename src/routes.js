import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import ManageEvents from "views/ManageEvents.js";
import CitiesCountries from "views/cities&countries.js";
import Customers from "views/customers.js";
import AboutCompany from "views/AboutCompany";
import EventGallery from "views/EventGallery";
import Queries from "views/queries";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
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
    path: "/About-Company",
    name: "About Company",
    rtlName: "إخطارات",
    component: AboutCompany,
    layout: "/admin",
    icon: "tim-icons icon-single-copy-04",
  },
  {
    icon: "tim-icons icon-camera-18",
    path: "/event-gallery",
    name: "Event Gallery",
    rtlName: "ملف تعريفي للمستخدم",
    component: EventGallery,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Manage Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-badge",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/queries",
    name: "Queries",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-alert-circle-exc",
    component: Queries,
    layout: "/admin",
  },
];
export default routes;
