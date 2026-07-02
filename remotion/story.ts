// Farm-story script: image scenes + captions, in narrative order.
// Swap an image by replacing the file in public/story and re-rendering.

export type Pan = "up" | "down" | "left" | "right";

export type PhotoScene = {
  src: string;
  caption: string;
  pan: Pan;
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TITLE_FRAMES = 95;
export const SCENE_FRAMES = 105;
export const OUTRO_FRAMES = 135;
export const TRANSITION_FRAMES = 26;

export const PHOTO_SCENES: PhotoScene[] = [
  { src: "story/01-aerial-farmland.jpg", caption: "It starts with the land", pan: "down" },
  { src: "story/02-tractor-field.jpg", caption: "Worked with care, season after season", pan: "left" },
  { src: "story/03-soil-hands.jpg", caption: "Healthy soil is everything", pan: "up" },
  { src: "story/04-crop-rows.jpg", caption: "We supply organic manure & fertilizer", pan: "right" },
  { src: "story/05-compost.jpg", caption: "Composted · Pelletized · Vermicompost", pan: "up" },
  { src: "story/06-harvest.jpg", caption: "For stronger, healthier harvests", pan: "left" },
  { src: "story/07-farmer.jpg", caption: "Trusted by growers worldwide", pan: "down" },
  { src: "story/08-export-port.jpg", caption: "Delivered across the U.S., Africa & beyond", pan: "right" },
];

// Total frames once transition overlaps are subtracted.
export const TOTAL_SEQUENCES =
  TITLE_FRAMES + PHOTO_SCENES.length * SCENE_FRAMES + OUTRO_FRAMES;
export const TOTAL_TRANSITIONS = PHOTO_SCENES.length + 1; // title->p1 ... p8->outro
export const FARM_STORY_DURATION =
  TOTAL_SEQUENCES - TOTAL_TRANSITIONS * TRANSITION_FRAMES;

// Brand palette (mirrors app/globals.css tokens).
export const BRAND = {
  forest900: "#0c3a21",
  forest800: "#14532d",
  forest700: "#166534",
  harvest400: "#facc15",
  harvest300: "#fde047",
  cream: "#faf9f5",
  steel300: "#cbd5e1",
} as const;
