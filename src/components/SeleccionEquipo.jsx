import { useEffect, useState } from "react";
import { Input, InputBase, Combobox, useCombobox } from "@mantine/core";
import { getEquipos } from "../api/f1Api";

export function SeleccionEquipo({ value, onChange }) {
  const [equipos, SetEquipos] = useState([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [innerValue, setInnerValue] = useState(value ?? null);

  useEffect(() => {
    const loadEquipos = async () => {
      const data = await getEquipos();
      SetEquipos(data.map((eq) => eq.team));
    };
    loadEquipos();
  }, []);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const options = equipos.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      value={innerValue}
      onChange={onChange}
      store={combobox}
      onOptionSubmit={(val) => {
        setInnerValue(val);
        onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label="Equipo"
          component="button"
          type="button"
          pointer
          withAsterisk
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {innerValue || (
            <Input.Placeholder>Seleccione equipo</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
