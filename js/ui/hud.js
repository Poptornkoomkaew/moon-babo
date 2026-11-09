// ===== ui/hud.js : แถบสถานะด้านบน, แบนเนอร์, กล่องคำแนะนำ, การ์ดลูกเรือ =====
function ban(t,c){const b=$('ban');b.textContent=t;b.className=c||'';G.bt=4}
function hint(t,x,l){const h=$('hint');h.innerHTML='<strong></strong><span></span>';h.firstChild.textContent=t;h.lastChild.textContent=x;h.className='show '+(l||'');G.ht=8}

// นับเวลาซ่อนแบนเนอร์/กล่องคำแนะนำ
function tickMessages(dt){
  if(G.bt>0){G.bt-=dt;if(G.bt<=0&&!G.st)$('ban').textContent=''}
  if(G.ht>0){G.ht-=dt;if(G.ht<=0)$('hint').className=''}
}

function hud(){
  if(!G)return;
  const set=(id,v)=>{$('b'+id).style.width=Math.max(0,v)+'%';$('v'+id).textContent=Math.round(v)+'%';$('m'+id).classList.toggle('low',v<25)};
  set('o',G.o2);set('p',G.pw);set('h',G.hull);
  const day=Math.min(G.days,Math.floor(G.t/DAY)+1),hh=Math.floor((G.t%DAY)/DAY*24);
  $('tm').textContent='วันที่ '+day+'/'+G.days+' · '+String(hh).padStart(2,'0')+':00'+(A('radar')?' · เหตุการณ์ถัดไป ~'+Math.ceil(Math.max(0,G.ev))+' วิ':'');
  G.crew.forEach((c,i)=>{
    const d=cards[i],t=c.task;d.classList.toggle('sel',i===G.sel);
    d.querySelector('small').textContent=t?(!arrived(c,t)&&t.k!=='move'?'กำลังไป: ':'')+label(t):'ว่าง';
    let p=0;if(t&&arrived(c,t)){p=t.k==='br'?t.o.p:t.k==='sol'?G.sp:t.k==='fix'?t.rm.fp:t.k==='d'?c.t:0}
    d.querySelector('b').style.width=Math.min(100,p*100)+'%';
  });
}
