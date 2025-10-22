
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">AgriTradeX</h3>
            <p className="text-gray-400 text-sm">The next generation of livestock trading, connecting farmers and buyers directly.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">How to Sell</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">Logistics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 text-sm">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-2">Subscribe to our newsletter.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full bg-gray-800 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-500 transition-colors">Go</button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AgriTradeX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
