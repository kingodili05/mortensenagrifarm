import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { TitleScene } from "./scenes/TitleScene";
import { OutroScene } from "./scenes/OutroScene";
import { PhotoScene } from "./scenes/PhotoScene";
import {
  PHOTO_SCENES,
  TITLE_FRAMES,
  SCENE_FRAMES,
  OUTRO_FRAMES,
  TRANSITION_FRAMES,
} from "./story";

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

// TransitionSeries requires its Sequence/Transition children to be direct
// descendants, so the photo scenes are flattened into the children array
// rather than wrapped in a sub-component.
export function FarmStory() {
  const photoChildren = PHOTO_SCENES.flatMap((scene, i) => [
    <TransitionSeries.Sequence
      key={`seq-${scene.src}`}
      durationInFrames={SCENE_FRAMES}
    >
      <PhotoScene scene={scene} durationInFrames={SCENE_FRAMES} />
    </TransitionSeries.Sequence>,
    <TransitionSeries.Transition
      key={`tr-${scene.src}`}
      presentation={
        i % 2 === 0
          ? slide({ direction: "from-right" })
          : slide({ direction: "from-bottom" })
      }
      timing={timing}
    />,
  ]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c3a21" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={TITLE_FRAMES}>
          <TitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {photoChildren}

        <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}
