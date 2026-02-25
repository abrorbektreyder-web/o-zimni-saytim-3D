import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

// City coordinates (lat, lng) for connection arcs
const CITIES = [
    { name: 'New York', lat: 40.7128, lng: -74.006 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'Moscow', lat: 55.7558, lng: 37.6173 },
    { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
    { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
    { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
    { name: 'Nairobi', lat: -1.2921, lng: 36.8219 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
}

function createArcCurve(start: THREE.Vector3, end: THREE.Vector3, radius: number): THREE.CubicBezierCurve3 {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(radius + dist * 0.35);
    const cp1 = new THREE.Vector3().lerpVectors(start, mid, 0.33);
    const cp2 = new THREE.Vector3().lerpVectors(start, mid, 0.66);
    cp1.normalize().multiplyScalar(radius + dist * 0.2);
    cp2.normalize().multiplyScalar(radius + dist * 0.3);
    return new THREE.CubicBezierCurve3(start, cp1, cp2, end);
}

// Globe sphere with procedural "night lights" shader
function Globe() {
    const meshRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    const globeRadius = 2.2;

    // Create procedural globe shader material
    const globeMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                globeColor: { value: new THREE.Color('#050A14') },
                glowColor: { value: new THREE.Color('#f59e0b') },
                dotColor: { value: new THREE.Color('#fbbf24') },
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec2 vUv;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 globeColor;
                uniform vec3 glowColor;
                uniform vec3 dotColor;
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec2 vUv;
                
                // Simple hash for pseudo-random
                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
                }
                
                void main() {
                    // Base dark globe
                    vec3 color = globeColor;
                    
                    // Grid lines (latitude/longitude)
                    float lat = asin(vNormal.y);
                    float lng = atan(vNormal.z, vNormal.x);
                    
                    float latLines = smoothstep(0.02, 0.0, abs(fract(lat * 6.0) - 0.5) - 0.48);
                    float lngLines = smoothstep(0.02, 0.0, abs(fract(lng * 6.0) - 0.5) - 0.48);
                    color += vec3(0.03, 0.04, 0.06) * (latLines + lngLines);
                    
                    // Simulated city lights (scattered bright dots)
                    vec2 grid = floor(vUv * 80.0);
                    float rnd = hash(grid);
                    float cityThreshold = 0.92 + 0.05 * sin(time * 2.0 + rnd * 6.28);
                    
                    if (rnd > cityThreshold) {
                        float dist = length(fract(vUv * 80.0) - 0.5);
                        float dot = smoothstep(0.15, 0.0, dist);
                        float flicker = 0.7 + 0.3 * sin(time * 3.0 + rnd * 100.0);
                        color += dotColor * dot * flicker * 0.8;
                    }
                    
                    // Fresnel rim glow
                    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
                    color += glowColor * fresnel * 0.4;
                    
                    // Continent-like subtle highlights
                    float continent = hash(floor(vUv * 20.0));
                    if (continent > 0.6) {
                        color += vec3(0.01, 0.015, 0.025);
                    }
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            side: THREE.FrontSide,
        });
    }, []);

    // Atmosphere glow
    const atmosphereMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color('#f59e0b') },
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
                    gl_FragColor = vec4(glowColor, intensity * 0.5);
                }
            `,
            side: THREE.BackSide,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.08;
            globeMaterial.uniforms.time.value = t;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y = t * 0.06;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * 0.1;
        }
    });

    return (
        <group>
            {/* Core globe */}
            <mesh ref={meshRef} material={globeMaterial}>
                <sphereGeometry args={[globeRadius, 64, 64]} />
            </mesh>

            {/* Atmosphere glow */}
            <mesh ref={atmosphereRef} material={atmosphereMaterial}>
                <sphereGeometry args={[globeRadius * 1.15, 64, 64]} />
            </mesh>

            {/* Clouds layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[globeRadius * 1.02, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.03}
                    wireframe
                />
            </mesh>
        </group>
    );
}

// Connection arcs between cities
function ConnectionArcs() {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 2.2;

    const arcs = useMemo(() => {
        const connections: { curve: THREE.CubicBezierCurve3; index: number }[] = [];
        const pairs = [
            [0, 1], [1, 6], [1, 3], [3, 4], [4, 2], [2, 9],
            [0, 7], [8, 3], [5, 4], [10, 11], [11, 3], [8, 4]
        ];
        pairs.forEach(([a, b], index) => {
            const start = latLngToVector3(CITIES[a].lat, CITIES[a].lng, radius);
            const end = latLngToVector3(CITIES[b].lat, CITIES[b].lng, radius);
            connections.push({ curve: createArcCurve(start, end, radius), index });
        });
        return connections;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {arcs.map((arc, i) => {
                const points = arc.curve.getPoints(50);
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                return (
                    <line key={i} geometry={geometry}>
                        <lineBasicMaterial
                            color="#f59e0b"
                            transparent
                            opacity={0.3}
                            linewidth={1}
                        />
                    </line>
                );
            })}

            {/* City nodes */}
            {CITIES.map((city, i) => {
                const pos = latLngToVector3(city.lat, city.lng, radius);
                return (
                    <mesh key={i} position={pos}>
                        <sphereGeometry args={[0.025, 8, 8]} />
                        <meshBasicMaterial color="#fbbf24" />
                    </mesh>
                );
            })}
        </group>
    );
}

// Orbiting particles/stars
function StarField() {
    const points = useRef<THREE.Points>(null);
    const particlesCount = 2500;

    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            const r = 5 + Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.01;
            points.current.rotation.x = state.clock.getElapsedTime() * 0.005;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#ffffff"
                sizeAttenuation
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Orbiting ring particles
function OrbitRing() {
    const ringRef = useRef<THREE.Points>(null);
    const count = 200;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const r = 3.2 + (Math.random() - 0.5) * 0.3;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
            pos[i * 3 + 2] = Math.sin(angle) * r;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
            ringRef.current.rotation.x = 0.3;
        }
    });

    return (
        <points ref={ringRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#f59e0b"
                sizeAttenuation
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Camera controller with scroll-based offset
function CameraController() {
    const { camera } = useThree();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / (maxScroll || 1), 1);

        // Shift camera as user scrolls
        const targetX = progress * 2;
        const targetY = -progress * 1.5;
        const targetZ = 5 + progress * 2;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.position.z += (targetZ - camera.position.z) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

export function Scene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: false }}
            >
                <color attach="background" args={['#050A14']} />
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.5} color="#f59e0b" />
                <pointLight position={[-5, -5, -5]} intensity={0.2} color="#fbbf24" />

                <Globe />
                <ConnectionArcs />
                <StarField />
                <OrbitRing />
                <CameraController />
            </Canvas>
        </div>
    );
}
