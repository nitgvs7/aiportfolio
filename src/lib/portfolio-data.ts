export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
] as const;

export const projects = [
  {
    code: "01",
    title: "Neurabud AI Ad",
    description: "A polished AI commercial for Neurabud, shaped around clear product storytelling and cinematic pacing.",
    src: "https://play.gumlet.io/embed/69eca0f64779ed7c8b61bc47",
    aspectRatio: "241 / 134",
    meta: ["AI Ad", "Brand Promo"],
  },
  {
    code: "02",
    title: "VFX Prompts",
    description: "Special VFX effects created through prompt-led generation, compositing, and controlled visual direction.",
    src: "https://play.gumlet.io/embed/69edc7524779ed7c8b7511db",
    aspectRatio: "43 / 24",
    meta: ["VFX Effects", "Prompt Direction"],
  },
  {
    code: "03",
    title: "AI Agents Day Promo",
    description: "A promotional film for Agents Day, the Lisbon event focused on building with AI agents.",
    src: "https://play.gumlet.io/embed/69ec9c4651e0355695cf8c86",
    aspectRatio: "16 / 9",
    meta: ["Event Promo", "AI Agents"],
  },
] as const;

export const capabilities = [
  {
    title: "Real estate promo videos",
    detail: "Cinematic property stories, luxury framing, spatial mood, and fast-scroll retention.",
  },
  {
    title: "Social media reels",
    detail: "Punchy vertical edits built around hooks, pacing, captions, and platform attention.",
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
  "Seedance 2.0",
  "Kling 3.0",
  "Runway",
  "Midjourney",
  "Grok Imagine",
  "Nano-banana 2.0",
  "Premiere",
  "Sound pacing",
  "Prompt systems",
] as const;
