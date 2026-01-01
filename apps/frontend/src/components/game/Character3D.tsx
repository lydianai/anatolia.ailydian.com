"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D CHARACTER COMPONENT FOR MAIN GAME
 * ANADOLU REALM - Elite Turkish Digital Metropol
 
 *
 * Features:
 * - 5 Turkish character classes (İş Adamı, Yazılımcı, Tasarımcı, Pazarlamacı, Tüccar)
 * - 8-directional movement with smooth rotation
 * - Animation system (idle, walk, run, jump, attack, emote)
 * - Level-based scaling and effects
 * - Turkish cultural accessories (fez, çini patterns, etc.)
 */

interface Character3DProps {
  characterClass: "entrepreneur" | "developer" | "designer" | "marketer" | "merchant";
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  level?: number;
  username?: string;
  animation?: "idle" | "walk" | "run" | "jump" | "attack" | "emote";
  velocity?: { x: number; z: number };
}

export default function Character3D({
  characterClass,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  level = 1,
  username = "Oyuncu",
  animation = "idle",
  velocity = { x: 0, z: 0 }
}: Character3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nametagRef = useRef<THREE.Sprite>(null);

  // Character class configurations
  const characterConfigs = {
    entrepreneur: {
      color: "#D4AF37", // Ottoman Gold
      height: 1.8,
      accessories: ["suit", "briefcase"],
      baseStats: { speed: 1.0, strength: 0.8 }
    },
    developer: {
      color: "#3B82F6", // Tech Blue
      height: 1.75,
      accessories: ["glasses", "laptop"],
      baseStats: { speed: 0.9, strength: 1.2 }
    },
    designer: {
      color: "#EC4899", // Creative Pink
      height: 1.7,
      accessories: ["beret", "tablet"],
      baseStats: { speed: 1.1, strength: 0.7 }
    },
    marketer: {
      color: "#10B981", // Success Green
      height: 1.75,
      accessories: ["headset", "phone"],
      baseStats: { speed: 1.2, strength: 0.6 }
    },
    merchant: {
      color: "#F59E0B", // Merchant Amber
      height: 1.8,
      accessories: ["fez", "çini_pattern"],
      baseStats: { speed: 0.8, strength: 1.0 }
    }
  };

  const config = characterConfigs[characterClass];

  // Character movement and rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth rotation towards movement direction
    if (velocity.x !== 0 || velocity.z !== 0) {
      const angle = Math.atan2(velocity.x, velocity.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        angle,
        delta * 10
      );
    }

    // Bob animation when moving
    if (animation === "walk" || animation === "run") {
      const bobSpeed = animation === "run" ? 8 : 4;
      const bobAmount = animation === "run" ? 0.1 : 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * bobSpeed) * bobAmount;
    }

    // Nametag always faces camera
    if (nametagRef.current) {
      nametagRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  // Create character mesh
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear existing children
    while (groupRef.current.children.length > 0) {
      groupRef.current.remove(groupRef.current.children[0]);
    }

    // Body (capsule shape)
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, config.height - 0.6, 8, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: config.color,
      metalness: 0.3,
      roughness: 0.7,
      emissive: config.color,
      emissiveIntensity: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = config.height / 2;
    groupRef.current.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: "#FFE0BD", // Skin tone
      metalness: 0.1,
      roughness: 0.9
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    head.position.y = config.height + 0.15;
    groupRef.current.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#000000" });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.08, config.height + 0.2, 0.2);
    groupRef.current.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.08, config.height + 0.2, 0.2);
    groupRef.current.add(rightEye);

    // Level badge (floating above head)
    const badgeGeometry = new THREE.RingGeometry(0.15, 0.2, 16);
    const badgeMaterial = new THREE.MeshStandardMaterial({
      color: "#D4AF37",
      metalness: 0.8,
      roughness: 0.2,
      emissive: "#D4AF37",
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide
    });
    const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
    badge.position.y = config.height + 0.8;
    badge.rotation.x = -Math.PI / 2;
    groupRef.current.add(badge);

    // Level text
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 72px Orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(level.toString(), 64, 64);

    const levelTexture = new THREE.CanvasTexture(canvas);
    const levelMaterial = new THREE.SpriteMaterial({ map: levelTexture, transparent: true });
    const levelSprite = new THREE.Sprite(levelMaterial);
    levelSprite.position.y = config.height + 0.8;
    levelSprite.scale.set(0.3, 0.3, 1);
    groupRef.current.add(levelSprite);

    // Username tag
    const nameCanvas = document.createElement("canvas");
    nameCanvas.width = 512;
    nameCanvas.height = 128;
    const nameCtx = nameCanvas.getContext("2d")!;

    // Background
    nameCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
    nameCtx.roundRect(10, 30, 492, 68, 10);
    nameCtx.fill();

    // Text
    nameCtx.fillStyle = "#FFFFFF";
    nameCtx.font = "bold 48px Inter";
    nameCtx.textAlign = "center";
    nameCtx.textBaseline = "middle";
    nameCtx.fillText(username, 256, 64);

    const nameTexture = new THREE.CanvasTexture(nameCanvas);
    const nameMaterial = new THREE.SpriteMaterial({ map: nameTexture, transparent: true });
    const nameSprite = new THREE.Sprite(nameMaterial);
    nameSprite.position.y = config.height + 1.2;
    nameSprite.scale.set(2, 0.5, 1);
    nametagRef.current = nameSprite;
    groupRef.current.add(nameSprite);

    // Accessories based on class
    if (config.accessories.includes("fez")) {
      // Turkish Fez hat
      const fezGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.2, 16);
      const fezMaterial = new THREE.MeshStandardMaterial({
        color: "#DC2626",
        metalness: 0.2,
        roughness: 0.8
      });
      const fez = new THREE.Mesh(fezGeometry, fezMaterial);
      fez.position.y = config.height + 0.4;
      groupRef.current.add(fez);

      // Fez tassel
      const tasselGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const tasselMaterial = new THREE.MeshStandardMaterial({ color: "#FFD700" });
      const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
      tassel.position.set(0.15, config.height + 0.35, 0);
      groupRef.current.add(tassel);
    }

    // Shadow circle
    const shadowGeometry = new THREE.CircleGeometry(0.4, 16);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: "#000000",
      transparent: true,
      opacity: 0.3
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    groupRef.current.add(shadow);

  }, [characterClass, level, username, config]);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
