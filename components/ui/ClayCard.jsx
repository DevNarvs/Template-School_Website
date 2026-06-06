// Puffy clay surface. Set `interactive` to add the hover lift.
export default function ClayCard({ as: Tag = "div", interactive = false, className = "", children, ...props }) {
  return (
    <Tag className={`clay ${interactive ? "clay-lift" : ""} p-6 sm:p-7 ${className}`} {...props}>
      {children}
    </Tag>
  );
}
