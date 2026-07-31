<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement>()
const paused = ref(false)
let animationId = 0

const PARTICLE_COUNT = 2500

defineExpose({
  setPaused(v: boolean) { paused.value = v }
})

onMounted(() => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 60

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colorsArr = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)
  const speeds = new Float32Array(PARTICLE_COUNT)
  const offsets = new Float32Array(PARTICLE_COUNT)

  const palette = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#e0e7ff'),
    new THREE.Color('#c7d2fe'),
    new THREE.Color('#a5b4fc'),
    new THREE.Color('#93c5fd'),
    new THREE.Color('#c4b5fd'),
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 130
    positions[i * 3 + 1] = (Math.random() - 0.5) * 140
    positions[i * 3 + 2] = (Math.random() - 0.5) * 130
    const c = palette[Math.floor(Math.random() * palette.length)]
    colorsArr[i * 3] = c.r
    colorsArr[i * 3 + 1] = c.g
    colorsArr[i * 3 + 2] = c.b
    sizes[i] = 0.08 + Math.random() * 0.45
    speeds[i] = 0.006 + Math.random() * 0.019
    offsets[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3))

  const sprite = createSnowTexture()
  const material = new THREE.PointsMaterial({
    size: 0.35,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
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

  function createSnowTexture(): THREE.Texture {
    const size = 64
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,0.9)')
    g.addColorStop(0.15, 'rgba(224,231,255,0.6)')
    g.addColorStop(0.5, 'rgba(165,180,252,0.1)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(c)
  }

  let time = 0
  function animate() {
    animationId = requestAnimationFrame(animate)
    if (paused.value) return
    time += 0.01

    mouse.x += (mouse.targetX - mouse.x) * 0.03
    mouse.y += (mouse.targetY - mouse.y) * 0.03

    const posArray = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3 + 1] -= speeds[i]
      posArray[i * 3] += Math.sin(time * 0.6 + offsets[i]) * 0.015 + mouse.x * speeds[i] * 0.2

      if (posArray[i * 3 + 1] < -70) {
        posArray[i * 3 + 1] = 70 + (Math.random() - 0.5) * 6
        posArray[i * 3] = (Math.random() - 0.5) * 130
      }
    }
    geometry.attributes.position.needsUpdate = true

    points.rotation.y += 0.0003 + mouse.x * 0.0001

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
