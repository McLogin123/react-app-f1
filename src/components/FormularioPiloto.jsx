import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SeleccionEquipo } from "./SeleccionEquipo";
import { useEffect } from "react";

export function FormularioPiloto({ opened, onClose, initData, onSave }) {
  const form = useForm({
    initData: {
      numero: "",
      name: "",
      equipo: "",
      pais: "",
      photo: "",
    },
    validate: {
      numero: (v) => (!v ? "Campo requerido" : null),
      name: (v) => (!v ? "Campo requerido" : null),
      equipo: (v) => (!v ? "Campo requerido" : null),
      pais: (v) => (!v ? "Campo requerido" : null),
    },
  });

  useEffect(() => {
    if (initData) {
      form.setValues(initData);
    } else {
      form.reset();
    }
  }, [initData]);

  function manejoDatos() {
    onSave(form.values);
    onClose();
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        key={initData ? "edit" : "new"}
        title={initData ? "Editar Piloto" : "Nuevo Piloto"}
        centered
      >
        <form onSubmit={form.onSubmit(manejoDatos)}>
          <TextInput
            label="Numero"
            withAsterisk
            {...form.getInputProps("numero")}
          />
          <TextInput
            label="Nombre"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <SeleccionEquipo
            value={form.values.equipo}
            onChange={(val) => form.setFieldValue("equipo", val ?? "")}
          />
          <TextInput
            label="Pais"
            withAsterisk
            {...form.getInputProps("pais")}
          />
          <TextInput label="Foto (url)" {...form.getInputProps("photo")} />
          <Button type="submit" fullWidth mt="md">
            Guardar
          </Button>
        </form>
      </Modal>
    </>
  );
}
