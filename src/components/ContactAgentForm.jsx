import { useState, useEffect, useRef } from 'react';
import {
  validateContactField,
  validateContactForm,
} from '../utils/validators';

export function ContactAgentForm({ propertyTitle, agent }) {
  const defaultMessage = `I'm interested in ${propertyTitle}`;

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const timerRef = useRef(null);

  // Reset form when navigating to another property
  useEffect(() => {
    setValues({
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in ${propertyTitle}`,
    });
    setTouched({});
    setErrors({});
    setIsSending(false);
    setIsSent(false);
  }, [propertyTitle]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateContactField(field, nextValue),
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateContactField(field, values[field]),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setTouched({ name: true, email: true, phone: true, message: true });
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    setIsSending(true);
    timerRef.current = window.setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 500);
  };

  const handleReset = () => {
    setValues({
      name: '',
      email: '',
      phone: '',
      message: defaultMessage,
    });
    setTouched({});
    setErrors({});
    setIsSent(false);
  };

  return (
    <aside className="contact-card" aria-label="Contact listing agent">
      <div className="contact-card__agent">
        <div className="contact-card__avatar" aria-hidden="true">
          <i className="fa-solid fa-user-tie" />
        </div>
        <div className="contact-card__agent-info">
          <p className="contact-card__role">Listing Agent</p>
          <h2 className="contact-card__name">{agent.name}</h2>
          <a
            href={`tel:${agent.phone.replace(/\s+/g, '')}`}
            className="contact-card__phone"
          >
            <i className="fa-solid fa-phone" aria-hidden="true" />
            <span>{agent.phone}</span>
          </a>
        </div>
      </div>

      <hr className="contact-card__divider" />

      {isSent ? (
        <div className="contact-card__success" aria-live="polite">
          <div className="contact-card__success-icon" aria-hidden="true">
            <i className="fa-solid fa-check" />
          </div>
          <h3 className="contact-card__success-title">Inquiry received</h3>
          <p className="contact-card__success-text">
            Your message has been sent to {agent.name}.
          </p>
          <button
            type="button"
            className="btn btn--secondary contact-card__again"
            onClick={handleReset}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__group">
            <label htmlFor="agent-contact-name" className="field-label">
              Your name
            </label>
            <input
              id="agent-contact-name"
              type="text"
              className={`field-input ${
                touched.name && errors.name ? 'has-error' : ''
              }`}
              placeholder="e.g. Chinedu Eze"
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={
                touched.name && errors.name ? 'error-name' : undefined
              }
              required
            />
            {touched.name && errors.name ? (
              <p id="error-name" className="field-error" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="contact-form__group">
            <label htmlFor="agent-contact-email" className="field-label">
              Email address
            </label>
            <input
              id="agent-contact-email"
              type="email"
              className={`field-input ${
                touched.email && errors.email ? 'has-error' : ''
              }`}
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={
                touched.email && errors.email ? 'error-email' : undefined
              }
              required
            />
            {touched.email && errors.email ? (
              <p id="error-email" className="field-error" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="contact-form__group">
            <label htmlFor="agent-contact-phone" className="field-label">
              Phone number
            </label>
            <input
              id="agent-contact-phone"
              type="tel"
              className={`field-input ${
                touched.phone && errors.phone ? 'has-error' : ''
              }`}
              placeholder="+234 803 000 0000"
              value={values.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              aria-invalid={Boolean(touched.phone && errors.phone)}
              aria-describedby={
                touched.phone && errors.phone ? 'error-phone' : undefined
              }
              required
            />
            {touched.phone && errors.phone ? (
              <p id="error-phone" className="field-error" role="alert">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className="contact-form__group">
            <label htmlFor="agent-contact-message" className="field-label">
              Message
            </label>
            <textarea
              id="agent-contact-message"
              rows={4}
              className={`field-input field-textarea ${
                touched.message && errors.message ? 'has-error' : ''
              }`}
              value={values.message}
              onChange={handleChange('message')}
              onBlur={handleBlur('message')}
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={
                touched.message && errors.message ? 'error-message' : undefined
              }
              required
            />
            {touched.message && errors.message ? (
              <p id="error-message" className="field-error" role="alert">
                {errors.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn--primary contact-form__submit"
            disabled={isSending}
          >
            <span>{isSending ? 'Sending...' : 'Request details'}</span>
            {!isSending ? (
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            ) : null}
          </button>
        </form>
      )}
    </aside>
  );
}
