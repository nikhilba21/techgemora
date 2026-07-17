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

const batch4 = [
  {
    title: "Top 5 Reasons to Outsource Software Development to India",
    metaTitle: "Outsource Software Development to India | Gemora Tech",
    metaDescription: "Discover why Fortune 500 companies outsource software development to India. Learn about cost savings, massive talent pools, and time zone advantages.",
    keyword: "india,office,laptop",
    imageName: "outsource_india_real.jpg",
    category: "Business Strategy",
    author: "Nikhil B",
    content: `
      <h2>The Global Hub for Tech Talent</h2>
      <p>India remains the undisputed leader in IT outsourcing. When you partner with a <a href="/software-development-company-india">top software development company in India</a>, you aren't just saving money—you are gaining access to the largest pool of STEM graduates in the world.</p>
      
      <h2>Top 5 Reasons</h2>
      <ol>
        <li><strong>Cost Efficiency:</strong> Reduce development costs by up to 70% without sacrificing quality.</li>
        <li><strong>Scalability:</strong> Easily scale your dedicated team from 2 to 20 developers in weeks.</li>
        <li><strong>Time Zone Advantage:</strong> While your in-house team sleeps, the offshore team builds, enabling 24/7 continuous development.</li>
        <li><strong>English Proficiency:</strong> India has the second-largest English-speaking population globally, ensuring seamless communication.</li>
        <li><strong>Government Support:</strong> Robust IT infrastructure and pro-business government policies.</li>
      </ol>
    `,
    faqs: [
      { question: "How do I ensure quality when outsourcing?", answer: "Always insist on daily Scrum meetings, access to the Git repository, and an Agile methodology." }
    ]
  },
  {
    title: "How to Build a Custom CRM for Your Business",
    metaTitle: "Custom CRM Software Development | Gemora Tech",
    metaDescription: "Tired of paying massive Salesforce licensing fees? Learn how building a custom CRM tailored to your unique workflows can save you money.",
    keyword: "business,meeting,crm",
    imageName: "custom_crm_real.jpg",
    category: "Enterprise Software",
    author: "Gemora Tech Team",
    content: `
      <h2>The Problem with Off-the-Shelf CRMs</h2>
      <p>While Salesforce and HubSpot are great, they are built for the masses. Your business workflows are unique. <a href="/custom-software-development">Custom CRM Development</a> ensures the software molds to your process, not the other way around.</p>
      
      <h2>Key Modules to Include</h2>
      <ul>
        <li><strong>Lead Scoring:</strong> Custom algorithms to rank prospects based on your specific KPIs.</li>
        <li><strong>Automated Follow-ups:</strong> Integration with SendGrid or Twilio to automate email and SMS drips.</li>
        <li><strong>Custom Dashboards:</strong> Real-time BI (Business Intelligence) tailored to your C-suite's needs.</li>
      </ul>
    `,
    faqs: [
      { question: "Is a custom CRM cheaper than Salesforce?", answer: "While the upfront development cost is higher, you save tens of thousands of dollars annually on per-user licensing fees, making it much cheaper long-term." }
    ]
  },
  {
    title: "ERP Software Development: Streamlining Operations",
    metaTitle: "ERP Software Development Services | Gemora Tech",
    metaDescription: "Learn how a custom ERP system centralizes your HR, finance, supply chain, and inventory into one single source of truth.",
    keyword: "logistics,warehouse,tablet",
    imageName: "erp_development_real.jpg",
    category: "Enterprise Software",
    author: "Nikhil B",
    content: `
      <h2>The Backbone of Enterprise</h2>
      <p>An Enterprise Resource Planning (ERP) system is the central nervous system of a corporation. Investing in <a href="/custom-software-development">ERP Software Development</a> eliminates data silos across departments.</p>
      
      <h2>Core ERP Modules</h2>
      <ul>
        <li><strong>Finance & Accounting:</strong> Automated ledger entries, tax compliance, and payroll.</li>
        <li><strong>Supply Chain Management (SCM):</strong> Real-time tracking of raw materials from vendor to warehouse.</li>
        <li><strong>Human Resources (HRMS):</strong> Centralized tracking of employee performance, PTO, and benefits.</li>
      </ul>
      <p>By using modern cloud architectures (AWS/Azure), custom ERPs can handle immense data loads securely.</p>
    `,
    faqs: [
      { question: "How long does it take to build an ERP?", answer: "A custom ERP MVP takes about 6 months, but enterprise-wide rollout and integration can take 12-18 months." }
    ]
  },
  {
    title: "Supply Chain and Logistics Software: Real-Time Tracking",
    metaTitle: "Logistics Software Development | Gemora Tech",
    metaDescription: "Explore how IoT, GPS, and custom logistics software provide real-time visibility into global supply chains, preventing delays and reducing costs.",
    keyword: "shipping,cargo,truck",
    imageName: "logistics_software_real.jpg",
    category: "Logistics",
    author: "Gemora Tech Team",
    content: `
      <h2>The Demand for Supply Chain Visibility</h2>
      <p>In the post-pandemic world, supply chains are fragile. <a href="/logistics-software-development">Logistics Software</a> provides the real-time visibility required to mitigate risks before they cause delivery delays.</p>
      
      <h2>Integrating IoT and GPS</h2>
      <p>Modern fleet management software integrates directly with IoT (Internet of Things) sensors on trucks and shipping containers. This allows dispatchers to monitor:</p>
      <ul>
        <li>Real-time GPS location via satellite.</li>
        <li>Container temperature (crucial for pharmaceutical and food transport).</li>
        <li>Driver fatigue and vehicle diagnostics (OBD-II).</li>
      </ul>
    `,
    faqs: [
      { question: "Can the software optimize delivery routes?", answer: "Yes, by integrating Machine Learning and Google Distance Matrix API, the software can recalculate the most efficient multi-stop routes dynamically." }
    ]
  },
  {
    title: "HIPAA Compliant Software Development: A Checklist",
    metaTitle: "HIPAA Compliant Software Development | Gemora Tech",
    metaDescription: "Building a healthcare app? Follow our technical checklist for HIPAA compliant software development to avoid massive legal fines.",
    keyword: "medical,record,doctor",
    imageName: "hipaa_checklist_real.jpg",
    category: "Healthcare",
    author: "Nikhil B",
    content: `
      <h2>The Risks of Non-Compliance</h2>
      <p>Failing to secure Protected Health Information (PHI) can result in fines up to $1.5 million per year. <a href="/healthcare-software-development">Healthcare Software Development</a> requires a security-first approach.</p>
      
      <h2>The Technical HIPAA Checklist</h2>
      <ol>
        <li><strong>Transport Encryption:</strong> All data in transit must use TLS 1.2 or higher.</li>
        <li><strong>At-Rest Encryption:</strong> All database storage and backups must use AES-256 encryption.</li>
        <li><strong>Access Control:</strong> Implement robust Role-Based Access Control (RBAC) and mandatory 2FA.</li>
        <li><strong>Audit Trails:</strong> Every database read, write, or delete must be logged with a timestamp and user ID.</li>
        <li><strong>Automatic Logoff:</strong> Sessions must expire after a period of inactivity.</li>
      </ol>
    `,
    faqs: [
      { question: "Does hosting on AWS automatically make me HIPAA compliant?", answer: "No. While AWS offers HIPAA-eligible services, you must configure them correctly and sign a Business Associate Agreement (BAA) with Amazon." }
    ]
  },
  {
    title: "How to Migrate Your Legacy System to the Cloud (AWS/Azure)",
    metaTitle: "Cloud Migration Services & Strategy | Gemora Tech",
    metaDescription: "Learn the strategies for migrating your legacy on-premise servers to AWS or Azure. We cover Re-hosting, Re-platforming, and Re-factoring.",
    keyword: "cloud,server,datacenter",
    imageName: "cloud_migration_real.jpg",
    category: "Enterprise Software",
    author: "Gemora Tech Team",
    content: `
      <h2>The End of On-Premise Servers</h2>
      <p>Maintaining physical servers is costly and poses massive security risks. <a href="/custom-software-development">Cloud Migration</a> to AWS, Azure, or GCP provides infinite scalability and disaster recovery.</p>
      
      <h2>The 3 R's of Cloud Migration</h2>
      <ul>
        <li><strong>Re-hosting (Lift and Shift):</strong> Simply moving your existing virtual machines to the cloud (e.g., AWS EC2) without changing code. Fastest, but least optimized.</li>
        <li><strong>Re-platforming:</strong> Making minor adjustments to take advantage of cloud features, like swapping a self-hosted MySQL database for Amazon RDS.</li>
        <li><strong>Re-factoring:</strong> Completely rewriting the application into microservices using Docker and Kubernetes to fully leverage cloud-native architecture.</li>
      </ul>
    `,
    faqs: [
      { question: "Will my app experience downtime during migration?", answer: "With a blue/green deployment strategy and database replication, we can achieve near-zero downtime migrations." }
    ]
  },
  {
    title: "Microservices vs Monolithic Architecture: When to Switch?",
    metaTitle: "Microservices vs Monolithic Architecture | Gemora Tech",
    metaDescription: "Is your app struggling to scale? Learn the pros and cons of Microservices and Monolithic architectures, and when you should make the switch.",
    keyword: "code,blocks,architecture",
    imageName: "microservices_architecture_real.jpg",
    category: "Technology",
    author: "Nikhil B",
    content: `
      <h2>Understanding the Architectures</h2>
      <p>In a <strong>Monolith</strong>, the UI, business logic, and data access layers are bundled into a single deployable unit. In <strong>Microservices</strong>, the application is broken down into small, independent services communicating via APIs.</p>
      
      <h2>When to Stick with a Monolith</h2>
      <p>If you are a startup building an MVP, start with a monolith! It is infinitely easier to debug, deploy, and manage. Don't over-engineer early on.</p>
      
      <h2>When to Switch to Microservices</h2>
      <p>You should switch to microservices (<a href="/nodejs-development-company">Node.js</a>/GoLang) when:</p>
      <ul>
        <li>Your engineering team has grown so large that developers are constantly stepping on each other's toes in the Git repo.</li>
        <li>Specific features need to scale independently (e.g., the video encoding service needs heavy GPU scaling, while the chat service needs high memory).</li>
      </ul>
    `,
    faqs: [
      { question: "What tools are needed for Microservices?", answer: "You will need containerization (Docker), orchestration (Kubernetes), and an API Gateway." }
    ]
  },
  {
    title: "DevOps Best Practices for CI/CD Pipelines in 2026",
    metaTitle: "DevOps & CI/CD Pipeline Best Practices | Gemora Tech",
    metaDescription: "Accelerate your software delivery. Learn the best practices for setting up Continuous Integration and Continuous Deployment (CI/CD) pipelines.",
    keyword: "devops,pipeline,code",
    imageName: "devops_cicd_real.jpg",
    category: "Technology",
    author: "Gemora Tech Team",
    content: `
      <h2>The Need for Speed and Safety</h2>
      <p>Deploying code manually via FTP is a relic of the past. Modern <a href="/custom-software-development">Enterprise Software Teams</a> rely heavily on DevOps and CI/CD pipelines to ship code safely multiple times a day.</p>
      
      <h2>Continuous Integration (CI)</h2>
      <p>Every time a developer pushes code to GitHub or GitLab, the CI pipeline automatically builds the app and runs a suite of automated unit and integration tests. If a test fails, the code is blocked from merging.</p>
      
      <h2>Continuous Deployment (CD)</h2>
      <p>Once tests pass, the CD pipeline automatically deploys the Docker container to the staging or production cluster (AWS EKS or Vercel). Using Canary deployments, the new code is exposed to only 5% of users initially to monitor for errors.</p>
    `,
    faqs: [
      { question: "What are the best CI/CD tools?", answer: "GitHub Actions, GitLab CI, and Jenkins remain the industry standards for building robust pipelines." }
    ]
  },
  {
    title: "Cyber Security Audits: How to Protect Your Enterprise",
    metaTitle: "Cyber Security Audits & Penetration Testing | Gemora",
    metaDescription: "Don't wait for a data breach. Learn how regular cyber security audits and penetration testing can protect your custom enterprise software.",
    keyword: "hacker,security,lock",
    imageName: "cyber_security_real.jpg",
    category: "Enterprise Software",
    author: "Nikhil B",
    content: `
      <h2>The Rising Threat of Cyber Attacks</h2>
      <p>As businesses digitize, the attack surface expands. A single data breach can destroy customer trust and invite massive regulatory fines. Regular <a href="/custom-software-development">security auditing</a> is mandatory.</p>
      
      <h2>What is Penetration Testing (Pen Test)?</h2>
      <p>Ethical hackers (White Hats) simulate cyber attacks on your application to identify vulnerabilities before malicious hackers find them. They test for:</p>
      <ul>
        <li>SQL Injections and Cross-Site Scripting (XSS).</li>
        <li>Broken Authentication and Session Hijacking.</li>
        <li>Insecure Direct Object References (IDOR).</li>
      </ul>
    `,
    faqs: [
      { question: "How often should an enterprise conduct a security audit?", answer: "A full third-party penetration test should occur annually, with automated vulnerability scanning running weekly." }
    ]
  },
  {
    title: "SaaS Application Development: Multitenancy Architecture",
    metaTitle: "SaaS Application Development Company | Gemora Tech",
    metaDescription: "Planning to build a SaaS product? Learn about single-tenant vs multi-tenant architecture, data isolation, and scaling PostgreSQL.",
    keyword: "saas,cloud,dashboard",
    imageName: "saas_multitenancy_real.jpg",
    category: "SaaS & Platforms",
    author: "Gemora Tech Team",
    content: `
      <h2>The Core of SaaS</h2>
      <p>Building a successful software-as-a-service product relies on <a href="/saas-development-company">SaaS Application Development</a> that focuses on scalability and data isolation. The biggest architectural decision is how you store client data.</p>
      
      <h2>Single-Tenant vs Multi-Tenant</h2>
      <p><strong>Single-Tenant:</strong> Every customer gets their own database and server instance. Highly secure (perfect for healthcare), but very expensive to scale and maintain.</p>
      <p><strong>Multi-Tenant:</strong> All customers share the same database and infrastructure, but their data is logically separated by a "Tenant ID". This is how Salesforce and Slack operate. It is highly cost-effective and easy to update.</p>
      
      <h2>Row-Level Security (RLS)</h2>
      <p>If you choose Multi-Tenant, implementing Row-Level Security in PostgreSQL ensures that a bug in your code cannot accidentally leak Customer A's data to Customer B.</p>
    `,
    faqs: [
      { question: "Which architecture is best for a B2B SaaS startup?", answer: "Multi-Tenant is the industry standard for 95% of B2B SaaS startups due to its massive cost efficiencies." }
    ]
  }
];

async function seed() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  for (let blog of batch4) {
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
  console.log('Batch 4 seeded successfully with real images.');
}

seed();
