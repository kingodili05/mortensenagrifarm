import { AbsoluteFill } from "remotion";
import { KenBurns } from "../components/KenBurns";
import { Caption } from "../components/Caption";
import type { PhotoScene as PhotoSceneData } from "../story";

export function PhotoScene({
  scene,
  durationInFrames,
}: {
  scene: PhotoSceneData;
  durationInFrames: number;
}) {
  return (
    <AbsoluteFill>
      <KenBurns src={scene.src} pan={scene.pan} durationInFrames={durationInFrames} />
      <Caption text={scene.caption} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
}
