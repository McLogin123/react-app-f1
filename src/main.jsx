import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx";
import Equipos from "./pages/Equipos.jsx";
import Pilotos from "./pages/Pilotos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/equipos",
    element: <Equipos />,
  },
  {
    path: "/pilotos",
    element: <Pilotos />,
  },
]);

createRoot(document.getElementById("root")).render(
  <MantineProvider defaultColorScheme="dark">
    <StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </StrictMode>
  </MantineProvider>
);
