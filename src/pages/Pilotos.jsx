import { Text, Title } from "@mantine/core";
import { Header } from "../components/Header";
import { TablaPilotos } from "../components/TablaPilotos";

export default function Pilotos() {
  return (
    <>
      <Header />
      <Title style={{ marginLeft: "20px" }}>Pilotos temporada 2025</Title>
      <Text c="dimmed" style={{ marginLeft: "22px" }}>
        El numero de un piloto no puede estar ocupado por otro
      </Text>
      <TablaPilotos />
    </>
  );
}
