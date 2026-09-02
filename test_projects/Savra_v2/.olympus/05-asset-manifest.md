# SAVRA asset manifest

## Provenance

All production media comes from the user-supplied files in `../media/`. No external stock, generated media, or purchased assets were introduced. Original files remain untouched.

The code-level manifest is `../src/assets.ts`; it records role, aspect ratio, priority, alt text, and mobile crop guidance for every visual used by the page.

## Active set

- Hero: `Restaurant_entrance_view_for_hero_202608110048.jpeg`
- Crossing: `Threshold_opening_to_stone_table_202608110048.jpeg`, both supplied `Camera_*` stills, and `Camera_tracking_through_dining_room_202608110048.mp4`
- Room: the supplied destination-room portrait, before-service room, empty room, and table-for-two stills
- Craft: the three supplied chef-plating stills
- Menu: charcoal sea bass, beetroot with labneh, lamb backstrap, flatbread, quince, and overhead dish
- Reservation: table-for-two, table-linen, and linen/stone texture
- Close: SAVRA Vienna entrance

## Loading policy

- The 82 KB hero JPEG is eager and high-priority with fixed dimensions.
- Other images are lazy-decoded with fixed dimensions.
- Video is muted, inline, looped, poster-backed, `preload="none"`, and only asked to play as the crossing section approaches.
- Vite emits only declared production media. Unused supplied alternates stay untouched outside the production bundle.

## Open asset decisions

No live booking URL, verified address, hours, social links, or legal URLs were supplied. The interface labels those facts as forthcoming rather than inventing them.
