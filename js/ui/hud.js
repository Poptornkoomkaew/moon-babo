// ===== ui/hud.js : แถบสถานะ, แบนเนอร์, กล่องคำแนะนำ, การ์ดลูกเรือ (เน้นไอคอน) =====

// ชิปเล็กๆ: ไอคอน + ตัวเลข/คำสั้น (cls = pro/con)
function chip(n,t,cls,sz){return '<span class="chip '+(cls||'')+'">'+ico(n,sz||'sm')+(t!==''&&t!==undefined?'<b>'+t+'</b>':'')+'</span>'}
function chipRow(list){return list.map(c=>chip(c[0],c[1],c[2])).join('')}
// ลำดับขั้นตอนเป็นไอคอน: ['helmet','wrench','crack','/','helmet','door'] ('/' = หรือ)
function stepsHtml(a){
  let o='';
  a.forEach((n,i)=>{
    if(n==='/'){o+='<span class="or">/</span>';return}
    if(i>0&&a[i-1]!=='/')o+=ico('arrow','sm');
    o+=ico(n,'md',n==='helmet'?{h:PAL.cy,H:PAL.sky}:null);
  });
  return o;
}

// แบนเนอร์สั้นๆ (ic = ไอคอนนำหน้า)
function ban(t,c,ic){const b=$('ban');b.innerHTML=ic?ico(ic,'sm'):'';b.appendChild(document.createTextNode(t||''));b.className=c||'';G.bt=4}
// กล่องคำแนะนำ: ไอคอนเหตุการณ์ + ชื่อสั้น + ขั้นตอนเป็นไอคอน + ชิป + คำอธิบายสั้น
function hint(t,cap,l,ic,steps,chips){
  const h=$('hint');
  h.innerHTML='<div class="hi-top">'+(ic?ico(ic,'lg'):'')+'<strong></strong></div>'
    +(steps?'<div class="hi-steps">'+stepsHtml(steps)+'</div>':'')
    +(chips?'<div class="chips">'+chipRow(chips)+'</div>':'')
    +'<span class="hi-cap"></span>';
  h.querySelector('strong').textContent=t;h.querySelector('.hi-cap').textContent=cap||'';
  h.className='show '+(l||'');G.ht=8;
}
function clearMessages(){$('hint').className='';$('ban').textContent=''}

// นับเวลาซ่อนแบนเนอร์/กล่องคำแนะนำ
function tickMessages(dt){
  if(G.bt>0){G.bt-=dt;if(G.bt<=0&&!G.st)$('ban').textContent=''}
  if(G.ht>0){G.ht-=dt;if(G.ht<=0)$('hint').className=''}
}

// การ์ดลูกเรือ 3 ใบ (สร้างตอนเริ่มเกม)
function buildCrewCards(){
  $('crew').innerHTML='';
  cards=G.crew.map((c,i)=>{
    const d=document.createElement('button');d.className='cr';d.style.setProperty('--c',c.col);
    d.innerHTML=ico('helmet','lg',{h:c.col,H:c.sh})+'<strong>'+c.n+'</strong><span class="key">'+(i+1)+'</span>'
      +'<img class="ic md tk" data-n="zzz" alt="" src="'+iconURL('zzz')+'"><small>ว่าง</small><i><b></b></i>';
    d.addEventListener('click',()=>{if(G&&G.run)G.sel=i});$('crew').appendChild(d);return d});
}
const taskIcon=t=>t.k==='fix'?TYPES[t.rm.type].ic:TASK_IC[t.k];

function hud(){
  if(!G)return;
  const set=(id,v)=>{$('b'+id).style.width=Math.max(0,v)+'%';$('v'+id).textContent=Math.round(v);$('m'+id).classList.toggle('low',v<25)};
  set('o',G.o2);set('p',G.pw);set('h',G.hull);
  const day=Math.min(G.days,Math.floor(G.t/DAY)+1),hh=Math.floor((G.t%DAY)/DAY*24);
  $('tday').textContent=day+'/'+G.days;$('tclk').textContent=String(hh).padStart(2,'0')+':00';
  const rad=A('radar');$('trad').classList.toggle('hide',!rad);if(rad)$('trnum').textContent=Math.ceil(Math.max(0,G.ev));
  G.crew.forEach((c,i)=>{
    const d=cards[i],t=c.task,ti=d.querySelector('.tk'),want=t?taskIcon(t):'zzz';
    d.classList.toggle('sel',i===G.sel);
    if(ti.dataset.n!==want){ti.dataset.n=want;ti.src=iconURL(want)}
    ti.classList.toggle('dim',!t||(!arrived(c,t)&&t.k!=='move'));   // จางตอนว่าง/กำลังเดินไป
    d.querySelector('small').textContent=t?label(t):'ว่าง';
    let p=0;if(t&&arrived(c,t)){p=t.k==='br'?t.o.p:t.k==='sol'?G.sp:t.k==='fix'?t.rm.fp:t.k==='d'?c.t:0}
    d.querySelector('b').style.width=Math.min(100,p*100)+'%';
  });
}
