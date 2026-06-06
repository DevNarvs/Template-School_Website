import Link from "next/link";
import Icon from "./Icon";

// Claymorphism button. variant: primary | accent | ghost. Renders <Link> if href, else <button>.
const VARIANTS = {
  primary:
    "clay-btn text-white bg-[linear-gradient(145deg,#5B52E8_0%,#4338CA_100%)]",
  accent:
    "clay-btn text-white bg-[linear-gradient(145deg,#C2410C_0%,#9A3412_100%)]",
  ghost:
    "bg-white/70 text-brand-700 border-2 border-white/80 shadow-sm hover:bg-white transition",
};

const SIZES = {
  sm: "px-4 py-2 text-sm rounded-2xl",
  md: "px-6 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}) {
  const cls = `inline-flex items-center justify-center gap-2 font-semibold tracking-tight ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 20} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {inner}
    </button>
  );
}
