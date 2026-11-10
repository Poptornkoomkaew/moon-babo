/**
 * @fileoverview core/state.js : Main game state (G) and state helper functions.
 */

/** @type {Object|null} G - Main game state object */
let G = null;
/** @type {number} days - Selected number of game days */
let days = 10;
/** @type {number} last - Timestamp of the previous frame */
let last = 0;
/** @type {Array} cards - Crew cards in DOM */
let cards = [];
/** @type {number} ts - Current tutorial step index */
let ts = 0;
/** @type {number} TT - Total elapsed time (seconds) used for animations */
let TT = 0;

/**
 * Checks if a room exists at floor f and column c.
 * @param {number} f - Floor index.
 * @param {number} c - Column index.
 * @returns {boolean} True if room exists.
 */
const has = (f, c) => G.rooms.some(r => r.f === f && r.c === c);

/**
 * Checks if a room of type t is operating normally (not broken).
 * @param {string} t - Room type.
 * @returns {boolean} True if operational room exists.
 */
const A = t => G.rooms.some(r => r.type === t && !r.broken);

/**
 * Checks if a room of type t is broken.
 * @param {string} t - Room type.
 * @returns {boolean} True if broken room exists.
 */
const B = t => G.rooms.some(r => r.type === t && r.broken);

/**
 * Gets the display name of a room.
 * @param {Object} r - Room object.
 * @returns {string} Room name.
 */
const rn = r => BASE[r.type] || TYPES[r.type].n;

/**
 * Checks if a ladder route exists between floors at column i.
 * @param {number} lo - Floor level.
 * @param {number} i - Column index.
 * @returns {boolean} True if ladder is available.
 */
const ladder = (lo, i) => (has(lo, i) || has(lo, i + 1)) && (has(lo + 1, i) || has(lo + 1, i + 1));

/**
 * Checks if a floor/column is sealed (airtight).
 * @param {number} f - Floor index.
 * @param {number} c - Column index.
 * @returns {boolean|number} Seal status.
 */
function sealed(f, c) {
  const d = G.d[f];
  return c === 0 ? d[0] : c === 2 ? d[1] : (d[0] && d[1]);
}

/**
 * Checks if station power is active.
 * @returns {boolean} True if power > 0.
 */
const powered = () => G.pw > 0;

/**
 * Resets the game state to initial values.
 */
function reset() {
  G = {
    t: 0,
    days: days,
    o2: 100,
    pw: 100,
    hull: 100,
    rooms: [{ f: 0, c: 0, type: 'ctrl' }, { f: 0, c: 1, type: 'power' }, { f: 0, c: 2, type: 'green' }],
    slot: 0,
    lc: -1,
    d: [[0, 0], [0, 0], [0, 0]],
    br: [],
    sol: false,
    sp: 0,
    st: null,
    ev: 12,
    shake: 0,
    run: true,
    paused: true,
    hits: 0,
    fixed: 0,
    flash: 0,
    bt: 0,
    ht: 0,
    sel: 0,
    mk: null,
    crew: NAMES.map((n, i) => ({
      n: n[0],
      col: n[1],
      sh: n[2],
      x: 380 + i * 50,
      yy: FYs[0],
      fl: 0,
      cl: null,
      task: null,
      t: 0,
      mv: false,
      f: 1
    }))
  };
  buildCrewCards();   // ui/hud.js
  clearMessages();
}

