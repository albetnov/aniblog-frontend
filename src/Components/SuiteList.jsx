import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Code,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Status from "./Status";
import * as Api from "../Utils/Api";

export default function SuiteList() {
  const [suites, setSuites] = useState({
    loginUser: { status: "netral" },
    loginAdmin: { status: "netral" },
    logout: { status: "netral" },
    register: { status: "netral" },
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const checkForAuth = () => {
    if (
      suites.loginUser.status !== "netral" ||
      suites.loginAdmin.status !== "netral"
    ) {
      return true;
    }
    return false;
  };

  const cleanAuth = () => {
    setSuites((prevValue) => ({
      ...prevValue,
      loginUser: { status: "netral" },
      loginAdmin: { status: "netral" },
    }));
  };

  const loginAdmin = async () => {
    if (checkForAuth()) {
      return setError("You already logged in!");
    }
    try {
      setIsLoading(true);
      await Api.loginAdmin();
      setSuites((prevValue) => ({
        ...prevValue,
        loginAdmin: { status: true },
        logout: { status: "netral" },
      }));
    } catch (err) {
      setSuites((prevValue) => ({
        ...prevValue,
        loginAdmin: { status: false, message: err.response.data },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async () => {
    if (checkForAuth()) {
      return setError("You already logged in!");
    }
    try {
      setIsLoading(true);
      await Api.loginUser();
      setSuites((prevValue) => ({
        ...prevValue,
        loginUser: { status: true },
        logout: { status: "netral" },
      }));
    } catch (err) {
      setSuites((prevValue) => ({
        ...prevValue,
        loginUser: { status: false, message: err.response.data },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      setIsLoading(true);
      await Api.logout();
      cleanAuth();
      await Api.registerUser();
    } catch (err) {
      if (
        err.response.status == 422 &&
        err.response.data.message.startsWith("The name field")
      ) {
        setSuites((prevValue) => ({
          ...prevValue,
          register: { status: true },
          logout: { status: "netral" },
        }));
      } else {
        setSuites((prevValue) => ({
          ...prevValue,
          register: { status: false, message: err.response.data },
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!checkForAuth()) {
      return setError("You are not logged in!");
    }

    try {
      setIsLoading(true);
      await Api.logout();
      setSuites((prevValue) => ({
        ...prevValue,
        logout: { status: true },
      }));
      cleanAuth();
    } catch (err) {
      setSuites((prevValue) => ({
        ...prevValue,
        logout: { status: false, message: err.response.data },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error on performing action</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        ""
      )}
      {isLoading ? (
        <Alert status="loading">
          <AlertIcon />
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Route</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Code>/login</Code>
                </Td>
                <Td>
                  <Status state={suites.loginAdmin} />
                </Td>
                <Td>
                  <Button onClick={loginAdmin}>Authenticate As Admin</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Code>/login</Code>
                </Td>
                <Td>
                  <Status state={suites.loginUser} />
                </Td>
                <Td>
                  <Button onClick={loginUser}>Authenticate as User</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Code>/register</Code>
                </Td>
                <Td>
                  <Status state={suites.register} />
                </Td>
                <Td>
                  <Button onClick={registerUser}>Attempt Register</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Code>/logout</Code>
                </Td>
                <Td>
                  <Status state={suites.logout} />
                </Td>
                <Td>
                  <Button onClick={logout}>Logout</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
