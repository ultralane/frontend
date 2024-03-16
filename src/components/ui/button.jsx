import classNames from "../../utils/className";
export default function Button({
  primary = false,
  disabled = false,
  className,
  overrideClassNames = false,
  children,
  onClick,
  ...restProps
}) {
  let defaultClassName = classNames(
    `font-medium cursor-pointer ${disabled && " opacity-50 cursor-none "}`,
  );

  return (
    <button
      style={{ background: "linear-gradient(58.08deg, #6101ff, #00ffd1)" }}
      className={
        overrideClassNames ? className : classNames(defaultClassName, className)
      }
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
}
