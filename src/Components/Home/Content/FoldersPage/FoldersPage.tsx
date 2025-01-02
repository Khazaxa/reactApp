import api from "../../../../ApiConfig/ApiConfig";
import styles from "./FoldersPage.module.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import folderDefaultLogo from "../../../../assets/folder.png";
import Notifications from '../../../Notifications/Notifications';

interface Folder {
  id: number;
  name: string;
  logoPath: string;
}

interface Logo {
  id: number;
  name: string;
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
  const removeCheckboxesFolders = location.state?.removeCheckboxesFolders || false;
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "warning" | null>(null);
  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  }

  const fetchFolders = async () => {
    const res = await api.get("/folders");
    const folderData = res.data.map(
      (folder: { id: number; name: string; logo: { path: string } }) => ({
        id: folder.id,
        name: folder.name,
        logoPath: folder?.logo?.path || folderDefaultLogo,
      })
    );
    setFolders(folderData);
  };

  const fetchLogos = async () => {
    const res = await api.get("/images");
    const logoData = res.data.map((logo: { id: number; name: string }) => ({
      id: logo.id,
      name: logo.name,
    }));
    setLogos(logoData);
  };

  useEffect(() => {
    fetchFolders();
    fetchLogos();
  }, []);

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

    }
    catch (error) {
      setMessage("Error adding folder: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const handleRemoveItemClick = (id: number) => {
    if (!removeCheckboxesFolders) {
      return;
    }

    setCheckedItems(prevCheckedItems =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter(item => item !== id)
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
      setTimeout(() => {
        setMessage("");
        setMessageType(null);
      }, 3000);
    } catch (error) {
      setMessage("Error removing folder(s)!\n\n" + error);
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType(null);
      }, 3000);
    }
  };


  return (
    <div className={styles.foldersPage}>

      <Notifications messageType={messageType} message={message} />

      {removeCheckboxesFolders ? (
        <button className={styles.removeFolderBtn} onClick={removeFolder} disabled={checkedItems.length === 0}>Remove</button>
      ) : (true)}

      {addFolderFormView ? (
        <form onSubmit={handleAddFolder}>
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
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
          />
          <button type="submit">Add Folder</button>
        </form>
      ) : (
        true
      )}

      <h1>Folders:</h1>
      <ul>
        {folders.map((folder) => (
          <li
            className="folders"
            key={folder.id}
            onClick={() => handleRemoveItemClick(folder.id)}
            style={{ backgroundImage: `url(${folder.logoPath})` }}
          >
            {removeCheckboxesFolders ? (
              <input
                className={styles.checkboxes}
                type="checkbox"
                checked={checkedItems.includes(folder.id)}
              />
            ) : (
              false
            )}
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
}