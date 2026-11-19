import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/

export default function Newsletter() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) return setError('Please enter your email address.')
    if (!EMAIL.test(value)) return setError('Please enter a valid email address, like you@example.com.')
    setError('')
    navigate('/404')
  }

  return (
    <section className="news">
      <img className="news__bg" src={`${import.meta.env.BASE_URL}images/newsletter-bg.webp`} alt="" loading="lazy" />
      <div className="container news__box" data-anim="up">
        <h2>Get the weekly shortlist</h2>
        <p>Five events worth your Saturday, sent every Thursday. Unsubscribe in one click.</p>
        <form onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="news-email">Email address</label>
          <input
            id="news-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            className={error ? 'is-bad' : ''}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'news-error' : undefined}
            onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
          />
          <button className="btn btn--copper" type="submit"><i className="fa-solid fa-paper-plane" /> Subscribe</button>
        </form>
        {error && <p id="news-error" className="news__err" role="alert"><i className="fa-solid fa-circle-exclamation" /> {error}</p>}
      </div>
    </section>
  )
}
