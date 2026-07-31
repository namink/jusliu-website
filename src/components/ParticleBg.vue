<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement>()
const paused = ref(false)
let animationId = 0

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4']
const PARTICLE_COUNT = 1500

defineExpose({
  setPaused(v: boolean) { paused.value = v }
})

onMounted(() => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 55

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)
  const speeds = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100
    positions[i * 3 + 1] = (Math.random() - 0.5) * 70
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    const c = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)])
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
    sizes[i] = 0.1 + Math.random() * 0.35
    speeds[i] = 0.003 + Math.random() * 0.012
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const sprite = createSpriteTexture()
  const material = new THREE.PointsMaterial({
    size: 0.3,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
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

  function createSpriteTexture(): THREE.Texture {
    const size = 64
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.05, 'rgba(255,255,255,0.9)')
    g.addColorStop(0.3, 'rgba(129,140,248,0.4)')
    g.addColorStop(1, 'rgba(129,140,248,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(c)
  }

  function animate() {
    animationId = requestAnimationFrame(animate)

    if (paused.value) return

    mouse.x += (mouse.targetX - mouse.x) * 0.04
    mouse.y += (mouse.targetY - mouse.y) * 0.04

    points.rotation.x += 0.0002
    points.rotation.y += 0.0004
    points.rotation.x += mouse.y * 0.00015
    points.rotation.y += mouse.x * 0.00015

    const posArray = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3 + 1] += speeds[i]
      if (posArray[i * 3 + 1] > 35) posArray[i * 3 + 1] = -35
      if (posArray[i * 3 + 1] < -35) posArray[i * 3 + 1] = 35
      posArray[i * 3] += mouse.x * speeds[i] * 0.3
      posArray[i * 3 + 2] += mouse.y * speeds[i] * 0.3
    }
    geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 z-0 pointer-events-none" style="mix-blend-mode: screen;" />
</template>
