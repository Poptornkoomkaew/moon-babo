// ===== systems/crew.js : ระบบลูกเรือ (เดิน ปีนบันได ซ่อม ประจำสถานี) =====

// พิกัด x / ชั้น ของเป้าหมายงาน
function tx(t){return t.k==='br'?t.o.x:t.k==='d'?DX[t.i]:t.k==='fix'?COLX[t.rm.c]+COLW/2:t.k==='move'?t.x:SX[t.k]}
function tf(t){return t.k==='br'?t.o.f:t.k==='d'||t.k==='move'?t.f:t.k==='fix'?t.rm.f:0}
// ลูกเรือ c ประจำสถานี k อยู่ไหม (ชั้นล่างเท่านั้น)
function at(c,k){return c.fl===0&&!c.cl&&c.task&&c.task.k===k&&Math.abs(c.x-tx(c.task))<5}
const stationed=k=>G.crew.some(c=>at(c,k));
function label(t){return t.k==='d'?(G.d[t.f][t.i]?'เปิดประตูผนึก':'ปิดประตูผนึก'):t.k==='fix'?'ซ่อม'+TYPES[t.rm.type].n:LBL[t.k]}
function arrived(c,t){return Math.abs(c.x-tx(t))<=3&&c.fl===tf(t)&&!c.cl}

// อัปเดตลูกเรือทุกคนต่อเฟรม (rep = ความเร็วซ่อม, spd = ความเร็วเดิน)
function updateCrew(dt,rep,spd){
  G.crew.forEach(c=>{
    c.mv=false;
    if(c.cl){const ty=FYs[c.cl.f],d=ty-c.yy,s=80*dt;if(Math.abs(d)<=s){c.yy=ty;c.fl=c.cl.f;c.cl=null}else c.yy+=Math.sign(d)*s;c.mv=true;return}
    const t=c.task;if(!t)return;
    if(t.k==='br'&&!G.br.includes(t.o)||t.k==='sol'&&!G.sol||t.k==='fix'&&!t.rm.broken){c.task=null;return}
    const f=tf(t),mv=(x)=>{const dx=x-c.x;c.x+=Math.sign(dx)*Math.min(Math.abs(dx),spd*dt);c.f=Math.sign(dx);c.mv=true;c.t=0};
    if(c.fl!==f){
      const nf=c.fl+Math.sign(f-c.fl),lo=Math.min(c.fl,nf);let best=-1,bd=1e9;
      [0,1].forEach(i=>{if(ladder(lo,i)){const d=Math.abs(c.x-DX[i]);if(d<bd){bd=d;best=i}}});
      if(best<0){c.task=null;return}
      if(Math.abs(DX[best]-c.x)>3)mv(DX[best]);else c.cl={f:nf};
      return;
    }
    if(Math.abs(tx(t)-c.x)>3){mv(tx(t));return}
    if(t.k==='move'){c.task=null;return}
    if(t.k==='br'){t.o.p+=dt*rep/3;if(t.o.p>=1){G.br=G.br.filter(b=>b!==t.o);G.hull=Math.min(100,G.hull+4);G.fixed++;ban('ซ่อมรอยรั่วสำเร็จ','')}}
    else if(t.k==='sol'){G.sp+=dt*rep/5;if(G.sp>=1){G.sol=false;G.fixed++;ban('ซ่อมแผงโซลาร์สำเร็จ','')}}
    else if(t.k==='fix'){t.rm.fp+=dt*rep/4;if(t.rm.fp>=1){t.rm.broken=false;t.rm.fp=0;G.fixed++;ban('ซ่อม'+TYPES[t.rm.type].n+'สำเร็จ','')}}
    else if(t.k==='d'){c.t+=dt;if(c.t>=1){G.d[t.f][t.i]=G.d[t.f][t.i]?0:1;c.task=null;ban(G.d[t.f][t.i]?'ปิดประตูผนึกแล้ว':'เปิดประตูผนึกแล้ว','')}}
  });
}
