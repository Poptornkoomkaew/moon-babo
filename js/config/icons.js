// ===== config/icons.js : ไอคอนพิกเซล 8x8 ทั้งเกม (ใช้ทั้งใน DOM และบน canvas) =====
// แต่ละแถวคือ 8 ตัวอักษร  '.' = โปร่งใส  ตัวอักษรอื่นดูสีใน ICON_COL
// h / H = สีหลัก / สีรองของลูกเรือ (ใส่สีตอนวาด)
const ICON_COL={k:PAL.bg,w:PAL.wh,g:PAL.gr,s:PAL.sl,d:PAL.dk,r:PAL.red,o:PAL.org,y:PAL.yel,l:PAL.lim,n:PAL.grn,c:PAL.cy,b:PAL.sky,u:PAL.blue,p:'#e07aa8',v:PAL.pur};
const I=s=>s.split('|');
const ICONS={
 // ทรัพยากร / เวลา
 o2:I('...cc...|..cwwc..|..cwcc..|...cc.c.|.cc..cwc|cwwc..cc|cwcc....|.cc.....'),
 bolt:I('....yyy.|...yyy..|..yyy...|.yyyyyy.|....yy..|...yy...|..yy....|..y.....'),
 hull:I('dddddddd|gggdgggd|gggdgggd|dddddddd|gdgggdgg|gdgggdgg|dddddddd|gggdgggd'),
 moon:I('..yyyy..|.yyy....|yyy.....|yyy.....|yyy.....|.yyy....|..yyyy..|........'),
 clock:I('..gggg..|.gwwwwg.|gwwkwwwg|gwwkwwwg|gwwkkkwg|gwwwwwwg|.gwwwwg.|..gggg..'),
 // งาน / การกระทำ
 wrench:I('...ww.ww|...wwwww|....www.|...ggg..|..ggg...|.ggg....|.gg.....|........'),
 door:I('gggggggg|goyoyoyg|gyoyoyog|goyoyoyg|gyoyoyog|goyoyoyg|gyoyoyog|gggggggg'),
 monitor:I('gggggggg|gkkkkkkg|gkkkklkg|gkklklkg|gklklllg|gkkkkkkg|gggggggg|..gggg..'),
 walk:I('........|....c...|....cc..|ccccccc.|ccccccc.|....cc..|....c...|........'),
 arrow:I('........|....g...|....gg..|ggggggg.|ggggggg.|....gg..|....g...|........'),
 cursor:I('k.......|kk......|kwk.....|kwwk....|kwwwk...|kwwkkk..|kkwk....|..kk....'),
 zzz:I('...gggg.|.....g..|....g...|...gggg.|gggg....|..g.....|.g......|gggg....'),
 helmet:I('..gggg..|.gwwwwg.|gwkkkkwg|gwkhhkwg|gwkkkkwg|.gwwwwg.|..hhhh..|.hHHHHh.'),
 // เหตุการณ์
 meteor:I('y.......|.yo.....|..oyggg.|..ygwggs|...gggss|...ggsss|....sss.|........'),
 storm:I('o..oo..o|.o.yy.o.|..yyyy..|oyyyyyyo|oyyyyyyo|..yyyy..|.o.yy.o.|o..oo..o'),
 solar:I('........|uuuuuuuu|ubuubuub|uuuuuuuu|ubuubuub|uuuuuuuu|...gg...|..gggg..'),
 solarx:I('........|uuuuuuuu|ubuurrub|uuurruuu|ubrrubub|uurruuuu|...gg...|..gggg..'),
 crack:I('...r....|..rr....|...rr...|..rr....|..rrr...|...rr...|..rr....|...r....'),
 warn:I('...yy...|..yyyy..|..ykky..|.yykkyy.|.yyyyyy.|yyykkyyy|yyyyyyyy|........'),
 x:I('rr....rr|rrr..rrr|.rrrrrr.|..rrrr..|..rrrr..|.rrrrrr.|rrr..rrr|rr....rr'),
 check:I('......nn|.....nnn|n...nnn.|nn.nnn..|.nnnn...|..nn....|........|........'),
 plus:I('........|...nn...|...nn...|.nnnnnn.|.nnnnnn.|...nn...|...nn...|........'),
 // ห้อง
 plant:I('ll....ll|lnl..lnl|.lnllnl.|..lnnl..|...nn...|...nn...|..vvvv..|..vvvv..'),
 fan:I('gggggggg|g..cc..g|g..cc..g|gccwwccg|gccwwccg|g..cc..g|g..cc..g|gggggggg'),
 shield:I('bbbbbbbb|bccccccb|bccwwccb|bccwwccb|.bccccb.|..bccb..|...bb...|........'),
 hydro:I('...b....|..bbb...|..bbb...|...n....|.l.n.l..|.lnnnl..|..lnl...|...n....'),
 batt:I('..gggg..|gggggggg|gyyyyyyg|gyyyyyyg|gyyyyyyg|gyyyyyyg|gyyyyyyg|gggggggg'),
 gear:I('...oo...|.o.oo.o.|..oooo..|oookkooo|oookkooo|..oooo..|.o.oo.o.|...oo...'),
 bed:I('........|g......g|gwwuuuug|gpwuuuug|gggggggg|g......g|g......g|........'),
 radar:I('..nnnn..|.n....n.|n....l.n|n...l..n|n..l...n|n.l....n|.n....n.|..nnnn..')
};
