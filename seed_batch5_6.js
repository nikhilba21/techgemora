const fs = require('fs');
const path = require('path');
const https = require('https');

const dbPath = path.join(__dirname, 'src', 'data', 'db.json');
const imgDir = path.join(__dirname, 'public', 'images', 'blogs');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

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

const batch = [
  // Cost Analysis & Buyer's Guides
  {
    title: "Hidden Costs of Software Development Startups Ignore",
    metaTitle: "Hidden Costs of Software Development | Gemora Tech",
    metaDescription: "Don't run out of runway. Discover the hidden costs of software development, including server maintenance, third-party APIs, and technical debt.",
    keyword: "money,business,laptop",
    imageName: "hidden_costs_software.jpg",
    category: "Cost Analysis",
    author: "Nikhil B",
    content: "<h2>The True Cost of Software</h2><p>Many founders budget strictly for the MVP build, ignoring post-launch expenses. When working with a <a href='/custom-software-development'>software development company</a>, always account for Cloud hosting (AWS/Azure), third-party API licensing (Stripe, Twilio), and ongoing security patches.</p><h2>Technical Debt</h2><p>Rushing a launch leads to technical debt. Rewriting spaghetti code later is often more expensive than building it correctly the first time.</p>",
    faqs: [{ question: "How much should I budget for maintenance?", answer: "Budget approximately 20% of the initial development cost annually for server maintenance and bug fixes." }]
  },
  {
    title: "Fixed Price vs Time and Materials: Which Contract is Better?",
    metaTitle: "Fixed Price vs Time and Materials Contract | Gemora Tech",
    metaDescription: "Understand the differences between Fixed Price and Time & Materials (T&M) contracts before hiring an offshore software development agency.",
    keyword: "contract,pen,signature",
    imageName: "fixed_price_vs_tm.jpg",
    category: "Business Strategy",
    author: "Gemora Tech Team",
    content: "<h2>Choosing the Right Contract</h2><p>When outsourcing to a <a href='/software-development-company-india'>development agency</a>, the contract model is critical.</p><h2>Fixed Price</h2><p>Best for small projects with hyper-specific requirements. However, any scope change requires a renegotiation (Change Request).</p><h2>Time & Materials (T&M)</h2><p>Best for Agile projects (like <a href='/saas-development-company'>SaaS platforms</a>). You pay for hours worked, allowing you to pivot features constantly based on market feedback.</p>",
    faqs: [{ question: "Which is cheaper?", answer: "Fixed price seems cheaper upfront, but vendors often add a 30% risk buffer. T&M is generally more cost-effective for long-term projects." }]
  },
  {
    title: "Minimum Viable Product (MVP) Development Cost Guide",
    metaTitle: "MVP Software Development Cost Guide 2026 | Gemora",
    metaDescription: "How much does an MVP cost to build? Read our comprehensive breakdown for SaaS, mobile apps, and enterprise software MVPs.",
    keyword: "startup,planning,whiteboard",
    imageName: "mvp_cost_guide.jpg",
    category: "Cost Analysis",
    author: "Nikhil B",
    content: "<h2>Why Build an MVP?</h2><p>An MVP (Minimum Viable Product) proves your concept without burning millions. For <a href='/mobile-app-development-company'>Mobile App Development</a>, focus only on the core loop that solves the user's primary problem.</p><h2>Cost Breakdown</h2><p>A typical SaaS MVP built offshore costs between $15,000 and $30,000. Try using our <a href='/ai-cost-estimator'>AI Cost Estimator</a> to get a tailored quote for your specific feature set.</p>",
    faqs: [{ question: "How long does an MVP take?", answer: "A well-scoped MVP should take no longer than 3 to 4 months to launch." }]
  },
  {
    title: "Top Red Flags When Hiring a Software Development Agency",
    metaTitle: "Red Flags When Hiring Software Developers | Gemora Tech",
    metaDescription: "Protect your investment. Learn the top 5 red flags to watch out for when hiring an offshore or onshore software development company.",
    keyword: "warning,meeting,business",
    imageName: "hiring_red_flags.jpg",
    category: "Business Strategy",
    author: "Gemora Tech Team",
    content: "<h2>Protecting Your Investment</h2><p>Not all <a href='/software-development-company-usa'>software development agencies</a> are created equal. Watch out for these red flags:</p><ul><li><strong>No Direct Developer Access:</strong> If the agency only lets you speak to a project manager, run. You need to interview the actual coders.</li><li><strong>Refusal to Use Git:</strong> You must own the source code from Day 1. If they refuse to push to your GitHub repo, it's a trap.</li><li><strong>Unrealistic Estimates:</strong> Promising a complex <a href='/fintech-software-development'>Fintech App</a> in 4 weeks is a lie.</li></ul>",
    faqs: [{ question: "Should I sign an NDA?", answer: "Yes, a reputable agency will gladly sign a Mutual Non-Disclosure Agreement before hearing your idea." }]
  },
  {
    title: "Why Cheap Offshore Developers Cost You More in the End",
    metaTitle: "The Real Cost of Cheap Offshore Developers | Gemora",
    metaDescription: "Hiring developers for $10/hour? Read why ultra-cheap offshore software development often results in massive technical debt and project failure.",
    keyword: "money,broken,code",
    imageName: "cheap_offshore_code.jpg",
    category: "Cost Analysis",
    author: "Nikhil B",
    content: "<h2>The Illusion of Savings</h2><p>Many founders are tempted by agencies offering developers for $10/hr. However, in <a href='/custom-software-development'>Custom Software Development</a>, you get what you pay for.</p><h2>The True Cost</h2><p>Cheap developers often lack architectural experience. They build unscalable spaghetti code. When your app crashes under load, you will have to hire a premium agency (like Gemora Tech) to rewrite the entire platform from scratch, effectively doubling your total cost.</p>",
    faqs: [{ question: "What is a reasonable offshore rate?", answer: "For highly skilled Senior Developers in India, expect to pay between $25 and $50 per hour." }]
  },
  // Geo-Targeted & Hiring 
  {
    title: "Hire Remote Next.js Developers in India: A Complete Guide",
    metaTitle: "Hire Dedicated Next.js Developers in India | Gemora",
    metaDescription: "Looking to hire remote Next.js developers? Learn how to evaluate React talent, set up an offshore team, and manage Agile sprints.",
    keyword: "react,developer,india",
    imageName: "hire_nextjs_india.jpg",
    category: "Hiring Guide",
    author: "Gemora Tech Team",
    content: "<h2>The Power of Next.js</h2><p>Next.js is the gold standard for React applications, offering Server-Side Rendering (SSR) for perfect SEO. If you need to <a href='/hire-react-developers'>hire React developers</a>, India is the premier destination.</p><h2>How to Evaluate Developers</h2><p>When interviewing, ask about their experience with Server Components (Next 14), caching strategies, and Vercel edge deployments. A true senior dev understands architecture, not just UI components.</p>",
    faqs: [{ question: "Can I hire developers full-time?", answer: "Yes, the Staff Augmentation model allows you to hire dedicated developers who work 160 hours/month exclusively on your project." }]
  },
  {
    title: "How to Build an Offshore Dedicated Development Center (ODC)",
    metaTitle: "Set Up an ODC (Offshore Development Center) | Gemora",
    metaDescription: "Learn how enterprise companies are setting up Offshore Dedicated Development Centers (ODCs) in India to cut costs while maintaining quality.",
    keyword: "office,india,team",
    imageName: "odc_setup_india.jpg",
    category: "Business Strategy",
    author: "Nikhil B",
    content: "<h2>What is an ODC?</h2><p>An Offshore Dedicated Development Center (ODC) is an extension of your local tech team, based in another country (usually India). It is heavily utilized by <a href='/software-development-company-usa'>USA Tech Companies</a>.</p><h2>Benefits of an ODC</h2><p>Unlike project outsourcing, an ODC gives you total control over the hiring process, culture, and technical stack, while the vendor handles HR, payroll, and office infrastructure.</p>",
    faqs: [{ question: "How large should an ODC be?", answer: "ODCs typically start with a minimum of 5 resources (e.g., 3 Devs, 1 QA, 1 Tech Lead) and can scale to hundreds." }]
  },
  {
    title: "Staff Augmentation vs Project Outsourcing",
    metaTitle: "Staff Augmentation vs IT Project Outsourcing | Gemora",
    metaDescription: "Which outsourcing model is right for you? Compare IT Staff Augmentation with traditional Project Outsourcing to make an informed decision.",
    keyword: "team,meeting,office",
    imageName: "staff_aug_vs_outsource.jpg",
    category: "Business Strategy",
    author: "Gemora Tech Team",
    content: "<h2>Two Paths to Scale</h2><p>When you lack in-house talent, you have two options. <a href='/hire-developers'>Staff Augmentation</a> involves renting developers to join your existing team. <strong>Project Outsourcing</strong> involves handing the entire project (PM, QA, Devs) to an external agency.</p><h2>When to choose which?</h2><p>If you have an in-house CTO and just need more hands on keyboards, choose Staff Augmentation. If you have no technical leadership and need an end-to-end product built, choose Project Outsourcing.</p>",
    faqs: [{ question: "Who manages the developers in Staff Augmentation?", answer: "You do. The augmented staff report directly to your internal tech leads and PMs." }]
  },
  {
    title: "Evaluating the Technical Skills of a Full Stack Developer",
    metaTitle: "How to Hire a Full Stack Developer | Gemora Tech",
    metaDescription: "Hiring a full-stack developer? Learn the critical interview questions for React, Node.js, and Cloud architecture to ensure you hire the best.",
    keyword: "code,interview,laptop",
    imageName: "hire_fullstack_dev.jpg",
    category: "Hiring Guide",
    author: "Nikhil B",
    content: "<h2>The Myth of the Full Stack Dev</h2><p>True Full Stack developers are rare. Most lean heavily toward frontend or backend. When you <a href='/hire-developers'>hire dedicated developers</a>, you must test both sides.</p><h2>Critical Interview Areas</h2><ul><li><strong>Frontend:</strong> React state management (Redux/Zustand), Web Vitals optimization.</li><li><strong>Backend:</strong> Node.js event loop architecture, PostgreSQL query optimization.</li><li><strong>DevOps:</strong> Basic understanding of Docker and CI/CD pipelines.</li></ul>",
    faqs: [{ question: "Is a coding test necessary?", answer: "Yes. A paid, 2-hour take-home assignment is the best way to evaluate real-world architectural thinking." }]
  },
  {
    title: "Gemora Tech Review: Why We Rebranded to Serve You Better",
    metaTitle: "Gemora Tech Review & Rebranding (Formerly Dexterous) | Gemora",
    metaDescription: "Dexterous Softech is now Gemora Tech. Learn about our transition, our new enterprise focus, and how our custom software services have evolved.",
    keyword: "brand,neon,tech",
    imageName: "gemora_tech_rebrand.jpg",
    category: "Company News",
    author: "Gemora Tech Team",
    content: "<h2>A New Era of Software</h2><p>We are proud to announce that Dexterous Softech has officially rebranded to <strong>Gemora Tech</strong>. This rebranding reflects our shift from a standard IT agency to an elite <a href='/custom-software-development'>Enterprise Solutions provider</a>.</p><h2>What Changes for Clients?</h2><p>Nothing changes regarding our commitment to excellence. However, we have expanded our capabilities massively into <a href='/ai-model-development-company'>AI Model Development</a>, Web3, and hyper-scalable SaaS architectures. Welcome to the future of technology.</p>",
    faqs: [{ question: "Do previous contracts remain valid?", answer: "Absolutely. All existing contracts, NDAs, and SLAs remain fully enforceable under our new corporate entity." }]
  }
];

async function seed() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  for (let blog of batch) {
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
  console.log('Batches 5 and 6 seeded successfully with real images.');
}

seed();
