import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={`${classes.btnDiv} ${props.classes} `}>
      <button
        type={props.type || "button"}
        disabled={props.disabled}
        className={`${classes.button} `}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
