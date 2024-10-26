"use client";
import { useRouter } from "next/navigation";
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
  notification,
  message,
} from "antd";
import { RadiusBottomrightOutlined, InboxOutlined } from "@ant-design/icons";
import { Field, Formik, Form as FormikForm } from "formik";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useEffect, useState } from "react";
import type { NotificationArgsProps, UploadProps } from "antd";
import { GlobalStateService } from "@/services/globalStateService";

type NotificationPlacement = NotificationArgsProps["placement"];

const props: UploadProps = {
  name: "file",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function Formulario({
  edit,
  id,
}: {
  edit: boolean;
  id: number;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const comicState = GlobalStateService.getComicData();

  useEffect(() => {
    if (edit) {
      setLoading(true);
      ComicsUseCases.retrieveUserComic({ id }).finally(() => {
        setLoading(false);
      });
    }
  }, [id]);

  const openNotification = (placement: NotificationPlacement) => {
    notification.success({
      message: `Comic ${edit ? "editado" : "creado"}`,
      description: `Tu comic ha sido ${
        edit ? "editado" : "creado"
      } correctamente. Seras redirigido al inicio`,
      placement,
      duration: 3,
    });
  };

  const initialValuesCreate = {
    comic: {
      name: "",
      pages: 0,
      date: null,
      description: "",
      image: [],
    },
  };

  const initialValuesEdit = {
    comic: {
      name: comicState.title,
      pages: comicState.pageCount,
      date: dayjs(comicState.sale_date, "DD-MM-YYYY"),
      description: comicState.description,
      image: [comicState.thumbnail],
    },
  };
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
    setLoading(true);

    try {
      const file =
        values.comic.image[0]?.originFileObj || values.comic.image[0]?.url;
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
        id: edit ? comicState.id : id,
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

      edit
        ? await ComicsUseCases.updateComic(comic)
        : await ComicsUseCases.createComic(comic);

      openNotification("bottomRight");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error creando el cómic", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && edit) return <p>Cargando comic...</p>;

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
        initialValues={edit ? initialValuesEdit : initialValuesCreate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ setFieldValue, handleSubmit, values }) => {
          // Simulamos la URL de la imagen que recibimos de Cloudinary
          const imageObject = {
            path: comicState.thumbnail.path,
            extension: "", // Ignorado en este caso
          };
          // Convierte la URL en un objeto compatible con fileList de Ant Design
          useEffect(() => {
            if (imageObject.path) {
              const fileList = [
                {
                  uid: "-1", // Un identificador único
                  name: "image.jpg", // Nombre del archivo
                  status: "done", // Estado del archivo
                  url: imageObject.path, // La URL generada usando el 'path'
                },
              ];
              setFieldValue("comic.image", fileList); // Establecer el valor inicial en Formik
            }
          }, [imageObject.path, setFieldValue]);

          return (
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
                      value={values.comic.date}
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
                    {...props}
                    name="files"
                    beforeUpload={() => false} // Evita la carga automática
                    onChange={
                      (info) =>
                        setFieldValue("comic.image", info.fileList || []) // Asegúrate de que siempre es un array
                    }
                    fileList={values.comic.image || []} // Asegúrate de que fileList siempre es un array
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
                {loading
                  ? "Cargando..."
                  : edit
                  ? "Editar comic"
                  : "Crear comic"}
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </ConfigProvider>
  );
}
