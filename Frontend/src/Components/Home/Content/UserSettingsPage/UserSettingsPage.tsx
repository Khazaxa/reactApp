import { useState, useEffect } from "react";
import styles from "./UserSettingsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";

interface User {
  name: string;
  age: number;
  email: string;
  avatar: string;
}

export function UserSettingsPage() {
  const [user, setUser] = useState<User[]>([]);
  const [editUser, seteditUser] = useState<boolean>(false);

  const fetchUser = async () => {
    const response = await api.get(`/users`);
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditUser = () => {
    seteditUser(!editUser);
  };

  return (
    <div className={styles.settingsPage}>
      {user.map((u) => (
        <>
          {editUser ? (
            <form className={styles.editUserForm}>
              <button
                className={styles.closeFormBtn}
                type="button"
                onClick={() => handleEditUser()}
              >
                X
              </button>
              <input
                className={styles.editUserNameInput}
                type="text"
                value={u.name}
                placeholder="Name"
              />
              <input
                className={styles.editUserAgeInput}
                type="text"
                value={u.age ? u.age : "--"}
                placeholder="Age"
              />
              <button className={styles.submitFormBtn} type="submit">
                Save
              </button>
            </form>
          ) : (
            true
          )}
          <div key={u.email} className={styles.userCard}>
            <div className={styles.userAvatar}>
              <img src={u.avatar} alt={`avatar`} />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                <strong>{u.name ? u.name : "--"}</strong>
              </div>
              <div className={styles.userEmail}>
                <strong>{u.email}</strong>
              </div>
              <div className={styles.userAge}>
                <strong>{u.age ? u.age : "--"}</strong>
              </div>
              <button
                onClick={() => handleEditUser()}
                className={styles.userEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
