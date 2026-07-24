import os
import json
import time
from datetime import datetime, timedelta
from daily_blog_publisher import generate_article_with_gemini, make_slug

TOPICS_100 = [
    # Group 1 (July 25)
    {"topic": "Building High-Throughput Real-Time Event Pipelines with Apache Kafka and Go", "category": "Cloud"},
    {"topic": "How to Secure Microservices Architecture with Istio Service Mesh and Mutual TLS", "category": "Cloud"},
    {"topic": "Designing Multi-Region Active-Active PostgreSQL Clusters for Zero Downtime", "category": "Software Development"},

    # Group 2 (July 26)
    {"topic": "Evaluating LLM Fine-Tuning vs RAG Architectures for Enterprise Knowledge Search", "category": "AI"},
    {"topic": "Building Production-Ready AI Agents with LangChain and Custom Tool Integrations", "category": "AI"},
    {"topic": "How Vector Indexes (HNSW vs IVFFlat) Impact Query Latency in Semantic Search", "category": "AI"},

    # Group 3 (July 27)
    {"topic": "Unity vs Unreal Engine for 3D Real-Money Multiplayer Game Development in 2026", "category": "Game Development"},
    {"topic": "How to Build Anti-Fraud and Collusion Detection Systems for Online Card Games", "category": "Game Development"},
    {"topic": "Optimizing WebGL Render Loops for Smooth 60FPS Mobile Browser Games", "category": "Game Development"},

    # Group 4 (July 28)
    {"topic": "Flutter vs React Native in 2026: Cross-Platform Performance and Native Bridge Benchmarks", "category": "Mobile Apps"},
    {"topic": "Architecting Offline-First Mobile Apps with WatermelonDB and Background Sync", "category": "Mobile Apps"},
    {"topic": "Implementing Biometric Passkeys and WebAuthn for Frictionless Mobile Login", "category": "Mobile Apps"},

    # Group 5 (July 29)
    {"topic": "Layer 2 Rollups: Optimistic vs Zero-Knowledge Proofs for Scalable Web3 dApps", "category": "Web3 & Blockchain"},
    {"topic": "How Smart Contract Formal Verification Prevents Multi-Million Dollar DeFi Exploits", "category": "Web3 & Blockchain"},
    {"topic": "Building Gasless Web3 Transactions Using ERC-4337 Account Abstraction Paymasters", "category": "Web3 & Blockchain"},

    # Group 6 (July 30)
    {"topic": "SaaS Multi-Tenancy Patterns: Row-Level Security vs Isolated Tenant Schemas", "category": "SaaS"},
    {"topic": "Designing Subscription Billing Systems with Usage-Based Metering and Tier Upgrades", "category": "SaaS"},
    {"topic": "How to Build a Compliant Audit Log Engine for SOC 2 Type II Accreditation", "category": "SaaS"},

    # Group 7 (July 31)
    {"topic": "Zero Trust Security Architecture: Implementing Identity-Aware Proxies in DevOps", "category": "DevOps"},
    {"topic": "Automating Infrastructure as Code (IaC) Validation via Terraform and Sentinel", "category": "DevOps"},
    {"topic": "How GitOps with ArgoCD Simplifies Kubernetes Multi-Cluster Continuous Delivery", "category": "DevOps"},

    # Group 8 (August 01)
    {"topic": "Building High-Concurrency Ludo Game Servers Using Node.js and Redis Clusters", "category": "Game Development"},
    {"topic": "How RNG Certification (iTech Labs / GLI) Ensures Fair Play in Digital Casino Games", "category": "Game Development"},
    {"topic": "Architecting Poker Game Engine Rules: Side Pots, Hand Evaluators, and Deck Shuffling", "category": "Game Development"},

    # Group 9 (August 02)
    {"topic": "Migrating Monolithic Legacy Applications to Serverless AWS Lambda Microservices", "category": "Cloud"},
    {"topic": "Designing Cost-Optimized Kubernetes Auto-Scaling (Karpenter vs Cluster Autoscaler)", "category": "Cloud"},
    {"topic": "Building Cloud-Native Observability Dashboards with Grafana and Prometheus", "category": "Cloud"},

    # Group 10 (August 03)
    {"topic": "How Generative AI Is Transforming Automated Code Reviews and Refactoring Workflows", "category": "AI"},
    {"topic": "Architecting Local AI Models with Ollama and GGML Quantization for Data Privacy", "category": "AI"},
    {"topic": "Building Autonomous Customer Service Agents with Multi-Turn Conversation Memory", "category": "AI"},

    # Group 11 (August 04)
    {"topic": "FinTech Payment Gateway Integration: Handling Webhooks, Idempotency, and Refunds", "category": "FinTech"},
    {"topic": "PCI-DSS 4.0 Compliance Guide for Custom E-Commerce and SaaS Platforms", "category": "FinTech"},
    {"topic": "Designing Real-Time Fraud Score Calculation Systems for Instant Payouts", "category": "FinTech"},

    # Group 12 (August 05)
    {"topic": "Next.js 15 Server Actions vs REST API Controllers: Performance and Developer Ergonomics", "category": "Web Development"},
    {"topic": "How to Achieve 100/100 Core Web Vitals (LCP, INP, CLS) on Modern Web Platforms", "category": "Web Development"},
    {"topic": "Building Headless E-Commerce Frontends with Next.js, Shopify Storefront API, and Tailwind", "category": "Web Development"},

    # Group 13 (August 06)
    {"topic": "Hire Dedicated Developers vs Project Outsourcing: Evaluating Total Cost of Ownership", "category": "Hiring Guide"},
    {"topic": "How Offshore Engineering Squads Accelerate Time-to-Market for US & European Startups", "category": "Hiring Guide"},
    {"topic": "Managing Distributed Remote Tech Teams: Agile Sprints, Timezones, and Jira Workflows", "category": "Hiring Guide"},

    # Group 14 (August 07)
    {"topic": "Real-Time Collaborative Editing Systems: Operational Transformation (OT) vs CRDTs", "category": "Software Development"},
    {"topic": "Implementing GraphQL Schema Stitching and Federation for Distributed Systems", "category": "Software Development"},
    {"topic": "How to Architect Resilient Circuit Breakers in Distributed Microservices Using Resilience4j", "category": "Software Development"},

    # Group 15 (August 08)
    {"topic": "Building Solana Decentralized Exchanges with Anchor Framework and Rust", "category": "Web3 & Blockchain"},
    {"topic": "Cross-Chain Asset Bridges: Security Risks and Architecture Best Practices", "category": "Web3 & Blockchain"},
    {"topic": "Understanding Zero-Knowledge Rollups (zkEVM) for High-Frequency Crypto Trading", "category": "Web3 & Blockchain"},

    # Group 16 (August 09)
    {"topic": "Designing On-Demand Home Service Apps (UrbanClap/TaskRabbit Clones): Complete Blueprint", "category": "Mobile Apps"},
    {"topic": "Real-Time Driver Tracking and Route Optimization in On-Demand Logistics Apps", "category": "Mobile Apps"},
    {"topic": "Implementing Push Notification Funnels that Double Daily Active Mobile App Users", "category": "Mobile Apps"},

    # Group 17 (August 10)
    {"topic": "How Cloud FinOps Strategies Can Reduce Azure and GCP Spend by Up to 35%", "category": "Cloud"},
    {"topic": "Designing Multi-Cloud Disaster Recovery Plans with Automated Failover Scripts", "category": "Cloud"},
    {"topic": "Securing IAM Roles and Least Privilege Access Across Enterprise AWS Accounts", "category": "Cloud"},

    # Group 18 (August 11)
    {"topic": "Developing Custom E-Learning Platforms with Live Streaming and Interactive Quizzes", "category": "Web Development"},
    {"topic": "Building Enterprise ERP Systems: Modular Architecture and Database Normalization", "category": "Software Development"},
    {"topic": "How Micro-Frontends Enable Independent Release Cycles for Enterprise Web Teams", "category": "Software Development"},

    # Group 19 (August 12)
    {"topic": "Building Multiplayer Card Game Tournaments with Dynamic Bracket Generation", "category": "Game Development"},
    {"topic": "In-App Purchases (IAP) vs Real Money Gaming (RMG): Monetization Models Compared", "category": "Game Development"},
    {"topic": "How to Optimize Asset Bundles and Memory Allocation in Unity Mobile Games", "category": "Game Development"},

    # Group 20 (August 13)
    {"topic": "Computer Vision for Quality Control: Deploying YOLOv8 Models in Manufacturing", "category": "AI"},
    {"topic": "Predictive Maintenance Models: Using IoT Telemetry Data to Prevent Equipment Failure", "category": "AI"},
    {"topic": "Building Enterprise Knowledge Graphs with Neo4j and Graph Neural Networks", "category": "AI"},

    # Group 21 (August 14)
    {"topic": "Building High-Scale Notification Engines Handling 10 Million Daily Messages", "category": "SaaS"},
    {"topic": "SaaS Churn Reduction: Using Analytics to Identify and Nudge At-Risk Accounts", "category": "SaaS"},
    {"topic": "Architecting Multi-Currency Global SaaS Checkout Flows with Dynamic Tax Calculations", "category": "SaaS"},

    # Group 22 (August 15)
    {"topic": "How Monorepo Architectures (Turborepo/Nx) Speed Up Cross-Team Code Reuse", "category": "DevOps"},
    {"topic": "Implementing Automated Security Scans (SAST/DAST) in GitHub Actions Pipelines", "category": "DevOps"},
    {"topic": "Zero-Downtime Database Schema Migrations: Expand and Contract Design Pattern", "category": "DevOps"},

    # Group 23 (August 16)
    {"topic": "How Web3 Loyalty Programs Drive Repeat Purchases for E-Commerce Brands", "category": "Web3 & Blockchain"},
    {"topic": "Building Decentralized Identity (DID) Solutions Using Verifiable Credentials", "category": "Web3 & Blockchain"},
    {"topic": "Tokenomics Blueprint: How to Design Sustainable Utility Tokens for Web3 Platforms", "category": "Web3 & Blockchain"},

    # Group 24 (August 17)
    {"topic": "Building Cross-Platform Mobile Apps with React Native and Expo Router", "category": "Mobile Apps"},
    {"topic": "How to Achieve 60FPS Animations in React Native Using Reanimated 3", "category": "Mobile Apps"},
    {"topic": "Optimizing Mobile App Launch Performance (Cold Start vs Warm Start Optimization)", "category": "Mobile Apps"},

    # Group 25 (August 18)
    {"topic": "FinTech Banking as a Service (BaaS): Integrating Core Banking APIs for Virtual Cards", "category": "FinTech"},
    {"topic": "Building Real-Time KYC and Identity Verification Workflows with AI Fraud Checks", "category": "FinTech"},
    {"topic": "Algorithmic Trading Systems: Low-Latency Execution Architecture in Python and C++", "category": "FinTech"},

    # Group 26 (August 19)
    {"topic": "Custom CRM Development vs Salesforce Customization: When to Build Custom", "category": "Software Development"},
    {"topic": "Designing Scaleable Webhooks Infrastructure for Third-Party API Integrations", "category": "Software Development"},
    {"topic": "How ElasticSearch and OpenSearch Power Instant Multi-Facet E-Commerce Filtering", "category": "Software Development"},

    # Group 27 (August 20)
    {"topic": "Building Custom AI Audio Analysis and Speech-to-Text Transcriptions with Whisper API", "category": "AI"},
    {"topic": "How Fine-Tuned LLaMA 3 Models Outperform General LLMs in Niche Business Tasks", "category": "AI"},
    {"topic": "Designing Ethical AI Governance and Bias Mitigation Frameworks for Products", "category": "AI"},

    # Group 28 (August 21)
    {"topic": "How to Build a Scalable Fantasy Sports App: Architecture, Scoring Engine and Leaderboards", "category": "Game Development"},
    {"topic": "Implementing Live Dealer Streaming and Low-Latency Video Protocols in Casino Apps", "category": "Game Development"},
    {"topic": "Building Anti-Bot Systems in Card Games Using Behavioral Analysis Algorithms", "category": "Game Development"},

    # Group 29 (August 22)
    {"topic": "How Cloud Native Security (CNAPP) Protects Kubernetes Workloads in Production", "category": "Cloud"},
    {"topic": "Architecting High-Availability Web Servers Across AWS Availability Zones", "category": "Cloud"},
    {"topic": "Managing Secrets Safely in Production Kubernetes Clusters with HashiCorp Vault", "category": "Cloud"},

    # Group 30 (August 23)
    {"topic": "SaaS Onboarding UX: How Interactive Product Tours Boost 14-Day Free Trial Conversions", "category": "SaaS"},
    {"topic": "Designing Self-Service Enterprise Dashboards with Customizable Widgets and RBAC", "category": "SaaS"},
    {"topic": "How Data Archiving and Tiered Storage Cut SaaS Infrastructure Expenses", "category": "SaaS"},

    # Group 31 (August 24)
    {"topic": "Building PWA (Progressive Web Apps) with Offline Support and Push Notifications", "category": "Web Development"},
    {"topic": "How WebGL and Three.js Power 3D Product Configurators on Modern E-Commerce Sites", "category": "Web Development"},
    {"topic": "SEO Strategies for Single Page Applications (SPAs): Dynamic Rendering vs SSR", "category": "Web Development"},

    # Group 32 (August 25)
    {"topic": "How to Hire Top 3% Senior Full-Stack Engineers Without Recruitment Agency Fees", "category": "Hiring Guide"},
    {"topic": "Evaluating Fixed Price vs Time and Materials vs Dedicated Team Contract Models", "category": "Hiring Guide"},
    {"topic": "How Remote Engineering Pods Enable 24/7 Continuous Software Development", "category": "Hiring Guide"},

    # Group 33 (August 26)
    {"topic": "Building Automated Regression Testing Suites with Playwright and Cypress in CI/CD", "category": "DevOps"},
    {"topic": "How Contract Testing (Pact.io) Prevents Breaking API Changes in Microservices", "category": "DevOps"},
    {"topic": "Designing Infrastructure Resilience: Chaos Engineering Experiments with Chaos Mesh", "category": "DevOps"}
]

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        env_path = os.path.join(os.path.dirname(__file__), ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                        break

    if not api_key:
        print("ERROR: GEMINI_API_KEY not found!")
        return

    db_path = os.path.join(os.path.dirname(__file__), "src", "data", "db.json")
    with open(db_path, "r", encoding="utf-8") as f:
        db = json.load(f)

    existing_slugs = {blog["slug"] for blog in db.get("blogs", [])}
    topics_to_generate = [t for t in TOPICS_100 if make_slug(t["topic"]) not in existing_slugs]
    
    print(f"Starting batch generation for {len(topics_to_generate)} articles...")
    start_date = datetime(2026, 7, 25, 9, 0, 0)
    
    new_articles = []
    for idx, topic_info in enumerate(topics_to_generate):
        day_offset = idx // 3
        scheduled_time = start_date + timedelta(days=day_offset)
        iso_scheduled = scheduled_time.strftime("%Y-%m-%dT%H:%M:%S.000Z")
        
        print(f"[{idx+1}/{len(topics_to_generate)}] Generating [{scheduled_time.strftime('%Y-%m-%d')}]: {topic_info['topic']}...")
        try:
            art = generate_article_with_gemini(api_key, topic_info)
            art["createdAt"] = iso_scheduled # Assign future release timestamp
            new_articles.append(art)
            print(f"  OK -> {art['slug']}")
        except Exception as e:
            print(f"  FAILED -> {e}")

        # Batch save every 3 articles to db.json
        if len(new_articles) >= 3:
            db["blogs"].extend(new_articles)
            with open(db_path, "w", encoding="utf-8") as f:
                json.dump(db, f, indent=2, ensure_ascii=False)
            print(f"Progress Saved: Total blogs in db.json = {len(db['blogs'])}")
            new_articles = []
            
        time.sleep(1) # Prevent API rate limit

    if new_articles:
        db["blogs"].extend(new_articles)
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)
        print(f"Final Save Complete! Total blogs in db.json = {len(db['blogs'])}")

if __name__ == "__main__":
    main()
