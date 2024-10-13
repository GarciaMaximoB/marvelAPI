import { GlobalStateService } from "@/services/globalStateService";
import { CharacterUseCases } from "@/useCases/charactersUseCases";
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

interface FiltersProps {
  onFilterChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onCharacterChange: (value: string) => void;
}

export default function Filters({
  onFilterChange,
  onOrderChange,
  onCharacterChange,
}: FiltersProps) {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    CharacterUseCases.retrieveCharacters()
      .then(() => {
        const charactersData =
          GlobalStateService.getCharactersDataOutsideComponent() || [];
        setCharacters(charactersData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#1a1c25",
          fontSize: 16,
          colorPrimary: "#0648ab",
          colorInfo: "#0648ab",
          colorPrimaryText: "#ffffff",
          colorPrimaryTextActive: "#ffffff",
          colorPrimaryTextHover: "#ffffff",
          colorLink: "#ffffff",
          colorTextBase: "#ffffff",
        },
        components: {
          Form: {
            labelColor: "rgba(255,255,255,0.88)",
          },
          DatePicker: {
            colorBorder: "rgb(6,72,171)",
          },
          Input: {
            colorBorder: "rgb(6,72,171)",
          },
          InputNumber: {
            colorBorder: "rgb(6,72,171)",
          },
          Upload: {
            colorBorder: "rgb(6,72,171)",
          },
          Select: {
            colorBorder: "rgb(6,72,171)",
            selectorBg: "rgba(6,72,171,0.3)",
            optionSelectedColor: "rgba(255,255,255,0.88)",
            optionSelectedBg: "rgba(6,72,171,0.2)",
            colorTextPlaceholder: "rgba(255,255,255,0.7)",
            showArrowPaddingInlineEnd: 40,
          },
          Button: {
            colorText: "rgb(255,255,255)",
            primaryShadow: "0",
          },
        },
      }}
    >
      <Select
        placeholder="Ordenar"
        variant="filled"
        style={{ width: "30%" }}
        onChange={onOrderChange}
        options={[
          { value: "none", label: "-" },
          { value: "az", label: "A - Z" },
          { value: "za", label: "Z - A" },
          { value: "page", label: "Cantidad de paginas" },
        ]}
      />

      <Select
        placeholder="Filtrar"
        variant="filled"
        style={{ width: "30%" }}
        onChange={onFilterChange}
        options={[
          { value: "none", label: "-" },
          { value: "api", label: "Comics existentes" },
          { value: "database", label: "Creados por el usuario" },
        ]}
      />

      <Select
        showSearch
        placeholder="Personajes"
        variant="filled"
        style={{ width: "30%" }}
        loading={loading}
        onChange={onCharacterChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: "none", label: "-" },
          ...characters.map((character: any) => ({
            value: character.name,
            label: character.name,
          })),
        ]}
      />
    </ConfigProvider>
  );
}
