// SelFit uPVC SWR System — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// HSN Code: 3917 (Pipes & Fittings), 4016 (Lip Ring)
// Rates are per piece (pcs)
// Type B pipe rates and fitting rates marked VERIFY — cross-check against price list

var PRODUCTS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // PIPES TYPE A — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 3 Meter — Single Socket (S/S) ──
  { code:'SFPAS1050',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'50mm(2")',   size_mm:50,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:355.00,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'SFPAS1075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:461.00,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'SFPAS1090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:614.00,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'SFPAS10110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:817.00,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'SFPAS10160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:1864.50,  unit:'pcs', info:'Type A • 3m • Single Socket' },

  // ── 6 Meter — Single Socket (S/S) ──
  { code:'SFPAS2075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:900.00,   unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'SFPAS2090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1200.00,  unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'SFPAS20110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1597.00,  unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'SFPAS20160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:3673.00,  unit:'pcs', info:'Type A • 6m • Single Socket' },

  // ── 3 Feet — Single Socket (S/S) ──
  { code:'SFPAS375',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:291.50,   unit:'pcs', info:'Type A • 3ft • Single Socket' },
  { code:'SFPAS390',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:384.50,   unit:'pcs', info:'Type A • 3ft • Single Socket' },
  { code:'SFPAS3110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:508.00,   unit:'pcs', info:'Type A • 3ft • Single Socket' },
  { code:'SFPAS3160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:1095.00,  unit:'pcs', info:'Type A • 3ft • Single Socket' },

  // ── 3 Meter — Double Socket (D/S) ──
  { code:'SFPAD1075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:475.00,   unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'SFPAD1090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:607.00,   unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'SFPAD10110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:851.50,   unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'SFPAD10160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:1920.00,  unit:'pcs', info:'Type A • 3m • Double Socket' },

  // ── 6 Meter — Double Socket (D/S) ──
  { code:'SFPAD2075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:928.00,   unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'SFPAD2090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:1338.50,  unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'SFPAD20110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:1624.00,  unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'SFPAD20160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:3736.00,  unit:'pcs', info:'Type A • 6m • Double Socket' },

  // ── 4 Feet — Double Socket (D/S) ──
  { code:'SFPAD475',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:316.00,   unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'SFPAD490',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:402.00,   unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'SFPAD4110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:541.00,   unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'SFPAD4160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:1229.00,  unit:'pcs', info:'Type A • 4ft • Double Socket' },

  // ── 3 Feet — Double Socket (D/S) ──
  { code:'SFPAD375',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:176.00,   unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'SFPAD390',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:218.00,   unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'SFPAD3110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:305.00,   unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'SFPAD3160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:744.50,   unit:'pcs', info:'Type A • 3ft • Double Socket' },

  // ── 2 Feet — Double Socket (D/S) ──
  { code:'SFPAD275',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:127.00,   unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'SFPAD290',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:165.50,   unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'SFPAD2110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:217.00,   unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'SFPAD2160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:525.50,   unit:'pcs', info:'Type A • 2ft • Double Socket' },

  // ═══════════════════════════════════════════════════════════════════════════
  // PIPES TYPE B — as per IS 13592 (HSN Code: 3917)
  // NOTE: All Type B rates are ESTIMATED — VERIFY against price list
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 3 Meter — Single Socket (S/S) ──
  { code:'SFPBS1075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:795.50,   unit:'pcs', info:'Type B • 3m • Single Socket' },  // VERIFY
  { code:'SFPBS1090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:977.00,   unit:'pcs', info:'Type B • 3m • Single Socket' },  // VERIFY
  { code:'SFPBS10110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:1225.50,  unit:'pcs', info:'Type B • 3m • Single Socket' },  // VERIFY
  { code:'SFPBS10160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:2662.00,  unit:'pcs', info:'Type B • 3m • Single Socket' },  // VERIFY

  // ── 6 Meter — Single Socket (S/S) ──
  { code:'SFPBS2075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1564.50,  unit:'pcs', info:'Type B • 6m • Single Socket' },  // VERIFY
  { code:'SFPBS2090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1906.00,  unit:'pcs', info:'Type B • 6m • Single Socket' },  // VERIFY
  { code:'SFPBS20110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:2400.50,  unit:'pcs', info:'Type B • 6m • Single Socket' },  // VERIFY
  { code:'SFPBS20160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:5232.50,  unit:'pcs', info:'Type B • 6m • Single Socket' },  // VERIFY

  // ── 6 Feet — Single Socket (S/S) ──
  { code:'SFPBS675',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:492.50,   unit:'pcs', info:'Type B • 6ft • Single Socket' },  // VERIFY
  { code:'SFPBS690',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:612.00,   unit:'pcs', info:'Type B • 6ft • Single Socket' },  // VERIFY
  { code:'SFPBS6110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:772.00,   unit:'pcs', info:'Type B • 6ft • Single Socket' },  // VERIFY
  { code:'SFPBS6160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:1704.00,  unit:'pcs', info:'Type B • 6ft • Single Socket' },  // VERIFY

  // ── 3 Meter — Double Socket (D/S) ──
  { code:'SFPBD1075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:821.50,   unit:'pcs', info:'Type B • 3m • Double Socket' },  // VERIFY
  { code:'SFPBD1090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:968.00,   unit:'pcs', info:'Type B • 3m • Double Socket' },  // VERIFY
  { code:'SFPBD10110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:1276.50,  unit:'pcs', info:'Type B • 3m • Double Socket' },  // VERIFY
  { code:'SFPBD10160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:2742.50,  unit:'pcs', info:'Type B • 3m • Double Socket' },  // VERIFY

  // ── 6 Meter — Double Socket (D/S) ──
  { code:'SFPBD2075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:1586.50,  unit:'pcs', info:'Type B • 6m • Double Socket' },  // VERIFY
  { code:'SFPBD2090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:2110.00,  unit:'pcs', info:'Type B • 6m • Double Socket' },  // VERIFY
  { code:'SFPBD20110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:2434.00,  unit:'pcs', info:'Type B • 6m • Double Socket' },  // VERIFY
  { code:'SFPBD20160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:5311.00,  unit:'pcs', info:'Type B • 6m • Double Socket' },  // VERIFY

  // ── 4 Feet — Double Socket (D/S) ──
  { code:'SFPBD475',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:549.00,   unit:'pcs', info:'Type B • 4ft • Double Socket' },  // VERIFY
  { code:'SFPBD490',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:634.00,   unit:'pcs', info:'Type B • 4ft • Double Socket' },  // VERIFY
  { code:'SFPBD4110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:845.00,   unit:'pcs', info:'Type B • 4ft • Double Socket' },  // VERIFY
  { code:'SFPBD4160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:1866.00,  unit:'pcs', info:'Type B • 4ft • Double Socket' },  // VERIFY

  // ── 3 Feet — Double Socket (D/S) ──
  { code:'SFPBD375',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:306.00,   unit:'pcs', info:'Type B • 3ft • Double Socket' },  // VERIFY
  { code:'SFPBD390',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:347.50,   unit:'pcs', info:'Type B • 3ft • Double Socket' },  // VERIFY
  { code:'SFPBD3110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:450.00,   unit:'pcs', info:'Type B • 3ft • Double Socket' },  // VERIFY
  { code:'SFPBD3160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:1057.00,  unit:'pcs', info:'Type B • 3ft • Double Socket' },  // VERIFY

  // ── 2 Feet — Double Socket (D/S) ──
  { code:'SFPBD275',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:217.50,   unit:'pcs', info:'Type B • 2ft • Double Socket' },  // VERIFY
  { code:'SFPBD290',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:256.00,   unit:'pcs', info:'Type B • 2ft • Double Socket' },  // VERIFY
  { code:'SFPBD2110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:323.00,   unit:'pcs', info:'Type B • 2ft • Double Socket' },  // VERIFY
  { code:'SFPBD2160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:750.00,   unit:'pcs', info:'Type B • 2ft • Double Socket' },  // VERIFY

  // ═══════════════════════════════════════════════════════════════════════════
  // SELFIT BRAND FITTINGS — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Bend 87.5° ──
  { code:'SFB75',    name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:15, rate:64.00,   unit:'pcs' },
  { code:'SFB90',    name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:10, rate:86.00,   unit:'pcs' },  // VERIFY
  { code:'SFB110',   name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:119.00,  unit:'pcs' },
  { code:'SFB160',   name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:4,  rate:327.00,  unit:'pcs' },  // VERIFY

  // ── Bend 87.5° with Door ──
  { code:'SFDB75',   name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:79.00,   unit:'pcs' },  // VERIFY
  { code:'SFDB90',   name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:8,  rate:106.00,  unit:'pcs' },  // VERIFY
  { code:'SFDB110',  name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:147.50,  unit:'pcs' },  // VERIFY
  { code:'SFDB160',  name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:4,  rate:344.50,  unit:'pcs' },  // VERIFY

  // ── Single Tee ──
  { code:'SFST75',   name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:90.50,   unit:'pcs' },  // VERIFY
  { code:'SFST90',   name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:8,  rate:131.50,  unit:'pcs' },  // VERIFY
  { code:'SFST110',  name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:162.50,  unit:'pcs' },  // VERIFY
  { code:'SFST160',  name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:4,  rate:453.00,  unit:'pcs' },  // VERIFY

  // ── Single Tee with Door ──
  { code:'SFSTD75',  name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:10, rate:104.00,  unit:'pcs' },  // VERIFY
  { code:'SFSTD90',  name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:8,  rate:170.00,  unit:'pcs' },  // VERIFY
  { code:'SFSTD110', name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:212.50,  unit:'pcs' },  // VERIFY
  { code:'SFSTD160', name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:4,  rate:473.00,  unit:'pcs' },  // VERIFY

  // ── Coupler ──
  { code:'SFC75',    name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:20, rate:67.50,  unit:'pcs' },  // VERIFY
  { code:'SFC90',    name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:15, rate:73.50,  unit:'pcs' },  // VERIFY
  { code:'SFC110',   name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:8,  rate:88.00,  unit:'pcs' },  // VERIFY
  { code:'SFC160',   name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:4,  rate:258.50, unit:'pcs' },  // VERIFY

  // ── Single-Y ──
  { code:'SFY75',    name:'Single-Y',                  category:'fittings', subcategory:'wye',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:15, rate:113.50, unit:'pcs' },  // VERIFY
  { code:'SFY90',    name:'Single-Y',                  category:'fittings', subcategory:'wye',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:10, rate:170.00, unit:'pcs' },  // VERIFY
  { code:'SFY110',   name:'Single-Y',                  category:'fittings', subcategory:'wye',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:8,  rate:212.00, unit:'pcs' },  // VERIFY

  // ── Single-Y with Door ──
  { code:'SFYD75',   name:'Single-Y with Door',        category:'fittings', subcategory:'wye',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:137.00, unit:'pcs' },  // VERIFY
  { code:'SFYD90',   name:'Single-Y with Door',        category:'fittings', subcategory:'wye',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:8,  rate:204.00, unit:'pcs' },  // VERIFY
  { code:'SFYD110',  name:'Single-Y with Door',        category:'fittings', subcategory:'wye',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:250.50, unit:'pcs' },  // VERIFY

  // ── Reducer ──
  { code:'SFR1075',  name:'Reducer',                   category:'fittings', subcategory:'reducer', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:30, rate:77.50,  unit:'pcs', info:'110mm to 75mm' },  // VERIFY
  { code:'SFR1090',  name:'Reducer',                   category:'fittings', subcategory:'reducer', size:'110x90mm',  size_mm:110, standard:'IS 13592', std_pkg:28, rate:89.50,  unit:'pcs', info:'110mm to 90mm' },  // VERIFY
  { code:'SFR16110', name:'Reducer',                   category:'fittings', subcategory:'reducer', size:'160x110mm', size_mm:160, standard:'IS 13592', std_pkg:15, rate:174.00, unit:'pcs', info:'160mm to 110mm' },  // VERIFY

  // ── Reducer-Y ──
  { code:'SFRY11075', name:'Reducer-Y',                category:'fittings', subcategory:'wye', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:15, rate:182.00, unit:'pcs', info:'110mm x 75mm' },  // VERIFY
  { code:'SFRY11090', name:'Reducer-Y',                category:'fittings', subcategory:'wye', size:'110x90mm',  size_mm:110, standard:'IS 13592', std_pkg:12, rate:208.00, unit:'pcs', info:'110mm x 90mm' },  // VERIFY

  // ── Reducer-Y with Door ──
  { code:'SFRYD11075', name:'Reducer-Y with Door',     category:'fittings', subcategory:'wye', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:12, rate:211.00, unit:'pcs', info:'110mm x 75mm' },  // VERIFY
  { code:'SFRYD11090', name:'Reducer-Y with Door',     category:'fittings', subcategory:'wye', size:'110x90mm',  size_mm:110, standard:'IS 13592', std_pkg:10, rate:235.00, unit:'pcs', info:'110mm x 90mm' },  // VERIFY

  // ── Double-Y ──
  { code:'SFDY75',   name:'Double-Y',                  category:'fittings', subcategory:'wye', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:16, rate:160.50, unit:'pcs' },  // VERIFY
  { code:'SFDY110',  name:'Double-Y',                  category:'fittings', subcategory:'wye', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:286.50, unit:'pcs' },  // VERIFY

  // ── Double-Y with Door ──
  { code:'SFDYD75',  name:'Double-Y with Door',        category:'fittings', subcategory:'wye', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:192.00, unit:'pcs' },  // VERIFY
  { code:'SFDYD110', name:'Double-Y with Door',        category:'fittings', subcategory:'wye', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:5,  rate:335.00, unit:'pcs' },  // VERIFY

  // ── Cross Tee ──
  { code:'SFCT75',   name:'Cross Tee',                 category:'fittings', subcategory:'tee', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:12, rate:131.50, unit:'pcs' },  // VERIFY
  { code:'SFCT90',   name:'Cross Tee',                 category:'fittings', subcategory:'tee', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:10, rate:174.50, unit:'pcs' },  // VERIFY
  { code:'SFCT110',  name:'Cross Tee',                 category:'fittings', subcategory:'tee', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:6,  rate:231.00, unit:'pcs' },  // VERIFY

  // ── Swept Tee ──
  { code:'SFSPT110',  name:'Swept Tee',                category:'fittings', subcategory:'tee', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:10, rate:210.00, unit:'pcs' },  // VERIFY

  // ── Swept Tee with Door ──
  { code:'SFSPTD110', name:'Swept Tee with Door',      category:'fittings', subcategory:'tee', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:8,  rate:237.00, unit:'pcs' },  // VERIFY

  // ── Reducing Tee ──
  { code:'SFRT11075',  name:'Reducing Tee',            category:'fittings', subcategory:'tee', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:12, rate:166.00, unit:'pcs', info:'110mm x 75mm' },  // VERIFY
  { code:'SFRT11090',  name:'Reducing Tee',            category:'fittings', subcategory:'tee', size:'110x90mm',  size_mm:110, standard:'IS 13592', std_pkg:10, rate:185.00, unit:'pcs', info:'110mm x 90mm' },  // VERIFY

  // ── Reducing Tee with Door ──
  { code:'SFRTD11075', name:'Reducing Tee with Door',  category:'fittings', subcategory:'tee', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:10, rate:199.50, unit:'pcs', info:'110mm x 75mm' },  // VERIFY
  { code:'SFRTD11090', name:'Reducing Tee with Door',  category:'fittings', subcategory:'tee', size:'110x90mm',  size_mm:110, standard:'IS 13592', std_pkg:8,  rate:221.00, unit:'pcs', info:'110mm x 90mm' },  // VERIFY

  // ── Cleansing Pipe ──
  { code:'SFCP75',   name:'Cleansing Pipe',            category:'fittings', subcategory:'cleansing_pipe', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:30, rate:105.50, unit:'pcs' },  // VERIFY
  { code:'SFCP110',  name:'Cleansing Pipe',            category:'fittings', subcategory:'cleansing_pipe', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:16, rate:195.00, unit:'pcs' },  // VERIFY

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMON uPVC SWR FITTINGS (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Nahani Trap ISI (One Piece) ──
  { code:'NTOP110075', name:'Nahani Trap ISI (One Piece)', category:'fittings', subcategory:'trap', size:'110x75mm(4"x2½")', size_mm:110, standard:'IS 13592', std_pkg:40, rate:132.50, unit:'pcs' },
  { code:'NTOP110090', name:'Nahani Trap ISI (One Piece)', category:'fittings', subcategory:'trap', size:'110x90mm(4"x3")',  size_mm:110, standard:'IS 13592', std_pkg:40, rate:142.00, unit:'pcs' },
  { code:'NTOP110110', name:'Nahani Trap ISI (One Piece)', category:'fittings', subcategory:'trap', size:'110x110mm(4"x4")', size_mm:110, standard:'IS 13592', std_pkg:40, rate:156.00, unit:'pcs' },

  // ── Nahani Trap LW ──
  { code:'NTL11063',  name:'Nahani Trap LW', category:'fittings', subcategory:'trap', size:'110x63mm(4"x2½")', size_mm:110, standard:'IS 13592', std_pkg:40, rate:108.00, unit:'pcs' },
  { code:'NTL11075',  name:'Nahani Trap LW', category:'fittings', subcategory:'trap', size:'110x75mm(4"x2½")', size_mm:110, standard:'IS 13592', std_pkg:40, rate:114.50, unit:'pcs' },
  { code:'NTL11090',  name:'Nahani Trap LW', category:'fittings', subcategory:'trap', size:'110x90mm(4"x3")',  size_mm:110, standard:'IS 13592', std_pkg:40, rate:127.00, unit:'pcs' },
  { code:'NTL110110', name:'Nahani Trap LW', category:'fittings', subcategory:'trap', size:'110x110mm(4"x4")', size_mm:110, standard:'IS 13592', std_pkg:40, rate:138.50, unit:'pcs' },

  // ── Multi Floor Trap ──
  { code:'MFT110',   name:'Multi Floor Trap',                    category:'fittings', subcategory:'trap', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:30, rate:162.00, unit:'pcs', info:'Hi type' },
  { code:'MFT7110',  name:'Multi Floor Trap 7" Hi',              category:'fittings', subcategory:'trap', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:18, rate:303.00, unit:'pcs', info:'7" Hi, Cap Type' },
  { code:'MFTC110',  name:'Multi Floor Trap Cap Type',           category:'fittings', subcategory:'trap', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:30, rate:171.00, unit:'pcs' },

  // ── Multi Floor Trap with Square Jali ──
  { code:'MFTSJ110', name:'Multi Floor Trap with Square Jali',   category:'fittings', subcategory:'trap', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:26, rate:238.50, unit:'pcs' },

  // ── Gully Trap with Square Jali ──
  { code:'GT110',    name:'Gully Trap with Square Jali',         category:'fittings', subcategory:'trap', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8,  rate:534.00, unit:'pcs' },

  // ── Height Riser ──
  { code:'HR1105040', name:'Height Riser',                       category:'fittings', subcategory:'accessory', size:'110x50x40mm', size_mm:110, standard:'IS 13592', std_pkg:26, rate:202.00, unit:'pcs' },

  // ── Multi Extension ──
  { code:'ME110',    name:'Multi Extension',                     category:'fittings', subcategory:'accessory', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:26, rate:167.00, unit:'pcs' },

  // ── WC Connector Bend ──
  { code:'WCB110',   name:'WC Connector Bend',                   category:'fittings', subcategory:'bend', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:26, rate:236.00, unit:'pcs' },

  // ── Reducer Bush ──
  { code:'RB11075',  name:'Reducer Bush',                        category:'fittings', subcategory:'reducer', size:'110x75mm(4"x2½")', size_mm:110, standard:'IS 13592', std_pkg:70, rate:55.00, unit:'pcs' },
  { code:'RB11090',  name:'Reducer Bush',                        category:'fittings', subcategory:'reducer', size:'110x90mm(4"x3")',  size_mm:110, standard:'IS 13592', std_pkg:60, rate:52.00, unit:'pcs' },

  // ── Lip Ring / P-Trap (HSN Code: 4016) ──
  { code:'LR125110', name:'Lip Ring (P-Trap)',                   category:'fittings', subcategory:'trap', size:'125x110mm(4"x4")', size_mm:125, standard:'HSN 4016', std_pkg:40, rate:115.00, unit:'pcs' },

  // ── P-Trap ──
  { code:'PT110110R',  name:'P-Trap (Ring)',                     category:'fittings', subcategory:'trap', size:'110x110mm(4"x4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:328.00, unit:'pcs', info:'Ring type' },
  { code:'PT125110R',  name:'P-Trap (Ring)',                     category:'fittings', subcategory:'trap', size:'125x110mm(4"x4")', size_mm:125, standard:'IS 13592', std_pkg:15, rate:328.00, unit:'pcs', info:'Ring type' },
  { code:'PT110110L',  name:'P-Trap (LW)',                       category:'fittings', subcategory:'trap', size:'110x110mm(4"x4")', size_mm:110, standard:'IS 13592', std_pkg:15, rate:288.00, unit:'pcs', info:'LW type' },
  { code:'PT125110L',  name:'P-Trap (LW)',                       category:'fittings', subcategory:'trap', size:'125x110mm(4"x4")', size_mm:125, standard:'IS 13592', std_pkg:15, rate:296.00, unit:'pcs', info:'LW type' },
  { code:'PT5125110',  name:'P-Trap 5"',                         category:'fittings', subcategory:'trap', size:'125x110mm(5"x4")', size_mm:125, standard:'IS 13592', std_pkg:15, rate:315.00, unit:'pcs', info:'5" type' },
  { code:'PT5125110L', name:'P-Trap 5" (LW)',                    category:'fittings', subcategory:'trap', size:'125x110mm(5"x4")', size_mm:125, standard:'IS 13592', std_pkg:15, rate:332.50, unit:'pcs', info:'5" LW type' },

  // ── Q-Trap ──
  { code:'QT110110',  name:'Q-Trap',                             category:'fittings', subcategory:'trap', size:'110x110mm(4"x4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:391.50, unit:'pcs' },

  // ── S-Trap ──
  { code:'ST110110',  name:'S-Trap',                             category:'fittings', subcategory:'trap', size:'110x110mm(4"x4")', size_mm:110, standard:'IS 13592', std_pkg:9,  rate:446.00, unit:'pcs' },

  // ── Vent Cowl ──
  { code:'VC50',   name:'Vent Cowl', category:'fittings', subcategory:'accessory', size:'50mm(1½")',  size_mm:50,  standard:'IS 13592', std_pkg:400, rate:15.00, unit:'pcs' },
  { code:'VC63',   name:'Vent Cowl', category:'fittings', subcategory:'accessory', size:'63mm(2")',   size_mm:63,  standard:'IS 13592', std_pkg:275, rate:21.50, unit:'pcs' },
  { code:'VC75',   name:'Vent Cowl', category:'fittings', subcategory:'accessory', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:280, rate:25.50, unit:'pcs' },
  { code:'VC90',   name:'Vent Cowl', category:'fittings', subcategory:'accessory', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:190, rate:33.50, unit:'pcs' },
  { code:'VC110',  name:'Vent Cowl', category:'fittings', subcategory:'accessory', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:108, rate:45.00, unit:'pcs' },
  { code:'VC160',  name:'Vent Cowl', category:'fittings', subcategory:'accessory', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:42,  rate:78.50, unit:'pcs' },

  // ── Door Cap ──
  { code:'DC63',   name:'Door Cap',  category:'fittings', subcategory:'accessory', size:'63mm(2")',   size_mm:63,  standard:'IS 13592', std_pkg:0,  rate:18.50, unit:'pcs' },
  { code:'DC75',   name:'Door Cap',  category:'fittings', subcategory:'accessory', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:0,  rate:27.00, unit:'pcs' },
  { code:'DC90',   name:'Door Cap',  category:'fittings', subcategory:'accessory', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:0,  rate:36.50, unit:'pcs' },
  { code:'DC110',  name:'Door Cap',  category:'fittings', subcategory:'accessory', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:0,  rate:43.00, unit:'pcs' },

  // ── Socket Plug ──
  { code:'SP75',   name:'Socket Plug', category:'fittings', subcategory:'accessory', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:120, rate:38.50, unit:'pcs' },
  { code:'SP110',  name:'Socket Plug', category:'fittings', subcategory:'accessory', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:60,  rate:67.00, unit:'pcs' },

  // ── Jali ──
  { code:'J110',   name:'Jali',         category:'fittings', subcategory:'accessory', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:160, rate:21.50, unit:'pcs' },

  // ── Square Jali ──
  { code:'SJ160',  name:'Square Jali',  category:'fittings', subcategory:'accessory', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:0,   rate:72.00, unit:'pcs' },

  // ── Pipe Clip ──
  { code:'PC75',   name:'Pipe Clip',    category:'fittings', subcategory:'accessory', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:360, rate:15.50, unit:'pcs' },
  { code:'PC110',  name:'Pipe Clip',    category:'fittings', subcategory:'accessory', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:200, rate:22.00, unit:'pcs' },

  // ── Backflow Valve ──
  { code:'BFV75',  name:'Backflow Valve', category:'fittings', subcategory:'valve', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:0,  rate:56.00,  unit:'pcs' },
  { code:'BFV90',  name:'Backflow Valve', category:'fittings', subcategory:'valve', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:0,  rate:79.00,  unit:'pcs' },
  { code:'BFV110', name:'Backflow Valve', category:'fittings', subcategory:'valve', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:27, rate:115.00, unit:'pcs' },
  { code:'BFV160', name:'Backflow Valve', category:'fittings', subcategory:'valve', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:18, rate:295.00, unit:'pcs' },

];

document.dispatchEvent(new Event('brand-data-ready'));
