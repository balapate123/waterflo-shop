// ClickFit uPVC SWR — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// HSN Code: 3917 (Pipes & Fittings), 4016 (Click Ring), 3403 (Rubber Lubricant)
// Rates are per piece (pcs)
// NOTE: Type B pipe rates calculated from Type A using size-specific B/A ratios — VERIFY against price list
// NOTE: Some estimated values marked with VERIFY comments

var PRODUCTS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // PIPES TYPE A — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 3 Meter — Single Socket (S/S) ──
  { code:'CSPAS1075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:487.00,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS1090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:643.00,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS10110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:848.50,   unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS10160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:1941.00,  unit:'pcs', info:'Type A • 3m • Single Socket' },

  // ── 6 Meter — Single Socket (S/S) ──
  { code:'CSPAS2075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:952.00,   unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS2090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1254.50,  unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS20110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1662.50,  unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS20160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:3815.50,  unit:'pcs', info:'Type A • 6m • Single Socket' },

  // ── 3 Feet — Single Socket (S/S) ──
  { code:'CSPAS375',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:310.50,   unit:'pcs', info:'Type A • 3ft • Single Socket' },
  { code:'CSPAS390',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:401.50,   unit:'pcs', info:'Type A • 3ft • Single Socket' },
  { code:'CSPAS3110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:530.50,   unit:'pcs', info:'Type A • 3ft • Single Socket' },
  { code:'CSPAS3160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:1141.50,  unit:'pcs', info:'Type A • 3ft • Single Socket' },

  // ── 3 Meter — Double Socket (D/S) ──
  { code:'CSPAD1075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:500.00,   unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD1090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:637.00,   unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD10110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:884.00,   unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD10160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:2000.00,  unit:'pcs', info:'Type A • 3m • Double Socket' },

  // ── 6 Meter — Double Socket (D/S) ──
  { code:'CSPAD2075',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:965.00,   unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD2090',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:1389.00,  unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD20110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:1686.50,  unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD20160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:3873.00,  unit:'pcs', info:'Type A • 6m • Double Socket' },

  // ── 4 Feet — Double Socket (D/S) ──
  { code:'CSPAD475',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:334.00,   unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'CSPAD490',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:417.00,   unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'CSPAD4110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:585.00,   unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'CSPAD4160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:1360.00,  unit:'pcs', info:'Type A • 4ft • Double Socket' },  // VERIFY

  // ── 3 Feet — Double Socket (D/S) ──
  { code:'CSPAD375',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:186.00,   unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'CSPAD390',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:228.50,   unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'CSPAD3110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:311.50,   unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'CSPAD3160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:770.50,   unit:'pcs', info:'Type A • 3ft • Double Socket' },  // VERIFY

  // ── 2 Feet — Double Socket (D/S) ──
  { code:'CSPAD275',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:132.00,   unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'CSPAD290',   name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:168.50,   unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'CSPAD2110',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:223.50,   unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'CSPAD2160',  name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:546.50,   unit:'pcs', info:'Type A • 2ft • Double Socket' },  // VERIFY

  // ═══════════════════════════════════════════════════════════════════════════
  // PIPES TYPE B — as per IS 13592 (HSN Code: 3917)
  // Type B has thicker walls — VERIFY ALL TYPE B RATES AGAINST PRICE LIST
  // NOTE: Type B S/S short-cut is 6ft (not 3ft like Type A)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 3 Meter — Single Socket (S/S) ──
  { code:'CSPBS1075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:840.00,   unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS1090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:1025.00,  unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS10110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:1285.50,  unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS10160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'S/S', rate:2793.50,  unit:'pcs', info:'Type B • 3m • Single Socket' },

  // ── 6 Meter — Single Socket (S/S) ──
  { code:'CSPBS2075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:1642.00,  unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS2090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:2000.00,  unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS20110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:2519.00,  unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS20160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'S/S', rate:5490.50,  unit:'pcs', info:'Type B • 6m • Single Socket' },

  // ── 6 Feet — Single Socket (S/S) ──
  { code:'CSPBS675',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:517.00,   unit:'pcs', info:'Type B • 6ft • Single Socket' },
  { code:'CSPBS690',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:642.50,   unit:'pcs', info:'Type B • 6ft • Single Socket' },
  { code:'CSPBS6110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:810.00,   unit:'pcs', info:'Type B • 6ft • Single Socket' },
  { code:'CSPBS6160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:1788.00,  unit:'pcs', info:'Type B • 6ft • Single Socket' },

  // ── 3 Meter — Double Socket (D/S) ──
  { code:'CSPBD1075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:862.50,   unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD1090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:1015.50,  unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD10110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:1339.50,  unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD10160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3m',  socket:'D/S', rate:2878.00,  unit:'pcs', info:'Type B • 3m • Double Socket' },

  // ── 6 Meter — Double Socket (D/S) ──
  { code:'CSPBD2075',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:1665.00,  unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD2090',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:2214.00,  unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD20110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:2555.00,  unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD20160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'6m',  socket:'D/S', rate:5573.50,  unit:'pcs', info:'Type B • 6m • Double Socket' },

  // ── 4 Feet — Double Socket (D/S) ──
  { code:'CSPBD475',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:576.00,   unit:'pcs', info:'Type B • 4ft • Double Socket' },
  { code:'CSPBD490',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:665.00,   unit:'pcs', info:'Type B • 4ft • Double Socket' },
  { code:'CSPBD4110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:886.50,   unit:'pcs', info:'Type B • 4ft • Double Socket' },
  { code:'CSPBD4160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:1957.00,  unit:'pcs', info:'Type B • 4ft • Double Socket' },

  // ── 3 Feet — Double Socket (D/S) ──
  { code:'CSPBD375',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:321.00,   unit:'pcs', info:'Type B • 3ft • Double Socket' },
  { code:'CSPBD390',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:364.50,   unit:'pcs', info:'Type B • 3ft • Double Socket' },
  { code:'CSPBD3110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:472.00,   unit:'pcs', info:'Type B • 3ft • Double Socket' },
  { code:'CSPBD3160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:1109.00,  unit:'pcs', info:'Type B • 3ft • Double Socket' },

  // ── 2 Feet — Double Socket (D/S) ──
  { code:'CSPBD275',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:228.00,   unit:'pcs', info:'Type B • 2ft • Double Socket' },
  { code:'CSPBD290',   name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:268.50,   unit:'pcs', info:'Type B • 2ft • Double Socket' },
  { code:'CSPBD2110',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")',  size_mm:110, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:338.50,   unit:'pcs', info:'Type B • 2ft • Double Socket' },
  { code:'CSPBD2160',  name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")',  size_mm:160, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:786.50,   unit:'pcs', info:'Type B • 2ft • Double Socket' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FITTINGS — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Bend 87.5° ──
  { code:'CSFB75',    name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:50, rate:83.00,   unit:'pcs' },
  { code:'CSFB90',    name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:29, rate:128.50,  unit:'pcs' },
  { code:'CSFB110',   name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:13, rate:155.00,  unit:'pcs' },
  { code:'CSFB160',   name:'Bend 87.5\u00B0',           category:'fittings', subcategory:'bend', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:8,  rate:424.50,  unit:'pcs' },

  // ── Bend 87.5° with Door ──
  { code:'CSFDB75',   name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:39, rate:102.00,  unit:'pcs' },
  { code:'CSFDB90',   name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:26, rate:163.50,  unit:'pcs' },
  { code:'CSFDB110',  name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:19, rate:191.50,  unit:'pcs' },
  { code:'CSFDB160',  name:'Bend 87.5\u00B0 with Door', category:'fittings', subcategory:'bend', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:8,  rate:447.50,  unit:'pcs' },

  // ── Bend 45° ──
  { code:'CSFB4575',  name:'Bend 45\u00B0',             category:'fittings', subcategory:'bend', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:67, rate:70.50,   unit:'pcs' },
  { code:'CSFB4590',  name:'Bend 45\u00B0',             category:'fittings', subcategory:'bend', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:47, rate:112.50,  unit:'pcs' },
  { code:'CSFB45110', name:'Bend 45\u00B0',             category:'fittings', subcategory:'bend', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:24, rate:123.50,  unit:'pcs' },
  { code:'CSFB45160', name:'Bend 45\u00B0',             category:'fittings', subcategory:'bend', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:10, rate:365.50,  unit:'pcs' },

  // ── Single Tee ──
  { code:'CSFST75',   name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:34, rate:117.50,  unit:'pcs' },
  { code:'CSFST90',   name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:24, rate:170.50,  unit:'pcs' },
  { code:'CSFST110',  name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:14, rate:211.00,  unit:'pcs' },
  { code:'CSFST160',  name:'Single Tee',                category:'fittings', subcategory:'tee',  size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:8,  rate:588.00,  unit:'pcs' },

  // ── Single Tee with Door ──
  { code:'CSFSTD75',  name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:21, rate:135.00,  unit:'pcs' },
  { code:'CSFSTD90',  name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:21, rate:220.50,  unit:'pcs' },
  { code:'CSFSTD110', name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:10, rate:276.00,  unit:'pcs' },
  { code:'CSFSTD160', name:'Single Tee with Door',      category:'fittings', subcategory:'tee',  size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:8,  rate:614.00,  unit:'pcs' },

  // ── Coupler ──
  { code:'CSFC75',    name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:60, rate:87.50,  unit:'pcs' },
  { code:'CSFC90',    name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:48, rate:95.50,  unit:'pcs' },
  { code:'CSFC110',   name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:48, rate:114.50, unit:'pcs' },
  { code:'CSFC160',   name:'Coupler',                   category:'fittings', subcategory:'coupler', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:16, rate:335.50, unit:'pcs' },

  // ── Cleansing Pipe ──
  { code:'CSFCP75',   name:'Cleansing Pipe',            category:'fittings', subcategory:'cleansing_pipe', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:29, rate:116.00, unit:'pcs' },
  { code:'CSFCP110',  name:'Cleansing Pipe',            category:'fittings', subcategory:'cleansing_pipe', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:16, rate:225.00, unit:'pcs' },

  // ── Reducer ──
  { code:'CSFR1075',  name:'Reducer',                   category:'fittings', subcategory:'reducer', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:36, rate:101.00, unit:'pcs', info:'110mm to 75mm' },
  { code:'CSFR1090',  name:'Reducer',                   category:'fittings', subcategory:'reducer', size:'110x90mm',  size_mm:110, standard:'IS 13592', std_pkg:35, rate:116.00, unit:'pcs', info:'110mm to 90mm' },
  { code:'CSFR16110', name:'Reducer',                   category:'fittings', subcategory:'reducer', size:'160x110mm', size_mm:160, standard:'IS 13592', std_pkg:18, rate:225.50, unit:'pcs', info:'160mm to 110mm' },  // VERIFY rate

  // ── Single-Y ──
  { code:'CSFY75',    name:'Single-Y',                  category:'fittings', subcategory:'wye',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:18, rate:147.00, unit:'pcs' },
  { code:'CSFY90',    name:'Single-Y',                  category:'fittings', subcategory:'wye',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:15, rate:221.00, unit:'pcs' },
  { code:'CSFY110',   name:'Single-Y',                  category:'fittings', subcategory:'wye',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:12, rate:275.50, unit:'pcs' },

  // ── Single-Y with Door ──
  { code:'CSFYD75',   name:'Single-Y with Door',        category:'fittings', subcategory:'wye',  size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:15, rate:177.50, unit:'pcs' },
  { code:'CSFYD90',   name:'Single-Y with Door',        category:'fittings', subcategory:'wye',  size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:12, rate:264.50, unit:'pcs' },
  { code:'CSFYD110',  name:'Single-Y with Door',        category:'fittings', subcategory:'wye',  size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:10, rate:325.50, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 15 — ACCESSORIES & COMPOUND FITTINGS (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Reducing Tee ──
  { code:'CSFRT11075',  name:'Reducing Tee',              category:'fittings', subcategory:'tee', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:15, rate:216.00, unit:'pcs', info:'110mm x 75mm' },

  // ── Reducing Tee with Door ──
  { code:'CSFDRT11075', name:'Reducing Tee with Door',    category:'fittings', subcategory:'tee', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:12, rate:259.00, unit:'pcs', info:'110mm x 75mm' },

  // ── Reducer-Y ──
  { code:'CSFRY11075',  name:'Reducer-Y',                 category:'fittings', subcategory:'wye', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:18, rate:236.00, unit:'pcs', info:'110mm x 75mm' },

  // ── Reducer-Y with Door ──
  { code:'CSFDRY11075', name:'Reducer-Y with Door',       category:'fittings', subcategory:'wye', size:'110x75mm',  size_mm:110, standard:'IS 13592', std_pkg:14, rate:274.00, unit:'pcs', info:'110mm x 75mm' },

  // ── Sweep Tee ──
  { code:'CSFSPT110',   name:'Sweep Tee',                 category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:272.50, unit:'pcs' },

  // ── Sweep Tee with Door ──
  { code:'CSFDSPT110',  name:'Sweep Tee with Door',       category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:307.50, unit:'pcs' },

  // ── Double-Y ──
  { code:'CSFDBY75',    name:'Double-Y',                  category:'fittings', subcategory:'wye', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:20, rate:208.50, unit:'pcs' },
  { code:'CSFDBY110',   name:'Double-Y',                  category:'fittings', subcategory:'wye', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8,  rate:372.00, unit:'pcs' },

  // ── Double-Y with Door ──
  { code:'CSFDDBY75',   name:'Double-Y with Door',        category:'fittings', subcategory:'wye', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:16, rate:249.00, unit:'pcs' },
  { code:'CSFDDBY110',  name:'Double-Y with Door',        category:'fittings', subcategory:'wye', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:6,  rate:434.50, unit:'pcs' },

  // ── Cross Tee ──
  { code:'CSFCT75',     name:'Cross Tee',                 category:'fittings', subcategory:'tee', size:'75mm(2½")', size_mm:75,  standard:'IS 13592', std_pkg:15, rate:170.50, unit:'pcs' },
  { code:'CSFCT90',     name:'Cross Tee',                 category:'fittings', subcategory:'tee', size:'90mm(3")',  size_mm:90,  standard:'IS 13592', std_pkg:16, rate:226.50, unit:'pcs' },
  { code:'CSFCT110',    name:'Cross Tee',                 category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8,  rate:300.00, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCESSORIES
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Click Ring / O-Ring (HSN Code: 4016) ──
  { code:'CK75',   name:'Click Ring (O-Ring)', category:'fittings', subcategory:'oring', size:'75mm(2½")',  size_mm:75,  standard:'IS 13592', std_pkg:25, rate:10.00, unit:'pcs' },
  { code:'CK90',   name:'Click Ring (O-Ring)', category:'fittings', subcategory:'oring', size:'90mm(3")',   size_mm:90,  standard:'IS 13592', std_pkg:25, rate:13.00, unit:'pcs' },
  { code:'CK110',  name:'Click Ring (O-Ring)', category:'fittings', subcategory:'oring', size:'110mm(4")',  size_mm:110, standard:'IS 13592', std_pkg:25, rate:14.00, unit:'pcs' },
  { code:'CK160',  name:'Click Ring (O-Ring)', category:'fittings', subcategory:'oring', size:'160mm(6")',  size_mm:160, standard:'IS 13592', std_pkg:25, rate:34.00, unit:'pcs' },

  // ── Rubber Lubricant (HSN Code: 3403) ──
  { code:'SFRL50',  name:'Rubber Lubricant',  category:'fittings', subcategory:'lubricant', size:'50 gm',  size_mm:0, standard:'IS 13592', std_pkg:200, rate:23.00,  unit:'pcs' },
  { code:'SFRL100', name:'Rubber Lubricant',  category:'fittings', subcategory:'lubricant', size:'100 gm', size_mm:0, standard:'IS 13592', std_pkg:100, rate:35.00,  unit:'pcs' },
  { code:'SFRL250', name:'Rubber Lubricant',  category:'fittings', subcategory:'lubricant', size:'250 gm', size_mm:0, standard:'IS 13592', std_pkg:40,  rate:69.00,  unit:'pcs' },
  { code:'SFRL500', name:'Rubber Lubricant',  category:'fittings', subcategory:'lubricant', size:'500 gm', size_mm:0, standard:'IS 13592', std_pkg:20,  rate:100.00, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
