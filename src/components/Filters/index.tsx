import { ConfigProvider, Select } from "antd";

interface FiltersProps {
  onFilterChange: (value: string) => void;
  onOrderChange: (order: string) => void;
}

export default function Filters({
  onFilterChange,
  onOrderChange,
}: FiltersProps) {
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
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: "1", label: "Spiderman" },
          { value: "2", label: "Ironman" },
          { value: "3", label: "American Captain" },
        ]}
      />
    </ConfigProvider>
  );
}
