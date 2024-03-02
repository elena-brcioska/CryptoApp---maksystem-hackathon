import React, { useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisibility);

  return (
    <div>
      {isVisible && (
        <Fab
          color="primary"
          aria-label="scroll-to-top"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "999",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </div>
  );
};

export default ScrollToTopButton;
