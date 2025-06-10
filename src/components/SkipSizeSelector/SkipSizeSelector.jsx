import { useState, useEffect, useRef } from "react";
import skips from "../../assets/skipsize.json";
import  Button  from "../Button/Button.jsx";

export default function SkipSizeSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = container.scrollHeight / skips.length;
      const index = Math.round(scrollTop / itemHeight);
      setSelectedIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const selected = skips[selectedIndex];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full max-w-4xl shadow-lg rounded-xl overflow-hidden border">
        {/* Left side info */}
        <div className="flex-1 p-6 flex flex-col justify-center items-center bg-white">
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

        {/* Right side scroll list */}
        <div className="relative w-1/3 bg-gray-100 overflow-hidden">
          <div
            ref={containerRef}
            className="h-96 overflow-y-scroll flex flex-col items-center py-32 scroll-snap-y"
          >
            {skips.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-300 scroll-snap-align-center flex items-center justify-center w-full py-4 ${
                  index === selectedIndex
                    ? "text-xl font-bold text-white bg-black scale-110"
                    : "text-gray-400 opacity-50 scale-95"
                }`}
              >
                {item.size} yards
              </div>
            ))}
          </div>

          {/* Top and bottom fading overlays */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
