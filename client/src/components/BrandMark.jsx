const MARK = '/applogo.jpeg'
const WORDMARK = '/logo.png'

export default function BrandMark({ size, withWord = false }) {
  if (withWord) {
    const wordmarkHeight = size || 44
    return (
      <img
        className="brand brand__wordmark"
        src={WORDMARK}
        alt="Scoring Heroes"
        style={{ height: wordmarkHeight, width: 'auto' }}
      />
    )
  }

  return (
    <img
      className="brand__logo"
      src={MARK}
      alt="Scoring Heroes"
      width={size}
      height={size}
    />
  )
}
