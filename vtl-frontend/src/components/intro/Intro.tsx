import Image from "next/legacy/image";
import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  styled,
} from "@mui/material";
import Link from "next/link";

const Intro = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const WaveCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const parent = parentRef.current;
      if (!canvas) {
        return;
      }
      if (!parent) return;

      canvas.width = parent.offsetHeight;
      canvas.height = parent.offsetWidth;

      const context = canvas?.getContext("2d");
      if (!context) {
        return;
      }

      const unit = 100;
      const xAxis = Math.floor(canvas.height / 2);
      const yAxis = 0;

      function draw() {
        if (!canvas) {
          return;
        }
        if (!context) {
          return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWave({ color: "blue", alpha: 0.5, zoom: 1, delay: 0 }); // Add the required arguments here
        draw.seconds = draw.seconds + 0.009;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw, 35);
      }
      draw.seconds = 0;
      draw.t = 0;

      function drawWave({
        color,
        alpha,
        zoom,
        delay,
      }: {
        color: string;
        alpha: number;
        zoom: number;
        delay: number;
      }) {
        if (!canvas) {
          return;
        }
        if (!context) {
          return;
        }
        context.fillStyle = color;
        context.globalAlpha = alpha;

        context.beginPath();
        drawSine(draw.t / 0.5, zoom, delay);
        context.lineTo(canvas.width + 10, canvas.height);
        context.lineTo(0, canvas.height);
        context.closePath();
        context.fill();
      }

      function drawSine(t: number, zoom: number, delay: number) {
        if (!canvas) {
          return;
        }
        var x = t;
        var y = Math.sin(x) / zoom;
        context?.moveTo(yAxis, unit * y + xAxis);
        for (let i = yAxis; i <= canvas.width + 10; i += 10) {
          x = t + (-yAxis + i) / unit / zoom;
          y = Math.sin(x - delay) / 3;
          context?.lineTo(i, unit * y + xAxis);
        }
      }

      draw();
    }, []);

    return (
      <canvas
        ref={canvasRef}
        style={{
          transform: "rotate(-90deg)",
          zIndex: 1,
          //   width: `${parentRef.current?.offsetHeight}px`,
          //   height: `${parentRef.current?.offsetWidth}px`,
        }}
      />
    );
  };
  return (
    <Box
      sx={{
       bgcolor: "transparent",
        // borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} md={8} p={5}>
          <Image
            src={"/images/restaurants/res-1.jpg"}
            alt="restaurant"
            width={852}
            height={416}
            objectFit="cover"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            {/* <Box
              ref={parentRef}
              sx={{
                width: "20%",
                height: "100%",
              }}
            >
              <WaveCanvas />
            </Box> */}
            <Box>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Welcome to the best restaurant
                </Typography>
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  aliquam, urna in faucibus bibendum, justo quam ultrices odio,
                  nec dictum justo dui eu orci. Nulla facilisi. Nulla facilisi.
                  Nulla facilisi.
                </Typography>
              </Box>
              <Link
                href="/about-us"
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginTop: "16px",
                  width: "40%",
                  padding: "8px 16px",
                  backgroundColor: "#f50057",
                  color: "#fff",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  // Remove the invalid property ":hover"
                }}
              >
                View detail
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Intro;
