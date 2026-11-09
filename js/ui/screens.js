// ===== ui/screens.js : หน้าเมนูเริ่ม และหน้าจบเกม =====
function end(win){
  G.run=false;
  $('et').textContent=win?'ภารกิจสำเร็จ':'ภารกิจล้มเหลว';
  $('et').style.color=win?'var(--cy)':'var(--bad)';
  const why=G.o2<=0?'ออกซิเจนหมด':'ฐานเสียหายหนักเกินไป';
  $('ed').textContent=(win?'ฐานรอดครบ '+G.days+' วัน':'ฐานล่มในวันที่ '+Math.min(G.days,Math.floor(G.t/DAY)+1)+' สาเหตุ: '+why)+' · ซ่อมสำเร็จ '+G.fixed+' ครั้ง · ถูกอุกกาบาตชน '+G.hits+' ครั้ง · สร้างห้องใหม่ '+(G.rooms.length-3)+' ห้อง';
  $('end').classList.remove('hide');
}

// ปุ่มเลือกระยะเวลา
document.querySelectorAll('#opts button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#opts button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');days=+b.dataset.d}));
// ปุ่มเริ่มภารกิจ → เข้าหน้าสอนเล่น
$('go').addEventListener('click',()=>{reset();$('menu').classList.add('hide');ts=0;showTut();$('tut').classList.remove('hide')});
// ปุ่มเล่นใหม่
$('again').addEventListener('click',()=>{$('end').classList.add('hide');$('menu').classList.remove('hide')});
