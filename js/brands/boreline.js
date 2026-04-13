// Boreline Column Pipes — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in | Prices from PRICE LIST.xls
// Rates are per piece (pcs) | HSN 3917

var PRODUCTS = [

  // ─── ECO BORE ──────────────────────────────────────────────────────────────────
  { code:'BL-ECO25',  name:'Column ECO BORE', category:'pipes', subcategory:'eco_bore', size:'25mm (1")',   size_mm:25,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:292, unit:'pcs' },
  { code:'BL-ECO32',  name:'Column ECO BORE', category:'pipes', subcategory:'eco_bore', size:'32mm (1\u00BC")', size_mm:32,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:429, unit:'pcs' },
  { code:'BL-ECO40',  name:'Column ECO BORE', category:'pipes', subcategory:'eco_bore', size:'40mm (1\u00BD")', size_mm:40,  standard:'IS 12818', hsn:'3917', qty_box:20, rate:559, unit:'pcs' },
  { code:'BL-ECO50',  name:'Column ECO BORE', category:'pipes', subcategory:'eco_bore', size:'50mm (2")',   size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:12, rate:687, unit:'pcs' },

  // ─── EASY BORE ─────────────────────────────────────────────────────────────────
  { code:'BL-EASY25', name:'Column EASY BORE', category:'pipes', subcategory:'easy_bore', size:'25mm (1")',   size_mm:25,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:363, unit:'pcs' },
  { code:'BL-EASY32', name:'Column EASY BORE', category:'pipes', subcategory:'easy_bore', size:'32mm (1\u00BC")', size_mm:32,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:529, unit:'pcs' },
  { code:'BL-EASY40', name:'Column EASY BORE', category:'pipes', subcategory:'easy_bore', size:'40mm (1\u00BD")', size_mm:40,  standard:'IS 12818', hsn:'3917', qty_box:20, rate:662, unit:'pcs' },
  { code:'BL-EASY50', name:'Column EASY BORE', category:'pipes', subcategory:'easy_bore', size:'50mm (2")',   size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:12, rate:832, unit:'pcs' },

  // ─── MEDIUM BORE ───────────────────────────────────────────────────────────────
  { code:'BL-MED50',  name:'Column MEDIUM BORE', category:'pipes', subcategory:'medium_bore', size:'50mm (2")',   size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:12, rate:858,  unit:'pcs' },
  { code:'BL-MED65',  name:'Column MEDIUM BORE', category:'pipes', subcategory:'medium_bore', size:'65mm (2\u00BD")', size_mm:65,  standard:'IS 12818', hsn:'3917', qty_box:8,  rate:1161, unit:'pcs' },
  { code:'BL-MED80',  name:'Column MEDIUM BORE', category:'pipes', subcategory:'medium_bore', size:'80mm (3")',   size_mm:80,  standard:'IS 12818', hsn:'3917', qty_box:5,  rate:1519, unit:'pcs' },
  { code:'BL-MED100', name:'Column MEDIUM BORE', category:'pipes', subcategory:'medium_bore', size:'100mm (4")',  size_mm:100, standard:'IS 12818', hsn:'3917', qty_box:4,  rate:2314, unit:'pcs' },

  // ─── ULTRA BORE ────────────────────────────────────────────────────────────────
  { code:'BL-ULT25',  name:'Column ULTRA BORE', category:'pipes', subcategory:'ultra_bore', size:'25mm (1")',   size_mm:25,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:456,  unit:'pcs' },
  { code:'BL-ULT32',  name:'Column ULTRA BORE', category:'pipes', subcategory:'ultra_bore', size:'32mm (1\u00BC")', size_mm:32,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:609,  unit:'pcs' },
  { code:'BL-ULT40',  name:'Column ULTRA BORE', category:'pipes', subcategory:'ultra_bore', size:'40mm (1\u00BD")', size_mm:40,  standard:'IS 12818', hsn:'3917', qty_box:20, rate:792,  unit:'pcs' },
  { code:'BL-ULT50',  name:'Column ULTRA BORE', category:'pipes', subcategory:'ultra_bore', size:'50mm (2")',   size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:12, rate:1066, unit:'pcs' },
  { code:'BL-ULT100', name:'Column ULTRA BORE', category:'pipes', subcategory:'ultra_bore', size:'100mm (4")',  size_mm:100, standard:'IS 12818', hsn:'3917', qty_box:4,  rate:2618, unit:'pcs' },

  // ─── STANDARD BORE ─────────────────────────────────────────────────────────────
  { code:'BL-STD25',  name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'25mm (1")',   size_mm:25,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:519,  unit:'pcs' },
  { code:'BL-STD32',  name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'32mm (1\u00BC")', size_mm:32,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:744,  unit:'pcs' },
  { code:'BL-STD40',  name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'40mm (1\u00BD")', size_mm:40,  standard:'IS 12818', hsn:'3917', qty_box:20, rate:912,  unit:'pcs' },
  { code:'BL-STD50',  name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'50mm (2")',   size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:12, rate:1171, unit:'pcs' },
  { code:'BL-STD65',  name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'65mm (2\u00BD")', size_mm:65,  standard:'IS 12818', hsn:'3917', qty_box:8,  rate:1561, unit:'pcs' },
  { code:'BL-STD80',  name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'80mm (3")',   size_mm:80,  standard:'IS 12818', hsn:'3917', qty_box:5,  rate:1991, unit:'pcs' },
  { code:'BL-STD100', name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'100mm (4")',  size_mm:100, standard:'IS 12818', hsn:'3917', qty_box:4,  rate:3061, unit:'pcs' },
  { code:'BL-STD125', name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'125mm (5")',  size_mm:125, standard:'IS 12818', hsn:'3917', qty_box:3,  rate:5321, unit:'pcs' },
  { code:'BL-STD150', name:'Column STANDARD BORE', category:'pipes', subcategory:'standard_bore', size:'150mm (6")',  size_mm:150, standard:'IS 12818', hsn:'3917', qty_box:1,  rate:7138, unit:'pcs' },

  // ─── HEAVY BORE ────────────────────────────────────────────────────────────────
  { code:'BL-HVY25',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'25mm (1")',    size_mm:25,  standard:'IS 12818', hsn:'3917', qty_box:25, rate:614,  unit:'pcs' },
  { code:'BL-HVY32',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'32mm (1\u00BC")',  size_mm:32,  standard:'IS 12818', hsn:'3917', qty_box:20, rate:952,  unit:'pcs' },
  { code:'BL-HVY40',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'40mm (1\u00BD")',  size_mm:40,  standard:'IS 12818', hsn:'3917', qty_box:15, rate:1146, unit:'pcs' },
  { code:'BL-HVY50',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'50mm (2")',    size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:12, rate:1363, unit:'pcs' },
  { code:'BL-HVY60',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'60mm (2\u00BC")',  size_mm:60,  standard:'IS 12818', hsn:'3917', qty_box:10, rate:1398, unit:'pcs' },
  { code:'BL-HVY65',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'65mm (2\u00BD")',  size_mm:65,  standard:'IS 12818', hsn:'3917', qty_box:8,  rate:2126, unit:'pcs' },
  { code:'BL-HVY80',  name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'80mm (3")',    size_mm:80,  standard:'IS 12818', hsn:'3917', qty_box:5,  rate:2726, unit:'pcs' },
  { code:'BL-HVY100', name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'100mm (4")',   size_mm:100, standard:'IS 12818', hsn:'3917', qty_box:4,  rate:4449, unit:'pcs' },
  { code:'BL-HVY125', name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'125mm (5")',   size_mm:125, standard:'IS 12818', hsn:'3917', qty_box:3,  rate:6477, unit:'pcs' },
  { code:'BL-HVY150', name:'Column HEAVY BORE', category:'pipes', subcategory:'heavy_bore', size:'150mm (6")',   size_mm:150, standard:'IS 12818', hsn:'3917', qty_box:1,  rate:8414, unit:'pcs' },

  // ─── HEAVY PLUS BORE ──────────────────────────────────────────────────────────
  { code:'BL-HVP60',  name:'Column HEAVY PLUS BORE', category:'pipes', subcategory:'heavy_plus_bore', size:'60mm (2\u00BC")', size_mm:60, standard:'IS 12818', hsn:'3917', qty_box:10, rate:1800, unit:'pcs' },

  // ─── SUPER HEAVY BORE ─────────────────────────────────────────────────────────
  { code:'BL-SHV50',  name:'Column SUPER HEAVY BORE', category:'pipes', subcategory:'super_heavy_bore', size:'50mm (2")',   size_mm:50,  standard:'IS 12818', hsn:'3917', qty_box:8, rate:1821, unit:'pcs' },
  { code:'BL-SHV65',  name:'Column SUPER HEAVY BORE', category:'pipes', subcategory:'super_heavy_bore', size:'65mm (2\u00BD")', size_mm:65,  standard:'IS 12818', hsn:'3917', qty_box:5, rate:2873, unit:'pcs' },
  { code:'BL-SHV80',  name:'Column SUPER HEAVY BORE', category:'pipes', subcategory:'super_heavy_bore', size:'80mm (3")',   size_mm:80,  standard:'IS 12818', hsn:'3917', qty_box:4, rate:3774, unit:'pcs' },
  { code:'BL-SHV100', name:'Column SUPER HEAVY BORE', category:'pipes', subcategory:'super_heavy_bore', size:'100mm (4")',  size_mm:100, standard:'IS 12818', hsn:'3917', qty_box:3, rate:6145, unit:'pcs' },

  // ─── ECO BORE (Bell Ended) ────────────────────────────────────────────────────
  { code:'BL-ECOBE25', name:'Column ECO BORE (Bell Ended)', category:'pipes', subcategory:'eco_bore_be', size:'25mm (1")',   size_mm:25, standard:'IS 12818', hsn:'3917', qty_box:25, rate:261, unit:'pcs' },
  { code:'BL-ECOBE32', name:'Column ECO BORE (Bell Ended)', category:'pipes', subcategory:'eco_bore_be', size:'32mm (1\u00BC")', size_mm:32, standard:'IS 12818', hsn:'3917', qty_box:25, rate:389, unit:'pcs' },
  { code:'BL-ECOBE40', name:'Column ECO BORE (Bell Ended)', category:'pipes', subcategory:'eco_bore_be', size:'40mm (1\u00BD")', size_mm:40, standard:'IS 12818', hsn:'3917', qty_box:20, rate:514, unit:'pcs' },

  // ─── EASY BORE (Bell Ended) ───────────────────────────────────────────────────
  { code:'BL-EASYBE25', name:'Column EASY BORE (Bell Ended)', category:'pipes', subcategory:'easy_bore_be', size:'25mm (1")',   size_mm:25, standard:'IS 12818', hsn:'3917', qty_box:25, rate:296, unit:'pcs' },
  { code:'BL-EASYBE32', name:'Column EASY BORE (Bell Ended)', category:'pipes', subcategory:'easy_bore_be', size:'32mm (1\u00BC")', size_mm:32, standard:'IS 12818', hsn:'3917', qty_box:25, rate:447, unit:'pcs' },
  { code:'BL-EASYBE40', name:'Column EASY BORE (Bell Ended)', category:'pipes', subcategory:'easy_bore_be', size:'40mm (1\u00BD")', size_mm:40, standard:'IS 12818', hsn:'3917', qty_box:20, rate:563, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
