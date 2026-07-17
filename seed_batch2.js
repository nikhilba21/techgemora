const fs = require('fs');
const path = require('path');
const https = require('https');

const dbPath = path.join(__dirname, 'src', 'data', 'db.json');
const imgDir = path.join(__dirname, 'public', 'images', 'blogs');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Download image helper
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        let location = res.headers.location;
        if (location.startsWith('/')) {
            location = new URL(location, 'https://loremflickr.com').toString();
        }
        return downloadImage(location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filepath, () => reject(err));
    });
  });
};

const generateId = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const date = new Date().toISOString();

const batch2 = [
  {
    title: "How to Build a Food Delivery App Like UberEats in 2026",
    metaTitle: "Food Delivery App Development (UberEats Clone) | Gemora",
    metaDescription: "Learn how to build a scalable food delivery app. We cover the cost, tech stack, and microservices architecture needed to compete with UberEats.",
    keyword: "food,delivery,smartphone",
    imageName: "ubereats_clone_real.jpg",
    category: "Mobile App Development",
    author: "Nikhil B",
    content: `
      <h2>The Anatomy of a Modern Food Delivery App</h2>
      <p>Building a <a href="/mobile-app-development-company">food delivery app</a> like UberEats or Zomato is not just about a pretty UI. It requires a robust, real-time logistics engine. You actually need to build three separate apps: one for the user, one for the restaurant, and one for the delivery driver.</p>
      
      <h2>Tech Stack for Real-Time Tracking</h2>
      <p>Live GPS tracking is the heartbeat of food delivery. We recommend:</p>
      <ul>
        <li><strong>Frontend:</strong> React Native or <a href="/flutter-development-company">Flutter</a> for cross-platform efficiency.</li>
        <li><strong>Backend:</strong> Node.js with Socket.io for driver location bridging.</li>
        <li><strong>Mapping:</strong> Google Maps Platform (Directions API, Distance Matrix API).</li>
      </ul>
      
      <h2>Estimated Costs</h2>
      <p>A full-fledged food delivery ecosystem starts around $25,000 for a Minimum Viable Product (MVP). Complex enterprise systems with AI-driven route optimization can exceed $60,000.</p>
    `,
    faqs: [
      { question: "How does the app handle thousands of concurrent orders?", answer: "We use a microservices architecture managed by Kubernetes and AWS serverless functions to ensure zero downtime." }
    ]
  },
  {
    title: "UrbanClap Clone: Developing an On-Demand Home Services App",
    metaTitle: "On-Demand Home Services App Development | Gemora Tech",
    metaDescription: "Discover how to build an on-demand home services platform like UrbanClap or TaskRabbit. Learn about provider onboarding, booking flows, and monetization.",
    keyword: "cleaning,plumber,services",
    imageName: "urbanclap_clone_real.jpg",
    category: "SaaS & Platforms",
    author: "Gemora Tech Team",
    content: `
      <h2>The Gig Economy is Booming</h2>
      <p>The success of platforms like Urban Company (formerly UrbanClap) proves that on-demand home services are highly lucrative. Building an <a href="/custom-software-development">enterprise-grade platform</a> requires handling massive amounts of localized data.</p>
      
      <h2>Core Modules of a Home Services App</h2>
      <ul>
        <li><strong>Provider Verification:</strong> Automated background checks and document OCR validation.</li>
        <li><strong>Dynamic Pricing Engine:</strong> Algorithm-based pricing depending on peak hours and service demand.</li>
        <li><strong>Escrow Payments:</strong> Integrating <a href="/fintech-software-development">Fintech solutions</a> like Stripe Connect to hold funds until the job is marked complete.</li>
      </ul>
    `,
    faqs: [
      { question: "Can I start with a single city?", answer: "Yes, launching as an MVP in a single city allows you to refine the logistics before scaling nationally." }
    ]
  },
  {
    title: "The True Cost of Developing a Telehealth App (HIPAA Compliant)",
    metaTitle: "Cost of Telehealth App Development (HIPAA) | Gemora",
    metaDescription: "Planning to build a telehealth or telemedicine app? Read our comprehensive breakdown of development costs and HIPAA compliance requirements.",
    keyword: "doctor,telehealth,hospital",
    imageName: "telehealth_app_real.jpg",
    category: "Healthcare",
    author: "Nikhil B",
    content: `
      <h2>Digital Healthcare is the New Standard</h2>
      <p>Since 2020, <a href="/healthcare-software-development">healthcare software development</a> has shifted entirely towards remote patient monitoring and telemedicine.</p>
      
      <h2>Understanding HIPAA Compliance</h2>
      <p>If you are serving patients in the USA, your app must be HIPAA compliant. This means:</p>
      <ul>
        <li>End-to-End Encryption (E2EE) for all video calls (using WebRTC).</li>
        <li>Data at rest must be encrypted (AES-256) on AWS or Azure HIPAA-eligible servers.</li>
        <li>Strict access controls and audit logging for medical records.</li>
      </ul>
      
      <h2>Development Cost Breakdown</h2>
      <p>Due to the severe security requirements, a HIPAA-compliant telehealth app costs between $40,000 and $90,000 depending on integrations with existing EMR/EHR systems like Epic or Cerner.</p>
    `,
    faqs: [
      { question: "Do you sign Business Associate Agreements (BAAs)?", answer: "Yes, as your technology partner, Gemora Tech signs comprehensive BAAs to ensure compliance." }
    ]
  },
  {
    title: "How to Build an Astrology App Like AstroTalk",
    metaTitle: "Astrology App Development (AstroTalk Clone) | Gemora Tech",
    metaDescription: "Learn how to build a highly profitable astrology consultation app. Explore live streaming, wallet integrations, and chat functionalities.",
    keyword: "astrology,stars,mobile",
    imageName: "astrotalk_clone_real.jpg",
    category: "Mobile App Development",
    author: "Gemora Tech Team",
    content: `
      <h2>The Billion-Dollar Astrology Market</h2>
      <p>Spiritual tech is a rapidly growing sector. Apps like AstroTalk generate millions by connecting users with astrologers via live chat and calls. We specialize in building these <a href="/mobile-app-development-company">high-concurrency apps</a>.</p>
      
      <h2>Essential Features for Spiritual Tech</h2>
      <ul>
        <li><strong>In-App Wallet:</strong> Users deposit money upfront to spend per-minute on consultations.</li>
        <li><strong>Live Streaming:</strong> Integrating Agora or Zoom SDKs for live tarot reading sessions.</li>
        <li><strong>Queuing System:</strong> Managing user waitlists when popular astrologers are busy.</li>
      </ul>
    `,
    faqs: [
      { question: "How is the per-minute billing calculated?", answer: "We use a server-side cron job tied to WebSockets that deducts wallet balance every 60 seconds during a live call." }
    ]
  },
  {
    title: "Fintech App Development: Building a Secure Crypto Wallet",
    metaTitle: "Crypto Wallet App Development Services | Gemora Tech",
    metaDescription: "A technical guide to building secure, non-custodial and custodial crypto wallets. Learn about private key encryption and blockchain nodes.",
    keyword: "bitcoin,wallet,finance",
    imageName: "crypto_wallet_real.jpg",
    category: "FinTech",
    author: "Nikhil B",
    content: `
      <h2>The Foundation of Web3 Finance</h2>
      <p>Whether you are building a centralized exchange or a decentralized DeFi protocol, <a href="/fintech-software-development">Fintech software development</a> requires absolute security. A crypto wallet is the entry point for users.</p>
      
      <h2>Custodial vs Non-Custodial Wallets</h2>
      <p><strong>Custodial:</strong> You hold the user's private keys (like Binance). Easier for user recovery, but massive liability for you.</p>
      <p><strong>Non-Custodial:</strong> The user owns their keys (like MetaMask). Safer for you legally, but if the user loses their seed phrase, the funds are gone forever.</p>
      
      <h2>Security Protocols</h2>
      <p>We implement Multi-Party Computation (MPC) and hardware security modules (HSM) to ensure cold storage limits are strictly enforced.</p>
    `,
    faqs: [
      { question: "Can you integrate multiple blockchains?", answer: "Yes, we integrate RPC nodes for Ethereum, BSC, Solana, and Bitcoin into a unified interface." }
    ]
  },
  {
    title: "Dating App Development: Features Needed to Beat Tinder",
    metaTitle: "Dating App Development Company | Gemora Tech",
    metaDescription: "Want to build the next Tinder or Bumble? Learn about the matching algorithms, server scaling, and anti-catfishing security needed.",
    keyword: "dating,couple,smartphone",
    imageName: "dating_app_real.jpg",
    category: "Mobile App Development",
    author: "Gemora Tech Team",
    content: `
      <h2>Beyond the Swipe</h2>
      <p>The dating app market is saturated, so building a simple swipe app won't work anymore. Modern <a href="/mobile-app-development-company">mobile app development</a> for dating requires niche targeting and heavy AI integration.</p>
      
      <h2>Advanced Features to Include</h2>
      <ul>
        <li><strong>AI Photo Verification:</strong> Users take a live selfie that AI matches to their profile pictures to eliminate catfishing.</li>
        <li><strong>Machine Learning Matching:</strong> Algorithms that learn from a user's swiping behavior to suggest better matches.</li>
        <li><strong>Video Speed Dating:</strong> Integrated WebRTC for 3-minute blind video dates.</li>
      </ul>
    `,
    faqs: [
      { question: "How do you handle inappropriate content?", answer: "We integrate AI moderation tools like AWS Rekognition to automatically flag and ban explicit images." }
    ]
  },
  {
    title: "React Native vs Flutter: Which is Best for Startups?",
    metaTitle: "React Native vs Flutter Comparison (2026) | Gemora Tech",
    metaDescription: "Confused between React Native and Flutter for your startup app? Read our technical comparison on performance, UI capabilities, and developer cost.",
    keyword: "coding,programmer,laptop",
    imageName: "flutter_vs_reactnative_real.jpg",
    category: "Technology",
    author: "Nikhil B",
    content: `
      <h2>The Cross-Platform Dilemma</h2>
      <p>Startups need to move fast. Writing native code (Swift for iOS, Kotlin for Android) takes twice as long. This is why <a href="/react-development-company">React Native</a> and <a href="/flutter-development-company">Flutter</a> dominate the market.</p>
      
      <h2>Why Choose React Native?</h2>
      <p>Backed by Facebook, React Native uses JavaScript. If you already have a web app built in React.js, your developers can easily transition to building the mobile app, sharing a significant amount of business logic.</p>
      
      <h2>Why Choose Flutter?</h2>
      <p>Backed by Google, Flutter uses Dart. It compiles directly to native ARM code, making it slightly faster, and it draws its own UI components, ensuring 100% pixel-perfect consistency across all devices.</p>
    `,
    faqs: [
      { question: "Which is cheaper to develop?", answer: "Both offer similar development times, meaning the cost is roughly the same. However, React Native developers are slightly easier to find." }
    ]
  },
  {
    title: "How to Create an E-Commerce Mobile App from Scratch",
    metaTitle: "E-Commerce App Development Guide | Gemora Tech",
    metaDescription: "Learn how to build a scalable, high-conversion e-commerce mobile app. We cover UI/UX design, payment gateways, and inventory synchronization.",
    keyword: "ecommerce,shopping,mobile",
    imageName: "ecommerce_app_real.jpg",
    category: "E-Commerce",
    author: "Gemora Tech Team",
    content: `
      <h2>The Shift to Mobile Commerce</h2>
      <p>In 2026, over 75% of online shopping happens on mobile devices. If your brand doesn't have a dedicated <a href="/ecommerce-development">e-commerce mobile app</a>, you are losing massive revenue.</p>
      
      <h2>Critical App Features</h2>
      <ul>
        <li><strong>1-Click Checkout:</strong> Integrating Apple Pay and Google Pay to reduce cart abandonment.</li>
        <li><strong>Push Notifications:</strong> Recovering abandoned carts via targeted alerts.</li>
        <li><strong>Inventory Sync:</strong> Connecting the app in real-time to your Shopify, Magento, or custom backend.</li>
      </ul>
      
      <h2>Performance Matters</h2>
      <p>Amazon found that every 100ms of latency costs them 1% in sales. Your app must load instantly. We achieve this using optimized CDNs and lightweight state management.</p>
    `,
    faqs: [
      { question: "Should I build a PWA instead of a native app?", answer: "PWAs are great for web traffic, but native apps provide significantly better retention and access to hardware features like cameras and push notifications." }
    ]
  },
  {
    title: "Building a Taxi Booking App: Architecture and APIs",
    metaTitle: "Taxi Booking App Development (Uber Clone) | Gemora Tech",
    metaDescription: "Want to launch a ride-hailing service? Explore the system architecture, third-party APIs, and algorithms needed to build an Uber clone.",
    keyword: "taxi,uber,city",
    imageName: "taxi_app_real.jpg",
    category: "Logistics",
    author: "Nikhil B",
    content: `
      <h2>The Ride-Hailing Infrastructure</h2>
      <p>Building a <a href="/logistics-software-development">logistics software</a> platform for ride-hailing requires intense geographic computation. You are constantly matching moving objects (drivers) with stationary ones (riders) in real-time.</p>
      
      <h2>The Geospatial Backend</h2>
      <p>We use PostgreSQL with the PostGIS extension. This allows the database to perform complex geographic queries, such as "Find all available drivers within a 3km radius of this coordinate," in milliseconds.</p>
      
      <h2>Surge Pricing Algorithms</h2>
      <p>Integrating Machine Learning, the system constantly monitors the ratio of open apps (demand) to available drivers (supply) in specific hexagonal zones, adjusting prices dynamically to incentivize drivers.</p>
    `,
    faqs: [
      { question: "What map provider is best?", answer: "Google Maps is the gold standard for routing, but Mapbox is a highly cost-effective alternative for rendering custom map styles." }
    ]
  },
  {
    title: "Maid Booking App Development: A Complete Blueprint",
    metaTitle: "Maid & Cleaning Service App Development | Gemora Tech",
    metaDescription: "Learn how to build a booking platform for cleaning services. We cover scheduling algorithms, worker tracking, and subscription models.",
    keyword: "cleaning,maid,home",
    imageName: "maid_app_real.jpg",
    category: "SaaS & Platforms",
    author: "Gemora Tech Team",
    content: `
      <h2>Digitizing the Cleaning Industry</h2>
      <p>Home cleaning services are moving entirely online. Building a custom <a href="/custom-software-development">booking platform</a> allows cleaning agencies to automate dispatching and client retention.</p>
      
      <h2>Scheduling and Dispatch Algorithms</h2>
      <p>The core of a maid booking app is the calendar engine. It must account for travel time between jobs, worker availability, and specific skill sets (e.g., deep cleaning vs standard).</p>
      
      <h2>Subscription Monetization</h2>
      <p>The most successful apps offer weekly or bi-weekly cleaning subscriptions. By integrating Stripe Billing, the app can auto-charge credit cards and automatically slot the worker into the schedule for the next year.</p>
    `,
    faqs: [
      { question: "Can customers choose their preferred maid?", answer: "Yes, the system can prioritize assigning the same worker to a recurring customer to build trust." }
    ]
  }
];

async function seed() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  for (let blog of batch2) {
    const url = 'https://loremflickr.com/800/600/' + blog.keyword;
    const filepath = path.join(imgDir, blog.imageName);
    
    console.log('Downloading ' + url + ' to ' + blog.imageName + '...');
    try {
      await downloadImage(url, filepath);
    } catch (e) {
      console.error('Failed to download image', e);
    }
    
    const newBlog = {
      slug: generateId(blog.title),
      title: blog.title,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      featuredImage: '/images/blogs/' + blog.imageName,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      faqs: JSON.stringify(blog.faqs),
      published: true,
      createdAt: date
    };
    
    const idx = db.blogs.findIndex(b => b.slug === newBlog.slug);
    if (idx >= 0) {
      db.blogs[idx] = newBlog;
    } else {
      db.blogs.push(newBlog);
    }
  }
  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Batch 2 seeded successfully with real images.');
}

seed();
