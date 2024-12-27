import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FoldersPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface Folder {
  name: string;
  logoId: number;
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
  const [logoId, setLogoId] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const addFolderFormView = location.state?.addFolderFormView || false;
  const removeCheckboxesFolders =
    location.state?.removeCheckboxesFolders || false;
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const fetchFolders = async () => {
    const res = await api.get("/folders");
    const folderData = res.data.map(
      (folder: { name: string; logo: { path: string } }) => ({
        name: folder.name,
        logoPath: folder.logo.path,
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
      setCheckedItems({});
    } 
  }, [removeCheckboxesFolders]);

  const handleAddFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFolders([
      ...folders,
      await api.post("/folder", { name: folderName, logoId: logoId }),
    ]);
    setFolderName("");
    setLogoId(0);
    navigate("/folders", { state: { formView: false } });
    fetchFolders();
  };

  const handleRemoveItemClick = (name: string) => {
    if (!removeCheckboxesFolders) return;

    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className={styles.foldersPage}>
      {addFolderFormView ? (
        <form onSubmit={handleAddFolder}>
          <p>Select folder logo:</p>
          <select onChange={(e) => setLogoId(Number(e.target.value))}>
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
            key={folder.name}
            onClick={() => handleRemoveItemClick(folder.name)}
            style={{ backgroundImage: `url(${folder.logoPath})` }}
          >
            {removeCheckboxesFolders ? (
              <input
                className={styles.checkboxes}
                type="checkbox"
                checked={checkedItems[folder.name] || false}
              />
            ) : false}

            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
