// SureFit uPVC ASTM Plumbing System — Product Catalog
// Pipe as per ASTM D 1785 (SCH 40 & SCH 80)
// Fittings as per ASTM D 2467 (SCH 80) & ASTM D 2466 (SCH 40)
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// Rates: pipes = per pipe (3mtr/6mtr), fittings = per piece (pcs)

var PRODUCTS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // uPVC PIPES — SCH 40 as per ASTM D-1785 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // Waterflo uPVC Pipes SCH 40 (½"–2") — 3 mtr
  { code:'UP4015', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:50, rate:186.5, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP4020', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:40, rate:237.5, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP4025', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:25, rate:344, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP4032', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:15, rate:491, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP4040', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:585.5, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP4050', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:774.5, unit:'pcs', info:'SCH 40 • 3 mtr length' },

  // Waterflo Surefit uPVC Pipes SCH 40 (½"–2") — 3 mtr
  { code:'UPS4015', name:'Surefit uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:50, rate:205, unit:'pcs', info:'Surefit SCH 40 • 3 mtr length' },
  { code:'UPS4020', name:'Surefit uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:40, rate:264, unit:'pcs', info:'Surefit SCH 40 • 3 mtr length' },
  { code:'UPS4025', name:'Surefit uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:25, rate:382, unit:'pcs', info:'Surefit SCH 40 • 3 mtr length' },
  { code:'UPS4032', name:'Surefit uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:15, rate:543, unit:'pcs', info:'Surefit SCH 40 • 3 mtr length' },
  { code:'UPS4040', name:'Surefit uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:650, unit:'pcs', info:'Surefit SCH 40 • 3 mtr length' },
  { code:'UPS4050', name:'Surefit uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:855, unit:'pcs', info:'Surefit SCH 40 • 3 mtr length' },

  // ═══════════════════════════════════════════════════════════════════════════
  // uPVC PIPES — SCH 80 as per ASTM D-1785 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // Waterflo uPVC Pipes SCH 80 (½"–2") — 3 mtr
  { code:'UP8015', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:50, rate:223.5, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP8020', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:40, rate:311, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP8025', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:25, rate:431.5, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP8032', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:15, rate:624, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP8040', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:759.5, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP8050', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:1059.5, unit:'pcs', info:'SCH 80 • 3 mtr length' },

  // Waterflo Surefit uPVC Pipes SCH 80 (½"–2") — 3 mtr
  { code:'UPS8015', name:'Surefit uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:50, rate:248.5, unit:'pcs', info:'Surefit SCH 80 • 3 mtr length' },
  { code:'UPS8020', name:'Surefit uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:40, rate:343.5, unit:'pcs', info:'Surefit SCH 80 • 3 mtr length' },
  { code:'UPS8025', name:'Surefit uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:25, rate:490.5, unit:'pcs', info:'Surefit SCH 80 • 3 mtr length' },
  { code:'UPS8032', name:'Surefit uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:15, rate:688, unit:'pcs', info:'Surefit SCH 80 • 3 mtr length' },
  { code:'UPS8040', name:'Surefit uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:837.5, unit:'pcs', info:'Surefit SCH 80 • 3 mtr length' },
  { code:'UPS8050', name:'Surefit uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:1169.5, unit:'pcs', info:'Surefit SCH 80 • 3 mtr length' },

  // ═══════════════════════════════════════════════════════════════════════════
  // uPVC PIPES — 6 mtr lengths (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // Waterflo uPVC Pipes SCH 40 (½"–2") — 6 mtr
  { code:'UP4015_6M', name:'uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:30, rate:373, unit:'pcs', info:'SCH 40 • 6 mtr length' },
  { code:'UP4020_6M', name:'uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:25, rate:475, unit:'pcs', info:'SCH 40 • 6 mtr length' },
  { code:'UP4025_6M', name:'uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:20, rate:688, unit:'pcs', info:'SCH 40 • 6 mtr length' },
  { code:'UP4032_6M', name:'uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:10, rate:982, unit:'pcs', info:'SCH 40 • 6 mtr length' },
  { code:'UP4040_6M', name:'uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:1171, unit:'pcs', info:'SCH 40 • 6 mtr length' },
  { code:'UP4050_6M', name:'uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:1549, unit:'pcs', info:'SCH 40 • 6 mtr length' },

  // Waterflo uPVC Pipes SCH 80 (½"–2") — 6 mtr
  { code:'UP8015_6M', name:'uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:30, rate:447, unit:'pcs', info:'SCH 80 • 6 mtr length' },
  { code:'UP8020_6M', name:'uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:25, rate:622, unit:'pcs', info:'SCH 80 • 6 mtr length' },
  { code:'UP8025_6M', name:'uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:20, rate:863, unit:'pcs', info:'SCH 80 • 6 mtr length' },
  { code:'UP8032_6M', name:'uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:10, rate:1248, unit:'pcs', info:'SCH 80 • 6 mtr length' },
  { code:'UP8040_6M', name:'uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:1519, unit:'pcs', info:'SCH 80 • 6 mtr length' },
  { code:'UP8050_6M', name:'uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:2119, unit:'pcs', info:'SCH 80 • 6 mtr length' },

  // Waterflo Surefit uPVC Pipes SCH 40 (½"–2") — 6 mtr
  { code:'UPS4015_6M', name:'Surefit uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:30, rate:410, unit:'pcs', info:'Surefit SCH 40 • 6 mtr length' },
  { code:'UPS4020_6M', name:'Surefit uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:25, rate:528, unit:'pcs', info:'Surefit SCH 40 • 6 mtr length' },
  { code:'UPS4025_6M', name:'Surefit uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:20, rate:768, unit:'pcs', info:'Surefit SCH 40 • 6 mtr length' },
  { code:'UPS4032_6M', name:'Surefit uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:10, rate:1086, unit:'pcs', info:'Surefit SCH 40 • 6 mtr length' },
  { code:'UPS4040_6M', name:'Surefit uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:1300, unit:'pcs', info:'Surefit SCH 40 • 6 mtr length' },
  { code:'UPS4050_6M', name:'Surefit uPVC Pipe SCH 40 (6mtr)', category:'pipes', subcategory:'sch40', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:1710, unit:'pcs', info:'Surefit SCH 40 • 6 mtr length' },

  // Waterflo Surefit uPVC Pipes SCH 80 (½"–2") — 6 mtr
  { code:'UPS8015_6M', name:'Surefit uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'½"', size_mm:15, standard:'ASTM D 1785', qty_bundle:30, rate:497, unit:'pcs', info:'Surefit SCH 80 • 6 mtr length' },
  { code:'UPS8020_6M', name:'Surefit uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'¾"', size_mm:20, standard:'ASTM D 1785', qty_bundle:25, rate:687, unit:'pcs', info:'Surefit SCH 80 • 6 mtr length' },
  { code:'UPS8025_6M', name:'Surefit uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'1"', size_mm:25, standard:'ASTM D 1785', qty_bundle:20, rate:981, unit:'pcs', info:'Surefit SCH 80 • 6 mtr length' },
  { code:'UPS8032_6M', name:'Surefit uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'1¼"', size_mm:32, standard:'ASTM D 1785', qty_bundle:10, rate:1376, unit:'pcs', info:'Surefit SCH 80 • 6 mtr length' },
  { code:'UPS8040_6M', name:'Surefit uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'1½"', size_mm:40, standard:'ASTM D 1785', qty_bundle:10, rate:1675, unit:'pcs', info:'Surefit SCH 80 • 6 mtr length' },
  { code:'UPS8050_6M', name:'Surefit uPVC Pipe SCH 80 (6mtr)', category:'pipes', subcategory:'sch80', size:'2"', size_mm:50, standard:'ASTM D 1785', qty_bundle:7, rate:2339, unit:'pcs', info:'Surefit SCH 80 • 6 mtr length' },

  // ═══════════════════════════════════════════════════════════════════════════
  // LARGE uPVC PIPES (2½"–6") — SCH 40 & 80 (3 mtr)
  // ═══════════════════════════════════════════════════════════════════════════

  // Large uPVC Pipes SCH 40 (2½"–6") — 3 mtr
  { code:'UP4065', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'2½"', size_mm:65, standard:'ASTM D 1785', qty_bundle:4, rate:1336.5, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP4080', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'3"', size_mm:80, standard:'ASTM D 1785', qty_bundle:4, rate:1758, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP40100', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'4"', size_mm:100, standard:'ASTM D 1785', qty_bundle:2, rate:2490, unit:'pcs', info:'SCH 40 • 3 mtr length' },
  { code:'UP40150', name:'uPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'6"', size_mm:150, standard:'ASTM D 1785', qty_bundle:1, rate:4708.5, unit:'pcs', info:'SCH 40 • 3 mtr length' },

  // Large uPVC Pipes SCH 80 (2½"–6") — 3 mtr
  { code:'UP8065', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'2½"', size_mm:65, standard:'ASTM D 1785', qty_bundle:4, rate:1830, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP8080', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'3"', size_mm:80, standard:'ASTM D 1785', qty_bundle:4, rate:2355, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP80100', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'4"', size_mm:100, standard:'ASTM D 1785', qty_bundle:2, rate:3528, unit:'pcs', info:'SCH 80 • 3 mtr length' },
  { code:'UP80150', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'6"', size_mm:150, standard:'ASTM D 1785', qty_bundle:1, rate:6681, unit:'pcs', info:'SCH 80 • 3 mtr length' },

  // ═══════════════════════════════════════════════════════════════════════════
  // uPVC FITTINGS — SCH 80 as per ASTM D-2467 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // Elbow (SCH 80) — ½"–2"
  { code:'UFE8015', name:'Elbow', category:'fittings', subcategory:'elbow', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:70, qty_box:350, rate:12, unit:'pcs' },
  { code:'UFE8020', name:'Elbow', category:'fittings', subcategory:'elbow', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:50, qty_box:200, rate:19, unit:'pcs' },
  { code:'UFE8025', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:30, qty_box:120, rate:30, unit:'pcs' },
  { code:'UFE8032', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:14, qty_box:70, rate:49.5, unit:'pcs' },
  { code:'UFE8040', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:15, qty_box:60, rate:64, unit:'pcs' },
  { code:'UFE8050', name:'Elbow', category:'fittings', subcategory:'elbow', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:8, qty_box:32, rate:95, unit:'pcs' },

  // Tee (SCH 80) — ½"–2"
  { code:'UFT8015', name:'Tee', category:'fittings', subcategory:'tee', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:55, qty_box:220, rate:18, unit:'pcs' },
  { code:'UFT8020', name:'Tee', category:'fittings', subcategory:'tee', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:30, qty_box:120, rate:24.5, unit:'pcs' },
  { code:'UFT8025', name:'Tee', category:'fittings', subcategory:'tee', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:40, unit:'pcs' },
  { code:'UFT8032', name:'Tee', category:'fittings', subcategory:'tee', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:10, qty_box:50, rate:63, unit:'pcs' },
  { code:'UFT8040', name:'Tee', category:'fittings', subcategory:'tee', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:0, qty_box:38, rate:85, unit:'pcs' },
  { code:'UFT8050', name:'Tee', category:'fittings', subcategory:'tee', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:0, qty_box:22, rate:130, unit:'pcs' },

  // Coupler (SCH 80) — ½"–2"
  { code:'UFC8015', name:'Coupler', category:'fittings', subcategory:'coupler', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:100, qty_box:500, rate:9, unit:'pcs' },
  { code:'UFC8020', name:'Coupler', category:'fittings', subcategory:'coupler', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:75, qty_box:300, rate:13, unit:'pcs' },
  { code:'UFC8025', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:45, qty_box:180, rate:20.5, unit:'pcs' },
  { code:'UFC8032', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:31, unit:'pcs' },
  { code:'UFC8040', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:0, qty_box:100, rate:42, unit:'pcs' },
  { code:'UFC8050', name:'Coupler', category:'fittings', subcategory:'coupler', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:0, qty_box:56, rate:60.5, unit:'pcs' },

  // M.T.A. (SCH 80) — ½"–2"
  { code:'UFM8015', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:125, qty_box:625, rate:7.5, unit:'pcs' },
  { code:'UFM8020', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:100, qty_box:400, rate:13, unit:'pcs' },
  { code:'UFM8025', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:40, qty_box:240, rate:17, unit:'pcs' },
  { code:'UFM8032', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:0, qty_box:210, rate:25, unit:'pcs' },
  { code:'UFM8040', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:0, qty_box:150, rate:33.5, unit:'pcs' },
  { code:'UFM8050', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:0, qty_box:96, rate:50, unit:'pcs' },

  // F.T.A. (SCH 80) — ½"–2"
  { code:'UFF8015', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:125, qty_box:500, rate:9, unit:'pcs' },
  { code:'UFF8020', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:75, qty_box:300, rate:14.5, unit:'pcs' },
  { code:'UFF8025', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:50, qty_box:200, rate:21, unit:'pcs' },
  { code:'UFF8032', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:30, unit:'pcs' },
  { code:'UFF8040', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:0, qty_box:110, rate:38, unit:'pcs' },
  { code:'UFF8050', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:0, qty_box:64, rate:56.5, unit:'pcs' },

  // Elbow 45° (SCH 80) — ½"–2"
  { code:'UFE458015', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:80, qty_box:400, rate:14, unit:'pcs' },
  { code:'UFE458020', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:47, qty_box:235, rate:19.5, unit:'pcs' },
  { code:'UFE458025', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:20, qty_box:140, rate:30, unit:'pcs' },
  { code:'UFE458032', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:42, unit:'pcs' },
  { code:'UFE458040', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:54.5, unit:'pcs' },
  { code:'UFE458050', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:9, qty_box:36, rate:84.5, unit:'pcs' },

  // End Cap (SCH 80) — ½"–2"
  { code:'UFEC8015', name:'End Cap', category:'fittings', subcategory:'endcap', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:50, qty_box:1000, rate:7, unit:'pcs' },
  { code:'UFEC8020', name:'End Cap', category:'fittings', subcategory:'endcap', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:50, qty_box:650, rate:9.5, unit:'pcs' },
  { code:'UFEC8025', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:350, rate:14.5, unit:'pcs' },
  { code:'UFEC8032', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:40, qty_box:200, rate:23.5, unit:'pcs' },
  { code:'UFEC8040', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:15, qty_box:165, rate:29, unit:'pcs' },
  { code:'UFEC8050', name:'End Cap', category:'fittings', subcategory:'endcap', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:20, qty_box:100, rate:44.5, unit:'pcs' },

  // Union (SCH 80) — ½"–2"
  { code:'UFU8015', name:'Union', category:'fittings', subcategory:'union', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:30, qty_box:180, rate:33, unit:'pcs' },
  { code:'UFU8020', name:'Union', category:'fittings', subcategory:'union', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:30, qty_box:120, rate:46.5, unit:'pcs' },
  { code:'UFU8025', name:'Union', category:'fittings', subcategory:'union', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:21, qty_box:84, rate:60.5, unit:'pcs' },
  { code:'UFU8032', name:'Union', category:'fittings', subcategory:'union', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:16, qty_box:64, rate:81, unit:'pcs' },
  { code:'UFU8040', name:'Union', category:'fittings', subcategory:'union', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:12, qty_box:48, rate:121, unit:'pcs' },
  { code:'UFU8050', name:'Union', category:'fittings', subcategory:'union', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:9, qty_box:36, rate:182, unit:'pcs' },

  // Threaded Elbow (SCH 80)
  { code:'UFET8015', name:'Threaded Elbow', category:'fittings', subcategory:'threadedelbow', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:10, qty_box:324, rate:18, unit:'pcs' },
  { code:'UFET802015', name:'Threaded Elbow', category:'fittings', subcategory:'threadedelbow', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:30, qty_box:210, rate:35.5, unit:'pcs' },
  { code:'UFET8025', name:'Threaded Elbow', category:'fittings', subcategory:'threadedelbow', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:59.5, unit:'pcs' },
  { code:'UFET802515', name:'Threaded Elbow', category:'fittings', subcategory:'threadedelbow', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:125, rate:55, unit:'pcs' },
  { code:'UFET802520', name:'Threaded Elbow', category:'fittings', subcategory:'threadedelbow', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:125, rate:56.5, unit:'pcs' },

  // Threaded Tee (SCH 80)
  { code:'UFTT8015', name:'Threaded Tee', category:'fittings', subcategory:'threadedtee', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:40, qty_box:200, rate:23.5, unit:'pcs' },
  { code:'UFTT8025', name:'Threaded Tee', category:'fittings', subcategory:'threadedtee', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:20, qty_box:80, rate:65.5, unit:'pcs' },
  { code:'UFTT802515', name:'Threaded Tee', category:'fittings', subcategory:'threadedtee', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:20, qty_box:80, rate:53.5, unit:'pcs' },
  { code:'UFTT802520', name:'Threaded Tee', category:'fittings', subcategory:'threadedtee', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:20, qty_box:80, rate:58, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // BRASS FITTINGS (SCH 80) — ASTM D-2467
  // ═══════════════════════════════════════════════════════════════════════════

  // Brass Elbow
  { code:'UFBE15', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:40, qty_box:160, rate:73, unit:'pcs' },
  { code:'UFBE20', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:21, qty_box:105, rate:116.5, unit:'pcs' },
  { code:'UFBE25', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:16, qty_box:48, rate:206, unit:'pcs' },
  { code:'UFBE2015', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:40, qty_box:120, rate:86.5, unit:'pcs' },
  { code:'UFBE2515', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:20, qty_box:80, rate:103.5, unit:'pcs' },

  // Brass Tee
  { code:'UFBT15', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:30, qty_box:180, rate:79, unit:'pcs' },
  { code:'UFBT25', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:207, unit:'pcs' },
  { code:'UFBT2015', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:25, qty_box:125, rate:90, unit:'pcs' },
  { code:'UFBT2515', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:124, unit:'pcs' },
  { code:'UFBT2520', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:148.5, unit:'pcs' },

  // Brass M.T.A.
  { code:'UFBM15', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:20, qty_box:240, rate:97, unit:'pcs' },
  { code:'UFBM20', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:15, qty_box:150, rate:143, unit:'pcs' },
  { code:'UFBM25', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:12, qty_box:120, rate:207.5, unit:'pcs' },
  { code:'UFBM32', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:0, qty_box:40, rate:481.5, unit:'pcs' },
  { code:'UFBM40', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:0, qty_box:32, rate:532, unit:'pcs' },
  { code:'UFBM50', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:0, qty_box:26, rate:766.5, unit:'pcs' },
  { code:'UFBM2015', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:20, qty_box:200, rate:110, unit:'pcs' },
  { code:'UFBM2515', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:10, qty_box:120, rate:118, unit:'pcs' },
  { code:'UFBM2520', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:10, qty_box:120, rate:168.5, unit:'pcs' },

  // Brass F.T.A.
  { code:'UFBF15', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:72, qty_box:216, rate:64, unit:'pcs' },
  { code:'UFBF20', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:49, qty_box:147, rate:99.5, unit:'pcs' },
  { code:'UFBF25', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:10, qty_box:100, rate:156.5, unit:'pcs' },
  { code:'UFBF32', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:0, qty_box:40, rate:358.5, unit:'pcs' },
  { code:'UFBF40', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:0, qty_box:32, rate:402.5, unit:'pcs' },
  { code:'UFBF50', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:0, qty_box:24, rate:587, unit:'pcs' },
  { code:'UFBF2015', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:64, qty_box:192, rate:74.5, unit:'pcs' },
  { code:'UFBF2515', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:125, rate:88, unit:'pcs' },
  { code:'UFBF2520', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:10, qty_box:120, rate:118, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // REDUCER FITTINGS — SCH 80 as per ASTM D-2467
  // ═══════════════════════════════════════════════════════════════════════════

  // Reducer Tee (SCH 80)
  { code:'UFRT802015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:30, qty_box:150, rate:28, unit:'pcs' },
  { code:'UFRT802515', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:39.5, unit:'pcs' },
  { code:'UFRT802520', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:40, unit:'pcs' },
  { code:'UFRT803215', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1¼"x½"', size_mm:32, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:68, unit:'pcs' },
  { code:'UFRT803220', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1¼"x¾"', size_mm:32, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:68, unit:'pcs' },
  { code:'UFRT803225', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1¼"x1"', size_mm:32, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:71, unit:'pcs' },
  { code:'UFRT804015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x½"', size_mm:40, standard:'ASTM D 2467', std_pkg:8, qty_box:40, rate:86.5, unit:'pcs' },
  { code:'UFRT804020', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x¾"', size_mm:40, standard:'ASTM D 2467', std_pkg:8, qty_box:40, rate:88, unit:'pcs' },
  { code:'UFRT804025', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x1"', size_mm:40, standard:'ASTM D 2467', std_pkg:8, qty_box:40, rate:86.5, unit:'pcs' },
  { code:'UFRT804032', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x1¼"', size_mm:40, standard:'ASTM D 2467', std_pkg:8, qty_box:40, rate:96, unit:'pcs' },
  { code:'UFRT805015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x½"', size_mm:50, standard:'ASTM D 2467', std_pkg:6, qty_box:24, rate:133.5, unit:'pcs' },
  { code:'UFRT805020', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x¾"', size_mm:50, standard:'ASTM D 2467', std_pkg:6, qty_box:24, rate:137, unit:'pcs' },
  { code:'UFRT805025', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x1"', size_mm:50, standard:'ASTM D 2467', std_pkg:6, qty_box:24, rate:141, unit:'pcs' },
  { code:'UFRT805032', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x1¼"', size_mm:50, standard:'ASTM D 2467', std_pkg:6, qty_box:24, rate:144.5, unit:'pcs' },
  { code:'UFRT805040', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x1½"', size_mm:50, standard:'ASTM D 2467', std_pkg:6, qty_box:24, rate:147, unit:'pcs' },

  // Reducer Coupler (SCH 80)
  { code:'UFRC802015', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:100, qty_box:400, rate:12, unit:'pcs' },
  { code:'UFRC802515', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:50, qty_box:200, rate:22, unit:'pcs' },
  { code:'UFRC802520', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:50, qty_box:200, rate:24, unit:'pcs' },
  { code:'UFRC803215', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1¼"x½"', size_mm:32, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:35, unit:'pcs' },
  { code:'UFRC803220', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1¼"x¾"', size_mm:32, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:35.5, unit:'pcs' },
  { code:'UFRC803225', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1¼"x1"', size_mm:32, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:35, unit:'pcs' },
  { code:'UFRC804015', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"x½"', size_mm:40, standard:'ASTM D 2467', std_pkg:15, qty_box:90, rate:45, unit:'pcs' },
  { code:'UFRC804020', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"x¾"', size_mm:40, standard:'ASTM D 2467', std_pkg:15, qty_box:90, rate:46.5, unit:'pcs' },
  { code:'UFRC804025', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"x1"', size_mm:40, standard:'ASTM D 2467', std_pkg:15, qty_box:90, rate:49.5, unit:'pcs' },
  { code:'UFRC804032', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"x1¼"', size_mm:40, standard:'ASTM D 2467', std_pkg:19, qty_box:90, rate:52, unit:'pcs' },
  { code:'UFRC805015', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"x½"', size_mm:50, standard:'ASTM D 2467', std_pkg:18, qty_box:72, rate:63.5, unit:'pcs' },
  { code:'UFRC805020', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"x¾"', size_mm:50, standard:'ASTM D 2467', std_pkg:17, qty_box:68, rate:65, unit:'pcs' },
  { code:'UFRC805025', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"x1"', size_mm:50, standard:'ASTM D 2467', std_pkg:15, qty_box:60, rate:75, unit:'pcs' },
  { code:'UFRC805032', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"x1¼"', size_mm:50, standard:'ASTM D 2467', std_pkg:14, qty_box:56, rate:78, unit:'pcs' },
  { code:'UFRC805040', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"x1½"', size_mm:50, standard:'ASTM D 2467', std_pkg:12, qty_box:48, rate:78, unit:'pcs' },

  // Reducer Elbow (SCH 80)
  { code:'UFRE802015', name:'Reducer Elbow', category:'reducers', subcategory:'redelbow', size:'¾"x½"', size_mm:20, standard:'ASTM D 2467', std_pkg:50, qty_box:200, rate:23.5, unit:'pcs' },
  { code:'UFRE802515', name:'Reducer Elbow', category:'reducers', subcategory:'redelbow', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:30, qty_box:150, rate:32, unit:'pcs' },
  { code:'UFRE802520', name:'Reducer Elbow', category:'reducers', subcategory:'redelbow', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:30, qty_box:150, rate:34.5, unit:'pcs' },

  // Reducer Bush (SCH 80)
  { code:'UFRB802015', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'¾"x½"', size_mm:20, standard:'ASTM D 2466', std_pkg:50, qty_box:800, rate:5, unit:'pcs' },
  { code:'UFRB802515', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1"x½"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:450, rate:13, unit:'pcs' },
  { code:'UFRB802520', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1"x¾"', size_mm:25, standard:'ASTM D 2467', std_pkg:25, qty_box:450, rate:9.5, unit:'pcs' },
  { code:'UFRB803215', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1¼"x½"', size_mm:32, standard:'ASTM D 2467', std_pkg:50, qty_box:250, rate:27, unit:'pcs' },
  { code:'UFRB803220', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1¼"x¾"', size_mm:32, standard:'ASTM D 2467', std_pkg:50, qty_box:250, rate:22, unit:'pcs' },
  { code:'UFRB803225', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1¼"x1"', size_mm:32, standard:'ASTM D 2467', std_pkg:50, qty_box:250, rate:15.5, unit:'pcs' },
  { code:'UFRB804015', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"x½"', size_mm:40, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:32, unit:'pcs' },
  { code:'UFRB804020', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"x¾"', size_mm:40, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:34.5, unit:'pcs' },
  { code:'UFRB804025', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"x1"', size_mm:40, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:25, unit:'pcs' },
  { code:'UFRB804032', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"x1¼"', size_mm:40, standard:'ASTM D 2467', std_pkg:25, qty_box:150, rate:15.5, unit:'pcs' },
  { code:'UFRB805015', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"x½"', size_mm:50, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:43.5, unit:'pcs' },
  { code:'UFRB805020', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"x¾"', size_mm:50, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:47, unit:'pcs' },
  { code:'UFRB805025', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"x1"', size_mm:50, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:51.5, unit:'pcs' },
  { code:'UFRB805032', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"x1¼"', size_mm:50, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:44.5, unit:'pcs' },
  { code:'UFRB805040', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"x1½"', size_mm:50, standard:'ASTM D 2467', std_pkg:25, qty_box:100, rate:37, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // TANK CONNECTORS — SCH 80
  // ═══════════════════════════════════════════════════════════════════════════

  // Tank Connector (Threaded) — ½"–2"
  { code:'UFTC8015', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:60, qty_box:300, rate:25.5, unit:'pcs' },
  { code:'UFTC8020', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:40, qty_box:200, rate:33, unit:'pcs' },
  { code:'UFTC8025', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:20, qty_box:120, rate:49.5, unit:'pcs' },
  { code:'UFTC8032', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:15, qty_box:75, rate:70, unit:'pcs' },
  { code:'UFTC8040', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:11, qty_box:55, rate:85, unit:'pcs' },
  { code:'UFTC8050', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:7, qty_box:35, rate:114.5, unit:'pcs' },

  // Tank Connector (Socket Type) — ½"–2"
  { code:'UFTCS8015', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'½"', size_mm:15, standard:'ASTM D 2467', std_pkg:50, qty_box:350, rate:25, unit:'pcs' },
  { code:'UFTCS8020', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'¾"', size_mm:20, standard:'ASTM D 2467', std_pkg:40, qty_box:280, rate:32, unit:'pcs' },
  { code:'UFTCS8025', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1"', size_mm:25, standard:'ASTM D 2467', std_pkg:30, qty_box:150, rate:48, unit:'pcs' },
  { code:'UFTCS8032', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1¼"', size_mm:32, standard:'ASTM D 2467', std_pkg:10, qty_box:10, rate:100, unit:'pcs' },
  { code:'UFTCS8040', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1½"', size_mm:40, standard:'ASTM D 2467', std_pkg:10, qty_box:50, rate:82.5, unit:'pcs' },
  { code:'UFTCS8050', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'2"', size_mm:50, standard:'ASTM D 2467', std_pkg:10, qty_box:50, rate:112.5, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // uPVC FITTINGS — SCH 40 as per ASTM D-2466 (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // Elbow (SCH 40) — ½"–2"
  { code:'UFE4015', name:'Elbow', category:'fittings', subcategory:'elbow', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:100, qty_box:600, rate:10.5, unit:'pcs' },
  { code:'UFE4020', name:'Elbow', category:'fittings', subcategory:'elbow', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:50, qty_box:300, rate:16, unit:'pcs' },
  { code:'UFE4025', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:25, qty_box:175, rate:25.5, unit:'pcs' },
  { code:'UFE4032', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:15, qty_box:105, rate:39.5, unit:'pcs' },
  { code:'UFE4040', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:15, qty_box:75, rate:50.5, unit:'pcs' },
  { code:'UFE4050', name:'Elbow', category:'fittings', subcategory:'elbow', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:9, qty_box:45, rate:77, unit:'pcs' },

  // Tee (SCH 40) — ½"–2"
  { code:'UFT4015', name:'Tee', category:'fittings', subcategory:'tee', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:50, qty_box:350, rate:14.5, unit:'pcs' },
  { code:'UFT4020', name:'Tee', category:'fittings', subcategory:'tee', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:50, qty_box:200, rate:18.5, unit:'pcs' },
  { code:'UFT4025', name:'Tee', category:'fittings', subcategory:'tee', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:25, qty_box:125, rate:33.5, unit:'pcs' },
  { code:'UFT4032', name:'Tee', category:'fittings', subcategory:'tee', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:10, qty_box:70, rate:51, unit:'pcs' },
  { code:'UFT4040', name:'Tee', category:'fittings', subcategory:'tee', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:0, qty_box:53, rate:68, unit:'pcs' },
  { code:'UFT4050', name:'Tee', category:'fittings', subcategory:'tee', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:0, qty_box:33, rate:97, unit:'pcs' },

  // Coupler (SCH 40) — ½"–2"
  { code:'UFC4015', name:'Coupler', category:'fittings', subcategory:'coupler', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:100, qty_box:800, rate:7, unit:'pcs' },
  { code:'UFC4020', name:'Coupler', category:'fittings', subcategory:'coupler', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:100, qty_box:400, rate:11.5, unit:'pcs' },
  { code:'UFC4025', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:50, qty_box:250, rate:17.5, unit:'pcs' },
  { code:'UFC4032', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:25, qty_box:150, rate:24.5, unit:'pcs' },
  { code:'UFC4040', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:20, qty_box:100, rate:31, unit:'pcs' },
  { code:'UFC4050', name:'Coupler', category:'fittings', subcategory:'coupler', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:10, qty_box:60, rate:46.5, unit:'pcs' },

  // Cross Tee (SCH 40) — ½"–1"
  { code:'UFCT4015', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:40, qty_box:200, rate:23, unit:'pcs' },
  { code:'UFCT4020', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:20, qty_box:60, rate:30.5, unit:'pcs' },
  { code:'UFCT4025', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:20, qty_box:80, rate:54.5, unit:'pcs' },

  // M.T.A. (SCH 40) — ½"–2"
  { code:'UFM4015', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:100, qty_box:1100, rate:6.5, unit:'pcs' },
  { code:'UFM4020', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:50, qty_box:550, rate:10, unit:'pcs' },
  { code:'UFM4025', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:50, qty_box:350, rate:14.5, unit:'pcs' },
  { code:'UFM4032', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:25, qty_box:175, rate:20.5, unit:'pcs' },
  { code:'UFM4040', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:25, qty_box:150, rate:28.5, unit:'pcs' },
  { code:'UFM4050', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:15, qty_box:90, rate:39.5, unit:'pcs' },

  // F.T.A. (SCH 40) — ½"–2"
  { code:'UFF4015', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:100, qty_box:800, rate:7, unit:'pcs' },
  { code:'UFF4020', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:50, qty_box:500, rate:10, unit:'pcs' },
  { code:'UFF4025', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:50, qty_box:300, rate:17, unit:'pcs' },
  { code:'UFF4032', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:25, qty_box:150, rate:24.5, unit:'pcs' },
  { code:'UFF4040', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:20, qty_box:120, rate:30, unit:'pcs' },
  { code:'UFF4050', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:15, qty_box:75, rate:47, unit:'pcs' },

  // Elbow 45° (SCH 40)
  { code:'UFE454015', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:100, qty_box:500, rate:11.5, unit:'pcs' },
  { code:'UFE454020', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:50, qty_box:250, rate:17, unit:'pcs' },
  { code:'UFE454025', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:25, qty_box:150, rate:24, unit:'pcs' },

  // Flange
  { code:'UFFG25', name:'Flange', category:'fittings', subcategory:'flange', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:4, qty_box:32, rate:97, unit:'pcs' },
  { code:'UFFG40', name:'Flange', category:'fittings', subcategory:'flange', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:1, qty_box:20, rate:172, unit:'pcs' },
  { code:'UFFG50', name:'Flange', category:'fittings', subcategory:'flange', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:1, qty_box:16, rate:222.5, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // REDUCER FITTINGS — SCH 40 as per ASTM D-2466
  // ═══════════════════════════════════════════════════════════════════════════

  // Reducer Tee (SCH 40)
  { code:'UFRT402515', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1"x½"', size_mm:25, standard:'ASTM D 2466', std_pkg:25, qty_box:150, rate:33.5, unit:'pcs' },
  { code:'UFRT404015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x½"', size_mm:40, standard:'ASTM D 2466', std_pkg:0, qty_box:60, rate:67, unit:'pcs' },
  { code:'UFRT404020', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x¾"', size_mm:40, standard:'ASTM D 2466', std_pkg:0, qty_box:60, rate:70, unit:'pcs' },
  { code:'UFRT404032', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"x1¼"', size_mm:40, standard:'ASTM D 2466', std_pkg:0, qty_box:48, rate:78, unit:'pcs' },
  { code:'UFRT405015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x½"', size_mm:50, standard:'ASTM D 2466', std_pkg:0, qty_box:48, rate:107, unit:'pcs' },
  { code:'UFRT405020', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x¾"', size_mm:50, standard:'ASTM D 2466', std_pkg:0, qty_box:40, rate:107, unit:'pcs' },
  { code:'UFRT405025', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x1"', size_mm:50, standard:'ASTM D 2466', std_pkg:0, qty_box:30, rate:110, unit:'pcs' },
  { code:'UFRT405032', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x1¼"', size_mm:50, standard:'ASTM D 2466', std_pkg:0, qty_box:38, rate:112, unit:'pcs' },
  { code:'UFRT405040', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"x1½"', size_mm:50, standard:'ASTM D 2466', std_pkg:0, qty_box:38, rate:105.5, unit:'pcs' },

  // Reducer Coupler (SCH 40)
  { code:'UFRC402515', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1"x½"', size_mm:25, standard:'ASTM D 2466', std_pkg:50, qty_box:350, rate:17, unit:'pcs' },
  { code:'UFRC402520', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1"x¾"', size_mm:25, standard:'ASTM D 2466', std_pkg:50, qty_box:250, rate:19.5, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // BALL VALVES & CONCEALED VALVES (HSN Code: 3917)
  // ═══════════════════════════════════════════════════════════════════════════

  // Compact Ball Valve — Short Handle
  { code:'UFCBV15', name:'Compact Ball Valve (Short)', category:'valves', subcategory:'compactbvshort', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:30, qty_box:300, rate:70, unit:'pcs' },
  { code:'UFCBV20', name:'Compact Ball Valve (Short)', category:'valves', subcategory:'compactbvshort', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:20, qty_box:200, rate:102, unit:'pcs' },
  { code:'UFCBV25', name:'Compact Ball Valve (Short)', category:'valves', subcategory:'compactbvshort', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:12, qty_box:120, rate:173.5, unit:'pcs' },
  { code:'UFCBV32', name:'Compact Ball Valve (Short)', category:'valves', subcategory:'compactbvshort', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:6, qty_box:60, rate:229, unit:'pcs' },
  { code:'UFCBV40', name:'Compact Ball Valve (Short)', category:'valves', subcategory:'compactbvshort', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:5, qty_box:50, rate:345, unit:'pcs' },
  { code:'UFCBV50', name:'Compact Ball Valve (Short)', category:'valves', subcategory:'compactbvshort', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:3, qty_box:30, rate:553, unit:'pcs' },

  // Compact Ball Valve — Long Handle
  { code:'UFCBVL15', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:28, qty_box:280, rate:73, unit:'pcs' },
  { code:'UFCBVL20', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:18, qty_box:180, rate:107, unit:'pcs' },
  { code:'UFCBVL25', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:10, qty_box:100, rate:178.5, unit:'pcs' },
  { code:'UFCBVL32', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:6, qty_box:60, rate:236, unit:'pcs' },
  { code:'UFCBVL40', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:4, qty_box:40, rate:357, unit:'pcs' },
  { code:'UFCBVL50', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:3, qty_box:30, rate:574.5, unit:'pcs' },
  { code:'UFCBVL65', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'2½"', size_mm:65, standard:'ASTM D 2466', std_pkg:1, qty_box:4, rate:1543.5, unit:'pcs' },
  { code:'UFCBVL80', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'3"', size_mm:80, standard:'ASTM D 2466', std_pkg:1, qty_box:2, rate:1923, unit:'pcs' },
  { code:'UFCBVL100', name:'Compact Ball Valve (Long)', category:'valves', subcategory:'compactbvlong', size:'4"', size_mm:100, standard:'ASTM D 2466', std_pkg:1, qty_box:1, rate:4390, unit:'pcs' },

  // Compact Threaded Ball Valve — Long Handle
  { code:'UFCTBVL15', name:'Compact Threaded Ball Valve (Long)', category:'valves', subcategory:'threadedbvlong', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:28, qty_box:280, rate:78, unit:'pcs' },
  { code:'UFCTBVL20', name:'Compact Threaded Ball Valve (Long)', category:'valves', subcategory:'threadedbvlong', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:18, qty_box:180, rate:114, unit:'pcs' },
  { code:'UFCTBVL25', name:'Compact Threaded Ball Valve (Long)', category:'valves', subcategory:'threadedbvlong', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:10, qty_box:100, rate:190, unit:'pcs' },
  { code:'UFCTBVL32', name:'Compact Threaded Ball Valve (Long)', category:'valves', subcategory:'threadedbvlong', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:6, qty_box:60, rate:250, unit:'pcs' },
  { code:'UFCTBVL40', name:'Compact Threaded Ball Valve (Long)', category:'valves', subcategory:'threadedbvlong', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:4, qty_box:40, rate:371, unit:'pcs' },
  { code:'UFCTBVL50', name:'Compact Threaded Ball Valve (Long)', category:'valves', subcategory:'threadedbvlong', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:3, qty_box:30, rate:592, unit:'pcs' },

  // Ball Valve
  { code:'UFBV15', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:1, qty_box:140, rate:70, unit:'pcs' },
  { code:'UFBV20', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:1, qty_box:100, rate:110, unit:'pcs' },
  { code:'UFBV25', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:1, qty_box:60, rate:180, unit:'pcs' },
  { code:'UFBV32', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:1, qty_box:36, rate:270, unit:'pcs' },
  { code:'UFBV40', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:1, qty_box:28, rate:385, unit:'pcs' },
  { code:'UFBV50', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:1, qty_box:16, rate:665, unit:'pcs' },

  // Concealed Valve (Quarter Turn) — Long Triangle Knob
  { code:'UFCVLT15', name:'Concealed Valve Long', category:'valves', subcategory:'concealedlong', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:1000, unit:'pcs' },
  { code:'UFCVLT20', name:'Concealed Valve Long', category:'valves', subcategory:'concealedlong', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:1050, unit:'pcs' },

  // Concealed Valve (Quarter Turn) — Short Triangle Knob
  { code:'UFCVST15', name:'Concealed Valve Short', category:'valves', subcategory:'concealedshort', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:875, unit:'pcs' },
  { code:'UFCVST20', name:'Concealed Valve Short', category:'valves', subcategory:'concealedshort', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:1, qty_box:18, rate:925, unit:'pcs' },

  // Non Return Valve
  { code:'UFNRV20', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:1, qty_box:25, rate:184, unit:'pcs' },
  { code:'UFNRV25', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:1, qty_box:16, rate:281, unit:'pcs' },
  { code:'UFNRV32', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:1, qty_box:21, rate:547, unit:'pcs' },
  { code:'UFNRV40', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:1, qty_box:9, rate:793, unit:'pcs' },

  // Long Plug
  { code:'UFLPW15', name:'Long Plug', category:'fittings', subcategory:'longplug', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:100, qty_box:500, rate:7, unit:'pcs' },

  // Bend 90°
  { code:'UFB9015', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'½"', size_mm:15, standard:'ASTM D 2466', std_pkg:40, qty_box:120, rate:33.5, unit:'pcs' },
  { code:'UFB9020', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'¾"', size_mm:20, standard:'ASTM D 2466', std_pkg:30, qty_box:90, rate:40.5, unit:'pcs' },
  { code:'UFB9025', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1"', size_mm:25, standard:'ASTM D 2466', std_pkg:20, qty_box:60, rate:68, unit:'pcs' },
  { code:'UFB9032', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1¼"', size_mm:32, standard:'ASTM D 2466', std_pkg:10, qty_box:30, rate:102.5, unit:'pcs' },
  { code:'UFB9040', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1½"', size_mm:40, standard:'ASTM D 2466', std_pkg:8, qty_box:24, rate:123.5, unit:'pcs' },
  { code:'UFB9050', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'2"', size_mm:50, standard:'ASTM D 2466', std_pkg:4, qty_box:12, rate:215.5, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCESSORIES — PTFE Tape, Solvent Cement, Primer
  // ═══════════════════════════════════════════════════════════════════════════

  // PTFE Tape (HSN Code: 3920)
  { code:'PTY12', name:'PTFE Tape (Yellow) 12mm', category:'accessories', subcategory:'ptfetape', size:'12mm', size_mm:12, standard:'HSN 3920', std_pkg:250, qty_box:1000, rate:25, unit:'pcs', info:'10 mtc.' },
  { code:'PTY19', name:'PTFE Tape (Yellow) 19mm', category:'accessories', subcategory:'ptfetape', size:'19mm', size_mm:19, standard:'HSN 3920', std_pkg:250, qty_box:1000, rate:35, unit:'pcs', info:'10 mtc.' },
  { code:'PTW12', name:'PTFE Tape (White) 12mm', category:'accessories', subcategory:'ptfetape', size:'12mm', size_mm:12, standard:'HSN 3920', std_pkg:250, qty_box:1000, rate:20, unit:'pcs', info:'10 mtc.' },

  // PVC Solvent Cement — 77 Heavy Duty (HSN Code: 3506)
  { code:'UFSCH20', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'20ml', size_mm:0, standard:'HSN 3506', std_pkg:50, qty_box:600, rate:43, unit:'pcs', info:'Tube' },
  { code:'UFSCH50', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'50ml', size_mm:0, standard:'HSN 3506', std_pkg:50, qty_box:300, rate:73, unit:'pcs', info:'Tube' },
  { code:'UFSCH59', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'59ml', size_mm:0, standard:'HSN 3506', std_pkg:30, qty_box:240, rate:105, unit:'pcs', info:'Tin' },
  { code:'UFSCH118', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'118ml', size_mm:0, standard:'HSN 3506', std_pkg:24, qty_box:144, rate:155, unit:'pcs', info:'Tin' },
  { code:'UFSCH237', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'237ml', size_mm:0, standard:'HSN 3506', std_pkg:24, qty_box:96, rate:275, unit:'pcs', info:'Tin' },
  { code:'UFSCH473', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'473ml', size_mm:0, standard:'HSN 3506', std_pkg:12, qty_box:48, rate:500, unit:'pcs', info:'Tin' },
  { code:'UFSCH946', name:'PVC Solvent Cement 77 HD', category:'accessories', subcategory:'solventhd', size:'946ml', size_mm:0, standard:'HSN 3506', std_pkg:6, qty_box:24, rate:900, unit:'pcs', info:'Tin' },

  // PVC Solvent Cement — 57 Medium Duty (HSN Code: 3506)
  { code:'UFSCM20', name:'PVC Solvent Cement 57 MD', category:'accessories', subcategory:'solventmd', size:'20ml', size_mm:0, standard:'HSN 3506', std_pkg:50, qty_box:600, rate:33, unit:'pcs', info:'Tube' },
  { code:'UFSCM50', name:'PVC Solvent Cement 57 MD', category:'accessories', subcategory:'solventmd', size:'50ml', size_mm:0, standard:'HSN 3506', std_pkg:50, qty_box:300, rate:60, unit:'pcs', info:'Tube' },
  { code:'UFSCM118', name:'PVC Solvent Cement 57 MD', category:'accessories', subcategory:'solventmd', size:'118ml', size_mm:0, standard:'HSN 3506', std_pkg:24, qty_box:144, rate:140, unit:'pcs', info:'Tin' },
  { code:'UFSCM237', name:'PVC Solvent Cement 57 MD', category:'accessories', subcategory:'solventmd', size:'237ml', size_mm:0, standard:'HSN 3506', std_pkg:24, qty_box:96, rate:245, unit:'pcs', info:'Tin' },
  { code:'UFSCM473', name:'PVC Solvent Cement 57 MD', category:'accessories', subcategory:'solventmd', size:'473ml', size_mm:0, standard:'HSN 3506', std_pkg:12, qty_box:48, rate:440, unit:'pcs', info:'Tin' },
  { code:'UFSCM946', name:'PVC Solvent Cement 57 MD', category:'accessories', subcategory:'solventmd', size:'946ml', size_mm:0, standard:'HSN 3506', std_pkg:6, qty_box:24, rate:800, unit:'pcs', info:'Tin' },

  // Primer (HSN Code: 3506)
  { code:'CUFP473', name:'Primer', category:'accessories', subcategory:'primer', size:'473ml', size_mm:0, standard:'HSN 3506', std_pkg:12, qty_box:48, rate:400, unit:'pcs', info:'Tin' },

  // ═══════════════════════════════════════════════════════════════════════════
  // LARGE SIZE FITTINGS — SCH 80 (2½"–6")
  // ═══════════════════════════════════════════════════════════════════════════

  // Elbow (Large)
  { code:'UFE65', name:'Elbow', category:'fittings', subcategory:'elbow', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:207.5, unit:'pcs' },
  { code:'UFE80', name:'Elbow', category:'fittings', subcategory:'elbow', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:304.5, unit:'pcs' },
  { code:'UFE100', name:'Elbow', category:'fittings', subcategory:'elbow', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:3, rate:537.5, unit:'pcs' },
  { code:'UFE150', name:'Elbow', category:'fittings', subcategory:'elbow', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:1500, unit:'pcs' },

  // Tee (Large)
  { code:'UFT65', name:'Tee', category:'fittings', subcategory:'tee', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:257.5, unit:'pcs' },
  { code:'UFT80', name:'Tee', category:'fittings', subcategory:'tee', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:4, rate:391.5, unit:'pcs' },
  { code:'UFT100', name:'Tee', category:'fittings', subcategory:'tee', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:691, unit:'pcs' },
  { code:'UFT150', name:'Tee', category:'fittings', subcategory:'tee', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:1810, unit:'pcs' },

  // Coupler (Large)
  { code:'UFC65', name:'Coupler', category:'fittings', subcategory:'coupler', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:4, qty_box:20, rate:122, unit:'pcs' },
  { code:'UFC80', name:'Coupler', category:'fittings', subcategory:'coupler', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:172, unit:'pcs' },
  { code:'UFC100', name:'Coupler', category:'fittings', subcategory:'coupler', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:281, unit:'pcs' },
  { code:'UFC150', name:'Coupler', category:'fittings', subcategory:'coupler', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:650, unit:'pcs' },

  // End Cap (Large)
  { code:'UFEC65', name:'End Cap', category:'fittings', subcategory:'endcap', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:6, qty_box:18, rate:91.5, unit:'pcs' },
  { code:'UFEC80', name:'End Cap', category:'fittings', subcategory:'endcap', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:12, rate:130.5, unit:'pcs' },
  { code:'UFEC100', name:'End Cap', category:'fittings', subcategory:'endcap', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:2, qty_box:8, rate:226, unit:'pcs' },
  { code:'UFEC150', name:'End Cap', category:'fittings', subcategory:'endcap', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:8, rate:610, unit:'pcs' },

  // F.T.A. (Large)
  { code:'UFF65', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:18, rate:106, unit:'pcs' },
  { code:'UFF80', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:10, rate:145.5, unit:'pcs' },
  { code:'UFF100', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:239, unit:'pcs' },
  { code:'UFF150', name:'F.T.A.', category:'fittings', subcategory:'fta', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:1231, unit:'pcs' },

  // M.T.A. (Large)
  { code:'UFM65', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:18, rate:105, unit:'pcs' },
  { code:'UFM80', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:10, rate:146, unit:'pcs' },
  { code:'UFM100', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:244, unit:'pcs' },
  { code:'UFM150', name:'M.T.A.', category:'fittings', subcategory:'mta', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:1225, unit:'pcs' },

  // Union (Large)
  { code:'UFU65', name:'Union', category:'fittings', subcategory:'union', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:433, unit:'pcs' },
  { code:'UFU80', name:'Union', category:'fittings', subcategory:'union', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:585, unit:'pcs' },
  { code:'UFU100', name:'Union', category:'fittings', subcategory:'union', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:918, unit:'pcs' },

  // Elbow 45° (Large)
  { code:'UFE4565', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:173.5, unit:'pcs' },
  { code:'UFE4580', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:4, rate:249, unit:'pcs' },
  { code:'UFE45100', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:3, rate:427, unit:'pcs' },
  { code:'UFE45150', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:1800, unit:'pcs' },

  // Flange (Large)
  { code:'UFFG65', name:'Flange', category:'fittings', subcategory:'flange', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:20, rate:323, unit:'pcs' },
  { code:'UFFG80', name:'Flange', category:'fittings', subcategory:'flange', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:16, rate:430.5, unit:'pcs' },
  { code:'UFFG100', name:'Flange', category:'fittings', subcategory:'flange', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:12, rate:606, unit:'pcs' },
  { code:'UFFG150', name:'Flange', category:'fittings', subcategory:'flange', size:'6"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:3, rate:968, unit:'pcs' },

  // Brass F.T.A. (Large)
  { code:'UFBF65', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:8, rate:1144, unit:'pcs' },
  { code:'UFBF80', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:1, qty_box:6, rate:1396.5, unit:'pcs' },
  { code:'UFBF100', name:'Brass F.T.A.', category:'brass', subcategory:'brassfta', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:2105, unit:'pcs' },

  // Brass M.T.A. (Large)
  { code:'UFBM65', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:8, rate:1412, unit:'pcs' },
  { code:'UFBM80', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:1, qty_box:6, rate:1693, unit:'pcs' },
  { code:'UFBM100', name:'Brass M.T.A.', category:'brass', subcategory:'brassmta', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:2548.5, unit:'pcs' },

  // Tank Connector — Socket Type (Large)
  { code:'UFTCS65', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'2½"', size_mm:65, standard:'ASTM D 2467', std_pkg:3, qty_box:9, rate:235, unit:'pcs' },
  { code:'UFTCS80', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'3"', size_mm:80, standard:'ASTM D 2467', std_pkg:1, qty_box:6, rate:295.5, unit:'pcs' },
  { code:'UFTCS100', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'4"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:507.5, unit:'pcs' },

  // ═══════════════════════════════════════════════════════════════════════════
  // LARGE SIZE REDUCERS — SCH 80 (2½"–6")
  // ═══════════════════════════════════════════════════════════════════════════

  // Reducer Tee (Large)
  { code:'UFRT6525', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2½"x1"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:235, unit:'pcs' },
  { code:'UFRT6540', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2½"x1½"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:240, unit:'pcs' },
  { code:'UFRT6550', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2½"x2"', size_mm:65, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:246.5, unit:'pcs' },
  { code:'UFRT8040', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'3"x1½"', size_mm:80, standard:'ASTM D 2467', std_pkg:10, qty_box:4, rate:349, unit:'pcs' },
  { code:'UFRT8050', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'3"x2"', size_mm:80, standard:'ASTM D 2467', std_pkg:10, qty_box:4, rate:356, unit:'pcs' },
  { code:'UFRT8065', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'3"x2½"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:4, rate:373, unit:'pcs' },
  { code:'UFRT10040', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"x1½"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:606, unit:'pcs' },
  { code:'UFRT10050', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"x2"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:614, unit:'pcs' },
  { code:'UFRT10065', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"x2½"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:631, unit:'pcs' },
  { code:'UFRT10080', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"x3"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:644.5, unit:'pcs' },
  { code:'UFRT15075', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'6"x2½"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:2135, unit:'pcs' },
  { code:'UFRT150100', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'6"x4"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:2, rate:2165, unit:'pcs' },

  // Reducer Coupler (Large)
  { code:'UFRC6540', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2½"x1½"', size_mm:65, standard:'ASTM D 2467', std_pkg:3, qty_box:9, rate:106, unit:'pcs' },
  { code:'UFRC6550', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2½"x2"', size_mm:65, standard:'ASTM D 2467', std_pkg:3, qty_box:9, rate:108, unit:'pcs' },
  { code:'UFRC8050', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'3"x2"', size_mm:80, standard:'ASTM D 2467', std_pkg:10, qty_box:6, rate:144.5, unit:'pcs' },
  { code:'UFRC8065', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'3"x2½"', size_mm:80, standard:'ASTM D 2467', std_pkg:2, qty_box:6, rate:162.5, unit:'pcs' },
  { code:'UFRC10050', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'4"x2"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:211, unit:'pcs' },
  { code:'UFRC10065', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'4"x2½"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:257.5, unit:'pcs' },
  { code:'UFRC10090', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'4"x3"', size_mm:100, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:264, unit:'pcs' },
  { code:'UFRC15065', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'6"x2½"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:740, unit:'pcs' },
  { code:'UFRC150100', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'6"x4"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:4, rate:765, unit:'pcs' },

  // Reducer Bush (Large)
  { code:'UFRB6550', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2½"x2"', size_mm:65, standard:'ASTM D 2467', std_pkg:4, qty_box:20, rate:65.5, unit:'pcs' },
  { code:'UFRB8050', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'3"x2"', size_mm:80, standard:'ASTM D 2467', std_pkg:4, qty_box:12, rate:134.5, unit:'pcs' },
  { code:'UFRB8065', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'3"x2½"', size_mm:80, standard:'ASTM D 2467', std_pkg:4, qty_box:12, rate:106, unit:'pcs' },
  { code:'UFRB10050', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'4"x2"', size_mm:100, standard:'ASTM D 2467', std_pkg:2, qty_box:8, rate:218.5, unit:'pcs' },
  { code:'UFRB10065', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'4"x2½"', size_mm:100, standard:'ASTM D 2467', std_pkg:2, qty_box:8, rate:241.5, unit:'pcs' },
  { code:'UFRB10080', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'4"x3"', size_mm:100, standard:'ASTM D 2467', std_pkg:2, qty_box:8, rate:211, unit:'pcs' },
  { code:'UFRB15050', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'6"x2"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:8, rate:600, unit:'pcs' },
  { code:'UFRB15080', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'6"x3"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:8, rate:585, unit:'pcs' },
  { code:'UFRB150110', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'6"x4"', size_mm:150, standard:'ASTM D 2467', std_pkg:1, qty_box:8, rate:590, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
