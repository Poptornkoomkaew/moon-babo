// ===== systems/events.js : เหตุการณ์สุ่ม (โซลาร์เสีย, พายุสุริยะ, ห้องขัดข้อง, อุกกาบาต) =====
function spawn(){
  const day=Math.floor(G.t/DAY)+1,r=Math.random(),on=powered();
  const cand=G.rooms.filter(x=>TYPES[x.type]&&!x.broken);
  if(G.st){G.ev=3;return}
  if(r<.12&&!G.sol){G.sol=true;G.sp=0;ban('แผงโซลาร์เสียหาย!','bad');hint('แผงโซลาร์เสียหาย','ส่งลูกเรือไปซ่อมที่แอร์ล็อก (ขวาสุดชั้นล่าง) ระหว่างนี้ผลิตไฟได้น้อยลง','bad')}
  else if(r<.25){G.st={w:A('radar')?12:5,a:0};ban('พายุสุริยะกำลังมา','warn');hint('พายุสุริยะกำลังมา','ไฟจากโซลาร์จะดับ 12 วิ ส่งคนไปจูนเครื่องที่ห้องพลังงานเพื่อเสริมไฟ'+(A('shield')?' โล่จะช่วยกันความเสียหาย':' ฐานจะค่อยๆ เสียหายระหว่างพายุ'),'warn')}
  else if(r<.5&&cand.length){
    const m=cand[Math.floor(rnd(0,cand.length))];m.broken=true;m.fp=0;
    if(m.type==='shield')G.pw=Math.max(0,G.pw-12);
    if(m.type==='shop'){G.hull-=4;G.flash=.3}
    ban(TYPES[m.type].n+'ขัดข้อง','bad');hint(TYPES[m.type].n+'ขัดข้อง',TYPES[m.type].hint+' · เลือกลูกเรือแล้วคลิกที่ห้องนั้นเพื่อซ่อม','bad');
  }else{
    const sh=A('shield')&&on;
    G.hull-=8*(sh?.35:1)*(stationed('mon')?.7:1);G.hits++;G.shake=.5;G.flash=.3;
    if(Math.random()<.75&&G.br.length<4){
      const m=G.rooms[Math.floor(rnd(0,G.rooms.length))];
      G.br.push({f:m.f,c:m.c,x:rnd(COLX[m.c]+30,COLX[m.c]+COLW-30),y:FYs[m.f]-rnd(30,95),p:0});
      ban('อุกกาบาตชน'+rn(m),'bad');hint('อุกกาบาตชน'+rn(m),'คลิกลูกเรือ แล้วคลิกรอยรั่วเพื่อซ่อม · หรือคลิกประตูข้างห้องเพื่อผนึกอากาศไม่ให้รั่วต่อ','bad');
    }else{ban('อุกกาบาตชนตัวฐาน','bad');hint('อุกกาบาตชนตัวฐาน',(sh?'โล่ช่วยไว้ได้มาก':'ฐานเสียหาย')+' · ส่งคนไปเฝ้าระวังที่จอห้องควบคุมช่วยลดความเสียหายครั้งต่อไป','warn')}
  }
  G.ev=Math.max(4.5,rnd(8,14)-day*.5)*(B('radar')?.65:1);
}

// นับถอยหลังพายุ → พายุมาถึง → พายุผ่านไป
function updateStorm(dt){
  if(G.st){
    if(G.st.w>0){G.st.w-=dt;if(G.st.w<=0){G.st.w=0;G.st.a=12;ban('พายุสุริยะมาแล้ว ไฟจากโซลาร์ดับชั่วคราว','warn')}}
    else{G.st.a-=dt;if(G.st.a<=0){G.st=null;ban('พายุสุริยะผ่านไปแล้ว','')}}
  }
}
