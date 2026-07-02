import { Composition } from "remotion";
import { FarmStory } from "./FarmStory";
import { FPS, WIDTH, HEIGHT, FARM_STORY_DURATION } from "./story";

export function RemotionRoot() {
  return (
    <Composition
      id="FarmStory"
      component={FarmStory}
      durationInFrames={FARM_STORY_DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
}
