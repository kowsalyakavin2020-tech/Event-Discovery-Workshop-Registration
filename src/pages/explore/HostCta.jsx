import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionTitle from '../../components/ui/SectionTitle'

const PERKS = [
  ['fa-users', 18000, '+', 'learners already on Stackly'],
  ['fa-clipboard-list', 320, '', 'sessions run with our team'],
  ['fa-hand-holding-heart', 0, '', 'setup fees. We earn when you do.'],
]
const STRIP = [
  ['gallery-4', 'Meetups', 'fa-people-group'],
  ['gallery-2', 'Workshops', 'fa-chalkboard-user'],
  ['gallery-6', 'Long tables', 'fa-utensils'],
]
const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/
const NAME = /^[A-Za-z]+(?: [A-Za-z]+)*$/ // letters and single spaces only

const validate = (f) => {
  const e = {}
  const name = f.name.trim()
  if (!name) e.name = 'Please enter your name.'
  else if (!NAME.test(name)) e.name = 'Name can contain letters only. No numbers or symbols.'
  else if (name.length < 2) e.name = 'Name must be at least 2 letters.'
  if (!f.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL.test(f.email.trim())) e.email = 'Please enter a valid email address, like you@example.com.'
  const topic = f.topic.trim()
  if (!topic) e.topic = 'Tell us what you will teach.'
  else if (topic.length < 5 || !/[A-Za-z]/.test(topic)) e.topic = 'Describe the topic in a few words (at least 5 characters).'
  return e
}

export default function HostCta() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', topic: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length === 0) navigate('/404')
  }

  const field = (k, label, type = 'text', extra = {}) => (
    <label className={`field ${errors[k] ? 'field--bad' : ''}`}>
      <span>{label}</span>
      <input type={type} value={form[k]} onChange={set(k)} aria-invalid={Boolean(errors[k])} {...extra} />
      {errors[k] && <em role="alert">{errors[k]}</em>}
    </label>
  )

  return (
    <section className="section host">
      <div className="container">
        <div className="host__panel">
          <div className="host__copy">
            <SectionTitle light title="Teach something with us" text="Bring the topic. We bring the room, the audience and the sign-up page." />
            <ul className="host__perks" data-stagger>
              {PERKS.map(([icon, value, suffix, text]) => (
                <li key={text}>
                  <i className={`fa-solid ${icon}`} />
                  <p><b><span data-count={value}>0</span>{suffix}</b> {text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="host__card" data-anim="up:0.1">
            <form onSubmit={submit} noValidate>
              <h3>Pitch a workshop</h3>
              {field('name', 'Your name', 'text', { autoComplete: 'name' })}
              {field('email', 'Email', 'email', { autoComplete: 'email' })}
              {field('topic', 'What will you teach?')}
              <button type="submit" className="btn btn--copper btn--wide"><i className="fa-solid fa-paper-plane" /> Send pitch</button>
            </form>
          </div>
        </div>

        <div className="host__strip">
          {STRIP.map(([img, label, icon], i) => (
            <figure key={img} className="hstile" data-anim={`curtain:${i * 0.12}`}>
              <img data-parallax="-8" src={`/images/${img}.webp`} alt={label} loading="lazy" />
              <figcaption><i className={`fa-solid ${icon}`} /> {label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
