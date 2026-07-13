import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

const ParticleMorpher = ({ scrollYProgress }) => {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  
  const particleCount = 2000;
  const maxLines = 800;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  
  const [states, setStates] = useState(null);
  const introRef = useRef(0);

  useEffect(() => {
    // 0: Chaos, 1: LeftBias, 2: ThreeNodes, 3: FlowLines, 4: Globe
    const chaos = new Float32Array(particleCount * 3);
    const leftBias = new Float32Array(particleCount * 3);
    const threeNodes = new Float32Array(particleCount * 3);
    const flowLines = new Float32Array(particleCount * 3);
    const globe = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // 1. Chaos (Hero)
      chaos[i3] = (Math.random() - 0.5) * 30;
      chaos[i3 + 1] = (Math.random() - 0.5) * 30;
      chaos[i3 + 2] = (Math.random() - 0.5) * 30;
      
      // Keep 40% of particles as ambient background noise
      if (i > particleCount * 0.6) {
        leftBias[i3] = chaos[i3]; leftBias[i3 + 1] = chaos[i3 + 1]; leftBias[i3 + 2] = chaos[i3 + 2];
        threeNodes[i3] = chaos[i3]; threeNodes[i3 + 1] = chaos[i3 + 1]; threeNodes[i3 + 2] = chaos[i3 + 2];
        flowLines[i3] = chaos[i3]; flowLines[i3 + 1] = chaos[i3 + 1]; flowLines[i3 + 2] = chaos[i3 + 2];
        globe[i3] = chaos[i3]; globe[i3 + 1] = chaos[i3 + 1]; globe[i3 + 2] = chaos[i3 + 2];
      } else {
        // 2. Left Bias (Shift)
        leftBias[i3] = (Math.random() - 0.5) * 10 - 5;
        leftBias[i3 + 1] = (Math.random() - 0.5) * 20;
        leftBias[i3 + 2] = (Math.random() - 0.5) * 10;

        // 3. Three Nodes (Services)
        const nodeIndex = i % 3;
        const nodeX = (nodeIndex - 1) * 6; // -6, 0, 6
        const radius = Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        threeNodes[i3] = nodeX + radius * Math.sin(phi) * Math.cos(theta);
        threeNodes[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        threeNodes[i3 + 2] = radius * Math.cos(phi);

        // 4. Dual Double Helix / DNA (Process)
        const isHelix1 = Math.random() > 0.5;
        const hY = (Math.random() - 0.5) * 24; // Height from -12 to 12
        const twistRate = 0.6;
        let hAngle = hY * twistRate;
        
        // Split into two intertwining strands per helix
        if (Math.random() > 0.5) hAngle += Math.PI;
        
        // Create organic thickness for the strands
        const hRadius = 2.5; // Slightly thinner so two fit nicely
        const scatterR = Math.random() * 1.5;
        const scatterA = Math.random() * Math.PI * 2;
        
        // Position one on the left (-5) and one on the right (5). 
        // With the continuous 3D rotation, they will orbit the center!
        const baseX = isHelix1 ? -5 : 5;
        
        flowLines[i3] = baseX + (hRadius * Math.cos(hAngle)) + (scatterR * Math.cos(scatterA));
        flowLines[i3 + 1] = hY;
        flowLines[i3 + 2] = (hRadius * Math.sin(hAngle)) + (scatterR * Math.sin(scatterA));

        // 5. Globe (Finale) - Meridians Only (Peeled Orange shape)
        const globeRadius = 6;
        const numMeridians = 16;
        
        // All active particles map to vertical meridian arcs
        const meridianIdx = i % numMeridians;
        const thetaG = (meridianIdx / numMeridians) * 2 * Math.PI;
        const phiG = Math.random() * Math.PI; // Uniformly distributed from North to South pole
        
        // Y is UP in Three.js for a standard spinning globe
        globe[i3] = globeRadius * Math.sin(phiG) * Math.cos(thetaG);
        globe[i3 + 1] = globeRadius * Math.cos(phiG);
        globe[i3 + 2] = globeRadius * Math.sin(phiG) * Math.sin(thetaG);
      }
    }
    
    setStates([chaos, leftBias, threeNodes, flowLines, globe]);
  }, []);

  const positions = useMemo(() => {
    if (!states) return new Float32Array(particleCount * 3);
    return new Float32Array(states[0]);
  }, [states]);

  useFrame((state, delta) => {
    if (!states || !pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const progress = scrollYProgress.get();
    
    // Intro Animation Logic
    if (introRef.current < 1) {
      introRef.current += delta * 0.4; // 2.5s duration
    }
    const introEased = 1 - Math.pow(1 - Math.min(introRef.current, 1), 3); // cubic out easing
    const scatter = 1 + (1 - introEased) * 8; // Start 9x farther away, shrink to 1x
    const twist = (1 - introEased) * Math.PI * 2; // Spiral in

    const numStates = states.length;
    const scaledProgress = progress * (numStates - 1);
    const currentStateIdx = Math.floor(scaledProgress);
    const nextStateIdx = Math.min(currentStateIdx + 1, numStates - 1);
    const transitionProgress = scaledProgress - currentStateIdx;

    const startArray = states[currentStateIdx];
    const endArray = states[nextStateIdx];
    const currentArray = pointsRef.current.geometry.attributes.position.array;

    // Calculate mouse position in rough world coordinates
    const mouseX = state.pointer.x * 20;
    const mouseY = state.pointer.y * 15;
    const repelRadius = 3; 
    const repelForce = 0.2; 

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Pure 1:1 scroll interpolation - no snapping, no glitches.
      // The particles will pick up exactly where they left off based on scroll position.
      let x = startArray[i3] + (endArray[i3] - startArray[i3]) * transitionProgress;
      let y = startArray[i3 + 1] + (endArray[i3 + 1] - startArray[i3 + 1]) * transitionProgress;
      let z = startArray[i3 + 2] + (endArray[i3 + 2] - startArray[i3 + 2]) * transitionProgress;

      x += Math.sin(time * 0.5 + i) * 0.1;
      y += Math.cos(time * 0.3 + i) * 0.1;

      // Add continuous jitter for the globe state, scaling perfectly with scroll
      let globePresence = 0;
      if (currentStateIdx === 4) {
        globePresence = 1;
      } else if (currentStateIdx === 3 && nextStateIdx === 4) {
        globePresence = transitionProgress;
      }

      if (globePresence > 0 && i <= particleCount * 0.6) {
        // Intense but controlled vibration (Middle ground)
        x += Math.sin(time * 35 + i * 2.1) * 0.10 * globePresence;
        y += Math.cos(time * 38 + i * 2.3) * 0.10 * globePresence;
        z += Math.sin(time * 40 + i * 2.5) * 0.10 * globePresence;
      }

      // Apply intro animation scatter and twist
      if (introEased < 1) {
        x *= scatter;
        y *= scatter;
        z *= scatter;
        const xRot = x * Math.cos(twist) - z * Math.sin(twist);
        const zRot = x * Math.sin(twist) + z * Math.cos(twist);
        x = xRot;
        z = zRot;
      }

      // Mouse subtle interaction
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < repelRadius) {
        const force = (repelRadius - dist) / repelRadius;
        // Soft displacement creating a subtle "wake"
        x -= (dx / dist) * force * repelForce * Math.sin(time * 2 + i);
        y -= (dy / dist) * force * repelForce * Math.cos(time * 2 + i);
        z += force * 0.2;
      }

      currentArray[i3] = x;
      currentArray[i3 + 1] = y;
      currentArray[i3 + 2] = z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Smoothly apply rotation and Earth-like tilt ONLY when forming the final globe
    // This keeps the camera still for the rest of the sections so animations are clearly visible
    let globeRotationProgress = 0;
    if (progress > 0.75) {
      globeRotationProgress = (progress - 0.75) / 0.25; // Scales from 0 to 1
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y = (time * 0.15) * globeRotationProgress;
      groupRef.current.rotation.x = 0.3 * globeRotationProgress;
    }

    // --- Line Connections for All Sections EXCEPT the Globe ---
    if (linesRef.current) {
      let connectionOpacity = 1;
      if (currentStateIdx === 4) {
        connectionOpacity = 0;
      } else if (currentStateIdx === 3 && nextStateIdx === 4) {
        connectionOpacity = 1 - transitionProgress;
      }
      
      linesRef.current.material.opacity = connectionOpacity * 0.4;
      
      let lineCount = 0;
      if (connectionOpacity > 0.05) {
        // Increased subset of particles to check for denser connections
        const connectCount = 250;
        for (let i = 0; i < connectCount; i++) {
          for (let j = i + 1; j < connectCount; j++) {
            if (lineCount >= maxLines) break;
            const dx = currentArray[i*3] - currentArray[j*3];
            const dy = currentArray[i*3+1] - currentArray[j*3+1];
            const dz = currentArray[i*3+2] - currentArray[j*3+2];
            const distSq = dx*dx + dy*dy + dz*dz;
            
            // Connect if close enough (increased threshold for more connections)
            if (distSq < 20) { 
              linePositions[lineCount * 6] = currentArray[i*3];
              linePositions[lineCount * 6 + 1] = currentArray[i*3+1];
              linePositions[lineCount * 6 + 2] = currentArray[i*3+2];
              linePositions[lineCount * 6 + 3] = currentArray[j*3];
              linePositions[lineCount * 6 + 4] = currentArray[j*3+1];
              linePositions[lineCount * 6 + 5] = currentArray[j*3+2];
              lineCount++;
            }
          }
        }
      }
      
      linesRef.current.geometry.setDrawRange(0, lineCount * 2);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(32, 32, 30, 0, Math.PI * 2);
    context.fillStyle = '#ffffff';
    context.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#3b82f6" // Deep Futuristic Blue
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          map={circleTexture}
          alphaTest={0.5}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>
    </group>
  );
};

const ParticleNetwork = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ParticleMorpher scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
};

export default ParticleNetwork;
