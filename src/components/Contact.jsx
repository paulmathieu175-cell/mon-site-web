import { useState } from "react";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";
import { hours, site } from "../data/content.js";

// Pour recevoir les messages par e-mail : créez un formulaire gratuit sur
// https://formspree.io puis ajoutez VITE_FORMSPREE_ID=xxxx dans un fichier .env
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const initial = { name: "", email: "", phone: "", date: "", guests: "2", message: "", website: "" };
const today = () => new Date().toISOString().split("T")[0];

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Merci d'indiquer votre nom (2 caractères minimum).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Merci d'indiquer une adresse e-mail valide.";
  if (v.phone && !/^[+\d][\d\s.-]{7,}$/.test(v.phone.trim())) e.phone = "Numéro de téléphone invalide.";
  if (v.date && v.date < today()) e.date = "La date doit être aujourd'hui ou plus tard.";
  if (v.message.trim().length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
  return e;
}

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium tracking-[0.15em] text-mist uppercase">
        {label} {optional && <span className="tracking-normal normal-case opacity-70">(facultatif)</span>}
      </label>
      {children}
      <p id={`${id}-error`} className={`mt-1.5 min-h-[1.25rem] text-xs text-red-400 transition ${error ? "opacity-100" : "opacity-0"}`} role={error ? "alert" : undefined}>
        {error}
      </p>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const blur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // piège anti-spam (champ caché)
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, date: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setStatus("sending");
    try {
      if (FORMSPREE_ID) {
        const { website, ...data } = values;
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Échec de l'envoi");
      } else {
        await new Promise((r) => setTimeout(r, 900)); // simulation sans service d'envoi
      }
      setStatus("success");
      setValues(initial);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (name) =>
    `w-full rounded-xl border bg-ink px-4 py-3.5 text-base text-cream placeholder:text-mist/50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30 ${
      errors[name] && touched[name] ? "border-red-400/70" : "border-line focus:border-gold"
    }`;
  const aria = (name) => ({
    "aria-invalid": Boolean(errors[name] && touched[name]),
    "aria-describedby": `${name}-error`,
  });

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal>
            <p className="eyebrow">Contact & réservation</p>
            <h2 className="title mt-4">Réservez votre table</h2>
            <p className="mt-6 leading-relaxed text-cream/70">
              Une question, une réservation ou un événement à organiser ? Écrivez-nous, nous vous
              répondons sous 24 h. Pour une réservation le jour même, appelez-nous directement.
            </p>
          </Reveal>

          <Reveal delay={150} as="ul" className="mt-10 space-y-6">
            {[
              { icon: "phone", label: "Téléphone", value: site.phone, href: `tel:${site.phoneHref}` },
              { icon: "mail", label: "E-mail", value: site.email, href: `mailto:${site.email}` },
              { icon: "pin", label: "Adresse", value: site.address, href: site.mapsUrl, external: true },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-ink">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs tracking-[0.15em] text-mist uppercase">{c.label}</span>
                    <span className="mt-0.5 block break-words text-cream transition group-hover:text-gold">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal delay={250} className="mt-10 rounded-2xl border border-line bg-ink-2 p-6">
            <h3 className="flex items-center gap-2 font-display text-xl text-gold">
              <Icon name="clock" className="h-5 w-5" /> Horaires
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              {hours.map((h) => (
                <div key={h.day} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                  <dt className="text-cream/80">{h.day}</dt>
                  <dd className="text-mist">{h.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-3">
          <form
            noValidate
            onSubmit={onSubmit}
            className="relative rounded-3xl border border-line bg-ink-2 p-6 shadow-2xl sm:p-10"
            aria-label="Formulaire de contact et réservation"
          >
            {status === "success" ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
                  <Icon name="check" className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-3xl">Merci !</h3>
                <p className="mt-3 max-w-sm text-cream/70">
                  Votre demande a bien été envoyée. Nous revenons vers vous très rapidement pour confirmer.
                </p>
                <button type="button" className="btn-outline mt-8" onClick={() => setStatus("idle")}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Field id="name" label="Nom complet" error={touched.name && errors.name}>
                    <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={update} onBlur={blur} className={inputCls("name")} placeholder="Jean Dupont" {...aria("name")} />
                  </Field>
                  <Field id="email" label="E-mail" error={touched.email && errors.email}>
                    <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={update} onBlur={blur} className={inputCls("email")} placeholder="jean@exemple.fr" {...aria("email")} />
                  </Field>
                  <Field id="phone" label="Téléphone" optional error={touched.phone && errors.phone}>
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={update} onBlur={blur} className={inputCls("phone")} placeholder="06 00 00 00 00" {...aria("phone")} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="date" label="Date" optional error={touched.date && errors.date}>
                      <input id="date" name="date" type="date" min={today()} value={values.date} onChange={update} onBlur={blur} className={`${inputCls("date")} [color-scheme:dark]`} {...aria("date")} />
                    </Field>
                    <Field id="guests" label="Couverts">
                      <select id="guests" name="guests" value={values.guests} onChange={update} className={`${inputCls("guests")} [color-scheme:dark]`}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                        <option value="10+">10+</option>
                      </select>
                    </Field>
                  </div>
                </div>
                <Field id="message" label="Message" error={touched.message && errors.message}>
                  <textarea id="message" name="message" rows={5} value={values.message} onChange={update} onBlur={blur} className={`${inputCls("message")} resize-y`} placeholder="Votre demande, allergies, occasion particulière…" {...aria("message")} />
                </Field>

                {/* Champ piège anti-robots, invisible pour les humains */}
                <input type="text" name="website" value={values.website} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                {status === "error" && (
                  <p className="mb-4 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300" role="alert">
                    Une erreur est survenue. Réessayez ou appelez-nous au {site.phone}.
                  </p>
                )}

                <button type="submit" className="btn-gold w-full" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" /> Envoi en cours…
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-mist">
                  Vos données servent uniquement à répondre à votre demande.
                </p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
