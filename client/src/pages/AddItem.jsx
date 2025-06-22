import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", type: "", desc: "" });
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [successes, setSuccesses] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("desc", form.desc);
    formData.append("cover", cover);
    images.forEach((img) => formData.append("images", img));

    try {
      const { data } = await axios.post(backendUrl + "/api/items", formData);
      if (data.success) {
        toast.success("✅ Item successfully added!");
        setSuccesses(true);
        setForm({ name: "", type: "", desc: "" });
        setCover(null);
        setImages([]);
        setTimeout(() => setSuccesses(false), 3000);

        navigate("/view");
      }
    } catch (error) {
      console.error(
        "Error posting item:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Add New Item</h2>

      <div>
        <label className="block mb-1 font-medium">Item Name</label>
        <input
          className="w-full border rounded p-2 focus:outline-blue-500"
          placeholder="Enter item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          className="w-full border rounded p-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        >
          <option value="" disabled>
            Select Type
          </option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Shoes</option>
          <option>Sports Gear</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Write a short description..."
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setCover(file);
          }}
          required
        />
        {cover && (
          <img
            src={URL.createObjectURL(cover)}
            alt="Cover preview"
            className="mt-2 h-32 w-32 object-cover rounded shadow"
          />
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Gallery Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = [...e.target.files];
            setImages(files);
          }}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`Gallery ${idx}`}
                className="h-20 w-20 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Add Item
      </button>
    </form>
  );
}
