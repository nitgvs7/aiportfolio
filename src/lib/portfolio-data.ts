export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
] as const;

export const projects = [
  {
    code: "01",
    title: "Synthetic Estate Film",
    description: "Architectural atmosphere, polished pacing, and impossible-light real estate storytelling.",
    src: "https://play.gumlet.io/embed/69eca0f64779ed7c8b61bc47",
    aspectRatio: "241 / 134",
    meta: ["AI Commercial", "Real Estate Visual"],
  },
  {
    code: "02",
    title: "Product Reality Cut",
    description: "A tactile product edit shaped with generative motion, clean rhythm, and premium finish.",
    src: "https://play.gumlet.io/embed/69edc7524779ed7c8b7511db",
    aspectRatio: "43 / 24",
    meta: ["Product Visual", "Motion Edit"],
  },
  {
    code: "03",
    title: "Cinematic AI Reel",
    description: "High-energy brand imagery built for attention, retention, and cinematic social delivery.",
    src: "https://play.gumlet.io/embed/69ec9c4651e0355695cf8c86",
    aspectRatio: "16 / 9",
    meta: ["Brand Film", "AI Reel"],
  },
] as const;

export const capabilities = [
  {
    title: "AI video editing",
    detail: "Scene flow, shot choices, transitions, speed ramps, and final cut polish.",
  },
  {
    title: "Image-to-video workflows",
    detail: "Generated stills transformed into controlled motion, camera language, and atmosphere.",
  },
  {
    title: "Real estate promo videos",
    detail: "Cinematic property stories, luxury framing, spatial mood, and fast-scroll retention.",
  },
  {
    title: "Product visuals",
    detail: "Hero shots, macro details, launch edits, and unreal-but-believable presentation.",
  },
  {
    title: "Social media reels",
    detail: "Punchy vertical edits built around hooks, pacing, captions, and platform attention.",
  },
  {
    title: "Brand storytelling",
    detail: "Visual systems, narrative beats, moodboards, and edits that feel distinct.",
  },
  {
    title: "Music video concepts",
    detail: "Surreal treatments, visual worlds, performance energy, and rhythmic cuts.",
  },
  {
    title: "Cinematic motion design",
    detail: "Light, texture, camera movement, composition, and editorial graphic details.",
  },
  {
    title: "Prompt direction",
    detail: "Specific visual prompting for consistent subjects, worlds, wardrobe, and tone.",
  },
  {
    title: "Final edit and sound pacing",
    detail: "Delivery-ready exports with sound rhythm, polish, and clean brand fit.",
  },
] as const;

export const processSteps = [
  {
    label: "Concept",
    detail: "Define the feeling, message, audience, and visual spine of the film.",
  },
  {
    label: "Image generation",
    detail: "Direct still frames, references, characters, locations, and visual continuity.",
  },
  {
    label: "AI video generation",
    detail: "Build motion tests, camera language, transitions, and scene variations.",
  },
  {
    label: "Edit and sound",
    detail: "Shape rhythm, pacing, sound moments, graphics, and final narrative pressure.",
  },
  {
    label: "Delivery",
    detail: "Export platform-ready masters for reels, ads, launches, and campaigns.",
  },
] as const;

export const capabilityTags = [
  "Runway",
  "Kling",
  "Midjourney",
  "ComfyUI",
  "Premiere",
  "After Effects",
  "Sound pacing",
  "Prompt systems",
  "Brand rhythm",
] as const;
