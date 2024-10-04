import styles from "./SidebarComponent.module.css";
const SidebarComponent = (props) => {
  return (
    <div className={styles.componentCover}>
      <div className={styles.icon}>{props.iconTitle}</div>
      <p>{props.optionTitle}</p>
    </div>
  );
};

export default SidebarComponent;
