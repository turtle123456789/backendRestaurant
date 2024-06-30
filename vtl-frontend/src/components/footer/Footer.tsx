import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import { useRouter } from "next/router";
import Link from "next/link";

type QuickLink = {
  title: string;
  icon?: any;
  href?: string;
  onClick?: () => void;
};

const Footer = () => {
  const router = useRouter();

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleScroll = (elementId: string) => {
    if (router.pathname === "/") {
      // If we're already on the home page, just scroll to the "list-restaurant" section
      scrollToElement(elementId);
    } else {
      // If we're not on the home page, navigate to the home page and then scroll to the "list-restaurant" section
      window.location.href = "/";
      scrollToElement(elementId);
    }
  };
  const quickLinks: QuickLink[] = [
    { title: "Home", href: "/" },
    { title: "Restaurant", onClick: () => handleScroll("list-restaurant") },
    { title: "About Us", onClick: () => handleScroll("footer") },
    { title: "Contact Us", onClick: () => handleScroll("footer") },
  ];
  const contactDetails = [
    {
      title: "0123456789",
      href: "tel:0123456789",
      icon: <LocalPhoneRoundedIcon sx={{ color: "white" }} />,
    },
    {
      title: "vuthuylinh23082002@gmail.com",
      href: "mailto:vuthuylinh23082002@gmail.com",
      icon: <EmailIcon sx={{ color: "white" }} />,
    },
    {
      title: "1st Dai Co Viet, Hai Ba Trung, Ha Noi",
      href: "https://www.google.com/maps/place/1+%C4%90%E1%BA%A1i+C%E1%BB%93+Vi%E1%BB%87t,+B%C3%A1ch+Khoa,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i,+Vietnam/@21.0074279,105.8399344,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab8a922653a9:0x6c2ec19683313eab!8m2!3d21.0074229!4d105.8425147!16s%2Fg%2F11gfjt79ty?entry=ttu",
      icon: <PlaceIcon sx={{ color: "white" }} />,
    },
  ];
  return (
    <>
      <Box
        id="footer"
        sx={{
          paddingLeft: "80px",
          paddingRight: "80px",
          paddingTop: "40px",
          height: "100%", // Add a box shadow
          width: "100%",
          backgroundColor: "#AE0001",
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Typography variant="h3" color={"white"}>
              Lee Hotpot
            </Typography>
            <Typography color={"white"} fontSize={14} pt={2}>
              Hot Pot is not just a dish, it is an experience for the taste buds
              and the soul. Hot pot is exotic, but not intimidating. It is local
              yet universal.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <FacebookOutlinedIcon sx={{ color: "white" }} />
              <InstagramIcon sx={{ color: "white", ml: 2 }} />
              <TwitterIcon sx={{ color: "white", ml: 2 }} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" color={"white"}>
              Quick Links
            </Typography>
            <Box pt={2}>
              {quickLinks.map((link, index) => (
                <List disablePadding key={index}>
                  <ListItem>
                    <ListItemButton
                      sx={{
                        padding: 0,
                        ":hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      component={link.href ? Link : Button}
                      href={link.href}
                      onClick={link.onClick}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          color: "inherit",
                        }}
                      >
                        <ArrowRightIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          color: "white",
                        }}
                      >
                        {link.title}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" color={"white"}>
              Contact Details
            </Typography>
            <Box pt={2}>
              {contactDetails.map((contact, index) => (
                <List disablePadding key={index}>
                  <ListItem>
                    <ListItemButton
                      sx={{
                        padding: 0,
                        ":hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      component={contact.href ? Link : Button}
                      href={contact.href}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          color: "inherit",
                        }}
                      >
                        {contact.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          color: "white",
                        }}
                      >
                        {contact.title}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" color={"white"}>
              Map
            </Typography>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6308940101103!2d105.83993441122706!3d21.00742788842932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a922653a9%3A0x6c2ec19683313eab!2zMSDEkOG6oWkgQ-G7kyBWaeG7h3QsIELDoWNoIEtob2EsIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1717606281011!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0, padding: "20px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>
      </Box>
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          color: "white",
          borderTop: "1px solid #fff",
          backgroundColor: "#AE0001",
          padding: "10px 0",
        }}
      >
        &copy; 2023 EXOL. More information, please visit my facebook.
        <Link
          href="https://www.facebook.com/weareoneEXO"
          target="_blank"
          rel="noopener"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          &#8594; Click here &#8592;
        </Link>
      </Typography>
    </>
  );
};

export default Footer;

{
  /* <Typography variant="h6">Contact Details</Typography>
<Typography>Phone: 0123456789</Typography>
<Typography>Email: info@restaurant.com</Typography>
<Typography>Address: 1st Dai Co Viet, Hai Ba Trung, Ha Noi</Typography>
<Typography>
  &copy; 2023 EXOL. More information, please visit my facebook.
  <Link
    href="https://www.facebook.com/weareoneEXO"
    target="_blank"
    rel="noopener"
  >
    &#8594; Click here &#8592;
  </Link>
</Typography> 
*/
}
