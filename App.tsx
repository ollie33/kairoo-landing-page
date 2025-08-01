import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { EarlyAccessModal } from "./components/EarlyAccessModal";
import AdminPanel from "./components/AdminPanel";
import { ArrowRight, Star } from "lucide-react";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetEarlyAccess = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🦘</span>
          <h1 className="text-2xl font-bold text-orange-600">Kairoo</h1>
        </div>
        <Button 
          onClick={handleGetEarlyAccess}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Get Early Access ✨
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Instantly find real connections in your new city. 🌟
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Kairoo helps you meet like-minded people and explore unique places – building real experiences, not just superficial swipes. 💫
          </h2>
          <Button 
            onClick={handleGetEarlyAccess}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Connecting Now 🚀
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-16 relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Kairoo - Connect with like-minded people"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full h-64 md:h-96 object-cover"
          />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl mb-6">🏠➡️❤️</div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Moving to a new city can feel isolating. Kairoo connects you with people who share your passions and helps you discover authentic places – making your new home feel like home, faster.
            </p>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How Kairoo Works ✨
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Interest-Based Matching
              </h3>
              <p className="text-gray-600">
                Meet people who truly share your hobbies and passions.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Discover Curated Places & Events
              </h3>
              <p className="text-gray-600">
                Find unique spots and experiences designed to bring people together.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Safe & Authentic Community
              </h3>
              <p className="text-gray-600">
                Verified profiles and thoughtful moderation ensure genuine connections.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Simple, Fast Onboarding
              </h3>
              <p className="text-gray-600">
                Download, swipe places you like, and start connecting immediately.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Our Users Say 💬
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I moved to San Francisco and felt so lost. Kairoo helped me find a hiking group that became my closest friends. Now the city feels like home!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mr-4 text-2xl">
                  👩‍💻
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah M.</p>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Unlike other apps, Kairoo connects you through shared interests and real activities. I've discovered amazing coffee shops and made genuine friendships."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center mr-4 text-2xl">
                  👨‍💼
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Michael R.</p>
                  <p className="text-gray-600 text-sm">Marketing Manager</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The verification process made me feel safe, and the place-based matching is brilliant. I've explored so many hidden gems in my new city!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mr-4 text-2xl">
                  👩‍🎨
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emma L.</p>
                  <p className="text-gray-600 text-sm">Graphic Designer</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              About Kairoo 🦘
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand the challenge of building meaningful connections in a new city. Our team of social connection experts and technology innovators created Kairoo to solve the modern problem of urban isolation. 🌆
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Unlike superficial dating apps, we focus on building authentic friendships and community connections through shared interests and real-world experiences. Our mission is to make every new city feel like home. 🏡
                </p>
              </div>
              <div className="relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Kairoo team - Cute cartoon illustration"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                {/* Overlay cute team emojis */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 to-transparent rounded-2xl flex items-center justify-center">
                  <div className="text-5xl opacity-80">
                    👨‍💻👩‍💻👨‍🎨👩‍🎨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Connecting?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of people who've found their community through Kairoo. 👥
            </p>
            <Button 
              onClick={handleGetEarlyAccess}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Early Access Now 🚀
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">🦘</span>
                <h3 className="text-xl font-bold text-orange-400">Kairoo</h3>
              </div>
              <p className="text-gray-400">
                Building real connections in new cities. 💫
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product 📱</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company 🏢</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support 🤝</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kairoo. All rights reserved. Made with ❤️</p>
          </div>
        </div>
      </footer>

      {/* Early Access Modal */}
      <EarlyAccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
}