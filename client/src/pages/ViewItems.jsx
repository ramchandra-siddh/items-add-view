import { useEffect, useState } from "react";
import ItemModal from "../components/ItemModal";
import axios from "axios";

export default function ViewItems() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/items");
        if (data.success) {
          setItems(data.items);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error(
          "Error fetching items:",
          error.response?.data || error.message
        );
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item)}
            className="cursor-pointer border p-2"
          >
            <img
              src={`${backendUrl}/${item.cover}`}
              className="h-auto w-full object-cover"
            />

            <h2 className="text-lg font-bold mt-2">{item.name}</h2>
          </div>
        ))}
      </div>
      {selected && (
        <ItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
