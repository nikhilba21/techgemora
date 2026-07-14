"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Cpu, Globe, Server, Settings, ShieldCheck, HeartPulse, CreditCard, ShoppingCart, Home, School, Truck, Factory, Compass, HelpCircle, Users, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string; description?: string; icon?: any }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      dropdown: [
        { label: 'Custom Software', href: '/custom-software-development', description: 'Tailored enterprise software and core systems integration.', icon: Cpu },
        { label: 'Web Development', href: '/web-development-company', description: 'Premium React & Next.js applications and responsive portals.', icon: Globe },
        { label: 'Mobile App Dev', href: '/mobile-app-development-company', description: 'Stunning iOS, Android & Flutter cross-platform apps.', icon: Server },
        { label: 'AI Development', href: '/ai-development-company', description: 'Custom LLMs, chat agents, and intelligent workflow automation.', icon: Settings },
        { label: 'SaaS Development', href: '/saas-development-company', description: 'Multi-tenant subscription billing systems and MVPs.', icon: ShieldCheck },
        { label: 'Game Development', href: '/game-development-company', description: 'Immersive 2D/3D web-based and mobile gaming setups.', icon: Globe },
        { label: 'Cloud Solutions', href: '/cloud-development-services', description: 'Scalable AWS hosting, migrations, and serverless config.', icon: Server },
        { label: 'DevOps & CI/CD', href: '/devops-services', description: 'Automated software releases and Docker clustering.', icon: Settings },
        { label: 'Software Testing', href: '/software-testing-services', description: 'Automation QA and complete application auditing.', icon: ShieldCheck },
        { label: 'Offshore India', href: '/software-development-company-india', description: 'Scale development teams with high cost-efficiency.', icon: Users },
      ]
    },
    {
      label: 'Solutions',
      dropdown: [
        { label: 'Dedicated Teams', href: '/hire-nextjs-developers', description: 'Hire pre-vetted engineers to scale your delivery capacity.', icon: Users },
        { label: 'Startup MVP Suite', href: '/saas-development-company', description: 'Accelerated development loops for early-stage funding.', icon: Cpu },
        { label: 'Enterprise Systems', href: '/custom-software-development', description: 'Robust, compliant and legacy-rebuilt architectures.', icon: Settings },
      ]
    },
    {
      label: 'Industries',
      dropdown: [
        { label: 'Healthcare', href: '/healthcare-software-development', description: 'HIPAA-compliant custom medical and telehealth tools.', icon: HeartPulse },
        { label: 'FinTech', href: '/fintech-software-development', description: 'Secure payment engines, banking, and ledger databases.', icon: CreditCard },
        { label: 'E-commerce', href: '/ecommerce-development', description: 'High-conversion storefronts and shopping inventory.', icon: ShoppingCart },
        { label: 'Real Estate', href: '/real-estate-software-development', description: 'CRM dashboards, property search and booking nodes.', icon: Home },
        { label: 'Education', href: '/education-software-development', description: 'LMS systems, virtual classrooms, and student portals.', icon: School },
        { label: 'Logistics & Supply', href: '/logistics-software-development', description: 'Live tracking engines and fleet routing optimization.', icon: Truck },
        { label: 'Manufacturing', href: '/manufacturing-software-development', description: 'ERP setups, warehouse logs and IoT analytics.', icon: Factory },
        { label: 'Travel & Tourism', href: '/travel-software-development', description: 'Booking reservation modules and travel agency apps.', icon: Compass },
      ]
    },
    {
      label: 'Hire Developers',
      dropdown: [
        { label: 'Hire React Devs', href: '/hire-react-developers' },
        { label: 'Hire Next.js Devs', href: '/hire-nextjs-developers' },
        { label: 'Hire Node.js Devs', href: '/hire-nodejs-developers' },
        { label: 'Hire Python Devs', href: '/hire-python-developers' },
        { label: 'Hire Flutter Devs', href: '/hire-flutter-developers' },
        { label: 'Hire React Native Devs', href: '/hire-react-native-developers' },
        { label: 'Hire Laravel Devs', href: '/hire-laravel-developers' },
        { label: 'Hire Java Devs', href: '/hire-java-developers' },
        { label: 'Hire .NET Devs', href: '/hire-dotnet-developers' },
        { label: 'Hire iOS/Swift Devs', href: '/hire-ios-developers' },
        { label: 'Hire Android/Kotlin Devs', href: '/hire-android-developers' },
      ]
    },
    {
      label: 'Technologies',
      dropdown: [
        { label: 'React.js', href: '/react-development-company' },
        { label: 'Next.js', href: '/nextjs-development-company' },
        { label: 'Node.js', href: '/nodejs-development-company' },
        { label: 'Python', href: '/python-development-company' },
        { label: 'Flutter', href: '/flutter-development-company' },
        { label: 'Angular', href: '/angular-development-company' },
        { label: 'AWS Services', href: '/aws-development-services' },
      ]
    },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    {
      label: 'Company',
      dropdown: [
        { label: 'About Us', href: '/#about' },
        { label: 'Careers', href: '/#careers' },
        { label: 'Contact Us', href: '/contact' },
      ]
    }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-navy flex items-center">
              TECH <span className="text-electric ml-1">GEMORA</span>
            </span>
            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-widest leading-none">
              Gemora Global Tech Div
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link 
                    href={item.href}
                    className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg hover:bg-slate-100 hover:text-electric flex items-center ${pathname === item.href ? 'text-electric' : 'text-slate-700'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg hover:bg-slate-100 hover:text-electric flex items-center gap-1 ${activeDropdown === item.label ? 'text-electric bg-slate-100' : 'text-slate-700'}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute left-1/2 -translate-x-1/2 mt-1 w-72 md:w-96 glass-panel border border-slate-200/80 rounded-2xl shadow-xl p-3 z-50 grid gap-1 ${item.dropdown.length > 5 ? 'grid-cols-2 w-[520px] md:w-[600px]' : 'grid-cols-1'}`}
                      >
                        {item.dropdown.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/80 group transition-colors"
                            >
                              {Icon && (
                                <div className="p-1.5 bg-slate-200/40 rounded-lg group-hover:bg-blue-100 group-hover:text-electric text-slate-600 transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-[13px] font-semibold text-slate-800 group-hover:text-electric transition-colors">
                                  {sub.label}
                                </p>
                                {sub.description && (
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Contact / CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              href="/contact" 
              className="bg-electric text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center gap-1.5 group"
            >
              Start Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link 
              href="/contact" 
              className="bg-electric text-white text-[12px] font-semibold px-3.5 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-slate-600 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 w-full overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block py-2 text-sm font-semibold text-slate-700 hover:text-electric"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-slate-700 hover:text-electric"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === item.label && item.dropdown && (
                        <div className="pl-4 mt-1 grid grid-cols-1 gap-1 bg-slate-50 p-2 rounded-xl">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-electric"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-electric text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
