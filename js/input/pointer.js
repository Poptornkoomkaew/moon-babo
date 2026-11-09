// ===== input/pointer.js : คลิก/แตะบน canvas เพื่อเลือกลูกเรือและสั่งงาน =====
// หาว่าจุด (mx,my) ตรงกับอะไร: ลูกเรือ หรือ เป้าหมายงาน
function pick(mx,my){
  for(let i=0;i<3;i++){const c=G.crew[i];if(Math.abs(mx-c.x)<16&&my>c.yy-64&&my<c.yy+10)return{crew:i}}
  if(G.sol&&mx>860&&my>520&&my<612)return{task:{k:'sol'}};
  let f=-1;for(let k=0;k<3;k++)if(my>FYs[k]-132&&my<FYs[k]+14){f=k;break}
  if(f<0)return null;
  for(const b of G.br)if(b.f===f&&Math.abs(mx-b.x)<30&&Math.abs(my-b.y)<34)return{task:{k:'br',o:b}};
  for(const r of G.rooms)if(r.broken&&r.f===f&&mx>COLX[r.c]&&mx<COLX[r.c]+COLW)return{task:{k:'fix',rm:r}};
  for(let i=0;i<2;i++)if((has(f,i)||has(f,i+1))&&Math.abs(mx-DX[i])<22&&my>FYs[f]-62)return{task:{k:'d',i:i,f:f}};
  if(f===0&&my>FYs[0]-100){
    if(mx>95&&mx<225)return{task:{k:'mon'}};
    if(mx>390&&mx<500)return{task:{k:'pw'}};
    if(mx>640&&mx<770)return{task:{k:'gh'}};
  }
  const col=mx<DX[0]?0:mx<DX[1]?1:2;
  if(has(f,col))return{task:{k:'move',x:Math.max(COLX[col]+14,Math.min(COLX[col]+COLW-14,mx)),f:f}};
  return null;
}

cv.addEventListener('pointerdown',e=>{
  if(!G||!G.run||G.paused)return;
  const r=cv.getBoundingClientRect(),mx=(e.clientX-r.left)*W/r.width,my=(e.clientY-r.top)*H/r.height;
  const p=pick(mx,my);if(!p)return;
  if(p.crew!==undefined){G.sel=p.crew;return}
  const c=G.crew[G.sel];c.task=p.task;c.t=0;
  G.mk={x:tx(p.task),y:p.task.k==='br'?p.task.o.y:FYs[tf(p.task)]-10,t:.5,c:c.col};
});
