import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FoldersPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import folderImage from "../../../../assets/folder.png";

interface Folder {
  name: string;
  logoId: number;
}

interface Logo {
  id: number;
  name: string;
}

export function FoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [folderName, setFolderName] = useState("");
  const [logoId, setLogoId] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const addFolderFormView = location.state?.addFolderFormView || false;

  const fetchFolders = async () => {
    const res = await api.get("/folders");
    const folderData = res.data.map(
      (folder: { name: string }) => ({
        name: folder.name,
      })
    );
    setFolders(folderData);   
  };

  const fetchLogos = async () => {
    const res = await api.get('/images');
    const logoData = res.data.map(
      (logo: { id: number, name: string }) => ({
        id: logo.id,
        name: logo.name,
      })
    );
    setLogos(logoData);
  };

  useEffect(() => {
    fetchFolders();
    fetchLogos();
  }, []);

  const handleAddFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/folder", { name: folderName, logoId: logoId });
    const newFolder: Folder = { name: folderName, logoId: logoId };
    setFolders([...folders, newFolder]);
    setFolderName("");
    setLogoId(0);
    navigate("/folders", { state: { formView: false } });
    fetchFolders();
  };

  return (
    <div className={styles.foldersPage}>
      {addFolderFormView ? (
        <form onSubmit={handleAddFolder}>
          <p>Select folder logo:</p>
          <select onChange={(e) => setLogoId(Number(e.target.value))}>
            <option value=""></option>
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
          <li key={folder.name}>
            <img src={folderImage} alt="folder"/> {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
