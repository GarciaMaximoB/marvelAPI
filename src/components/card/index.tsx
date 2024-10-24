"use client";
import styles from "./index.module.scss";
import {
  StarOutlined,
  StarFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Popconfirm } from "antd";

import { IComic } from "@/types";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { useEffect, useState } from "react";
import { GlobalStateService } from "@/services/globalStateService";
import Link from "next/link";

export default function Card({ comic }: { comic: IComic }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await deleteComic();
    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const favourites = GlobalStateService.getFavComicsData();

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourite = favourites.has(comic.id);
    setIsFavourite(favourite);
  }, [favourites]);

  const handleFav = async () => {
    await ComicsUseCases.toggleFavourite(comic);
  };

  const deleteComic = async () => {
    await ComicsUseCases.deleteUserComic(comic);
  };

  const router = useRouter();
  return (
    <div className={styles.mycard} key={comic.id}>
      <div
        onClick={() => router.push(`/comic/${comic.id}?source=${comic.source}`)}
      >
        <img
          src={`${
            comic
              ? `${comic.thumbnail.path}${
                  comic.thumbnail.extension
                    ? `.${comic.thumbnail.extension}`
                    : ""
                }`
              : "/logoMarvel.png"
          }`}
          alt={comic ? comic.title : ""}
          className={styles.imagePortada}
        />
        <p className={styles.comicTitle}>{comic.title}</p>
        <p className={styles.comicPages}>{comic.pageCount} páginas</p>
      </div>
      <div className={styles.iconsBottom}>
        {comic.source === "DATABASE" ? (
          <div className={styles.iconsBottomLeft}>
            <Link href={`edit/${comic.id}`} className={styles.editButton}>
              <EditOutlined />
            </Link>
            <Popconfirm
              title="Eliminar comic"
              description="¿Deseas eliminar este comic?"
              open={open}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <DeleteOutlined
                className={styles.deleteButton}
                onClick={showPopconfirm}
              />
            </Popconfirm>
          </div>
        ) : (
          ""
        )}

        {isFavourite ? (
          <StarFilled
            className={styles.comicFav}
            style={{ color: "#fcba03" }}
            onClick={handleFav}
          />
        ) : (
          <StarOutlined className={styles.comicFav} onClick={handleFav} />
        )}
      </div>
    </div>
  );
}
