import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PaymentPage from "./pages/PaymentPage";
import UnAuthPage from "./components/unAuthPage";
// import MakePayment from "./pages/makePayment";
import PrivateRoute from "./components/privateRoutes";
import AdminRoutes from "./components/adminRoutes";
import AdminPage from "./pages/admin";

const App = () => {
  return (
    <Router>
      {/* <AuthProvider> */}
        <div className="App flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<UnAuthPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              <Route
                path="/admin"
                element={
                  <AdminRoutes>
                    <AdminPage />
                  </AdminRoutes>
                }
              />

              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <PaymentPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      {/* </AuthProvider> */}
    </Router>
  );
};

export default App;
