import { Link } from "react-router";
import { Button, Container, Group, Image } from "@mantine/core";
import classes from "./header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image
          src="https://logos-world.net/wp-content/uploads/2023/12/F1-Logo.png"
          w={94}
          fit="contain"
        />
        <Group gap={5} visibleFrom="xs">
          <Link to="/" className={classes.link}>
            <Button variant="light" color="gray">
              Home
            </Button>
          </Link>
          <Link to="/equipos" className={classes.link}>
            <Button variant="light" color="gray">
              Equipos
            </Button>
          </Link>
          <Link to="/pilotos" className={classes.link}>
            <Button variant="light" color="gray">
              Pilotos
            </Button>
          </Link>
        </Group>
      </Container>
    </header>
  );
}
