export default function Process() {
  const steps = [
    {
      number: "1",
      title: "Book Your Session",
      description: "Check calendar availability and book online. Flexible scheduling with confirmation within 24 hours."
    },
    {
      number: "2",
      title: "Create",
      description: "Professional environment with experienced engineering. Focused sessions designed for results."
    },
    {
      number: "3",
      title: "Receive Final Files",
      description: "Fast turnaround with professional delivery. Revisions included to ensure you're satisfied with the result."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
