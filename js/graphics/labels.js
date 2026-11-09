// ===== graphics/labels.js : ข้อความบนฉาก (ชื่อห้อง, รั่ว!, พายุสุริยะ ฯลฯ) =====
function drawLabels(){
  G.rooms.forEach(r=>{const x=COLX[r.c],F=FYs[r.f];TX(rn(r),x+12,F-102,PAL.wh,12,'left');if(r.broken)TX('ขัดข้อง! คลิกเพื่อซ่อม',x+COLW-34,F-102,PAL.org,12,'right')});
  SLOTS.forEach(s=>{if(!has(s[0],s[1]))TX('พื้นที่ว่าง',COLX[s[1]]+COLW/2,FYs[s[0]]-60,'#566c86',11)});
  TX('แอร์ล็อก',COLX[2]+221,FYs[0]-78,PAL.wh,11);
  if(G.sol)TX('เสีย',908,540,PAL.org,12);
  G.br.forEach(b=>{const c=sealed(b.f,b.c);TX(c?'ผนึกแล้ว':'รั่ว!',b.x,b.y-24,c?PAL.yel:PAL.org,11)});
  if(G.st){const a=G.st.a>0;TX(a?'พายุสุริยะ '+Math.ceil(G.st.a)+' วิ':'พายุสุริยะอีก '+Math.ceil(G.st.w)+' วิ',W/2,24,PAL.yel,14)}
}
