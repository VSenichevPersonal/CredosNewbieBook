export function DecorativeDiamonds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large cyan diamond - top right */}
      <div className="absolute top-20 right-32 diamond diamond-float" style={{ animationDelay: "0s" }} />

      {/* Small purple diamond - top right */}
      <div className="absolute top-32 right-20 diamond-small diamond-float" style={{ animationDelay: "1s" }} />

      {/* Medium cyan diamond - bottom left */}
      <div className="absolute bottom-40 left-24 diamond diamond-float" style={{ animationDelay: "2s" }} />

      {/* Small cyan diamond - middle */}
      <div className="absolute top-1/2 left-1/3 diamond-small diamond-float" style={{ animationDelay: "1.5s" }} />
    </div>
  )
}
