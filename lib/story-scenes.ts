// Narrative content for the "Feeding the World's Future" scroll experience.

export type SceneProducts = { label: string }[];

export type PhotoSceneData = {
  id: string;
  index: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  body: string;
  products?: string[];
  align?: "left" | "center" | "right";
  tone?: "dark" | "warm";
  /** Optional real 3D model (.glb) shown floating in the scene. */
  modelSrc?: string;
};

export const SCENE1: PhotoSceneData = {
  id: "scene-empty-field",
  index: "01",
  image: "/story/scenes/s1-barren-field.jpg",
  imageAlt: "A vast barren field stretching to the horizon at dawn",
  eyebrow: "The empty field",
  title: "Every harvest begins with a single opportunity.",
  body: "A lone farmer looks across dry land. Beneath the surface, potential waits.",
  align: "left",
  tone: "dark",
};

export const SCENE2: PhotoSceneData = {
  id: "scene-prepare-land",
  index: "02",
  image: "/story/scenes/s2-tractor-plow.jpg",
  imageAlt: "A tractor working and plowing the soil of a large field",
  eyebrow: "Preparing the land",
  title: "Powerful equipment transforms potential into productivity.",
  body: "Tractors break the ground. Plows turn the earth. Modern machinery brings the field to life.",
  products: ["Tractors", "Plows", "Seeders", "Irrigation systems"],
  align: "left",
  tone: "warm",
  modelSrc: "/models/tractor.glb",
};

export const SCENE5: PhotoSceneData = {
  id: "scene-technology",
  index: "05",
  image: "/story/scenes/s5-drone.jpg",
  imageAlt: "An agricultural drone flying over a green field",
  eyebrow: "Technology meets agriculture",
  title: "Modern agriculture powered by innovation.",
  body: "Drones map the fields. GPS guides every pass. Smart irrigation and live data turn farming into precision science.",
  products: ["Ag drones", "GPS guidance", "Smart irrigation", "Field sensors"],
  align: "right",
  tone: "dark",
  modelSrc: "/models/drone.glb",
};

export const SCENE6: PhotoSceneData = {
  id: "scene-harvest",
  index: "06",
  image: "/story/scenes/s6-combine.jpg",
  imageAlt: "A combine harvester moving through a golden wheat field",
  eyebrow: "Harvest season",
  title: "Efficiency at every acre.",
  body: "Combine harvesters sweep through golden fields, gathering the reward of a season's work.",
  align: "left",
  tone: "warm",
  modelSrc: "/models/combine.glb",
};

export const SCENE9: PhotoSceneData = {
  id: "scene-showcase",
  index: "09",
  image: "/story/scenes/s9-warehouse.jpg",
  imageAlt: "A vast warehouse interior stocked with agricultural equipment",
  eyebrow: "The product showcase",
  title: "Everything agriculture needs. One trusted supplier.",
  body: "From a single warehouse to farms worldwide — the full toolkit of modern agriculture.",
  products: [
    "Tractors",
    "Fertilizers",
    "Irrigation",
    "Greenhouses",
    "Seeds",
    "Sprayers",
  ],
  align: "center",
  tone: "dark",
};

export const SUPPLY_MODES = [
  { label: "Containers", img: "/story/scenes/s7-containers.jpg" },
  { label: "Cargo ships", img: "/story/scenes/s7-cargo-ship.jpg" },
  { label: "Freight rail", img: "/story/scenes/s7-freight.jpg" },
];

export const WORLD_FARMERS = [
  { region: "North America", role: "Corn farmer", img: "/story/07-farmer.jpg" },
  { region: "Africa", role: "Maize farmer", img: "/story/scenes/s8-africa-farmer.jpg" },
  { region: "Brazil", role: "Soybean farmer", img: "/story/scenes/s8-brazil-farmer.jpg" },
  { region: "Europe", role: "Wheat farmer", img: "/story/scenes/s8-europe-farmer.jpg" },
];
