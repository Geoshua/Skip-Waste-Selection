import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trash2,
  Calendar,
  Truck,
  MapPin,
  ShieldCheck,
  CreditCard,
  Check,
  ArrowBigRight
} from "lucide-react";

const defaultIcons = [ MapPin, Trash2, Truck, ShieldCheck, Calendar, CreditCard];
const defaultLabels = [
  "Postcode",
  "Waste Type",
  "Select Skip",
  "Permit Check",
  "Choose Date",
  "Payment"
];

export const SteppedProgressBar = ({
  currentStep = 0,
  totalSteps = 6,
  icons = defaultIcons,
  labels = defaultLabels,
}) => {
  const steps = Array.from({ length: totalSteps });
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && activeRef.current) {
      const container = containerRef.current;
      const active = activeRef.current;
      const offsetLeft = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-8 overflow-x-auto scrollbar-hide w-full px-4 py-2"
    >
      {steps.map((_, index) => {
        const isActive = index + 1 <= currentStep;
        const isPrevComplete = index < currentStep;
        const Icon = icons[index] || Trash2;
        const label = labels[index] || `Step ${index + 1}`;

        return (
          <React.Fragment key={index}>
            <div ref={index === currentStep - 1 ? activeRef : null}>
              <StepIcon isActive={isActive} Icon={Icon} label={label} />
            </div>
            {index !== totalSteps - 1 && (
              <div className="h-1 bg-gray-200 relative flex-1 min-w-[40px] rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-blued-400 rounded-full"
                  animate={{ width: isPrevComplete ? "100%" : "0%" }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const StepIcon = ({ isActive, Icon, label }) => (
  <div className="flex items-center gap-3 min-w-max">
    <div className="relative w-12 h-12 shrink-0">
      <div
        className={`w-full h-full flex items-center justify-center border-2 rounded-full transition-colors duration-300 z-10 ${
          isActive
            ? "bg-blued-400 border-blued-600 text-white"
            : "border-gray-300 text-gray-300"
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="check"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check size={20} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <div className="absolute -inset-1.5 bg-blued-200 opacity-30 rounded-full animate-pulse z-0" />
      )}
    </div>
    <div className="text-base text-gray-400 max-w-[6rem] text-left">{label}</div>
  </div>
);



export const SteppedProgressButtons = ({ currentStep, totalSteps, onStepChange }) => {
  const handleChange = (delta) => {
    const next = currentStep + delta;
    if (next >= 0 && next <= totalSteps) {
      onStepChange(next);
    }
  };

  return (
    <div className="flex justify-end mt-6 gap-2">
<div className="flex gap-4">
  {/* Previous Button */}
  <button
    onClick={() => handleChange(-1)}
    className={`
      relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px]
      border-gray-400 px-4 py-2 font-semibold text-lg
      text-gray-400 transition-all duration-500
      
      before:absolute before:inset-0
      before:-z-10 before:translate-x-[150%]
      before:translate-y-[150%] before:scale-[2.5]
      before:rounded-[100%] before:bg-gray-400
      before:transition-transform before:duration-1000
      before:content-[""]

      hover:scale-105 hover:text-blued-900
      hover:before:translate-x-[0%]
      hover:before:translate-y-[0%]
      active:scale-95`}
  >
    <span>Back</span>
  </button>

  {/* Continue Button */}
  <button
    onClick={() => handleChange(1)}
    className={`
      relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px]
      border-blued-400 px-4 py-2 font-semibold text-lg
       text-blued-300 transition-all duration-500
      
      before:absolute before:inset-0
      before:-z-10 before:translate-x-[150%]
      before:translate-y-[150%] before:scale-[2.5]
      before:rounded-[100%] before:bg-blued-400
      before:transition-transform before:duration-1000
      before:content-[""]

      hover:scale-105 hover:text-white
      hover:before:translate-x-[0%]
      hover:before:translate-y-[0%]
      active:scale-95`}
  >
    <span>Continue</span>
    <ArrowBigRight className="w-5 h-5" />
  </button>
</div>
    </div>
  );
};