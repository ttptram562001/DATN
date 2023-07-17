import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./features/auth/auth";
import Home from "./pages/Home";
import DetailBook from "./components/DetailBook/index";
import routes from "./config/routes";
import { DefaultLayout } from "./components/Layout";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
import Admin from "./features/admin/admin";
import Profile from "./pages/Profile/Profile";
import { Header } from "antd/es/layout/layout";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/admin/dashboard"
              exact
              element={<Admin adminRoute="dashboard" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/user"
              exact
              element={<Admin adminRoute="user" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/employee"
              exact
              element={<Admin adminRoute="employee" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/comment"
              exact
              element={<Admin adminRoute="comment" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/bill"
              exact
              element={<Admin adminRoute="bill" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/book"
              exact
              element={<Admin adminRoute="book" />}
            />
          </Routes>
          <Routes>
            <Route path="/admin" exact element={<Admin adminRoute="" />} />
          </Routes>
          <Routes>
            <Route
              path="/admin/tag"
              exact
              element={<Admin adminRoute="tag" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/profile"
              exact
              element={<Admin adminRoute="profile" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/sign-up"
              exact
              element={<Auth authRoute="register" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/profile/account"
              exact
              element={<Profile profileRoute="account" />}
            />
          </Routes> 
    
          <Routes>
            <Route
              path="/profile/address"
              exact
              element={<Profile profileRoute="address" />}
            />
          </Routes> 
           <Routes>
            <Route
              path="/profile/password"
              exact
              element={<Profile profileRoute="password" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/profile/receipt"
              exact
              element={<Profile profileRoute="receipt" />}
            />
          </Routes>
          <Routes>
            <Route path="/sign-in" exact element={<Auth authRoute="login" />} />
          </Routes>
          <Routes>
            <Route path="/logout" exact element={<Auth authRoute="logout" />} />
          </Routes>

          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Routes>
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Routes>
            );
          })}
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
