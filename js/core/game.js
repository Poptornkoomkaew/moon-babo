/**
 * @fileoverview core/game.js : Main per-frame game update controller.
 */

/**
 * Updates game state for the current frame.
 * @param {number} dt - Delta time in seconds since last frame.
 */
function update(dt) {
  if (!G || !G.run || G.paused) return;
  G.t += dt;
  if (G.t >= G.days * DAY) { end(true); return; }
  
  // Offer new rooms every 2 days
  const di = Math.floor(G.t / DAY);
  if (di >= 2 && di % 2 === 0 && di !== G.lc && di < G.days) {
    G.lc = di;
    offer();
  }
  
  tickMessages(dt);
  
  // Crew updates (repair speed & movement speed modifiers based on rooms)
  const rep = A('shop') ? 1.8 : B('shop') ? .7 : 1;
  const spd = 135 * (A('bunk') ? 1.3 : B('bunk') ? .6 : 1);
  updateCrew(dt, rep, spd);
  
  // Events and storms
  G.ev -= dt;
  if (G.ev <= 0) spawn();
  updateStorm(dt);
  
  // Resources and effects
  updateResources(dt);
  tickEffects(dt);
  
  if (G.o2 <= 0 || G.hull <= 0) end(false);
}

