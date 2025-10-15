import { EquiposData } from "../../data/EquiposData";
import { PilotosData } from "../../data/PilotosData";
import { Group } from "@mantine/core";
import { CartaEquipos } from "./CartaEquipos";

export function ContenedorEquipos() {
  return (
    <Group justify="center" gap="lg" my="xl">
      {EquiposData.map((equipo) => (
        <CartaEquipos key={equipo.Team} equipo={equipo} piloto={PilotosData} />
      ))}
    </Group>
  );
}
