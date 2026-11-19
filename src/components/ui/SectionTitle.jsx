export default function SectionTitle({ title, text, align = 'left', light = false }) {
  return (
    <header className={`sec-title sec-title--${align} ${light ? 'sec-title--light' : ''}`}>
      <h2 className="sec-title__h">
        <span className="line"><span data-anim="rise">{title}</span></span>
      </h2>
      {text && <p data-anim="up:0.15">{text}</p>}
    </header>
  )
}
