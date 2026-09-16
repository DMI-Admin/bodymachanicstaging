import type { FormState } from "./useSubmit";

/** Off-screen rather than display:none, so bots still find and fill it. */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label>
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ state, children }: { state: FormState; children: React.ReactNode }) {
  return (
    <button type="submit" className="btn w-full sm:w-auto" disabled={state === "submitting"}>
      {state === "submitting" ? (
        <>
          <span className="spinner" aria-hidden="true" /> Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormNote({ state, note, fallback }: { state: FormState; note: string; fallback: string }) {
  return (
    <p className="form-note m-0" data-state={state} role="status" aria-live="polite">
      {note || fallback}
    </p>
  );
}
