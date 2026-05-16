"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh, ShaderMaterial } from "three";
import * as THREE from "three";
import { BufferGeometry, Float32BufferAttribute, MathUtils } from "three";

// Create a 57-facet round brilliant cut diamond geometry
// Anatomy: Table (1) + Star (8) + Bezel (8) + Upper Girdle (16) + Lower Girdle (16) + Pavilion Main (8) + Culet (optional)
function createBrilliantCutGeometry(scale = 1.5): BufferGeometry {
  const geometry = new BufferGeometry();
  const vertices: number[] = [];
  const normals: number[] = [];

  // Ideal brilliant cut proportions (GIA standard)
  const tableRadius = 0.53 * scale; // Table ~53% of girdle diameter
  const crownRadius = 1.0 * scale; // Girdle radius (widest point)
  const girdleHeight = 0.025 * scale; // Thin girdle band
  const crownHeight = 0.162 * scale; // Crown height ~16.2% of diameter
  const pavilionDepth = 1.1 * scale; // Increased pavilion depth for taller bottom section

  // 8 main sections for round brilliant
  const mainFacets = 8;
  const angleStep = (Math.PI * 2) / mainFacets;

  // Helper to add a triangle with flat shading normal
  function addTriangle(
    v1: THREE.Vector3,
    v2: THREE.Vector3,
    v3: THREE.Vector3,
  ) {
    const edge1 = new THREE.Vector3().subVectors(v2, v1);
    const edge2 = new THREE.Vector3().subVectors(v3, v1);
    const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

    vertices.push(v1.x, v1.y, v1.z);
    vertices.push(v2.x, v2.y, v2.z);
    vertices.push(v3.x, v3.y, v3.z);

    for (let j = 0; j < 3; j++) {
      normals.push(normal.x, normal.y, normal.z);
    }
  }

  // Heights
  const tableY = crownHeight + girdleHeight / 2;
  const starY = crownHeight * 0.55 + girdleHeight / 2;
  const bezelY = crownHeight * 0.25 + girdleHeight / 2;
  const upperGirdleY = girdleHeight / 2;
  const lowerGirdleY = -girdleHeight / 2;
  const pavilionMidY = -pavilionDepth * 0.55;
  const culetY = -pavilionDepth;

  // Radii at different levels
  const starRadius = tableRadius + (crownRadius - tableRadius) * 0.45;
  const bezelRadius = crownRadius * 0.92;

  // Generate all vertex rings
  const tableVerts: THREE.Vector3[] = []; // 8 vertices for table octagon
  const starVerts: THREE.Vector3[] = []; // 8 star facet tips (between table edges)
  const bezelVerts: THREE.Vector3[] = []; // 8 bezel facet points
  const upperGirdleA: THREE.Vector3[] = []; // 16 upper girdle (at main angles)
  const upperGirdleB: THREE.Vector3[] = []; // 16 upper girdle (at half angles)
  const lowerGirdleA: THREE.Vector3[] = []; // 16 lower girdle (at main angles)
  const lowerGirdleB: THREE.Vector3[] = []; // 16 lower girdle (at half angles)
  const pavilionVerts: THREE.Vector3[] = []; // 8 pavilion main facet points

  for (let i = 0; i < mainFacets; i++) {
    const angle = i * angleStep;
    const halfAngle = angle + angleStep / 2;

    // Table vertices (octagon)
    tableVerts.push(
      new THREE.Vector3(
        Math.cos(angle) * tableRadius,
        tableY,
        Math.sin(angle) * tableRadius,
      ),
    );

    // Star facet tips (point toward girdle between table edges)
    starVerts.push(
      new THREE.Vector3(
        Math.cos(halfAngle) * starRadius,
        starY,
        Math.sin(halfAngle) * starRadius,
      ),
    );

    // Bezel/kite facet lower points
    bezelVerts.push(
      new THREE.Vector3(
        Math.cos(angle) * bezelRadius,
        bezelY,
        Math.sin(angle) * bezelRadius,
      ),
    );

    // Upper girdle vertices (16 total - alternating at main and half angles)
    upperGirdleA.push(
      new THREE.Vector3(
        Math.cos(angle) * crownRadius,
        upperGirdleY,
        Math.sin(angle) * crownRadius,
      ),
    );
    upperGirdleB.push(
      new THREE.Vector3(
        Math.cos(halfAngle) * crownRadius,
        upperGirdleY,
        Math.sin(halfAngle) * crownRadius,
      ),
    );

    // Lower girdle vertices
    lowerGirdleA.push(
      new THREE.Vector3(
        Math.cos(angle) * crownRadius,
        lowerGirdleY,
        Math.sin(angle) * crownRadius,
      ),
    );
    lowerGirdleB.push(
      new THREE.Vector3(
        Math.cos(halfAngle) * crownRadius,
        lowerGirdleY,
        Math.sin(halfAngle) * crownRadius,
      ),
    );

    // Pavilion main facet vertices (8 kite shapes meeting at culet)
    pavilionVerts.push(
      new THREE.Vector3(
        Math.cos(halfAngle) * crownRadius * 0.35,
        pavilionMidY,
        Math.sin(halfAngle) * crownRadius * 0.35,
      ),
    );
  }

  // Culet (bottom point)
  const culet = new THREE.Vector3(0, culetY, 0);
  // Table center
  const tableCenter = new THREE.Vector3(0, tableY, 0);

  // === BUILD CROWN FACETS ===
  for (let i = 0; i < mainFacets; i++) {
    const next = (i + 1) % mainFacets;

    // TABLE FACET (1 octagonal facet = 8 triangles)
    addTriangle(tableCenter, tableVerts[i], tableVerts[next]);

    // STAR FACETS (8 triangular facets)
    // Each star facet connects two adjacent table vertices to a star point
    addTriangle(tableVerts[i], starVerts[i], tableVerts[next]);

    // BEZEL/KITE FACETS (8 kite-shaped facets, each made of 2 triangles)
    // Upper triangle of kite
    addTriangle(tableVerts[i], bezelVerts[i], starVerts[i]);
    // Lower triangle of kite (connects to previous star point)
    const prevStar = (i - 1 + mainFacets) % mainFacets;
    addTriangle(tableVerts[i], starVerts[prevStar], bezelVerts[i]);

    // UPPER GIRDLE FACETS (16 triangular facets)
    // First upper girdle facet (from bezel to girdle)
    addTriangle(bezelVerts[i], upperGirdleA[i], upperGirdleB[prevStar]);
    // Second upper girdle facet
    addTriangle(starVerts[i], upperGirdleB[i], bezelVerts[next]);
    // Connect star to bezel through girdle
    addTriangle(starVerts[i], bezelVerts[i], upperGirdleB[i]);
    addTriangle(bezelVerts[i], upperGirdleA[i], upperGirdleB[i]);
  }

  // === BUILD GIRDLE (thin band of facets) ===
  for (let i = 0; i < mainFacets; i++) {
    const next = (i + 1) % mainFacets;

    // Girdle facets - 16 small rectangles (32 triangles)
    // At main angles
    addTriangle(upperGirdleA[i], lowerGirdleA[i], upperGirdleB[i]);
    addTriangle(lowerGirdleA[i], lowerGirdleB[i], upperGirdleB[i]);
    // At half angles
    addTriangle(upperGirdleB[i], lowerGirdleB[i], upperGirdleA[next]);
    addTriangle(lowerGirdleB[i], lowerGirdleA[next], upperGirdleA[next]);
  }

  // === BUILD PAVILION FACETS ===
  for (let i = 0; i < mainFacets; i++) {
    const next = (i + 1) % mainFacets;

    // LOWER GIRDLE FACETS (16 triangular facets)
    // These connect the girdle to the pavilion mains
    addTriangle(lowerGirdleA[i], pavilionVerts[i], lowerGirdleB[i]);
    const prevPav = (i - 1 + mainFacets) % mainFacets;
    addTriangle(lowerGirdleA[i], lowerGirdleB[prevPav], pavilionVerts[prevPav]);

    // PAVILION MAIN FACETS (8 kite-shaped facets meeting at culet)
    // Each pavilion main is a kite connecting two girdle points to culet
    addTriangle(lowerGirdleB[i], culet, pavilionVerts[i]);
    addTriangle(pavilionVerts[i], culet, lowerGirdleA[next]);
    addTriangle(lowerGirdleB[i], pavilionVerts[i], lowerGirdleA[next]);
  }

  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.computeBoundingSphere();

  return geometry;
}

function Diamond() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { pointer } = useThree();

  const geometry = useMemo(() => createBrilliantCutGeometry(1.5), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: [0, 0] },
    }),
    [],
  );

  const vertexShader = `
    uniform float uTime;
    varying vec3 vNormal;
    varying float vIntensity;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      // Drive intensity from facet orientation + subtle time pulse
      float facetLight = abs(dot(vNormal, vec3(0.0, 1.0, 0.0)));
      vIntensity = 0.25 + facetLight * 0.6 + sin(uTime * 0.5) * 0.05;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying float vIntensity;

    void main() {
      vec3 color = vec3(vIntensity);
      gl_FragColor = vec4(color, 0.6);
    }
  `;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uMouse.value = [pointer.x, pointer.y];
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x = MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.2 + 0.3,
        0.05,
      );
      meshRef.current.rotation.z = MathUtils.lerp(
        meshRef.current.rotation.z,
        pointer.x * 0.2,
        0.05,
      );
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        wireframe
      />
    </mesh>
  );
}

export function SentientDiamond() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rotate-45 border border-white/10 animate-pulse" />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full"
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <ambientLight intensity={0.5} />
      <Diamond />
    </Canvas>
  );
}
