import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary,
  disabled,
  small,
  large,
  medium,
  outline,
  children,
  text,
  rounded,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passprops
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passprops,
  };

  if (disabled) {
    delete props.onClick;
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    small,
    large,
    medium,
    text,
    disabled,
    rounded,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{leftIcon}</span>}
    </Comp>
  );
}

export default Button;
