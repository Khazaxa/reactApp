import api from "../../../../ApiConfig/ApiConfig";
import styles from "./FoldersPage.module.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import folderDefaultLogo from "../../../../assets/folder.png";
import Notifications from "../../../Notifications/Notifications";

interface Folder {
  id: number;
  name: string;
  userId: number;
  logo: Logo;
}

interface Logo {
  id: number;
  name: string;
  userId: number;
  path: string;
}

export function FoldersPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [folderName, setFolderName] = useState("");
  const [logoId, setLogoId] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const addFolderFormView = location.state?.addFolderFormView || false;
  const removeCheckboxesFolders =
    location.state?.removeCheckboxesFolders || false;
  const [message, setMessage] = useState<string>("");
  const userIdLocal = localStorage.getItem("userId");
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

  const fetchFolders = async () => {
    const response = await api.get("/folders");
    setFolders(response.data);
  };

  const fetchLogos = async () => {
    const response = await api.get("/images");
    setLogos(response.data);
  };

  useEffect(() => {
    fetchFolders();
    fetchLogos();
  }, []);

  useEffect(() => {
    if (!addFolderFormView) {
      setFolderName("");
    }
  }, [addFolderFormView]);

  useEffect(() => {
    if (!removeCheckboxesFolders) {
      setCheckedItems([]);
    }
  }, [removeCheckboxesFolders]);

  const handleAddFolder = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.post("/folder", { name: folderName, logoId: logoId });
      setFolderName("");
      setLogoId(null);
      navigate("/folders", { state: { addFolderFormView: false } });
      fetchFolders();

      setMessage("Folder added successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error adding folder: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const handleRemoveItemClick = (id: number) => {
    if (!removeCheckboxesFolders) {
      return;
    }

    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const removeFolder = async () => {
    try {
      for (const id of checkedItems) {
        await api.delete(`/folder/${id}`);
        navigate("/folders", { state: { removeCheckboxesFolders: false } });
        fetchFolders();
      }

      setMessage("Folder(s) removed successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error removing folder(s)!\n\n" + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={styles.foldersPage}>
      <Notifications messageType={messageType} message={message} />

      {removeCheckboxesFolders ? (
        <button
          className={styles.removeBtn}
          onClick={removeFolder}
          disabled={checkedItems.length === 0}
        >
          Remove
        </button>
      ) : (
        true
      )}

      <div id={styles.formContainer}>
        <form
          className={addFolderFormView ? styles.showForm : styles.hideForm}
          onSubmit={handleAddFolder}
        >
          <button
            className={styles.closeFormBtn}
            type="button"
            onClick={() =>
              navigate("/folders", { state: { addFolderFormView: false } })
            }
          >
            X
          </button>

          <p>Select folder logo:</p>
          <select
            onChange={(e) => {
              const value = Number(e.target.value);
              setLogoId(value === 0 ? null : value);
            }}
          >
            <option value={0}>default</option>
            {logos.map((logo) => (
              <option key={logo.id} value={logo.id}>
                {logo.name}
              </option>
            ))}
          </select>

          <p>Type folder name:</p>

          <textarea
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
          />
          <button className={styles.submitFormBtn} type="submit">
            Add Folder
          </button>
        </form>
      </div>

      <ul>
        {filteredFolders.map((folder) => (
          <li
            className="folders"
            key={folder.id}
            onClick={
              removeCheckboxesFolders && folder.userId === Number(userIdLocal)
                ? () => handleRemoveItemClick(folder.id)
                : undefined
            }
            style={{
              backgroundImage: `url(${folder.logo?.path || folderDefaultLogo})`,
            }}
          >
            {removeCheckboxesFolders &&
            folder.userId === Number(userIdLocal) ? (
              <input
                className={styles.checkboxes}
                type="checkbox"
                checked={checkedItems.includes(folder.id)}
                readOnly
              />
            ) : (
              true
            )}
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
