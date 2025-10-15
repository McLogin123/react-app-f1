import { useEffect, useState } from "react";
import { Input, InputBase, Combobox, useCombobox } from "@mantine/core";

const equipos = [
  "Alpine",
  "Aston Martin",
  "Ferrari",
  "Haas",
  "Sauber",
  "McLaren",
  "Mercedes",
  "Racing Bulls",
  "Red Bull Racing",
  "Williams",
];

export function SeleccionEquipo({ value, onChange }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [innerValue, setInnerValue] = useState(value ?? null);

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
