import { faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import styles from "./ResponseContainer.module.css";

const ResponseContainer = (props: any) => {
  const onCloseContainer = () => {
    props.onCloseContainer();
  };

  const styleOptions = {
    success: {
      icon: faSquareCheck,
    },
    error: {
      icon: faSquareXmark,
    },
  };

  const styleStatus = props.responseStatus.status === 200 ? "success" : "error";

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={styleOptions[styleStatus].icon}
        shake
        size="4x"
        className={`${styles.icon} ${styles[styleStatus]}`}
      />
      <h2>{props.responseStatus.title}</h2>
      <h3>{props.responseStatus.detail}</h3>
      {props.responseStatus.title !== "Login realizado com sucesso." && (
        <Button innerText="Ok" onClick={onCloseContainer} />
      )}
    </div>
  );
};

export default ResponseContainer;
