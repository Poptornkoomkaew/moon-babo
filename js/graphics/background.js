// ===== graphics/background.js : ฉากหลัง (ท้องฟ้า, โลก, พื้นผิวดวงจันทร์, เสาค้ำ, แผงโซลาร์) =====
function drawSky(){
  R(-8,-8,W+16,210,PAL.bg);R(-8,200,W+16,210,'#1e2240');R(-8,400,W+16,270,'#262d57');
}
function drawEarth(){
  for(let dy=-9;dy<=9;dy++)for(let dx=-9;dx<=9;dx++){const d=dx*dx+dy*dy;if(d>81)continue;let c=d>64?PAL.navy:dx+dy<-3?PAL.sky:PAL.blue;if(d<=64&&Math.sin(dx*.7+1)+Math.cos(dy*.8)>1.15)c=PAL.grn;Q(205+dx,18+dy,1,1,c)}
}
function drawGround(){
  for(let x=0;x<240;x++){const gy=152+Math.round(Math.sin(x*.17)+Math.sin(x*.5)*.6);Q(x,gy,1,1,PAL.gr);Q(x,gy+1,1,5,PAL.sl);Q(x,gy+6,1,165-gy,PAL.dk)}
  [[30,160,11],[95,161,8],[160,160,13],[215,162,7]].forEach(c=>{Q(c[0],c[1],c[2],1,PAL.sl);Q(c[0]+1,c[1]+1,c[2]-2,2,'#232846')});
}
function drawSupports(){
  COLX.forEach(x=>{R(x+30,572,12,38,PAL.sl);R(x+COLW-42,572,12,38,PAL.sl)});
}
function drawSolar(T){
  const bad=G.sol,fl=bad&&Math.floor(T*6)%2;
  R(908,580,4,30,PAL.sl);R(896,604,28,8,PAL.dk);
  R(876,548,64,32,bad?(fl?PAL.red:PAL.pur):PAL.blue);
  for(let i=0;i<4;i++)R(876+i*16,548,4,32,PAL.navy);
  R(876,562,64,4,PAL.navy);R(876,548,64,4,bad?PAL.org:PAL.sky);
}
// โครงนั่งร้านของช่องที่ยังไม่ได้สร้างห้อง
function drawScaffold(){
  SLOTS.forEach(s=>{if(has(s[0],s[1]))return;const x=COLX[s[1]],F=FYs[s[0]];
    for(let k=0;k<COLW;k+=8){R(x+k,F-128,4,4,PAL.dk);R(x+k,F+8,4,4,PAL.dk)}
    for(let k=0;k<140;k+=8){R(x-4,F-128+k,4,4,PAL.dk);R(x+COLW,F-128+k,4,4,PAL.dk)}});
}
