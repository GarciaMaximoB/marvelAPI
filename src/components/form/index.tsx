"use client";

import {
  DatePicker,
  Form,
  Button,
  Input,
  InputNumber,
  Upload,
  Col,
  Row,
  ConfigProvider,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

export default function Formulario({ edit }: { edit: boolean }) {
  const validateMessages = {
    required: "Se requiere ${label}!",
    types: {
      number: "${label} no es un numero válido!",
    },
  };
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Por favor elija la fecha de lanzamiento!",
      },
    ],
  };
  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
    };
    console.log("Received values of form: ", values);
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
          },
          Button: {
            colorText: "rgb(255,255,255)",
            primaryShadow: "0",
          },
        },
      }}
    >
      <Form
        name="time_related_controls"
        onFinish={onFinish}
        style={{ width: 600 }}
        validateMessages={validateMessages}
        layout="vertical"
      >
        <Form.Item
          name={["comic", "name"]}
          label="Nombre"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["comic", "paginas"]}
              label="Cantidad de páginas"
              rules={[{ type: "number", min: 0, max: 200, required: true }]}
              style={{ width: "100%" }}
            >
              <InputNumber
                className={styles.paginas}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date-picker"
              label="Fecha de lanzamiento"
              style={{ width: "100%" }}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={["comic", "description"]} label="Descripción">
          <Input.TextArea style={{ height: 100 }} />
        </Form.Item>

        <Form.Item label="Portada">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Hace clic o arrastrá un archivo para subirlo
              </p>
              <p className="ant-upload-hint">Solo puedes subir un archivo</p>
            </Upload.Dragger>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: "30px" }}
          >
            {edit ? "Editar comic" : "Crear comic"}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
