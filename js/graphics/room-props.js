// ===== graphics/room-props.js : ภาพเฟอร์นิเจอร์/อุปกรณ์ภายในห้องแต่ละชนิด =====
// พารามิเตอร์: (x = ซ้ายสุดของห้อง, F = พื้นห้อง, a = ทำงานอยู่ไหม, r = ออบเจกต์ห้อง)
const PROP={
 ctrl:(x,F)=>{R(x+80,F-38,120,38,PAL.dk);R(x+80,F-38,120,4,PAL.sl);R(x+95,F-90,90,52,PAL.sl);R(x+99,F-86,82,44,PAL.bg);
  [G.o2,G.pw,G.hull].forEach((v,k)=>{R(x+105,F-80+k*12,70,8,PAL.dk);R(x+105,F-80+k*12,Math.max(4,v*.7),8,mc(v))});
  for(let k=0;k<6;k++)R(x+90+k*18,F-22,8,4,(k+Math.floor(TT*2))%3===0?PAL.yel:PAL.sl);
  R(x+205,F-116,32,32,PAL.gr);R(x+209,F-112,24,24,PAL.bg);R(x+213,F-108,4,4,PAL.wh);R(x+223,F-100,4,4,PAL.sky)},
 power:(x,F)=>{R(x+86,F-94,88,94,PAL.sl);R(x+90,F-90,80,86,PAL.dk);
  [[powered(),PAL.lim],[!G.sol,PAL.cy],[!(G.st&&G.st.a>0),PAL.yel]].forEach((o,i)=>{R(x+96+i*24,F-84,20,20,PAL.sl);R(x+98+i*24,F-82,16,16,o[0]?o[1]:PAL.red)});
  R(x+98,F-50,64,32,PAL.bg);for(let k=0;k<8;k++)if(G.pw/100*8>k)R(x+102+k*7.5,F-44,4,20,mc(G.pw));
  R(x+194,F-50,32,50,PAL.dk);R(x+198,F-46,24,12,PAL.sl);R(x+10,F-100,230,4,PAL.sl);
  R(x+196,F-116,32,32,PAL.gr);R(x+200,F-112,24,24,PAL.bg);R(x+204,F-108,4,4,PAL.wh)},
 green:(x,F)=>{const live=powered()&&!sealed(0,2);
  R(x+40,F-14,130,14,PAL.dk);R(x+40,F-18,130,4,PAL.pur);R(x+40,F-116,130,4,live?PAL.lim:PAL.dk);
  for(let i=0;i<5;i++){const px0=x+52+i*24,hh=24+(i%2)*12+(live?Math.round(Math.sin(TT*2+i)):0),y=F-18-hh;
   R(px0,y,4,hh,live?PAL.grn:PAL.sl);R(px0-8,y+8,8,4,live?PAL.lim:PAL.gr);R(px0+4,y+16,8,4,live?PAL.lim:PAL.gr);R(px0-4,y-4,12,8,live?PAL.lim:PAL.sl);if(i%2)R(px0,y-8,4,4,live?PAL.org:PAL.gr)}
  R(x+196,F-72,50,72,PAL.sl);R(x+200,F-68,42,68,PAL.dk);R(x+210,F-58,22,16,PAL.bg);R(x+210,F-58,22,4,PAL.cy);R(x+204,F-30,4,8,PAL.gr);
  for(let k=0;k<4;k++)R(x+196+k*16,F-72,8,4,PAL.bg)},
 air:(x,F,a)=>{R(x+30,F-80,190,80,PAL.dk);for(let i=0;i<3;i++){const cx=x+70+i*60;R(cx-20,F-72,40,40,PAL.sl);R(cx-16,F-68,32,32,PAL.bg);if(a){if(Math.floor(TT*10)%2)R(cx-14,F-54,28,4,PAL.cy);else R(cx-2,F-66,4,28,PAL.cy)}else R(cx-2,F-54,4,4,PAL.red)}R(x+30,F-20,190,4,PAL.sl)},
 shield:(x,F,a)=>{R(x+80,F-50,90,50,PAL.dk);R(x+110,F-100,30,50,a?PAL.sky:PAL.sl);if(a){R(x+114,F-96,8,34,PAL.cy);if(Math.floor(TT*4)%2)R(x+90,F-84,70,4,PAL.cy)}},
 hydro:(x,F,a)=>{R(x+30,F-116,190,4,a?PAL.lim:PAL.dk);for(let i=0;i<3;i++){const p0=x+30+i*66;R(p0,F-24,56,10,PAL.dk);for(let k=0;k<3;k++){const h=22+k%2*8;R(p0+8+k*16,F-24-h,4,h,a?PAL.grn:PAL.pur);R(p0+4+k*16,F-24-h-4,12,6,a?PAL.lim:'#7a4a7a')}}},
 batt:(x,F,a,r)=>{for(let i=0;i<5;i++){const cx=x+30+i*42;R(cx,F-64,32,64,PAL.dk);R(cx+4,F-60,24,56,PAL.bg);R(cx+10,F-68,12,4,PAL.gr);for(let k=0;k<4;k++)R(cx+8,F-14-k*12,16,8,r.broken?(k<1?PAL.red:PAL.dk):PAL.yel)}
  if(r.broken)for(let i=0;i<4;i++)Q(Math.round((x+60+i*40)/4),Math.round((F-76-((TT*30+i*20)%40))/4),1,1,PAL.gr)},
 shop:(x,F,a,r)=>{R(x+30,F-34,110,34,PAL.dk);R(x+30,F-38,110,4,PAL.sl);R(x+40,F-110,90,48,PAL.sl);[PAL.org,PAL.gr,PAL.yel,PAL.sky].forEach((c,i)=>R(x+50+i*20,F-100,8,28,c));
  R(x+180,F-70,12,70,PAL.gr);const sw=a?Math.round(Math.sin(TT*3)*8):0;R(x+156+sw,F-84,40,10,PAL.gr);R(x+156+sw,F-76,8,14,PAL.org);if(r.broken&&Math.floor(TT*8)%2)R(x+160,F-60,4,4,PAL.yel)},
 bunk:(x,F)=>{for(let i=0;i<2;i++){const bx=x+30+i*110;R(bx,F-26,80,16,PAL.dk);R(bx,F-34,80,8,PAL.wh);R(bx,F-34,24,8,'#e07aa8');R(bx,F-10,8,10,PAL.sl);R(bx+72,F-10,8,10,PAL.sl)}},
 radar:(x,F,a)=>{R(x+120,F-100,6,76,PAL.gr);R(x+100,F-24,50,24,PAL.dk);const sw=Math.round(Math.sin(TT*(a?2:9))*14);R(x+100+sw,F-108,50,8,PAL.gr);
  R(x+30,F-80,60,50,PAL.sl);R(x+34,F-76,52,42,PAL.bg);R(x+34+Math.floor((TT*(a?20:60))%52),F-76,2,42,a?PAL.grn:PAL.red)}
};
