import { Button } from "./ui/button";

const UnlearnSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Unlearn, Learn & Relearn
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-elegant transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">📚</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Financial Literacy</h3>
              <p className="text-gray-600 text-sm mb-4">Learn the basics of personal finance and banking.</p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-elegant transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-100 to-green-200">
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">💡</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Investment Tips</h3>
              <p className="text-gray-600 text-sm mb-4">Smart strategies for growing your wealth.</p>
              <Button variant="outline" size="sm" className="w-full">
                Explore
              </Button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-elegant transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200">
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🎯</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Goal Planning</h3>
              <p className="text-gray-600 text-sm mb-4">Plan and achieve your financial goals.</p>
              <Button variant="outline" size="sm" className="w-full">
                Start Planning
              </Button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-elegant transition-shadow">
            <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200">
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🔒</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Security Tips</h3>
              <p className="text-gray-600 text-sm mb-4">Keep your finances safe and secure.</p>
              <Button variant="outline" size="sm" className="w-full">
                Stay Safe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnlearnSection;