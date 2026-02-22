import AnimatedContainer from './AnimatedContainer'

export default function SectionHeader({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <AnimatedContainer className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-gold font-semibold text-xs uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-['Playfair_Display'] font-700 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </AnimatedContainer>
  )
}
