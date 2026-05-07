import React from "react";

export function MaterialIcon({
  name,
  className,
  title,
  "aria-hidden": ariaHidden,
}: {
  name: string;
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`.trim()}
      aria-hidden={ariaHidden}
      title={title}
    >
      {name}
    </span>
  );
}

