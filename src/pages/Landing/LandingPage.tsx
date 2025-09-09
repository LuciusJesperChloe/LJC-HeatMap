import React from "react";
import { motion } from "framer-motion";

import bg_image from "../../images/landing_page_bg_webp.webp";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${bg_image})`,
      }}
    >
      <motion.h1 // Animate when this value changes:
        initial={{ opacity: 0, y: -50 }} // Start faded out & 50px above
        animate={{ opacity: 1, y: 0 }} // Animate to visible & centered
        transition={{ duration: 1, ease: "easeOut" }} // Smooth fade/slide
        className="text-[100px] text-white"
      >
        LJC Heatmap
      </motion.h1>
      <div className="flex flex-row justify-between items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }} // Start faded out & 50px above
          animate={{ opacity: 1, x: 0 }} // Animate to visible & centered
          transition={{ duration: 1, ease: "easeOut", delay: 2 }} // Smooth fade/slide
          className="p-5 rounded-lg text-gray-200 border-[1px] border-gray-300 text-center w-[300px] cursor-pointer"
        >
          <Link to="/granger-causality-heatmap">
            LJC Heatmap for <br /> Granger Causality
          </Link>
        </motion.div>
        <motion.div
          initial={{ height: 0 }} // Start faded out & 50px above
          animate={{ height: "40px" }} // Animate to visible & centered
          transition={{ duration: 1, ease: "easeOut", delay: 1 }} // Smooth fade/slide
          className="h-10 w-[1px] bg-gray-300"
        />
        <motion.div
          initial={{ opacity: 0, x: -20 }} // Start faded out & 50px above
          animate={{ opacity: 1, x: 0 }} // Animate to visible & centered
          transition={{ duration: 1, ease: "easeOut", delay: 2 }} // Smooth fade/slide
          className="p-5 rounded-lg text-gray-200 border-[1px] border-gray-300  text-center w-[300px] cursor-pointer"
        >
          <Link to="/transfer-entropy-heatmap">
            LJC Transfer Entropy <br /> Heatmap
          </Link>
        </motion.div>
      </div>
      <Link
        className="self-end flex flex-row justify-center items-center gap-1 absolute pb-5 pr-5 text-gray-200"
        style={{
          bottom: 0,
        }}
        to="/about"
      >
        <motion.h1
          initial={{ opacity: 0 }} // Start faded out & 50px above
          animate={{ opacity: 1 }} // Animate to visible & centered
          transition={{ duration: 2, ease: "easeOut", delay: 3 }} // Smooth fade/slide
        >
          Learn about LJC Heatmap
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }} // Start faded out & 50px above
          animate={{ opacity: 1 }} // Animate to visible & centered
          transition={{ duration: 2, ease: "easeOut", delay: 3 }} // Smooth fade/slide
          className="mt-1"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 12L16 12"
              stroke="#FFFFFF"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13 16L17 12L13 8"
              stroke="#FFFFFF"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.h1>
      </Link>
    </div>
  );
};

export default LandingPage;
