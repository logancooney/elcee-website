export default function Achievements() {
  const featured = [
    "JBL",
    "Boiler Room",
    "adidas",
    "Rising Ballers",
    "Sofar Sounds",
    "Notion",
    "DMY",
    "BBC Introducing",
    "Slanky"
  ];

  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-5xl mx-auto">
        {/* Press Quote */}
        <div className="mb-16 text-center">
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-4">
            "Redefining the style and sound of tomorrow"
          </p>
          <p className="text-gray-600">— Boiler Room</p>
        </div>

        {/* Featured By */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-6">Featured by</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-base">
            {featured.map((name, index) => (
              <span key={index} className="text-gray-700">
                {name}
              </span>
            ))}
            <span className="text-gray-500">and more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
