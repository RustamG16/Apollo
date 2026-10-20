---
name: threejs-build
description: "Implements an approved three.js / React Three Fiber scene within the budget and fallback that webgl-experience set."
license: MIT
---
> **convenium.design:** bundled from the 13 skills in `cloudai-x/threejs-skills` (MIT). Read `CONVENIUM-NOTES.md` for provenance and how this skill fits.

# three.js build

`webgl-experience` decides *whether* a page gets 3D and writes its bounds (purpose, budget,
fallback). This skill is the *how*. It is an index: **read only the reference the current step
needs**, one at a time — each file is 240–500 lines, and loading all thirteen costs ~60k tokens.

## Order of work

1. `fundamentals` — renderer, camera, loop, resize, disposal. Always first.
2. `performance` — set the budget from the `webgl-experience` spec before adding content.
3. Then only what the scene uses, from the table below.
4. Before handoff: re-check `performance` (draw calls, texture memory, pixel-ratio cap) and that
   the static fallback and reduced-motion path from the spec work.

## References

| File | Covers |
|---|---|
| `references/fundamentals.md` | Three.js scene setup: scenes and fog, cameras, the renderer and tone mapping, the animation loop, object hierarchies, transforms, core math and cleanup, on WebGL or with WebGPU and TSL. |
| `references/performance.md` | Measuring and optimizing three.js speed: render statistics, memory counters, fewer draw calls via merging, instancing, batching and LOD, fill rate, shadows, CPU work per frame, shader stalls and GPU compute for particles, WebGL or WebGPU with TSL. |
| `references/loaders.md` | Loading three.js assets: glTF with Draco, meshopt and KTX2 compression, other model formats, textures, HDR and EXR environments, progress, caching, cloning and disposal. |
| `references/asset-pipeline.md` | Shrinking glTF assets for three.js with gltf-transform: inspect, validate and optimize commands, Draco, meshopt and quantization, KTX2, WebP and AVIF textures, the loader setup each output needs, and gltfjsx for React. |
| `references/materials.md` | Choosing and configuring three.js materials - unlit, diffuse, specular, PBR, toon, point and line materials - shared properties like blending and stencil, environment response, and the WebGPU node-material and TSL equivalents. |
| `references/lighting.md` | Light types and physical units, shadow maps, HDR environment lighting, light probes, and lighting performance, on WebGL or with WebGPU and TSL. |
| `references/textures.md` | Three.js textures: image loading, color spaces, UV channels and transforms, texture types from canvas to HDR and KTX2, render targets, texture memory. |
| `references/geometry.md` | Creating and shaping three.js geometry: built-in shapes, 3D text, vertex buffers and attributes, merging, instancing, batching, point clouds and lines, on WebGL or with WebGPU and TSL. |
| `references/animation.md` | Keyframe, skeletal and morph-target animation, procedural motion and clip blending, on WebGL or with WebGPU and TSL. |
| `references/interaction.md` | Picking with raycasting, camera controls, transform gizmos, drag, hover and box selection for three.js, identical under WebGL and WebGPU. |
| `references/shaders.md` | Custom GLSL vertex and fragment shaders: uniforms, varyings, shader chunks, extending built-in materials, instanced attributes, plus the same effects as node materials with TSL on WebGPU. |
| `references/postprocessing.md` | Three.js post-processing: composer pass chains, built-in renderer effects, and the WebGPU/TSL node pipeline — bloom, depth of field, ambient occlusion, custom screen effects. |
| `references/react-three-fiber.md` | Building three.js scenes from React with React Three Fiber and drei: renderer setup, the scene graph as JSX, frame-loop, state and loading hooks, pointer events, and adaptive performance, on WebGL or with WebGPU and TSL. |

Each reference keeps its upstream frontmatter; ignore it — it is not a separate skill here.
