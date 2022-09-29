import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PizzaPage from "./pages/PizzaPage";
import DessertPage from "./pages/DessertPage";
import FullMenuPage from "./pages/FullMenuPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPage from "./pages/AdminPage";
import { AuthGuardAdmin, AuthGuardUser } from "./guards/AuthGuard";
import { Role } from "./Models/Role";
import SingleProductPage from "./pages/SingleProductPage";
import UserDetails from "./pages/UserDetails";
import CartPage from "./pages/CartPage";
import AdminProduct from "./Component/Admin/AdminProduct";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizzas" element={<PizzaPage />} />
          <Route path="/desserts" element={<DessertPage />} />
          <Route path="/fullMenu" element={<FullMenuPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/logIn" element={<LogInPage />} />
          <Route
            path="/singleProduct/:productId"
            element={<SingleProductPage />}
          />
          <Route
            path="/admin"
            element={
              <AuthGuardAdmin roles={[Role.ROLE_ADMIN]}>
                <AdminPage />
              </AuthGuardAdmin>
            }
          />

          <Route
            path="/allProduct"
            element={
              <AuthGuardAdmin roles={[Role.ROLE_ADMIN]}>
                <AdminProduct />
              </AuthGuardAdmin>
            }
          />
          <Route
            path="/userDetails"
            element={
              <AuthGuardUser>
                <UserDetails />
              </AuthGuardUser>
            }
          />
          <Route
            path="/cart"
            element={
              <AuthGuardUser>
                <CartPage />
              </AuthGuardUser>
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
