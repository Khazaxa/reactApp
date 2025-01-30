import { useState, useEffect, useCallback } from "react";
import styles from "./UserSettingsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import { useLocation } from "react-router-dom";
import Notifications from "../../../Notifications/Notifications";

interface User {
  name: string;
  age: number;
  email: string;
  avatar: string;
}

export function UserSettingsPage() {
  //const navigate = useNavigate();
  const location = useLocation();
  const userIdLocal = localStorage.getItem("userId");
  const [showUserEditForm, setShowUserEditForm] = useState<boolean>(
    location.state?.showUserEditForm || false
  );
  const [user, setUser] = useState<User>();
  const [editUserName, setEditUserName] = useState<string>("");
  const [editUserAge, setEditUserAge] = useState<number | null>(null);
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

  const fetchUser = useCallback(async () => {
    const response = await api.get(`/userById/${userIdLocal}`);
    setUser(response.data);

    setEditUserName(response.data.name);
    setEditUserAge(response.data.age);
  }, [userIdLocal]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (showUserEditForm) {
      if (user) {
        setEditUserName(user.name);
        setEditUserAge(user.age);
      }
    }
  }, [showUserEditForm, user]);

  const handleShowForm = () => {
    setShowUserEditForm(!showUserEditForm);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.put("/user", { name: editUserName, age: editUserAge });
      setEditUserName("");
      setEditUserAge(null);

      setShowUserEditForm(false);
      fetchUser();

      setMessage("User edited successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error edit user: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  return (
    <div className={styles.settingsPage}>
      <Notifications messageType={messageType} message={message} />

      <div id={styles.formContainer}>
        <form
          onSubmit={handleEditUser}
          className={
            showUserEditForm === true ? styles.showForm : styles.hideForm
          }
        >
          <button
            className={styles.closeFormBtn}
            type="button"
            onClick={() => handleShowForm()}
          >
            X
          </button>
          <input
            className={styles.editUserNameInput}
            type="text"
            value={editUserName}
            placeholder="Name"
            onChange={(e) => setEditUserName(e.target.value)}
            required
          />
          <input
            className={styles.editUserAgeInput}
            type="text"
            value={editUserAge ? editUserAge : ""}
            placeholder="Age"
            onChange={(e) => setEditUserAge(Number(e.target.value))}
          />
          <button className={styles.submitFormBtn} type="submit">
            Save
          </button>
        </form>
      </div>
      {user && (
        <div key={user.email} className={styles.userCard}>
          <div className={styles.userAvatar}>
            <img src={user.avatar} alt={`avatar`} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              <strong>{user.name ? user.name : "--"}</strong>
            </div>
            <div className={styles.userEmail}>
              <strong>{user.email}</strong>
            </div>
            <div className={styles.userAge}>
              <strong>{user.age ? user.age : "--"}</strong>
            </div>
            <button
              onClick={() => handleShowForm()}
              className={styles.userEdit}
            >
              Edit profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
