"use client";

import React, { useState, useEffect } from "react";
import Banner from "./banner";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

function Banners() {
  const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row gap-4 justify-center items-center p-4">
      <motion.div
        layout
        className="md:h-[300px] h-[200px] rounded-[100px] relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              x: -20,
              display: "block",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              x: 0,
              display: "block",
            }}
            exit={{ opacity: 0, filter: "blur(10px)", x: 20, display: "none" }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            layoutId="banner"
            layout
          >
            <Banner image={images[index]} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Banners;
