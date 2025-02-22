import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Group, Vector3, Euler } from 'three';

interface FeatureIconProps {
  type?: 'dashboard' | 'transactions' | 'market' | 'ai' | 'alerts' | 'wallet';
}

// Create a mesh with proper transformations
function TransformedMesh({
  position,
  rotation,
  geometry,
  material,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  geometry: JSX.Element;
  material: JSX.Element;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      {geometry}
      {material}
    </mesh>
  );
}

// Create a cylinder with proper transformations
function TransformedCylinder({
  radius,
  height,
  segments = 32,
  position,
  rotation,
  color,
  metalness = 0.7,
  roughness = 0.2,
  emissive,
  emissiveIntensity = 0.3,
}: {
  radius: number;
  height: number;
  segments?: number;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, segments]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive || color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

// Helper function to create a Vector3
function createVector3(x: number, y: number, z: number): Vector3 {
  return new Vector3(x, y, z);
}

// Helper function to create Euler rotation
function createEuler(x: number, y: number, z: number): THREE.Euler {
  return new THREE.Euler(x, y, z);
}

// Advanced Portfolio Dashboard visualization
function DashboardIcon() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  // Create multiple chart elements
  const charts = [
    {
      type: 'bar',
      color: '#4ECDC4',
      position: createVector3(-0.6, 0, 0),
      data: [0.5, 0.8, 0.3, 0.9, 0.6],
    },
    {
      type: 'line',
      color: '#FF6B6B',
      position: createVector3(0.6, 0, 0),
      data: [0.4, 0.7, 0.5, 0.8, 0.6],
    },
  ];

  return (
    <group ref={group}>
      {/* Base Platform */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          opacity={0.9}
          transparent
        />
      </mesh>

      {/* Bar Chart */}
      <group position={charts[0].position}>
        {charts[0].data.map((height, i) => (
          <mesh key={i} position={[i * 0.2 - 0.4, height / 2, 0]}>
            <boxGeometry args={[0.15, height, 0.15]} />
            <meshStandardMaterial
              color={charts[0].color}
              metalness={0.6}
              roughness={0.2}
              emissive={charts[0].color}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Line Chart */}
      <group position={charts[1].position}>
        {charts[1].data.map((value, i, arr) => {
          if (i < arr.length - 1) {
            const rotation = createEuler(0, 0, Math.atan2(arr[i + 1] - value, 0.2));
            return (
              <mesh key={i} position={[i * 0.2 - 0.3, (value + arr[i + 1]) / 2, 0]}>
                <cylinderGeometry
                  args={[
                    0.02,
                    0.02,
                    Math.sqrt(Math.pow(0.2, 2) + Math.pow(arr[i + 1] - value, 2)),
                    8,
                  ]}
                />
                <meshStandardMaterial
                  color={charts[1].color}
                  emissive={charts[1].color}
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          }
        })}
        {charts[1].data.map((value, i) => (
          <mesh key={`point-${i}`} position={[i * 0.2 - 0.4, value, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color={charts[1].color}
              emissive={charts[1].color}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Numbers */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <group key={i} position={[x, 0.8, 0]}>
          <mesh>
            <planeGeometry args={[0.3, 0.15]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
              opacity={0.8}
              transparent
            />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.08}
            color="#4ECDC4"
            anchorX="center"
            anchorY="middle"
          >
            {`$${(Math.random() * 1000).toFixed(2)}`}
          </Text>
        </group>
      ))}
    </group>
  );
}

// Smart Transaction Management visualization
function TransactionsIcon() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  const transactionColors = {
    send: '#FF6B6B', // Red for sending
    receive: '#4ECDC4', // Green for receiving
    exchange: '#FFD93D', // Yellow for exchange
  };

  return (
    <group ref={group}>
      {/* Central Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#6C5CE7"
          metalness={0.8}
          roughness={0.2}
          emissive="#6C5CE7"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Transaction Flows */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const radius = 0.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i}>
            {/* Connection Line */}
            <mesh position={[x / 2, 0, z / 2]} rotation={[Math.PI / 2, -angle, 0]}>
              <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
              <meshStandardMaterial
                color={Object.values(transactionColors)[i]}
                metalness={0.6}
                roughness={0.3}
                emissive={Object.values(transactionColors)[i]}
                emissiveIntensity={0.2}
              />
            </mesh>

            {/* Transaction Node */}
            <group position={[x, 0, z]}>
              <mesh>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial
                  color={Object.values(transactionColors)[i]}
                  metalness={0.7}
                  roughness={0.2}
                  emissive={Object.values(transactionColors)[i]}
                  emissiveIntensity={0.3}
                />
              </mesh>

              {/* Transaction Amount */}
              <Text
                position={[0, 0.3, 0]}
                fontSize={0.1}
                color={Object.values(transactionColors)[i]}
                anchorX="center"
                anchorY="middle"
              >
                {i === 0 ? '-0.5 BTC' : i === 1 ? '+1.2 ETH' : '⇄ USDT'}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}

// Market Intelligence visualization
function MarketIcon() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  const marketData = [
    { symbol: 'BTC', color: '#FF9F43', price: '+5.2%' },
    { symbol: 'ETH', color: '#4ECDC4', price: '+3.8%' },
    { symbol: 'DOT', color: '#FF6B6B', price: '-2.1%' },
  ];

  return (
    <group ref={group}>
      {/* Market Globe */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          opacity={0.6}
          transparent
          wireframe
        />
      </mesh>

      {/* Market Data Points */}
      {marketData.map((item, i) => {
        const phi = Math.acos(-1 + (2 * i) / marketData.length);
        const theta = Math.sqrt(marketData.length * Math.PI) * phi;
        const x = 0.8 * Math.cos(theta) * Math.sin(phi);
        const y = 0.8 * Math.sin(theta) * Math.sin(phi);
        const z = 0.8 * Math.cos(phi);

        return (
          <group key={i} position={[x, y, z]}>
            {/* Price Card */}
            <mesh>
              <boxGeometry args={[0.3, 0.15, 0.02]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.7}
                roughness={0.2}
                emissive={item.color}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Symbol Text */}
            <Text
              position={[0, 0.05, 0.02]}
              fontSize={0.05}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {item.symbol}
            </Text>

            {/* Price Text */}
            <Text
              position={[0, -0.05, 0.02]}
              fontSize={0.04}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {item.price}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// AI-Powered Analytics visualization
function AIIcon() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const nodeColors = [
    '#FF61D2', // Pink
    '#7B61FF', // Purple
    '#61FFD2', // Cyan
    '#FFD261', // Yellow
  ];

  return (
    <group ref={group}>
      {/* Central AI Core */}
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#7B61FF"
          metalness={0.8}
          roughness={0.2}
          emissive="#7B61FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Neural Network Nodes */}
      {nodeColors.map((color, i) => {
        const angle = (i * Math.PI * 2) / nodeColors.length;
        const radius = 0.6;

        return (
          <group key={i}>
            {/* Node */}
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial
                color={color}
                metalness={0.7}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.4}
              />
            </mesh>

            {/* Connections */}
            {nodeColors.map((_, j) => {
              if (j > i) {
                const angleJ = (j * Math.PI * 2) / nodeColors.length;
                const start = new THREE.Vector3(
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0
                );
                const end = new THREE.Vector3(
                  Math.cos(angleJ) * radius,
                  Math.sin(angleJ) * radius,
                  0
                );
                const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
                const connectionRotation = createEuler(
                  0,
                  0,
                  Math.atan2(end.y - start.y, end.x - start.x)
                );

                return (
                  <mesh key={`${i}-${j}`} position={mid} rotation={connectionRotation}>
                    <cylinderGeometry args={[0.01, 0.01, start.distanceTo(end), 8]} />
                    <meshStandardMaterial
                      color={color}
                      metalness={0.7}
                      roughness={0.2}
                      opacity={0.4}
                      transparent
                    />
                  </mesh>
                );
              }
            })}
          </group>
        );
      })}

      {/* Pulse Effect */}
      <mesh scale={1.2}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#7B61FF" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Smart Alert System visualization
function AlertsIcon() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  const alertTypes = [
    { color: '#FF6B6B', label: 'Price' },
    { color: '#4ECDC4', label: 'Volume' },
    { color: '#FFD93D', label: 'News' },
  ];

  return (
    <group ref={group}>
      {/* Central Alert Hub */}
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#FF6B6B"
          metalness={0.8}
          roughness={0.2}
          emissive="#FF6B6B"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Alert Rings */}
      {[1.2, 1.5, 1.8].map((scale, i) => (
        <mesh key={i} scale={scale}>
          <ringGeometry args={[0.3, 0.31, 32]} />
          <meshStandardMaterial
            color={alertTypes[i].color}
            metalness={0.7}
            roughness={0.2}
            opacity={0.3}
            transparent
          />
        </mesh>
      ))}

      {/* Alert Types */}
      {alertTypes.map((alert, i) => {
        const angle = (i * Math.PI * 2) / alertTypes.length;
        const radius = 0.6;

        return (
          <group key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <mesh>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial
                color={alert.color}
                metalness={0.7}
                roughness={0.2}
                emissive={alert.color}
                emissiveIntensity={0.3}
              />
            </mesh>
            <Text
              position={[0, 0.2, 0]}
              fontSize={0.08}
              color={alert.color}
              anchorX="center"
              anchorY="middle"
            >
              {alert.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// Asset Management visualization
function WalletIcon() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const assets = [
    { symbol: 'BTC', color: '#FF9F43' },
    { symbol: 'ETH', color: '#4ECDC4' },
    { symbol: 'DOT', color: '#FF6B6B' },
    { symbol: 'SOL', color: '#A66FFE' },
  ];

  return (
    <group ref={group}>
      {/* Wallet Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.2]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          opacity={0.9}
          transparent
        />
      </mesh>

      {/* Asset Cards */}
      {assets.map((asset, i) => {
        const offset = (i - (assets.length - 1) / 2) * 0.25;
        return (
          <group key={i} position={[offset, 0.1, 0.15]}>
            <mesh>
              <boxGeometry args={[0.2, 0.3, 0.02]} />
              <meshStandardMaterial
                color={asset.color}
                metalness={0.7}
                roughness={0.2}
                emissive={asset.color}
                emissiveIntensity={0.3}
              />
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.08}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {asset.symbol}
            </Text>
          </group>
        );
      })}

      {/* Security Shield */}
      <mesh position={[0, -0.2, 0.15]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// Helper function to create rotation vector
function createRotation(x: number, y: number, z: number): [number, number, number] {
  return [x, y, z];
}

// Helper function to create position vector
function createPosition(x: number, y: number, z: number): [number, number, number] {
  return [x, y, z];
}

export default function FeatureIcon({ type = 'dashboard' }: FeatureIconProps) {
  const iconComponents = {
    dashboard: DashboardIcon,
    transactions: TransactionsIcon,
    market: MarketIcon,
    ai: AIIcon,
    alerts: AlertsIcon,
    wallet: WalletIcon,
  };

  const IconComponent = iconComponents[type];

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        maxHeight: '400px',
      }}
    >
      <Canvas
        style={{ flex: 1 }}
        camera={{
          position: [0, 0, 3],
          fov: 40,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <IconComponent />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(Math.PI * 3) / 4}
        />
      </Canvas>
    </div>
  );
}
