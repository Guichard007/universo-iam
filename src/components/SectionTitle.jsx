export default function SectionTitle({ subtitle, title, description, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {subtitle && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-iam-blue/10 text-iam-blue border border-iam-blue/20 mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-iam-gray text-lg max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
