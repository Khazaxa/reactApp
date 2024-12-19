import { useRef } from "react";
import styles from "./AddBtn.module.scss";
import plus from "../../../assets/add.png";
import api from "../../../ApiConfig/ApiConfig";
import { useLocation, useNavigate } from 'react-router-dom';

export function AddBtn() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGalleryAdd = async () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  };
  
  const handleAddClick = () => {
    if (location.pathname === '/posts') {
      navigate("/posts", { state: { addPostFormView: location.state?.addPostFormView !== true } });;
    } else if (location.pathname === '/gallery') {
      fileInputRef.current?.click();
    } else if (location.pathname === '/folders') {
      navigate("/folders", { state: { addFolderFormView: location.state?.addFolderFormView !== true } });
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