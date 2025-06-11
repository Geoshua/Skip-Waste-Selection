import { useState, useEffect, useRef } from "react";
import skips from "../../assets/skipsize.json";
import {SteppedProgressBar, SteppedProgressButtons} from "../SteppedProgress";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function SkipSizeSelector() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [step, setStep] = useState(2);
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
        {/* Top Section*/}
        <div className="md:w-10/12 w-full p-10 float-start">
        <SteppedProgressBar currentStep={step} />
        </div>
        <div class="w-full ">
            <div className="items-center text-center md:mt-10 md:mb-10 mb-3 ">
                <h2 className="text-2xl text-white font-semibold">Choose Skip Size</h2>
                <p className="text-lg text-gray-400">Select the skip size that best suits your needs</p>
            </div>
        </div>
        {/* Skip Selector */}
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
                    <AlertTriangle className="text-orange-600 w-6 h-6 animate-pulse  " />
                    {(isMobile || false) && (
                    <motion.div
                        initial={{ x: -20, opacity: 0, scale: 0.9 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -20, opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="bg-black bg-opacity-90 text-white px-3 py-1 rounded shadow-lg text-"
                    >
                        {!selected.allowed_on_road && <p>Not allowed on road</p>}
                        {!selected.allows_heavy_waste && <p>No heavy waste</p>}
                    </motion.div>
                    )}
                    {!isMobile && (
                    <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1, scale: 1.1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="opacity-0   bg-black bg-opacity-70 text-white px-4 py-3 rounded-lg text-sm z-50"
                    >
                    {!selected.allowed_on_road && <p>Not allowed on road</p>}
                    {!selected.allows_heavy_waste && <p>No heavy waste</p>}
                    </motion.div>
                    )}
                </div>
                )}
            </div>

            <div className="p-4 text-center w-full space-y-2">
                <div className="flex justify-between w-full">
                <p className="md:text-xl text-lg font-bold text-white">
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
                <p className="text-gray-400 text-base">{selected.hire_period_days} Day Hire Period</p>
                </div>
                <div className="flex justify-between w-full items-end">
                <div className="flex items-endspace-x-1">
                    <p className="text-blued-300  text-2xl font-semibold">
                    £{selected.price_before_vat} + VAT
                    </p>
                    {showPriceAlert && (
                    <div className="group relative">
                        <AlertTriangle className="text-yellow-400 w-6 h-6 cursor-pointer translate-y-1 translate-x-1" />
                        <div className="absolute bottom-full mb-1 w-max bg-black bg-opacity-80 text-white text-base p-2 rounded opacity-0 group-hover:opacity-100 transition-all">
                        {selected.transport_cost && <p>Transport Cost: £{selected.transport_cost}</p>}
                        {selected.per_tonne_cost && <p>Per Tonne: £{selected.per_tonne_cost}</p>}
                        </div>
                    </div>
                    )}
                </div>
                <button
                    onClick={handleSelect}
                    className={`relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] border-blued-400 px-5 py-2 text-lg font-semibold text-blued-300 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-blued-400 before:transition-transform before:duration-1000 before:content-[''] hover:scale-105 hover:text-blued-100 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95 ${
                    isSelected ? "text-blued-50 bg-blued-400 before:translate-x-[0%] before:translate-y-[0%]" : ""
                    }`}
                >
                    <span>{isSelected ? "Selected Skip" : "Select Skip"}</span>
                </button>
                </div>
            </div>
            </div>

            {/* Right side scroll selector */}
            <div className="relative md:w-1/3 w-full bg-gray-700 overflow-hidden flex items-start justify-center h-40 md:h-96 mt-8 md:mt-0 md:pt-16">
            <div
                className="flex flex-col items-center transition-transform duration-300 ease-out"
                style={{ transform: `translateY(-${offsetY}px)` }}
            >
                {skips.map((item, index) => (
                <div
                    key={item.id}
                    className={`h-16 flex items-center justify-center w-screen transition-all duration-300 ${
                    index === selectedIndex
                        ? "text-lg font-bold text-blued-900 bg-blued-100 scale-110 rounded-lg"
                        : "text-gray-300 opacity-50 scale-95"
                    }`}
                >
                    {item.size} Yards
                </div>
                ))}
            </div>

            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />
            </div>
        </div>

        {/* Floating bottom panel  */}
        <AnimatePresence>
        {selectedSkipId && (() => {
            const selectedSkip = skips.find(skip => skip.id === selectedSkipId);
            if (!selectedSkip) return null;
            
            const priceBeforeVat = selectedSkip.price_before_vat;
            const vatAmount = priceBeforeVat * (selectedSkip.vat / 100);
            const totalPrice = priceBeforeVat + vatAmount;

            return (
            <motion.div
                className="absolute -bottom-24 transform -translate-x-1/2 w-full max-w-4xl bg-gray-800 text-white shadow-xl border border-blued-400 p-4 flex flex-col md:flex-row justify-between items-center gap-4 z-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="text-center md:text-left">
                    <p className="text-xl lg:text-lg font-bold">{selectedSkip.size} Yard Skip</p>
                    <p className="text-lg lg:text-sm text-gray-400 mb-2">{selectedSkip.hire_period_days} Day Hire Period</p>
                    <p
                        className="text-blued-300 font-semibold cursor-pointer text-xl "
                        title={`£${priceBeforeVat} + £${vatAmount.toFixed(2)} VAT = £${totalPrice.toFixed(2)}`}
                    >
                        £{priceBeforeVat} + VAT
                    </p>
                </div>
                
                <div className="z-50 pointer-events-auto ">
                <SteppedProgressButtons currentStep={step} totalSteps={6} onStepChange={setStep} />
                </div>
            </motion.div>
            );
        })()}
        </AnimatePresence>
    </div>
  );
}
