'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { submitContactForm } from '@/lib/api';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type ServiceData = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroColor: string;
  iconPath: string;
  features: { title: string; desc: string; icon: string }[];
  process: { step: string; title: string; desc: string }[];
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  tags: string[];
};

const services: Record<string, ServiceData> = {
  'wordpress-development': {
    slug: 'wordpress-development',
    title: 'WordPress Website Development',
    tagline: 'Beautiful, fast websites that convert visitors into clients',
    description: 'We build professional WordPress websites tailored to your brand identity and business goals. From simple brochure sites to complex multi-page portals — designed to impress, built to perform.',
    heroColor: 'from-teal-500/20 to-blue-500/10',
    iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    tags: ['WordPress', 'Custom Theme', 'Responsive', 'SEO-Ready', 'Fast Loading'],
    features: [
      { icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', title: 'Custom Design', desc: 'Pixel-perfect design that matches your brand identity, not a generic template.' },
      { icon: 'M12 18h.01M8 21h8a2 2 0 002-2v-1a2 2 0 00-2-2H8a2 2 0 00-2 2v1a2 2 0 002 2zM12 11a4 4 0 100-8 4 4 0 000 8z', title: 'Mobile-First Responsive', desc: '100% responsive across all devices — phones, tablets, laptops, and desktops.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'SEO Optimized', desc: 'Built with clean code, proper heading structure, meta tags, and fast load speeds for Google.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Lightning Fast', desc: 'Optimized images, caching, and minimal scripts ensure your site loads in under 2 seconds.' },
      { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Lead Generation Forms', desc: 'Contact forms, quote request forms, and newsletter sign-ups integrated seamlessly.' },
      { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title: 'Easy to Manage', desc: 'WordPress CMS lets you update content, add blog posts, and manage pages without technical help.' },
    ],
    process: [
      { step: '01', title: 'Discovery Call', desc: 'We learn about your business, goals, target audience, and design preferences in a 30-min call.' },
      { step: '02', title: 'Design Mockup', desc: 'We create a visual design prototype for your approval before writing a single line of code.' },
      { step: '03', title: 'Development', desc: 'We build your site on WordPress with clean code, SEO best practices, and performance in mind.' },
      { step: '04', title: 'Content & Testing', desc: 'We add your content, test on all devices and browsers, and fix any issues before launch.' },
      { step: '05', title: 'Launch', desc: 'We deploy your site to your hosting, configure DNS, set up SSL, and make it live.' },
      { step: '06', title: 'Post-Launch Support', desc: '30 days of free support after launch to fix any issues and answer your questions.' },
    ],
    benefits: [
      { title: 'More Leads & Enquiries', desc: 'A professionally designed site builds trust and motivates visitors to contact you.' },
      { title: 'Better Google Rankings', desc: 'SEO-ready code and fast load speed help you rank higher in local searches.' },
      { title: 'Works on Any Device', desc: 'Fully responsive design ensures a great experience for mobile and desktop users.' },
      { title: 'Easy Self-Management', desc: 'WordPress is beginner-friendly — update content without needing a developer.' },
    ],
    faqs: [
      { q: 'How long does it take to build a WordPress website?', a: 'A standard 5–8 page website typically takes 2–4 weeks from kickoff to launch, depending on content readiness and feedback rounds.' },
      { q: 'Do you work with existing WordPress sites?', a: 'Yes! We can redesign, rebuild, or add features to existing WordPress sites. We start with a thorough audit of your current setup.' },
      { q: 'Will my website be mobile-friendly?', a: 'Absolutely. Every website we build is 100% responsive and tested on phones, tablets, and desktops before launch.' },
      { q: 'Can I update the website myself after launch?', a: 'Yes. WordPress makes it easy to update content, images, and blog posts. We also provide training after launch.' },
      { q: 'Do you provide hosting?', a: 'We can recommend and set up reliable hosting for you, or work with your existing hosting provider.' },
    ],
  },

  'woocommerce-development': {
    slug: 'woocommerce-development',
    title: 'WooCommerce Development',
    tagline: 'High-converting online stores built for growth',
    description: 'We build powerful WooCommerce stores that look great, load fast, and turn visitors into buyers. From product setup to payment gateways — we handle everything for your e-commerce success.',
    heroColor: 'from-purple-500/20 to-blue-500/10',
    iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    tags: ['WooCommerce', 'E-commerce', 'Payment Gateway', 'Inventory', 'Scalable'],
    features: [
      { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Product Catalog Setup', desc: 'Unlimited products with variations, attributes, galleries, and inventory tracking.' },
      { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Payment Gateway Integration', desc: 'Stripe, PayPal, Razorpay, and 50+ payment methods configured and tested.' },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', title: 'Order Management', desc: 'Complete order tracking, status updates, invoice generation, and customer notifications.' },
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Discount & Coupon System', desc: 'Flexible discount rules, coupon codes, BOGO offers, and seasonal sale pricing.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Fast Checkout', desc: 'Optimized checkout flow with minimal steps to reduce cart abandonment and increase conversions.' },
      { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Sales Analytics', desc: 'Built-in WooCommerce analytics to track revenue, top products, and customer behavior.' },
    ],
    process: [
      { step: '01', title: 'Store Planning', desc: 'We map out your product catalog, payment flows, shipping zones, and tax rules.' },
      { step: '02', title: 'Design & UX', desc: 'We design a conversion-focused store layout that guides shoppers from browse to buy.' },
      { step: '03', title: 'Development', desc: 'We build the store on WooCommerce with all required plugins, configurations, and customizations.' },
      { step: '04', title: 'Payment Setup', desc: 'We integrate and test your payment gateway, ensuring secure, smooth transactions.' },
      { step: '05', title: 'Product Import', desc: 'We import your product catalog with images, descriptions, pricing, and inventory.' },
      { step: '06', title: 'Launch & Training', desc: 'We launch your store and train you on managing products, orders, and customers.' },
    ],
    benefits: [
      { title: 'Higher Conversion Rate', desc: 'Optimized UX and fast checkout turn more visitors into paying customers.' },
      { title: 'Secure Transactions', desc: 'SSL, PCI-compliant payment gateways, and fraud protection keep your customers safe.' },
      { title: 'Easy Inventory Management', desc: 'Manage stock levels, get low-stock alerts, and track all orders from one dashboard.' },
      { title: 'Scales with Your Business', desc: 'WooCommerce handles thousands of products and orders as your store grows.' },
    ],
    faqs: [
      { q: 'How long does it take to build a WooCommerce store?', a: 'A standard store with up to 50 products typically takes 3–5 weeks. Larger stores with complex requirements may take 6–8 weeks.' },
      { q: 'Which payment gateways do you support?', a: 'We support Stripe, PayPal, Razorpay, Square, 2Checkout, and most region-specific payment gateways. We test all transactions before launch.' },
      { q: 'Can you migrate my existing store to WooCommerce?', a: 'Yes! We migrate stores from Shopify, Magento, BigCommerce, and other platforms, including products, orders, and customer data.' },
      { q: 'Do you set up shipping and taxes?', a: 'Yes. We configure shipping zones, flat rates, free shipping rules, and tax settings based on your business location and target markets.' },
      { q: 'Can I add more products after launch?', a: 'Absolutely. WooCommerce makes it easy to add, edit, or remove products at any time through the admin dashboard.' },
    ],
  },

  'wordpress-maintenance': {
    slug: 'wordpress-maintenance',
    title: 'WordPress Maintenance',
    tagline: 'Your website, always updated, always secure, always online',
    description: 'We handle all the technical upkeep of your WordPress website — so you never have to worry about updates, backups, security, or downtime. Monthly maintenance plans starting from a flat monthly rate.',
    heroColor: 'from-orange-500/20 to-red-500/10',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    tags: ['Maintenance', 'Updates', 'Backups', 'Monitoring', '24/7 Uptime'],
    features: [
      { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'WordPress Core Updates', desc: 'We update WordPress core, themes, and plugins every week to keep your site current and compatible.' },
      { icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12', title: 'Daily Automated Backups', desc: 'Complete site and database backups stored securely off-site, with 30-day retention.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Security Monitoring', desc: 'Daily malware scans, login attempt monitoring, and file integrity checks to detect threats early.' },
      { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Uptime Monitoring', desc: 'We monitor your site 24/7 and alert you immediately if it goes down — with rapid response.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Performance Checks', desc: 'Monthly speed tests and Core Web Vitals audits to keep your site fast and Google-friendly.' },
      { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Monthly Reports', desc: 'Detailed monthly reports covering updates done, backup status, security scans, and uptime statistics.' },
    ],
    process: [
      { step: '01', title: 'Site Audit', desc: 'We audit your current site — plugins, themes, security, backups, and performance.' },
      { step: '02', title: 'Initial Fixes', desc: 'We fix any existing issues found during audit before starting the maintenance plan.' },
      { step: '03', title: 'Backup Setup', desc: 'We configure automated daily backups to a secure off-site location.' },
      { step: '04', title: 'Monitoring Setup', desc: 'Uptime monitoring, security scanning, and performance tracking go live.' },
      { step: '05', title: 'Regular Updates', desc: 'Weekly WordPress core, plugin, and theme updates — tested before applying.' },
      { step: '06', title: 'Monthly Reporting', desc: 'You receive a full report every month with everything we did and your site health status.' },
    ],
    benefits: [
      { title: 'Zero Downtime', desc: 'Proactive monitoring and fast response ensure your site stays online 99.9% of the time.' },
      { title: 'Always Secure', desc: 'Regular updates and security scans protect you from hacks and malware.' },
      { title: 'Peace of Mind', desc: 'Focus on your business while we handle all the technical side of your website.' },
      { title: 'Expert Support', desc: '10+ years of WordPress experience handling your maintenance — not an automated tool.' },
    ],
    faqs: [
      { q: 'What happens if my site gets hacked?', a: 'Hack recovery is included in our maintenance plans. We restore your site from a clean backup and harden security to prevent recurrence.' },
      { q: 'How do you handle plugin updates that break things?', a: 'We test updates on a staging environment first, then apply to live only after confirming compatibility.' },
      { q: 'Can I cancel my maintenance plan anytime?', a: 'Yes, our maintenance plans are month-to-month with no long-term contracts. Cancel anytime with 30 days notice.' },
      { q: 'Do you handle content updates too?', a: 'Minor content updates (text changes, image swaps) are included in most plans. Major redesigns are quoted separately.' },
      { q: 'What if I already have a backup solution?', a: 'We can work alongside your existing backup setup, or replace it with our recommended solution. We assess what works best for your setup.' },
    ],
  },

  'speed-optimization': {
    slug: 'speed-optimization',
    title: 'Website Speed Optimization',
    tagline: 'Faster sites rank higher, convert better, and retain more visitors',
    description: 'We audit and optimize your WordPress site to load in under 2 seconds. Core Web Vitals improvements, image compression, caching, CDN setup — everything needed for a lightning-fast site that Google loves.',
    heroColor: 'from-yellow-500/20 to-orange-500/10',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    tags: ['Speed', 'Core Web Vitals', 'PageSpeed', 'Caching', 'CDN'],
    features: [
      { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Performance Audit', desc: 'Detailed analysis of PageSpeed Insights, GTmetrix, and Core Web Vitals with clear recommendations.' },
      { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Image Optimization', desc: 'Compress, resize, convert to WebP, and implement lazy loading to dramatically reduce page weight.' },
      { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', title: 'Caching Setup', desc: 'Server-side and browser caching configured for maximum performance on every page load.' },
      { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'CDN Integration', desc: 'Content Delivery Network setup to serve your site faster to visitors worldwide.' },
      { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4', title: 'Database Optimization', desc: 'Clean up bloated databases, remove spam, optimize tables, and reduce query load times.' },
      { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Code Minification', desc: 'Minify CSS, JavaScript, and HTML files, and eliminate render-blocking resources.' },
    ],
    process: [
      { step: '01', title: 'Baseline Audit', desc: 'We run a full performance audit — PageSpeed, GTmetrix, WebPageTest — to establish your baseline scores.' },
      { step: '02', title: 'Issue Identification', desc: 'We identify every bottleneck: large images, unoptimized plugins, slow server, missing caching.' },
      { step: '03', title: 'Optimization Work', desc: 'We fix every identified issue — images, caching, CDN, code, database — methodically.' },
      { step: '04', title: 'Testing', desc: 'We re-test after every change to measure improvement and verify nothing broke.' },
      { step: '05', title: 'Final Report', desc: 'We deliver a before/after report showing exact score improvements and what was done.' },
    ],
    benefits: [
      { title: 'Better Google Rankings', desc: 'Page speed is a confirmed Google ranking factor — faster sites rank higher in search results.' },
      { title: 'Lower Bounce Rate', desc: 'Visitors leave slow sites. A 1-second improvement can reduce bounce rate by up to 32%.' },
      { title: 'Higher Conversions', desc: 'Amazon found every 100ms improvement increased revenue by 1%. Speed directly impacts sales.' },
      { title: 'Better Core Web Vitals', desc: 'Pass Google\'s CWV thresholds for LCP, FID/INP, and CLS — required for search visibility.' },
    ],
    faqs: [
      { q: 'What PageSpeed score can you achieve?', a: 'Results vary by site, but most of our clients see scores jump from 30–50 to 85–95+ on both mobile and desktop.' },
      { q: 'Will optimization break my website?', a: 'We test all changes on a staging copy of your site first. We only push to live after confirming everything works perfectly.' },
      { q: 'How long does speed optimization take?', a: 'Most sites are fully optimized within 3–5 business days, depending on complexity.' },
      { q: 'Do I need to change my hosting?', a: 'Sometimes slow hosting is the main bottleneck. We\'ll give you an honest assessment and recommend better hosting if needed.' },
      { q: 'Is a one-time fix enough, or do I need ongoing optimization?', a: 'A one-time fix handles existing issues. However, new plugins or content can slow your site over time — which is why we recommend pairing it with our maintenance plan.' },
    ],
  },

  'wordpress-security': {
    slug: 'wordpress-security',
    title: 'WordPress Security',
    tagline: 'Protect your site before hackers find it',
    description: 'We harden your WordPress site against attacks, malware, and data breaches. From firewall setup to login security, SSL, and hack recovery — we make your site a fortress.',
    heroColor: 'from-red-500/20 to-orange-500/10',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    tags: ['Security', 'Firewall', 'Malware Scan', 'SSL', 'Hack Recovery'],
    features: [
      { icon: 'M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Security Audit', desc: 'Full WordPress security audit covering vulnerabilities, outdated software, exposed files, and misconfigurations.' },
      { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Login Security', desc: 'Two-factor authentication, login attempt limits, and custom login URLs to block brute-force attacks.' },
      { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4', title: 'Web Application Firewall', desc: 'WAF rules block malicious traffic, SQL injections, XSS attacks, and bad bots before they reach WordPress.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944', title: 'Malware Scanning', desc: 'Daily automated scans detect malware, backdoors, and suspicious code before they cause damage.' },
      { icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z', title: 'SSL Certificate Management', desc: 'Free SSL setup, renewal, and HTTPS enforcement to encrypt all data between your site and visitors.' },
      { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Hack Recovery', desc: 'If your site is compromised, we clean the infection, restore from backup, and harden against repeat attacks.' },
    ],
    process: [
      { step: '01', title: 'Security Audit', desc: 'We scan your site for vulnerabilities, outdated plugins, weak passwords, and exposed files.' },
      { step: '02', title: 'Security Hardening', desc: 'We apply all recommended hardening measures — file permissions, wp-config rules, login security.' },
      { step: '03', title: 'Firewall & WAF', desc: 'We install and configure a Web Application Firewall to block malicious traffic.' },
      { step: '04', title: 'Malware Removal', desc: 'If any malware is found, we clean it completely and check for backdoors.' },
      { step: '05', title: 'Ongoing Monitoring', desc: '24/7 security monitoring with instant alerts for suspicious activity.' },
      { step: '06', title: 'Security Reports', desc: 'Monthly security reports showing scans, blocked threats, and your site\'s security health.' },
    ],
    benefits: [
      { title: 'No More Hacks', desc: 'Proper hardening stops 99% of automated attacks targeting WordPress sites.' },
      { title: 'Client Data Protection', desc: 'Protect your customers\' data and avoid GDPR/privacy regulation violations.' },
      { title: 'Google Blacklist Protection', desc: 'Keep your site off Google\'s malware blacklist, which kills organic traffic overnight.' },
      { title: 'Business Continuity', desc: 'A hacked site loses revenue. Security investment pays for itself on day one.' },
    ],
    faqs: [
      { q: 'My site was already hacked — can you fix it?', a: 'Yes! Hack recovery is one of our specialties. We clean malware, restore clean backups, and harden security to prevent repeat attacks. Contact us urgently for priority help.' },
      { q: 'Which security plugins do you use?', a: 'We work with Wordfence, Sucuri, iThemes Security, and server-level solutions depending on your hosting environment.' },
      { q: 'Is WordPress secure enough for e-commerce?', a: 'Yes, when properly configured. WooCommerce with SSL, a WAF, and our security hardening is used by millions of stores worldwide.' },
      { q: 'How often do you scan for malware?', a: 'Daily automated scans with immediate alerts. We also do manual checks during monthly maintenance.' },
      { q: 'Do you offer a security guarantee?', a: 'We guarantee to clean your site if it gets hacked while under our protection plan, at no extra charge.' },
    ],
  },

  'custom-development': {
    slug: 'custom-development',
    title: 'Custom WordPress Development',
    tagline: 'No limits — we build exactly what your business needs',
    description: 'When off-the-shelf plugins don\'t cut it, we build custom WordPress solutions. Custom plugins, API integrations, membership systems, booking tools, and bespoke functionality tailored to your exact workflow.',
    heroColor: 'from-blue-500/20 to-teal-500/10',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    tags: ['Custom Plugin', 'API Integration', 'Automation', 'Custom Post Types', 'Tailored'],
    features: [
      { icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z', title: 'Custom Plugin Development', desc: 'Bespoke WordPress plugins built from scratch to add functionality that no existing plugin offers.' },
      { icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Third-Party API Integration', desc: 'Connect WordPress to CRMs, ERPs, payment systems, shipping providers, and any REST or SOAP API.' },
      { icon: 'M19 11H7m12 0a2 2 0 010 4H7m12-4a2 2 0 000-4H7m0 0a2 2 0 010-4m0 4a2 2 0 000 4m0-4v12', title: 'Custom Post Types & Taxonomies', desc: 'Structured content systems — listings, portfolios, teams, events, and any custom data type you need.' },
      { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Workflow Automation', desc: 'Automate repetitive tasks — form submissions → CRM, orders → inventory, leads → email sequences.' },
      { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Membership & Subscriptions', desc: 'Gated content, subscription billing, user roles, and member-only sections built to your exact rules.' },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Advanced Custom Fields', desc: 'Complex field structures, repeaters, flexible content blocks, and dynamic data powered by ACF Pro.' },
    ],
    process: [
      { step: '01', title: 'Requirements Gathering', desc: 'Deep-dive session to fully understand your needs, technical constraints, and desired outcome.' },
      { step: '02', title: 'Technical Architecture', desc: 'We design the database schema, plugin structure, and integration architecture before coding begins.' },
      { step: '03', title: 'Development', desc: 'Clean, documented PHP/JavaScript code built to WordPress coding standards with security in mind.' },
      { step: '04', title: 'Testing', desc: 'Unit testing, integration testing, and end-to-end QA on staging before touching your live site.' },
      { step: '05', title: 'Deployment', desc: 'Staged deployment to live with rollback plan in place, tested thoroughly post-launch.' },
      { step: '06', title: 'Documentation & Handover', desc: 'Full code documentation and admin training so your team can manage the new functionality.' },
    ],
    benefits: [
      { title: 'Exactly What You Need', desc: 'No compromising with generic plugins — built to your precise specifications.' },
      { title: 'No Plugin Bloat', desc: 'Custom code is leaner and faster than juggling 10 different plugins.' },
      { title: 'Business Efficiency', desc: 'Automations and integrations save hours of manual work every week.' },
      { title: 'Competitive Advantage', desc: 'Unique features your competitors can\'t replicate with off-the-shelf tools.' },
    ],
    faqs: [
      { q: 'How much does custom WordPress development cost?', a: 'Custom work is priced by scope. Simple plugins start from a fixed project fee; complex integrations are quoted after discovery. Contact us for a free estimate.' },
      { q: 'Do you write documentation for custom code?', a: 'Yes. Every custom plugin or integration includes technical documentation and a handover session so your team understands what was built.' },
      { q: 'What if I need changes after delivery?', a: 'We offer a 30-day post-launch warranty for bug fixes. Feature additions after delivery are quoted as a new scope.' },
      { q: 'Can you work with an existing custom plugin?', a: 'Yes. We can audit, extend, debug, or refactor existing custom plugins, regardless of who wrote the original code.' },
      { q: 'Do you use WordPress coding standards?', a: 'Absolutely. All code follows WordPress Coding Standards, is secure against common vulnerabilities (XSS, SQL injection), and is ready for future updates.' },
    ],
  },
};

const slugToTitle: Record<string, string> = {
  'wordpress-development': 'WordPress Website Development',
  'woocommerce-development': 'WooCommerce Development',
  'wordpress-maintenance': 'WordPress Maintenance',
  'speed-optimization': 'Website Speed Optimization',
  'wordpress-security': 'WordPress Security',
  'custom-development': 'Custom WordPress Development',
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // All hooks must be called before any conditional return
  const heroRef = useInView(0.05);
  const featuresRef = useInView(0.1);
  const processRef = useInView(0.1);
  const benefitsRef = useInView(0.1);
  const faqRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMsg, setFormMsg] = useState('');

  const service = services[params.slug];
  const allServices = Object.values(services);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormState('error'); setFormMsg('Please fill in your name and email.'); return;
    }
    setFormState('loading');
    const result = await submitContactForm({
      name: formData.name, email: formData.email,
      mobile: formData.phone || 'Not provided',
      message: formData.message || `Interested in ${service.title}`,
      service: `${service.title} — Service Detail Page`,
    });
    if (result.success) {
      setFormState('success');
      setFormMsg('Thanks! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      setFormState('error'); setFormMsg(result.message);
    }
  };

  if (!service) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-teal-400 hover:underline">← Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef.ref} className="relative pt-32 pb-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.heroColor} pointer-events-none`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.08),transparent_70%)] pointer-events-none" />
        <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${heroRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-teal-400">{service.title}</span>
          </div>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 mb-8">
            <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
            </svg>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {service.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">{tag}</span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">{service.title}</h1>
          <p className="text-xl text-teal-400 font-medium mb-4">{service.tagline}</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">{service.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-500 text-gray-900 font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/25">
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:border-teal-500 hover:text-white transition-all">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featuresRef.ref} className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${featuresRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">What&apos;s Included</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3">Everything You Get</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((f, i) => (
              <div key={i} className={`group p-6 rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-teal-500/40 hover:bg-teal-500/5 transition-all ${featuresRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-teal-400 transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section ref={processRef.ref} className="py-24 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${processRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">How We Work</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3">Our Process</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Transparent, structured, and designed to keep you informed every step of the way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.process.map((p, i) => (
              <div key={i} className={`flex gap-4 p-6 rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-teal-500/30 transition-all ${processRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <span className="text-teal-400 font-black text-sm">{p.step}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section ref={benefitsRef.ref} className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${benefitsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Why It Matters</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3">Business Benefits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b, i) => (
              <div key={i} className={`text-center p-6 rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all ${benefitsRef.inView ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef.ref} className="py-24 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${faqRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3">FAQ</h2>
          </div>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <div key={i} className={`border border-gray-800 rounded-xl overflow-hidden transition-all ${faqRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-900/60 hover:bg-gray-900 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 text-teal-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 bg-gray-900/40">
                    <p className="text-gray-400 leading-relaxed pt-3 border-t border-gray-800">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + OTHER SERVICES ── */}
      <section ref={ctaRef.ref} id="contact" className="py-24 bg-gray-900/40 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div className={ctaRef.inView ? 'animate-slide-in-left' : 'opacity-0'}>
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Get Started</span>
              <h2 className="text-3xl font-extrabold text-white mt-2 mb-2">Ready to get started?</h2>
              <p className="text-gray-400 mb-8">Tell us about your project and we&apos;ll get back to you within 24 hours with a free consultation.</p>

              {formState === 'success' ? (
                <div className="p-8 rounded-2xl border border-teal-500/30 bg-teal-500/5 text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">{formMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Your Name *</label>
                      <input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address *</label>
                      <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
                    <input value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Tell us about your project</label>
                    <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      rows={4} placeholder={`I'm looking for help with ${service.title}...`}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors resize-none" />
                  </div>
                  {formState === 'error' && <p className="text-red-400 text-sm">{formMsg}</p>}
                  <button type="submit" disabled={formState === 'loading'}
                    className="w-full py-4 rounded-xl bg-teal-500 text-gray-900 font-bold hover:bg-teal-400 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                    {formState === 'loading' ? (
                      <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending...</>
                    ) : 'Get Free Consultation'}
                  </button>
                </form>
              )}
            </div>

            {/* Other Services */}
            <div className={ctaRef.inView ? 'animate-slide-in-right' : 'opacity-0'}>
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Explore More</span>
              <h2 className="text-3xl font-extrabold text-white mt-2 mb-8">Other Services</h2>
              <div className="space-y-3">
                {allServices.filter(s => s.slug !== service.slug).map((s, i) => (
                  <Link key={i} href={`/services/${s.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-teal-500/40 hover:bg-teal-500/5 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm group-hover:text-teal-400 transition-colors">{s.title}</p>
                      <p className="text-gray-500 text-xs truncate mt-0.5">{s.tagline}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
