/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField, Autocomplete, Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import useNotify from "@/hooks/useNotify";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//-----------------------------------------------------Test
type Province = {
  name: string;
  code: string;
};

type Dish = {
  id: number;
  name: string;
  provinceCode: string;
};

const provinces: Province[] = [
  {
    name: "Toàn quốc",
    code: "00",
  },
  {
    name: "Hà Nội",
    code: "01",
  },
  {
    name: "Nam Định",
    code: "02",
  },
  {
    name: "Hải Phòng",
    code: "03",
  },
  {
    name: "Thanh Hóa",
    code: "04",
  },
  {
    name: "Nghệ An",
    code: "05",
  },
  {
    name: "Tp. Hồ Chí Minh",
    code: "06",
  },
];

const dishes: Dish[] = [
  {
    name: "Bún chả",
    id: 1,
    provinceCode: "01",
  },
  {
    name: "Phở",
    id: 2,
    provinceCode: "02",
  },
  {
    name: "Bánh mỳ",
    id: 3,
    provinceCode: "01",
  },
  {
    name: "Bún đậu mắm tôm",
    id: 4,
    provinceCode: "01",
  },
  {
    name: "Bún ốc",
    id: 5,
    provinceCode: "01",
  },
  {
    name: "Bún riêu",
    id: 6,
    provinceCode: "01",
  },
  {
    name: "Bún bò Huế",
    id: 7,
    provinceCode: "01",
  },
  {
    name: "Bún mắm",
    id: 8,
    provinceCode: "01",
  },
  {
    name: "Bún mọc",
    id: 9,
    provinceCode: "01",
  },
  {
    name: "Bún ốc",
    id: 10,
    provinceCode: "01",
  },
  {
    name: "Bún bò Nam Bộ",
    id: 11,
    provinceCode: "01",
  },
  {
    name: "Bún bò cay",
    id: 12,
    provinceCode: "01",
  },
  {
    name: "Bún bò xào",
    id: 13,
    provinceCode: "01",
  },
  {
    name: "Bún bò xào",
    id: 14,
    provinceCode: "02",
  },
  {
    name: "Bún bò xào",
    id: 15,
    provinceCode: "03",
  },
  {
    name: "Bún bò xào",
    id: 16,
    provinceCode: "04",
  },
  {
    name: "Bún bò xào",
    id: 17,
    provinceCode: "05",
  },
  {
    name: "Bún bò xào",
    id: 18,
    provinceCode: "06",
  },
];
// ----------------------------------------------------Test
const SearchBox = () => {
  const { successNotify } = useNotify();
  const [provinceCode, setProvinceCode] = React.useState(provinces[0].code);
  const [inputValue, setInputValue] = React.useState<Dish>({
    id: 0,
    name: "",
    provinceCode: "",
  });
  const [input, setInput] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setProvinceCode(event.target.value);
    // successNotify("Chọn thành công, mã tỉnh: " + event.target.value);
  };
  const handleFilterOptions = (
    options: Dish[],
    { inputValue }: { inputValue: string }
  ) => {
    return options.filter((option) => {
      const name = option.name.toLowerCase();
      const province = option.provinceCode.toLowerCase();
      const input = inputValue.toLowerCase();
      return name.includes(input) && provinceCode == "00"
        ? true
        : province.includes(provinceCode);
    });
  };
  React.useEffect(() => {
    const dishInNewProvince = dishes.find(
      (dish) =>
        dish.name === inputValue.name && dish.provinceCode === provinceCode
    );

    if (dishInNewProvince) {
      setInputValue(dishInNewProvince);
    } else {
      setInputValue({
        id: 0,
        name: "",
        provinceCode: "",
      });
    }
  }, [provinceCode]);
  return (
    <Box
      sx={{
        
        width: '80%',
        height: "66px",
      }}
    >
      <Box
        sx={{
          
          border: "2px solid #D78080",
          height: "100%",
          borderRadius: 6,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Select
          value={provinceCode}
          onChange={(event: SelectChangeEvent) => {
            handleChange(event);
          }}
          sx={{
            
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove the border
            },
          }}
        >
          {provinces.map((province) => (
            <MenuItem
              key={province.code}
              value={province.code}
              sx={{
                textAlign: "center",
              }}
            >
              {province.name}
            </MenuItem>
          ))}
        </Select>
        <Divider orientation="vertical" variant="middle" flexItem />
        <TextField
          id="outlined-basic"
          placeholder="Search by name"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
           
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove the border
            },
          }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default SearchBox;
