import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import ViewItems from "./pages/ViewItems";
import AddItem from "./pages/AddItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <ToastContainer>
        <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-700">🛍️ Item Manager</h1>
          <div className="space-x-6">
            <NavLink
              to="/view"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              View Items
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              Add Item
            </NavLink>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/view" />} />
            <Route path="/view" element={<ViewItems />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </main>
      </ToastContainer>
    </div>
  );
}
