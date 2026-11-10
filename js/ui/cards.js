// ===== ui/cards.js : หน้าต่างเลือกห้องใหม่ (การ์ด 3 ใบ เป็นไอคอน + ชิป ข้อดี/ข้อเสีย) =====
function showCards(ch){
  $('cardbox').innerHTML=ch.map((k,i)=>{
    const Y=TYPES[k];
    return '<button class="rc" data-k="'+k+'" style="--c:'+Y.c+'"><span class="key">'+(i+1)+'</span>'+ico(Y.ic,'xl')
      +'<strong>'+Y.n+'</strong>'
      +'<div class="chips">'+chipRow(Y.pros.map(p=>p.concat('pro')))+'</div>'
      +'<div class="chips">'+chipRow(Y.cons.map(p=>p.concat('con')))+'</div></button>'}).join('');
  $('cday').innerHTML=ico('moon','md')+'<b>'+Math.floor(G.t/DAY)+'</b>';
  $('cards').classList.remove('hide');
}
$('cardbox').addEventListener('click',e=>{const b=e.target.closest('.rc');if(b&&G.paused)build(b.dataset.k)});
