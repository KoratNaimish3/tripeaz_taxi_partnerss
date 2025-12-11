import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
    const { adminLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin');
    };

    return (
        <div className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button 
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Logout
            </button>
        </div>
    );
}
