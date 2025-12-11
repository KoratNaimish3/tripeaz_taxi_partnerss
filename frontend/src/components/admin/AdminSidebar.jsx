import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, List } from "lucide-react";

export default function AdminSidebar() {
  const linkClass =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition";

  return (
    <div className="w-64 bg-gray-900 text-gray-100 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/"
          className={({ isActive }) =>
            `${linkClass} `
          }
        >
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/add/blog"
          className={({ isActive }) =>
            `${linkClass} `
          }
        >
          <PlusCircle size={20} /> Add Blog
        </NavLink>

        <NavLink
          to="/admin/manage/blog"
          className={({ isActive }) =>
            `${linkClass} `
          }
        >
          <List size={20} /> Manage Blog
        </NavLink>
      </nav>
    </div>
  );
}
