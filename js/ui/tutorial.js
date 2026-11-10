// ===== ui/tutorial.js : หน้าต่างสอนเล่น 4 หน้า (ภาพเคลื่อนไหว + คำอธิบายสั้น) =====
let tutRun=false;
function showTut(){
  $('tt').textContent=TUT[ts][0];$('tp').textContent=TUT[ts][1];
  $('td').innerHTML=TUT.map((_,i)=>'<i class="'+(i===ts?'on':'')+'"></i>').join('');
  $('tprev').style.visibility=ts?'visible':'hidden';
  $('tnext').innerHTML=ts===TUT.length-1?ico('check','sm'):'▶';
  if(!tutRun){tutRun=true;tutLoop()}
}
// วาดภาพประกอบวนไปจนกว่าจะปิดหน้าสอน
function tutLoop(){
  if($('tut').classList.contains('hide')){tutRun=false;return}
  drawTutArt(ts,performance.now()/1000);
  requestAnimationFrame(tutLoop);
}
function closeTut(){$('tut').classList.add('hide');G.paused=false;ban('เริ่ม','ok','helmet')}
$('tnext').addEventListener('click',()=>{if(ts<TUT.length-1){ts++;showTut()}else closeTut()});
$('tprev').addEventListener('click',()=>{if(ts>0){ts--;showTut()}});
$('tskip').addEventListener('click',closeTut);
