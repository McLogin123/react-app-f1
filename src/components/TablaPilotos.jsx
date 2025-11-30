import { IconPencil, IconTrash } from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Table,
  Text,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { FormularioPiloto } from "./FormularioPiloto";
import {
  getPilotos,
  deletePiloto,
  updatePiloto,
  createPiloto,
} from "../api/f1Api";

const TeamColors = {
  ferrari: "#ED1131",
  mercedes: "#00D7B6",
  alpine: "#00A1E8",
  mclaren: "#F47600",
  sauber: "#01C00E",
  haas: "#9C9FA2",
  williams: "#1868DB",
  "red bull racing": "#4781D7",
  "aston martin": "#229971",
  "racing bulls": "#6C98FF",
};

export function TablaPilotos() {
  const [pilotos, setPilotos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [opened, setOpened] = useState(false);

  const loadPilotos = async () => {
    const data = await getPilotos();
    setPilotos(data);
  };

  useEffect(() => {
    const loadPilotos = async () => {
      const data = await getPilotos();
      setPilotos(data);
    };
    loadPilotos();
  }, []);

  function editarPiloto(piloto) {
    setEditando(piloto);
    setOpened(true);
  }

  async function borrarPiloto(id) {
    if (window.confirm(`¿Desea eliminar piloto?`)) {
      try {
        await deletePiloto(id);
        await loadPilotos();
        setPilotos(pilotos.filter((p) => p.id !== id));
      } catch (err) {
        alert("Error al eliminar: " + err.message);
      }
    }
  }

  async function manejoGuardado(values) {
    try {
      const updated = {
        number: parseInt(values.number),
        name: values.name,
        team: values.team || values.equipo,
        country: values.country || values.pais,
        photo: values.photo || null,
      };

      if (editando) {
        await updatePiloto(editando.id, updated);
        setPilotos(
          pilotos.map((p) => (p.id === editando.id ? { ...p, ...updated } : p))
        );
      } else {
        const nuevoPiloto = await createPiloto(updated);
        setPilotos([...pilotos, nuevoPiloto]);
      }
      await loadPilotos();

      setOpened(false);
      setEditando(null);
    } catch (err) {
      if (err.status === 422 && err.data?.errors.number) {
        alert(`Numero en uso`);
        alert("Elige otro numero entre 1 y 99");
      } else if (err.status === 422) {
        const errores = Object.values(err.data.errors || {}).flat.join("\n");
        alert(`Error de validacion:\n${errores}`);
      } else {
        alert(`Error: ${err.message}`);
      }
    }
  }

  const rows = pilotos.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Text fz="sm">{item.number}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={50} src={item.photo} radius={30} />
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color={TeamColors[item.team?.team?.toLowerCase()]}
          variant="light"
        >
          {item.team?.team}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.country}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => editarPiloto(item)}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => borrarPiloto(item.id)}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <FormularioPiloto
        opened={opened}
        onClose={() => {
          setOpened(false);
          setEditando(null);
        }}
        initData={editando}
        onSave={manejoGuardado}
      />
      <div
        style={{
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="default"
          mb="sm"
          onClick={() => {
            setEditando(null);
            setOpened(true);
          }}
        >
          Nuevo Piloto
        </Button>
      </div>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Numero</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Equipo</Table.Th>
              <Table.Th>Pais (nacimiento)</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
