import { SketchPicker } from "react-color";
import { Button, Box } from "@mui/material";
import { useState } from "react";

function ColorPicker({ color, setColor }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
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

      {displayColorPicker && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            top: "100%",
            left: 0,
            mt: 1,
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
    </Box>
  );
}

export default ColorPicker;