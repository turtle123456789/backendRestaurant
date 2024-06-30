import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
type ResItemProps = {
  id: string;
  resName: string;
  resImage: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  province: string;
  address: string;
};

const ResItem = ({ restaurant }: { restaurant: ResItemProps }) => {
  const { resName, resImage, address } = restaurant;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",

        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "400px",
            width: "300px",
            display: "block",
            transition: "transform 0.3s",
            "&:hover": {
              opacity: 0.9,
              transform: "scale(1.1)",
            },
            "&:hover .overlay": {
              opacity: 1, // Show the overlay on hover
            },
          }}
        >
          <Image
            src={resImage}
            alt={resName}
            layout="fill" // Adjusted to fill for responsive design
            style={{
              objectFit: "cover",
              // borderRadius: "10px", // Optional: if you want rounded corners
              // Smooth zooming effect
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
              color: "white",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0, // Initially hidden
              transition: "opacity 0.3s", // Smooth transition
              height:"100%",
              // borderRadius: "10px"
            }}
          >
            <Typography variant="h6" textOverflow="ellipsis" width="100%" >
              {resName} - {address}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResItem;
