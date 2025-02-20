import styles from "./HomePage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

export function HomePage() {
  const userIdLocal = localStorage.getItem("userId");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get(`/userById/${userIdLocal}`);
      setUser(response.data);
    };

    fetchUser();
  }, [userIdLocal]);

  return (
    <div id={styles.homePage}>
      {user?.name && <h1>Welcome {user.name}</h1>}
    </div>
  );
}
