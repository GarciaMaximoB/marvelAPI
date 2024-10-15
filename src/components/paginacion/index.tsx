"use client";
import { ConfigProvider, Pagination } from "antd";
import styles from "./index.module.scss";
import { useState } from "react";

export default function Paginacion() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

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
          },
          Button: {
            colorText: "rgb(255,255,255)",
            primaryShadow: "0",
          },
          Pagination: {
            itemActiveBg: "rgb(245,34,45)",
            colorPrimaryHover: "rgb(255,255,255)",
            colorBorder: "rgb(245,34,45)",
            colorText: "rgb(255,255,255)",
            colorPrimary: "rgb(255,255,255)",
            lineWidth: 0,
          },
        },
      }}
    >
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        total={100}
        showSizeChanger={false}
        pageSize={20}
      />
    </ConfigProvider>
  );
}
