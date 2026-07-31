<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement>()
let animationId = 0

onMounted(() => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 50

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const PARTICLE_COUNT = 2000
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const speeds = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 120
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60
    speeds[i] = 0.002 + Math.random() * 0.008
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particleTexture = createGlowTexture()
  const material = new THREE.PointsMaterial({
    size: 0.25,
    map: particleTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: new THREE.Color('#6366f1'),
    transparent: true,
    opacity: 0.8
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
  const onMouseMove = (e: MouseEvent) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove)

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  function createGlowTexture(): THREE.Texture {
    const size = 64
    const canvas2 = document.createElement('canvas')
    canvas2.width = size
    canvas2.height = size
    const ctx = canvas2.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.1, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.4, 'rgba(99,102,241,0.3)')
    gradient.addColorStop(1, 'rgba(99,102,241,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas2)
  }

  function animate() {
    animationId = requestAnimationFrame(animate)

    mouse.x += (mouse.targetX - mouse.x) * 0.05
    mouse.y += (mouse.targetY - mouse.y) * 0.05

    points.rotation.x += 0.0003
    points.rotation.y += 0.0005
    points.rotation.x += mouse.y * 0.0002
    points.rotation.y += mouse.x * 0.0002

    const posArray = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3 + 1] += speeds[i]
      if (posArray[i * 3 + 1] > 40) posArray[i * 3 + 1] = -40
      if (posArray[i * 3 + 1] < -40) posArray[i * 3 + 1] = 40
    }
    geometry.attributes.position.needsUpdate = true

    points.material = material
    points.material.color.set('#818cf8')
    points.material.opacity = 0.7

    renderer.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 z-0 pointer-events-none" />
</template>
