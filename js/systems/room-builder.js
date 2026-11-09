// ===== systems/room-builder.js : เสนอการ์ดห้องใหม่ทุก 2 วัน และสร้างห้องที่เลือก =====
function offer(){
  const have=G.rooms.map(r=>r.type),left=Object.keys(TYPES).filter(k=>!have.includes(k));
  if(!left.length||G.slot>=SLOTS.length)return;
  const ch=left.sort(()=>Math.random()-.5).slice(0,3);
  G.paused=true;
  showCards(ch); // ui/cards.js
}
function build(k){
  const s=SLOTS[G.slot++];G.rooms.push({f:s[0],c:s[1],type:k,broken:false,fp:0});
  G.paused=false;$('cards').classList.add('hide');G.flash=0;
  hint('สร้าง'+TYPES[k].n+'แล้ว','ข้อดี: '+TYPES[k].pro+' · ระวัง: '+TYPES[k].con,'');
}
