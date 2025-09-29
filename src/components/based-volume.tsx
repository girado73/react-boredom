import { VolumeDown } from "@mui/icons-material";
import { Slider, Stack, Typography } from "@mui/material";
import React from "react";


export const BasedVolume = (props: { volume: number, setVolume: Function }) => {
  const holdStartRef = React.useRef<number | null>(null);
  const [rotation, setRotation] = React.useState(0);
  const animationRef = React.useRef<number | null>(null);

  const updateRotation = () => {
    if (holdStartRef.current !== null) {
      const duration = Date.now() - holdStartRef.current;
      const delta = Math.floor(duration / 20);
      const rotationDegrees = Math.min(90, (delta / 100) * 90);
      setRotation(-rotationDegrees);

      animationRef.current = requestAnimationFrame(updateRotation);
    }
  }

  const handlePressStart = () => {
    holdStartRef.current = Date.now();
    props.setVolume(0);
    animationRef.current = requestAnimationFrame(updateRotation);
  };

  const handlePressEnd = () => {
    if (holdStartRef.current !== null) {
      const duration = Date.now() - holdStartRef.current;


      const delta = Math.floor(duration / 20);

      const newVolume = Math.min(100, props.volume + delta);
      props.setVolume(newVolume);


      holdStartRef.current = null;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setRotation(0);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ width: 300, display: 'flex', alignItems: 'center', mt: 5 }}
      >
        <VolumeDown
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          sx={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.1s linear',
          }}
        />
        <Slider
          aria-label="Volume"
          value={props.volume}
        />
        <Typography
          aria-label="Volume Value"
        >
          {props.volume.toString().padStart(2, '0')}
        </Typography>
      </Stack >
    </>
  );
}
