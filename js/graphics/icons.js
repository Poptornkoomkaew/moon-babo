// ===== graphics/icons.js : แปลงไอคอนเป็นภาพ (canvas / <img>) พร้อมแคช =====
const _ic={};
// สร้าง canvas 8x8 ของไอคอน (tint = {h,H} ใช้ใส่สีลูกเรือ)
function iconCanvas(name,tint){
  const key=name+(tint?tint.h+tint.H:'');
  if(_ic[key])return _ic[key];
  const c=document.createElement('canvas');c.width=c.height=8;const g=c.getContext('2d');
  ICONS[name].forEach((row,y)=>[...row].forEach((ch,x)=>{
    if(ch==='.')return;
    g.fillStyle=(ch==='h'&&tint)?tint.h:(ch==='H'&&tint)?tint.H:(ICON_COL[ch]||PAL.wh);
    g.fillRect(x,y,1,1);
  }));
  return _ic[key]=c;
}
function iconURL(name,tint){const c=iconCanvas(name,tint);if(!c.url)c.url=c.toDataURL();return c.url}
// HTML <img> ของไอคอน (sz = sm/md/lg/xl ดู base.css)
function ico(name,sz,tint){return '<img class="ic '+(sz||'md')+'" alt="" src="'+iconURL(name,tint)+'">'}
// วาดไอคอนลง canvas ใดก็ได้ (s = ขยายกี่เท่า)
function drawIconTo(g,name,x,y,s,alpha,tint){
  g.save();g.imageSmoothingEnabled=false;if(alpha!==undefined)g.globalAlpha=alpha;
  g.drawImage(iconCanvas(name,tint),Math.round(x),Math.round(y),8*s,8*s);g.restore();
}
const drawIcon=(name,x,y,s,alpha,tint)=>drawIconTo(ctx,name,x,y,s,alpha,tint);
// ใส่ไอคอนให้ <img data-ic="ชื่อ"> ใน index.html
document.querySelectorAll('img[data-ic]').forEach(i=>{i.src=iconURL(i.dataset.ic);i.classList.add('ic')});
