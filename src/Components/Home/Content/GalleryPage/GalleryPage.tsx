import { Item } from "../Item/Item";
import styles from "./GalleryPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

export function GalleryPage() {
  return (
    <div id={styles.galleryPage}>
      <Item />
      <button
        onClick={() => {
          api.get("/info");
        }}
      >
        Click me
      </button>
    </div>
  );
}
