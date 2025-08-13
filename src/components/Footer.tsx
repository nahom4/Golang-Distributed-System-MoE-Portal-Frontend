// import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-yellow-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Ethiopian Ministry of Education</span>
                <span className="text-sm text-gray-400">Results Portal</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering Ethiopian students with secure access to examination results and educational certificates.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
              <Globe className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#results" className="text-gray-400 hover:text-white transition-colors">Check Results</a></li>
              <li><a href="#certificates" className="text-gray-400 hover:text-white transition-colors">Download Certificates</a></li>
              <li><a href="#petitions" className="text-gray-400 hover:text-white transition-colors">Submit Petitions</a></li>
              <li><a href="#verification" className="text-gray-400 hover:text-white transition-colors">Verify Results</a></li>
              <li><a href="#transcript" className="text-gray-400 hover:text-white transition-colors">Request Transcripts</a></li>
            </ul>
          </div>

          {/* Exam Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Examinations</h3>
            <ul className="space-y-3">
              <li><a href="#grade8" className="text-gray-400 hover:text-white transition-colors">Grade 8 Results</a></li>
              <li><a href="#grade10" className="text-gray-400 hover:text-white transition-colors">Grade 10 Results</a></li>
              <li><a href="#grade12" className="text-gray-400 hover:text-white transition-colors">Grade 12 Results</a></li>
              <li><a href="#university" className="text-gray-400 hover:text-white transition-colors">University Entrance</a></li>
              <li><a href="#coc" className="text-gray-400 hover:text-white transition-colors">COC Results</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Ministry of Education</p>
                  <p className="text-gray-400">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-400">+251-11-XXX-XXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-400">results@moe.gov.et</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Federal Democratic Republic of Ethiopia - Ministry of Education. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Use</a>
            <a href="#help" className="text-gray-400 text-sm hover:text-white transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}