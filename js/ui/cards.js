// ===== ui/cards.js : หน้าต่างเลือกห้องใหม่ (การ์ด 3 ใบ) =====
function showCards(ch){
  $('cardbox').innerHTML=ch.map((k,i)=>{const Y=TYPES[k];return '<button class="rc" data-k="'+k+'" style="--c:'+Y.c+'"><strong>'+(i+1)+' '+Y.n+'</strong><span class="pro">+ '+Y.pro+'</span><span class="con">− '+Y.con+'</span></button>'}).join('');
  $('cday').textContent='ครบ '+Math.floor(G.t/DAY)+' วัน เลือกห้องใหม่ 1 ห้อง';
  $('cards').classList.remove('hide');
}
$('cardbox').addEventListener('click',e=>{const b=e.target.closest('.rc');if(b&&G.paused)build(b.dataset.k)});
