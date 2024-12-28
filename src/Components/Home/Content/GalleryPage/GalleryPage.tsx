import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Item } from "../Item/Item";
import styles from "./GalleryPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface ImageData {
  id: number;
  name: string;
  imageUrl: string;
}

export function GalleryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const removeCheckboxesGallery = location.state?.removeCheckboxesGallery || false;

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (!removeCheckboxesGallery) {
      setCheckedItems([]);
    }
  }, [removeCheckboxesGallery]);

  const fetchImages = async () => {
    try {
      await api.get("/images").then((res) => {
        const imageData = res.data.map(
          (image: { id: number; name: string; path: string }) => ({
            id: image.id,
            name: image.name,
            imageUrl: image.path,
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

  const handleRemoveItemClick = (id: number) => {
    if (!removeCheckboxesGallery) {
      return;
    }

    setCheckedItems(prevCheckedItems =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter(item => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const removeImage = async () => {
    for (const id of checkedItems) {
      await api.delete(`/image/${id}`);
      navigate("/gallery", { state: { removeCheckboxesGallery: false } });
      fetchImages();
    }
  };

  if (location.state?.triggerAddGallery) {
    handleGalleryAdd();
    location.state.triggerAddGallery = false;
  }

  return (
    <div className={styles.galleryPage}>

      {removeCheckboxesGallery ? (
        <button className={styles.removeImageBtn} onClick={removeImage} disabled={checkedItems.length === 0}>Remove</button> 
      ) : ( true )}

      <h1>Gallery:</h1>
        <ul>
        {images.map((image) => (
          <li
            key={image.id}
            onClick={() => handleRemoveItemClick(Number(image.id))}
          >
            {removeCheckboxesGallery ? (
              <input
                className={styles.checkboxes}
                type="checkbox"
                checked={checkedItems.includes(image.id)}
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
