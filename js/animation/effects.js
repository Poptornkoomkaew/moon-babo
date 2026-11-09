// ===== animation/effects.js : เอฟเฟกต์ภาพ (จอสั่น, แฟลชแดง, พายุสุริยะ, เครื่องหมายสั่งงาน) =====

// ตัวจับเวลาเอฟเฟกต์ (เรียกจาก update)
function tickEffects(dt){
  if(G.shake>0)G.shake-=dt;if(G.flash>0)G.flash-=dt;
}
// ค่าชดเชยตำแหน่งตอนจอสั่น
function shakeOffset(){
  return [G.shake>0?Math.round(rnd(-2,2)):0,G.shake>0?Math.round(rnd(-2,2)):0];
}
// แถบพายุสุริยะพาดฟ้า
function drawStormBands(T){
  if(G.st){const a=G.st.a>0;for(let k=0;k<3;k++)for(let x=0;x<W;x+=8){const y=44+k*16+Math.round(Math.sin(x*.05+T*(a?8:2))*1.5)*4;if(a||Math.floor(x/16+T*3)%2)R(x,y,8,4,k===1?PAL.yel:PAL.org)}}
}
// เครื่องหมายขยายตอนคลิกสั่งงาน
function drawMarker(){
  if(G.mk&&G.mk.t>0){G.mk.t-=.016;const d=Math.round(2+(.5-G.mk.t)*16),mx=Math.round(G.mk.x/4),my=Math.round(G.mk.y/4);[[-d,-d],[d,-d],[-d,d],[d,d]].forEach(o=>Q(mx+o[0],my+o[1],1,1,G.mk.c))}
}
// แฟลชแดงเมื่อถูกอุกกาบาต (วาดบน canvas จริง)
function drawFlash(){
  if(G.flash>0){ctx.fillStyle='rgba(177,62,83,'+G.flash*.6+')';ctx.fillRect(0,0,W,H)}
}
