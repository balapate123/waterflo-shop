// uPVC SWR System — Product Catalog
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// HSN Code: 3917 (Pipes & Fittings)
// Rates are per piece (pcs)

var PRODUCTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // uPVC SWR R/R 2.5 KG PIPES — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'RSP251075', name:'uPVC SWR Pipe R/R 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:346, unit:'pcs', info:'R/R 2.5 Kg • 3m' },
  { code:'RSP22510110', name:'uPVC SWR Pipe R/R 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:679.5, unit:'pcs', info:'R/R 2.5 Kg • 3m' },

  // ═══════════════════════════════════════════════════════════════════════
  // COMMON uPVC SWR LW FITTINGS — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'SWP1075', name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:341, unit:'pcs', info:'2.5 Kg • 3m • Single Socket' },
  { code:'SWP10110', name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:590.5, unit:'pcs', info:'2.5 Kg • 3m • Single Socket' },
  { code:'SWP375', name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:215, unit:'pcs', info:'2.5 Kg • 3ft • Single Socket' },
  { code:'SWP3110', name:'uPVC SWR Pipe 2.5 Kg', category:'pipes', subcategory:'swr_2_5kg', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'S/S', rate:373, unit:'pcs', info:'2.5 Kg • 3ft • Single Socket' },
  { code:'SWB75', name:'Bend 87.5\u00B0 LW', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:20, rate:46.5, unit:'pcs' },
  { code:'SWB110', name:'Bend 87.5\u00B0 LW', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:15, rate:83, unit:'pcs' },
  { code:'SWBD75', name:'Bend 87.5\u00B0 LW with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:18, rate:59, unit:'pcs' },
  { code:'SWBD110', name:'Bend 87.5\u00B0 LW with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:103, unit:'pcs' },
  { code:'SWB4575', name:'Bend 45\u00B0 LW', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:22, rate:40, unit:'pcs' },
  { code:'SWB45110', name:'Bend 45\u00B0 LW', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:16, rate:72, unit:'pcs' },
  { code:'SWST75', name:'Single Tee LW', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:15, rate:65, unit:'pcs' },
  { code:'SWST110', name:'Single Tee LW', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:108, unit:'pcs' },
  { code:'SWSTD75', name:'Single Tee LW with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:12, rate:79, unit:'pcs' },
  { code:'SWSTD110', name:'Single Tee LW with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8, rate:130, unit:'pcs' },
  { code:'SWC75', name:'Coupler LW', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:30, rate:43, unit:'pcs' },
  { code:'SWC110', name:'Coupler LW', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:20, rate:61, unit:'pcs' },
  { code:'SWY75', name:'Single-Y LW', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:12, rate:82, unit:'pcs' },
  { code:'SWY110', name:'Single-Y LW', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8, rate:142, unit:'pcs' },
  { code:'SWYD75', name:'Single-Y LW with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:10, rate:100, unit:'pcs' },
  { code:'SWYD110', name:'Single-Y LW with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:6, rate:173, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════
  // SELFIT LW FITTINGS — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'SFLWB75', name:'Bend 87.5\u00B0 Selfit LW', category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:20, rate:48, unit:'pcs' },
  { code:'SFLWB110', name:'Bend 87.5\u00B0 Selfit LW', category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:15, rate:88, unit:'pcs' },
  { code:'SFLWDB75', name:'Bend 87.5\u00B0 Selfit LW with Door', category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:18, rate:62, unit:'pcs' },
  { code:'SFLWDB110', name:'Bend 87.5\u00B0 Selfit LW with Door', category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:108, unit:'pcs' },
  { code:'SFLWB4575', name:'Bend 45\u00B0 Selfit LW', category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:22, rate:43, unit:'pcs' },
  { code:'SFLWB45110', name:'Bend 45\u00B0 Selfit LW', category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:16, rate:77, unit:'pcs' },
  { code:'SFLWST75', name:'Single Tee Selfit LW', category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:15, rate:68, unit:'pcs' },
  { code:'SFLWST110', name:'Single Tee Selfit LW', category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:115, unit:'pcs' },
  { code:'SFLWSTD75', name:'Single Tee Selfit LW with Door', category:'fittings', subcategory:'lw_selfit', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:12, rate:83, unit:'pcs' },
  { code:'SFLWSTD110', name:'Single Tee Selfit LW with Door', category:'fittings', subcategory:'lw_selfit', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8, rate:138, unit:'pcs' },

];

document.dispatchEvent(new Event('brand-data-ready'));
