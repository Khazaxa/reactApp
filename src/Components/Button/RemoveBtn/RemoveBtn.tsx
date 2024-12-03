import styles from "./RemoveBtn.module.scss";
import remove from "../../../assets/del.png";
import { IsProps } from "../../Home/Home";

export default function RemoveBtn({
  isHomePage,
  isUsersPage,
  isGalleryPage,
  isFoldersPage,
  isPostsPage,
}: IsProps) {
  return (
    <button
      id={styles.remove}
      onClick={() => {
        if (isHomePage) {
          alert("Remove from Home Page");
        } else if (isUsersPage) {
          alert("Remove from Users Page");
        } else if (isGalleryPage) {
          alert("Remove from Gallery Page");
        } else if (isFoldersPage) {
          alert("Remove from Folders Page");
        } else if (isPostsPage) {
          alert("Remove from Posts Page");
        }
      }}
    >
      <img src={remove} alt="Remove Button" />
    </button>
  );
}
