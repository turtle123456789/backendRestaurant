/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import useCustomer from "@/controllers/useCustomer";
import useNotify from "@/hooks/useNotify";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import ResItem from "./ResItem/ResItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import Link from "next/link";
type ResCard = {
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

const ListRestaurants = () => {
  const listRef = React.useRef<HTMLDivElement>(null); // Create a ref
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState<ResCard[]>([
    {
      id: "",
      resName: "",
      resImage: "",
      coordinates: {
        lat: "",
        lng: "",
      },
      province: "",
      address: "",
    },
  ]); // Create a state variable
  const { getAllRestaurants } = useCustomer();
  const { successNotify, errorNotify } = useNotify();
  const handleScrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += 400;
    }
  };

  const handleScrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= 400;
    }
  };
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, restaurants.length - 4)
    );
  };

  React.useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await getAllRestaurants();
      if (response.status !== 200) {
        errorNotify(response.message);
      }
      let tmp: ResCard[] = [];
      response.data.forEach((element: any) => {
        const imageBuffer = element.image.data;
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        tmp.push({
          id: element.id,
          resName: element.name,
          resImage: `${atob(base64Image)}`,
          coordinates: {
            lat: element.latitude,
            lng: element.longitude,
          },
          province: element.provinceId,
          address: element.address,
        });
      });
      setRestaurants(tmp);
    };

    fetchRestaurants();
    console.log("🚀 ~ restaurants", restaurants[currentIndex]);
  }, []);
  React.useEffect(() => {
    // Add this useEffect
    const checkOverflow = () => {
      if (listRef.current) {
        setIsOverflowing(
          listRef.current.scrollWidth > listRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [restaurants]);

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {isOverflowing && ( // Add this condition
            <IconButton
              onClick={handleScrollLeft}
              sx={{
                ml: {
                  xs: 0,
                  lg: 1,
                },
              }}
            >
              <ArrowBackIosIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          )}
        </Box>
        <List
          ref={listRef as React.RefObject<HTMLDivElement>} // Update the ref type to HTMLDivElement
          component={Stack}
          direction="row"
          sx={{
            maxWidth: "100%",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {restaurants.map((restaurant, index) => (
            <ListItem key={index} sx={{}}>
              <Link
                href={{
                  pathname: "/restaurant",
                  query: { restaurantId: restaurant.id },
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ResItem restaurant={restaurant} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {isOverflowing && ( // Add this condition
            <IconButton
              onClick={handleScrollRight}
              sx={{
                mr: {
                  xs: 0,
                  lg: 1,
                },
              }}
            >
              <ArrowForwardIosIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          )}
        </Box>
      </Box> */}
      <Box mb={2}>
        <Splide
          options={{
            type: "loop",
            drag: "free",
            snap: true,
            // gap: "1rem",
            // pagination: false,
            // breakpoints: {
            //   640: {
            //     perPage: 1,
            //   },
            //   768: {
            //     perPage: 2,
            //   },
            //   1024: {
            //     perPage: 3,
            //   },
            // },
            perPage: 4,
            autoScroll: {
              speed: 1,
            },
            // autoWidth: true,
          }}
          aria-label="Restaurants"
        >
          {restaurants.map((restaurant, index) => (
            <SplideSlide key={index}>
              <Link
                href={{
                  pathname: "/restaurant",
                  query: { restaurantId: restaurant.id },
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ResItem restaurant={restaurant} />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </Box>
    </>
  );
};

export default ListRestaurants;
