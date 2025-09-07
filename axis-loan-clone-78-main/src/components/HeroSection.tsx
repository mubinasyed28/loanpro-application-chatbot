import { Button } from "./ui/button";
import currencyIllustration from "@/assets/currency-smartwatch-illustration.png";
const HeroSection = () => {
  return <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Content - Main Hero */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-card">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                    Need funds fast?
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-700 mb-2">
                    Get approved in <span className="font-semibold">Minutes</span>
                  </p>
                  <p className="text-xl lg:text-2xl text-gray-700 mb-2">
                    with NexAi ChatBot Loan.
                  </p>
                  <Button variant="axis-primary" size="lg" className="text-lg px-8 py-4">
                    Apply now
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">*T&C Apply</p>
                </div>
                
                <div className="flex justify-center lg:justify-end">
                  <img src="/lovable-uploads/d3594e3b-b33b-45b4-bf4b-2d3930c21c0b.png" alt="Red sports car with money" className="w-full max-w-sm object-contain" />
                </div>
              </div>

              {/* Dot Navigation */}
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>

              {/* Tab Navigation */}
              <div className="mt-8 border-t border-white/20 pt-6">
                <div className="flex space-x-8 justify-center">
                  <button className="text-gray-600 hover:text-primary transition-colors text-center">
                    <span className="block text-sm">Digital Saving</span>
                    <span className="block text-sm">Account</span>
                  </button>
                  <button className="text-primary text-center relative">
                    <span className="block text-sm font-medium">NexAi Easy Loans</span>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-axis-pink"></div>
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors text-center">
                    <span className="block text-sm">Credit Card</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Key Updates */}
          <div className="lg:col-span-4">
            <div className="bg-card-gradient rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">Key Updates</h2>
                <span className="text-primary text-xl">›</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">
                    Looking for <span className="text-axis-pink font-semibold">instant funds?</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-3">Your search ends with</p>
                  <div className="bg-axis-pink-light rounded-lg px-3 py-1 inline-block mb-4">
                    <span className="text-primary font-semibold text-sm">24x7 Personal Loan</span>
                  </div>
                </div>

                <Button variant="axis-secondary" className="w-full" href='./chat-interface.tsx' href="../components/chat-interface.tsx">
                  Apply Now
                </Button>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-axis-pink rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      <span className="font-semibold">Interest Rate</span> - 1% p.m.*
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-axis-pink rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      <span className="font-semibold">Quick Online</span>
                    </span>
                  </div>
                  <div className="ml-5">
                    <span className="text-gray-700 font-semibold">Approval</span>
                  </div>
                </div>

                <div className="mt-4 relative">
                  <img src="/lovable-uploads/bc7d0bfc-21c6-4153-accc-1730f0be6ed4.png" alt="Scattered dollar bills" className="w-full h-32 object-cover rounded-lg" />
                </div>

                <p className="text-xs text-gray-500 mt-3">*T&C apply.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;