/**
 * All copy, links and lists for the site live here, so text edits never
 * require hunting through components.
 */
export const site = {
  name: "Team Bodymechanik",
  url: "https://www.teambodymechanik.com",
  title: "Team Bodymechanik | Online Coaching",
  description:
    "Team Bodymechanik — premium online coaching for fat loss, muscle building and body transformation.",

  nav: [
    { label: "Coaching", href: "#coaching" },
    { label: "How It Works", href: "#method" },
    { label: "Results", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About Us", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "#contact" },
  ],

  socials: [
    { label: "@teambodymechanik", href: "https://www.instagram.com/teambodymechanik/" },
    { label: "@coach_krish_x", href: "https://www.instagram.com/coach_krish_x/" },
  ],

  hero: {
    eyebrow: "Premium online body transformation coaching",
    lead:
      "Structured nutrition, progressive training and real accountability for women and men who are ready to stop guessing and start getting results.",
    features: [
      { title: "Tailored Nutrition", text: "Built around your goal and lifestyle" },
      { title: "Progressive Training", text: "A clear structure with purpose" },
      { title: "Weekly Coaching", text: "Data, feedback and accountability" },
    ],
  },

  stats: [
    { value: "1:1", label: "Personalised Coaching" },
    { value: "Weekly", label: "Progress Reviews" },
    { value: "Data-Led", label: "Plan Adjustments" },
    { value: "Real", label: "Accountability" },
  ],

  ticker: ["Discipline", "Consistency", "Transformation", "Accountability", "Results That Last"],

  coaching: [
    "Personalised nutrition and meal structure",
    "Progressive training programming",
    "Weekly check-ins and plan adjustments",
    "Daily accountability standards",
    "Progress tracking through photos, weight and training data",
    "Education that helps you keep the result",
  ],

  method: [
    {
      title: "Assess",
      text: "We establish your starting point, goals, lifestyle, training history and current habits.",
    },
    {
      title: "Build",
      text: "Your nutrition, training, steps and cardio are structured around what you actually need.",
    },
    {
      title: "Adjust",
      text: "We review the data weekly and make evidence-led changes when your progress requires them.",
    },
    {
      title: "Achieve",
      text: "You build the physique, habits and understanding needed to maintain your results long term.",
    },
  ],

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
      q: "Who is Team Bodymechanik coaching for?",
      a: "Adults who want structured coaching for fat loss, body recomposition, muscle building and improved fitness.",
    },
    {
      q: "Is the coaching online?",
      a: "Yes. Your nutrition, training, check-ins, progress tracking and coaching communication are delivered online.",
    },
    {
      q: "Do I need to be experienced in the gym?",
      a: "No. Your programme is built around your current level and progresses from there.",
    },
    {
      q: "Will my plan change?",
      a: "Yes, when the data shows that a change is needed. Adjustments are based on progress, adherence and performance rather than guesswork.",
    },
  ],

  goals: ["Fat loss", "Body recomposition", "Build muscle", "Improve fitness"],
} as const;
