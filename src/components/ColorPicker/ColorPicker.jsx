import { SketchPicker } from "react-color";
import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from "react";

function ColorPicker({ color, setColor, offset = 1 }) {
  let buttonRef = useRef(0);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [top,setTop] = useState(0);
  const [left, setleft] = useState(0);

  const toggleColorPicker = () => {
    let y = buttonRef.current.getBoundingClientRect().bottom + window.scrollY;
    let x = buttonRef.current.getBoundingClientRect().left + window.scrollX;
    setTop(y);
    setleft(x);

    setDisplayColorPicker((prev) => !prev);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <>
      {displayColorPicker && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            top: top,
            left:left
          }}
        >
          <Box
            onClick={handleClose}
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
          <SketchPicker
            color={color}
            onChange={handleChange}
            disableAlpha={true}
          />
        </Box>
      )}

      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Button
          ref={buttonRef}
          variant="contained"
          onClick={toggleColorPicker}
          sx={{
            backgroundColor: color,
            color: "white",
            minWidth: "120px",
            textShadow: "0px 0px 4px rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: color,
              filter: "brightness(0.9)",
            },
          }}
        >
          {color}
        </Button>
      </Box>
    </>
  );
}

export default ColorPicker;
