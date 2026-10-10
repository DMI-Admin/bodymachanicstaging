/**
 * All copy, links and lists for the site live here, so text edits never
 * require hunting through components.
 */

/** The Desi Body Reset membership lives on Skool — every "Join" button goes here. */
const SKOOL_URL = "https://www.skool.com/desi-body-reset-by-tbm-9772/about";

export const site = {
  name: "Team Bodymechanik",
  url: "https://www.teambodymechanik.com",
  title: "Desi Body Reset | Team Bodymechanik",
  description:
    "Desi Body Reset by Team Bodymechanik — South Asian fitness and fat loss coaching. Home and gym workouts, high-protein Desi recipes and coach support, without giving up the food you love.",

  nav: [
    { label: "Results", href: "#results" },
    { label: "The Membership", href: "#membership" },
    { label: "How It Works", href: "#method" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "About Us", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "#contact" },
  ],

  socials: [
    { label: "@teambodymechanik", href: "https://www.instagram.com/teambodymechanik/" },
    { label: "@coach_krish_x", href: "https://www.instagram.com/coach_krish_x/" },
  ],

  motto: "Discipline builds freedom",
  promise: "Real experience. Real support. Real results.",

  /** The main product. Prices are shown exactly as they appear on Skool. */
  membership: {
    name: "Desi Body Reset",
    by: "by TBM",
    tagline: "South Asian fitness and fat loss coaching",
    url: SKOOL_URL,
    price: "$10",
    period: "month",
    priceNote: "Founding member price",
    cta: "Join Desi Body Reset",
  },

  hero: {
    eyebrow: "Desi Body Reset — now open on Skool",
    lines: [
      { text: "Transform", gold: false },
      { text: "Your Body.", gold: true },
      { text: "Keep Your Food.", gold: false },
    ],
    lead:
      "Our online membership for South Asian women and men. Home and gym workouts, high-protein Desi recipes and direct access to your coaches — so you can lose fat and build muscle without giving up the Indian food you love.",
    features: [
      { title: "Home & Gym Workouts", text: "Follow-along training with exercise tutorials" },
      { title: "Desi Nutrition", text: "Recipes, macros and smart food swaps" },
      { title: "Coach Community", text: "Ask Krish & Nicky anything" },
    ],
  },

  stats: [
    { value: "Hundreds", label: "Of clients coached" },
    { value: "Home & Gym", label: "Workout plans" },
    { value: "Desi", label: "Recipes & food swaps" },
    { value: "$10", label: "Per month" },
  ],

  ticker: [
    "Discipline Builds Freedom",
    "Better Habits",
    "A Stronger You",
    "Keep Your Food",
    "Results That Last",
  ],

  /** What members get inside Desi Body Reset (from the Skool community page). */
  inside: {
    title: "Inside Desi Body Reset",
    subtitle:
      "Everything we use with our 1:1 clients, in one place — with new content added regularly.",
    items: [
      {
        icon: "calculator",
        title: "Calorie & Macro Calculators",
        text: "Work out exactly how much to eat for fat loss or muscle gain — the same tools we use with our coaching clients.",
      },
      {
        icon: "fork",
        title: "High-Protein Desi Recipes",
        text: "Meal ideas and healthier versions of the Indian dishes you already love.",
      },
      {
        icon: "swap",
        title: "Smart Food Swaps",
        text: "Simple swaps that cut calories without cutting out your favourite foods.",
      },
      {
        icon: "home",
        title: "Home & Gym Workouts",
        text: "Structured plans whether you train at home or in the gym.",
      },
      {
        icon: "play",
        title: "Exercise Tutorials",
        text: "Video walkthroughs so you train with good form and confidence.",
      },
      {
        icon: "dumbbell",
        title: "Strength Training Guides",
        text: "Learn how to progress your lifts and build muscle properly.",
      },
      {
        icon: "education",
        title: "Nutrition Education",
        text: "Understand the ‘why’ so you can keep your results for life.",
      },
      {
        icon: "people",
        title: "Community & Coach Access",
        text: "Ask questions, share progress and learn directly from Coach Krish and Coach Nicky.",
      },
    ],
  },

  method: {
    heading: { plain: "Join. Set up. Follow.", gold: "Progress." },
    steps: [
      {
        title: "Join",
        text: "Sign up on Skool and get instant access to the full membership on your phone or computer.",
      },
      {
        title: "Set Up",
        text: "Use the calculators to set your calories and macros for your goal.",
      },
      {
        title: "Follow",
        text: "Pick your home or gym plan and cook from the Desi recipe library.",
      },
      {
        title: "Progress",
        text: "Post questions and wins in the community and get answers from your coaches.",
      },
    ],
  },

  /** Two ways to work with TBM. The membership is the main offer. */
  plans: {
    membership: {
      name: "Desi Body Reset",
      badge: "Founding member price",
      price: "$10",
      period: "/month",
      blurb: "Our online membership. Everything you need to train, eat and progress on your own, with coach support.",
      features: [
        "Calorie & macro calculators",
        "High-protein Desi recipes & food swaps",
        "Home & gym workout plans",
        "Exercise tutorials & strength guides",
        "Community with direct coach access",
      ],
      cta: "Join on Skool",
      href: SKOOL_URL,
    },
    coaching: {
      name: "1:1 Coaching",
      badge: "Fully personalised",
      price: "£250",
      period: "/month",
      blurb: "Fully personalised coaching for people who want a plan built only for them. 3 month minimum.",
      features: [
        "Personalised nutrition and meal structure",
        "Progressive training programming",
        "Weekly check-ins and plan adjustments",
        "Progress tracking in our coaching app",
        "Direct messaging support",
      ],
      cta: "Apply for 1:1 Coaching",
      href: "#apply",
      terms: "3 month minimum",
    },
  },

  transformations: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: `/images/transformation-${n}.webp`,
    title: `Transformation ${String(n).padStart(2, "0")}`,
    alt: `Team Bodymechanik client before and after transformation ${n}`,
  })),

  testimonials: [
    {
      name: "Vanisha",
      featured: true,
      quote:
        "Thank you for creating a programme that fits into real life and delivers real results. Your knowledge, encouragement, and support have made a huge difference to me, and I couldn’t be happier with the progress I’ve made so far. I feel healthier, stronger, more confident, and overall just feel great.",
    },
    {
      name: "Kavita",
      quote:
        "I’m in the gym doing my upper body workout and realised how far I have come. Thank you again for helping me get into a routine. The workout plan is so good and I love it! I enjoy lifting weights so much more than before. The confidence I have gained is on another level.",
    },
    {
      name: "Vibha",
      quote:
        "Winning the Christmas transformation has genuinely been life-changing. I feel stronger and fitter, but I’ve also developed a completely different mindset. I’ve gone from making excuses to making progress. You kept me consistent, accountable and motivated every step of the way.",
    },
    {
      name: "Nisha",
      quote:
        "The workout plan has helped me become more comfortable and confident in the gym. I no longer feel intimidated, I actually enjoy my workouts, I’m able to push myself more and I genuinely look forward to training.",
    },
    {
      name: "Ankush",
      quote:
        "When I had my consultation with Krish and Nick and told them I drank 4–5 times a week, Nick said, “Sorry, we can’t help you.” Right at that moment I knew these two could actually help me because they were so honest and genuine. That’s what made me join the plan.",
    },
    {
      name: "Puja",
      quote:
        "This is the first programme I’ve done where I consistently completed the workouts through the first week. With other programmes I would manage one or two and that was it. I’m so proud that I stayed consistent. The coaching has been amazing and I’m super grateful.",
    },
  ],

  faq: [
    {
      q: "What is Desi Body Reset?",
      a: "It's our online membership on Skool for South Asian women and men who want to lose fat, build muscle and get healthier without giving up Indian food. You get workouts, recipes, calculators, guides and a community where you can ask Coach Krish and Coach Nicky questions.",
    },
    {
      q: "Do I need a gym?",
      a: "No. There are workout plans for home and for the gym, so you can start wherever you train.",
    },
    {
      q: "Do I have to stop eating Indian food?",
      a: "No — that's the whole point. You'll learn how to fit the food you love into your goals, with high-protein Desi recipes and simple swaps.",
    },
    {
      q: "I'm a complete beginner. Is this for me?",
      a: "Yes. The exercise tutorials and guides start from the basics, and you can ask the coaches and community whenever you're unsure.",
    },
    {
      q: "How do I access it?",
      a: "Desi Body Reset runs on Skool. Once you join you can use it in your web browser or in the free Skool app on your phone.",
    },
    {
      q: "What's the difference between the membership and 1:1 coaching?",
      a: "The membership gives you our tools, plans and community to follow at your own pace. 1:1 coaching is fully personalised: your own nutrition and training plan, weekly check-ins and direct messaging with your coach.",
    },
  ],

  goals: ["Fat loss", "Body recomposition", "Build muscle", "Improve fitness"],
} as const;
