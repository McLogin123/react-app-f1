import { Box, Center, Group, Text, Title } from "@mantine/core";
import { Header } from "../components/Header.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <Title style={{ textAlign: "center" }}>Bienvenido(a) a F1Stats</Title>
      <Center>
        <Group>
          <Text m={50} size="lg" style={{ maxWidth: 740 }}>
            Esta es mi pagina en react con datos sobre los equipo y pilotos de
            Formula 1, en la que puedes editar los pilotos de esta temporada.
          </Text>
        </Group>
      </Center>
    </>
  );
}
