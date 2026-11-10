// ===== config/rooms.js : ข้อมูลห้อง (ห้องเริ่มต้น + ห้องที่เลือกสร้างได้) =====
const BASE={ctrl:'ควบคุม',power:'พลังงาน',green:'เรือนปลูก'};
const BASE_IC={ctrl:'monitor',power:'bolt',green:'plant'};
// n = ชื่อสั้น, ic = ไอคอน, pros/cons = ชิป [ไอคอน, ตัวเลข/คำสั้น], fx = ผลตอนห้องขัดข้อง (แสดงในคำแนะนำ)
const TYPES={
 air:{n:'ฟอกอากาศ',c:'#73eff7',ic:'fan',pros:[['o2','+1.6']],cons:[['bolt','−1'],['warn','อุดตัน']],fx:'ไม่ผลิตออกซิเจน'},
 shield:{n:'โล่ป้องกัน',c:'#41a6f6',ic:'shield',pros:[['meteor','−65%']],cons:[['bolt','−1'],['warn','ช็อต']],fx:'โล่ดับ · แบตหาย'},
 hydro:{n:'ไฮโดรโปนิกส์',c:'#a7f070',ic:'hydro',pros:[['o2','+1']],cons:[['warn','โรคพืช']],fx:'ออกซิเจนลด'},
 batt:{n:'แบตสำรอง',c:'#ffcd75',ic:'batt',pros:[['bolt','+1.2']],cons:[['warn','ร้อนจัด']],fx:'ไฟรั่วไหล'},
 shop:{n:'ซ่อมบำรุง',c:'#ef7d57',ic:'gear',pros:[['wrench','×1.8'],['hull','+']],cons:[['warn','ช็อต']],fx:'ฐานเสียหาย · ซ่อมช้า'},
 bunk:{n:'พักลูกเรือ',c:'#e07aa8',ic:'bed',pros:[['walk','+30%']],cons:[['warn','เตียงเสีย']],fx:'ลูกเรือเดินช้า'},
 radar:{n:'เรดาร์',c:'#38b764',ic:'radar',pros:[['storm','12 วิ']],cons:[['warn','รวน']],fx:'เหตุการณ์ถี่ขึ้น'}
};
const roomIc=r=>TYPES[r.type]?TYPES[r.type].ic:BASE_IC[r.type];
