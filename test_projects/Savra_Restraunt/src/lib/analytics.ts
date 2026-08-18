export const savraEventNames = [
  'savra_page_view',
  'savra_nav_select',
  'savra_menu_dish_view',
  'savra_reservation_open',
  'savra_reservation_step',
  'savra_reservation_submit_demo',
  'savra_motion_mode',
] as const

type SavraEventName = (typeof savraEventNames)[number]
type AllowedValue = string | number | boolean
type EventProperties = Record<string, AllowedValue>

const allowedProperties: Record<SavraEventName, readonly string[]> = {
  savra_page_view: [],
  savra_nav_select: ['destination'],
  savra_menu_dish_view: ['dish_id', 'source'],
  savra_reservation_open: ['source'],
  savra_reservation_step: ['step', 'direction'],
  savra_reservation_submit_demo: ['source'],
  savra_motion_mode: ['mode'],
}

export function trackSavraEvent(name: SavraEventName, properties: EventProperties = {}) {
  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter(([key]) => allowedProperties[name].includes(key)),
  )

  // Local demonstration only: no network, identity, cookie, or persistent storage.
  console.info('[SAVRA event]', { name, properties: cleanProperties })
}
