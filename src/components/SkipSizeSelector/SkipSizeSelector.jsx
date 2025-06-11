import { useState, useEffect, useRef } from "react";
import skips from "../../assets/skipsize.json";
import Button from "../Button/Button.jsx";

export default function SkipSizeSelector() {
  const [selectedIndex, setSelectedIndex] = useState(1); // Start with second item centered
  const touchStartY = useRef(null);
  const touchDeltaY = useRef(0);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        setSelectedIndex((prev) => Math.min(prev + 1, skips.length - 1));
      } else {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0].clientY;
      touchDeltaY.current = touchStartY.current - currentY;
    };

    const handleTouchEnd = () => {
      if (Math.abs(touchDeltaY.current) > 30) {
        if (touchDeltaY.current > 0) {
          setSelectedIndex((prev) => Math.min(prev + 1, skips.length - 1));
        } else {
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
      }
      touchStartY.current = null;
      touchDeltaY.current = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const selected = skips[selectedIndex];
  const offsetY = (selectedIndex - 1) * 64; // Start centered from the second item

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-xl overflow-hidden border">
        {/* Left side info */}
        <div className="md:flex-1 p-6 flex flex-col justify-center items-center bg-white text-center">
          {selected.image_url && (
            <img src={selected.image_url} alt={`${selected.size} yard skip`} className="w-full max-w-xs mb-4 rounded" />
          )}
          <p className="text-sm text-gray-500">
            {selected.allowed_on_road ? "Allowed on road" : "Not allowed on road"}
          </p>
          <p className="text-xl font-bold mb-2">{selected.size} Yard Skip</p>
          <p>{selected.hire_period_days} Day Hire</p>
          <p className="text-lg font-semibold mt-2">
            £{selected.price_before_vat} + VAT
          </p>
          <Button className="mt-4">Select Skip</Button>
        </div>

        {/* Right side scroll simulation */}
        <div className="relative md:w-1/3 w-full bg-gray-100 overflow-hidden flex items-center justify-center h-72 md:h-96">
          <div className="flex flex-col items-center transition-transform duration-300 ease-out" style={{ transform: `translateY(-${offsetY}px)` }}>
            {skips.map((item, index) => (
              <div
                key={item.id}
                className={`h-16 flex items-center justify-center w-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "text-xl font-bold text-white bg-black scale-110 rounded-lg"
                    : "text-gray-400 opacity-50 scale-95"
                }`}
              >
                {item.size} yards
              </div>
            ))}
          </div>

          {/* Top and bottom fading overlays */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}
