import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

export default function ItemModal({ item, onClose }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const images = [item.cover, ...(item.images || [])].map(
    (img) => `${backendUrl}/${img}`
  );

  const handleEnquire = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/items/enquire`, {
        itemId: item._id,
        userEmail: "testuser@email.com",
      });
      alert(data.message || "Enquiry sent!");
    } catch (error) {
      console.error("Enquiry failed", error);
      alert("Failed to send enquiry");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-3xl h-[80vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute right-3 top-3 text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
        <p className="italic text-gray-600 mb-4">{item.type}</p>

        {/* Carousel Section */}
        <Carousel showThumbs={false} infiniteLoop autoPlay className="mb-4">
          {images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`Item ${idx}`}
                className="max-h-[48vh]  w-auto object-contain mx-auto "
              />
            </div>
          ))}
        </Carousel>

        <p className="mb-6">{item.desc}</p>

        <button
          onClick={handleEnquire}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
