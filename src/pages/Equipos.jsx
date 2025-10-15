import { List, Text, Title } from "@mantine/core";
import { Header } from "../components/Header";
import { ContenedorEquipos } from "../components/ContenedorEquipos";

export default function Equipos() {
  return (
    <>
      <Header />
      <Title style={{ marginLeft: "20px" }}>Equipos Temporada 2025</Title>
      <Text c="dimmed" style={{ marginLeft: "22px" }}>
        Informacion del equipo y vehiculo
      </Text>
      <ContenedorEquipos />
    </>
  );
}
