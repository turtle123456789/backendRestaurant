import { Box } from "@mui/material";
import SubItem from "../sub-list-item/SubItem";

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

interface SubListProps {
  orders: Order[];
}

const SubList = ({ orders }: SubListProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        mb: 2,
      }}
    >
      {orders.map((order, index) => (
        <SubItem key={index} order={order} />
      ))}
    </Box>
  );
};

export default SubList;
