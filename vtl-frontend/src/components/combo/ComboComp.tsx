import { Box, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";
import Image from "next/legacy/image";
import Link from "next/link";
type Category = {
  id: number;
  image: string;
  name: string;
  description: string;
};

const categories: Category[] = [
  {
    id: 1,
    image: "/images/restaurants/res-1.jpg",
    name: "Combo 1",
    description: "Combo 1 description",
  },
  {
    id: 2,
    image: "/images/restaurants/res-1.jpg",
    name: "Combo 2",
    description: "Combo 2 description",
  },
  {
    id: 3,
    image: "/images/restaurants/res-1.jpg",
    name: "Combo 3",
    description: "Combo 3 description",
  },
  {
    id: 4,
    image: "/images/restaurants/res-1.jpg",
    name: "Combo 4",
    description: "Combo 4 description",
  },
  {
    id: 5,
    image: "/images/restaurants/res-1.jpg",
    name: "Combo 5",
    description: "Combo 5 description",
  },
];

const montserrat = Montserrat({
  weight: ["100", "200", "300", "500", "600", "800", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const ComboComp = () => {
  const Item = ({ category, index }: { category: Category; index: number }) => {
    return (
      <Box
        sx={{
          mt: (index + 1) % 2 === 0 ? "0" : "50px",
          textDecoration: "none",
        }}
        component={Link}
        href={`/menu`}
      >
        <Box
          sx={{
            position: "relative",
            height: "350px",
            width: "250px",
            display: "block",
            transition: "transform 0.3s",
            "&:hover": {
              opacity: 0.9,
              transform: "scale(1.1)",
            },
            ".overlay": {
              opacity: 1, // Show the overlay on hover
            },
          }}
        >
          <Image
            src={category.image}
            alt={category.name}
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
              color: "white",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "start",
              opacity: 0, // Initially hidden
              transition: "opacity 0.3s", // Smooth transition
              height: "100%",
              // borderRadius: "10px"
            }}
          >
            <Typography variant="h6" textOverflow="ellipsis" width="100%">
              {category.name}
            </Typography>
            <Typography>{category.description}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        pt: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: montserrat, // Ensure the font name is correctly referenced
          fontWeight: 700,
          fontSize: "6rem",
          position: "absolute",
          color: "rgb(254, 240, 240)",
          textTransform: "uppercase",
          WebkitTextStroke: "1px rgb(203, 33, 40)", // Note: This style might not be supported in all browsers
          transform: "translateY(-60%)",
          textAlign: "center",
          opacity: 0.3,
          lineHeight: 1,
        }}
      >
       Diverse Combo
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
        }}
      >
        {categories.map((category) => (
          <Item key={category.id} category={category} index={category.id} />
        ))}
      </Box>
    </Box>
  );
};

export default ComboComp;
