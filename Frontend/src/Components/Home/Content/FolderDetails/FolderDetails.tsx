import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../../ApiConfig/ApiConfig";
import styles from "./FolderDetails.module.scss";
import Notifications from "../../../Notifications/Notifications";

interface Folder {
  id: number;
  name: string;
  userId: number;
  images: Image[];
}

interface Image {
  id: number;
  name: string;
  path: string;
  userId: number;
}

export function FolderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [folder, setFolder] = useState<Folder | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const showAddForm = location.state?.showAddForm || false;
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);
  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const filterOption = searchParams.get("filter") || "name";

  const filteredImages = folder?.images.filter((image) => {
    if (filterOption === "name") {
      return image.name.toLowerCase().includes(searchTerm);
    } else if (filterOption === "user") {
      return image.name.toLowerCase().includes(searchTerm);
    } else if (filterOption === "id") {
      return image.id.toString().includes(searchTerm);
    } 
    return false;
  });

  useEffect(() => {
    if (!showAddForm) {
      setCheckedItems([]);
    }
  }, [showAddForm]);

  useEffect(() => {
    if (id) {
      fetchFolder(Number(id));
    }
  }, [id]);

  const fetchFolder = async (id: number) => {
    const response = await api.get(`/folders`);
    setFolder(response.data.find((folder: Folder) => folder.id === id));
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await api.get(`/images`);
      const unassignedImages = response.data.filter(
        (image: Image) => !folder?.images.find((i) => i.id === image.id)
      );
      setImages(unassignedImages);
    };

    fetchImages();
  }, [folder]);

  const handleCheckItemClick = (id: number) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const handleAddImageToFolder = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.put(`/assignToFolder?folderId=${id}`, checkedItems);

      navigate(`/folder/${id}`, { state: { addFolderFormView: false } });
      fetchFolder(Number(id));

      setMessage("Image(s) added successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error adding image(s): " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  return (
    <div className={styles.folderDetails}>
      <Notifications messageType={messageType} message={message} />

      <div id={styles.formContainer}>
        <form
          className={showAddForm ? styles.showForm : styles.hideForm}
          onSubmit={handleAddImageToFolder}
        >
          <button
            className={styles.closeFormBtn}
            type="button"
            onClick={() =>
              navigate(`/folder/${id}`, { state: { showAddForm: false } })
            }
          >
            X
          </button>

          <div className={styles.listContainer}>
            <ul className={styles.imagesToAddList}>
              {images.map((image) => (
                <li
                  key={image.id}
                  onClick={() => handleCheckItemClick(image.id)}
                >
                  <input
                    type="checkbox"
                    key={image.id}
                    checked={checkedItems.includes(image.id)}
                    readOnly
                  />
                  {image.name}
                </li>
              ))}
            </ul>
          </div>

          <button className={styles.submitFormBtn} type="submit">
            Add to folder
          </button>
        </form>
      </div>

      {folder && (
        <div key={folder.id} className={styles.folderDetails}>
          <h2>{folder.name}</h2>
          <ul className={styles.imagesList}>
            {filteredImages?.map((image) => (
              <li key={image.id}>
                <img src={image.path} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
