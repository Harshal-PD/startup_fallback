// Curated Resource Dataset for Stage 7 (Resource Retrieval)
// Categorized by resource category and filtered by idea type compatibility.

export const resourcesData = [
  // --- PRE-VALIDATION MICRO-GRANTS ---
  {
    id: "pioneer",
    name: "Pioneer",
    type: "grant & community",
    url: "https://pioneer.app",
    category: "pre-validation micro-grants",
    idea_types: ["product", "research"],
    stage_fit: "idea/pre-validation",
    notes: "A global incubator for creative people. Pitch your idea, complete weekly tasks, and climb the leaderboard to win small grants ($1,000-$5,000) and access to a powerful founder network."
  },
  {
    id: "emergent_ventures",
    name: "Emergent Ventures",
    type: "fellowship & grant",
    url: "https://www.mercatus.org/emergent-ventures",
    category: "pre-validation micro-grants",
    idea_types: ["product", "research"],
    stage_fit: "idea/pre-validation",
    notes: "A fellowship and grant program by Tyler Cowen at the Mercatus Center. Great for highly ambitious, unconventional projects, research ideas, or social enterprises."
  },
  {
    id: "thiel_fellowship",
    name: "Thiel Fellowship",
    type: "fellowship",
    url: "https://thielfellowship.org",
    category: "pre-validation micro-grants",
    idea_types: ["product", "research"],
    stage_fit: "idea/pre-validation",
    notes: "For founders under 22 who want to drop out of college to build. Provides $100,000 in equity-free funding and mentorship from top silicon valley builders."
  },
  {
    id: "pomeroy_fund",
    name: "Awesome Foundation Grants",
    type: "micro-grant",
    url: "https://www.awesomefoundation.org",
    category: "pre-validation micro-grants",
    idea_types: ["product", "service", "research", "content"],
    stage_fit: "idea/pre-validation",
    notes: "Provides $1,000 micro-grants every month to awesome, creative projects with no strings attached. Ideal for local community services, art projects, and creative physical products."
  },

  // --- CREATOR ECONOMY FUNDS ---
  {
    id: "youtube_creator_collective",
    name: "YouTube Creator Collective",
    type: "program",
    url: "https://creators.youtube.com",
    category: "creator economy funds",
    idea_types: ["content"],
    stage_fit: "pre-validation",
    notes: "Resources and community support for growing channels. Ideal for educators, video creators, and niche media builders looking to scale audience engagement."
  },
  {
    id: "substack_grow",
    name: "Substack Local & Writer Grants",
    type: "grant",
    url: "https://substack.com/writer-resources",
    category: "creator economy funds",
    idea_types: ["content"],
    stage_fit: "pre-validation",
    notes: "Periodic fellowship and support grants for independent writers, journalists, and educators starting targeted newsletters."
  },
  {
    id: "patreon_creator_grants",
    name: "Patreon Creator Hub",
    type: "community & guides",
    url: "https://creatorhub.patreon.com",
    category: "creator economy funds",
    idea_types: ["content", "service"],
    stage_fit: "idea/pre-validation",
    notes: "Guides and community mentoring on setting up membership networks, tier pricing, and sustaining creative work directly from audience contributions."
  },

  // --- NO-CODE / LOW-CODE PROTOTYPING GRANTS ---
  {
    id: "aws_activate_founders",
    name: "AWS Activate Founders",
    type: "cloud credits",
    url: "https://aws.amazon.com/activate/founders/",
    category: "no-code/low-code prototyping grants",
    idea_types: ["product"],
    stage_fit: "pre-validation",
    notes: "Offers self-funded and pre-seed startups $1,000 in AWS credits, technical support, and training to build their initial MVP or backend infrastructure."
  },
  {
    id: "bubble_startups",
    name: "Bubble for Startups",
    type: "no-code credits",
    url: "https://bubble.io/startups",
    category: "no-code/low-code prototyping grants",
    idea_types: ["product"],
    stage_fit: "pre-validation",
    notes: "Provides up to $5,000 in platform credits for new startups to build web apps without code. Perfect for non-technical founders validation testing SaaS concepts."
  },
  {
    id: "webflow_startup_program",
    name: "Webflow for Startups",
    type: "credits & templates",
    url: "https://webflow.com/startups",
    category: "no-code/low-code prototyping grants",
    idea_types: ["product", "service", "content"],
    stage_fit: "pre-validation",
    notes: "Get 12 months of free Webflow CMS hosting, templates, and support to build landing pages or directory sites to validate customer demand."
  },

  // --- GENERAL-PURPOSE FOUNDER COMMUNITIES ---
  {
    id: "indie_hackers",
    name: "Indie Hackers",
    type: "community",
    url: "https://www.indiehackers.com",
    category: "general-purpose founder communities",
    idea_types: ["product", "service", "content"],
    stage_fit: "any",
    notes: "The premier community for bootstrap founders and solo builders. Share your weekly progress, get feedback on landing pages, and find co-founders or early users."
  },
  {
    id: "product_hunt",
    name: "Product Hunt Ship & Launch",
    type: "community & launchpad",
    url: "https://www.producthunt.com/ship",
    category: "general-purpose founder communities",
    idea_types: ["product"],
    stage_fit: "pre-validation",
    notes: "Tooling and community spaces to build a launch waiting list, surveys, and teaser pages before launching to the public."
  },
  {
    id: "kernal",
    name: "Kernal",
    type: "idea sharing network",
    url: "https://kern.al",
    category: "general-purpose founder communities",
    idea_types: ["product", "service"],
    stage_fit: "idea",
    notes: "A dedicated community for sharing startup ideas before building them. Get votes, feedback, and early interest from other builders and pre-seed angels."
  },

  // --- DOMAIN-SPECIFIC ACCELERATORS ---
  {
    id: "y_combinator",
    name: "Y Combinator",
    type: "accelerator",
    url: "https://www.ycombinator.com",
    category: "accelerator programs",
    idea_types: ["product", "research"],
    stage_fit: "post-validation",
    notes: "The world's top startup accelerator. Invests $500,000 for 7% equity and guides you through 3 months of intense scaling. High bar; requires clear proof-of-concept."
  },
  {
    id: "techstars",
    name: "Techstars",
    type: "accelerator",
    url: "https://www.techstars.com",
    category: "accelerator programs",
    idea_types: ["product", "service"],
    stage_fit: "post-validation",
    notes: "A highly selective mentor-driven global startup accelerator. Provides $120,000 funding, hands-on mentorship, and a vast corporate network."
  },
  {
    id: "pear_x",
    name: "PearX",
    type: "pre-seed program",
    url: "https://www.pear.vc/pear-x",
    category: "accelerator programs",
    idea_types: ["product", "research"],
    stage_fit: "pre-validation",
    notes: "A 14-week bootcamp for early-stage teams. Helps with customer discovery, finding co-founders, and pitch design. Often invests before there is a full product."
  },

  // --- SUBJECT-MATTER MENTORS ---
  {
    id: "growthmentor",
    name: "GrowthMentor",
    type: "mentorship network",
    url: "https://www.growthmentor.com",
    category: "subject-matter mentors",
    idea_types: ["product", "service", "content"],
    stage_fit: "any",
    notes: "A curated platform to book 1-on-1 video calls with vetted startup growth marketing, SEO, product, and UX mentors. Extremely helpful for demand-testing strategies."
  },
  {
    id: "score",
    name: "SCORE Mentors",
    type: "free mentoring",
    url: "https://www.score.org",
    category: "subject-matter mentors",
    idea_types: ["service", "product"],
    stage_fit: "any",
    notes: "A network of retired executives offering 100% free, ongoing business mentoring sponsored by the US Small Business Administration. Outstanding for local services and business structure."
  },
  {
    id: "adplist",
    name: "ADPList",
    type: "design & product mentors",
    url: "https://adplist.org",
    category: "subject-matter mentors",
    idea_types: ["product", "content"],
    stage_fit: "any",
    notes: "Free global mentoring network focused on Product Design, UX Research, Product Management, and engineering architecture. Great for getting your MVP UI critiqued."
  }
];

// Helper to retrieve resources based on matched categories and idea types
export function filterResources(matchedCategories, ideaType) {
  if (!matchedCategories || matchedCategories.length === 0) return [];
  
  // Normalize ideaType to match the keys in idea_types
  // e.g. "product/SaaS" -> "product"
  let normalizedType = "product";
  const lowerType = String(ideaType).toLowerCase();
  if (lowerType.includes("product") || lowerType.includes("saas")) {
    normalizedType = "product";
  } else if (lowerType.includes("content") || lowerType.includes("creator")) {
    normalizedType = "content";
  } else if (lowerType.includes("service") || lowerType.includes("local")) {
    normalizedType = "service";
  } else if (lowerType.includes("research") || lowerType.includes("nonprofit") || lowerType.includes("charity")) {
    normalizedType = "research";
  }

  // Filter the database
  return resourcesData.filter(res => {
    // Check if the resource category is in the matched list
    const hasCategory = matchedCategories.some(cat => 
      res.category.toLowerCase() === cat.toLowerCase()
    );
    
    // Check if the resource is compatible with the idea type
    const hasIdeaType = res.idea_types.includes(normalizedType);
    
    return hasCategory && hasIdeaType;
  });
}
