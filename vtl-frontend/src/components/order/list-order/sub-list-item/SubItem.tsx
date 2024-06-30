/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, Divider, Toolbar, Typography } from "@mui/material";
import useCustomer from "@/controllers/useCustomer";
import { useEffect, useState } from "react";
import { formatDate, formatDateTime, formatTime } from "@/utils";
import { useRouter } from "next/router";
import Link from "next/link";
type Order = {
  id: string;
  resDate: string;
  resTime: string;
  people: number;
  resStatus: string;
  depositAmount: number;
  restaurantId: string;
  createdAt: string;
};

interface SubItemProps {
  order: Order;
}

type Restaurant = {
  id: string;
  name: string;
  image: string;
  address: string;
  province: string;
  coordinates: {
    lat: string;
    lng: string;
  };
};

const SubItem = ({ order }: SubItemProps) => {
  const { getDetailRestaurantById } = useCustomer();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDetailRestaurantById({
        id: order.restaurantId,
      });
      if (response.status !== 200) {
        return;
      }
      const imageBuffer = response.data.image.data;
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      setRestaurant({
        id: response.data.id,
        name: response.data.name,
        image: `${atob(base64Image)}`,
        address: response.data.address,
        province: response.data.provinceId,
        coordinates: {
          lat: response.data.latitude,
          lng: response.data.longitude,
        },
      });
    };
    fetchData();
  }, [order.restaurantId]);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
      }}
      onClick={() => router.push(`/order/detail-order?orderId=${order.id}`)}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <Box pl={1} pt={2} pr={1} pb={2}>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              backgroundImage: `url(${restaurant?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
        <Box
          pl={1}
          pt={2}
          pr={1}
          pb={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "5px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              <strong>Id:</strong> #{order.id}
            </Typography>
            <Box flexGrow={1} />
            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              {formatDateTime(order.createdAt)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {restaurant?.name} - {restaurant?.address}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            Reservations
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              Arrival time
            </Typography>
            <Box flexGrow={1} />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {formatDate(order.resDate) + " " + formatTime(order.resTime)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          width: "98%",
        }}
      />
      <Box
        sx={{
          mt: 1,
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {order.resStatus === "pending" ? (
          <>
            <Chip
              label="Pending"
              color="warning"
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
            <Box flexGrow={1} />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Waiting for confirmation
            </Typography>
          </>
        ) : order.resStatus === "confirmed" ? (
          <Chip
            label="Confirmed"
            color="success"
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          />
        ) : order.resStatus === "cancel" ? (
          <Chip
            label="Cancelled"
            color="error"
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          />
        ) : (
          <Chip
            label="Done"
            color="primary"
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SubItem;
