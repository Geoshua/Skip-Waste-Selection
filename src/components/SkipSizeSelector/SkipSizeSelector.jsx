import { useState, useEffect, useRef } from "react";
import skips from "../../assets/skipsize.json";
import {SteppedProgressButtons} from "../SteppedProgress";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function SkipSizeSelector() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [step, setStep] = useState(3);
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
  const itemHeight = 64;
  const visualOffset = 64;
  const offsetY = selectedIndex === 0 ? -visualOffset : (selectedIndex - 1) * itemHeight;
  const isSelected = selectedSkipId === selected.id;

  const handleSelect = () => {
    setSelectedSkipId((prevId) => (prevId === selected.id ? null : selected.id));
  };

  const showAlert = !selected.allowed_on_road || !selected.allows_heavy_waste;
  const showPriceAlert = selected.transport_cost || selected.per_tonne_cost;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="w-full flex flex-col items-center p-2 pb-32 relative  text-white text-sm md:text-base">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-xl overflow-hidden border border-gray-700 bg-gray-800 relative">
        {/* Left side info */}
        <div className="md:flex-1 w-full flex flex-col items-center">
          <div className="relative w-full">
            {selected.image_url && (
              <img
                src={selected.image_url}
                alt={`${selected.size} yard skip`}
                className="w-full h-56 object-cover md:h-64"
              />
            )}
            {showAlert && (
              <div className="absolute top-2 left-2 group flex items-center space-x-2">
                <AlertTriangle className="text-yellow-400 w-6 h-6 animate-pulse" />
                {(isMobile || false) && (
                  <motion.div
                    initial={{ x: -20, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -20, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black bg-opacity-90 text-white px-3 py-1 rounded shadow-lg text-xs"
                  >
                    {!selected.allowed_on_road && <p>Not allowed on road</p>}
                    {!selected.allows_heavy_waste && <p>No heavy waste</p>}
                  </motion.div>
                )}
                {!isMobile && (
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 origin-left transform translate-x-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                    {!selected.allowed_on_road && <p>Not allowed on road</p>}
                    {!selected.allows_heavy_waste && <p>No heavy waste</p>}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-3 text-center w-full space-y-2">
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold text-white">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={selected.id + "size"}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    {selected.size} Yard Skip
                  </motion.span>
                </AnimatePresence>
              </p>
              <p>{selected.hire_period_days} Day Hire</p>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center space-x-1">
                <p className="text-[#0037c1] font-semibold">
                  £{selected.price_before_vat} + VAT
                </p>
                {showPriceAlert && (
                  <div className="group relative">
                    <AlertTriangle className="text-yellow-400 w-4 h-4 cursor-pointer" />
                    <div className="absolute left-5 bottom-full mb-1 w-max bg-black bg-opacity-80 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-all">
                      {selected.transport_cost && <p>Transport Cost: £{selected.transport_cost}</p>}
                      {selected.per_tonne_cost && <p>Per Tonne: £{selected.per_tonne_cost}</p>}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSelect}
                className={`relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] border-[#0037c1] px-3 py-1 font-semibold uppercase text-[#0037c1] transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-[#0037c1] before:transition-transform before:duration-1000 before:content-[''] hover:scale-105 hover:text-neutral-900 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95 ${
                  isSelected ? "text-neutral-900 before:translate-x-[0%] before:translate-y-[0%]" : ""
                }`}
              >
                <span>{isSelected ? "Selected" : "Select Skip"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side scroll selector */}
        <div className="relative md:w-1/3 w-full bg-gray-700 overflow-hidden flex items-start justify-center h-64 md:h-96 mt-8 md:mt-0 pt-16">
          <div
            className="flex flex-col items-center transition-transform duration-300 ease-out"
            style={{ transform: `translateY(-${offsetY}px)` }}
          >
            {skips.map((item, index) => (
              <div
                key={item.id}
                className={`h-16 flex items-center justify-center w-screen transition-all duration-300 ${
                  index === selectedIndex
                    ? "text-lg font-bold text-white bg-[#0037c1] scale-110 rounded-lg"
                    : "text-gray-400 opacity-50 scale-95"
                }`}
              >
                {item.size} yards
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Floating panel below selector */}
      <AnimatePresence>
        {selectedSkipId && (
          <motion.div
            className="absolute -bottom-24 transform -translate-x-1/2 w-full max-w-4xl bg-gray-800 text-white shadow-xl border border-[#0037c1] p-4 flex flex-col md:flex-row justify-between items-center gap-4 z-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="text-center md:text-left">
              <p className="text-lg font-bold">{selected.size} Yard Skip</p>
              <p className="text-sm text-gray-400">{selected.hire_period_days} Day Hire</p>
              <p
                className="text-[#0037c1] font-semibold cursor-pointer"
                title={`£${selected.price_before_vat} + £${(selected.price_before_vat * (selected.vat / 100)).toFixed(2)} VAT = £${(
                  selected.price_before_vat * (1 + selected.vat / 100)
                ).toFixed(2)}`}
              >
                £{selected.price_before_vat} + VAT
              </p>
            </div>

            <div className="z-50 pointer-events-auto">
              <SteppedProgressButtons currentStep={step} totalSteps={6} onStepChange={setStep} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
