import { useInView } from "../hooks/useReveal.js";

/** Fait apparaître doucement son contenu au défilement. */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
