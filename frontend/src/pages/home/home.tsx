import { Box } from "@mui/material";

import { Footer, TypingAnim } from "../../components";

export const Home = () => {
  return (
    <Box width={"100%"} height={"75vh"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "80%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
      </Box>
      <Box sx={{ margin: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};
