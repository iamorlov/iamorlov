"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0a"); // Dark gray background
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Setup renderer with anti-aliasing for smoother dots
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a circle texture for perfectly round dots
    const dotTexture = createCircleTexture();
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Fill position array with random positions
    for (let i = 0; i < particlesCount * 3; i++) {
      // Position particles in a sphere-like distribution
      posArray[i] = (Math.random() - 0.5) * 90;
      
      // Set random particle sizes
      if (i % 3 === 0) {
        scaleArray[i / 3] = Math.random() * 1.5 + 0.5;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material with circle texture
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true, // Make far particles smaller
      transparent: true,
      opacity: 0.8,
      map: dotTexture, // Apply the circle texture
      alphaTest: 0.05, // Prevent transparency rendering issues
      depthWrite: false, // Prevent particles affecting each other
    });
    
    // Apply purple color
    particlesMaterial.color.set("#9333ea");
    
    // Create particles mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse movement tracking
    const mouse = {
      x: 0,
      y: 0,
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener("resize", handleResize);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation of particle field
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0005;
      
      // Subtle movement in response to mouse
      particlesMesh.rotation.x += mouse.y * 0.0003;
      particlesMesh.rotation.y += mouse.x * 0.0003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      dotTexture.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  // Helper function to create a circle texture
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    
    // Draw a white circle with soft edges
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    
    // Create a radial gradient
    const gradient = context.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Fill with gradient
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fill();
    
    // Create texture from canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-[#0a0a0a]"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;