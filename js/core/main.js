// ===== core/main.js : ลูปหลักของเกม (จุดเริ่มต้น) =====
function loop(t){
  const dt=Math.min(.05,(t-last)/1000||0);last=t;
  update(dt);hud();draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
