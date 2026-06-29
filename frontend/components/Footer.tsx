import Link from 'next/link';
import Image from 'next/image';
import { GoodFirmsIcon, UpworkIcon } from '@/app/components/PlatformIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image src="/logo.png" alt="Zalgo Infotech" width={160} height={40} className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 text-sm">
              Building exceptional digital solutions with WordPress expertise and modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/wordpress-development" className="text-gray-400 hover:text-white transition-colors">
                  WordPress Development
                </Link>
              </li>
              <li>
                <Link href="/services/woocommerce-development" className="text-gray-400 hover:text-white transition-colors">
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/wordpress-maintenance" className="text-gray-400 hover:text-white transition-colors">
                  WordPress Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/speed-optimization" className="text-gray-400 hover:text-white transition-colors">
                  Speed Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/wordpress-security" className="text-gray-400 hover:text-white transition-colors">
                  WordPress Security
                </Link>
              </li>
              <li>
                <Link href="/services/custom-development" className="text-gray-400 hover:text-white transition-colors">
                  Custom Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:sales@zalgoinfotech.in"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  sales@zalgoinfotech.in
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Form
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/contact" className="btn-primary text-sm inline-block">
                  Start Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-900 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Zalgo Infotech Private Limited. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://clutch.co/profile/zalgo-infotech#reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              >
                <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 110 16A8 8 0 0112 4zm0 3a5 5 0 100 10A5 5 0 0012 7z"/>
                </svg>
                <span className="text-red-400 font-semibold text-xs">Reviewed on Clutch</span>
                <span className="text-yellow-400 text-xs">★ 5.0</span>
              </a>
              <a
                href="https://www.goodfirms.co/company/zalgo-infotech-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-600/30 hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all"
              >
                <GoodFirmsIcon className="w-4 h-4" />
                <span className="text-yellow-500 font-semibold text-xs">Reviewed on GoodFirms</span>
                <span className="text-yellow-400 text-xs">★ 5.0</span>
              </a>
              <a
                href="https://www.upwork.com/freelancers/~011583492a8754a6a8?viewMode=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/25 hover:bg-green-500/20 hover:border-green-500/50 transition-all"
              >
                <UpworkIcon className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold text-xs">Reviewed on Upwork</span>
                <span className="text-yellow-400 text-xs">★ 5.0</span>
              </a>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
