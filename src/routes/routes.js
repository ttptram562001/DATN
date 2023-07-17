import config from "../config";

import { HeaderOnly } from "../components/Layout";

import Home from "../pages/Home";
import Following from "../pages/Following";
import Profile from "../pages/Profile/Profile";
import Upload from "../pages/Upload";
import Search from "../pages/Search";
import BestSelling from "../pages/BestSelling";
import DetailBook from "../components/DetailBook";
import Category from "../pages/Category";
import BookTypeDetail from "../pages/BookTypeDetail";
import BookType from "../pages/BookType";
import Cart from "../pages/Cart";
import Order from "../pages/Order";

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly},
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.bestSelling, component: BestSelling },
  { path: config.routes.detailBook, component: DetailBook, layout: HeaderOnly },
  { path: config.routes.category, component: Category },
  { path: config.routes.bookTypeDetail, component: BookTypeDetail },
  { path: config.routes.bookType, component: BookType },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.order, component: Order, layout: null},
  { path: config.routes.firstPage, component: BestSelling, layout: HeaderOnly}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
