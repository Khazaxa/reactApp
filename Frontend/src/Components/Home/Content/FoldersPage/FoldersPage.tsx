import api from "../../../../ApiConfig/ApiConfig";
import styles from "./FoldersPage.module.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import folderDefaultLogo from "../../../../assets/folder.png";
import Notifications from "../../../Notifications/Notifications";
import { NavLink } from "react-router-dom";

interface Folder {
  id: number;
  name: string;
  userId: number;
  userName: string;
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
  const showAddForm = location.state?.showAddForm || false;
  const removeCheckboxesFolders =
    location.state?.removeCheckboxesFolders || false;
  const [loading, setLoading] = useState<boolean>(false);
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
  const filterOption = searchParams.get("filter") || "name";

  const filteredFolders = folders.filter((folder) => {
    if (filterOption === "name") {
      return folder.name.toLowerCase().includes(searchTerm);
    } else if (filterOption === "user") {
      return folder.userName.toLowerCase().includes(searchTerm);
    } else if (filterOption === "id") {
      return folder.id.toString().includes(searchTerm);
    }
    return false;
  });

  const fetchFolders = async () => {
    const response = await api.get("/folders");
    setFolders(response.data);
  };

  const fetchLogos = async () => {
    const response = await api.get("/images");
    setLogos(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchFolders(), fetchLogos()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!showAddForm) {
      setFolderName("");
    }
  }, [showAddForm]);

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

  return (
    <div className={styles.foldersPage}>
      <Notifications messageType={messageType} message={message} />

      {loading ? (
        <h1>Loading images...</h1>
      ) : (
        <>
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
              className={showAddForm ? styles.showForm : styles.hideForm}
              onSubmit={handleAddFolder}
            >
              <button
                className={styles.closeFormBtn}
                type="button"
                onClick={() =>
                  navigate("/folders", { state: { showAddForm: false } })
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

              <input
                type="text"
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
              <NavLink to={`/folder/${folder.id}`}>
                <li
                  className="folders"
                  key={folder.id}
                  onClick={
                    removeCheckboxesFolders &&
                    folder.userId === Number(userIdLocal)
                      ? () => handleRemoveItemClick(folder.id)
                      : undefined
                  }
                  style={{
                    backgroundImage: `url(${
                      folder.logo?.path || folderDefaultLogo
                    })`,
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
                  <p>{folder.name}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
