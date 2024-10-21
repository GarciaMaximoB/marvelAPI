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
import { Field, Formik, Form as FormikForm } from "formik";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ComicsUseCases } from "@/useCases/comicsUseCases";

export default function Formulario({ edit }: { edit: boolean }) {
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadImageToCloudinary = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Marvel");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtghwrcys/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    const file = values.comic.image[0]?.originFileObj;
    console.log(file);
    const imageUrl = await uploadImageToCloudinary(file);

    const formattedValues = {
      ...values,
      comic: {
        ...values.comic,
        date: values.comic.date
          ? dayjs(values.comic.date).format("DD-MM-YYYY")
          : undefined,
        imageUrl: imageUrl,
      },
    };

    const id = uuidv4()
      .replace(/[^0-9]/g, "")
      .substr(0, 10);

    const comic = {
      id: id,
      title: formattedValues.comic.name,
      thumbnail: {
        path: imageUrl,
        extension: "",
      },
      pageCount: formattedValues.comic.pages,
      source: "DATABASE",
      description: formattedValues.comic.description,
      sale_date: formattedValues.comic.date,
    };

    await ComicsUseCases.createComic(comic);
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
      <Formik
        initialValues={{
          comic: {
            name: "",
            pages: 0,
            date: null,
            description: "",
            image: [],
          },
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ setFieldValue, handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit} style={{ width: 600 }}>
            <Form.Item
              label="Nombre"
              style={{ width: "100%" }}
              layout="vertical"
            >
              <Field name="comic.name">
                {({ field }: { field: any }) => (
                  <Input {...field} placeholder="Nombre del cómic" />
                )}
              </Field>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Cantidad de páginas"
                  style={{ width: "100%" }}
                  layout="vertical"
                >
                  <Field name="comic.pages">
                    {({ field }: { field: any }) => (
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        min={0}
                        max={200}
                        onChange={(value) =>
                          setFieldValue("comic.pages", value)
                        }
                      />
                    )}
                  </Field>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Fecha de lanzamiento"
                  style={{ width: "100%" }}
                  layout="vertical"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date) => setFieldValue("comic.date", date)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Descripción"
              style={{ width: "100%" }}
              layout="vertical"
            >
              <Field name="comic.description">
                {({ field }: { field: any }) => (
                  <Input.TextArea {...field} style={{ height: 100 }} />
                )}
              </Field>
            </Form.Item>

            <Form.Item label="Portada" layout="vertical">
              <Form.Item
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="files"
                  beforeUpload={() => false}
                  onChange={(info) =>
                    setFieldValue("comic.image", info.fileList)
                  }
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Haz clic o arrastra un archivo para subirlo
                  </p>
                  <p className="ant-upload-hint">
                    Solo puedes subir un archivo
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "30px" }}
            >
              {edit ? "Editar comic" : "Crear comic"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </ConfigProvider>
  );
}
