"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../portal.module.css";

export default function PortalRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setPending(false);
      setError(data.error ?? "Registration failed.");
      return;
    }
    const sign = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/portal/dashboard",
    });
    setPending(false);
    if (sign?.error) {
      setError("Account created but sign-in failed. Try logging in.");
      return;
    }
    router.push("/portal/dashboard");
    router.refresh();
  }

  return (
    <div className={`${styles.shell} glass-panel`}>
      <h1 className={styles.title}>Create account</h1>
      <p className={styles.note}>
        Link requests and payments to your profile by using the same email you enter on service
        forms, or sign in after submitting.
      </p>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Name (optional)
          <input
            className={styles.input}
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            autoComplete="name"
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className={styles.label}>
          Password (8+ characters)
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </label>
        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? "Creating…" : "Register"}
        </button>
      </form>
      <p className={styles.footer}>
        Already have an account? <Link href="/portal/login">Sign in</Link>
      </p>
    </div>
  );
}
