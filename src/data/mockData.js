// High-fidelity Mock Data for Demo Mode (Foothold Pipeline)
// Covering four distinct idea types with complete stages.

export const mockIdeas = [
  {
    id: "coffeelink",
    title: "CoffeeLink Subscriptions",
    type: "Product/SaaS",
    short: "SaaS platform for independent local coffee shops to sell subscription coffee beans and digital loyalty stamp cards.",
    description: "An app that lets local specialty coffee shops offer subscription-based coffee bean deliveries and a unified digital loyalty card for in-store purchases, helping them fight national chains.",
    
    stage1: {
      problem: "Independent coffee shops struggle to predict recurring revenue and retain customers who default to national chains with superior digital app ecosystems.",
      targetUser: "Local coffee shop owners and daily specialty coffee drinkers who value supporting local businesses.",
      valueProposition: "A turnkey digital subscription and loyalty platform that gives local cafes the tech stack of a major corporate chain with zero code.",
      ideaType: "Product/SaaS",
      subDomain: "Hyperlocal B2B2C / Commerce Tech",
      summary: "A subscription-management and customer-loyalty platform tailored specifically for independent specialty coffee roasters and cafes."
    },
    
    stage2: [
      {
        id: "r1",
        name: "Shop Onboarding Friction",
        category: "Operational Risk",
        impact: "High",
        mitigation: "Create a 5-minute tablet-friendly setup wizard and provide a pre-configured receipt-printer integration.",
        status: "Unresolved"
      },
      {
        id: "r2",
        name: "Customer Retention Churn",
        category: "Market Risk",
        impact: "High",
        mitigation: "Implement automated subscription pause/skip options and push notifications celebrating local community impact.",
        status: "Unresolved"
      },
      {
        id: "r3",
        name: "Cafe Profit Margins",
        category: "Financial Risk",
        impact: "Medium",
        mitigation: "Charge a flat monthly fee rather than transaction commissions, keeping credit card fees to standard stripe rates.",
        status: "Unresolved"
      }
    ],
    
    stage3: {
      optimist: {
        name: "Clara 'The Catalyst' Chen",
        role: "Passionate Local Cafe Owner",
        quote: "This is exactly what we need to build a stable community base! Recurring revenue from bean subscriptions will help pay rent during slow winter months.",
        feedback: "If you can make the subscription setup take less than ten minutes, every roaster I know will sign up. The local community wants to support us; we just need to make it as convenient as ordering on Starbucks' app.",
        sentiment: "positive"
      },
      skeptic: {
        name: "Marcus 'The Auditor' Vance",
        role: "Skeptical Cafe Operations Manager",
        quote: "Cafe staff are already overwhelmed. Introducing another tablet, hardware integration, or custom workflow will break our morning rush.",
        feedback: "Our baristas don't have time to troubleshoot subscription QR codes when a line of 20 people is out the door. If this doesn't integrate natively into our existing Clover or Square POS system, it's a non-starter.",
        sentiment: "negative"
      },
      realist: {
        name: "Sarah 'The Pragmatist' Miller",
        role: "B2B SaaS Consultant & Investor",
        quote: "The value is there, but customer acquisition cost (CAC) for cafes is notoriously high and they have thin margins.",
        feedback: "Cafes are hard to sell to because they are busy running operations. Your path to validation shouldn't be building a custom app; it should be manually managing a subscription list for one high-volume shop using standard Google Sheets and email to prove the demand exists.",
        sentiment: "neutral"
      }
    },
    
    stage4: {
      plan30: {
        title: "Manual Demand Validation (Days 1-30)",
        experiments: [
          "Set up a simple landing page for a single partner cafe offering a 'Coffee Bean of the Month' email subscription.",
          "Run a 2-week paper-based 'stamp card' test at the counter to count how many regulars opt-in to track loyalty digitally."
        ],
        milestones: [
          "Secure 1 partner cafe willing to participate in the manual test.",
          "Get 20 active customers signed up for the pilot email subscription list."
        ],
        confidence: "Medium"
      },
      plan60: {
        title: "No-Code Prototype & POS Integration Test (Days 31-60)",
        experiments: [
          "Build a web-app MVP using Bubble/Glide with simple QR code scanning.",
          "Test manual fulfillment of bean orders using standard local courier services."
        ],
        milestones: [
          "Deploy the Glide web-app to the first cafe's pilot group of 50 users.",
          "Maintain a weekly churn rate below 5% during the first month."
        ],
        confidence: "Low"
      },
      plan90: {
        title: "Scale Local Network & POS Integration (Days 61-90)",
        experiments: [
          "Integrate the webhook trigger into a mock Square POS system.",
          "Launch cold email outreach to 10 additional cafes in the neighboring districts."
        ],
        milestones: [
          "Onboard 3 active cafes onto the platform.",
          "Reach $1,500 Monthly Recurring Revenue (MRR) across all subscription fees."
        ],
        confidence: "Low"
      }
    },
    
    stage5: [
      {
        id: "exp1",
        title: "Single-Cafe Email Subscription Pilot",
        description: "Manually handle the logistics: set up a Stripe Payment Link and an email list for one local cafe, text/email subscribers their weekly bean alerts, and manually deliver the beans to test if customers value local cafe subscriptions.",
        riskAddressed: "Customer Retention Churn & Value Proposition Validation"
      },
      {
        id: "exp2",
        title: "Counter Loyalty Paper Stamp Challenge",
        description: "Place a sign at the partner cafe counter offering 10% off if they register for a 'coming soon' digital loyalty card. Count the signups to measure initial consumer interest in digital loyalty.",
        riskAddressed: "Shop Onboarding Friction & Consumer Interest"
      }
    ],
    
    stage6: {
      funding_categories: [
        {
          category: "no-code/low-code prototyping grants",
          rationale: "Before committing capital to custom software development, you should build a mock-up using web tools to validate usability. Free cloud credits and web hosting packages will let you run this pilot at zero tech cost.",
          urgency: "now"
        },
        {
          category: "pre-validation micro-grants",
          rationale: "You need a small budget (~$1,000) for marketing flyers, physical POS signs, and purchasing initial delivery packaging or partner coffee bags to run the manual subscription pilot.",
          urgency: "now"
        },
        {
          category: "accelerator programs",
          rationale: "Once you have 3 cafes and proof of recurring revenue, a local or national pre-seed startup accelerator can help you raise VC capital to build out a robust POS integration team.",
          urgency: "later"
        }
      ],
      network_categories: [
        {
          category: "general-purpose founder communities",
          rationale: "Connecting with other bootstrap founders on Indie Hackers will help you select the best no-code templates and learn how they automated early customer onboarding."
        },
        {
          category: "subject-matter mentors",
          rationale: "A retail or POS industry mentor (from SCORE or GrowthMentor) can explain how Square/Clover APIs work and how to pitch local business owners without wasting time."
        }
      ],
      explicitly_not_yet: [
        "VC seed rounds (You have zero traction, custom tech, or scale yet; chasing VCs now is a major distraction).",
        "Equity Crowdfunding (Setting this up requires expensive legal filings which are not justified before you prove a single cafe wants the product)."
      ]
    }
  },
  {
    id: "pixel_economy",
    title: "Pixel Economy News",
    type: "Content/Creator",
    short: "YouTube channel and weekly newsletter explaining complex economic trends using beautiful retro pixel-art animations.",
    description: "An educational media project that makes macroeconomic trends, monetary policy, and history easy to understand for Gen Z using custom 16-bit pixel-art animations and story-driven newsletter analysis.",
    
    stage1: {
      problem: "Traditional financial and economic news is dense, dry, and alienates younger audiences, while social media finance is often clickbaity and untrustworthy.",
      targetUser: "Young adults, students, and tech workers interested in finance/economics who prefer highly visual and engaging storytelling.",
      valueProposition: "Visual-first economic education that translates complex structural systems into engaging, verified pixel-art narratives and clear newsletters.",
      ideaType: "Content/Creator",
      subDomain: "Edutainment / Media & Newsletters",
      summary: "A pixel-art based multimedia publishing platform offering accessible, objective economics lessons and trend breakdowns."
    },
    
    stage2: [
      {
        id: "r1",
        name: "High Animation Overhead",
        category: "Operational Risk",
        impact: "High",
        mitigation: "Develop a standardized library of pixel-art sprites and assets to cut down edit times from 40 hours to 10 hours per video.",
        status: "Unresolved"
      },
      {
        id: "r2",
        name: "Audience Retention & CTR",
        category: "Market Risk",
        impact: "Medium",
        mitigation: "A/B test video titles and thumbnails using concept-heavy pixel illustrations rather than generic stock photos.",
        status: "Unresolved"
      },
      {
        id: "r3",
        name: "Demonetization of Finance Topics",
        category: "Financial Risk",
        impact: "High",
        mitigation: "Diversify revenue away from YouTube AdSense early by introducing a premium Substack newsletter tier and merchandise.",
        status: "Unresolved"
      }
    ],
    
    stage3: {
      optimist: {
        name: "Leo 'The Hype' Rodriguez",
        role: "Visual Designer & Youtuber",
        quote: "This is a massive content gap! The pixel-art aesthetic is incredibly popular and will stand out immediately in a sea of talking-head videos.",
        feedback: "Audiences love high-effort animations. If your scripts are as good as the visuals, YouTube's algorithm will pick this up instantly. You could easily license these assets to universities later too.",
        sentiment: "positive"
      },
      skeptic: {
        name: "Diane 'The Producer' Sterling",
        role: "Veteran Media Producer",
        quote: "Animation is a trap for solo creators. You will burn out within two months trying to keep up with the weekly algorithm demand.",
        feedback: "Unless you are a speed-animator, a 10-minute pixel art video will take weeks. You must validate the scripting and research first. Can you build an audience with static, illustrated newsletters first before spending hundreds of hours animating?",
        sentiment: "negative"
      },
      realist: {
        name: "James 'The Strategist' Kim",
        role: "Newsletter Growth Lead",
        quote: "Newsletter monetization is much higher per-subscriber than YouTube AdSense, but you need a distribution loop.",
        feedback: "Start by writing 3 long-form economic deep-dives as static, pixel-illustrated blog posts. Share them on Reddit/Substack to see if people subscribe to the written content first. Only build videos once the script gets proven interest.",
        sentiment: "neutral"
      }
    },
    
    stage4: {
      plan30: {
        title: "Scripting & Static Asset Validation (Days 1-30)",
        experiments: [
          "Publish 3 detailed economic breakdowns on Substack with static pixel-art illustrations.",
          "Post 15-second teaser loops of pixel animations on TikTok/YouTube Shorts to test visual click-through rate (CTR)."
        ],
        milestones: [
          "Gather 100 newsletter subscribers from organic Reddit and Twitter shares.",
          "Achieve a video view count of 5,000 across short-form teaser channels."
        ],
        confidence: "High"
      },
      plan60: {
        title: "First Full-Length Pilot & Community Build (Days 31-60)",
        experiments: [
          "Release the first 8-minute fully animated YouTube video on a highly searched topic (e.g., 'How inflation actually works').",
          "Create a Discord community server for early fans to discuss topics."
        ],
        milestones: [
          "Grow the YouTube subscriber base to 500.",
          "Onboard 50 active users onto the community Discord."
        ],
        confidence: "Medium"
      },
      plan90: {
        title: "Sponsorship & Monetization Ready (Days 61-90)",
        experiments: [
          "Pitch 3 niche financial newsletters for cross-promotion.",
          "Set up the Patreon/Substack Paid tier with exclusive behind-the-scenes art sheets."
        ],
        milestones: [
          "Get 2,000 YouTube subscribers and 500 newsletter readers.",
          "Secure the first monthly paid sponsor or 10 paid Patreon members."
        ],
        confidence: "Medium"
      }
    },
    
    stage5: [
      {
        id: "exp1",
        title: "Short-Form Teaser Campaign",
        description: "Animate a single, highly engaging 30-second loop explaining a simple financial term (like 'arbitrage'). Post it on YouTube Shorts, TikTok, and Instagram Reels to test if the visual style drives traffic to a newsletter landing page.",
        riskAddressed: "High Animation Overhead & Audience Retention"
      },
      {
        id: "exp2",
        title: "Illustrated Substack Essay Release",
        description: "Write a high-quality written article about an economic event. Embed 3-4 custom static pixel-art infographics rather than animating a video. Share it in targeted communities to gauge written demand.",
        riskAddressed: "Demonetization & Production Burnout"
      }
    ],
    
    stage6: {
      funding_categories: [
        {
          category: "creator economy funds",
          rationale: "Your business is content creation. Platforms like Substack, YouTube, and Patreon offer grants, writer fellowships, and creator funds that are customized specifically for media builders who have an early audience.",
          urgency: "now"
        },
        {
          category: "pre-validation micro-grants",
          rationale: "A small grant (such as Awesome Foundation) can fund your initial drawing tablet, design software (Aseprite, Premiere Pro), or hire a voice-over artist to elevate your pilot videos.",
          urgency: "now"
        }
      ],
      network_categories: [
        {
          category: "general-purpose founder communities",
          rationale: "Communities like Indie Hackers are filled with newsletter writers who can teach you the ropes of Substack SEO, referral loops, and early sponsor outreach."
        },
        {
          category: "subject-matter mentors",
          rationale: "A veteran video editor or digital storyteller (available on ADPList) can audit your pacing, audio engineering, and visual design styles to double your audience watch-time."
        }
      ],
      explicitly_not_yet: [
        "Accelerator programs (Traditional startup accelerators like YC demand massive software/scale potential and aren't built to fund media channels).",
        "VC seed rounds (Venture capital does not back solo media channels without a proprietary technology angle)."
      ]
    }
  },
  {
    id: "ecoclean",
    title: "EcoWash Mobile Pet Grooming",
    type: "Local Service",
    short: "On-demand mobile pet grooming using eco-friendly electric vans and smart route scheduling.",
    description: "An on-demand mobile pet grooming service that operates out of converted eco-friendly electric vans, utilizing a smart scheduling system to bundle neighborhood bookings and minimize emissions.",
    
    stage1: {
      problem: "Busy pet owners struggle to find time for grooming, while traditional mobile groomers run noisy, gas-guzzling generator vans that pollute the neighborhood.",
      targetUser: "Eco-conscious, high-income urban professionals who own pets and value convenience.",
      valueProposition: "Convenient, zero-noise, eco-friendly pet grooming delivered right to your driveway.",
      ideaType: "Local Service",
      subDomain: "Local Services / Eco-Tech Operations",
      summary: "A sustainable mobile pet-care business utilizing smart scheduling software and electric vehicle operations."
    },
    
    stage2: [
      {
        id: "r1",
        name: "High Initial Capital Expenditure",
        category: "Financial Risk",
        impact: "High",
        mitigation: "Start with a rented standard van and portable washing gear to validate demand before buying a custom EV van.",
        status: "Unresolved"
      },
      {
        id: "r2",
        name: "Route Optimization Efficiency",
        category: "Operational Risk",
        impact: "Medium",
        mitigation: "Restrict early booking availability to specific zip codes on specific days to ensure high booking density.",
        status: "Unresolved"
      },
      {
        id: "r3",
        name: "Groomer Staffing Shortage",
        category: "Operational Risk",
        impact: "High",
        mitigation: "Offer above-market base pay plus a share of tips, alongside modern, noise-free working conditions to attract quality staff.",
        status: "Unresolved"
      }
    ],
    
    stage3: {
      optimist: {
        name: "Becca 'The Believer' Green",
        role: "Eco-Conscious Pet Owner",
        quote: "I hate the noisy diesel generators mobile groomers park outside my house! A silent, electric wash is something I would gladly pay extra for.",
        feedback: "My dog gets terrified of the loud generator noises. A quiet wash is a massive health benefit for anxious pets. I'd sign up for a monthly subscription in a heartbeat.",
        sentiment: "positive"
      },
      skeptic: {
        name: "Arthur 'The Analyst' Pendelton",
        role: "Local Business Franchise Consultant",
        quote: "The electric van range and generator draw will limit your daily appointments. The math on EV battery capacity doesn't work out yet.",
        feedback: "Washing and blow-drying dogs draws a lot of electricity. Running that off a van battery while driving 50 miles a day will deplete your range. You need to verify if a standard EV can handle this power load.",
        sentiment: "negative"
      },
      realist: {
        name: "Elena 'The Operator' Rostova",
        role: "Mobile Fleet Operator",
        quote: "Forget the EV vans for a second. The most important metric is route density. If you drive 30 minutes between clients, you will go bankrupt.",
        feedback: "First, see if you can get 10 pet owners in a single neighborhood to book appointments on the same day. Do a manual flyer campaign. Rent a normal truck. If you can't fill a single day in one street, the EV van doesn't matter.",
        sentiment: "neutral"
      }
    },
    
    stage4: {
      plan30: {
        title: "Neighborhood Booking Density Test (Days 1-30)",
        experiments: [
          "Distribute 200 flyers in a single targeted suburban neighborhood offering 'Silent Pet Grooming Day' for a specific Saturday.",
          "Partner with a freelance groomer and rent a standard quiet generator to run the pilot day."
        ],
        milestones: [
          "Book at least 6 grooming appointments in the exact same neighborhood on the designated day.",
          "Receive a 90%+ customer satisfaction rating in the follow-up survey."
        ],
        confidence: "High"
      },
      plan60: {
        title: "Manual Fleet Operations & Booking Software (Days 31-60)",
        experiments: [
          "Set up a simple Squarespace scheduling page restricting appointments to 2 specific zip codes.",
          "Create a financial spreadsheet calculating power draw per dog to evaluate battery specifications."
        ],
        milestones: [
          "Maintain a schedule of 15 groomings per week for 4 consecutive weeks.",
          "Break even on operating costs (gas, groomer fee, supplies) for the pilot van."
        ],
        confidence: "Medium"
      },
      plan90: {
        title: "EV Partner Pitch & Launch (Days 61-90)",
        experiments: [
          "Submit a business plan to local green business grant councils to secure EV acquisition subsidies.",
          "Introduce a 'Grooming Club' recurring membership subscription."
        ],
        milestones: [
          "Sign up 20 customers for the monthly recurring grooming plan.",
          "Secure pre-approval for a green business loan for the first electric van."
        ],
        confidence: "Low"
      }
    },
    
    stage5: [
      {
        id: "exp1",
        title: "Single-Street Booking Blitz",
        description: "Choose a wealthy, dense suburban neighborhood. Distribute door-hangers offering a discounted premium groom, but *only* if they book for the same upcoming Saturday. Test if neighborhood density can be forced manually.",
        riskAddressed: "Route Optimization Efficiency & Demand Proof"
      },
      {
        id: "exp2",
        title: "Silent Groom Portable Equipment Trial",
        description: "Book 3 grooming appointments at clients' homes, but instead of a van, use portable high-end silent blow dryers and wash basins set up in their backyard or garage. Test if the 'noise-free' aspect is a primary buying factor.",
        riskAddressed: "EV Power Math & Noise-Free Value Proposition"
      }
    ],
    
    stage6: {
      funding_categories: [
        {
          category: "subject-matter mentors",
          rationale: "Local service businesses live and die by operations, local regulations, and recruiting. Experienced local business advisors can guide you through business registration, insurance, and hiring."
          // Urgency field is added during mapping
        },
        {
          category: "pre-validation micro-grants",
          rationale: "You need a small amount of money ($500-$1,000) to print door-hangers, run localized Facebook ads, and purchase basic portable washing equipment for your pilot day."
        }
      ],
      network_categories: [
        {
          category: "general-purpose founder communities",
          rationale: "SCORE networks and local small business development centers (SBDC) are perfect places to find partners, local business grants, and operational support."
        }
      ],
      explicitly_not_yet: [
        "no-code/low-code prototyping grants (You do not need a custom software app; standard off-the-shelf booking tools like Calendly or Acuity work perfectly for now).",
        "accelerator programs (Most accelerators focus on global software scalability and won't fund a single-city service business)."
      ]
    }
  }
];
