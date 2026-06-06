// Sample gallery. Images use picsum.photos seeded URLs (remote placeholder).
export const galleryCategories = ["All", "Campus", "Academics", "Athletics", "Arts", "Events"];

export const gallery = [
  { id: 1, category: "Campus", alt: "Maple Ridge campus quad in autumn", seed: "campus1", w: 800, h: 600 },
  { id: 2, category: "Academics", alt: "Students collaborating in the science lab", seed: "acad1", w: 800, h: 600 },
  { id: 3, category: "Athletics", alt: "Varsity soccer match on the main field", seed: "ath1", w: 800, h: 1000 },
  { id: 4, category: "Arts", alt: "Student art exhibition in the gallery", seed: "arts1", w: 800, h: 600 },
  { id: 5, category: "Events", alt: "Spring open house welcome tent", seed: "event1", w: 800, h: 600 },
  { id: 6, category: "Campus", alt: "The Northwood library reading room", seed: "campus2", w: 800, h: 1000 },
  { id: 7, category: "Academics", alt: "Robotics club building a competition robot", seed: "acad2", w: 800, h: 600 },
  { id: 8, category: "Arts", alt: "Orchestra rehearsal in the auditorium", seed: "arts2", w: 800, h: 600 },
  { id: 9, category: "Athletics", alt: "Track and field practice at sunrise", seed: "ath2", w: 800, h: 600 },
  { id: 10, category: "Events", alt: "Commencement ceremony on the lawn", seed: "event2", w: 800, h: 1000 },
  { id: 11, category: "Campus", alt: "Aerial view of the college green", seed: "campus3", w: 800, h: 600 },
  { id: 12, category: "Academics", alt: "A small seminar discussion in progress", seed: "acad3", w: 800, h: 600 },
];

export function galleryUrl(item, width) {
  const w = width || item.w;
  const h = Math.round((w * item.h) / item.w);
  return `https://picsum.photos/seed/${item.seed}/${w}/${h}`;
}
