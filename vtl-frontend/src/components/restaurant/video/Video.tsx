import { Box, Typography } from "@mui/material";

const Video = () => {
  return (
    <Box
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          margin: "10px",
          padding: "16px",
        }}
      >
        News
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px",
          pl: 5,
          pb: 5,
          pr: 5,
          borderRadius: "10px",
          backgroundColor: "transparent",
        }}
      >
        <iframe
          width="60%"
          height="400px"
          src="https://www.youtube.com/embed/zXAqw0Vzr4w"
          title="Nothing you can’t solve with a traditional Sichuan hot pot这世界上没有什么事情是一顿地道老四川火锅解决不了的|Liziqi channel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <Typography
          sx={{
            width: "40%",
            padding: "10px",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          It&apos;s so cold outside, let&apos;s place a traditional Sichuan hot
          pot at our website! The boiling red soup brings all the trouble away,
          it warms your heart and stomach. There&apos;s nothing you can&apos;t
          solve with our Sichuan hot pot!
        </Typography>
      </Box>
    </Box>
  );
};

export default Video;
