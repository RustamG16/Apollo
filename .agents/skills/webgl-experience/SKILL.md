---
name: webgl-experience
description: Decide whether an approved website concept genuinely benefits from WebGL and specify a bounded Three.js experience with performance, lifecycle, accessibility, mobile, loading, and static fallbacks. Use only for selected concepts with a concrete 3D communication purpose.
---

# WebGL Experience

WebGL is an optional enhancement, never a default quality signal.

## Pass the activation test

Activate WebGL only when all are true:

1. It communicates a product, spatial idea, material behavior, data relationship, or brand interaction better than static media.
2. CSS, SVG, video, or an image sequence cannot deliver comparable value more simply.
3. The selected concept and available assets support it.
4. A static/mobile/reduced-motion fallback remains coherent.
5. The project accepts the performance and maintenance budget.

If any condition fails, recommend the simpler medium and stop.

## Specify before coding

Write:

- scene purpose and the user behavior it supports;
- camera, objects/materials, lighting, input, and transition states;
- asset formats and compression;
- integration boundary with DOM content and GSAP if used;
- loading, error, unsupported-device, reduced-motion, and no-JavaScript fallbacks;
- device pixel ratio cap, responsive quality tiers, and frame-rate strategy;
- offscreen pause, visibility handling, resize, disposal, and route-unmount cleanup;
- measurement signal and removal condition if the enhancement harms the main goal.

## Implementation principles

- Keep essential content and navigation in semantic DOM.
- Lazy-load the scene and reserve layout space.
- Pause rendering when hidden or offscreen.
- Dispose geometries, materials, textures, controls, and listeners.
- Cap pixel ratio and reduce complexity on mobile/weak devices.
- Avoid blocking the primary action on shader or model loading.
- Verify memory, resize, route navigation, and repeat visits.

Return a go/no-go verdict and the WebGL contract for `06-build-plan.md`. Do not implement spectacle without approval.

