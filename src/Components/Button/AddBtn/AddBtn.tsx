import { useRef } from "react";
import styles from "./AddBtn.module.scss";
import plus from "../../../assets/add.png";
import api from "../../../ApiConfig/ApiConfig";
import { useLocation, useNavigate } from 'react-router-dom';

export function AddBtn() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleGalleryAdd = async () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        await api.post("/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const location = useLocation();

  const handleAddClick = () => {
    if (location.pathname === '/home') {
      alert('Add clicked on HomePage');
    } else if (location.pathname === '/users') {
      alert('Add clicked on UsersPage');
    } else if (location.pathname === '/gallery') {
      fileInputRef.current?.click();
    } else if (location.pathname === '/folders') {
      navigate("/folders", { state: { formView: location.state?.formView !== true } });
    }
  };

  return (
    <div className={styles.addBtn}>
      <button id={styles.add} onClick={handleAddClick}>
        <img src={plus} alt="Add Button" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleGalleryAdd}
      />
    </div>
  );
}