import Login from "../Pages/Login";
import Answers from "../Pages/Answers";
import Questions from "../Pages/Questions";
import NotFound from "../Pages/NotFound";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
    onlyAdmin: false,
  },
  {
    path: "/questions",
    component: Questions,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: "/answers",
    component: Answers,
    isPrivate: true,
    onlyAdmin: false,
  },
  {
    path: "/*",
    component: NotFound,
    isPrivate: true,
    onlyAdmin: false,
  },
];

export default routes;
