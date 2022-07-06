import React from "react";
import { Container, Text, Divider } from "@chakra-ui/react";
import SuiteList from "./SuiteList";

export default function Content() {
  return (
    <Container shadow="lg" rounded="lg" mt="5">
      <Text fontSize="2xl">AniBlog API Test Suite List</Text>
      <Divider />
      <SuiteList />
    </Container>
  );
}
