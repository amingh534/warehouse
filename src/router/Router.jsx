import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPages from "../pages/LoginPages";
import RegesiterPage from "../pages/RegesiterPage";
import ProductsDetailsPage from "../pages/ProductsDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthProvider from "../providers/AuthProvider";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <ProductsDetailsPage />
            </AuthProvider>
          }
        />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegesiterPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
