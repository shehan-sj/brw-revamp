import sharp from 'sharp';
const files = [
  'Media/BRW Truck Ad/Photos/shutterstock_1657162030.jpg',
  'Media/BRW Truck Ad/BRW AD TRUCK SIDE 312 X 100 IN JPG FORMAT.jpg',
  'Media/BRW Truck Ad/References/OldFlame (1).jpg',
  'Media/Portfolio Photos/Brampton.jpeg','Media/Portfolio Photos/brampton2.jpeg',
  'Media/Portfolio Photos/image001.jpg','Media/Portfolio Photos/image002.jpg',
  'Media/Portfolio Photos/image004.jpg','Media/Portfolio Photos/image005.jpg',
  'Media/Portfolio Photos/Guelph.jpeg','Media/Portfolio Photos/Guelph-2.jpeg','Media/Portfolio Photos/Guelph-3.jpeg',
  'Media/team.webp',
  'Media/Blog cover - 1.png','Media/Blog cover - 2.png','Media/Blog cover - 3.png',
  'Media/Seasonal_Holiday/ChristmasTruck.jpg',
  'Media/Truck Templates/26_.png','Media/Truck Templates/53_.png','Media/Truck Templates/Rear Door.png',
  'Media/Logos/RECTANGLE/BRW RECTANGLE LOGO AWARD WINNING BLACK v2.png',
  'Media/Logos/SQUARE/BRW -  SQUARE LOGO WHITE v2.png',
  'Media/Logos/CIRCLE/BRW - CIRCLE LOGO.png',
  'Media/Logos/10TH ANNIVERSARY/10TH YEAR ANNIVERSARY LOGO PNG.png',
];
for (const f of files) {
  try { const m = await sharp(f).metadata(); console.log(`${m.width}x${m.height}  r=${(m.width/m.height).toFixed(2)}  ${f.replace('Media/','')}`); }
  catch(e){ console.log(`ERR  ${f}: ${e.message.slice(0,50)}`); }
}
