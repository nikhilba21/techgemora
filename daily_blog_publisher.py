import os
import json
import random
import http.client
import urllib.parse
from datetime import datetime

# ─────────────────────────────────────────────
# 1. Topic Bank (120+ High-Intent B2B Topics)
# ─────────────────────────────────────────────
# ─────────────────────────────────────────────
# 1. High Buyer-Intent Topic Bank (Commercial & Transactional B2B Queries)
# ─────────────────────────────────────────────
TOPICS = [
    # Dedicated Developer Hiring & Staffing (High Commercial Intent)
    {"topic": "How Much Does it Cost to Hire Dedicated Next.js Developers in 2026?", "category": "Hiring Guide"},
    {"topic": "Staff Augmentation vs Dedicated Engineering Squads: Cost & TCO Comparison", "category": "Hiring Guide"},
    {"topic": "How US & European Startups Save 50% by Renting Dedicated Developer Teams at $3.2k/Month", "category": "Hiring Guide"},
    {"topic": "Top 10 Full-Stack Software Development Companies for US Startups (2026 Ratings)", "category": "Hiring Guide"},
    {"topic": "How to Build an Offshore Dedicated Development Center (ODC) in India", "category": "Hiring Guide"},
    {"topic": "Fixed Price vs Time and Materials: Which Contract Model Delivers Better ROI?", "category": "Hiring Guide"},
    {"topic": "How to Hire Pre-Vetted Senior React and Node.js Engineers in 48 Hours", "category": "Hiring Guide"},
    {"topic": "Offshore vs Nearshore Software Development: 2026 Cost & Quality Benchmark", "category": "Hiring Guide"},
    
    # Custom SaaS & Web Application Cost & Blueprints (High Buyer Intent)
    {"topic": "How Much Does it Cost to Build a Custom SaaS Platform in 2026?", "category": "SaaS"},
    {"topic": "Building an MVP for a B2B SaaS Startup Under $30,000 in 60 Days", "category": "SaaS"},
    {"topic": "Custom Software vs Off-the-Shelf SaaS: Calculating the 5-Year Enterprise TCO", "category": "SaaS"},
    {"topic": "How to Migrate a Legacy Enterprise Monolith to Next.js 15 and Microservices", "category": "SaaS"},
    {"topic": "Designing Multi-Tenant SaaS Architectures for Enterprise Security Compliance", "category": "SaaS"},
    {"topic": "Stripe Billing & Metered Usage Integration Guide for Scaling B2B SaaS", "category": "SaaS"},

    # Real-Money Gaming & Card Games Development (High Buyer Intent)
    {"topic": "How Much Does it Cost to Build a Real-Money Rummy Game App in 2026?", "category": "Game Development"},
    {"topic": "Developing a Real-Money Poker App: Licensing, RNG Certification, and Cost", "category": "Game Development"},
    {"topic": "Top 10 Game Development Studios in India for Real-Money & Casino Apps", "category": "Game Development"},
    {"topic": "Ludo & Teen Patti Game App Development: Features, Tech Stack, and Pricing", "category": "Game Development"},
    {"topic": "How to Start an Online Casino & Aviator Crash Game Platform in 2026", "category": "Game Development"},
    {"topic": "Unity vs Unreal Engine for Mobile Game Development: Cost and Time-to-Market", "category": "Game Development"},

    # AI & Enterprise Cloud Solutions (High Buyer Intent)
    {"topic": "How Much Does it Cost to Build a Custom Enterprise AI Model in 2026?", "category": "AI"},
    {"topic": "Building a Custom Enterprise ChatGPT & RAG Search Engine for Private Data", "category": "AI"},
    {"topic": "The ROI of AI Agent Automation: Reducing Operational Overhead by 40%", "category": "AI"},
    {"topic": "How AWS Cloud Optimization Audits Reduce Monthly EC2 & RDS Spend by 35%", "category": "Cloud"},
    {"topic": "Zero Downtime Cloud Migration Guide: AWS vs Azure vs Google Cloud", "category": "Cloud"},
    
    # Mobile App Development Cost & Blueprints (High Buyer Intent)
    {"topic": "How Much Does it Cost to Build an On-Demand Service App (UrbanClap Clone)?", "category": "Mobile Apps"},
    {"topic": "Flutter vs React Native Development Cost: Which Framework Saves More Budget?", "category": "Mobile Apps"},
    {"topic": "The True Cost of Developing a HIPAA-Compliant Telehealth App in 2026", "category": "Mobile Apps"},
    {"topic": "Building a Food Delivery or Taxi Booking App: Architecture & API Pricing", "category": "Mobile Apps"}
]

# Curated Unsplash images for premium visual presentation
CATEGORY_IMAGES = {
    "AI": [
        "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
    ],
    "Web3 & Blockchain": [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800&auto=format&fit=crop"
    ],
    "SaaS": [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
    ],
    "Cloud": [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    ],
    "Software Development": [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
    ],
    "Game Development": [
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=800&auto=format&fit=crop"
    ]
}

DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
]

def make_slug(title):
    return "".join(c if c.isalnum() else "-" for c in title.lower()).replace("--", "-").strip("-")

def generate_article_with_gemini(api_key, topic_info):
    topic = topic_info["topic"]
    category = topic_info["category"]
    
    prompt = f"""Write a highly professional, SEO-optimized B2B blog article of 1500+ words for a software development company named 'Gemora Tech' on the topic: '{topic}'.
Return the output STRICTLY in JSON format with the following keys:
1. 'title': A compelling, click-worthy article title.
2. 'metaTitle': SEO title (under 60 characters).
3. 'metaDescription': Engaging search description (under 160 characters).
4. 'content': The complete body of the article in clean HTML format. Use subheadings (h2, h3), detailed paragraphs, bullet points, and clean lists. Do NOT include markdown tags around the HTML, return raw HTML string. Make it extremely detailed and informative.
5. 'faqs': A list of exactly 5 frequently asked questions and answers related to the article topic. Each FAQ object must have 'question' and 'answer' properties.
Output only the raw JSON. Do not include markdown block markers like ```json ... ```, just return the JSON object directly."""

    # Call Gemini API via http.client
    conn = http.client.HTTPSConnection("generativelanguage.googleapis.com")
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }
    
    url = f"/v1beta/models/gemini-3.5-flash:generateContent?key={api_key}"
    conn.request("POST", url, json.dumps(body), headers)
    response = conn.getresponse()
    
    if response.status != 200:
        raise Exception(f"Gemini API returned status {response.status}: {response.read().decode('utf-8')}")
        
    res_data = json.loads(response.read().decode('utf-8'))
    raw_text = res_data["candidates"][0]["content"]["parts"][0]["text"].strip()
    
    # Strip markdown block wraps if model output contains them
    if raw_text.startswith("```json"):
        raw_text = raw_text[7:]
    if raw_text.endswith("```"):
        raw_text = raw_text[:-3]
    raw_text = raw_text.strip()
    
    # Sanitize invalid backslash escapes (e.g. raw \ in text or paths)
    import re
    sanitized_text = re.sub(r'\\(?![\\"/bfnrt]|u[0-9a-fA-F]{4})', r'\\\\', raw_text)
    
    try:
        article_data = json.loads(sanitized_text)
    except json.JSONDecodeError as e:
        # Fallback to direct text parse if regex fails
        print(f"[WARNING] JSON parsing error, trying raw loads: {e}")
        article_data = json.loads(raw_text)
    
    # Attach category, slug and meta details
    article_data["category"] = category
    article_data["slug"] = make_slug(article_data["title"])
    
    # Select a random relevant Unsplash image
    images = CATEGORY_IMAGES.get(category, DEFAULT_IMAGES)
    article_data["featuredImage"] = random.choice(images)
    article_data["author"] = "Gemora Tech Team"
    article_data["published"] = True
    article_data["createdAt"] = datetime.utcnow().isoformat() + "Z"
    
    # Dynamically interlink the new article content
    try:
        from interlink_blogs import interlink_text
        article_data["content"] = interlink_text(article_data["content"], current_slug=article_data["slug"])
    except Exception as e:
        print(f"[WARNING] Dynamic interlinking failed for new article: {e}")
        
    # Serialize FAQs back into JSON string to match db.json schema
    article_data["faqs"] = json.dumps(article_data["faqs"])
    
    return article_data

def main():
    print("[LOG] Starting Daily Blog Auto-Publisher...")
    
    # 1. Load API Key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Try loading from .env file
        env_path = os.path.join(os.path.dirname(__file__), '.env')
        if os.path.exists(env_path):
            with open(env_path, 'r') as f:
                for line in f:
                    if line.strip().startswith("GEMINI_API_KEY="):
                        api_key = line.strip().split("=", 1)[1].strip('"').strip("'")
                        break
                        
    if not api_key:
        print("[ERROR] GEMINI_API_KEY not found in environment or .env file.")
        print("Please set GEMINI_API_KEY inside your .env file in the root directory.")
        return

    db_path = os.path.join(os.path.dirname(__file__), "src", "data", "db.json")
    if not os.path.exists(db_path):
        print(f"[ERROR] Database file not found at {db_path}")
        return
        
    with open(db_path, "r", encoding="utf-8") as f:
        db = json.load(f)

    existing_slugs = {blog["slug"] for blog in db.get("blogs", [])}
    
    # 2. Filter topics that haven't been published yet
    available_topics = [t for t in TOPICS if make_slug(t["topic"]) not in existing_slugs]
    
    if len(available_topics) < 3:
        print("[WARNING] Low on topics. Recycling or generating new topic bank...")
        available_topics = TOPICS # Fallback to all if exhausted
        
    # 3. Pick 3 random topics to publish
    selected_topics = random.sample(available_topics, 3)
    
    new_articles = []
    for t_info in selected_topics:
        print(f"[LOG] Generating article: \"{t_info['topic']}\" ({t_info['category']})...")
        try:
            art = generate_article_with_gemini(api_key, t_info)
            new_articles.append(art)
            print(f"[LOG] Generated slug: {art['slug']}")
        except Exception as e:
            print(f"[ERROR] Failed to generate \"{t_info['topic']}\": {e}")

    if not new_articles:
        print("[ERROR] No articles generated. Aborting update.")
        return

    # 4. Append to database
    if "blogs" not in db:
        db["blogs"] = []
        
    db["blogs"].extend(new_articles)
    
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(db, f, indent=2, ensure_ascii=False)
        
    print(f"[SUCCESS] Successfully added {len(new_articles)} new blogs to db.json!")

    # 5. Git Commit and Push to Production
    print("[LOG] Staging changes and pushing to GitHub...")
    os.system("git add src/data/db.json")
    commit_cmd = f'git commit -m "auto: daily blog publish - {datetime.now().strftime("%Y-%m-%d")}"'
    os.system(commit_cmd)
    os.system("git push origin main")
    print("[SUCCESS] Auto-Publish Run Complete!")

if __name__ == "__main__":
    main()
