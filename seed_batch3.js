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

const batch3 = [
  {
    title: "How to Build a Custom Enterprise ChatGPT Clone",
    metaTitle: "Enterprise ChatGPT Clone Development | Gemora Tech",
    metaDescription: "Learn how to build a private, secure ChatGPT clone for your enterprise. Protect your proprietary data using open-source LLMs like LLaMA 3.",
    keyword: "ai,robot,laptop",
    imageName: "chatgpt_clone_real.jpg",
    category: "Artificial Intelligence",
    author: "Nikhil B",
    content: `
      <h2>Why Enterprises Need Private LLMs</h2>
      <p>Using public AI tools like OpenAI's ChatGPT poses massive data privacy risks for enterprises. When employees paste sensitive financial data or proprietary source code into public models, it becomes part of their training data. <a href="/ai-model-development-company">Custom AI Model Development</a> solves this.</p>
      
      <h2>Building the Architecture</h2>
      <p>Instead of relying on GPT-4, we deploy open-source models like Meta's LLaMA 3 or Mistral on secure, private AWS/Azure clusters. The architecture involves:</p>
      <ul>
        <li><strong>Vector Database:</strong> Pinecone or Milvus for storing company documents (PDFs, Confluence pages).</li>
        <li><strong>RAG (Retrieval-Augmented Generation):</strong> Feeding internal data to the LLM to prevent hallucinations.</li>
        <li><strong>Role-Based Access:</strong> Ensuring the AI respects employee permission levels.</li>
      </ul>
    `,
    faqs: [
      { question: "Is a private ChatGPT expensive to host?", answer: "Running open-source 7B or 13B models on AWS EC2 instances with GPUs costs roughly $1000-$3000/month, depending on usage." }
    ]
  },
  {
    title: "RPA (Robotic Process Automation) for Small Businesses",
    metaTitle: "RPA Solutions for Small Businesses | Gemora Tech",
    metaDescription: "Discover how Robotic Process Automation (RPA) can save small businesses hundreds of hours by automating repetitive administrative tasks.",
    keyword: "automation,office,computer",
    imageName: "rpa_smallbiz_real.jpg",
    category: "Artificial Intelligence",
    author: "Gemora Tech Team",
    content: `
      <h2>What is RPA?</h2>
      <p>Robotic Process Automation (RPA) uses software "bots" to mimic human interactions with digital systems. From data entry to invoicing, RPA eliminates repetitive tasks.</p>
      
      <h2>How Small Businesses Benefit</h2>
      <p>Historically reserved for massive corporations, RPA is now accessible to SMBs through <a href="/custom-software-development">Custom Software Development</a>. A simple bot can:</p>
      <ul>
        <li>Scrape daily supplier prices from websites and update your database.</li>
        <li>Automatically generate and email invoices based on completed Salesforce tasks.</li>
        <li>Migrate legacy data into modern SaaS platforms without human error.</li>
      </ul>
    `,
    faqs: [
      { question: "Do I need coding skills to use RPA?", answer: "No, modern RPA tools like UiPath have drag-and-drop interfaces, though custom integrations require professional developers." }
    ]
  },
  {
    title: "Machine Learning in Fintech: Fraud Detection and Trading",
    metaTitle: "Machine Learning in Fintech Software | Gemora Tech",
    metaDescription: "Explore how machine learning and AI are revolutionizing Fintech. We cover anomaly detection, credit scoring, and algorithmic trading systems.",
    keyword: "finance,chart,data",
    imageName: "fintech_ml_real.jpg",
    category: "FinTech",
    author: "Nikhil B",
    content: `
      <h2>AI is the New Financial Engine</h2>
      <p>In <a href="/fintech-software-development">Fintech Software Development</a>, traditional rule-based systems are obsolete. Machine Learning algorithms are required to process millions of transactions in real-time.</p>
      
      <h2>Real-Time Fraud Detection</h2>
      <p>Using Random Forest classifiers and Neural Networks, payment gateways can analyze 50+ data points (location, device fingerprint, transaction velocity) in under 100ms to block fraudulent transactions instantly.</p>
      
      <h2>Algorithmic Trading</h2>
      <p>Hedge funds use NLP (Natural Language Processing) to scan millions of Twitter posts and news articles in seconds, executing trades based on sentiment analysis before human traders can react.</p>
    `,
    faqs: [
      { question: "Is ML better than rule-based systems?", answer: "Yes, ML models adapt and learn from new fraud patterns, whereas rule-based systems only catch what they are explicitly programmed to catch." }
    ]
  },
  {
    title: "How AI is Transforming Healthcare Software Development",
    metaTitle: "AI in Healthcare Software Development | Gemora Tech",
    metaDescription: "Discover the impact of AI on healthcare. From predictive diagnostics to AI-assisted radiology, explore the future of medical software.",
    keyword: "hospital,doctor,technology",
    imageName: "healthcare_ai_real.jpg",
    category: "Healthcare",
    author: "Gemora Tech Team",
    content: `
      <h2>The Future of Medical Diagnostics</h2>
      <p>Integrating Artificial Intelligence into <a href="/healthcare-software-development">Healthcare Software</a> is saving lives by providing doctors with hyper-accurate second opinions.</p>
      
      <h2>AI in Radiology</h2>
      <p>Computer Vision algorithms trained on millions of X-rays and MRIs can detect early-stage tumors and anomalies with accuracy rates surpassing human radiologists. The AI highlights areas of concern, speeding up the diagnostic process.</p>
      
      <h2>Predictive Analytics for Hospitals</h2>
      <p>Machine learning models analyze patient admission history and local weather/traffic patterns to predict ER crowding, allowing hospital administrators to optimize staff scheduling dynamically.</p>
    `,
    faqs: [
      { question: "Is AI legal in healthcare diagnostics?", answer: "AI is used as a 'Decision Support System'. The final diagnosis and legal responsibility always remain with the licensed physician." }
    ]
  },
  {
    title: "Big Data Analytics: Tools Every Enterprise Needs",
    metaTitle: "Enterprise Big Data Analytics Solutions | Gemora Tech",
    metaDescription: "A guide to the essential big data analytics tools for enterprises. Learn about Hadoop, Spark, Snowflake, and real-time streaming architectures.",
    keyword: "server,data,analytics",
    imageName: "big_data_tools_real.jpg",
    category: "Technology",
    author: "Nikhil B",
    content: `
      <h2>Taming the Data Avalanche</h2>
      <p>Modern enterprises generate terabytes of data daily. Without proper architecture, this data is useless. <a href="/custom-software-development">Custom software pipelines</a> are required to turn raw logs into actionable business intelligence.</p>
      
      <h2>The Modern Data Stack</h2>
      <ul>
        <li><strong>Data Warehousing:</strong> Snowflake and Amazon Redshift allow for scalable storage and lightning-fast SQL queries.</li>
        <li><strong>Real-Time Streaming:</strong> Apache Kafka is essential for processing high-velocity data streams (like IoT sensors or clickstream data).</li>
        <li><strong>Data Processing:</strong> Apache Spark handles massive batch processing jobs that traditional databases would choke on.</li>
      </ul>
    `,
    faqs: [
      { question: "What is the difference between a Data Lake and a Data Warehouse?", answer: "A Data Lake stores raw, unstructured data, while a Data Warehouse stores structured, filtered data ready for analytics." }
    ]
  },
  {
    title: "Voice App Development: Building Alexa Skills for Brands",
    metaTitle: "Voice App & Alexa Skill Development | Gemora Tech",
    metaDescription: "Learn how brands are leveraging voice app development. We discuss creating Alexa Skills, Google Assistant Actions, and Voice UI design.",
    keyword: "speaker,voice,smart",
    imageName: "voice_app_real.jpg",
    category: "Mobile App Development",
    author: "Gemora Tech Team",
    content: `
      <h2>The Screenless Interface</h2>
      <p>Voice is the ultimate frictionless UI. Brands are investing heavily in <a href="/mobile-app-development-company">Voice App Development</a> to ensure they are accessible via Amazon Echo and Google Home devices.</p>
      
      <h2>Designing for Voice (VUI)</h2>
      <p>Unlike graphical interfaces, Voice User Interfaces (VUI) must handle extreme unpredictability. Users might phrase a command in 50 different ways. Natural Language Understanding (NLU) maps these diverse utterances to specific intents.</p>
      
      <h2>Use Cases for Brands</h2>
      <p>From Domino's allowing customers to order pizza via Alexa, to banks allowing users to check balances via voice, the convenience factor drastically increases customer loyalty.</p>
    `,
    faqs: [
      { question: "Are Alexa skills profitable?", answer: "Yes, Amazon allows In-Skill Purchasing (ISP) where you can sell premium content or subscriptions directly through voice commands." }
    ]
  },
  {
    title: "How to Integrate OpenAI APIs into your SaaS Product",
    metaTitle: "Integrating OpenAI APIs into SaaS | Gemora Tech",
    metaDescription: "A technical guide to integrating OpenAI's GPT-4 and DALL-E APIs into your custom SaaS platform to boost user engagement and productivity.",
    keyword: "code,laptop,programmer",
    imageName: "openai_integration_real.jpg",
    category: "Artificial Intelligence",
    author: "Nikhil B",
    content: `
      <h2>Supercharging Your SaaS</h2>
      <p>Adding generative AI capabilities to your <a href="/saas-development-company">SaaS platform</a> is no longer optional; it's expected. Users want AI to write their emails, summarize their data, and generate their reports.</p>
      
      <h2>Handling Rate Limits and Costs</h2>
      <p>When integrating the OpenAI API, you must implement strict caching mechanisms (using Redis) to avoid calling the API twice for the same prompt. Additionally, implement user-level token tracking to ensure a single user doesn't exhaust your API budget.</p>
      
      <h2>Streaming Responses</h2>
      <p>To provide a ChatGPT-like experience, you must use Server-Sent Events (SSE) to stream the AI's response token-by-token to the frontend, rather than making the user wait 10 seconds for the entire block of text.</p>
    `,
    faqs: [
      { question: "Is OpenAI the only option?", answer: "No, Anthropic's Claude 3 and Google's Gemini Pro are excellent, highly competitive alternatives." }
    ]
  },
  {
    title: "Computer Vision Solutions in Manufacturing and Logistics",
    metaTitle: "Computer Vision in Manufacturing | Gemora Tech",
    metaDescription: "Explore how Computer Vision is automating quality control in manufacturing and tracking packages in global logistics operations.",
    keyword: "factory,robot,warehouse",
    imageName: "computer_vision_real.jpg",
    category: "Artificial Intelligence",
    author: "Gemora Tech Team",
    content: `
      <h2>Eyes for the Machines</h2>
      <p>Computer Vision (CV) allows software to interpret the visual world. In <a href="/logistics-software-development">Logistics and Manufacturing</a>, CV is replacing human inspectors with untiring AI.</p>
      
      <h2>Automated Defect Detection</h2>
      <p>High-speed cameras mounted on assembly lines feed video into edge-computing servers running YOLO (You Only Look Once) models. These models identify microscopic scratches or defects in milliseconds, automatically ejecting faulty products from the line.</p>
      
      <h2>Warehouse Automation</h2>
      <p>CV is used by autonomous robots to navigate dynamic warehouses, read barcodes on the fly, and ensure workers are wearing mandatory safety gear (hard hats, vests).</p>
    `,
    faqs: [
      { question: "Does CV require constant cloud connection?", answer: "No, utilizing Edge AI (running models on local hardware like NVIDIA Jetsons) ensures zero latency and offline capability." }
    ]
  },
  {
    title: "NLP (Natural Language Processing) for Customer Support Chatbots",
    metaTitle: "NLP Chatbot Development Services | Gemora Tech",
    metaDescription: "Learn how NLP-powered chatbots are replacing legacy menu-driven bots to provide human-like customer support 24/7.",
    keyword: "customer,service,chat",
    imageName: "nlp_chatbot_real.jpg",
    category: "Artificial Intelligence",
    author: "Nikhil B",
    content: `
      <h2>The End of Frustrating Chatbots</h2>
      <p>Legacy chatbots forced users into rigid "Press 1 for Sales" menus. Modern <a href="/ai-model-development-company">AI Chatbots</a> utilize Natural Language Processing (NLP) to understand intent, sentiment, and context.</p>
      
      <h2>Understanding Sentiment Analysis</h2>
      <p>If a customer types "I am furious, my order never arrived!", the NLP engine detects a highly negative sentiment. Instead of offering a generic reply, it immediately escalates the chat to a live human supervisor.</p>
      
      <h2>Multilingual Support</h2>
      <p>Modern NLP models inherently understand 50+ languages. A user can start chatting in Spanish, and the bot will fetch the answer from an English knowledge base, translate it instantly, and reply in perfect Spanish.</p>
    `,
    faqs: [
      { question: "Can the chatbot integrate with Zendesk or Salesforce?", answer: "Yes, via APIs, the chatbot can pull order statuses, initiate refunds, and update CRM tickets autonomously." }
    ]
  },
  {
    title: "TensorFlow vs PyTorch: Which One Should Your Developers Use?",
    metaTitle: "TensorFlow vs PyTorch Comparison | Gemora Tech",
    metaDescription: "A technical comparison of the two leading Deep Learning frameworks. Find out whether your data science team should use PyTorch or TensorFlow.",
    keyword: "developer,code,screen",
    imageName: "tensorflow_vs_pytorch_real.jpg",
    category: "Technology",
    author: "Gemora Tech Team",
    content: `
      <h2>The Deep Learning Giants</h2>
      <p>When executing <a href="/ai-model-development-company">Custom AI Model Development</a>, your data scientists must choose a framework. Google's TensorFlow and Meta's PyTorch dominate the landscape.</p>
      
      <h2>Why Developers Love PyTorch</h2>
      <p>PyTorch is the undisputed king of AI research. Its dynamic computation graph allows developers to change how the network behaves on the fly, making debugging incredibly intuitive. It feels much more like native Python.</p>
      
      <h2>Why Enterprises Choose TensorFlow</h2>
      <p>TensorFlow shines in production deployment. TensorFlow Serving and TensorFlow Lite make it extremely easy to push models to highly scalable cloud servers or directly onto low-power mobile devices.</p>
    `,
    faqs: [
      { question: "Which framework is faster?", answer: "Performance is generally identical. The choice depends more on the deployment target (Mobile vs Cloud) and developer preference." }
    ]
  }
];

async function seed() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  for (let blog of batch3) {
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
  console.log('Batch 3 seeded successfully with real images.');
}

seed();
