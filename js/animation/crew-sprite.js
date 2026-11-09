// ===== animation/crew-sprite.js : ตัวลูกเรือ (เดิน, ปีน, ซ่อมมีประกายไฟ, ลูกศรเลือก) =====
function drawCrew(T){
  G.crew.forEach((c,i)=>{
    const f=c.f>=0?1:-1,x=Math.round(c.x/4),gy=Math.round(c.yy/4),col=c.col,sh=c.sh,fr=Math.floor(T*8)%2;
    const work=c.task&&!c.mv&&arrived(c,c.task)&&['br','sol','fix'].includes(c.task.k);
    const m=(dx,y,w,h,cc)=>Q(f>0?x+dx:x-dx-w,y,w,h,cc);
    if(i===G.sel){Q(x-6,gy,12,1,col);const y0=gy-22+Math.round(Math.sin(T*5));Q(x-2,y0,5,1,col);Q(x-1,y0+1,3,1,col);Q(x,y0+2,1,1,col)}
    m(-3,gy-4,2,c.mv&&fr?3:4,sh);m(1,gy-4,2,c.mv&&!fr?3:4,sh);m(-3,gy-1,3,1,PAL.bg);m(1,gy-1,3,1,PAL.bg);
    m(-3,gy-9,6,5,col);m(-3,gy-5,6,1,sh);m(-5,gy-9,2,4,PAL.gr);m(-5,gy-9,2,1,PAL.wh);
    if(work)m(2,gy-8+(fr?0:1),3,2,sh);else m(-1,gy-8,2,3,sh);
    m(-3,gy-15,6,6,PAL.wh);m(0,gy-14,3,3,PAL.bg);m(1,gy-14,1,1,PAL.cy);
    if(work)for(let k=0;k<3;k++)Q(x+f*(6+Math.floor(rnd(0,4))),gy-8+Math.floor(rnd(-2,3)),1,1,k?PAL.yel:PAL.wh);
  });
}
