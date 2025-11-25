export default function LogoScroller() {
  const logos = [
    "stern logo.avif","vandy logo.png","umass logo.png","kelley logo.png",
    "mich logo.png","purdue.png","rutgers.png","columbia.png"
  ]

  return (
    <div className="scroller-wrap">
      <div className="logo-scroller">
        <div className="logo-track">
          {[...logos, ...logos].map((src, i) => (
            <img key={i} src={`/${src}`} alt="" />
          ))}
        </div>
      </div>
    </div>
  )
}