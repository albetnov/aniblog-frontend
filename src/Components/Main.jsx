import React from "react";
import Topbar from "./Topbar";
import { Box } from "@chakra-ui/react";
import Content from "./Content";

export default function Main() {
  return (
    <Box>
      <Topbar />
      <Content />
    </Box>
  );
}
