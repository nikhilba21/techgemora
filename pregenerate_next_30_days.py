import os
import json
import time
import random
from datetime import datetime, timedelta
from daily_blog_publisher import generate_article_with_gemini, make_slug, CATEGORY_IMAGES, DEFAULT_IMAGES

# Load Gemini API Key from .env or .env.local
api_key = os.environ.get("GEMINI_API_KEY")
for env_name in [".env", ".env.local"]:
    if not api_key and os.path.exists(env_name):
        with open(env_name, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip().startswith("GEMINI_API_KEY="):
                    api_key = line.strip().split("=", 1)[1].strip('"').strip("'")
                    break

if not api_key:
    print("Error: GEMINI_API_KEY missing in .env or .env.local")
    exit(1)

# High Buyer-Intent Topics for July 30 onwards
SCHEDULED_TOPICS = [
    # July 30, 2026 (Today)
    {"date": "2026-07-30", "topic": "How Much Does it Cost to Build an App Like Uber in 2026? (Taxi Booking Architecture & Budget)", "category": "B2C App Blueprints"},
    {"date": "2026-07-30", "topic": "How to Build a B2B SaaS CRM App Like Salesforce from Scratch", "category": "B2B App Blueprints"},
    {"date": "2026-07-30", "topic": "How Much Does it Cost to Build a Real-Money Rummy Game App in 2026?", "category": "Game Development"},

    # July 31, 2026
    {"date": "2026-07-31", "topic": "How to Build an App Like Airbnb: Multi-Vendor Rental Marketplace Cost & Tech Stack", "category": "B2C App Blueprints"},
    {"date": "2026-07-31", "topic": "How Much Does it Cost to Build an Enterprise ERP System Like SAP or NetSuite?", "category": "B2B App Blueprints"},
    {"date": "2026-07-31", "topic": "How to Build an Offshore Dedicated Development Center (ODC) in India", "category": "Hiring Guide"},

    # August 01, 2026
    {"date": "2026-08-01", "topic": "How Much Does it Cost to Build a Quick-Commerce App Like Zepto or Blinkit?", "category": "B2C App Blueprints"},
    {"date": "2026-08-01", "topic": "How to Build a B2B Team Collaboration App Like Slack or Microsoft Teams", "category": "B2B App Blueprints"},
    {"date": "2026-08-01", "topic": "Staff Augmentation vs Dedicated Engineering Squads: Cost & TCO Comparison", "category": "Hiring Guide"},

    # August 02, 2026
    {"date": "2026-08-02", "topic": "How to Build an Astrology App Like Astrotalk: Live Consultation & Wallet System", "category": "B2C App Blueprints"},
    {"date": "2026-08-02", "topic": "How Much Does it Cost to Build a Real Estate App Like Zillow with MLS/IDX Integration?", "category": "B2B App Blueprints"},
    {"date": "2026-08-02", "topic": "Developing a Real-Money Poker App: Licensing, RNG Certification, and Cost", "category": "Game Development"},

    # August 03, 2026
    {"date": "2026-08-03", "topic": "How Much Does it Cost to Build a Telehealth App Like Teladoc or Zocdoc in 2026?", "category": "B2C App Blueprints"},
    {"date": "2026-08-03", "topic": "How to Build a Supply Chain & Freight Logistics Tracking Platform Like Flexport", "category": "B2B App Blueprints"},
    {"date": "2026-08-03", "topic": "How US Startups Save 50% by Renting Dedicated Developer Teams at $3.2k/Month", "category": "Hiring Guide"},

    # August 04, 2026
    {"date": "2026-08-04", "topic": "How to Build a Fitness & Workout Tracking App Like Strava or MyFitnessPal", "category": "B2C App Blueprints"},
    {"date": "2026-08-04", "topic": "How Much Does it Cost to Build an E-Learning LMS Platform Like Coursera or Udemy?", "category": "B2B App Blueprints"},
    {"date": "2026-08-04", "topic": "Top 10 Game Development Studios in India for Real-Money & Casino Apps", "category": "Game Development"},

    # August 05, 2026
    {"date": "2026-08-05", "topic": "How Much Does it Cost to Build a Food Delivery App Like UberEats or DoorDash?", "category": "B2C App Blueprints"},
    {"date": "2026-08-05", "topic": "How to Build a FinTech Ledger & Invoice Automation Platform Like Stripe or Ramp", "category": "B2B App Blueprints"},
    {"date": "2026-08-05", "topic": "Fixed Price vs Time and Materials: Which Contract Model Delivers Better ROI?", "category": "Hiring Guide"}
]

print(f"Starting pre-generation of {len(SCHEDULED_TOPICS)} high buyer-intent articles...")

db_path = "src/data/db.json"
with open(db_path, "r", encoding="utf-8") as f:
    db_data = json.load(f)

existing_slugs = set(b.get("slug") for b in db_data.get("blogs", []))

new_articles = []
for idx, item in enumerate(SCHEDULED_TOPICS):
    date_str = item["date"]
    topic = item["topic"]
    category = item["category"]
    
    slug = make_slug(topic)
    if slug in existing_slugs:
        print(f"[{idx+1}/{len(SCHEDULED_TOPICS)}] Skipping existing: {slug}")
        continue

    print(f"[{idx+1}/{len(SCHEDULED_TOPICS)}] Generating [{date_str}] ({category}): {topic}...")
    try:
        art = generate_article_with_gemini(api_key, {"topic": topic, "category": category})
        
        # Format timestamps
        # Spread timestamps across 08:00, 12:00, and 16:00 UTC
        hour_offset = (idx % 3) * 4 + 8
        created_iso = f"{date_str}T{hour_offset:02d}:00:00.000Z"

        images = CATEGORY_IMAGES.get(category, DEFAULT_IMAGES)
        featured_image = random.choice(images)

        blog_entry = {
            "id": f"blog-{int(time.time())}-{random.randint(100, 999)}",
            "title": art.get("title", topic),
            "slug": slug,
            "category": category,
            "metaDescription": art.get("metaDescription", "")[:160],
            "content": art.get("content", ""),
            "author": "Engineering Team @ Gemora Tech",
            "readTime": "8 min read",
            "featuredImage": featured_image,
            "published": True,
            "createdAt": created_iso,
            "updatedAt": created_iso,
            "faqs": art.get("faqs", [])
        }

        db_data["blogs"].insert(0, blog_entry)
        existing_slugs.add(slug)
        new_articles.append(slug)
        print(f"  --> Successfully generated & added: {slug} (Scheduled: {created_iso})")
        
        # Save after each article
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(db_data, f, indent=2, ensure_ascii=False)
            
        time.sleep(2) # Avoid rate limits
    except Exception as e:
        print(f"  --> Failed to generate '{topic}': {e}")

print(f"\nFinished! Added {len(new_articles)} new pre-scheduled buyer intent articles to db.json.")
