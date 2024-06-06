import { Button, Center, Container, Image, Paper, Text, Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Kitchen Scheduler App" },
    { name: "description", content: "Welcome to the Kitchen Scheduler App" },
  ];
};

export default function Index() {
  return (
    <Paper bg="blue.4" style={{
      alignContent: "center",
    }} h="100dvh">
      <Center mb="lg">
        <Image src="/logo.png" alt="Kitchen Scheduler App" w={200} />
      </Center>
      <Paper bg="blue.7" p="lg" c="white" >
        <Container my="xl" >
          <Title order={1}>
            Subsi Sibindenma Wattar AAU
          </Title>
          <p>
            Aplikasi ini membantu Anda dalam menentukan jadwal shift karyawan dapur
            dengan mudah dan cepat menggunakan algoritma genetika.
          </p>
          <Text fz="h3">Hanif Ossha Yananda</Text>
          <Text fz="h4" c="gray.2" mb="lg">2021.675</Text>
          <Button variant="white" component={NavLink} to="/app/">Mulai Aplikasi</Button>
        </Container>
      </Paper>
    </Paper>
  );
}
