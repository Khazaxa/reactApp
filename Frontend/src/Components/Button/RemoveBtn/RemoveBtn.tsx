import styles from "./RemoveBtn.module.scss";
import remove from "../../../assets/del.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function RemoveBtn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const RemoveClick = () => {
    const searchQuery = searchParams.toString();

    if (location.pathname === "/posts") {
      navigate(`/posts?${searchQuery}`, {
        state: {
          removeCheckboxesPosts: location.state?.removeCheckboxesPosts !== true,
        },
      });
    } else if (location.pathname === "/gallery") {
      navigate(`/gallery?${searchQuery}`, {
        state: {
          removeCheckboxesGallery:
            location.state?.removeCheckboxesGallery !== true,
        },
      });
    } else if (location.pathname === "/folders") {
      navigate(`/folders?${searchQuery}`, {
        state: {
          removeCheckboxesFolders:
            location.state?.removeCheckboxesFolders !== true,
        },
      });
    }
  };

  return (
    <button
      id={styles.removeBtn}
      onClick={RemoveClick}
      disabled={
        location.pathname === "/settings" ||
        location.pathname === "/home" ||
        location.pathname === "/" ||
        location.pathname === "/users" ||
        /^\/folder\/\d+$/.test(location.pathname)
      }
    >
      <img src={remove} alt="Remove Button" />
    </button>
  );
}
