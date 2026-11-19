import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { formatDate, formatPrice } from '../../data/events'
import useRegistrations from '../../hooks/useRegistrations'
import useSeats from '../../hooks/useSeats'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[6-9]\d{9}$/

const validate = (f) => {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Name is required (at least 2 characters).'
  if (!f.email.trim()) e.email = 'Email is required.'
  else if (!EMAIL.test(f.email.trim())) e.email = 'Enter a valid email, like you@example.com.'
  if (!f.phone.trim()) e.phone = 'Phone number is required.'
  else if (!PHONE.test(f.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number.'
  return e
}

export default function EventModal({ event, initialStep = 'details', onClose }) {
  const panel = useRef(null)
  const { register, isRegistered } = useRegistrations()
  const seatsLeft = useSeats()(event)
  const [step, setStep] = useState(() => (initialStep === 'form' && !isRegistered(event.id) && seatsLeft > 0 ? 'form' : 'details')) // details -> form -> done
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [pass, setPass] = useState(null)
  const registered = isRegistered(event.id)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.classList.add('no-scroll')
    window.addEventListener('keydown', onKey)
    const el = panel.current
    gsap.fromTo(el, { yPercent: 8, opacity: 0, scale: 0.96 }, { yPercent: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' })
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform,opacity' })
    }
  }, [onClose])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (isRegistered(event.id)) return setErrors({ form: 'You have already registered for this event.' })
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      setPass(register(event.id, { ...form, seats: 1 }))
      setStep('done')
    }
  }

  const field = (key, label, type = 'text', extra = {}) => (
    <label className={`field ${errors[key] ? 'field--bad' : ''}`}>
      <span>{label}</span>
      <input type={type} value={form[key]} onChange={set(key)} {...extra} />
      {errors[key] && <em role="alert">{errors[key]}</em>}
    </label>
  )

  return (
    <div className="modal" onClick={onClose} role="presentation">
      <div className="modal__panel" ref={panel} role="dialog" aria-modal="true" aria-label={event.title} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="modal__media">
          <img src={`${import.meta.env.BASE_URL}images/${event.image}.webp`} alt={`${event.title} banner`} />
          <span className="modal__price">{formatPrice(event.price)}</span>
        </div>

        <div className="modal__content">
          <p className="modal__cat">{event.category}</p>
          <h2>{event.title}</h2>

          {step === 'details' && (
            <>
              <ul className="modal__facts">
                <li><i className="fa-regular fa-calendar" /> {formatDate(event.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</li>
                <li><i className="fa-regular fa-clock" /> {event.time}</li>
                <li><i className="fa-solid fa-location-dot" /> {event.city} ({event.mode})</li>
                <li><i className="fa-solid fa-chair" /> {seatsLeft} of {event.seats} seats left</li>
              </ul>
              <p>{event.blurb}</p>
              <h3>What happens on the day</h3>
              <ol className="modal__agenda">
                {event.agenda.map((a) => <li key={a}>{a}</li>)}
              </ol>

              {registered ? (
                <div className="pass" role="status">
                  <i className="fa-solid fa-ticket" />
                  <h3>You are already registered for this event.</h3>
                  <Link to="/my-registrations" className="btn btn--copper" onClick={onClose}>Open My Registrations</Link>
                </div>
              ) : seatsLeft === 0 ? (
                <p className="modal__full"><i className="fa-solid fa-circle-exclamation" /> This event is full. Browse similar events instead.</p>
              ) : (
                <button type="button" className="btn btn--copper btn--wide" onClick={() => setStep('form')}>
                  <i className="fa-solid fa-ticket" /> Register Now
                </button>
              )}
            </>
          )}

          {step === 'form' && (
            <form className="reg-form" onSubmit={submit} noValidate>
              <ul className="modal__facts">
                <li><i className="fa-regular fa-calendar" /> {formatDate(event.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</li>
                <li><i className="fa-solid fa-location-dot" /> {event.city} ({event.mode})</li>
              </ul>
              <h3>Your details</h3>
              {field('name', 'Full name', 'text', { autoComplete: 'name' })}
              {field('email', 'Email', 'email', { autoComplete: 'email' })}
              {field('phone', 'Phone number', 'tel', { autoComplete: 'tel', inputMode: 'numeric', maxLength: 10 })}
              {errors.form && <em className="reg-form__err" role="alert">{errors.form}</em>}
              <div className="reg-form__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setStep('details')}>
                  <i className="fa-solid fa-arrow-left" /> Back
                </button>
                <button type="submit" className="btn btn--copper">
                  <i className="fa-solid fa-circle-check" /> Confirm registration
                </button>
              </div>
            </form>
          )}

          {step === 'done' && pass && (
            <div className="pass" role="status">
              <i className="fa-solid fa-circle-check" />
              <h3>Registration confirmed, {pass.name.split(' ')[0]}.</h3>
              <p>You are registered for {event.title} on {formatDate(event.date)}. Your pass code is <strong>{pass.code}</strong>.</p>
              <Link to="/my-registrations" className="btn btn--copper" onClick={onClose}>View My Registrations</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
