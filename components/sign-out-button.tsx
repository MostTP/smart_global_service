"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        marginTop: 16,
        background: "transparent",
        border: "1px solid rgba(141,144,157,0.5)",
        color: "var(--color-on-surface)",
        padding: "10px 18px",
        cursor: "pointer",
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      Sign out
    </button>
  );
}
