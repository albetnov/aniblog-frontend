import React from "react";
import { Badge, Tooltip } from "@chakra-ui/react";

export default function Status({ state }) {
  if (state.status === true) {
    return <Badge colorScheme="green">Success</Badge>;
  } else if (state.status === "netral") {
    return <Badge>Netral</Badge>;
  } else {
    return (
      <Tooltip label={state}>
        <Badge colorScheme="red">Failed</Badge>
      </Tooltip>
    );
  }
}
