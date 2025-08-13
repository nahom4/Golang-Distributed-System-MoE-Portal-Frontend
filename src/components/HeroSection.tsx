// import React from 'react';
import { Search, FileText, Download, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './ImageWithFallback';

export function HeroSection() {
  return (
    <section className="hero-section relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title">
                Check Your
                <br />
                Exam Results
                <br />
                <span className="text-green-600">Instantly</span>
              </h1>
              
              <p className="hero-subtitle">
                Access your Ethiopian national examination results, certificates, and submit petitions 
                through our secure and reliable portal. Your educational future starts here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cta-button flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Check Results</span>
              </button>
              
              <Button variant="outline" size="lg" className="text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-600">
                <FileText className="w-4 h-4 mr-2" />
                Submit Petition
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2.5M+</div>
                <div className="text-sm text-gray-600">Students Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">100%</div>
                <div className="text-sm text-gray-600">Secure</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-image-container relative">
            <div className="relative">
              <ImageWithFallback 
                src="education-hero.png" 
                alt="Ethiopian student checking results"
                className="hero-image w-full h-auto max-w-lg mx-auto rounded-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-green-100 p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/20">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-yellow-100 p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/20">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="decorative-shapes">
        <div className="shape-circle"></div>
        <div className="shape-circle"></div>
        <div className="shape-circle"></div>
      </div>

      {/* Ethiopian Flag Colors Decoration */}
      <div className="book-stack">
        <div className="relative">
          <div className="w-12 h-16 bg-green-500 rounded-sm shadow-lg transform rotate-12"></div>
          <div className="w-12 h-16 bg-yellow-500 rounded-sm shadow-lg transform -rotate-6 absolute top-2 left-2"></div>
          <div className="w-12 h-16 bg-red-500 rounded-sm shadow-lg transform rotate-3 absolute top-4 left-4"></div>
        </div>
      </div>
    </section>
  );
}