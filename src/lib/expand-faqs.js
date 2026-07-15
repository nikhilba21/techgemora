const fs = require('fs');
const path = require('path');

const dbPath = 'd:/Gemoratech/src/data/db.json';

const templates = {
  game: [
    { q: "What game engines do you use for [ServiceName]?", a: "We primarily utilize Unity 3D, Unreal Engine, and HTML5 frameworks (like Phaser or Three.js) for [ServiceName] projects, selecting the engine based on your target platforms, graphics requirements, and budget." },
    { q: "Can you assist with game graphics and UI/UX design?", a: "Yes. Our team includes dedicated 2D/3D game artists, animation specialists, and UI/UX designers who craft custom characters, game assets, backgrounds, and animations tailored for [ServiceName]." },
    { q: "Who owns the source code and intellectual property of the game?", a: "Upon full milestone clearance, you own 100% of the source code, game assets, visual designs, and intellectual property. We sign a strict NDA before any development work begins." },
    { q: "Do you integrate multiplayer servers and lobby systems?", a: "Absolutely. We build multiplayer scaling lobbies, matchmakers, real-time chats, and tournament systems using robust socket engines (Socket.io, Photon, or custom WebSockets) backed by scalable AWS hosting." },
    { q: "How do you secure [ServiceName] against anti-cheat and hacking attempts?", a: "We implement server-side validation for all game moves, secure SSL databases, token-based session handlers, and integrate industry-standard anti-cheat middleware protection." },
    { q: "What monetization models can we implement in the game?", a: "We support integrations for in-app purchases (IAP), virtual token economies, in-game advertisements (AdMob, Unity Ads), subscription packages, and Web3/NFT token integrations." },
    { q: "Do you handle the App Store and Google Play publishing process?", a: "Yes, we handle the entire submission, review support, and publication pipeline under your developer credentials, ensuring compliance with Apple App Store and Google Play Guidelines." },
    { q: "Can the game scale to support thousands of concurrent players?", a: "Yes. By containerizing our server code inside Docker and orchestrating with Kubernetes, we ensure that backend database queries and game servers scale dynamically based on player traffic." },
    { q: "Do you provide post-launch game maintenance and updates?", a: "We offer 30 days of free support for post-launch bug fixes. We also provide monthly SLA-based maintenance packages for adding new features, live events, security updates, and OS compatibility updates." },
    { q: "What is the typical team structure for a [ServiceName] project?", a: "A standard team consists of a Project Manager, Game Designers, 2D/3D Game Developers, QA Engineers, and a DevOps Architect." }
  ],
  mobile: [
    { q: "Which is better for [ServiceName]: Native or Cross-Platform?", a: "It depends on your requirements. Native development (Swift/Kotlin) offers maximum device performance, while cross-platform frameworks (Flutter/React Native) allow single-codebase builds for iOS and Android, saving 40% in cost." },
    { q: "Do you sign a Non-Disclosure Agreement (NDA) for [ServiceName]?", a: "Yes. Code confidentiality is our top priority. We sign standard NDAs before discussing any project wireframes or requirements." },
    { q: "How do you handle offline functionality and local database storage?", a: "We implement secure offline caching and sync loops using client-side databases like SQLite, Realm, or watermelondb, which sync automatically with the main server when connection is restored." },
    { q: "Do you assist with publishing [ServiceName] to the app stores?", a: "Yes, our engineers manage the deployment, asset preparation, meta tags, and submission approvals for Apple App Store and Google Play." },
    { q: "Can you integrate third-party APIs and payment gateways?", a: "Absolutely. We integrate payment processors (Stripe, PayPal, Apple Pay, Google Pay), authentication systems, map services (Google Maps, Mapbox), and custom ERP/CRM REST endpoints." },
    { q: "What security measures do you implement in [ServiceName]?", a: "We implement secure token encryption (JWT), biometric logins (FaceID/TouchID), data encryption (AES-256), SSL pinning, and follow OWASP Mobile Security guidelines." },
    { q: "How do you handle push notifications?", a: "We configure rich push notifications (text, images, deep links) using Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNS)." },
    { q: "Who owns the code copyright after deployment?", a: "You own 100% of the copyright and code assets. The entire intellectual property is handed over upon project sign-off." },
    { q: "How long does it take to develop a standard [ServiceName] app?", a: "A standard MVP app takes about 8 to 12 weeks. Complex custom applications with extensive backend integrations may require 16 to 24 weeks." },
    { q: "What post-launch support SLA do you offer?", a: "We offer 30 days of warp support post-launch, alongside monthly retainer packages for updates, OS upgrades, and feature additions." }
  ],
  ai: [
    { q: "How do you train the machine learning models for [ServiceName]?", a: "We utilize custom dataset preprocessing, transfer learning, and fine-tuning of pre-trained LLMs or architectures (like TensorFlow/PyTorch) matching your specific industry data parameters." },
    { q: "How do you ensure the privacy of our proprietary training data?", a: "We isolate data processing inside virtual private cloud (VPC) subnets on AWS or Azure. We sign strict data-privacy NDAs and do not share your proprietary data with public AI endpoints." },
    { q: "What is the typical accuracy rate for [ServiceName] models?", a: "Accuracy is highly dependent on dataset quality. We run multiple iterations, validation loops, and data pruning cycles to achieve optimal model performance and reduce bias/hallucination." },
    { q: "Can [ServiceName] integrate with our existing ERP or database systems?", a: "Yes, we build custom RESTful APIs or GraphQL endpoints to connect the AI models directly into your databases (PostgreSQL, MongoDB) and ERP systems." },
    { q: "What infrastructure or GPU requirements are needed to host [ServiceName]?", a: "We optimize models for cost-efficient deployment using CPU/GPU cloud platforms (AWS EC2, Google Cloud AI, Hugging Face). We also set up scaling infrastructure to optimize execution costs." },
    { q: "Do you offer real-time analytics dashboards for [ServiceName]?", a: "Yes, we design visual analytics dashboards using React/Next.js frontends and real-time sockets to display predictions, data insights, and model health." },
    { q: "What tools and frameworks do you use for AI development?", a: "We specialize in Python, PyTorch, TensorFlow, Keras, Scikit-learn, Hugging Face Transformers, and data platforms like Apache Spark and Snowflake." },
    { q: "Who owns the trained model weights and algorithms?", a: "You own all trained weights, model files, code integration layers, and proprietary algorithms upon final milestone settlement." },
    { q: "Can the AI system continuously learn from new inputs?", a: "Yes. We set up automated MLOps pipelines that retrain the model securely on new data inputs periodically, ensuring predictions remain accurate over time." },
    { q: "Do you provide consulting and discovery workshops?", a: "Yes, we offer structured discovery phases to analyze your current data structures and map out a viable AI implementation strategy." }
  ],
  hire: [
    { q: "How fast can we onboard a developer for [ServiceName]?", a: "We can typically introduce pre-vetted developer profiles within 48 hours and onboard developers within 3 to 5 business days." },
    { q: "What are the hours and timezone availability of the hired resources?", a: "Developers are available on your native timezone. We establish a minimum of 3-4 hours of overlapping workspace schedules for daily syncs." },
    { q: "What communication channels do we use to manage developers?", a: "You communicate directly via Slack, Microsoft Teams, Skype, or email, and manage tasks through project management dashboards (Jira, Trello, Asana)." },
    { q: "How do you verify the technical skills of developers?", a: "Every resource undergoes rigorous screening: visual port checks, algorithm testing, live coding challenges, and English proficiency assessments." },
    { q: "What happens if a developer is sick or goes on leave?", a: "We provide instant, qualified backup resources or extensions to keep your timeline on track, managing transitions with no extra billing overhead." },
    { q: "What is the minimum billing model for developer staffing?", a: "We offer monthly developer contracts (160 hours/month) or fixed milestone sprints, with flexible billing terms." },
    { q: "Who owns the code written by the hired developers?", a: "You own 100% of the daily commits and intellectual property, pushed directly to your private GitHub or GitLab repository." },
    { q: "Can we replace a developer if we are not satisfied with their performance?", a: "Yes. We offer a 15-day trial period. If a resource doesn't fit your culture or quality expectations, we replace them at no extra cost." },
    { q: "Do you provide a dedicated project manager?", a: "Yes, all dedicated resources are overseen by an internal account manager at no extra charge to ensure optimal output and standard compliance." },
    { q: "Are the developers fluent in English?", a: "Yes, all our engineers possess excellent verbal and written English communication skills for direct, frictionless team collaboration." }
  ],
  fallback: [
    { q: "What coding standards do you follow for [ServiceName]?", a: "We enforce strict TypeScript types, clean architecture code structures, modular components, linting configurations, and automated unit test coverage." },
    { q: "How do you handle server hosting and database scalability?", a: "We deploy client web portals on serverless frameworks like Vercel or Netlify, and scale databases (PostgreSQL/MongoDB) using automated replica nodes on AWS or Azure." },
    { q: "Do you provide custom API development and database integrations?", a: "Yes. We design high-performance RESTful or GraphQL APIs and integrate with third-party databases, CRM systems, and accounting software." },
    { q: "Who owns the codebase copyright upon completion?", a: "You own the full copyright. The repository and deployment coordinates are fully transferred upon sign-off." },
    { q: "Do you implement automated SEO optimizations?", a: "Yes, all web projects are built using Next.js to leverage server-side rendering, dynamic sitemaps, structured breadcrumb schema, and fast Core Web Vitals." },
    { q: "How do you test [ServiceName] projects before release?", a: "Our QA team runs unit testing, integration tests, cross-browser compatibility checks, and load test scripts to ensure peak performance." },
    { q: "What is the average timeline to build a custom portal?", a: "A standard web project takes 6 to 10 weeks. Enterprise-level custom systems require 12 to 20 weeks." },
    { q: "What hosting platforms do you recommend?", a: "We recommend Vercel for frontends, AWS or DigitalOcean for server layers, and RDS/MongoDB Atlas for cloud databases." },
    { q: "Can you assist with migration from legacy systems?", a: "Yes, we specialize in refactoring legacy codebases, migrating local data to cloud databases safely, and optimizing server performance." },
    { q: "What post-development maintenance SLA models are available?", a: "We offer flexible monthly retainers for server maintenance, dependency upgrades, bug sweeps, and hotfix SLA protections." }
  ]
};

try {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  console.log(`Initial pages count: ${db.pages.length}`);

  let updatedCount = 0;

  db.pages.forEach(page => {
    let currentFaqs = [];
    try {
      currentFaqs = typeof page.faqs === 'string' ? JSON.parse(page.faqs) : (page.faqs || []);
    } catch(e) {}

    // Check category
    const lowerSlug = page.slug.toLowerCase();
    let cat = 'fallback';
    if (lowerSlug.includes('game') || lowerSlug.includes('casino') || lowerSlug.includes('poker') || lowerSlug.includes('ludo') || lowerSlug.includes('rummy') || lowerSlug.includes('slots') || lowerSlug.includes('fantasy') || lowerSlug.includes('board') || lowerSlug.includes('card') || lowerSlug.includes('unity') || lowerSlug.includes('unreal') || lowerSlug.includes('threejs') || lowerSlug.includes('metaverse') || lowerSlug.includes('reality') || lowerSlug.includes('ar-vr') || lowerSlug.includes('mixed-reality')) {
      cat = 'game';
    } else if (lowerSlug.includes('mobile') || lowerSlug.includes('app') || lowerSlug.includes('ios') || lowerSlug.includes('android') || lowerSlug.includes('swift') || lowerSlug.includes('kotlin') || lowerSlug.includes('flutter') || lowerSlug.includes('react-native')) {
      cat = 'mobile';
    } else if (lowerSlug.includes('ai') || lowerSlug.includes('machine') || lowerSlug.includes('big-data') || lowerSlug.includes('voice') || lowerSlug.includes('analytics') || lowerSlug.includes('tensorflow') || lowerSlug.includes('nlp') || lowerSlug.includes('recommendation')) {
      cat = 'ai';
    } else if (lowerSlug.includes('hire-') || lowerSlug.includes('developers')) {
      cat = 'hire';
    }

    const templateSet = templates[cat];
    
    // Create custom templated FAQs
    const generatedFaqs = templateSet.map(faq => ({
      question: faq.q.replace(/\[ServiceName\]/g, page.h1),
      answer: faq.a.replace(/\[ServiceName\]/g, page.h1)
    }));

    // Merge: Keep existing FAQs and append generated ones to reach at least 10 FAQs
    const mergedFaqs = [...currentFaqs];
    generatedFaqs.forEach(g => {
      // Avoid duplicate questions
      const exists = mergedFaqs.some(f => f.question.toLowerCase().trim() === g.question.toLowerCase().trim());
      if (!exists && mergedFaqs.length < 10) {
        mergedFaqs.push(g);
      }
    });

    // Make sure we have 10 FAQs
    if (mergedFaqs.length < 10) {
      // If still under 10 (should not happen with 10 templates, but in case), append from fallback
      templates.fallback.forEach(f => {
        if (mergedFaqs.length < 10) {
          const g = {
            question: f.q.replace(/\[ServiceName\]/g, page.h1),
            answer: f.a.replace(/\[ServiceName\]/g, page.h1)
          };
          const exists = mergedFaqs.some(eq => eq.question.toLowerCase().trim() === g.question.toLowerCase().trim());
          if (!exists) mergedFaqs.push(g);
        }
      });
    }

    page.faqs = mergedFaqs;
    updatedCount++;
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`Successfully expanded FAQs on ${updatedCount} pages to at least 10 items each!`);
} catch (e) {
  console.error("Error expanding FAQs:", e);
}
