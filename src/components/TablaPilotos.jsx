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
import { PilotosData } from "../../data/PilotosData";
import { useState } from "react";
import { FormularioPiloto } from "./FormularioPiloto";

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
  const [pilotos, setPilotos] = useState(PilotosData);
  const [editando, setEditando] = useState(null);
  const [opened, setOpened] = useState(false);

  function borrarPiloto(numero) {
    setPilotos(
      pilotos.filter(function (p) {
        return p.numero !== numero;
      })
    );
  }

  function editarPiloto(piloto) {
    setEditando(piloto);
    setOpened(true);
  }

  function manejoGuardado(values) {
    const updated = {
      ...values,
      numero: editando ? editando.numero : values.numero,
    };

    setPilotos((prev) =>
      editando
        ? prev.map((p) => (p.numero === updated.numero ? updated : p))
        : [...prev, updated]
    );
    setOpened(false);
    setEditando(null);
  }

  const rows = pilotos.map((item) => (
    <Table.Tr key={item.numero}>
      <Table.Td>
        <Text fz="sm">{item.numero}</Text>
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
        <Badge color={TeamColors[item.equipo?.toLowerCase()]} variant="light">
          {item.equipo}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.pais}</Text>
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
            onClick={() => borrarPiloto(item.numero)}
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
