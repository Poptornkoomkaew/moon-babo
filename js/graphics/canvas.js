// ===== graphics/canvas.js : canvas หลัก + บัฟเฟอร์พิกเซล 240x165 และเครื่องมือวาด =====
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const off=document.createElement('canvas');off.width=240;off.height=165;
const px=off.getContext('2d');

// R = วาดสี่เหลี่ยมด้วยพิกัดจริง (หาร 4 ลงบัฟเฟอร์พิกเซล)
function R(x,y,w,h,c){const a=Math.round(x/4),b=Math.round(y/4);px.fillStyle=c;px.fillRect(a,b,Math.max(1,Math.round((x+w)/4)-a),Math.max(1,Math.round((y+h)/4)-b))}
// Q = วาดสี่เหลี่ยมด้วยพิกัดพิกเซลบัฟเฟอร์ตรงๆ
function Q(a,b,w,h,c){px.fillStyle=c;px.fillRect(a,b,w,h)}
// TX = วาดข้อความมีขอบบน canvas จริง
function TX(t,x,y,c,sz,al){ctx.font='600 '+sz+'px Prompt,sans-serif';ctx.textAlign=al||'center';ctx.lineJoin='round';ctx.lineWidth=4;ctx.strokeStyle=PAL.bg;ctx.strokeText(t,x,y);ctx.fillStyle=c;ctx.fillText(t,x,y)}
// สีตามระดับค่า (แดง/เหลือง/เขียว)
function mc(v){return v<25?PAL.red:v<50?PAL.yel:PAL.lim}
