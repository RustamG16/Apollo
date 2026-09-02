# WebGL budget checklist

Set project-specific targets instead of pretending one universal budget exists. At minimum record:

- maximum initial WebGL transfer and total scene transfer;
- texture count, dimensions, format, and mipmapping strategy;
- polygon/draw-call expectations;
- desktop and mobile device-pixel-ratio caps;
- acceptable frame-time or frame-rate tier;
- loading threshold before fallback becomes primary;
- memory/leak test across route mounts;
- behavior on battery saver, reduced motion, unsupported WebGL, and background tabs.

If the team cannot test representative devices, prefer a simpler medium.

