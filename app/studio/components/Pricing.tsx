export default function Pricing() {
  return (
    <section className="py-24 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Pricing
        </h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Transparent pricing with no hidden fees. Choose individual services or package 
          multiple tracks for complete projects.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Studio Sessions */}
          <div className="border-2 border-black p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Studio Sessions</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Standard</span>
                <span className="text-xl font-semibold">£35/hour</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Loyalty Plan</span>
                <span className="text-xl font-semibold">£30/hour</span>
              </div>
              <p className="text-sm text-gray-500 pt-2">
                Loyalty plan: £240/month subscription
              </p>
            </div>
          </div>

          {/* Mixing Services */}
          <div className="border-2 border-black p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Mixing Services</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Full Mix & Master</span>
                <span className="text-xl font-semibold">£340</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Vocal Mix</span>
                <span className="text-xl font-semibold">£190</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Mastering</span>
                <span className="text-xl font-semibold">£40</span>
              </div>
            </div>
          </div>

          {/* Production */}
          <div className="border-2 border-black p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Production</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Custom Production</span>
                <span className="text-xl font-semibold">From £400</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700">Additional Production</span>
                <span className="text-xl font-semibold">From £150</span>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="bg-black text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Multi-Track Packages</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span>3-Track Package</span>
                <span className="text-xl font-semibold">£920</span>
              </div>
              <p className="text-sm text-gray-400">Save £100</p>
              <div className="flex justify-between items-baseline pt-3">
                <span>5-Track Package</span>
                <span className="text-xl font-semibold">£1,450</span>
              </div>
              <p className="text-sm text-gray-400">Save £250</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="border border-gray-300 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Add-ons</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold">Vocal Tuning</p>
              <p className="text-gray-600">£40</p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold">Stem Separation</p>
              <p className="text-gray-600">£75</p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold">Rush Delivery</p>
              <p className="text-gray-600">+40%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
