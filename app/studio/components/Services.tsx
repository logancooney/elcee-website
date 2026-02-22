export default function Services() {
  const services = [
    {
      title: "Recording & Engineering",
      description: "Capture your performance with clarity and precision. Professional vocal and instrument tracking in a focused environment built for quality.",
      includes: [
        "High-end signal chain",
        "Experienced engineering and session direction",
        "Flexible session lengths",
        "All session files delivered"
      ]
    },
    {
      title: "Mixing & Mastering",
      description: "Transform recordings into polished, competitive releases. Technical precision meets creative vision.",
      includes: [
        "Professional mix with depth, clarity, and impact",
        "Industry-standard processing and plugins",
        "Multiple revision rounds",
        "Stems and final mix delivery",
        "Loudness optimization for streaming",
        "Format delivery for all platforms"
      ]
    },
    {
      title: "Music Production",
      description: "Custom production tailored to your sound. From full beat creation to arrangement and sonic direction.",
      includes: [
        "Bespoke production or additional production work",
        "Professional sound design and arrangement",
        "Stems and project files",
        "Collaborative creative process"
      ]
    }
  ];

  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Services
        </h2>
        <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Complete studio services from tracking to final master. Professional equipment, 
          experienced engineering, and a results-focused approach.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white text-black p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-sm uppercase tracking-wide mb-3">
                  Includes:
                </p>
                {service.includes.map((item, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
