import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";
import Image from "next/legacy/image";
import Link from "next/link";

import { Splide, SplideSlide } from "splide-nextjs/react-splide";

import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
//import AutoScroll from "@splidejs/splide-extension-auto-scroll";
import { useEffect } from "react";
const montserrat = Montserrat({
  weight: ["100", "200", "300", "500", "600", "800", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const listImage = [
  {
    image: "/images/restaurants/res-1.jpg",
  },
  {
    image: "https://via.placeholder.com/350",
  },
];

const SectionItem = ({
  number,
  title,
  description,
  align,
}: {
  number: number;
  title: any;
  description: string;
  align: "left" | "right";
}) => {
  0;

  return (
    <Container sx={{ py: 2, maxWidth: "1200px", height: "fit-content" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexDirection: align === "left" ? "row" : "row-reverse",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            width: "45%",
          }}
        >
          <Typography
            sx={{
              fontFamily: montserrat, // Ensure the font name is correctly referenced
              fontWeight: 400,
              fontSize: "5rem",
              color: "#CB2128",
              textTransform: "uppercase",
              WebkitTextStroke: "1px #FFFFFF", // Note: This style might not be supported in all browsers
              lineHeight: 1,
            }}
          >
            0{number}
          </Typography>
          <Box sx={{ p: 1 }}>
            <Typography
              variant="h2"
              sx={{ mb: 2, fontWeight: 700, color: "#fff" }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 400, color: "#fff" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <Box
              sx={{
                p: 1,
                borderRadius: 15,
                border: "1px solid #fff",
                width: "fit-content",
              }}
            >
              <Button
                component={Link}
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#CB2128",
                  borderRadius: 10,
                  fontFamily: montserrat,
                  fontWeight: 700,
                  ":hover": {
                    backgroundColor: "white",
                    color: "#CB2128",
                  },
                }}
                href="/reserve-now"
              >
                Reserve Now
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "500px",
            height: "320px",
            position: "relative",
          }}
        >
          <Splide
            options={{
              type: "loop",
              focus: "center",
              autoScroll: {
                speed: 1,
              },
              autoStart: true,
              drag: "free",
            }}
            // extensions={{ AutoScroll }}
          >
            {listImage.map((item, index) => (
              <SplideSlide key={index}>
                <Image
                  src={item.image}
                  alt="restaurant"
                  width={500}
                  height={320}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionItem;
