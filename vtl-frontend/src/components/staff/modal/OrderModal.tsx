/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  Checkbox,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { fetchAllDishes, fetchOrderDetail, formatCurrencyVND } from "@/utils";
import LoadingModal from "@/common/loading/LoadingModal";
import InvoiceModal from "./InvoiceModal";

type OrderModalProps = {
  orderId: number;
  onClose: () => void;
  open: boolean;
};

type OrderItem = {
  id: number;
  dishId: number;
  dishName: string;
  total: number;
  quantity: number;
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

type Table = {
  name: string;
};

type Order = {
  order: {
    id: number;
    resDate: string;
    resTime: string;
    people: number;
    resStatus: string;
    depositAmount: number;
    restaurantId: number;
    fullName: string;
    phoneNumber: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
  };
  orderItems: OrderItem[];
  tables: Table[];
};

const OrderModal = ({ orderId, onClose, open }: OrderModalProps) => {
  const [orderDetail, setOrderDetail] = useState<Order | null>();
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [openInvoiceModal, setOpenInvoice] = useState(false);

  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [quantity, setQuantity] = useState<number[]>([]);
  useEffect(() => {
    setLoading(true);
    if (orderId == 0) {
      return;
    }
    // Make the request to get the order detail
    const fetchOrder = async () => {
      let tmp = await fetchOrderDetail(orderId);
      setOrderDetail(tmp);
      setLoading(false);
    };

    const fetchDishes = async () => {
      let tmp = await fetchAllDishes();
      if (tmp) {
        setDishes(tmp);
      }
    };
    fetchDishes().then(() => {
      setIsChecked(
        dishes.map((dish) => {
          return orderDetail?.orderItems.find((item) => {
            return item.dishId === dish.id;
          })
            ? true
            : false;
        })
      );
      setQuantity(
        dishes.map((dish) => {
          const item = orderDetail?.orderItems.find((item) => {
            return item.dishId === dish.id;
          });
          return item ? item.quantity : 1;
        })
      );
    });
    fetchOrder();
  }, [orderId]);


  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%",
              sm: "80%",
              md: "60%",
            },
            height: "80%",
            backgroundColor: "#EDEEF1",
            border: "2px solid #000",
            padding: "20px",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          <LoadingModal open={loading} />

          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={5} sm={5} md={5}>
                <Typography variant="h6">Customer</Typography>
              </Grid>
              <Grid
                xs={1}
                sm={1}
                md={1}
                display={"flex"}
                justifyContent={"start"}
              >
                <Typography variant="h6">:</Typography>
              </Grid>
              <Grid xs={6} sm={6} md={6}>
                <Typography variant="h6">
                  {orderDetail?.order.fullName}
                </Typography>
              </Grid>
              <Grid xs={5} sm={5} md={5}>
                <Typography variant="h6">Phone Number</Typography>
              </Grid>
              <Grid
                xs={1}
                sm={1}
                md={1}
                display={"flex"}
                justifyContent={"start"}
              >
                <Typography variant="h6">:</Typography>
              </Grid>
              <Grid xs={6} sm={6} md={6}>
                <Typography variant="h6">
                  {orderDetail?.order.phoneNumber}
                </Typography>
              </Grid>
              <Grid xs={5} sm={5} md={5}>
                <Typography variant="h6">Date</Typography>
              </Grid>
              <Grid
                xs={1}
                sm={1}
                md={1}
                display={"flex"}
                justifyContent={"start"}
              >
                <Typography variant="h6">:</Typography>
              </Grid>
              <Grid xs={6} sm={6} md={6}>
                <Typography variant="h6">
                  {orderDetail?.order.resDate}
                </Typography>
              </Grid>
              <Grid xs={5} sm={5} md={5}>
                <Typography variant="h6">Time</Typography>
              </Grid>
              <Grid
                xs={1}
                sm={1}
                md={1}
                display={"flex"}
                justifyContent={"start"}
              >
                <Typography variant="h6">:</Typography>
              </Grid>
              <Grid xs={6} sm={6} md={6}>
                <Typography variant="h6">
                  {orderDetail?.order.resTime}
                </Typography>
              </Grid>

              <Grid xs={5} sm={5} md={5}>
                <Typography variant="h6">Table</Typography>
              </Grid>
              <Grid
                xs={1}
                sm={1}
                md={1}
                display={"flex"}
                justifyContent={"start"}
              >
                <Typography variant="h6">:</Typography>
              </Grid>
              <Grid xs={6} sm={6} md={6}>
                <Typography variant="h6">
                  {orderDetail?.tables.map((table) => table.name).join(", ")}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="h6">Dishes</Typography>
              </Grid>
            </Grid>
            <TableContainer
              sx={{
                marginTop: "20px",
                overflowY: "auto",
                maxHeight: "50vh",
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                },
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Dish Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail?.orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{item.dishName}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        {formatCurrencyVND(item.total / item.quantity)}
                      </TableCell>

                      <TableCell align="center">
                        {formatCurrencyVND(item.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                backgroundColor: "#F07B3F",
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
                ":hover": {
                  backgroundColor: "#FFD460",
                },
              }}
              onClick={() => {
                setOpenInvoice(true);
              }}
            >
              <Typography sx={{ color: "white" }}>Checkout</Typography>
            </Button>
            <Box flexGrow={1} />
            <Box
              component={Link}
              href={{
                pathname: "/staff/manage-order/update",
                query: { orderId: orderId },
              }}
              sx={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#E6AC0D",
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
                ":hover": {
                  backgroundColor: "#AE0001",
                },
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <Typography>Update</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
      <InvoiceModal
        orderId = {orderId}
        open={openInvoiceModal}
        handleClose={() => {
          setOpenInvoice(false); 
          onClose();
        }}
      />
    </>
  );
};

export default OrderModal;
