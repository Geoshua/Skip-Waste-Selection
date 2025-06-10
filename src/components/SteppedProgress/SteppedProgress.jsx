import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trash2,
  Recycle,
  Truck,
  Leaf,
  ShieldCheck,
  PackageOpen,
  Check,
} from "lucide-react";

const defaultIcons = [Trash2, Recycle, Truck, Leaf, ShieldCheck, PackageOpen];
const defaultLabels = [
  "Postcode",
  "Waste Type",
  "Select Skip",
  "Permit Check",
  "Choose Date",
  "Payment"
];

// 🟢 Main Progress Bar Component
export const SteppedProgressBar = ({
  currentStep = 0,
  totalSteps = 6,
  icons = defaultIcons,
  labels = defaultLabels,
}) => {
  const steps = Array.from({ length: totalSteps });

  return (
    <div className="flex items-center gap-8 w-full">
      {steps.map((_, index) => {
        const isActive = index + 1 <= currentStep;
        const isPrevComplete = index < currentStep;
        const Icon = icons[index] || Trash2;
        const label = labels[index] || `Step ${index + 1}`;

        return (
          <React.Fragment key={index}>
            <StepIcon isActive={isActive} Icon={Icon} label={label} />
            {index !== totalSteps - 1 && (
              <motion.div
                className="h-1 bg-gray-200 relative flex-1 rounded-full overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-indigo-600 rounded-full"
                  animate={{ width: isPrevComplete ? "100%" : "0%" }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// 🟢 Step with Icon and Label to the Right
const StepIcon = ({ isActive, Icon, label }) => (
  <div className="flex items-center gap-3 relative">
    <div className="relative w-12 h-12">
      <div
        className={`w-full h-full flex items-center justify-center border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-indigo-600 bg-indigo-600 text-white"
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
        <div className="absolute -inset-1.5 bg-indigo-100 rounded-full animate-pulse z-0" />
      )}
    </div>
    <div className="text-xs text-gray-300 max-w-[6rem]">{label}</div>
  </div>
);

// 🟢 Buttons
export const SteppedProgressButtons = ({ currentStep, totalSteps, onStepChange }) => {
  const handleChange = (delta) => {
    const next = currentStep + delta;
    if (next >= 0 && next <= totalSteps) {
      onStepChange(next);
    }
  };

  return (
    <div className="flex justify-end mt-6 gap-2">
      <button
        onClick={() => handleChange(-1)}
        className="px-4 py-1 rounded hover:bg-gray-100 text-black"
      >
        Prev
      </button>
      <button
        onClick={() => handleChange(1)}
        className="px-4 py-1 rounded bg-black text-white"
      >
        Next
      </button>
    </div>
  );
};