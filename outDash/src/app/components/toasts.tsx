"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "warning";

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number; // in milliseconds
}

const toastStyles = {
  success: {
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
    darkBgColor: "dark:bg-green-800",
    darkTextColor: "dark:text-green-200",
    svgPath:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z",
  },
  error: {
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
    darkBgColor: "dark:bg-red-800",
    darkTextColor: "dark:text-red-200",
    svgPath:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z",
  },
  warning: {
    iconColor: "text-orange-500",
    bgColor: "bg-orange-100",
    darkBgColor: "dark:bg-orange-700",
    darkTextColor: "dark:text-orange-200",
    svgPath:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z",
  },
};

const Toast: React.FC<ToastProps> = ({ type, message, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);
  const style = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-black-400 dark:bg-gray-100"
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${style.iconColor} ${style.bgColor} rounded-lg ${style.darkBgColor} ${style.darkTextColor}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d={style.svgPath} />
            </svg>
          </div>
          <div className="ms-3 text-sm font-normal">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;


