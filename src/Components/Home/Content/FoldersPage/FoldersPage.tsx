import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FoldersPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import folderDefaultLogo from "../../../../assets/folder.png";

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
  const [folders, setFolders] = useState<Folder[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [folderName, setFolderName] = useState("");
  const [logoId, setLogoId] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const addFolderFormView = location.state?.addFolderFormView || false;
  const removeCheckboxesFolders = location.state?.removeCheckboxesFolders || false;
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

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
    e.preventDefault();
    await api.post("/folder", { name: folderName, logoId: logoId });
    setFolderName("");
    setLogoId(null);
    navigate("/folders", { state: { addFolderFormView: false } });
    fetchFolders();
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
    for (const id of checkedItems) {
      await api.delete(`/folder/${id}`);
      navigate("/folders", { state: { removeCheckboxesFolders: false } });
      fetchFolders();
    }
  };
  

  return (
    <div className={styles.foldersPage}>
      {removeCheckboxesFolders ? (
        <button className={styles.removeFolderBtn} onClick={removeFolder} disabled={checkedItems.length === 0}>Remove</button> 
      ) : ( true )}

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