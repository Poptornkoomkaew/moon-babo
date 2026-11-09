// ===== graphics/structure.js : โครงสร้างฐาน (ห้อง, ทางเดิน, ประตูผนึก, บันได, รอยรั่ว) =====
function drawRooms(T,on){
  const lc=(!on&&Math.floor(T*3)%2)?PAL.dk:PAL.cy;
  G.rooms.forEach(r=>{
    const x=COLX[r.c],F=FYs[r.f],w=COLW,s=sealed(r.f,r.c),wc=s?PAL.org:PAL.sl,hc=s?PAL.yel:PAL.gr;
    R(x,F-120,w,120,PAL.navy);
    for(let k=x+20;k<x+w-10;k+=40)R(k,F-116,4,112,'#2b3b7e');
    R(x-4,F-128,w+8,8,wc);R(x-4,F-128,w+8,4,hc);
    R(x-4,F,w+8,12,PAL.dk);R(x-4,F,w+8,4,PAL.sl);
    for(let k=x;k<x+w;k+=16)R(k,F+8,4,4,PAL.sl);
    R(x-4,F-128,8,r.c===0?140:72,wc);R(x+w-4,F-128,8,r.c===2?140:72,wc);
    R(x+30,F-120,w-60,4,lc);
    PROP[r.type](x,F,!r.broken&&on,r);
    if(r.broken&&Math.floor(T*3)%2)R(x+w-24,F-116,12,12,PAL.red);
    if(r.fp>0){R(x+w/2-30,F-12,60,8,PAL.bg);R(x+w/2-30,F-12,60*r.fp,8,PAL.lim)}
  });
}
function drawCorridors(){
  for(let f=0;f<3;f++)for(let i=0;i<2;i++){
    const a=has(f,i),b=has(f,i+1);if(!a&&!b)continue;
    const dx=DX[i],F=FYs[f],up=f<2&&ladder(f,i),dn=f>0&&ladder(f-1,i);
    R(dx-20,F-56,40,56,'#1f2a5a');
    if(!up)R(dx-24,F-64,48,8,PAL.sl);
    if(!dn){R(dx-24,F,48,12,PAL.dk);R(dx-24,F,48,4,PAL.sl)}
    if(!a)R(dx-24,F-64,4,76,PAL.sl);
    if(!b)R(dx+20,F-64,4,76,PAL.sl);
    if(up){const top=FYs[f+1];R(dx-20,top,40,F-64-top,'#1f2a5a');R(dx-24,top,4,F-64-top,PAL.sl);R(dx+20,top,4,F-64-top,PAL.sl);
      R(dx-8,top-56,4,F-top+56,PAL.gr);R(dx+4,top-56,4,F-top+56,PAL.gr);for(let y=top-56;y<F-8;y+=16)R(dx-8,y,16,4,PAL.sl)}
    if(G.d[f][i]){R(dx-8,F-56,16,56,PAL.org);for(let k=0;k<4;k++)R(dx-8,F-56+k*16,16,8,PAL.yel);R(dx-4,F-36,8,16,PAL.bg);R(dx-2,F-32,4,4,PAL.red)}
    else{R(dx-10,F-56,4,56,PAL.gr);R(dx+6,F-56,4,56,PAL.gr);R(dx-10,F-56,20,4,PAL.gr);R(dx-2,F-52,4,4,PAL.lim)}
  }
}
function drawBreaches(T){
  G.br.forEach(b=>{
    const c=sealed(b.f,b.c),col=c?PAL.org:(Math.floor(T*4)%2?PAL.yel:PAL.red);
    R(b.x-8,b.y-16,16,32,col);R(b.x-4,b.y-12,8,24,PAL.bg);
    if(!c)for(let i=0;i<5;i++){const q=(T*1.5+i*.2)%1;Q(Math.round((b.x+14+q*40)/4),Math.round((b.y-8+i*6-q*10)/4),1,1,i%2?PAL.wh:PAL.gr)}
    if(b.p>0){R(b.x-20,b.y+30,40,8,PAL.bg);R(b.x-20,b.y+30,40*b.p,8,PAL.lim)}
  });
}
