import { TableCell, TableRow, Paper } from "@mui/material";
import Link from "next/link";

type ResCard = {
  id: string;
  resName: string;
  resImage: string;
  resAddress: string;
};
import Image from "next/image";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ResItem = ({ item }: { item: ResCard }) => {
  return (
    <TableRow id={item.id}>
      <TableCell align="center">
        <Image src={item.resImage} alt="res-1" width={252} height={189} />
      </TableCell>
      <TableCell align="center">{item.resName}</TableCell>
      <TableCell align="center">{item.resAddress}</TableCell>
      <TableCell align="center">
        <Link
          href={{
            pathname: "/admin/manage-restaurant/update",
            query: { restaurantId: item.id },
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ArrowForwardIosIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
};
export default ResItem;
