import styles from "./AddBtn.module.scss";
import plus from "../../../assets/add.png";
import { IsProps } from "../../Home/Home";

export function AddBtn({
  isHomePage,
  isUsersPage,
  isGalleryPage,
  isFoldersPage,
  isPostsPage,
}: IsProps) {
  return (
    <button
      id={styles.add}
      onClick={() => {
        if (isHomePage) {
          alert("Add to Home Page");
        } else if (isUsersPage) {
          alert("Add to Users Page");
        } else if (isGalleryPage) {
          alert("Add to Gallery Page");
        } else if (isFoldersPage) {
          alert("Add to Folders Page");
        } else if (isPostsPage) {
          alert("Add to Posts Page");
        }
      }}
    >
      <img src={plus} alt="Add Button" />
    </button>
  );
}
