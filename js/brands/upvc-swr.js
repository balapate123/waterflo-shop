// uPVC SWR System — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// HSN Code: 3917 (Pipes & Fittings)
// Rates are per piece (pcs)
// NOTE: All rates marked VERIFY — cross-check against price list

var PRODUCTS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // uPVC SWR 2.5 KG PIPES — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 3 Meter — Single Socket (S/S) ──
  { code:'SWP1075',  name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:341.00,  unit:'pcs', info:'2.5 Kg • 3m • Single Socket' },  // VERIFY
  { code:'SWP10110', name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:590.50,  unit:'pcs', info:'2.5 Kg • 3m • Single Socket' },  // VERIFY

  // ── 3 Feet — Single Socket (S/S) ──
  { code:'SWP375',   name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:215.00,  unit:'pcs', info:'2.5 Kg • 3ft • Single Socket' },  // VERIFY
  { code:'SWP3110',  name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:373.00,  unit:'pcs', info:'2.5 Kg • 3ft • Single Socket' },  // VERIFY

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMON uPVC SWR LW FITTINGS — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Bend 87.5° LW ──
  { code:'SWB75',    name:'Bend 87.5\u00B0 LW',           category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:20, rate:46.50,  unit:'pcs' },  // VERIFY
  { code:'SWB110',   name:'Bend 87.5\u00B0 LW',           category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:15, rate:83.00,  unit:'pcs' },  // VERIFY

  // ── Bend 87.5° LW with Door ──
  { code:'SWBD75',   name:'Bend 87.5\u00B0 LW with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:18, rate:59.00,  unit:'pcs' },  // VERIFY
  { code:'SWBD110',  name:'Bend 87.5\u00B0 LW with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:103.00, unit:'pcs' },  // VERIFY

  // ── Bend 45° LW ──
  { code:'SWB4575',  name:'Bend 45\u00B0 LW',             category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:22, rate:40.00,  unit:'pcs' },  // VERIFY
  { code:'SWB45110', name:'Bend 45\u00B0 LW',             category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:16, rate:72.00,  unit:'pcs' },  // VERIFY

  // ── Single Tee LW ──
  { code:'SWST75',   name:'Single Tee LW',                 category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:15, rate:65.00,  unit:'pcs' },  // VERIFY
  { code:'SWST110',  name:'Single Tee LW',                 category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:108.00, unit:'pcs' },  // VERIFY

  // ── Single Tee LW with Door ──
  { code:'SWSTD75',  name:'Single Tee LW with Door',       category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:79.00,  unit:'pcs' },  // VERIFY
  { code:'SWSTD110', name:'Single Tee LW with Door',       category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8,  rate:130.00, unit:'pcs' },  // VERIFY

  // ── Coupler LW ──
  { code:'SWC75',    name:'Coupler LW',                    category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:30, rate:43.00,  unit:'pcs' },  // VERIFY
  { code:'SWC110',   name:'Coupler LW',                    category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:20, rate:61.00,  unit:'pcs' },  // VERIFY

  // ── Single-Y LW ──
  { code:'SWY75',    name:'Single-Y LW',                   category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:82.00,  unit:'pcs' },  // VERIFY
  { code:'SWY110',   name:'Single-Y LW',                   category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8,  rate:142.00, unit:'pcs' },  // VERIFY

  // ── Single-Y LW with Door ──
  { code:'SWYD75',   name:'Single-Y LW with Door',         category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:10, rate:100.00, unit:'pcs' },  // VERIFY
  { code:'SWYD110',  name:'Single-Y LW with Door',         category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:6,  rate:173.00, unit:'pcs' },  // VERIFY

  // ═══════════════════════════════════════════════════════════════════════════
  // SELFIT LW FITTINGS — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Bend 87.5° Selfit LW ──
  { code:'SFLWB75',    name:'Bend 87.5\u00B0 Selfit LW',           category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:20, rate:48.00,  unit:'pcs' },  // VERIFY
  { code:'SFLWB110',   name:'Bend 87.5\u00B0 Selfit LW',           category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:15, rate:88.00,  unit:'pcs' },  // VERIFY

  // ── Bend 87.5° Selfit LW with Door ──
  { code:'SFLWDB75',   name:'Bend 87.5\u00B0 Selfit LW with Door', category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:18, rate:62.00,  unit:'pcs' },  // VERIFY
  { code:'SFLWDB110',  name:'Bend 87.5\u00B0 Selfit LW with Door', category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:108.00, unit:'pcs' },  // VERIFY

  // ── Bend 45° Selfit LW ──
  { code:'SFLWB4575',  name:'Bend 45\u00B0 Selfit LW',             category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:22, rate:43.00,  unit:'pcs' },  // VERIFY
  { code:'SFLWB45110', name:'Bend 45\u00B0 Selfit LW',             category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:16, rate:77.00,  unit:'pcs' },  // VERIFY

  // ── Single Tee Selfit LW ──
  { code:'SFLWST75',   name:'Single Tee Selfit LW',                 category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:15, rate:68.00,  unit:'pcs' },  // VERIFY
  { code:'SFLWST110',  name:'Single Tee Selfit LW',                 category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:115.00, unit:'pcs' },  // VERIFY

  // ── Single Tee Selfit LW with Door ──
  { code:'SFLWSTD75',  name:'Single Tee Selfit LW with Door',       category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:83.00,  unit:'pcs' },  // VERIFY
  { code:'SFLWSTD110', name:'Single Tee Selfit LW with Door',       category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8,  rate:138.00, unit:'pcs' },  // VERIFY

];

document.dispatchEvent(new Event('brand-data-ready'));
