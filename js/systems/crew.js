/**
 * @fileoverview systems/crew.js : Crew management (walking, climbing ladders, repairing, stationing).
 */

/**
 * Gets target X coordinate for a task.
 * @param {Object} t - Task object.
 * @returns {number} Target X coordinate.
 */
function tx(t) {
  return t.k === 'br' ? t.o.x : t.k === 'd' ? DX[t.i] : t.k === 'fix' ? COLX[t.rm.c] + COLW / 2 : t.k === 'move' ? t.x : SX[t.k];
}

/**
 * Gets target floor for a task.
 * @param {Object} t - Task object.
 * @returns {number} Target floor index.
 */
function tf(t) {
  return t.k === 'br' ? t.o.f : t.k === 'd' || t.k === 'move' ? t.f : t.k === 'fix' ? t.rm.f : 0;
}

/**
 * Checks if crew member c is stationed at task k on bottom floor.
 * @param {Object} c - Crew member.
 * @param {string} k - Task/station key.
 * @returns {boolean} True if stationed.
 */
function at(c, k) {
  return c.fl === 0 && !c.cl && c.task && c.task.k === k && Math.abs(c.x - tx(c.task)) < 5;
}

/**
 * Checks if any crew member is stationed at k.
 * @param {string} k - Station key.
 * @returns {boolean} True if stationed.
 */
const stationed = k => G.crew.some(c => at(c, k));

/**
 * Gets label for a task.
 * @param {Object} t - Task object.
 * @returns {string} Task label.
 */
function label(t) {
  return t.k === 'd' ? (G.d[t.f][t.i] ? 'เปิด' : 'ปิด') : LBL[t.k];
}

/**
 * Checks if crew member has arrived at task location.
 * @param {Object} c - Crew member.
 * @param {Object} t - Task object.
 * @returns {boolean} True if arrived.
 */
function arrived(c, t) {
  return Math.abs(c.x - tx(t)) <= 3 && c.fl === tf(t) && !c.cl;
}

/**
 * Updates all crew members per frame.
 * @param {number} dt - Delta time in seconds.
 * @param {number} rep - Repair speed multiplier.
 * @param {number} spd - Movement speed.
 */
function updateCrew(dt, rep, spd) {
  G.crew.forEach(c => {
    c.mv = false;
    if (c.cl) {
      const ty = FYs[c.cl.f], d = ty - c.yy, s = 80 * dt;
      if (Math.abs(d) <= s) {
        c.yy = ty;
        c.fl = c.cl.f;
        c.cl = null;
      } else {
        c.yy += Math.sign(d) * s;
      }
      c.mv = true;
      return;
    }
    const t = c.task;
    if (!t) return;
    if (t.k === 'br' && !G.br.includes(t.o) || t.k === 'sol' && !G.sol || t.k === 'fix' && !t.rm.broken) {
      c.task = null;
      return;
    }
    const f = tf(t), mv = (x) => {
      const dx = x - c.x;
      c.x += Math.sign(dx) * Math.min(Math.abs(dx), spd * dt);
      c.f = Math.sign(dx);
      c.mv = true;
      c.t = 0;
    };
    if (c.fl !== f) {
      const nf = c.fl + Math.sign(f - c.fl), lo = Math.min(c.fl, nf);
      let best = -1, bd = 1e9;
      [0, 1].forEach(i => {
        if (ladder(lo, i)) {
          const d = Math.abs(c.x - DX[i]);
          if (d < bd) {
            bd = d;
            best = i;
          }
        }
      });
      if (best < 0) { c.task = null; return; }
      if (Math.abs(DX[best] - c.x) > 3) mv(DX[best]);
      else c.cl = { f: nf };
      return;
    }
    if (Math.abs(tx(t) - c.x) > 3) { mv(tx(t)); return; }
    if (t.k === 'move') { c.task = null; return; }
    if (t.k === 'br') {
      t.o.p += dt * rep / 3;
      if (t.o.p >= 1) {
        G.br = G.br.filter(b => b !== t.o);
        G.hull = Math.min(100, G.hull + 4);
        G.fixed++;
        ban('ซ่อมแล้ว', 'ok', 'crack');
      }
    } else if (t.k === 'sol') {
      G.sp += dt * rep / 5;
      if (G.sp >= 1) {
        G.sol = false;
        G.fixed++;
        ban('ซ่อมแล้ว', 'ok', 'solar');
      }
    } else if (t.k === 'fix') {
      t.rm.fp += dt * rep / 4;
      if (t.rm.fp >= 1) {
        t.rm.broken = false;
        t.rm.fp = 0;
        G.fixed++;
        ban('ซ่อมแล้ว', 'ok', TYPES[t.rm.type].ic);
      }
    } else if (t.k === 'd') {
      c.t += dt;
      if (c.t >= 1) {
        G.d[t.f][t.i] = G.d[t.f][t.i] ? 0 : 1;
        c.task = null;
        ban(G.d[t.f][t.i] ? 'ปิด' : 'เปิด', '', 'door');
      }
    }
  });
}

