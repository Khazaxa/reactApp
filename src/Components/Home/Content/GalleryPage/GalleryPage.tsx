import { useState } from "react";
import { Item } from "../Item/Item";
import styles from "./GalleryPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface ImageData {
  name: string;
  imageUrl: string;
}

export function GalleryPage() {
  const [images, setImages] = useState<ImageData[]>([]);

  const fetchImages = async () => {
    try {
      const response = await api.get("/images");
      const imageData = response.data.map(
        (img: { name: string; path: string }) => ({
          name: img.name,
          imageUrl: img.path,
        })
      );
      setImages(imageData);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div id={styles.galleryPage}>
      <button onClick={fetchImages}>Click me</button>
      <div className={styles.imageContainer}>
        {images.map((image, id) => (
          <Item key={id} name={image.name} imageUrl={image.imageUrl} />
        ))}
      </div>
    </div>
  );
}
