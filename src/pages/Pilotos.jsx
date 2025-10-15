import { Title } from "@mantine/core";
import { Header } from "../components/Header";
import { TablaPilotos } from "../components/TablaPilotos";

export default function Pilotos() {
  return (
    <>
      <Header />
      <Title style={{ marginLeft: "20px" }}>Pilotos temporada 2025</Title>
      <TablaPilotos />
    </>
  );
}
