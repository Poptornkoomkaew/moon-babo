// ===== graphics/labels.js : สัญลักษณ์บนฉาก (ไอคอนแทนข้อความ) =====
function drawLabels(){
  const T=TT,blink=Math.floor(T*3)%2;
  G.rooms.forEach(r=>{
    const x=COLX[r.c],F=FYs[r.f];
    drawIcon(roomIc(r),x+10,F-114,3);                                  // ไอคอนบอกชนิดห้อง
    if(r.broken){drawIcon('warn',x+COLW-66,F-114,3,blink?1:.35);drawIcon('wrench',x+COLW-36,F-114,3)} // ขัดข้อง → คลิกซ่อม
  });
  SLOTS.forEach(s=>{if(!has(s[0],s[1]))drawIcon('plus',COLX[s[1]]+COLW/2-12,FYs[s[0]]-64,3,.35)}); // ช่องว่างรอต่อเติม
  if(G.sol)drawIcon('solarx',896,512,3,Math.floor(T*4)%2?1:.5);       // แผงโซลาร์เสีย
  G.br.forEach(b=>{const c=sealed(b.f,b.c);drawIcon(c?'door':'crack',b.x-12,b.y-52,3,c||blink?1:.5)}); // รั่ว / ผนึกแล้ว
  if(G.st){                                                           // พายุ: ไอคอน + ตัวเลขนับถอยหลัง
    const a=G.st.a>0;
    drawIcon('storm',W/2-44,6,3,a||blink?1:.45);
    TX(String(Math.ceil(a?G.st.a:G.st.w)),W/2-8,32,a?PAL.yel:PAL.org,22,'left');
  }
}
