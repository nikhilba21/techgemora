"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Cpu, Globe, Server, Settings, ShieldCheck, HeartPulse, CreditCard, ShoppingCart, Home, School, Truck, Factory, Compass, Users, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string; description?: string; icon?: any }[];
  megaMenu?: {
    category: string;
    items: { label: string; href: string }[];
  }[];
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
      megaMenu: [
        {
          category: 'Core Development',
          items: [
            { label: 'Custom Software', href: '/custom-software-development' },
            { label: 'Web Development', href: '/web-development-company' },
            { label: 'Mobile App Dev', href: '/mobile-app-development-company' },
            { label: 'SaaS Product Dev', href: '/saas-development-company' },
            { label: 'Offshore India', href: '/software-development-company-india' },
          ]
        },
        {
          category: 'AI & Big Data',
          items: [
            { label: 'AI Solutions', href: '/ai-development-company' },
            { label: 'RPA Solutions', href: '/rpa-solutions' },
            { label: 'Big Data Analytics', href: '/big-data-analytics-services' },
            { label: 'Machine Learning', href: '/machine-learning-solutions' },
            { label: 'Artificial Intelligence', href: '/artificial-intelligence-solutions' },
            { label: 'Business Intelligence', href: '/business-intelligence-solutions' },
            { label: 'TensorFlow Dev', href: '/tensorflow-development-company' },
          ]
        },
        {
          category: 'Voice Apps',
          items: [
            { label: 'Voice App Dev', href: '/voice-app-development' },
            { label: 'Google Assistant', href: '/google-assistant-development' },
            { label: 'Alexa Skills Dev', href: '/alexa-skills-development' },
          ]
        },
        {
          category: 'Cloud & Testing',
          items: [
            { label: 'Cloud Architecture', href: '/cloud-development-services' },
            { label: 'DevOps & CI/CD', href: '/devops-services' },
            { label: 'Software Testing', href: '/software-testing-services' },
            { label: 'Cyber Security', href: '/cyber-security-services' },
          ]
        }
      ]
    },
    {
      label: 'Game Dev',
      megaMenu: [
        {
          category: 'Core Game Dev',
          items: [
            { label: 'Web3 Game Dev', href: '/web3-game-development' },
            { label: 'HTML5 Game Dev', href: '/html5-game-development' },
            { label: 'Blockchain Games', href: '/blockchain-game-development' },
            { label: 'Cross-Platform Games', href: '/cross-platform-game-development' },
            { label: 'AI Game Development', href: '/ai-game-development' },
            { label: 'AR Game Development', href: '/ar-game-development' },
            { label: 'Hyper Casual Games', href: '/hyper-casual-game-development' },
            { label: 'Video Game Dev', href: '/video-game-development-company' },
          ]
        },
        {
          category: 'Engines & Metaverse',
          items: [
            { label: 'Unity Game Dev', href: '/unity-game-development' },
            { label: 'Unreal Engine Dev', href: '/unreal-game-development' },
            { label: 'AAA Game Dev', href: '/aaa-game-development-services' },
            { label: 'Metaverse Dev', href: '/metaverse-development-company' },
            { label: 'Metaverse Game Dev', href: '/metaverse-game-development' },
            { label: 'Metaverse App Dev', href: '/metaverse-app-development' },
            { label: 'Augmented Reality', href: '/augmented-reality-development' },
            { label: 'Virtual Reality', href: '/virtual-reality-development' },
            { label: 'Mixed Reality', href: '/mixed-reality-development' },
          ]
        },
        {
          category: 'Card & Board',
          items: [
            { label: 'Poker Game Dev', href: '/poker-game-development' },
            { label: 'Baccarat Game Dev', href: '/baccarat-game-development' },
            { label: 'Blackjack Game Dev', href: '/blackjack-game-development' },
            { label: 'Card Game Dev', href: '/card-game-development' },
            { label: 'Teen Patti Dev', href: '/teen-patti-game-development' },
            { label: 'Rummy Game Dev', href: '/rummy-game-development' },
            { label: 'Board Game Dev', href: '/board-game-development' },
            { label: 'Carrom Board Game', href: '/carrom-board-game-development' },
            { label: 'Ludo Game Dev', href: '/ludo-game-development' },
            { label: 'Chess Game Dev', href: '/chess-game-development' },
            { label: 'Bingo Game Dev', href: '/bingo-game-development' },
          ]
        },
        {
          category: 'Sports & Casino',
          items: [
            { label: 'Fantasy Sports Software', href: '/fantasy-sports-software' },
            { label: 'Fantasy Sports Apps', href: '/fantasy-sports-app-development' },
            { label: 'Aviator Game Dev', href: '/aviator-game-development' },
            { label: 'Slot Game Dev', href: '/slot-game-development' },
            { label: 'Roulette Game Dev', href: '/roulette-game-development' },
            { label: 'Multigaming Platforms', href: '/multigaming-platform-development' },
            { label: 'iOS Game Dev', href: '/ios-game-development' },
            { label: 'Android Game Dev', href: '/android-game-development' },
          ]
        }
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
    {
      label: 'Blockchain',
      dropdown: [
        { label: 'Blockchain Development', href: '/blockchain-development-company' },
        { label: 'Crypto Wallet Dev', href: '/crypto-wallet-development-company' },
        { label: 'Crypto Coin Dev', href: '/crypto-coin-development-company' },
        { label: 'Token Development', href: '/token-development-company' },
        { label: 'Decentralized Exchange (DEX)', href: '/decentralized-exchange-development-company' },
        { label: 'Centralized Exchange (CEX)', href: '/centralized-exchange-development-company' },
      ]
    },
    { label: 'Portfolio', href: '/portfolio' },
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-slate-200 shadow-sm py-3' : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col justify-center group mr-8 shrink-0">
            <div className="relative h-12 flex items-center justify-start">
              <img src="/logo.png" alt="Gemora Tech Logo" className="h-full w-auto object-contain" />
            </div>
            <span className="text-[9px] font-semibold text-slate-500 tracking-wider leading-none pl-1 mt-0.5 whitespace-nowrap">
              (formerly Dexterous Softech)
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 flex-1 justify-center">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className={item.megaMenu ? "" : "relative"}
                onMouseEnter={() => (item.dropdown || item.megaMenu) && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link 
                    href={item.href}
                    className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg hover:bg-slate-100 hover:text-electric flex items-center whitespace-nowrap ${pathname === item.href ? 'text-electric bg-slate-50' : 'text-slate-700'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg hover:bg-slate-100 hover:text-electric flex items-center gap-1 whitespace-nowrap ${activeDropdown === item.label ? 'text-electric bg-slate-50' : 'text-slate-700'}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {/* Standard Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute left-1/2 -translate-x-1/2 mt-1 w-72 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 grid gap-1 ${item.dropdown.length > 5 ? 'grid-cols-2 w-[520px] md:w-[600px]' : 'grid-cols-1'}`}
                      >
                        {item.dropdown.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                            >
                              {Icon && (
                                <div className="p-1.5 bg-slate-55 rounded-lg group-hover:bg-electric/10 group-hover:text-electric text-slate-500 transition-colors">
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

                {/* Mega Dropdown Menu */}
                {item.megaMenu && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[95vw] max-w-7xl bg-white border border-slate-200 rounded-3xl shadow-xl p-8 z-50 grid grid-cols-4 gap-6"
                      >
                        {item.megaMenu.map((group) => (
                          <div key={group.category} className="space-y-3">
                            <h4 className="text-[11px] font-bold text-navy uppercase tracking-wider border-b border-slate-150 pb-2">{group.category}</h4>
                            <div className="grid gap-1">
                              {group.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className="text-[13px] font-medium text-slate-600 hover:text-electric hover:translate-x-1 transition-all duration-150 py-1"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Contact / CTA Button */}
          <div className="hidden xl:flex items-center gap-3 ml-4 shrink-0">
             <Link 
              href="/contact" 
              className="bg-electric text-white text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-electric/90 transition-colors shadow-sm hover:shadow-md flex items-center gap-1.5 group whitespace-nowrap"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-3">
            <Link 
              href="/contact" 
              className="bg-electric text-white text-[12px] font-bold px-3.5 py-2 rounded-full hover:bg-electric/90 transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
            className="lg:hidden bg-white border-t border-slate-200 w-full overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 space-y-2 max-h-[85vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-slate-100 pb-2 last:border-0 last:pb-0">
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
                        <div className="pl-4 mt-1 grid grid-cols-1 gap-1 bg-slate-50 p-2 rounded-xl border border-slate-150">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block py-1.5 text-xs font-semibold text-slate-605 hover:text-electric"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {activeDropdown === item.label && item.megaMenu && (
                        <div className="pl-2 mt-1 space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
                          {item.megaMenu.map((group) => (
                            <div key={group.category} className="space-y-1">
                              <h5 className="text-[11px] font-bold text-navy uppercase tracking-wider pl-2">{group.category}</h5>
                              <div className="pl-2 grid grid-cols-1 gap-1 border-l border-slate-200">
                                {group.items.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="block py-1 text-xs font-semibold text-slate-600 hover:text-electric"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/ai-cost-estimator"
                  className="block w-full text-center bg-electric text-white py-2.5 rounded-xl font-bold text-sm hover:bg-electric/90"
                >
                  AI Project Estimator
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
