import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(undefined);

const API_URL = "http://localhost:8000";


axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false)


  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/auth`, {
        withCredentials: true,
      });
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    }
  }

  const Logout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/user/logout",
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Logged out successfully");
        setUser(null)
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
      console.error(error);
    }
  };

  const adminauth = async () => {
    try {
        const { data } = await axios.get("/admin/auth")

        if (data.success) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    } catch (error) {
        setIsLogin(false)
    }
  }

  const adminLogout = async () => {
    try {
      const { data } = await axios.get(
        "/admin/logout",
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Logged out successfully");
        setIsLogin(false)
      } else {
        toast.error(data.message || "Logout failed");
        setIsLogin(false) // Clear state even if backend fails
      }
    } catch (error) {
      // Even if logout fails (e.g., token expired), clear local state
      setIsLogin(false)
      // Only show error if it's not a 401 (unauthorized) - which is expected for expired tokens
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Error logging out. Please try again.");
        console.error(error);
      } else {
        // Token expired/invalid - logout locally anyway
        toast.success("Logged out successfully");
      }
    }
  };

  useEffect(() => {
    checkAuth()
    adminauth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user, setUser, Logout, isLogin, setIsLogin, adminauth, adminLogout, axios
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
