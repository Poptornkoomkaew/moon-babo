// ===== systems/events.js : เหตุการณ์สุ่ม (โซลาร์เสีย, พายุสุริยะ, ห้องขัดข้อง, อุกกาบาต) =====
// แต่ละเหตุการณ์แสดงคำแนะนำเป็นไอคอน: hint(ชื่อสั้น, คำอธิบายสั้น, ระดับ, ไอคอนเหตุการณ์, ขั้นตอน[], ชิป[])
function spawn(){
  const day=Math.floor(G.t/DAY)+1,r=Math.random(),on=powered();
  const cand=G.rooms.filter(x=>TYPES[x.type]&&!x.broken);
  if(G.st){G.ev=3;return}
  if(r<.12&&!G.sol){
    G.sol=true;G.sp=0;
    hint('แผงโซลาร์เสีย','ไฟผลิตน้อยลง','bad','solarx',['helmet','wrench','solar']);
  }else if(r<.25){
    G.st={w:A('radar')?12:5,a:0};
    hint('พายุสุริยะ','ไฟดับ 12 วิ','warn','storm',['helmet','bolt'],A('shield')?null:[['hull','−','con']]);
  }else if(r<.5&&cand.length){
    const m=cand[Math.floor(rnd(0,cand.length))],Y=TYPES[m.type];m.broken=true;m.fp=0;
    if(m.type==='shield')G.pw=Math.max(0,G.pw-12);
    if(m.type==='shop'){G.hull-=4;G.flash=.3}
    hint(Y.n,Y.fx,'bad',Y.ic,['helmet','wrench',Y.ic]);
  }else{
    const sh=A('shield')&&on;
    G.hull-=8*(sh?.35:1)*(stationed('mon')?.7:1);G.hits++;G.shake=.5;G.flash=.3;
    if(Math.random()<.75&&G.br.length<4){
      const m=G.rooms[Math.floor(rnd(0,G.rooms.length))];
      G.br.push({f:m.f,c:m.c,x:rnd(COLX[m.c]+30,COLX[m.c]+COLW-30),y:FYs[m.f]-rnd(30,95),p:0});
      hint('อุกกาบาต','','bad','meteor',['helmet','wrench','crack','/','helmet','door']);
    }else hint('ชนตัวฐาน',sh?'โล่ช่วยไว้':'','warn','meteor',['helmet','monitor'],[['hull','−','con']]);
  }
  G.ev=Math.max(4.5,rnd(8,14)-day*.5)*(B('radar')?.65:1);
}

// นับถอยหลังพายุ → พายุมาถึง → พายุผ่านไป
function updateStorm(dt){
  if(G.st){
    if(G.st.w>0){G.st.w-=dt;if(G.st.w<=0){G.st.w=0;G.st.a=12;ban('พายุมาแล้ว','warn','storm')}}
    else{G.st.a-=dt;if(G.st.a<=0){G.st=null;ban('พายุผ่าน','ok','check')}}
  }
}
