// ===== core/game.js : อัปเดตเกมต่อเฟรม (ตัวควบคุมลำดับระบบทั้งหมด) =====
function update(dt){
  if(!G||!G.run||G.paused)return;
  G.t+=dt;
  if(G.t>=G.days*DAY){end(true);return}
  // เสนอห้องใหม่ทุก 2 วัน
  const di=Math.floor(G.t/DAY);
  if(di>=2&&di%2===0&&di!==G.lc&&di<G.days){G.lc=di;offer()}
  tickMessages(dt);
  // ลูกเรือ
  const rep=A('shop')?1.8:B('shop')?.7:1,spd=135*(A('bunk')?1.3:B('bunk')?.6:1);
  updateCrew(dt,rep,spd);
  // เหตุการณ์
  G.ev-=dt;if(G.ev<=0)spawn();
  updateStorm(dt);
  // ทรัพยากร
  updateResources(dt);
  tickEffects(dt);
  if(G.o2<=0||G.hull<=0)end(false);
}
