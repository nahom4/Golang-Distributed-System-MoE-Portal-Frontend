// import React from 'react';
import { Search, Download, FileText, Shield, Clock, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Search,
    iconClass: 'green',
    title: 'Instant Result Access',
    description: 'Search and view your exam results immediately using your student ID and exam registration number.',
  },
  // {
  //   icon: Download,
  //   iconClass: 'yellow',
  //   title: 'Certificate Download',
  //   description: 'Download official certificates and transcripts in PDF format for your records and applications.',
  // },
  {
    icon: FileText,
    iconClass: 'red',
    title: 'Petition Submission',
    description: 'Submit grade review petitions and appeals directly through the portal with document upload.',
  },
  {
    icon: Shield,
    iconClass: 'green',
    title: 'Secure & Verified',
    description: 'All results and documents are verified and secured with government-level encryption.',
  },
  {
    icon: Clock,
    iconClass: 'yellow',
    title: '24/7 Availability',
    description: 'Access your results anytime, anywhere. Our portal is available round the clock.',
  },
  {
    icon: MessageCircle,
    iconClass: 'red',
    title: 'Support Center',
    description: 'Get help from our dedicated support team for any questions about your results or portal.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Use Our Results Portal?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the most reliable and secure way to access your Ethiopian national examination results and certificates.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.iconClass}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Portal Statistics
          </h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">2.8M+</div>
              <div className="stat-label">Results Accessed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Certificates Downloaded</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15K+</div>
              <div className="stat-label">Petitions Processed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}