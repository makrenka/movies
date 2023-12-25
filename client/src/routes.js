import { Admin } from "./pages/Admin";
import { Auth } from "./pages/Auth";
import { Movie } from "./pages/MoviePage";
import { Movies } from "./pages/Movies";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  MOVIES_ROUTE,
  MOVIE_PAGE_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/route-consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: MOVIES_ROUTE,
    Component: Movies,
  },
  {
    path: MOVIE_PAGE_ROUTE,
    Component: Movie,
  },
];
