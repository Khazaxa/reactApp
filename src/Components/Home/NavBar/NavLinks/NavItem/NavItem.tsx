import styles from "./NavItem.module.scss";

interface NavItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function NavItem({ children, onClick }: NavItemProps) {
  return (
    <div className={styles.navItem} onClick={onClick}>
      <strong>{children}</strong>
    </div>
  );
}
