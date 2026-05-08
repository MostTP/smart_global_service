import { Suspense } from "react";

import LoginForm from "./login-form";

export default function PortalLoginRoute() {
  return (
    <Suspense fallback={<p style={{ padding: 24 }}>Loading…</p>}>
      <LoginForm />
    </Suspense>
  );
}
