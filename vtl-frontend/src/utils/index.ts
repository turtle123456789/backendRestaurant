import { getAllDishes } from "@/services/dish";
import { getOrderDetail } from "@/services/order";
import { format, parse, parseISO } from "date-fns";

export const fetchOrderDetail = async (orderId: number) => {
  const body = {
    orderId: orderId,
  };
  const response = await getOrderDetail(body);
  console.log("🚀 ~ fetchOrderDetail ~ response:", response);
  let tmp;
  if (response.status !== 200) {
    console.log(response.data.message);
    return;
  }
  const res = response.data[0];
  const { order, orderItems, tables } = res;
  let dishes = orderItems.map((dish: any) => {
    return {
      dishId: dish.dishId,
      dishName: dish.dishName,
      quantity: dish.quantity,
      total: dish.price,
    };
  });
  let table = tables.map((table: any) => {
    return {
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      position: table.position,
      description: table.description,
    };
  });
  tmp = {
    order: {
      id: order.id,
      resDate: formatDate(order.resDate),
      resTime: formatTime(order.resTime),
      people: order.people,
      resStatus: order.resStatus,
      depositAmount: order.depositAmount,
      restaurantId: order.restaurantId,
      fullName: order.fullName,
      phoneNumber: order.phoneNumber,
      totalAmount: order.totalAmount,
      cusId: order.cusId,
      createdAt: formatDateTime(order.createdAt),
      updatedAt: formatDateTime(order.updatedAt),
      paymentStatus: order.paymentStatus,
      email: order.email,
    },
    orderItems: dishes,
    tables: table,
  };
  return tmp;
};

export const fetchAllDishes = async () => {
  const response = await getAllDishes();
  if (response.status !== 200) {
    console.log(response.data.message);
    return;
  }
  let tmp: any[] = [];
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
  return tmp;
};

export const formatString = (str: string) => {
  const formattedStr = str.replace(/_/g, " ");
  return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
};

export const formatTime = (time: string) => {
  if (typeof time !== 'string' || !time) {
    console.error('Invalid input for formatTime:', time);
    return ''; // or some default value or handling
  }
  console.log( time.includes(":", 5));
  if (time.includes(":", 5)) {
    return format(parse(time, "HH:mm:ss", new Date()), "HH:mm a");
  } else {
    return format(parse(time, "HH:mm", new Date()), "HH:mm a");
  }
};

export const formatDate = (date: string) => {
  if (typeof date !== 'string' || !date) {
    console.error('Invalid input for formatDate:', date);
    return ''; // or some default value or handling
  }
  return format(parse(date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
};

export const formatDateTime = (date: string) => {
  try {
    if (typeof date !== 'string' || !date) {
      console.error('Invalid input for formatDateTime:', date);
      return ''; // or some default value or handling
    }
    const parsedDate = parseISO(date); // Automatically handles ISO 8601 formats
    return format(parsedDate, "dd/MM/yyyy HH:mm a");
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return ''; // Fallback or error handling
  }
};

export const formatCurrencyUSD = (currency: number) => {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatCurrencyVND = (currency: number | undefined) => {
  if (currency === undefined) {
    return "undefined";
  }
  return currency.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatFullName = (fullName : string) => {
  return fullName.split(" ").map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }).join(" ");
}

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
}

export const formatEmail = (email: string) => {
  return email.toLowerCase();
}
