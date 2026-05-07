"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitServiceRequest, type ServiceRequestState } from "@/app/actions/service-request";
import {
  SERVICE_REQUEST_FORM_CONFIG,
  type ServiceRequestSlug,
} from "@/lib/service-request-forms";
import styles from "./service-request-form.module.css";

const initialState: ServiceRequestState = { status: "idle" };

function fieldClassName(type: string) {
  if (type === "select") return styles.select;
  if (type === "textarea") return styles.textarea;
  return styles.input;
}

export type ServiceRequestFormProps = {
  slug: ServiceRequestSlug;
  /** When true, omit outer section/shell so the form can sit inside an existing layout (e.g. marine grid). */
  embed?: boolean;
};

export function ServiceRequestForm({ slug, embed }: ServiceRequestFormProps) {
  const definition = SERVICE_REQUEST_FORM_CONFIG[slug];
  const [state, formAction, isPending] = useActionState(
    submitServiceRequest,
    initialState,
  );

  const inner = (
    <>
      {!embed ? (
        <header className={styles.header}>
          <h2 className={styles.title}>{definition.title}</h2>
          <p className={styles.description}>{definition.description}</p>
        </header>
      ) : null}

      <div className={embed ? styles.embedPanel : `${styles.panel} glass-panel`}>
        {state.status === "success" ? (
          <div>
            <p className={`${styles.feedback} ${styles.feedbackSuccess}`}>
              Request received. Reference: <strong>{state.reference}</strong>
            </p>
            <p className={styles.note}>
              Our desk will follow up using your contact details.
            </p>
            <div className={styles.formActions}>
              <Link className={styles.secondaryCta} href="/portal/payment">
                Optional — proceed to payment
              </Link>
            </div>
          </div>
        ) : (
          <form className={styles.form} action={formAction}>
            <input type="hidden" name="serviceSlug" value={slug} />

            {state.status === "error" ? (
              <p className={`${styles.feedback} ${styles.feedbackError}`} role="alert">
                {state.message}
              </p>
            ) : null}

            {definition.fields.map((field) => (
              <label key={field.name} className={styles.field}>
                <span className={styles.label}>{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    className={fieldClassName(field.type)}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : field.type === "select" ? (
                  <select
                    className={fieldClassName(field.type)}
                    name={field.name}
                    required={field.required}
                    defaultValue=""
                  >
                    {(field.options ?? [{ value: "", label: "Select…" }]).map((opt) => (
                      <option key={`${field.name}-${opt.value || "empty"}`} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={fieldClassName(field.type)}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                )}
              </label>
            ))}

            <div className={styles.formActions}>
              <button className={styles.submit} type="submit" disabled={isPending}>
                {isPending ? "Submitting…" : "Submit request"}
              </button>
              <span className={styles.note}>Required fields must be completed.</span>
            </div>
          </form>
        )}
      </div>
    </>
  );

  if (embed) {
    return <div className={styles.embedShell}>{inner}</div>;
  }

  return (
    <section id="request" className={styles.shell}>
      {inner}
    </section>
  );
}
