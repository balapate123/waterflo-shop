#!/usr/bin/env node
// Extract SureFit uPVC products from PRICE LIST.xls and generate surefit-upvc.js
const XLSX = require('xlsx');
const fs = require('path').resolve ? require('fs') : null;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const wb = XLSX.readFile(path.join(ROOT, 'PRICE LIST.xls'));

// ── helpers ──────────────────────────────────────────────────────────
const sizeMap = {
  '½"':15, '¾"':20, '1"':25, '1¼"':32, '1½"':40, '2"':50,
  '2½"':65, '3"':80, '4"':100, '6"':150
};
function sizeMM(s) {
  s = s.replace(/\s/g,'').replace(/[""]/g,'"');
  // For compound sizes like ¾"x½", use the first size
  const first = s.split(/[x×]/)[0].trim();
  return sizeMap[first] || 0;
}
function cleanSize(s) {
  return s.replace(/\s+/g,'').replace(/[""]/g,'"').replace(/\s*x\s*/g,'×').replace(/×/g,'x');
}
function pad(s, len) { return s.padEnd(len); }
function q(s) { return "'" + s + "'"; }
function num(v) { return (typeof v === 'number' && v > 0) ? v : 0; }

// ── Read uPVC sheet ──────────────────────────────────────────────────
const wsU = wb.Sheets['uPVC PIPES & FITTING'];
const uData = XLSX.utils.sheet_to_json(wsU, {header:1, defval:''});

// ── Read Solvent Cement sheet ────────────────────────────────────────
const wsS = wb.Sheets['SOLVENT CEMENT'];
const sData = XLSX.utils.sheet_to_json(wsS, {header:1, defval:''});

// ── Parse all products ───────────────────────────────────────────────
const products = [];

// Parse uPVC sheet rows
for (let i = 5; i < uData.length; i++) {
  const row = uData[i];
  const code = String(row[1] || '').trim();
  if (!code || code === '') continue;

  const name = String(row[2] || '').trim();
  const size = String(row[3] || '').trim();
  const hsn = String(row[4] || '').trim();
  const qtyBox = num(row[5]);
  const rate = num(row[7]);

  if (!name) continue;

  products.push({ code, name, size, hsn, qtyBox, rate, source: 'upvc' });
}

// Parse Solvent Cement sheet (first 13 products, rows 6-18, codes starting with UF)
for (let i = 5; i < 18; i++) {
  const row = sData[i];
  if (!row) continue;
  const code = String(row[1] || '').trim();
  if (!code || !code.startsWith('UF')) continue;

  const name = String(row[2] || '').trim();
  const size = String(row[3] || '').trim();
  const hsn = String(row[4] || '').trim();
  const qtyBox = num(row[5]);
  const rate = num(row[7]);

  products.push({ code, name, size, hsn, qtyBox, rate, source: 'solvent' });
}

// Also get Primer from solvent sheet
for (let i = 18; i < sData.length; i++) {
  const row = sData[i];
  if (!row) continue;
  const code = String(row[1] || '').trim();
  if (code === 'CUFP473') {
    products.push({ code, name: String(row[2]||'').trim(), size: String(row[3]||'').trim(), hsn: String(row[4]||'').trim(), qtyBox: num(row[5]), rate: num(row[7]), source: 'solvent' });
  }
}

// ── Categorize products ──────────────────────────────────────────────
// Pipes: 3mtr and 6mtr
const pipes3mtr = { sch40reg: [], sch80reg: [], sch40sf: [], sch80sf: [], sch40lg: [], sch80lg: [] };
const pipes6mtr = { sch40reg: [], sch80reg: [], sch40sf: [], sch80sf: [] };

// Fittings SCH80
const fittingsSch80 = { elbow:[], tee:[], coupler:[], mta:[], fta:[], elbow45:[], endcap:[], union:[] };
// Brass
const brass = { brasselbow:[], brasstee:[], brassmta:[], brassfta:[] };
// Threaded
const threaded = { threadedelbow:[], threadedtee:[] };
// SCH40 fittings
const fittingsSch40 = { elbow:[], tee:[], coupler:[], mta:[], fta:[], elbow45:[], crosstee:[] };
// Large fittings (2½"–6")
const largeFittings = { elbow:[], tee:[], coupler:[], endcap:[], fta:[], mta:[], union:[], elbow45:[], flange:[], brassfta:[], brassmta:[] };
// Reducers SCH80
const reducers = { redtee:[], redcoupler:[], redelbow:[], redbush:[] };
// Large reducers
const largeReducers = { redtee:[], redcoupler:[], redbush:[] };
// Tank connectors
const tankConn = { tankconn:[], tankconnsocket:[], tankconnsocketlg:[] };
// Valves
const valves = { compactbvshort:[], compactbvlong:[], threadedbvlong:[], concealedshort:[], concealedlong:[], ballvalve:[], nrv:[] };
// Other
const other = { longplug:[], bend90:[], flange:[] };
// Accessories
const accessories = { solventhd:[], solventmd:[], primer:[] };

// ── Now let's build the output ───────────────────────────────────────
const lines = [];
lines.push('// SureFit uPVC ASTM Plumbing System — Product Catalog');
lines.push('// Pipe as per ASTM D 1785 (SCH 40 & SCH 80)');
lines.push('// Fittings as per ASTM D 2467 (SCH 80) & ASTM D 2466 (SCH 40)');
lines.push('// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls');
lines.push('// Rates: pipes = per pipe (3mtr/6mtr), fittings = per piece (pcs)');
lines.push('');
lines.push('var PRODUCTS = [');

function emitPipe(p, info, label, codeSuffix) {
  const sz = cleanSize(p.size);
  const mm = sizeMM(p.size);
  const r = p.rate || 100;
  const q_bundle = p.qtyBox || 10;
  const code = (codeSuffix ? p.code.toUpperCase() + codeSuffix : p.code);
  lines.push(`  { code:'${code}', name:'${label}', category:'pipes', subcategory:'${info.sub}', size:'${sz}', size_mm:${mm}, standard:'ASTM D 1785', qty_bundle:${q_bundle}, rate:${r}, unit:'pcs', info:'${info.info}' },`);
}

function emitFitting(p, info) {
  const sz = cleanSize(p.size);
  const mm = sizeMM(p.size);
  const r = p.rate || 100;
  const qty = p.qtyBox || 10;
  const std = info.standard || 'ASTM D 2467';
  const stdPkg = info.std_pkg !== undefined ? info.std_pkg : 10;
  lines.push(`  { code:'${p.code}', name:'${info.name}', category:'${info.cat}', subcategory:'${info.sub}', size:'${sz}', size_mm:${mm}, standard:'${std}', std_pkg:${stdPkg}, qty_box:${qty}, rate:${r}, unit:'pcs' },`);
}

function emitAccessory(p, info) {
  const sz = p.size.replace(/\s*(Tube|Tin)/i,'').trim();
  const container = p.size.match(/(Tube|Tin)/i) ? p.size.match(/(Tube|Tin)/i)[1] : '';
  const r = p.rate || 100;
  const qty = p.qtyBox || 10;
  const stdPkg = info.std_pkg !== undefined ? info.std_pkg : 10;
  lines.push(`  { code:'${p.code}', name:'${info.name}', category:'accessories', subcategory:'${info.sub}', size:'${sz}', size_mm:0, standard:'HSN 3506', std_pkg:${stdPkg}, qty_box:${qty}, rate:${r}, unit:'pcs', info:'${container}' },`);
}

// ═══ PIPES ═══════════════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // uPVC PIPES — SCH 40 as per ASTM D-1785 (HSN Code: 3917)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('');

// Regular SCH 40 3mtr (rows 6-11 in Excel)
lines.push('  // Waterflo uPVC Pipes SCH 40 (½"–2") — 3 mtr');
for (const p of products.filter(p => /^UP40(15|20|25|32|40|50)$/i.test(p.code) && p.name.includes('3 mtr') && !p.name.includes('SUREFIT'))) {
  emitPipe(p, {sub:'sch40', info:'SCH 40 • 3 mtr length'}, 'uPVC Pipe SCH 40');
}
lines.push('');

// SureFit SCH 40 3mtr
lines.push('  // Waterflo Surefit uPVC Pipes SCH 40 (½"–2") — 3 mtr');
for (const p of products.filter(p => /^UPS40(15|20|25|32|40|50)$/i.test(p.code) && p.name.includes('3 mtr'))) {
  emitPipe(p, {sub:'sch40', info:'Surefit SCH 40 • 3 mtr length'}, 'Surefit uPVC Pipe SCH 40');
}

lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // uPVC PIPES — SCH 80 as per ASTM D-1785 (HSN Code: 3917)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('');

// Regular SCH 80 3mtr
lines.push('  // Waterflo uPVC Pipes SCH 80 (½"–2") — 3 mtr');
for (const p of products.filter(p => /^UP80(15|20|25|32|40|50)$/i.test(p.code) && p.name.includes('3 mtr') && !p.name.includes('SUREFIT'))) {
  emitPipe(p, {sub:'sch80', info:'SCH 80 • 3 mtr length'}, 'uPVC Pipe SCH 80');
}
lines.push('');

// SureFit SCH 80 3mtr
lines.push('  // Waterflo Surefit uPVC Pipes SCH 80 (½"–2") — 3 mtr');
for (const p of products.filter(p => /^UPS80(15|20|25|32|40|50)$/i.test(p.code) && p.name.includes('3 mtr'))) {
  emitPipe(p, {sub:'sch80', info:'Surefit SCH 80 • 3 mtr length'}, 'Surefit uPVC Pipe SCH 80');
}

lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // uPVC PIPES — 6 mtr lengths (HSN Code: 3917)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('');

// Regular SCH 40 6mtr
lines.push('  // Waterflo uPVC Pipes SCH 40 (½"–2") — 6 mtr');
for (const p of products.filter(p => /^UP40(15|20|25|32|40|50)$/i.test(p.code.toUpperCase()) && p.name.includes('6 mtr') && !p.name.includes('SUREFIT'))) {
  emitPipe(p, {sub:'sch40', info:'SCH 40 • 6 mtr length'}, 'uPVC Pipe SCH 40 (6mtr)', '_6M');
}
lines.push('');

// Regular SCH 80 6mtr
lines.push('  // Waterflo uPVC Pipes SCH 80 (½"–2") — 6 mtr');
for (const p of products.filter(p => /^UP80(15|20|25|32|40|50)$/i.test(p.code.toUpperCase()) && p.name.includes('6 mtr') && !p.name.includes('SUREFIT'))) {
  emitPipe(p, {sub:'sch80', info:'SCH 80 • 6 mtr length'}, 'uPVC Pipe SCH 80 (6mtr)', '_6M');
}
lines.push('');

// SureFit SCH 40 6mtr
lines.push('  // Waterflo Surefit uPVC Pipes SCH 40 (½"–2") — 6 mtr');
for (const p of products.filter(p => /^UPS40(15|20|25|32|40|50)$/i.test(p.code) && p.name.includes('6 mtr'))) {
  emitPipe(p, {sub:'sch40', info:'Surefit SCH 40 • 6 mtr length'}, 'Surefit uPVC Pipe SCH 40 (6mtr)', '_6M');
}
lines.push('');

// SureFit SCH 80 6mtr
lines.push('  // Waterflo Surefit uPVC Pipes SCH 80 (½"–2") — 6 mtr');
for (const p of products.filter(p => /^UPS80(15|20|25|32|40|50)$/i.test(p.code) && p.name.includes('6 mtr'))) {
  emitPipe(p, {sub:'sch80', info:'Surefit SCH 80 • 6 mtr length'}, 'Surefit uPVC Pipe SCH 80 (6mtr)', '_6M');
}

lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // LARGE uPVC PIPES (2½"–6") — SCH 40 & 80 (3 mtr)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('');

// Large SCH 40
lines.push('  // Large uPVC Pipes SCH 40 (2½"–6") — 3 mtr');
for (const p of products.filter(p => /^UP40(65|80|100|150)$/i.test(p.code) && p.name.includes('3 mtr'))) {
  emitPipe(p, {sub:'sch40', info:'SCH 40 • 3 mtr length'}, 'uPVC Pipe SCH 40');
}
lines.push('');

// Large SCH 80
lines.push('  // Large uPVC Pipes SCH 80 (2½"–6") — 3 mtr');
for (const p of products.filter(p => /^UP80(65|80|100|150)$/i.test(p.code.toUpperCase()) && p.name.includes('3 mtr'))) {
  emitPipe(p, {sub:'sch80', info:'SCH 80 • 3 mtr length'}, 'uPVC Pipe SCH 80');
}

// ═══ SCH 80 FITTINGS ═════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // uPVC FITTINGS — SCH 80 as per ASTM D-2467 (HSN Code: 3917)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

// Helper to get std_pkg from existing file data (we'll hardcode the known values)
const stdPkgMap = {
  'UFE8015':70,'UFE8020':50,'UFE8025':30,'UFE8032':14,'UFE8040':15,'UFE8050':8,
  'UFT8015':55,'UFT8020':30,'UFT8025':15,'UFT8032':10,'UFT8040':0,'UFT8050':0,
  'UFC8015':100,'UFC8020':75,'UFC8025':45,'UFC8032':25,'UFC8040':0,'UFC8050':0,
  'UFM8015':125,'UFM8020':100,'UFM8025':40,'UFM8032':0,'UFM8040':0,'UFM8050':0,
  'UFF8015':125,'UFF8020':75,'UFF8025':50,'UFF8032':25,'UFF8040':0,'UFF8050':0,
  'UFE458015':80,'UFE458020':47,'UFE458025':20,'UFE458032':15,'UFE458040':15,'UFE458050':9,
  'UFEC8015':50,'UFEC8020':50,'UFEC8025':25,'UFEC8032':40,'UFEC8040':15,'UFEC8050':20,
  'UFU8015':30,'UFU8020':30,'UFU8025':21,'UFU8032':16,'UFU8040':12,'UFU8050':9,
  'UFET8015':10,'UFET802015':30,'UFET8025':25,'UFET802515':25,'UFET802520':25,
  'UFTT8015':40,'UFTT8025':20,'UFTT802515':20,'UFTT802520':20,
  'UFBE15':40,'UFBE20':21,'UFBE25':16,'UFBE2015':40,'UFBE2515':20,
  'UFBT15':30,'UFBT25':15,'UFBT2015':25,'UFBT2515':15,'UFBT2520':15,
  'UFBM15':20,'UFBM20':15,'UFBM25':12,'UFBM32':0,'UFBM40':0,'UFBM50':0,
  'UFBM2015':20,'UFBM2515':10,'UFBM2520':10,
  'UFBF15':72,'UFBF20':49,'UFBF25':10,'UFBF32':0,'UFBF40':0,'UFBF50':0,
  'UFBF2015':64,'UFBF2515':25,'UFBF2520':10,
  'UFTC8015':60,'UFTC8020':40,'UFTC8025':20,'UFTC8032':15,'UFTC8040':11,'UFTC8050':7,
  'UFTCS8015':50,'UFTCS8020':40,'UFTCS8025':30,'UFTCS8032':10,'UFTCS8040':10,'UFTCS8050':10,
  // Reducer std_pkg
  'UFRT802015':30,'UFRT802515':25,'UFRT802520':25,
  'UFRT803215':15,'UFRT803220':15,'UFRT803225':15,
  'UFRT804015':8,'UFRT804020':8,'UFRT804025':8,'UFRT804032':8,
  'UFRT805015':6,'UFRT805020':6,'UFRT805025':6,'UFRT805032':6,'UFRT805040':6,
  'UFRC802015':100,'UFRC802515':50,'UFRC802520':50,
  'UFRC803215':25,'UFRC803220':25,'UFRC803225':25,
  'UFRC804015':15,'UFRC804020':15,'UFRC804025':15,'UFRC804032':19,
  'UFRC805015':18,'UFRC805020':17,'UFRC805025':15,'UFRC805032':14,'UFRC805040':12,
  'UFRE802015':50,'UFRE802515':30,'UFRE802520':30,
  'UFRB802015':50,'UFRB802515':25,'UFRB802520':25,
  'UFRB803215':50,'UFRB803220':50,'UFRB803225':50,
  'UFRB804015':25,'UFRB804020':25,'UFRB804025':25,'UFRB804032':25,
  'UFRB805015':25,'UFRB805020':25,'UFRB805025':25,'UFRB805032':25,'UFRB805040':25,
  // Large fittings
  'UFE65':2,'UFE80':1,'UFE100':1,'UFE150':1,
  'UFT65':2,'UFT80':2,'UFT100':1,'UFT150':1,
  'UFC65':4,'UFC80':2,'UFC100':1,'UFC150':1,
  'UFM65':2,'UFM80':2,'UFM100':1,'UFM150':1,
  'UFF65':2,'UFF80':2,'UFF100':1,'UFF150':1,
  'UFEC65':6,'UFEC80':2,'UFEC100':2,'UFEC150':1,
  'UFU65':1,'UFU80':1,'UFU100':1,
  'UFE4565':2,'UFE4580':2,'UFE45100':1,'UFE45150':1,
  'UFFG25':4,'UFFG40':1,'UFFG50':1,'UFFG65':2,'UFFG80':2,'UFFG100':1,'UFFG150':1,
  'UFBF65':2,'UFBF80':1,'UFBF100':1,
  'UFBM65':2,'UFBM80':1,'UFBM100':1,
  'UFTCS65':3,'UFTCS80':1,'UFTCS100':1,
  // Large reducers
  'UFRT6525':2,'UFRT6540':2,'UFRT6550':2,
  'UFRT8040LG':2,'UFRT8050LG':2,'UFRT8065':2,
  'UFRT10040':1,'UFRT10050':1,'UFRT10065':1,'UFRT10080':1,
  'UFRT15075':1,'UFRT150100':1,
  'UFRC6540':3,'UFRC6550':3,
  'UFRC8050LG':2,'UFRC8065':2,
  'UFRC10050':1,'UFRC10065':1,'UFRC10090':1,'UFRC15065':1,'UFRC150100':1,
  'UFRB6550':4,'UFRB8050':4,'UFRB8065':4,
  'UFRB10050':2,'UFRB10065':2,'UFRB10080':2,
  'UFRB15050':1,'UFRB15080':1,'UFRB150110':1,
  // SCH 40 fittings
  'UFE4015':100,'UFE4020':50,'UFE4025':25,'UFE4032':15,'UFE4040':15,'UFE4050':9,
  'UFT4015':50,'UFT4020':50,'UFT4025':25,'UFT4032':10,'UFT4040':0,'UFT4050':0,
  'UFC4015':100,'UFC4020':100,'UFC4025':50,'UFC4032':25,'UFC4040':20,'UFC4050':10,
  'UFM4015':100,'UFM4020':50,'UFM4025':50,'UFM4032':25,'UFM4040':25,'UFM4050':15,
  'UFF4015':100,'UFF4020':50,'UFF4025':50,'UFF4032':25,'UFF4040':20,'UFF4050':15,
  'UFE454015':100,'UFE454020':50,'UFE454025':25,
  'UFCT4015':40,'UFCT4020':20,'UFCT4025':20,
  // Valves
  'UFCBV15':30,'UFCBV20':20,'UFCBV25':12,'UFCBV32':6,'UFCBV40':5,'UFCBV50':3,
  'UFCBVL15':28,'UFCBVL20':18,'UFCBVL25':10,'UFCBVL32':6,'UFCBVL40':4,'UFCBVL50':3,
  'UFCBVL65':1,'UFCBVL80':1,'UFCBVL100':1,
  'UFCTBVL15':28,'UFCTBVL20':18,'UFCTBVL25':10,'UFCTBVL32':6,'UFCTBVL40':4,'UFCTBVL50':3,
  'UFCVST15':1,'UFCVST20':1,'UFCVLT15':1,'UFCVLT20':1,
  'UFBV15':1,'UFBV20':1,'UFBV25':1,'UFBV32':1,'UFBV40':1,'UFBV50':1,
  'UFNRV20':1,'UFNRV25':1,'UFNRV32':1,'UFNRV40':1,
  'UFLPW15':100,
  'UFB9015':40,'UFB9020':30,'UFB9025':20,'UFB9032':10,'UFB9040':8,'UFB9050':4,
  // Solvents
  'UFSCH20':50,'UFSCH50':50,'UFSCH59':30,'UFSCH118':24,'UFSCH237':24,'UFSCH473':12,'UFSCH946':6,
  'UFSCM20':50,'UFSCM50':50,'UFSCM118':24,'UFSCM237':24,'UFSCM473':12,'UFSCM946':6,
  'CUFP473':12,
};

function getStdPkg(code) {
  return stdPkgMap[code] !== undefined ? stdPkgMap[code] : 10;
}

// ── Emit SCH 80 fittings (½"–2") ────────────────────────────────────
const sch80FittingGroups = [
  { label: 'Elbow (SCH 80) — ½"–2"', name: 'Elbow', sub: 'elbow', codes: ['UFE8015','UFE8020','UFE8025','UFE8032','UFE8040','UFE8050'] },
  { label: 'Tee (SCH 80) — ½"–2"', name: 'Tee', sub: 'tee', codes: ['UFT8015','UFT8020','UFT8025','UFT8032','UFT8040','UFT8050'] },
  { label: 'Coupler (SCH 80) — ½"–2"', name: 'Coupler', sub: 'coupler', codes: ['UFC8015','UFC8020','UFC8025','UFC8032','UFC8040','UFC8050'] },
  { label: 'M.T.A. (SCH 80) — ½"–2"', name: 'M.T.A.', sub: 'mta', codes: ['UFM8015','UFM8020','UFM8025','UFM8032','UFM8040','UFM8050'] },
  { label: 'F.T.A. (SCH 80) — ½"–2"', name: 'F.T.A.', sub: 'fta', codes: ['UFF8015','UFF8020','UFF8025','UFF8032','UFF8040','UFF8050'] },
  { label: 'Elbow 45° (SCH 80) — ½"–2"', name: 'Elbow 45°', sub: 'elbow45', codes: ['UFE458015','UFE458020','UFE458025','UFE458032','UFE458040','UFE458050'] },
  { label: 'End Cap (SCH 80) — ½"–2"', name: 'End Cap', sub: 'endcap', codes: ['UFEC8015','UFEC8020','UFEC8025','UFEC8032','UFEC8040','UFEC8050'] },
  { label: 'Union (SCH 80) — ½"–2"', name: 'Union', sub: 'union', codes: ['UFU8015','UFU8020','UFU8025','UFU8032','UFU8040','UFU8050'] },
];

const productMap = new Map();
for (const p of products) {
  const key = p.code.toUpperCase();
  if (!productMap.has(key)) {
    productMap.set(key, p);
  }
}

for (const grp of sch80FittingGroups) {
  lines.push('');
  lines.push(`  // ${grp.label}`);
  for (const code of grp.codes) {
    const p = productMap.get(code.toUpperCase());
    if (p) {
      emitFitting(p, { name: grp.name, cat: 'fittings', sub: grp.sub, standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
    }
  }
}

// Threaded Elbow
lines.push('');
lines.push('  // Threaded Elbow (SCH 80)');
for (const code of ['UFET8015','UFET802015','UFET8025','UFET802515','UFET802520']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Threaded Elbow', cat: 'fittings', sub: 'threadedelbow', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

// Threaded Tee
lines.push('');
lines.push('  // Threaded Tee (SCH 80)');
for (const code of ['UFTT8015','UFTT8025','UFTT802515','UFTT802520']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Threaded Tee', cat: 'fittings', sub: 'threadedtee', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

// ═══ BRASS FITTINGS ══════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // BRASS FITTINGS (SCH 80) — ASTM D-2467');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

const brassGroups = [
  { label: 'Brass Elbow', name: 'Brass Elbow', sub: 'brasselbow', codes: ['UFBE15','UFBE20','UFBE25','UFBE2015','UFBE2515'] },
  { label: 'Brass Tee', name: 'Brass Tee', sub: 'brasstee', codes: ['UFBT15','UFBT25','UFBT2015','UFBT2515','UFBT2520'] },
  { label: 'Brass M.T.A.', name: 'Brass M.T.A.', sub: 'brassmta', codes: ['UFBM15','UFBM20','UFBM25','UFBM32','UFBM40','UFBM50','UFBM2015','UFBM2515','UFBM2520'] },
  { label: 'Brass F.T.A.', name: 'Brass F.T.A.', sub: 'brassfta', codes: ['UFBF15','UFBF20','UFBF25','UFBF32','UFBF40','UFBF50','UFBF2015','UFBF2515','UFBF2520'] },
];

for (const grp of brassGroups) {
  lines.push('');
  lines.push(`  // ${grp.label}`);
  for (const code of grp.codes) {
    const p = productMap.get(code);
    if (p) {
      emitFitting(p, { name: grp.name, cat: 'brass', sub: grp.sub, standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
    }
  }
}

// ═══ REDUCERS SCH 80 ════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // REDUCER FITTINGS — SCH 80 as per ASTM D-2467');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

// Reducer Tee SCH80
lines.push('');
lines.push('  // Reducer Tee (SCH 80)');
const redTeeCodes = ['UFRT802015','UFRT802515','UFRT802520','UFRT803215','UFRT803220','UFRT803225',
  'UFRT804015','UFRT804020','UFRT804025','UFRT804032',
  'UFRT805015','UFRT805020','UFRT805025','UFRT805032','UFRT805040'];
for (const code of redTeeCodes) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Reducer Tee', cat: 'reducers', sub: 'redtee', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

// Reducer Coupler SCH80
lines.push('');
lines.push('  // Reducer Coupler (SCH 80)');
const redCouplerCodes = ['UFRC802015','UFRC802515','UFRC802520','UFRC803215','UFRC803220','UFRC803225',
  'UFRC804015','UFRC804020','UFRC804025','UFRC804032',
  'UFRC805015','UFRC805020','UFRC805025','UFRC805032','UFRC805040'];
for (const code of redCouplerCodes) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Reducer Coupler', cat: 'reducers', sub: 'redcoupler', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

// Reducer Elbow
lines.push('');
lines.push('  // Reducer Elbow (SCH 80)');
for (const code of ['UFRE802015','UFRE802515','UFRE802520']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Reducer Elbow', cat: 'reducers', sub: 'redelbow', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

// Reducer Bush
lines.push('');
lines.push('  // Reducer Bush (SCH 80)');
const redBushCodes = ['UFRB802015','UFRB802515','UFRB802520',
  'UFRB803215','UFRB803220','UFRB803225',
  'UFRB804015','UFRB804020','UFRB804025','UFRB804032',
  'UFRB805015','UFRB805020','UFRB805025','UFRB805032','UFRB805040'];
for (const code of redBushCodes) {
  const p = productMap.get(code);
  if (p) {
    // First one is SCH 40 in Excel, rest are SCH 80
    const std = code === 'UFRB802015' ? 'ASTM D 2466' : 'ASTM D 2467';
    emitFitting(p, { name: 'Reducer Bush', cat: 'reducers', sub: 'redbush', standard: std, std_pkg: getStdPkg(code) });
  }
}

// ═══ TANK CONNECTORS ════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // TANK CONNECTORS — SCH 80');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

lines.push('');
lines.push('  // Tank Connector (Threaded) — ½"–2"');
for (const code of ['UFTC8015','UFTC8020','UFTC8025','UFTC8032','UFTC8040','UFTC8050']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Tank Connector', cat: 'fittings', sub: 'tankconn', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

lines.push('');
lines.push('  // Tank Connector (Socket Type) — ½"–2"');
for (const code of ['UFTCS8015','UFTCS8020','UFTCS8025','UFTCS8032','UFTCS8040','UFTCS8050']) {
  const p = productMap.get(code);
  if (p) {
    const r = p.rate || 100;
    const qty = p.qtyBox || 10;
    const sz = cleanSize(p.size);
    const mm = sizeMM(p.size);
    const sp = getStdPkg(code);
    // UFTCS8032 has no data in Excel, skip if rate is 0
    if (r > 0) {
      lines.push(`  { code:'${code}', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'${sz}', size_mm:${mm}, standard:'ASTM D 2467', std_pkg:${sp}, qty_box:${qty}, rate:${r}, unit:'pcs' },`);
    }
  }
}

// ═══ SCH 40 FITTINGS ════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // uPVC FITTINGS — SCH 40 as per ASTM D-2466 (HSN Code: 3917)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

const sch40Groups = [
  { label: 'Elbow (SCH 40) — ½"–2"', name: 'Elbow', sub: 'elbow', codes: ['UFE4015','UFE4020','UFE4025','UFE4032','UFE4040','UFE4050'] },
  { label: 'Tee (SCH 40) — ½"–2"', name: 'Tee', sub: 'tee', codes: ['UFT4015','UFT4020','UFT4025','UFT4032','UFT4040','UFT4050'] },
  { label: 'Coupler (SCH 40) — ½"–2"', name: 'Coupler', sub: 'coupler', codes: ['UFC4015','UFC4020','UFC4025','UFC4032','UFC4040','UFC4050'] },
  { label: 'Cross Tee (SCH 40) — ½"–1"', name: 'Cross Tee', sub: 'crosstee', codes: ['UFCT4015','UFCT4020','UFCT4025'] },
  { label: 'M.T.A. (SCH 40) — ½"–2"', name: 'M.T.A.', sub: 'mta', codes: ['UFM4015','UFM4020','UFM4025','UFM4032','UFM4040','UFM4050'] },
  { label: 'F.T.A. (SCH 40) — ½"–2"', name: 'F.T.A.', sub: 'fta', codes: ['UFF4015','UFF4020','UFF4025','UFF4032','UFF4040','UFF4050'] },
  { label: 'Elbow 45° (SCH 40)', name: 'Elbow 45°', sub: 'elbow45', codes: ['UFE454015','UFE454020','UFE454025'] },
];

for (const grp of sch40Groups) {
  lines.push('');
  lines.push(`  // ${grp.label}`);
  for (const code of grp.codes) {
    const p = productMap.get(code);
    if (p) {
      emitFitting(p, { name: grp.name, cat: 'fittings', sub: grp.sub, standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
    }
  }
}

// Flange (small)
lines.push('');
lines.push('  // Flange');
for (const code of ['UFFG25','UFFG40','UFFG50']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Flange', cat: 'fittings', sub: 'flange', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// ═══ SCH 40 REDUCERS (from existing file, not in Excel) ═════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // REDUCER FITTINGS — SCH 40 as per ASTM D-2466');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

// These are manually-added products not in the Excel - keep them
lines.push('');
lines.push('  // Reducer Tee (SCH 40)');
const sch40RedTees = [
  {code:'UFRT402515', size:'1"x½"', mm:25, rate:33.5, qty:150, sp:25},
  {code:'UFRT404015', size:'1½"x½"', mm:40, rate:67, qty:60, sp:0},
  {code:'UFRT404020', size:'1½"x¾"', mm:40, rate:70, qty:60, sp:0},
  {code:'UFRT404032', size:'1½"x1¼"', mm:40, rate:78, qty:48, sp:0},
  {code:'UFRT405015', size:'2"x½"', mm:50, rate:107, qty:48, sp:0},
  {code:'UFRT405020', size:'2"x¾"', mm:50, rate:107, qty:40, sp:0},
  {code:'UFRT405025', size:'2"x1"', mm:50, rate:110, qty:30, sp:0},
  {code:'UFRT405032', size:'2"x1¼"', mm:50, rate:112, qty:38, sp:0},
  {code:'UFRT405040', size:'2"x1½"', mm:50, rate:105.5, qty:38, sp:0},
];
for (const t of sch40RedTees) {
  lines.push(`  { code:'${t.code}', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'${t.size}', size_mm:${t.mm}, standard:'ASTM D 2466', std_pkg:${t.sp}, qty_box:${t.qty}, rate:${t.rate}, unit:'pcs' },`);
}

lines.push('');
lines.push('  // Reducer Coupler (SCH 40)');
const sch40RedCouplers = [
  {code:'UFRC402515', size:'1"x½"', mm:25, rate:17, qty:350, sp:50},
  {code:'UFRC402520', size:'1"x¾"', mm:25, rate:19.5, qty:250, sp:50},
];
for (const t of sch40RedCouplers) {
  lines.push(`  { code:'${t.code}', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'${t.size}', size_mm:${t.mm}, standard:'ASTM D 2466', std_pkg:${t.sp}, qty_box:${t.qty}, rate:${t.rate}, unit:'pcs' },`);
}

// ═══ BALL VALVES & ACCESSORIES ═══════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // BALL VALVES & CONCEALED VALVES (HSN Code: 3917)');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

// Compact Ball Valve Short Handle
lines.push('');
lines.push('  // Compact Ball Valve — Short Handle');
for (const code of ['UFCBV15','UFCBV20','UFCBV25','UFCBV32','UFCBV40','UFCBV50']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Compact Ball Valve (Short)', cat: 'valves', sub: 'compactbvshort', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// Compact Ball Valve Long Handle
lines.push('');
lines.push('  // Compact Ball Valve — Long Handle');
for (const code of ['UFCBVL15','UFCBVL20','UFCBVL25','UFCBVL32','UFCBVL40','UFCBVL50','UFCBVL65','UFCBVL80','UFCBVL100']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Compact Ball Valve (Long)', cat: 'valves', sub: 'compactbvlong', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// Compact Threaded Ball Valve Long Handle
lines.push('');
lines.push('  // Compact Threaded Ball Valve — Long Handle');
for (const code of ['UFCTBVL15','UFCTBVL20','UFCTBVL25','UFCTBVL32','UFCTBVL40','UFCTBVL50']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Compact Threaded Ball Valve (Long)', cat: 'valves', sub: 'threadedbvlong', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// Ball Valve
lines.push('');
lines.push('  // Ball Valve');
for (const code of ['UFBV15','UFBV20','UFBV25','UFBV32','UFBV40','UFBV50']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Ball Valve', cat: 'valves', sub: 'ballvalve', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// Concealed Valve Long
lines.push('');
lines.push('  // Concealed Valve (Quarter Turn) — Long Triangle Knob');
// Excel has UFCVLT20=½" @1000, UFCVLT25=¾" @1050 — use codes from existing file
lines.push("  { code:'UFCVLT15', name:'Concealed Valve Long', category:'valves', subcategory:'concealedlong', size:'½\"', size_mm:15, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:1000, unit:'pcs' },");
lines.push("  { code:'UFCVLT20', name:'Concealed Valve Long', category:'valves', subcategory:'concealedlong', size:'¾\"', size_mm:20, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:1050, unit:'pcs' },");

// Concealed Valve Short
lines.push('');
lines.push('  // Concealed Valve (Quarter Turn) — Short Triangle Knob');
lines.push("  { code:'UFCVST15', name:'Concealed Valve Short', category:'valves', subcategory:'concealedshort', size:'½\"', size_mm:15, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:875, unit:'pcs' },");
lines.push("  { code:'UFCVST20', name:'Concealed Valve Short', category:'valves', subcategory:'concealedshort', size:'¾\"', size_mm:20, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:925, unit:'pcs' },");

// Non Return Valve
lines.push('');
lines.push('  // Non Return Valve');
for (const code of ['UFNRV20','UFNRV25','UFNRV32','UFNRV40']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Non Return Valve', cat: 'valves', sub: 'nrv', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// Long Plug
lines.push('');
lines.push('  // Long Plug');
{
  const p = productMap.get('UFLPW15');
  if (p) {
    emitFitting(p, { name: 'Long Plug', cat: 'fittings', sub: 'longplug', standard: 'ASTM D 2466', std_pkg: getStdPkg('UFLPW15') });
  }
}

// Bend 90°
lines.push('');
lines.push('  // Bend 90°');
for (const code of ['UFB9015','UFB9020','UFB9025','UFB9032','UFB9040','UFB9050']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Bend 90°', cat: 'fittings', sub: 'bend90', standard: 'ASTM D 2466', std_pkg: getStdPkg(code) });
  }
}

// ═══ ACCESSORIES ═════════════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // ACCESSORIES — PTFE Tape, Solvent Cement, Primer');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

// PTFE Tape (not in Excel, manually added)
lines.push('');
lines.push('  // PTFE Tape (HSN Code: 3920)');
lines.push("  { code:'PTY12', name:'PTFE Tape (Yellow) 12mm', category:'accessories', subcategory:'ptfetape', size:'12mm', size_mm:12, standard:'HSN 3920', std_pkg:250, qty_box:1000, rate:25, unit:'pcs', info:'10 mtc.' },");
lines.push("  { code:'PTY19', name:'PTFE Tape (Yellow) 19mm', category:'accessories', subcategory:'ptfetape', size:'19mm', size_mm:19, standard:'HSN 3920', std_pkg:250, qty_box:1000, rate:35, unit:'pcs', info:'10 mtc.' },");
lines.push("  { code:'PTW12', name:'PTFE Tape (White) 12mm', category:'accessories', subcategory:'ptfetape', size:'12mm', size_mm:12, standard:'HSN 3920', std_pkg:250, qty_box:1000, rate:20, unit:'pcs', info:'10 mtc.' },");

// Solvent Cement HD
lines.push('');
lines.push('  // PVC Solvent Cement — 77 Heavy Duty (HSN Code: 3506)');
for (const code of ['UFSCH20','UFSCH50','UFSCH59','UFSCH118','UFSCH237','UFSCH473','UFSCH946']) {
  const p = productMap.get(code);
  if (p) {
    emitAccessory(p, { name: 'PVC Solvent Cement 77 HD', sub: 'solventhd', std_pkg: getStdPkg(code) });
  }
}

// Solvent Cement MD
lines.push('');
lines.push('  // PVC Solvent Cement — 57 Medium Duty (HSN Code: 3506)');
for (const code of ['UFSCM20','UFSCM50','UFSCM118','UFSCM237','UFSCM473','UFSCM946']) {
  const p = productMap.get(code);
  if (p) {
    emitAccessory(p, { name: 'PVC Solvent Cement 57 MD', sub: 'solventmd', std_pkg: getStdPkg(code) });
  }
}

// Primer
lines.push('');
lines.push('  // Primer (HSN Code: 3506)');
{
  const p = productMap.get('CUFP473');
  if (p) {
    emitAccessory(p, { name: 'Primer', sub: 'primer', std_pkg: getStdPkg('CUFP473') });
  }
}

// ═══ LARGE SIZE FITTINGS ═════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // LARGE SIZE FITTINGS — SCH 80 (2½"–6")');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

const largeFittingGroups = [
  { label: 'Elbow (Large)', name: 'Elbow', sub: 'elbow', codes: ['UFE65','UFE80','UFE100','UFE150'] },
  { label: 'Tee (Large)', name: 'Tee', sub: 'tee', codes: ['UFT65','UFT80','UFT100','UFT150'] },
  { label: 'Coupler (Large)', name: 'Coupler', sub: 'coupler', codes: ['UFC65','UFC80','UFC100','UFC150'] },
  { label: 'End Cap (Large)', name: 'End Cap', sub: 'endcap', codes: ['UFEC65','UFEC80','UFEC100','UFEC150'] },
  { label: 'F.T.A. (Large)', name: 'F.T.A.', sub: 'fta', codes: ['UFF65','UFF80','UFF100','UFF150'] },
  { label: 'M.T.A. (Large)', name: 'M.T.A.', sub: 'mta', codes: ['UFM65','UFM80','UFM100','UFM150'] },
  { label: 'Union (Large)', name: 'Union', sub: 'union', codes: ['UFU65','UFU80','UFU100'] },
  { label: 'Elbow 45° (Large)', name: 'Elbow 45°', sub: 'elbow45', codes: ['UFE4565','UFE4580','UFE45100','UFE45150'] },
  { label: 'Flange (Large)', name: 'Flange', sub: 'flange', codes: ['UFFG65','UFFG80','UFFG100','UFFG150'] },
  { label: 'Brass F.T.A. (Large)', name: 'Brass F.T.A.', sub: 'brassfta', codes: ['UFBF65','UFBF80','UFBF100'] },
  { label: 'Brass M.T.A. (Large)', name: 'Brass M.T.A.', sub: 'brassmta', codes: ['UFBM65','UFBM80','UFBM100'] },
];

for (const grp of largeFittingGroups) {
  lines.push('');
  lines.push(`  // ${grp.label}`);
  const cat = grp.sub.startsWith('brass') ? 'brass' : 'fittings';
  for (const code of grp.codes) {
    const p = productMap.get(code);
    if (p) {
      emitFitting(p, { name: grp.name, cat, sub: grp.sub, standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
    }
  }
}

// Tank Connector (Socket Type) Large
lines.push('');
lines.push('  // Tank Connector — Socket Type (Large)');
for (const code of ['UFTCS65','UFTCS80','UFTCS100']) {
  const p = productMap.get(code);
  if (p) {
    emitFitting(p, { name: 'Tank Connector (Socket)', cat: 'fittings', sub: 'tankconnsocket', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) });
  }
}

// ═══ LARGE SIZE REDUCERS ═════════════════════════════════════════════
lines.push('');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');
lines.push('  // LARGE SIZE REDUCERS — SCH 80 (2½"–6")');
lines.push('  // ═══════════════════════════════════════════════════════════════════════════');

// Large Reducer Tee
lines.push('');
lines.push('  // Reducer Tee (Large)');
const lgRedTeeCodes = ['UFRT6525','UFRT6540','UFRT6550',
  'UFRT8040','UFRT8050','UFRT8065',
  'UFRT10040','UFRT10050','UFRT10065','UFRT10080',
  'UFRT15075','UFRT150100'];
for (const code of lgRedTeeCodes) {
  // Note: UFRT8040 and UFRT8050 exist both as small reducers (SCH80 1½"x) and large (3"x)
  // The large versions are after the small ones in the Excel. We need to handle duplicates.
  // Find the right product from the list
  let p;
  if (code === 'UFRT8040' || code === 'UFRT8050') {
    // These are large-size: 3"x1½" and 3"x2"
    p = products.find(pr => pr.code === code && pr.name.includes('Reducing Tee'));
    // But there may be duplicates - get the one with larger size
    const all = products.filter(pr => pr.code === code && pr.name.includes('Reducing Tee'));
    if (all.length > 0) p = all[all.length - 1]; // last occurrence is the large one
  } else {
    p = productMap.get(code);
  }
  if (p) {
    emitFitting(p, { name: 'Reducer Tee', cat: 'reducers', sub: 'redtee', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) || 2 });
  }
}

// Large Reducer Coupler
lines.push('');
lines.push('  // Reducer Coupler (Large)');
const lgRedCouplerCodes = ['UFRC6540','UFRC6550',
  'UFRC8050','UFRC8065',
  'UFRC10050','UFRC10065','UFRC10090',
  'UFRC15065','UFRC150100'];
for (const code of lgRedCouplerCodes) {
  let p;
  if (code === 'UFRC8050') {
    // There's both small (2"x½") and large (3"x2")
    const all = products.filter(pr => pr.code === code);
    p = all.length > 1 ? all[all.length - 1] : all[0];
  } else {
    p = productMap.get(code);
  }
  if (p) {
    emitFitting(p, { name: 'Reducer Coupler', cat: 'reducers', sub: 'redcoupler', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) || 2 });
  }
}

// Large Reducer Bush
lines.push('');
lines.push('  // Reducer Bush (Large)');
const lgRedBushCodes = ['UFRB6550',
  'UFRB8050','UFRB8065',
  'UFRB10050','UFRB10065','UFRB10080',
  'UFRB15050','UFRB15080','UFRB150110'];
for (const code of lgRedBushCodes) {
  let p;
  if (code === 'UFRB8050') {
    const all = products.filter(pr => pr.code === code);
    p = all.length > 1 ? all[all.length - 1] : all[0];
  } else {
    p = productMap.get(code);
  }
  if (p) {
    emitFitting(p, { name: 'Reducer Bush', cat: 'reducers', sub: 'redbush', standard: 'ASTM D 2467', std_pkg: getStdPkg(code) || 2 });
  }
}

lines.push('];');
lines.push('');
lines.push("document.dispatchEvent(new Event('brand-data-ready'));");

// ── Write output ─────────────────────────────────────────────────────
const output = lines.join('\n') + '\n';
const outPath = path.join(ROOT, 'js', 'brands', 'surefit-upvc.js');
fs.writeFileSync(outPath, output, 'utf8');

// Count products
const count = (output.match(/code:'/g) || []).length;
console.log(`Wrote ${count} products to ${outPath}`);

// Show summary
const cats = {};
for (const line of lines) {
  const m = line.match(/category:'([^']+)'/);
  if (m) cats[m[1]] = (cats[m[1]] || 0) + 1;
}
console.log('Category breakdown:', JSON.stringify(cats));
