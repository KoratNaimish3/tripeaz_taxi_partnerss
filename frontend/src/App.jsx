import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DemoModalProvider } from "./context/DemoModalContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ManageBlog from "./pages/admin/ManageBlog";
import EditBlog from "./pages/admin/EditBlog";
import BlogsPage from "./pages/BlogsPage";
import BlogDetail from "./pages/BlogDetail";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./components/admin/AdminLogin";

function AdminRoute() {
  const { isLogin } = useAuth();
  return isLogin ? <AdminLayout /> : <AdminLogin />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DemoModalProvider>
          <Toaster/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path='/admin' element={<AdminRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="add/blog" element={<AddBlog />} />
              <Route path="manage/blog" element={<ManageBlog />} />
              <Route path="edit/blog/:slug" element={<EditBlog />} />
            </Route>

          </Routes>
        </DemoModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
