import { useState, useEffect } from "react";
import { Item } from "../Item/Item";
import styles from "./GalleryPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface ImageData {
  name: string;
  imageUrl: string;
}

export function GalleryPage() {
  const [images, setImages] = useState<ImageData[]>([]);
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

  return (
    <div id={styles.galleryPage}>
      <div className={styles.imageContainer}>
        {images.map((image, id) => (
          <Item key={id} name={image.name} imageUrl={image.imageUrl} />
        ))}
      </div>
    </div>
  );
}
