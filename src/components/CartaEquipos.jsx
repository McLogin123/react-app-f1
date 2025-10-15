import { IconCalendarEvent, IconCar, IconEngine } from "@tabler/icons-react";
import { Card, Center, Group, Image, Text, Title } from "@mantine/core";
import classes from "./cartaequipos.module.css";

export function CartaEquipos({ equipo, piloto }) {
  const pilotosActuales = piloto.filter((p) => p.equipo === equipo.Team);

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      style={{ width: 540, margin: 10 }}
    >
      <Card.Section className={classes.imageSection}>
        <Image
          src={equipo["Photo URL"]}
          alt={equipo["Full Team Name"]}
          style={{ padding: 20 }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Title order={3} fw={700} className={classes.teamName}>
            {equipo["Full Team Name"]}
          </Title>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Group gap="xs" justify="center">
          <Center style={{ flexDirection: "column", minWidth: 100 }}>
            <IconEngine size={20} stroke={1.5} />
            <Text size="xs" c="dimmed">
              Motor
            </Text>
            <Text size="sm" fw={500}>
              {equipo["Power Unit"]}
            </Text>
          </Center>

          <Center style={{ flexDirection: "column", minWidth: 100 }}>
            <IconCar size={20} stroke={1.5} />
            <Text size="xs" c="dimmed">
              Chasis
            </Text>
            <Text size="sm" fw={500}>
              {equipo.Chassis}
            </Text>
          </Center>

          <Center style={{ flexDirection: "column", minWidth: 100 }}>
            <IconCalendarEvent size={20} stroke={1.5} />
            <Text size="xs" c="dimmed">
              Fecha Debut
            </Text>
            <Text size="sm" fw={500}>
              {equipo["First Team Entry"]}
            </Text>
          </Center>
        </Group>

        <Group gap="xs" justify="center">
          <Center style={{ flexDirection: "column", minWidth: 100 }}>
            {pilotosActuales.length > 0 && (
              <Center style={{ flexDirection: "column", minWidth: 100 }}>
                <Text size="sm" mt="sm" c="dimmed">
                  Pilotos Actuales:
                </Text>
                {pilotosActuales.map((p) => (
                  <Text key={p.numero} size="sm">
                    {p.name} (#{p.numero})
                  </Text>
                ))}
              </Center>
            )}
          </Center>
        </Group>
      </Card.Section>
    </Card>
  );
}
