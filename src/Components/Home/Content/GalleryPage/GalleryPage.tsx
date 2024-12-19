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
  useEffect(() => {
    fetchImages();
  }, []);

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

      await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchImages();
    }
  };

  if (location.state?.triggerAddGallery) {
    handleGalleryAdd();
    location.state.triggerAddGallery = false;
  }

  return (
    <div id={styles.galleryPage}>
      <div className={styles.imageContainer}>
        {images.map((image, id) => (
          <Item key={id} name={image.name} imageUrl={image.imageUrl} />
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleGalleryAdd}
        style={{ display: "none" }}
      />
    </div>
  );
}
