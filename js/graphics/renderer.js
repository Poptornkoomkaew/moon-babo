// ===== graphics/renderer.js : ตัวรวมการวาดทั้งเฟรม (ลำดับการวาดสำคัญ) =====
function draw(){
  ctx.imageSmoothingEnabled=false;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);
  if(!G)return;
  const T=TT=performance.now()/1000,sh=shakeOffset();
  px.setTransform(1,0,0,1,sh[0],sh[1]);
  const on=powered();
  // 1) ฉากหลัง
  drawSky();drawStars(T);drawEarth();drawGround();drawDust();
  drawSupports();drawSolar(T);drawScaffold();
  // 2) ตัวฐาน
  drawRooms(T,on);drawCorridors();drawBreaches(T);
  // 3) เอฟเฟกต์ + ตัวละคร
  drawStormBands(T);drawCrew(T);drawMarker();
  // 4) ถ่ายบัฟเฟอร์พิกเซลขึ้น canvas จริง แล้ววาดข้อความ/แฟลชทับ
  px.setTransform(1,0,0,1,0,0);
  ctx.drawImage(off,0,0,W,H);
  drawLabels();drawFlash();
}
