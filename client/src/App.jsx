import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products/main" element={<Products category="main" />} />
        <Route path="/products/snacks" element={<Products category="snacks" />} />
        <Route path="/products/sweets" element={<Products category="sweets" />} />
        <Route path="/products/all" element={<Products category="all" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
