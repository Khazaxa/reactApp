import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Item } from "../Item/Item";
import styles from "./GalleryPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface ImageData {
  name: string;
  imageUrl: string;
}

export function GalleryPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const location = useLocation();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const removeCheckboxesGallery =
    location.state?.removeCheckboxesGallery || false;

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (!removeCheckboxesGallery) {
      setCheckedItems({});
    }
  }, [removeCheckboxesGallery]);

  const fetchImages = async () => {
    try {
      await api.get("/images").then((res) => {
        const imageData = res.data.map(
          (img: { name: string; path: string }) => ({
            name: img.name,
            imageUrl: img.path,
          })
        );
        setImages(imageData);
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleGalleryAdd = async () => {
    fileInputRef.current?.click();

    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchImages();
    }
  };

  const handleRemoveItemClick = (id: string) => {
    if (!removeCheckboxesGallery) return;

    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (location.state?.triggerAddGallery) {
    handleGalleryAdd();
    location.state.triggerAddGallery = false;
  }

  return (
    <div className={styles.galleryPage}>
      <h1>Gallery:</h1>
        <ul>
        {images.map((image, id) => (
          <li
            key={id}
            onClick={() => handleRemoveItemClick(id.toString())}
          >
            {removeCheckboxesGallery ? (
              <input
                className={styles.checkboxes}
                checked={checkedItems[id] || false}
                type="checkbox"
              />
            ) : (
              true
            )}
            <Item name={image.name} imageUrl={image.imageUrl} />
          </li>
        ))}
        </ul>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleGalleryAdd}
        style={{ display: "none" }}
      />
    </div>
  );
}
