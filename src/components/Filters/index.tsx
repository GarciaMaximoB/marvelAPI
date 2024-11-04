import { GlobalStateService } from "@/services/globalStateService";
import { CharacterUseCases } from "@/useCases/charactersUseCases";
import { debounce } from "@/utils/debounce";
import { ConfigProvider, Select } from "antd";
import { useCallback, useEffect, useState } from "react";

export default function Filters() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [disableAllFilter, setDisableAllFilter] = useState(false);
  const [filter, setFilter] = useState(
    GlobalStateService.getFilterOutsideComponent()
  );

  const characters = GlobalStateService.getCharactersDataOutsideComponent();

  useEffect(() => {
    const updatedFilter = GlobalStateService.getFilterOutsideComponent();
    setFilter(updatedFilter);
  }, [GlobalStateService.getFilterOutsideComponent()]);

  const onSearch = useCallback(
    debounce((value: string) => {
      setLoading(true);
      CharacterUseCases.retrieveCharacters(value).then(() => {
        setLoading(false);
      });
    }, 500),
    []
  );
  useEffect(() => {
    setLoading(true);
    CharacterUseCases.retrieveCharacters().then(() => {
      setLoading(false);
    });
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => onSearch(searchQuery), 300),
    [onSearch]
  );

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    if (query === "") {
      onSearch("");
    } else {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch, onSearch]);

  const handleOrderChange = (value: string) => {
    GlobalStateService.setOrder(value);
    if (value === "title" || value === "-title") {
      if (filter === "") {
        GlobalStateService.setFilter("API");
      }
      setDisableAllFilter(true);
    } else {
      setDisableAllFilter(false);
    }
  };

  const handleFilterChange = (value: string) => {
    GlobalStateService.setFilter(value);
    setFilter(value);
  };

  const handleCharacterChange = (value: string) => {
    GlobalStateService.setCharacters(value);
  };

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
        style={{ width: "30%" }}
        onChange={handleOrderChange}
        options={[
          { value: "-onsaleDate", label: "Últimos lanzamientos" },
          { value: "title", label: "A-Z" },
          { value: "-title", label: "Z-A" },
        ]}
      />

      <Select
        placeholder="Filtrar"
        value={filter}
        style={{ width: "30%" }}
        onChange={handleFilterChange}
        options={[
          { value: "", label: "Todos", disabled: disableAllFilter },
          { value: "API", label: "Comics existentes" },
          { value: "user", label: "Creados por el usuario" },
        ]}
      />

      <Select
        showSearch
        onSearch={handleInputChange}
        placeholder="Personajes"
        style={{ width: "30%" }}
        loading={loading}
        onChange={handleCharacterChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: "", label: "-" },
          ...characters.map((character: any) => ({
            value: character.id,
            label: character.name,
          })),
        ]}
      />
    </ConfigProvider>
  );
}
