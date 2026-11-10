// ===== ui/screens.js : หน้าเมนูเริ่ม และหน้าจบเกม (เน้นไอคอน) =====
// ภาพหน้าเมนู: ลูกเรือ 3 คน + พระจันทร์
$('mhero').innerHTML=NAMES.map(n=>ico('helmet','xl',{h:n[1],H:n[2]})).join('')+ico('moon','xl');

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
