import { Search, ChevronDown, Menu, Mic } from "lucide-react";
import { Button } from "./ui/button";
import axisLogo from "@/assets/axis-bank-logo.png";
const Header = () => {
  const primaryNavItems = ["Personal", "Business", "Priority", "Burgundy", "NRI"];
  const secondaryNavItems = ["About Us", "Support", "Lodge a Complaint"];
  return <header className="bg-nav-bg text-nav-text">
      {/* Secondary Navigation */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 mx-0">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/lovable-uploads/bb0dfc3e-e7b3-48d1-b2f2-9fda92e710fc.png" alt="Nexus Logo" className="h-8 w-auto" />
          </div>

          {/* Primary Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryNavItems.map(item => <a key={item} href="#" className="hover:text-white/80 transition-colors font-medium">
                {item}
              </a>)}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <div className="flex items-center bg-white rounded-lg px-4 py-2 w-80">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" placeholder="Search for Products, Services" className="flex-1 text-gray-700 placeholder-gray-400 border-none outline-none" />
                  <Mic className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-axis-pink font-medium">Open Digital A/c</span>
              <Button variant="axis-login">LOGIN</Button>
            </div>
            
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-t border-white/10 py-3">
          <nav className="flex items-center space-x-8 text-sm">
            <a href="#" className="hover:text-white/80 transition-colors">
              Explore Products
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Grab Deals
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Make Payments
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Bank Smart
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Unlearn
            </a>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;