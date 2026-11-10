// ===== ui/screens.js : หน้าเมนูเริ่ม และหน้าจบเกม (เน้นไอคอน) =====
// ภาพหน้าเมนู: ลูกเรือ 3 คน + พระจันทร์
$('mhero').innerHTML=NAMES.map(n=>ico('helmet','xl',{h:n[1],H:n[2]})).join('')+ico('moon','xl');

function drawMenuBg(){
  const mcv=document.getElementById('menubg');if(!mcv)return;
  const mctx=mcv.getContext('2d'),mob=document.createElement('canvas');
  mob.width=240;mob.height=165;const mp=mob.getContext('2d');
  mp.fillStyle=PAL.bg;mp.fillRect(0,0,240,165);
  [[22,28],[55,18],[95,42],[145,22],[185,38],[215,12],[38,72],[105,88],[158,62],[210,78],[72,118],[132,128]].forEach(([sx,sy],idx)=>{
    mp.fillStyle=idx%2===0?PAL.wh:PAL.sky;mp.fillRect(sx,sy,2,2);
  });
  const ex=205,ey=28,er=10;
  for(let dy=-er;dy<=er;dy++)for(let dx=-er;dx<=er;dx++){
    const d=dx*dx+dy*dy;if(d>er*er)continue;let c=d>(er-2)*(er-2)?PAL.navy:dx+dy<-2?PAL.sky:PAL.blue;
    if(d<=(er-2)*(er-2)&&(dx+dy)%3===0)c=PAL.grn;mp.fillStyle=c;mp.fillRect(ex+dx,ey+dy,1,1);
  }
  const sx=35,sy=32,sr=9;
  for(let dy=-sr;dy<=sr;dy++)for(let dx=-sr;dx<=sr;dx++){
    const d=dx*dx+dy*dy;if(d>sr*sr)continue;let c=d>(sr-2)*(sr-2)?PAL.org:PAL.yel;
    if(Math.abs(dx)===Math.abs(dy)&&d<(sr-3)*(sr-3))c=PAL.dk;mp.fillStyle=c;mp.fillRect(sx+dx,sy+dy,1,1);
  }
  for(let x=0;x<240;x++){
    const gy=112+Math.round(Math.sin(x*.08)*8+(x/240)*20);
    mp.fillStyle=PAL.gr;mp.fillRect(x,gy,1,1);
    mp.fillStyle=PAL.sl;mp.fillRect(x,gy+1,1,4);
    mp.fillStyle=PAL.dk;mp.fillRect(x,gy+5,1,165-(gy+5));
  }
  [[45,125,7],[95,135,10],[150,140,8],[195,145,6]].forEach(([cx,cy,cr])=>{
    mp.fillStyle=PAL.sl;mp.fillRect(cx-cr,cy-2,cr*2,3);
    mp.fillStyle=PAL.dk;mp.fillRect(cx-cr+1,cy-1,cr*2-2,2);
  });
  mctx.imageSmoothingEnabled=false;mctx.clearRect(0,0,mcv.width,mcv.height);
  mctx.drawImage(mob,0,0,mcv.width,mcv.height);
}
drawMenuBg();

function end(win){
  G.run=false;
  const day=Math.min(G.days,Math.floor(G.t/DAY)+1);
  $('et').textContent=win?'สำเร็จ':'ล้มเหลว';
  $('et').style.color=win?'var(--lim)':'var(--bad)';
  // สาเหตุ (ถ้าแพ้) + สถิติเป็นไอคอน
  let h=win?'<span class="chip pro">'+ico('check','lg')+'</span>'
           :'<span class="chip con">'+ico(G.o2<=0?'o2':'hull','lg')+ico('x','lg')+'</span>';
  h+=chip('moon',(win?G.days:day)+'/'+G.days,'','md')+chip('wrench',G.fixed,'','md')+chip('meteor',G.hits,'','md')+chip('plus',G.rooms.length-3,'','md');
  $('ed').innerHTML=h;
  $('end').classList.remove('hide');
}

// ปุ่มเลือกระยะเวลา
document.querySelectorAll('#opts button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#opts button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');days=+b.dataset.d}));
// ปุ่มเริ่ม → เข้าหน้าสอนเล่น
$('go').addEventListener('click',()=>{reset();$('menu').classList.add('hide');ts=0;$('tut').classList.remove('hide');showTut()});
// ปุ่มเล่นใหม่
$('again').addEventListener('click',()=>{$('end').classList.add('hide');$('menu').classList.remove('hide')});
