import styles from "./NavItem.module.scss";

interface NavItemProps {
  children: React.ReactNode;
}

export function NavItem({ children }: NavItemProps) {
  return (
    <div className={styles.navItem}>
      <strong>{children}</strong>
    </div>
  );
}
