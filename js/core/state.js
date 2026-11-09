// ===== core/state.js : สถานะเกมหลัก (G) และตัวช่วยอ่านสถานะ =====
let G=null,days=10,last=0,cards=[],ts=0,TT=0;
// G = สถานะเกมทั้งหมด, days = จำนวนวันที่เลือก, last = เวลาเฟรมก่อนหน้า
// cards = การ์ดลูกเรือใน DOM, ts = หน้าสอนเล่นปัจจุบัน, TT = เวลา (วินาที) ใช้ทำ animation

const has=(f,c)=>G.rooms.some(r=>r.f===f&&r.c===c);          // มีห้องที่ชั้น f คอลัมน์ c ไหม
const A=t=>G.rooms.some(r=>r.type===t&&!r.broken);           // ห้องชนิด t ทำงานปกติ
const B=t=>G.rooms.some(r=>r.type===t&&r.broken);            // ห้องชนิด t พัง
const rn=r=>BASE[r.type]||TYPES[r.type].n;                   // ชื่อห้อง
const ladder=(lo,i)=>(has(lo,i)||has(lo,i+1))&&(has(lo+1,i)||has(lo+1,i+1));
function sealed(f,c){const d=G.d[f];return c===0?d[0]:c===2?d[1]:(d[0]&&d[1])}
const powered=()=>G.pw>0;

function reset(){
  G={t:0,days:days,o2:100,pw:100,hull:100,rooms:[{f:0,c:0,type:'ctrl'},{f:0,c:1,type:'power'},{f:0,c:2,type:'green'}],slot:0,lc:-1,d:[[0,0],[0,0],[0,0]],br:[],sol:false,sp:0,st:null,ev:12,shake:0,run:true,paused:true,hits:0,fixed:0,flash:0,bt:0,ht:0,sel:0,mk:null,
   crew:NAMES.map((n,i)=>({n:n[0],col:n[1],sh:n[2],x:380+i*50,yy:FYs[0],fl:0,cl:null,task:null,t:0,mv:false,f:1}))};
  $('crew').innerHTML='';cards=G.crew.map((c,i)=>{
    const d=document.createElement('button');d.className='cr';d.style.setProperty('--c',c.col);
    d.innerHTML='<strong>'+(i+1)+' '+c.n+'</strong><small>ว่าง</small><i><b></b></i>';
    d.addEventListener('click',()=>{if(G&&G.run)G.sel=i});$('crew').appendChild(d);return d});
  $('hint').className='';$('ban').textContent='';
}
