import styles from "./Content.module.scss";
import { GalleryPage } from "./GalleryPage/GalleryPage";

export function Content() {
  return (
    <div id={styles.content}>
      <GalleryPage />
    </div>
  );
}
