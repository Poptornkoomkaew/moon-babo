// ===== ui/tutorial-art.js : ภาพประกอบสอนเล่น (วาดสดด้วยไอคอนพิกเซล ฉากละหน้า) =====
// พิกัดในฟังก์ชันนี้เป็นหน่วยพิกเซล (canvas 480x224 = 120x56 พิกเซล ขยาย 4 เท่า)
const tc=$('tart').getContext('2d');
const tI=(n,x,y,a,tint)=>drawIconTo(tc,n,x*4,y*4,4,a,tint);
const tR=(x,y,w,h,c)=>{tc.fillStyle=c;tc.fillRect(Math.round(x*4),Math.round(y*4),Math.round(w*4),Math.round(h*4))};
const tBox=(x,y,w,h,c)=>{tR(x,y,w,1,c);tR(x,y+h-1,w,1,c);tR(x,y,1,h,c);tR(x+w-1,y,1,h,c)};
const lerp=(a,b,u)=>a+(b-a)*Math.max(0,Math.min(1,u));
const HEL={h:PAL.cy,H:PAL.sky};

const ART=[
 // 1) เป้าหมาย: ค่า 3 อย่างต้องไม่เป็น 0 และรอดครบวัน
 t=>{
  const lv=[.9,.55+.35*Math.sin(t*1.5),.75];
  ['o2','bolt','hull'].forEach((n,k)=>{const y=4+k*14;tI(n,3,y);tR(14,y+1,46,6,PAL.dk);tR(14,y+1,Math.round(46*lv[k]),6,mc(lv[k]*100))});
  tI('o2',68,4);tR(79,5,20,6,PAL.dk);tI('x',102,4);
  for(let j=0;j<4;j++)tI('moon',68+j*10,24,j<=Math.floor(t)%5?1:.3);
  tI('check',100,40);
 },
 // 2) สั่งงาน: เลือกลูกเรือ → คลิกเป้าหมาย → เดินไปทำ
 t=>{
  const ph=t%5,hx=k=>6+k*16,sel=NAMES[1];
  const cur=ph<1.2?[lerp(70,26,ph/1.2),lerp(46,14,ph/1.2)]:ph<1.8?[26,14]:ph<2.6?[lerp(26,98,(ph-1.8)/.8),lerp(14,32,(ph-1.8)/.8)]:[98,32];
  NAMES.forEach((n,k)=>{if(k===1&&ph>1.1)tBox(hx(k)-1,5,10,10,PAL.yel);tI('helmet',hx(k),6,k===1&&ph>2.6?.35:1,{h:n[1],H:n[2]})});
  tI('crack',92,28);
  if(ph>2.6){
    tI('helmet',lerp(22,84,(ph-2.6)/1.2),28,1,{h:sel[1],H:sel[2]});
    if(ph>3.8){tI('wrench',84,19+Math.round(Math.sin(t*10)));tR(84,40,16,3,PAL.dk);tR(84,40,16*Math.min(1,ph-3.8),3,PAL.lim)}
  }
  tI('cursor',cur[0],cur[1]);
 },
 // 3) เหตุการณ์ → ไอคอนบอกว่าต้องทำอะไร
 t=>{
  const rows=[['meteor','crack','wrench','/','door'],['solarx','helmet','wrench'],['storm','helmet','bolt']],act=Math.floor(t/1.5)%3;
  rows.forEach((r,k)=>{
    const y=3+k*18,a=k===act?1:.35;let x=3;
    r.forEach((n,j)=>{
      if(n==='/'){tc.globalAlpha=a;tc.fillStyle=PAL.gr;tc.font='bold 24px sans-serif';tc.fillText('/',x*4+4,(y+7)*4);tc.globalAlpha=1;x+=6;return}
      if(j>0&&r[j-1]!=='/'){tI('arrow',x,y,a);x+=9}
      tI(n,x,y,a,n==='helmet'?HEL:undefined);x+=9;
    });
  });
 },
 // 4) ห้องใหม่: เลือกการ์ด → ต่อเติมเข้าชั้นบน
 t=>{
  const sel=Math.floor(t/1.2)%3,ics=['fan','shield','hydro'];
  tI('moon',3,2);tc.font='bold 24px Prompt,sans-serif';tc.fillStyle=PAL.yel;tc.fillText('2',52,30);
  ics.forEach((n,k)=>{const x=4+k*25,y=14;tR(x,y,22,34,k===sel?PAL.yel:PAL.dk);tR(x+1,y+1,20,32,PAL.bg);tI(n,x+7,y+4);tR(x+4,y+17,14,2,PAL.lim);tR(x+4,y+22,14,2,PAL.red)});
  tI('arrow',80,26,.8);
  [0,1,2].forEach(f=>{
    const y=36-f*13;
    if(f===0){tR(92,y,26,11,PAL.sl);tR(93,y+1,24,9,PAL.navy)}
    else{for(let q=0;q<26;q+=2){tR(92+q,y,1,1,PAL.sl);tR(92+q,y+10,1,1,PAL.sl)}for(let q=0;q<11;q+=2){tR(92,y+q,1,1,PAL.sl);tR(117,y+q,1,1,PAL.sl)}}
  });
  if(t%3.6>1.8)tI(ics[sel],101,24);else tI('plus',101,24,.4);
  tI('plus',101,11,.3);
 }
];
function drawTutArt(i,t){
  tc.imageSmoothingEnabled=false;tc.globalAlpha=1;tc.fillStyle='#232846';tc.fillRect(0,0,480,224);
  ART[i](t);
}
