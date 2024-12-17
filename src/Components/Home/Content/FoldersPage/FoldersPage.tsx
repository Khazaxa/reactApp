import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FoldersPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import folderImage from "../../../../assets/folder.png";

interface Folder {
  name: string;
}

export function FoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderName, setFolderName] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const formView = location.state?.formView || false;

  const fetchFolders = async () => {
    try {
      const res = await api.get("/folders");
      const folderData = res.data.map(
        (folder: { name: string }) => ({
          name: folder.name,
        })
      );
      setFolders(folderData);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleAddFolder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/folder", { name: folderName });
      const newFolder: Folder = { name: folderName };
      setFolders([...folders, newFolder]);
      setFolderName("");
      navigate("/folders", { state: { formView: false } });
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  return (
    <div className={styles.foldersPage} key={refreshKey}>
      {formView ? (
        <form onSubmit={handleAddFolder}>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder Name"
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
          <li key={folder.name}>
            <img src={folderImage} alt="folder" /> {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
