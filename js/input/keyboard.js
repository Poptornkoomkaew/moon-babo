// ===== input/keyboard.js : ปุ่ม 1 2 3 (เลือกลูกเรือ / เลือกการ์ดห้องใหม่) =====
addEventListener('keydown',e=>{
  if(!G||!G.run||e.repeat)return;
  const n=['Digit1','Digit2','Digit3'].indexOf(e.code);if(n<0)return;
  if(!$('cards').classList.contains('hide')){const b=$('cardbox').children[n];if(b)build(b.dataset.k);return}
  if(!G.paused)G.sel=n;
});
