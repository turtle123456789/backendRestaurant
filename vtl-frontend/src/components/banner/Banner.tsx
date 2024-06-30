import { useWindowSize } from "@/hooks/useWindowSize";
import { Box, styled, Typography } from "@mui/material";
import { Kristi } from "next/font/google";
import Image from "next/legacy/image";
import { use } from "react";

const kristi = Kristi({
  weight: ["400"],
  subsets: ["latin"],

  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
const Banner = () => {
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          marginLeft: "auto",
          opacity: 0.9,
          position: "relative",
          height: "100%",
          width: "100%",
          //   color: "#C78B83",/ Add this
          "::before": {
            // Add this block
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,

            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            background:
              "linear-gradient(rgba(126,126,126,0.25), rgba(193, 96, 96, 0.64))",
            zIndex: 1,
          },
        }}
      >
        <Image
          src="/images/backgrounds/banner.jpg"
          alt="banner"
            // height={690}
            // width={useWindowSize().width - 17}
          layout="fill" // This makes the image responsive
          objectFit="cover"
          // Adjust as needed
          priority
          
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",

          }}
        >
          <Typography
            component="h6"
            sx={{
              position: "absolute",
              textAlign: "left",
              fontFamily: kristi.style.fontFamily,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#ff6f3d",
              fontSize: "85px",
              marginTop: "-70px",
              
            }}
          >
            Taste the magic of
          </Typography>
          <Box
            sx={{
              marginLeft: 60,
              marginTop: 5,
              // position: "absolute",
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
           
            }}
          >
            <Image
              src="https://qiaolinhotpot.com/wp-content/uploads/2022/06/Vector-1.png"
              alt="banner_2"
              height={111}
              width={310}
              //   layout="fill" // This makes the image responsive
              //   objectFit="contain"
              // Adjust as needed
              priority
            />
          </Box>
        </Box>
        <Typography
          //   component="h1"
          //   component="h6"
          sx={{
            fontWeight: 700,
            color: "#fff",
            fontSize: "80px",
          }}
        >
          Flavorful Dish
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "25px",
            fontWeight: 400,
            marginTop: 5,
          }}
        >
          Delight in dish&apos;s exquisite perfection
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
