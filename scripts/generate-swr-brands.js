#!/usr/bin/env node
// Extract SWR product data from PRICE LIST.xls and generate brand JS files
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile(path.join(__dirname, '..', 'PRICE LIST.xls'));
const swrSheet = wb.Sheets['SWR PIPES & FITTING'];
const solventSheet = wb.Sheets['SOLVENT CEMENT'];

const swrData = XLSX.utils.sheet_to_json(swrSheet, { header: 1, defval: '' });
const solventData = XLSX.utils.sheet_to_json(solventSheet, { header: 1, defval: '' });

// Parse all product rows from SWR sheet (skip header rows 0-4)
const swrProducts = [];
for (let i = 5; i < swrData.length; i++) {
  const row = swrData[i];
  if (!row[1] || typeof row[1] !== 'string' || row[1].trim() === '') continue;
  swrProducts.push({
    sr: row[0],
    code: String(row[1]).trim(),
    name: String(row[2]).trim(),
    size: String(row[3]).trim(),
    hsn: String(row[4]).trim(),
    qty_box: row[5] === '' || row[5] === 0 ? 0 : Number(row[5]),
    rate: row[7] === '' || row[7] === 0 ? 100 : Number(row[7]),
    rowIdx: i
  });
}

// Parse solvent cement rows for SFRL codes
const solventProducts = [];
for (let i = 5; i < solventData.length; i++) {
  const row = solventData[i];
  if (!row[1] || typeof row[1] !== 'string') continue;
  const code = String(row[1]).trim();
  if (code.startsWith('SFRL')) {
    solventProducts.push({
      code,
      name: String(row[2]).trim(),
      size: String(row[3]).trim(),
      hsn: String(row[4]).trim(),
      qty_box: row[5] === '' ? 10 : Number(row[5]),
      rate: row[7] === '' || row[7] === 0 ? 100 : Number(row[7]),
    });
  }
}

console.log(`Found ${swrProducts.length} SWR products, ${solventProducts.length} solvent products`);

// Size formatting helpers
const SIZE_MAP = {
  '40mm': { display: '40mm(1½")', mm: 40 },
  '50mm': { display: '50mm(2")', mm: 50 },
  '63mm': { display: '63mm(2")', mm: 63 },
  '63 mm': { display: '63mm(2")', mm: 63 },
  '75mm': { display: '75mm(2½")', mm: 75 },
  '90mm': { display: '90mm(3")', mm: 90 },
  '110mm': { display: '110mm(4")', mm: 110 },
  '125mm': { display: '125mm(5")', mm: 125 },
  '140mm': { display: '140mm(5½")', mm: 140 },
  '160mm': { display: '160mm(6")', mm: 160 },
  '200mm': { display: '200mm(8")', mm: 200 },
  '250mm': { display: '250mm(10")', mm: 250 },
  '315mm': { display: '315mm(12")', mm: 315 },
};

function getSize(rawSize) {
  const s = rawSize.trim();
  if (SIZE_MAP[s]) return SIZE_MAP[s];
  // compound sizes like 110x75mm
  if (s.includes('x')) return { display: s, mm: parseInt(s) };
  return { display: s, mm: parseInt(s) || 0 };
}

// Pipe length detection from product name
function parsePipeLength(name) {
  if (name.includes('6mtr') || name.includes('6 mtr')) return '6m';
  if (name.includes('3mtr') || name.includes('3 mtr')) return '3m';
  if (name.includes('6Ft') || name.includes('6 Ft') || name.includes('6ft')) return '6ft';
  if (name.includes('4Ft') || name.includes('4 Ft') || name.includes('4ft')) return '4ft';
  if (name.includes('3Ft') || name.includes('3 Ft') || name.includes('3ft')) return '3ft';
  if (name.includes('2Ft') || name.includes('2 Ft') || name.includes('2ft')) return '2ft';
  return '3m';
}

function parseSocket(name) {
  if (name.includes('D/S')) return 'D/S';
  if (name.includes('S/S')) return 'S/S';
  return 'S/S';
}

// ====================================================================
// CLICKFIT SWR
// ====================================================================
function generateClickfitSWR() {
  const products = [];

  // ClickFit Pipes: codes starting with CSP
  const clickfitPipes = swrProducts.filter(p => p.code.startsWith('CSP'));
  for (const p of clickfitPipes) {
    const sz = getSize(p.size);
    const pipeLen = parsePipeLength(p.name);
    const socket = parseSocket(p.name);
    const isTypeB = p.name.includes("Type 'B'") || p.name.includes('Type B');
    const subcategory = isTypeB ? 'swr_type_b' : 'swr_type_a';
    const typeName = isTypeB ? 'Type B' : 'Type A';
    products.push({
      code: p.code,
      name: `SWR Pipe ${typeName}`,
      category: 'pipes',
      subcategory,
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      pipe_length: pipeLen,
      socket,
      rate: p.rate,
      unit: 'pcs',
      info: `${typeName} \u2022 ${pipeLen} \u2022 ${socket === 'S/S' ? 'Single Socket' : 'Double Socket'}`
    });
  }

  // ClickFit Fittings: codes starting with CSF
  const clickfitFittings = swrProducts.filter(p => p.code.startsWith('CSF'));
  for (const p of clickfitFittings) {
    const sz = getSize(p.size);
    const subcategory = classifyClickfitFitting(p.code, p.name);
    products.push({
      code: p.code,
      name: cleanFittingName(p.name, 'CLICKFIT'),
      category: 'fittings',
      subcategory,
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      std_pkg: p.qty_box || 10,
      rate: p.rate,
      unit: 'pcs',
      ...(sz.display.includes('x') ? { info: sz.display } : {})
    });
  }

  // Click Rings: CR75, CR90, CR110, CR160
  const clickRings = swrProducts.filter(p => p.code.startsWith('CR'));
  for (const p of clickRings) {
    const sz = getSize(p.size);
    products.push({
      code: p.code,
      name: 'Click Ring',
      category: 'fittings',
      subcategory: 'oring',
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      std_pkg: p.qty_box || 25,
      rate: p.rate,
      unit: 'pcs'
    });
  }

  // LW ClickFit fittings: codes SF* (rows 232-247)
  // These are: SFB, SFDB, SFST, SFDT, SFB45, SFC, SFSY, SFDSY
  // Must NOT include SFS* that are Selfit LW (SFSB, SFSDB, SFSST, SFSDT, SFSB45)
  const lwClickfitCodes = ['SFB75','SFB110','SFDB75','SFDB110','SFST75','SFST110',
    'SFDT75','SFDT110','SFB4575','SFB45110','SFC75','SFC110',
    'SFSY75','SFSY110','SFDSY75','SFDSY110'];
  const lwClickfitFittings = swrProducts.filter(p => lwClickfitCodes.includes(p.code));
  for (const p of lwClickfitFittings) {
    const sz = getSize(p.size);
    const subcategory = classifyLWFitting(p.code, p.name);
    products.push({
      code: p.code,
      name: cleanFittingName(p.name, 'LW CLICKFIT'),
      category: 'fittings',
      subcategory,
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      std_pkg: p.qty_box || 10,
      rate: p.rate,
      unit: 'pcs'
    });
  }

  // Rubber Lubricant (from solvent cement sheet)
  for (const p of solventProducts) {
    products.push({
      code: p.code,
      name: p.name,
      category: 'fittings',
      subcategory: 'lubricant',
      size: p.size,
      size_mm: 0,
      standard: 'IS 13592',
      std_pkg: p.qty_box,
      rate: p.rate,
      unit: 'pcs'
    });
  }

  return products;
}

function classifyClickfitFitting(code, name) {
  const n = name.toLowerCase();
  if (n.includes('reducer') || code.startsWith('CSFR1') || code.startsWith('CSFR16')) return 'reducer';
  if (n.includes('reducing tee') || code.startsWith('CSFRT') || code.startsWith('CSFDRT')) return 'tee';
  if (n.includes('reducing') && n.includes('y')) return 'wye';
  if (n.includes('swept') || n.includes('sweep')) return 'tee';
  if (n.includes('double') && n.includes('y')) return 'wye';
  if (n.includes('cross tee')) return 'tee';
  if (n.includes('single tee') || n.includes('tee')) return 'tee';
  if (n.includes('bend')) return 'bend';
  if (n.includes('coupler')) return 'coupler';
  if (n.includes("'y'") || n.includes('single y') || n.includes("single 'y'")) return 'wye';
  if (n.includes('cleansing')) return 'cleansing_pipe';
  return 'bend';
}

function classifyLWFitting(code, name) {
  const n = name.toLowerCase();
  if (n.includes('tee')) return 'lw_fittings';
  if (n.includes('bend')) return 'lw_fittings';
  if (n.includes('coupler')) return 'lw_fittings';
  if (n.includes('y')) return 'lw_fittings';
  return 'lw_fittings';
}

function cleanFittingName(name, prefix) {
  let n = name;
  // Remove brand prefixes
  n = n.replace(/^(CLICKFIT|SELFIT|LW CLICKFIT|LW SELFIT)\s*/i, '');
  n = n.replace(/\s+/g, ' ').trim();
  // Fix degree symbol
  n = n.replace(/87\.5\*/g, '87.5\u00B0');
  n = n.replace(/45\*/g, '45\u00B0');
  n = n.replace(/\bwth\b/g, 'with');
  return n;
}

// ====================================================================
// SELFIT
// ====================================================================
function generateSelfit() {
  const products = [];

  // Selfit Type A Pipes: SSPA*
  const selfitTypeAPipes = swrProducts.filter(p => p.code.startsWith('SSPA'));
  for (const p of selfitTypeAPipes) {
    const sz = getSize(p.size);
    const pipeLen = parsePipeLength(p.name);
    products.push({
      code: p.code,
      name: 'SWR Pipe Type A',
      category: 'pipes',
      subcategory: 'swr_type_a',
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      pipe_length: pipeLen,
      socket: 'S/S',
      rate: p.rate,
      unit: 'pcs',
      info: `Type A \u2022 ${pipeLen} \u2022 Single Socket`
    });
  }

  // Selfit Type B Pipes: SSPB*
  const selfitTypeBPipes = swrProducts.filter(p => p.code.startsWith('SSPB'));
  for (const p of selfitTypeBPipes) {
    const sz = getSize(p.size);
    const pipeLen = parsePipeLength(p.name);
    products.push({
      code: p.code,
      name: 'SWR Pipe Type B',
      category: 'pipes',
      subcategory: 'swr_type_b',
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      pipe_length: pipeLen,
      socket: 'S/S',
      rate: p.rate,
      unit: 'pcs',
      info: `Type B \u2022 ${pipeLen} \u2022 Single Socket`
    });
  }

  // Selfit 2.5kg Pipes: SSP25*
  const selfit25Pipes = swrProducts.filter(p => p.code.startsWith('SSP25'));
  for (const p of selfit25Pipes) {
    const sz = getSize(p.size);
    const pipeLen = parsePipeLength(p.name);
    products.push({
      code: p.code,
      name: 'SWR Pipe Selfit 2.5 Kg',
      category: 'pipes',
      subcategory: 'swr_2_5kg',
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      pipe_length: pipeLen,
      socket: 'S/S',
      rate: p.rate,
      unit: 'pcs',
      info: `2.5 Kg \u2022 ${pipeLen}`
    });
  }

  // Selfit Fittings: SSF*
  const selfitFittings = swrProducts.filter(p => p.code.startsWith('SSF'));
  for (const p of selfitFittings) {
    const sz = getSize(p.size);
    const subcategory = classifySelfitFitting(p.code, p.name);
    products.push({
      code: p.code,
      name: cleanFittingName(p.name, 'SELFIT'),
      category: 'fittings',
      subcategory,
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      std_pkg: p.qty_box || 10,
      rate: p.rate,
      unit: 'pcs',
      ...(sz.display.includes('x') ? { info: sz.display } : {})
    });
  }

  // LW Selfit fittings: SFS* codes (rows 248-257)
  // These are: SFSB, SFSDB, SFSST, SFSDT, SFSB45
  const lwSelfitCodes = ['SFSB75','SFSB110','SFSDB75','SFSDB110',
    'SFSST75','SFSST110','SFSDT75','SFSDT110','SFSB4575','SFSB45110'];
  const lwSelfitFittings = swrProducts.filter(p => lwSelfitCodes.includes(p.code));
  for (const p of lwSelfitFittings) {
    const sz = getSize(p.size);
    products.push({
      code: p.code,
      name: cleanFittingName(p.name, 'LW SELFIT'),
      category: 'fittings',
      subcategory: 'lw_fittings',
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      std_pkg: p.qty_box || 10,
      rate: p.rate,
      unit: 'pcs'
    });
  }

  // Common SWR fittings (from row 258 onwards) - these go in Selfit
  const commonFittings = swrProducts.filter(p => {
    const code = p.code;
    return (
      code.startsWith('VC') || code.startsWith('RB') || code.startsWith('SP') ||
      code.startsWith('NTL') || code.startsWith('NTOP') || code.startsWith('MFT') ||
      code.startsWith('PT') || code.startsWith('QT') || code.startsWith('ST') ||
      code.startsWith('GT') || code.startsWith('ME') || code.startsWith('HR') ||
      code.startsWith('DC') || code.startsWith('PC') || code.startsWith('WCB') ||
      code.startsWith('J') || code.startsWith('BV') || code.startsWith('LR')
    );
  });
  for (const p of commonFittings) {
    const sz = getSize(p.size);
    const subcategory = classifyCommonFitting(p.code, p.name);
    products.push({
      code: p.code,
      name: cleanCommonFittingName(p.name),
      category: 'fittings',
      subcategory,
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      std_pkg: p.qty_box || 10,
      rate: p.rate,
      unit: 'pcs',
      ...(sz.display.includes('x') ? { info: sz.display } : {})
    });
  }

  return products;
}

function classifySelfitFitting(code, name) {
  const n = name.toLowerCase();
  if (n.includes('reducer') && !n.includes('y') && !n.includes('tee')) return 'reducer';
  if (n.includes('reducing tee') || code.startsWith('SSFRT') || code.startsWith('SSFDRT')) return 'tee';
  if (n.includes('reducing') && n.includes('y')) return 'wye';
  if (n.includes('swept') || n.includes('sweep')) return 'tee';
  if (n.includes('double') && n.includes('y')) return 'wye';
  if (n.includes('cross tee')) return 'tee';
  if (n.includes('tee')) return 'tee';
  if (n.includes('bend')) return 'bend';
  if (n.includes('coupler')) return 'coupler';
  if (n.includes("'y'") || n.includes('single y')) return 'wye';
  if (n.includes('cleansing')) return 'cleansing_pipe';
  return 'bend';
}

function classifyCommonFitting(code, name) {
  const n = name.toLowerCase();
  if (n.includes('trap') || n.includes('nahni') || n.includes('p-trap') || n.includes('q-trap') || n.includes('s-trap') || n.includes('gully')) return 'trap';
  if (n.includes('vent cowl') || n.includes('door cap') || n.includes('socket plug') || n.includes('jali') || n.includes('pipe clip') || n.includes('multi extension') || n.includes('height riser') || n.includes('wc connector')) return 'accessory';
  if (n.includes('backflow') || n.includes('valve')) return 'valve';
  if (n.includes('lip ring')) return 'trap';
  if (n.includes('reducing bush') || n.includes('reducer bush')) return 'reducer';
  return 'accessory';
}

function cleanCommonFittingName(name) {
  return name.replace(/\s+/g, ' ').trim();
}

// ====================================================================
// uPVC SWR
// ====================================================================
function generateUPVCSWR() {
  const products = [];

  // R/R 2.5kg Pipes: RSP25*
  const rrPipes = swrProducts.filter(p => p.code.startsWith('RSP'));
  for (const p of rrPipes) {
    const sz = getSize(p.size);
    const pipeLen = parsePipeLength(p.name);
    products.push({
      code: p.code,
      name: 'uPVC SWR Pipe R/R 2.5 Kg',
      category: 'pipes',
      subcategory: 'swr_2_5kg',
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 13592',
      pipe_length: pipeLen,
      socket: 'S/S',
      rate: p.rate,
      unit: 'pcs',
      info: `R/R 2.5 Kg \u2022 ${pipeLen}`
    });
  }

  return products;
}

// ====================================================================
// UGD
// ====================================================================
function generateUGD() {
  const products = [];

  const ugdPipes = swrProducts.filter(p => p.code.startsWith('UGD'));
  for (const p of ugdPipes) {
    const sz = getSize(p.size);
    const pipeLen = parsePipeLength(p.name);
    let snClass = 'sn4';
    if (p.code.includes('SN2')) snClass = 'sn2';
    else if (p.code.includes('SN4')) snClass = 'sn4';
    else if (p.code.includes('SN8')) snClass = 'sn8';

    const isISI = p.name.includes('ISI');
    const snNum = snClass.replace('sn', 'SN ');
    products.push({
      code: p.code,
      name: `UGD Pipe ${snNum.toUpperCase()}${isISI ? ' ISI' : ''}`,
      category: 'pipes',
      subcategory: snClass,
      size: sz.display,
      size_mm: sz.mm,
      standard: 'IS 15328',
      pipe_length: pipeLen,
      rate: p.rate,
      unit: 'pcs',
      info: `${snNum.toUpperCase()} \u2022 ${pipeLen}${isISI ? ' \u2022 ISI' : ''}`
    });
  }

  return products;
}

// ====================================================================
// FILE GENERATION
// ====================================================================
function formatProduct(p) {
  const parts = [];
  parts.push(`code:'${p.code}'`);
  parts.push(`name:'${p.name.replace(/'/g, "\\'")}'`);
  parts.push(`category:'${p.category}'`);
  parts.push(`subcategory:'${p.subcategory}'`);
  parts.push(`size:'${p.size}'`);
  parts.push(`size_mm:${p.size_mm}`);
  parts.push(`standard:'${p.standard}'`);
  if (p.pipe_length) parts.push(`pipe_length:'${p.pipe_length}'`);
  if (p.socket) parts.push(`socket:'${p.socket}'`);
  if (p.std_pkg !== undefined) parts.push(`std_pkg:${p.std_pkg}`);
  parts.push(`rate:${p.rate}`);
  parts.push(`unit:'${p.unit}'`);
  if (p.info) parts.push(`info:'${p.info.replace(/'/g, "\\'")}'`);
  return `  { ${parts.join(', ')} }`;
}

function groupProducts(products) {
  // Group by category then subcategory
  const groups = {};
  for (const p of products) {
    const key = `${p.category}|${p.subcategory}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }
  return groups;
}

function getSectionHeader(category, subcategory, products) {
  const headers = {
    'pipes|swr_type_a': 'PIPES TYPE A \u2014 as per IS 13592 (HSN Code: 3917)',
    'pipes|swr_type_b': 'PIPES TYPE B \u2014 as per IS 13592 (HSN Code: 3917)',
    'pipes|swr_2_5kg': '2.5 KG PIPES \u2014 as per IS 13592 (HSN Code: 3917)',
    'pipes|sn2': 'UGD SN 2 PIPES \u2014 as per IS 15328 (HSN Code: 3917)',
    'pipes|sn4': 'UGD SN 4 PIPES \u2014 as per IS 15328 (HSN Code: 3917)',
    'pipes|sn8': 'UGD SN 8 PIPES \u2014 as per IS 15328 (HSN Code: 3917)',
    'fittings|bend': 'BENDS \u2014 as per IS 13592',
    'fittings|tee': 'TEES \u2014 as per IS 13592',
    'fittings|coupler': 'COUPLERS \u2014 as per IS 13592',
    'fittings|wye': 'Y-BRANCHES \u2014 as per IS 13592',
    'fittings|reducer': 'REDUCERS \u2014 as per IS 13592',
    'fittings|cleansing_pipe': 'CLEANSING PIPES \u2014 as per IS 13592',
    'fittings|oring': 'CLICK RINGS (HSN Code: 4016)',
    'fittings|lubricant': 'RUBBER LUBRICANT (HSN Code: 3403)',
    'fittings|lw_fittings': 'LW FITTINGS \u2014 as per IS 13592',
    'fittings|trap': 'TRAPS \u2014 as per IS 13592',
    'fittings|accessory': 'ACCESSORIES \u2014 as per IS 13592',
    'fittings|valve': 'VALVES \u2014 as per IS 13592',
    'fittings|lw_selfit': 'SELFIT LW FITTINGS \u2014 as per IS 13592',
  };
  return headers[`${category}|${subcategory}`] || `${subcategory.toUpperCase()} (${category})`;
}

function generateFile(brandHeader, products) {
  const lines = [];
  lines.push(brandHeader);
  lines.push('');
  lines.push('var PRODUCTS = [');

  const groups = groupProducts(products);
  let first = true;
  for (const key of Object.keys(groups)) {
    const [cat, subcat] = key.split('|');
    const items = groups[key];
    if (!first) lines.push('');
    first = false;

    lines.push('');
    lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
    lines.push(`  // ${getSectionHeader(cat, subcat, items)}`);
    lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');

    for (const p of items) {
      lines.push(formatProduct(p) + ',');
    }
  }

  lines.push('');
  lines.push('];');
  lines.push('');
  lines.push("document.dispatchEvent(new Event('brand-data-ready'));");
  lines.push('');

  return lines.join('\n');
}

// ====================================================================
// GENERATE ALL FILES
// ====================================================================

// ClickFit SWR
const clickfitProducts = generateClickfitSWR();
const clickfitContent = generateFile(
  `// ClickFit uPVC SWR \u2014 Product Catalog
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// HSN Code: 3917 (Pipes & Fittings), 4016 (Click Ring), 3403 (Rubber Lubricant)
// Rates are per piece (pcs)`,
  clickfitProducts
);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'brands', 'clickfit-swr.js'), clickfitContent, 'utf8');
console.log(`ClickFit SWR: ${clickfitProducts.length} products`);

// SelFit
const selfitProducts = generateSelfit();
const selfitContent = generateFile(
  `// SelFit uPVC SWR System \u2014 Product Catalog
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// HSN Code: 3917 (Pipes & Fittings)
// Rates are per piece (pcs)`,
  selfitProducts
);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'brands', 'selfit.js'), selfitContent, 'utf8');
console.log(`SelFit: ${selfitProducts.length} products`);

// uPVC SWR - only update R/R pipes, keep existing LW fittings
const upvcProducts = generateUPVCSWR();
// Read existing file and keep LW fittings
const existingUpvc = fs.readFileSync(path.join(__dirname, '..', 'js', 'brands', 'upvc-swr.js'), 'utf8');
// We need to rebuild this file with RSP pipes + existing SW/SFLW fittings
const upvcContent = generateUpvcFile(upvcProducts, existingUpvc);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'brands', 'upvc-swr.js'), upvcContent, 'utf8');
console.log(`uPVC SWR: ${upvcProducts.length} new pipe products + existing LW fittings preserved`);

// UGD
const ugdProducts = generateUGD();
const ugdContent = generateFile(
  `// UGD Drainage Pipes \u2014 Product Catalog
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// HSN Code: 3917 (Pipes)
// Rates are per piece (pcs)`,
  ugdProducts
);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'brands', 'ugd.js'), ugdContent, 'utf8');
console.log(`UGD: ${ugdProducts.length} products`);

console.log('\nAll SWR brand files generated successfully!');

// ====================================================================
// uPVC SWR file - merge RSP pipes with existing LW fittings
// ====================================================================
function generateUpvcFile(rspProducts, existingContent) {
  // Extract existing SW* and SFLW* fittings from the existing file
  const lines = [];
  lines.push(`// uPVC SWR System \u2014 Product Catalog`);
  lines.push(`// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls`);
  lines.push(`// HSN Code: 3917 (Pipes & Fittings)`);
  lines.push(`// Rates are per piece (pcs)`);
  lines.push('');
  lines.push('var PRODUCTS = [');

  // R/R pipes from Excel
  lines.push('');
  lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('  // uPVC SWR R/R 2.5 KG PIPES \u2014 as per IS 13592 (HSN Code: 3917)');
  lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  for (const p of rspProducts) {
    lines.push(formatProduct(p) + ',');
  }

  // Extract and keep existing LW fittings from existing file (SW* and SFLW* products)
  // Parse existing products from the file
  const existingProducts = parseExistingProducts(existingContent);
  const swFittings = existingProducts.filter(p => p.code.startsWith('SW'));
  const sflwFittings = existingProducts.filter(p => p.code.startsWith('SFLW'));

  if (swFittings.length > 0) {
    lines.push('');
    lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
    lines.push('  // COMMON uPVC SWR LW FITTINGS \u2014 as per IS 13592 (HSN Code: 3917)');
    lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
    for (const p of swFittings) {
      lines.push(formatProduct(p) + ',');
    }
  }

  if (sflwFittings.length > 0) {
    lines.push('');
    lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
    lines.push('  // SELFIT LW FITTINGS \u2014 as per IS 13592 (HSN Code: 3917)');
    lines.push('  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
    for (const p of sflwFittings) {
      lines.push(formatProduct(p) + ',');
    }
  }

  lines.push('');
  lines.push('];');
  lines.push('');
  lines.push("document.dispatchEvent(new Event('brand-data-ready'));");
  lines.push('');

  return lines.join('\n');
}

function parseExistingProducts(content) {
  const products = [];
  // Match product objects in the file
  const regex = /\{\s*code:'([^']+)',\s*name:'([^']*)',\s*category:'([^']*)',\s*subcategory:'([^']*)',\s*size:'([^']*)',\s*size_mm:(\d+),\s*standard:'([^']*)',\s*(pipe_length:'([^']*)',\s*)?(socket:'([^']*)',\s*)?(std_pkg:(\d+),\s*)?rate:([\d.]+),\s*unit:'([^']*)'(,\s*info:'([^']*)')?\s*\}/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const p = {
      code: m[1],
      name: m[2],
      category: m[3],
      subcategory: m[4],
      size: m[5],
      size_mm: parseInt(m[6]),
      standard: m[7],
      rate: parseFloat(m[14]),
      unit: m[15],
    };
    if (m[9]) p.pipe_length = m[9];
    if (m[11]) p.socket = m[11];
    if (m[13]) p.std_pkg = parseInt(m[13]);
    if (m[17]) p.info = m[17];
    products.push(p);
  }
  return products;
}
