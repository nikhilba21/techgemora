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

# High Buyer-Intent Topics for August 06 to August 25, 2026
SCHEDULED_TOPICS = [
    # August 06, 2026
    {"date": "2026-08-06", "topic": "How Much Does it Cost to Build a B2C Pharmacy Delivery App Like 1mg or PharmEasy?", "category": "B2C App Blueprints"},
    {"date": "2026-08-06", "topic": "How to Build an AI-Powered B2B Customer Support Desk Like Zendesk or Intercom", "category": "B2B App Blueprints"},
    {"date": "2026-08-06", "topic": "Offshore Development Rates in 2026: India vs Eastern Europe vs LATAM", "category": "Hiring Guide"},

    # August 07, 2026
    {"date": "2026-08-07", "topic": "How to Build a Car Rental & Fleet Management App Like Turo or Hertz", "category": "B2C App Blueprints"},
    {"date": "2026-08-07", "topic": "How Much Does it Cost to Build an Enterprise HRMS & Payroll System Like Workday?", "category": "B2B App Blueprints"},
    {"date": "2026-08-07", "topic": "How to Hire Top 1% React Native & Flutter Engineers from India in 48 Hours", "category": "Hiring Guide"},

    # August 08, 2026
    {"date": "2026-08-08", "topic": "How Much Does it Cost to Build an On-Demand Home Services App Like UrbanClap / Urban Company?", "category": "B2C App Blueprints"},
    {"date": "2026-08-08", "topic": "How to Build a B2B E-Commerce Marketplace Platform for Wholesale Suppliers", "category": "B2B App Blueprints"},
    {"date": "2026-08-08", "topic": "Developing 3D Unity Multiplayer Games: Server Infrastructure & Cost Breakdown", "category": "Game Development"},

    # August 09, 2026
    {"date": "2026-08-09", "topic": "How to Build an Event Ticketing & Concert Booking App Like BookMyShow or Eventbrite", "category": "B2C App Blueprints"},
    {"date": "2026-08-09", "topic": "How Much Does it Cost to Build a Contract Lifecycle Management (CLM) SaaS Platform?", "category": "B2B App Blueprints"},
    {"date": "2026-08-09", "topic": "Why US Tech Companies Hire Dedicated Engineering Squads for Product Acceleration", "category": "Hiring Guide"},

    # August 10, 2026
    {"date": "2026-08-10", "topic": "How Much Does it Cost to Build a Social Networking App Like Instagram or TikTok Clone?", "category": "B2C App Blueprints"},
    {"date": "2026-08-10", "topic": "How to Build a Custom AI Document Scanner & OCR Data Extraction Tool", "category": "B2B App Blueprints"},
    {"date": "2026-08-10", "topic": "Developing Real-Money Ludo & Board Games: RNG Logic, Payments & Cost", "category": "Game Development"},

    # August 11, 2026
    {"date": "2026-08-11", "topic": "How to Build a Laundry & Dry Cleaning On-Demand App Like Laundryheap", "category": "B2C App Blueprints"},
    {"date": "2026-08-11", "topic": "How Much Does it Cost to Build a Warehouse Management System (WMS) with Barcode / RFID Integration?", "category": "B2B App Blueprints"},
    {"date": "2026-08-11", "topic": "Dedicated Developers vs Agency Retainers: Cost, Productivity & Flexibility Analysis", "category": "Hiring Guide"},

    # August 12, 2026
    {"date": "2026-08-12", "topic": "How Much Does it Cost to Build a Matrimony & Dating App Like Bumble or Tinder?", "category": "B2C App Blueprints"},
    {"date": "2026-08-12", "topic": "How to Build a Custom B2B Billing & Subscription SaaS Billing Engine", "category": "B2B App Blueprints"},
    {"date": "2026-08-12", "topic": "Building High-Concurrency Fantasy Sports Apps: AWS Setup & Architecture", "category": "Game Development"},

    # August 13, 2026
    {"date": "2026-08-13", "topic": "How to Build an E-Scooter & Bike Sharing IoT App Like Lime or Bird", "category": "B2C App Blueprints"},
    {"date": "2026-08-13", "topic": "How Much Does it Cost to Build a Custom Procurement & Supplier Management System?", "category": "B2B App Blueprints"},
    {"date": "2026-08-13", "topic": "Top Mistakes Startups Make When Hiring Offshore Software Developers (And How to Avoid Them)", "category": "Hiring Guide"},

    # August 14, 2026
    {"date": "2026-08-14", "topic": "How Much Does it Cost to Build an Online Doctor Appointment App Like Zocdoc?", "category": "B2C App Blueprints"},
    {"date": "2026-08-14", "topic": "How to Build an AI-Powered Fleet Telematics & Driver Safety Platform", "category": "B2B App Blueprints"},
    {"date": "2026-08-14", "topic": "Building Casino Slot Machine Games: Math Models, RNG Certification & Costs", "category": "Game Development"},

    # August 15, 2026
    {"date": "2026-08-15", "topic": "How to Build a Hyperlocal Grocery Delivery App Like Instacart in 2026", "category": "B2C App Blueprints"},
    {"date": "2026-08-15", "topic": "How Much Does it Cost to Build an Enterprise Project Management Tool Like Asana or Jira?", "category": "B2B App Blueprints"},
    {"date": "2026-08-15", "topic": "How to Scale a Software Product Team from 5 to 50 Developers Efficiently", "category": "Hiring Guide"},

    # August 16, 2026
    {"date": "2026-08-16", "topic": "How Much Does it Cost to Build a Parcel & Courier Delivery Tracker App Like FedEx / DHL?", "category": "B2C App Blueprints"},
    {"date": "2026-08-16", "topic": "How to Build an AI Financial Forecasting & Expense Tracking Dashboard for CFOs", "category": "B2B App Blueprints"},
    {"date": "2026-08-16", "topic": "Why Indian Game Engineering Studios are Leading global Real-Money iGaming Development", "category": "Game Development"},

    # August 17, 2026
    {"date": "2026-08-17", "topic": "How to Build a Multi-Restaurant Ordering System with POS Integration", "category": "B2C App Blueprints"},
    {"date": "2026-08-17", "topic": "How Much Does it Cost to Build a Custom Identity Verification & KYC SaaS Platform?", "category": "B2B App Blueprints"},
    {"date": "2026-08-17", "topic": "How Dedicated Software Squads Provide 24/7 Overlapping Development Coverage", "category": "Hiring Guide"},

    # August 18, 2026 (Today)
    {"date": "2026-08-18", "topic": "How Much Does it Cost to Build a Car Wash & Detailing On-Demand Booking App in 2026?", "category": "B2C App Blueprints"},
    {"date": "2026-08-18", "topic": "How to Build a High-Throughput B2B Payment Gateway Integration with Multi-Currency Settlement", "category": "B2B App Blueprints"},
    {"date": "2026-08-18", "topic": "How Much Does it Cost to Build an Aviator / Crash Game App in 2026?", "category": "Game Development"},

    # August 19, 2026
    {"date": "2026-08-19", "topic": "How to Build a Beauty Salon & Spa Appointment Booking App Like Mindbody", "category": "B2C App Blueprints"},
    {"date": "2026-08-19", "topic": "How Much Does it Cost to Build a Custom Business Intelligence (BI) Analytics Dashboard?", "category": "B2B App Blueprints"},
    {"date": "2026-08-19", "topic": "Key Differences Between Hiring Freelancers vs Managed Dedicated Engineering Squads", "category": "Hiring Guide"},

    # August 20, 2026
    {"date": "2026-08-20", "topic": "How Much Does it Cost to Build an EdTech Video Learning App Like Byju's or Duolingo?", "category": "B2C App Blueprints"},
    {"date": "2026-08-20", "topic": "How to Build an AI-Driven Inventory Forecasting Engine for Supply Chain Operations", "category": "B2B App Blueprints"},
    {"date": "2026-08-20", "topic": "Developing Card Games Like Teen Patti & Blackjack: Multiplayer State Management & Security", "category": "Game Development"}
]

print(f"Starting pre-generation of {len(SCHEDULED_TOPICS)} articles for August 06 to August 20, 2026...")

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
        
        # Set timestamp to 00:00:00.000Z so it is visible immediately on that date
        created_iso = f"{date_str}T00:00:00.000Z"

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
            
        time.sleep(1.5) # Avoid rate limits
    except Exception as e:
        print(f"  --> Failed to generate '{topic}': {e}")

print(f"\nFinished! Added {len(new_articles)} new pre-scheduled buyer intent articles to db.json.")
