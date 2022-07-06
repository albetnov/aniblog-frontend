import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Topbar() {
  return (
    <Box py="3" px="5" backgroundColor="blue.400" opacity="80">
      <Text color="white" fontSize="2xl">
        AniBlog UI API Test Suite
      </Text>
    </Box>
  );
}
