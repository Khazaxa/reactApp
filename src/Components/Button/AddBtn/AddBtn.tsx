import { useRef } from "react";
import styles from "./AddBtn.module.scss";
import plus from "../../../assets/add.png";
import { IsProps } from "../../Home/Home";
import api from "../../../ApiConfig/ApiConfig";

export function AddBtn({
  isHomePage,
  isUsersPage,
  isGalleryPage,
  isFoldersPage,
  isPostsPage,
}: IsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryAdd = async () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post("/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleButtonClick = () => {
    if (isHomePage) {
      alert("Add to Home Page");
    } else if (isUsersPage) {
      handleUsersAdd();
    } else if (isGalleryPage) {
      fileInputRef.current?.click();
    } else if (isFoldersPage) {
      handleFoldersAdd();
    } else if (isPostsPage) {
      handlePostsAdd();
    }
  };

  return (
    <>
      <button id={styles.add} onClick={handleButtonClick}>
        <img src={plus} alt="Add Button" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleGalleryAdd}
      />
    </>
  );
}

function handleUsersAdd() {
  alert("Add to Users Page");
}

function handlePostsAdd() {
  alert("Add to Posts Page");
}

function handleFoldersAdd() {
  alert("Add to Folders Page");
}
