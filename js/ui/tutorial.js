// ===== ui/tutorial.js : หน้าต่างสอนเล่น 4 หน้า =====
function showTut(){
  $('tt').textContent=(ts+1)+'/'+TUT.length+' · '+TUT[ts][0];$('tp').textContent=TUT[ts][1];
  $('td').innerHTML=TUT.map((_,i)=>'<i class="'+(i===ts?'on':'')+'"></i>').join('');
  $('tprev').style.visibility=ts?'visible':'hidden';$('tnext').textContent=ts===TUT.length-1?'เริ่มเลย':'ต่อไป';
}
function closeTut(){$('tut').classList.add('hide');G.paused=false;ban('ภารกิจเริ่มแล้ว เลือกลูกเรือแล้วสั่งงานได้เลย','')}
$('tnext').addEventListener('click',()=>{if(ts<TUT.length-1){ts++;showTut()}else closeTut()});
$('tprev').addEventListener('click',()=>{if(ts>0){ts--;showTut()}});
$('tskip').addEventListener('click',closeTut);
