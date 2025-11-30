import { Group } from "@mantine/core";
import { CartaEquipos } from "./CartaEquipos";
import { useState, useEffect } from "react";
import { getPilotos, getEquipos } from "../api/f1Api";

export function ContenedorEquipos() {
  const [equipos, setEquipos] = useState([]);
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [equiposData, pilotosData] = await Promise.all([
        getEquipos(),
        getPilotos(),
      ]);
      setEquipos(equiposData);
      setPilotos(pilotosData);
    };
    loadData();
  }, []);

  return (
    <Group justify="center" gap="lg" my="xl">
      {equipos.map((equipo) => (
        <CartaEquipos key={equipo.team} equipo={equipo} piloto={pilotos} />
      ))}
    </Group>
  );
}
