export default function Achievements() {
  const achievements = [
    {
      title: "JBL Martin Garrix Music Academy",
      detail: "UK Winner • 1 of 30 selected worldwide"
    },
    {
      title: "Boiler Room Debut",
      detail: "100K views in first week"
    },
    {
      title: "adidas Rising Star",
      detail: "Abbey Road Studios sessions"
    }
  ];

  const stats = [
    { number: "500K+", label: "Total Streams" },
    { number: "15K+", label: "Followers" },
    { number: "6", label: "Years Active" }
  ];

  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-16 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-gray-600">{achievement.detail}</p>
            </div>
          ))}
        </div>

        {/* Press Quote */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-4">
            "Redefining the style and sound of tomorrow"
          </p>
          <p className="text-gray-600">— Boiler Room</p>
        </div>
      </div>
    </section>
  );
}
