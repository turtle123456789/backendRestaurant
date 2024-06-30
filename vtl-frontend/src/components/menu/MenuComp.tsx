/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, Typography, Fab, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCallback, useRef } from "react";
import useCustomer from "@/controllers/useCustomer";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { getAllCategories } from "../../services/category/index";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/legacy/image";
import { formatCurrencyVND } from "@/utils";


type Category = {
  id: number;
  name: string;
  description: string;
};
type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: number;
  isSelect: boolean;
};

const MenuComp = () => {
  // Step 1: Create a ref for each category section
  const [isFabVisible, setIsFabVisible] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAllCategories, getAllDishes } = useCustomer();
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (response.status === 200) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchDishes = async () => {
      const response = await getAllDishes();
      console.log("🚀 ~ fetchDishes ~ response:", response);
      if (response.status !== 200) {
        // Handle error
        return;
      }
      let tmp: Dish[] = [];
      response.data.map((dish: any) => {
        let base64Image = "";
        if (dish.image) {
          const imageBuffer = dish.image.data;
          base64Image = atob(Buffer.from(imageBuffer).toString("base64"));
        } else {
          base64Image = "https://example.com";
        }
        tmp.push({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          description: dish.description,
          image: base64Image,
          category: dish.categoryId,
          isSelect: false,
        });
      });
      setDishes(tmp);
    };
    fetchDishes();
  }, []);

  const sectionRefs = useRef<{
    [key: number]: React.RefObject<HTMLDivElement>;
  }>({});
  categories.forEach((category) => {
    if (!sectionRefs.current[category.id]) {
      sectionRefs.current[category.id] = React.createRef();
    }
  });

  // Step 3: Implement the scroll function
  const scrollToSection = useCallback((categoryId: number) => {
    setCurrentId(categoryId);
    const sectionRef = sectionRefs.current[categoryId];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);
  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setIsFabVisible(true); // Show FAB
    } else {
      setIsFabVisible(false); // Hide FAB
    }
  }, []);

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]); // Make sure to include handleScroll in the dependency array

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#333",
          letterSpacing: ".1rem",
        }}
      >
        Menu
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: 1200,
          minWidth: 300,
          flexWrap: "wrap",
          mt: 2,
          //   overflow: "auto",
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            sx={{
              m: 1,
              backgroundColor:
                currentId === category.id ? "#AE0001" : undefined, // Custom background color
              color: currentId === category.id ? "#FFFFFF" : undefined, // Custom text color
              "&:hover": {
                backgroundColor:
                  currentId === category.id ? "#AE0001" : undefined, // Adjust hover color if needed
              },
            }}
            onClick={() => scrollToSection(category.id)}
          />
        ))}
      </Box>
      <Box
        sx={{
          mb: 2,
          mt: -5,
          width: "100%",
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              pt: 10,
            }}
            ref={sectionRefs.current[category.id]}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <hr
                style={{
                  border: 0,
                  height: "2px",
                  background: "#d9d9d9",
                  marginLeft: "10px",
                  marginRight: "20px",
                  flexGrow: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#333",
                  letterSpacing: ".1rem",
                }}
              >
                {category.name}
              </Typography>
              <hr
                style={{
                  border: 0,
                  height: "2px",
                  background: "#d9d9d9",
                  marginLeft: "20px",
                  marginRight: "10px",
                  flexGrow: 1,
                }}
              />
            </Box>

            <Box
              sx={{
                mt: 2,
              }}
            >
              <Grid container spacing={2}>
                {dishes.map((dish) => {
                  if (dish.category === category.id) {
                    return (
                      <Grid key={dish.id} xs={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRadius: "5px",
                            padding: "10px",
                          }}
                        >
                          <Image
                            src={dish.image}
                            alt={dish.name}
                            width={300}
                            height={200}
                          />
                          <Typography variant="body1">
                            <strong>{dish.name}</strong>
                          </Typography>
                          <Typography variant="body2">
                            {dish.description}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "#f50057",
                              fontStyle: "italic",
                              fontSize: "0.8rem",
                              textDecorationStyle: "double",
                            }}
                          >
                            <strong>{formatCurrencyVND(dish.price)}</strong>
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
      {isFabVisible && (
        <Fab
          sx={{
            position: "fixed",
            top: "90%",
            right: "5%",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Box>
  );
};
export default MenuComp;
