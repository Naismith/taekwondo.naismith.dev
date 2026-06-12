import { Line, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

import {
  TRAINING_POINTS,
  pathPositions,
  type PatternPathStep,
  type TrainingPoint,
} from "~/utils/pattern-path";
import { cn } from "~/utils";

type PatternSceneProps = {
  steps: PatternPathStep[];
  selectedStep: number | null;
  className?: string;
};

const MAT_SIZE = 2.6;
const MAT_COLOR = "#1e3a5f";
const LINE_COLOR = "#facc15";

function DojangMat() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAT_SIZE, MAT_SIZE]} />
        <meshStandardMaterial color={MAT_COLOR} roughness={0.85} />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(MAT_SIZE * 0.92, MAT_SIZE * 0.92)]}
        />
        <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.6} />
      </lineSegments>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(MAT_SIZE * 0.46, MAT_SIZE * 0.46)]}
        />
        <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

function CornerLabel({ point }: { point: TrainingPoint }) {
  const [x, , z] = TRAINING_POINTS[point];
  const offset = 0.22;

  return (
    <Text
      position={[x * (1 + offset), 0.04, z * (1 + offset)]}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={0.12}
      color="#facc15"
      anchorX="center"
      anchorY="middle"
    >
      {point}
    </Text>
  );
}

function PathLine({ points }: { points: [number, number, number][] }) {
  const linePoints = useMemo(
    () => points.map(([x, y, z]) => [x, y + 0.02, z] as [number, number, number]),
    [points]
  );

  return (
    <Line
      points={linePoints}
      color="#fde047"
      transparent
      opacity={0.45}
      lineWidth={1}
    />
  );
}

function StepMarkers({
  steps,
  selectedStep,
}: {
  steps: PatternPathStep[];
  selectedStep: number | null;
}) {
  return (
    <>
      {steps.map((step) => {
        const isSelected = selectedStep === step.index;
        const [x, , z] = step.position;

        return (
          <mesh key={step.index} position={[x, 0.04, z]}>
            <sphereGeometry args={[isSelected ? 0.07 : 0.045, 16, 16]} />
            <meshStandardMaterial
              color={isSelected ? "#fde047" : "#ffffff"}
              emissive={isSelected ? "#ca8a04" : "#000000"}
              emissiveIntensity={isSelected ? 0.35 : 0}
            />
          </mesh>
        );
      })}
    </>
  );
}

function Practitioner({
  step,
}: {
  step: PatternPathStep | null;
}) {
  if (!step) {
    return null;
  }

  const [x, , z] = step.position;

  return (
    <group position={[x, 0, z]} rotation={[0, step.facing, 0]}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.55, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.06, 0.18, 8]} />
        <meshStandardMaterial
          color="#fde047"
          emissive="#ca8a04"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

function SceneContent({
  steps,
  selectedStep,
}: {
  steps: PatternPathStep[];
  selectedStep: number | null;
}) {
  const pathPoints = useMemo(() => pathPositions(steps), [steps]);
  const activeStep =
    selectedStep !== null ? (steps[selectedStep] ?? null) : null;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        intensity={1.1}
        position={[2.5, 4, 1.5]}
        shadow-mapSize={[1024, 1024]}
      />
      <DojangMat />
      {(["A", "B", "C", "D"] as const).map((point) => (
        <CornerLabel key={point} point={point} />
      ))}
      <PathLine points={pathPoints} />
      <StepMarkers steps={steps} selectedStep={selectedStep} />
      <Practitioner step={activeStep} />
      <OrbitControls
        enablePan={false}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2.2}
        maxDistance={5.5}
        target={[0, 0, 0]}
      />
    </>
  );
}

export function PatternScene({
  steps,
  selectedStep,
  className,
}: PatternSceneProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-black ring-1 ring-white/10",
        className
      )}
    >
      <Canvas
        shadows
        camera={{ position: [2.4, 2.8, 2.4], fov: 42 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <SceneContent steps={steps} selectedStep={selectedStep} />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none absolute bottom-2 left-3 text-[11px] text-white/35">
        Drag to orbit · A start · D forward
      </p>
    </div>
  );
}
