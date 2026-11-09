// ===== animation/ambient.js : ดาวระยิบระยับ และฝุ่นดวงจันทร์ลอยเลื้อย =====
const stars=Array.from({length:90},()=>({x:rnd(0,W),y:rnd(0,300),r:Math.random()<.2?1.6:.9,p:rnd(0,6)}));
const dust=Array.from({length:18},()=>({x:rnd(0,W),y:rnd(615,655),s:rnd(.2,.6)}));

function drawStars(T){
  stars.forEach(s=>{const b=Math.sin(T*1.5+s.p)>.5;if(s.r>1.2&&b){R(s.x-4,s.y,12,4,PAL.sl);R(s.x,s.y-4,4,12,PAL.sl)}R(s.x,s.y,4,4,b?PAL.wh:PAL.gr)});
}
function drawDust(){
  dust.forEach(d=>{d.x=(d.x+d.s)%W;R(d.x,d.y,4,4,PAL.gr)});
}
