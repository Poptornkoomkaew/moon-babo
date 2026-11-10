/**
 * @fileoverview systems/resources.js : Resource management (Oxygen, Power, Hull Integrity).
 */

/**
 * Updates station resources (O2, Power, Hull) each frame.
 * @param {number} dt - Delta time in seconds.
 */
function updateResources(dt) {
  const on = powered();
  const gs = sealed(0, 2);
  
  // Oxygen generation and consumption
  let o = (on ? 1 : 0) + (on && !gs ? .6 : 0) + (stationed('gh') && !gs ? .8 : 0);
  if (on && A('air')) o += 1.6;
  
  G.rooms.forEach(r => {
    if (r.type === 'hydro') {
      if (!r.broken && on && !sealed(r.f, r.c)) o += 1;
      if (r.broken) o -= .6;
    }
  });
  
  let leak = 0;
  G.br.forEach(b => {
    leak += sealed(b.f, b.c) ? .3 : 1.8;
  });
  
  G.o2 = Math.max(0, Math.min(100, G.o2 + (o - 1.3 - leak) * dt));
  
  // Power generation and consumption
  const gen = ((G.st && G.st.a > 0) ? 0 : G.sol ? 1 : 3) + (stationed('pw') ? 1 : 0) + (A('batt') ? 1.2 : 0);
  const dem = 2 + (A('air') ? 1 : 0) + (A('shield') ? 1 : 0) + (B('batt') ? 2 : 0);
  G.pw = Math.max(0, Math.min(100, G.pw + (gen - dem) * .8 * dt));
  
  // Hull integrity
  if (G.st && G.st.a > 0 && !(A('shield') && on)) G.hull -= 1.5 * dt;
  if (A('shop')) G.hull = Math.min(100, G.hull + .15 * dt);
}

