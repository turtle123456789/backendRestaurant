import { Box, Typography } from "@mui/material";
import SectionItem from "./section/SectionItem";

const AboutUsComponent = () => {
  return (
    <Box>
      <SectionItem
        number={1}
        title={'Lee Hotpot <br/> Greetings, esteemed guests'}
        description="Lee Hotpot brings a premium dining experience with its signature hot pot dishes, sincere customer care service, and innovative space design. Lee Hotpot's philosophy is not only to deliver delicious cuisine but also a 5-star experience in space and service. Lee Hotpot creates a relaxing space for customers. Leaving behind the hustle and bustle of daily life at the door, diners come to Lee Hotpot to find a serene and tranquil environment."
        align="left"
      />
      <SectionItem
        number={2}
        title="Our Mission"
        description="Our mission is to provide the best service to our customers."
        align="right"
      />
      <SectionItem
        number={3}
        title="Our Mission"
        description="Our mission is to provide the best service to our customers."
        align="left"
      />
    </Box>
  );
};

export default AboutUsComponent;
