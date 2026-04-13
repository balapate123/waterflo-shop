// ClickFit uPVC SWR — Product Catalog
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// HSN Code: 3917 (Pipes & Fittings), 4016 (Click Ring), 3403 (Rubber Lubricant)
// Rates are per piece (pcs)

var PRODUCTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // PIPES TYPE A — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSPAS1075', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:487, unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS1090', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:643, unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS10110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:848.5, unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS10160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:1941, unit:'pcs', info:'Type A • 3m • Single Socket' },
  { code:'CSPAS2075', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:952, unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS2090', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:1254, unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS20110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:1662, unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS20160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:3815.5, unit:'pcs', info:'Type A • 6m • Single Socket' },
  { code:'CSPAS675', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:310.5, unit:'pcs', info:'Type A • 6ft • Single Socket' },
  { code:'CSPAS690', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:401.5, unit:'pcs', info:'Type A • 6ft • Single Socket' },
  { code:'CSPAS6110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:555, unit:'pcs', info:'Type A • 6ft • Single Socket' },
  { code:'CSPAD1075', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:500, unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD1090', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:657, unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD10110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:884, unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD10160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:2000, unit:'pcs', info:'Type A • 3m • Double Socket' },
  { code:'CSPAD2075', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:965.5, unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD2090', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:1254.5, unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD20110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:1696.5, unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD20160', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:3873, unit:'pcs', info:'Type A • 6m • Double Socket' },
  { code:'CSPAD675', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6ft', socket:'D/S', rate:334, unit:'pcs', info:'Type A • 6ft • Double Socket' },
  { code:'CSPAD690', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6ft', socket:'D/S', rate:417, unit:'pcs', info:'Type A • 6ft • Double Socket' },
  { code:'CSPAD6110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6ft', socket:'D/S', rate:585, unit:'pcs', info:'Type A • 6ft • Double Socket' },
  { code:'CSPAD475', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:231, unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'CSPAD490', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:290.5, unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'CSPAD4110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:403, unit:'pcs', info:'Type A • 4ft • Double Socket' },
  { code:'CSPAD375', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:186, unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'CSPAD390', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:228.5, unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'CSPAD3110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:311.5, unit:'pcs', info:'Type A • 3ft • Double Socket' },
  { code:'CSPAD275', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:132, unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'CSPAD290', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:165.5, unit:'pcs', info:'Type A • 2ft • Double Socket' },
  { code:'CSPAD2110', name:'SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:223.5, unit:'pcs', info:'Type A • 2ft • Double Socket' },


  // ═══════════════════════════════════════════════════════════════════════
  // PIPES TYPE B — as per IS 13592 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSPBS1075', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:840, unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS1090', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:1032, unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS10110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:1285.5, unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS10160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m', socket:'S/S', rate:2371.5, unit:'pcs', info:'Type B • 3m • Single Socket' },
  { code:'CSPBS2075', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:1697.5, unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS2090', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:2058, unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS20110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:2558.5, unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS20160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m', socket:'S/S', rate:4680, unit:'pcs', info:'Type B • 6m • Single Socket' },
  { code:'CSPBS675', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:517, unit:'pcs', info:'Type B • 6ft • Single Socket' },
  { code:'CSPBS690', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:642, unit:'pcs', info:'Type B • 6ft • Single Socket' },
  { code:'CSPBS6110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6ft', socket:'S/S', rate:772.5, unit:'pcs', info:'Type B • 6ft • Single Socket' },
  { code:'CSPBD1075', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:860, unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD1090', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:1047, unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD10110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:1309.5, unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD10160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'3m', socket:'D/S', rate:2433, unit:'pcs', info:'Type B • 3m • Double Socket' },
  { code:'CSPBD2075', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:1723.5, unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD2090', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:2071.5, unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD20110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:2589, unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD20160', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'160mm(6")', size_mm:160, standard:'IS 13592', pipe_length:'6m', socket:'D/S', rate:4739.5, unit:'pcs', info:'Type B • 6m • Double Socket' },
  { code:'CSPBD675', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'6ft', socket:'D/S', rate:542.5, unit:'pcs', info:'Type B • 6ft • Double Socket' },
  { code:'CSPBD690', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'6ft', socket:'D/S', rate:657, unit:'pcs', info:'Type B • 6ft • Double Socket' },
  { code:'CSPBD6110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'6ft', socket:'D/S', rate:806, unit:'pcs', info:'Type B • 6ft • Double Socket' },
  { code:'CSPBD475', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:391.5, unit:'pcs', info:'Type B • 4ft • Double Socket' },
  { code:'CSPBD490', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:449.5, unit:'pcs', info:'Type B • 4ft • Double Socket' },
  { code:'CSPBD4110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'4ft', socket:'D/S', rate:569, unit:'pcs', info:'Type B • 4ft • Double Socket' },
  { code:'CSPBD375', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:306.5, unit:'pcs', info:'Type B • 3ft • Double Socket' },
  { code:'CSPBD390', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:345.5, unit:'pcs', info:'Type B • 3ft • Double Socket' },
  { code:'CSPBD3110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'3ft', socket:'D/S', rate:443.5, unit:'pcs', info:'Type B • 3ft • Double Socket' },
  { code:'CSPBD275', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm(2½")', size_mm:75, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:221, unit:'pcs', info:'Type B • 2ft • Double Socket' },
  { code:'CSPBD290', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'90mm(3")', size_mm:90, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:242.5, unit:'pcs', info:'Type B • 2ft • Double Socket' },
  { code:'CSPBD2110', name:'SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm(4")', size_mm:110, standard:'IS 13592', pipe_length:'2ft', socket:'D/S', rate:324, unit:'pcs', info:'Type B • 2ft • Double Socket' },


  // ═══════════════════════════════════════════════════════════════════════
  // BENDS — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSFB75', name:'Bend 87.5°', category:'fittings', subcategory:'bend', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:50, rate:83, unit:'pcs' },
  { code:'CSFB90', name:'Bend 87.5°', category:'fittings', subcategory:'bend', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:29, rate:128.5, unit:'pcs' },
  { code:'CSFB110', name:'Bend 87.5°', category:'fittings', subcategory:'bend', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:32, rate:155, unit:'pcs' },
  { code:'CSFB160', name:'Bend 87.5°', category:'fittings', subcategory:'bend', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:8, rate:424.5, unit:'pcs' },
  { code:'CSFDB75', name:'Bend 87.5° with Door', category:'fittings', subcategory:'bend', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:39, rate:102, unit:'pcs' },
  { code:'CSFDB90', name:'Bend 87.5° with Door', category:'fittings', subcategory:'bend', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:26, rate:163.5, unit:'pcs' },
  { code:'CSFDB110', name:'Bend 87.5° with Door', category:'fittings', subcategory:'bend', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:19, rate:191.5, unit:'pcs' },
  { code:'CSFDB160', name:'Bend 87.5° with Door', category:'fittings', subcategory:'bend', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:8, rate:447.5, unit:'pcs' },
  { code:'CSFB4575', name:'Bend 45°', category:'fittings', subcategory:'bend', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:67, rate:70.5, unit:'pcs' },
  { code:'CSFB4590', name:'Bend 45°', category:'fittings', subcategory:'bend', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:47, rate:112.5, unit:'pcs' },
  { code:'CSFB45110', name:'Bend 45°', category:'fittings', subcategory:'bend', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:24, rate:123.5, unit:'pcs' },
  { code:'CSFB45160', name:'Bend 45°', category:'fittings', subcategory:'bend', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:10, rate:366.5, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // TEES — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSFST75', name:'Single Tee', category:'fittings', subcategory:'tee', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:34, rate:117.5, unit:'pcs' },
  { code:'CSFST90', name:'Single Tee', category:'fittings', subcategory:'tee', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:24, rate:170.5, unit:'pcs' },
  { code:'CSFST110', name:'Single Tee', category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:24, rate:211, unit:'pcs' },
  { code:'CSFST160', name:'Single Tee', category:'fittings', subcategory:'tee', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:6, rate:588, unit:'pcs' },
  { code:'CSFDST75', name:'Single Tee with Door', category:'fittings', subcategory:'tee', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:34, rate:135, unit:'pcs' },
  { code:'CSFDST90', name:'Single Tee with Door', category:'fittings', subcategory:'tee', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:21, rate:220.5, unit:'pcs' },
  { code:'CSFDST110', name:'Single Tee with Door', category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:20, rate:244, unit:'pcs' },
  { code:'CSFDST160', name:'Single Tee with Door', category:'fittings', subcategory:'tee', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:6, rate:634, unit:'pcs' },
  { code:'CSFCT75', name:'Cross Tee', category:'fittings', subcategory:'tee', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:15, rate:170.5, unit:'pcs' },
  { code:'CSFCT90', name:'Cross Tee', category:'fittings', subcategory:'tee', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:18, rate:226.5, unit:'pcs' },
  { code:'CSFCT110', name:'Cross Tee', category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8, rate:300.5, unit:'pcs' },
  { code:'CSFRT11075', name:'Reducing Tee', category:'fittings', subcategory:'tee', size:'110x75mm', size_mm:110, standard:'IS 13592', std_pkg:15, rate:216, unit:'pcs', info:'110x75mm' },
  { code:'CSFDRT11075', name:'Reducing Tee with Door', category:'fittings', subcategory:'tee', size:'110x75mm', size_mm:110, standard:'IS 13592', std_pkg:12, rate:259, unit:'pcs', info:'110x75mm' },
  { code:'CSFSPT110', name:'Swept-Tee', category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:272.5, unit:'pcs' },
  { code:'CSFDSPT110', name:'Swept-Tee with Door', category:'fittings', subcategory:'tee', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:307.5, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // COUPLERS — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSFC75', name:'Coupler', category:'fittings', subcategory:'coupler', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:60, rate:67, unit:'pcs' },
  { code:'CSFC90', name:'Coupler', category:'fittings', subcategory:'coupler', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:48, rate:95.5, unit:'pcs' },
  { code:'CSFC110', name:'Coupler', category:'fittings', subcategory:'coupler', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:48, rate:114.5, unit:'pcs' },
  { code:'CSFC160', name:'Coupler', category:'fittings', subcategory:'coupler', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:16, rate:335.5, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // Y-BRANCHES — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSFSY75', name:'Single \'Y\'', category:'fittings', subcategory:'wye', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:18, rate:147, unit:'pcs' },
  { code:'CSFSY90', name:'Single \'Y\'', category:'fittings', subcategory:'wye', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:15, rate:221, unit:'pcs' },
  { code:'CSFSY110', name:'Single \'Y\'', category:'fittings', subcategory:'wye', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:12, rate:275.5, unit:'pcs' },
  { code:'CSFDY75', name:'Single \'Y\' with Door', category:'fittings', subcategory:'wye', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:15, rate:177.5, unit:'pcs' },
  { code:'CSFDY90', name:'Single \'Y\' with Door', category:'fittings', subcategory:'wye', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:12, rate:264.5, unit:'pcs' },
  { code:'CSFDY110', name:'Single \'Y\' with Door', category:'fittings', subcategory:'wye', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:10, rate:325.5, unit:'pcs' },
  { code:'CSFRY11075', name:'Reducing \'Y\'', category:'fittings', subcategory:'wye', size:'110x75mm', size_mm:110, standard:'IS 13592', std_pkg:16, rate:236, unit:'pcs', info:'110x75mm' },
  { code:'CSFDRY11075', name:'Reducing \'Y\' with Door', category:'fittings', subcategory:'wye', size:'110x75mm', size_mm:110, standard:'IS 13592', std_pkg:14, rate:274, unit:'pcs', info:'110x75mm' },
  { code:'CSFDBY75', name:'Double \'Y\'', category:'fittings', subcategory:'wye', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:20, rate:208.5, unit:'pcs' },
  { code:'CSFDBY110', name:'Double \'Y\'', category:'fittings', subcategory:'wye', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:8, rate:372, unit:'pcs' },
  { code:'CSFDDBY75', name:'Double \'Y\' with Door', category:'fittings', subcategory:'wye', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:10, rate:249, unit:'pcs' },
  { code:'CSFDDBY110', name:'Double \'Y\' with Door', category:'fittings', subcategory:'wye', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:6, rate:434.5, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // CLEANSING PIPES — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSFCP75', name:'Cleansing Pipe', category:'accessories', subcategory:'cleansing_pipe', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:29, rate:116, unit:'pcs' },
  { code:'CSFCP110', name:'Cleansing Pipe', category:'accessories', subcategory:'cleansing_pipe', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:16, rate:225, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // REDUCERS — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CSFR11075', name:'Reducer', category:'reducers', subcategory:'reducer', size:'110x75mm', size_mm:110, standard:'IS 13592', std_pkg:36, rate:101, unit:'pcs', info:'110x75mm' },
  { code:'CSFR11090', name:'Reducer', category:'reducers', subcategory:'reducer', size:'110x90mm', size_mm:110, standard:'IS 13592', std_pkg:35, rate:116, unit:'pcs', info:'110x90mm' },
  { code:'CSFR160110', name:'Reducer', category:'reducers', subcategory:'reducer', size:'160x110mm', size_mm:160, standard:'IS 13592', std_pkg:18, rate:225.5, unit:'pcs', info:'160x110mm' },


  // ═══════════════════════════════════════════════════════════════════════
  // CLICK RINGS (HSN Code: 4016)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'CR75', name:'Click Ring', category:'accessories', subcategory:'oring', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:25, rate:10, unit:'pcs' },
  { code:'CR90', name:'Click Ring', category:'accessories', subcategory:'oring', size:'90mm(3")', size_mm:90, standard:'IS 13592', std_pkg:25, rate:12, unit:'pcs' },
  { code:'CR110', name:'Click Ring', category:'accessories', subcategory:'oring', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:25, rate:14, unit:'pcs' },
  { code:'CR160', name:'Click Ring', category:'accessories', subcategory:'oring', size:'160mm(6")', size_mm:160, standard:'IS 13592', std_pkg:15, rate:34, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // LW FITTINGS — as per IS 13592
  // ═══════════════════════════════════════════════════════════════════════
  { code:'SFB75', name:'Bend 87.5°', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:80, rate:65, unit:'pcs' },
  { code:'SFB110', name:'Bend 87.5°', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:30, rate:118, unit:'pcs' },
  { code:'SFDB75', name:'Bend 87.5° with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:60, rate:77, unit:'pcs' },
  { code:'SFDB110', name:'Bend 87.5° with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:22, rate:135, unit:'pcs' },
  { code:'SFST75', name:'Single Tee', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:54, rate:92, unit:'pcs' },
  { code:'SFST110', name:'Single Tee', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:26, rate:168, unit:'pcs' },
  { code:'SFDT75', name:'Single Tee with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:42, rate:112, unit:'pcs' },
  { code:'SFDT110', name:'Single Tee with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:24, rate:200, unit:'pcs' },
  { code:'SFB4575', name:'Bend 45°', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:84, rate:58, unit:'pcs' },
  { code:'SFB45110', name:'Bend 45°', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:45, rate:100, unit:'pcs' },
  { code:'SFC75', name:'Coupler', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:60, rate:54, unit:'pcs' },
  { code:'SFC110', name:'Coupler', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:57, rate:92, unit:'pcs' },
  { code:'SFSY75', name:'Single Y', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:36, rate:115, unit:'pcs' },
  { code:'SFSY110', name:'Single Y', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:18, rate:224, unit:'pcs' },
  { code:'SFDSY75', name:'Single Y with Door', category:'fittings', subcategory:'lw_fittings', size:'75mm(2½")', size_mm:75, standard:'IS 13592', std_pkg:30, rate:133, unit:'pcs' },
  { code:'SFDSY110', name:'Single Y with Door', category:'fittings', subcategory:'lw_fittings', size:'110mm(4")', size_mm:110, standard:'IS 13592', std_pkg:15, rate:260, unit:'pcs' },


  // ═══════════════════════════════════════════════════════════════════════
  // RUBBER LUBRICANT (HSN Code: 3403)
  // ═══════════════════════════════════════════════════════════════════════
  { code:'SFRL50', name:'Rubber Lubricant', category:'accessories', subcategory:'lubricant', size:'50 grm', size_mm:0, standard:'IS 13592', std_pkg:200, rate:23, unit:'pcs' },
  { code:'SFRL100', name:'Rubber Lubricant', category:'accessories', subcategory:'lubricant', size:'100 grm', size_mm:0, standard:'IS 13592', std_pkg:100, rate:35, unit:'pcs' },
  { code:'SFRL250', name:'Rubber Lubricant', category:'accessories', subcategory:'lubricant', size:'250 grm', size_mm:0, standard:'IS 13592', std_pkg:40, rate:69, unit:'pcs' },
  { code:'SFRL500', name:'Rubber Lubricant', category:'accessories', subcategory:'lubricant', size:'500 grm', size_mm:0, standard:'IS 13592', std_pkg:20, rate:108, unit:'pcs' },

];

document.dispatchEvent(new Event('brand-data-ready'));
