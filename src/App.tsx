import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./modules/auth/LoginPage";
import RegisterPage from "./modules/auth/RegisterPage";

import Home from "./modules/home";
import { ProtectedRoute } from "./modules/auth/ProtectedRoute";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
