import styles from "./AddBtn.module.scss";
import plus from "../../../assets/add.png";
import { useLocation, useNavigate } from 'react-router-dom';

export function AddBtn() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const AddClick = () => {
    if (location.pathname === '/posts') {
      navigate("/posts", { state: { addPostFormView: location.state?.addPostFormView !== true } });;
    } else if (location.pathname === '/gallery') {
      navigate("/gallery", { state: { triggerAddGallery: true } });
    } else if (location.pathname === '/folders') {
      navigate("/folders", { state: { addFolderFormView: location.state?.addFolderFormView !== true } });
    }
  };

  return (
    <div className={styles.addBtn}>
      <button id={styles.add} onClick={AddClick}>
        <img src={plus} alt="Add Button" />
      </button>
    </div>
  );
}