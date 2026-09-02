export const media = {
  hero: new URL('../media/Restaurant_entrance_view_for_hero_202608110048.jpeg', import.meta.url).href,
  threshold: new URL('../media/Threshold_opening_to_stone_table_202608110048.jpeg', import.meta.url).href,
  crossingA: new URL('../media/Camera_crossing_threshold_toward…_202608110048.jpeg', import.meta.url).href,
  crossingB: new URL('../media/Camera_entering_SAVRA_restaurant…_202608110048.jpeg', import.meta.url).href,
  crossingVideo: new URL('../media/Camera_tracking_through_dining_room_202608110048.mp4', import.meta.url).href,
  roomPortrait: new URL('../media/Savra_destination_table_room_por…_202608110048.jpeg', import.meta.url).href,
  roomBefore: new URL('../media/Savra_dining_room_before_service_202608110048.jpeg', import.meta.url).href,
  roomEmpty: new URL('../media/Empty_dining_room_interior_view_202608110048.jpeg', import.meta.url).href,
  roomTable: new URL('../media/SAVRA_table_prepared_for_two_202608110048.jpeg', import.meta.url).href,
  chefPortrait: new URL('../media/Chef_plating_at_pass_202608110048.jpeg', import.meta.url).href,
  chefPlate: new URL('../media/Chef_plating_dish_202608110048.jpeg', import.meta.url).href,
  chefTweezers: new URL('../media/Chef_plating_dish_with_tweezers_202608110048.jpeg', import.meta.url).href,
  seaBass: new URL('../media/Charcoal_sea_bass_with_fennel_202608110048.jpeg', import.meta.url).href,
  beetroot: new URL('../media/Salt-baked_beetroot_with_labneh_202608110048.jpeg', import.meta.url).href,
  lamb: new URL('../media/Lamb_backstrap_with_cherry_glaze_202608110048.jpeg', import.meta.url).href,
  flatbread: new URL('../media/Flatbread_served_with_smoked_butter_202608110048.jpeg', import.meta.url).href,
  quince: new URL('../media/Quince_dessert_with_yogurt_and_202608110048.jpeg', import.meta.url).href,
  overhead: new URL('../media/Dish_photographed_overhead_on_table_202608110048.jpeg', import.meta.url).href,
  tableTwo: new URL('../media/Table_set_for_two_202608110048.jpeg', import.meta.url).href,
  tableLinen: new URL('../media/Table_settings_with_linen_runner_202608110048.jpeg', import.meta.url).href,
  linen: new URL('../media/Stone_meets_textured_linen_weave_202608110048.jpeg', import.meta.url).href,
  entrance: new URL('../media/SAVRA_restaurant_entrance_in_Vienna_202608110048.jpeg', import.meta.url).href,
} as const

export type MediaKey = keyof typeof media

export const assetManifest: Array<{
  key: MediaKey
  role: string
  ratio: string
  priority: 'high' | 'normal' | 'lazy'
  alt: string
  mobilePosition: string
}> = [
  { key: 'hero', role: 'threshold hero', ratio: '16:9', priority: 'high', alt: 'Blue SAVRA doors opening onto a warmly lit table for two', mobilePosition: '50% center' },
  { key: 'threshold', role: 'crossing poster', ratio: '16:9', priority: 'normal', alt: 'A narrow opening in deep blue doors revealing the restaurant', mobilePosition: '50% center' },
  { key: 'crossingA', role: 'crossing still', ratio: '16:9', priority: 'lazy', alt: 'The view moving through SAVRA’s threshold', mobilePosition: '50% center' },
  { key: 'crossingB', role: 'crossing handoff still', ratio: '16:9', priority: 'lazy', alt: 'The dining room seen while entering SAVRA', mobilePosition: '50% center' },
  { key: 'crossingB', role: 'crossing handoff still', ratio: '16:9', priority: 'lazy', alt: 'The dining room seen while entering SAVRA', mobilePosition: '50% center' },
  { key: 'roomPortrait', role: 'room anchor', ratio: '9:16', priority: 'lazy', alt: 'An arched passage framing a table set for two', mobilePosition: '50% center' },
  { key: 'roomBefore', role: 'room landscape', ratio: '16:9', priority: 'lazy', alt: 'SAVRA dining room before service', mobilePosition: '50% center' },
  { key: 'roomEmpty', role: 'room landscape', ratio: '16:9', priority: 'lazy', alt: 'The empty dining room interior', mobilePosition: '50% center' },
  { key: 'roomTable', role: 'room detail', ratio: '16:9', priority: 'lazy', alt: 'A SAVRA table prepared for two guests', mobilePosition: '50% center' },
  { key: 'chefPortrait', role: 'craft opening', ratio: '3:4', priority: 'lazy', alt: 'A chef working beneath the pass light', mobilePosition: '48% center' },
  { key: 'chefPlate', role: 'craft sequence', ratio: '16:9', priority: 'lazy', alt: 'A chef plating a dish at SAVRA', mobilePosition: '60% center' },
  { key: 'chefTweezers', role: 'craft sequence', ratio: '16:9', priority: 'lazy', alt: 'A chef finishing a plate with tweezers', mobilePosition: '55% center' },
  { key: 'seaBass', role: 'menu dish', ratio: '3:4', priority: 'lazy', alt: 'Charcoal sea bass with fennel', mobilePosition: '50% center' },
  { key: 'beetroot', role: 'menu dish', ratio: '3:4', priority: 'lazy', alt: 'Salt-baked beetroot with labneh', mobilePosition: '50% center' },
  { key: 'lamb', role: 'menu dish', ratio: '16:9', priority: 'lazy', alt: 'Lamb backstrap with cherry glaze', mobilePosition: '50% center' },
  { key: 'flatbread', role: 'menu dish', ratio: '3:4', priority: 'lazy', alt: 'Flatbread served with smoked butter', mobilePosition: '50% center' },
  { key: 'quince', role: 'menu dish', ratio: '3:4', priority: 'lazy', alt: 'Quince dessert with yogurt', mobilePosition: '50% center' },
  { key: 'overhead', role: 'menu dish', ratio: '4:3', priority: 'lazy', alt: 'A finished seasonal dish photographed overhead', mobilePosition: '50% center' },
  { key: 'tableTwo', role: 'reservation interlude', ratio: '3:4', priority: 'lazy', alt: 'An intimate table set for two', mobilePosition: '50% center' },
  { key: 'tableLinen', role: 'reservation interlude', ratio: '3:4', priority: 'lazy', alt: 'Table settings with a linen runner', mobilePosition: '50% center' },
  { key: 'linen', role: 'material texture', ratio: '16:9', priority: 'lazy', alt: '', mobilePosition: '50% center' },
  { key: 'entrance', role: 'closing room', ratio: '16:9', priority: 'lazy', alt: 'The entrance to SAVRA in Vienna', mobilePosition: '50% center' },
]
