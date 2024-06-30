import Link from "next/link";
import { Box, styled } from "@mui/material";
import Image from "next/legacy/image";
import { useAppSelector } from "@/redux/hooks";
const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  const { roleId } = useAppSelector((state) => state.profile);

  return (
    <LinkStyled
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      href={
        roleId === 1
          ? "/admin/"
          : roleId === 2
          ? "/staff/"
          : roleId === 3
          ? "/"
          : "/"
      }
    >
      <Box sx={{ marginLeft: "auto", marginTop: "13%", marginBottom: "10%" }}>
        <Image
          src="/images/logos/logo.png"
          alt="logo"
          height={73}
          width={150}
          objectFit="contain"
          priority
        />
      </Box>
    </LinkStyled>
  );
};

export default Logo;
