import styles from "./Button.module.css";

type CallbackFunction = (...args: any[]) => any;

const Button = (props: {
  innerText: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: CallbackFunction;
}) => {
  return (
    <button
      className={props.className ? `${styles.btn} ${props.className}` : styles.btn}
      type={props.type}
      onClick={props.onClick}
    >
      {props.innerText}
    </button>
  );
};

export default Button;
