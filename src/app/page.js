import Image from "next/image";
import styles from "./page.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
        <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Absen</Th>
            <Th>Kelas</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>John Doe</Td>
            <Td>11</Td>
            <Td>XII SIJA B</Td>
          </Tr>
        </Tbody>
        </Table>

    </>
  );
}
