import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
        <AdminNavbar />
        <main className="flex-1 p-6">
          <Outlet /> {/* Renders Dashboard/AddBlog/ManageBlog */}
        </main>
      </div>
    </div>
  );
}
