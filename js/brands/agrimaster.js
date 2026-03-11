// AgriMaster Agriculture — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// Placeholder data — update with actual prices from PDF

var PRODUCTS = [
  // Agriculture Pipes
  { code:'AGP63',  name:'Agri Pipe', category:'pipes', subcategory:'agri_pipe', size:'63mm',  size_mm:63,  standard:'IS 4985', qty_per_length:1, pipe_length:6, rate:280.00, unit:'pc/6m' },
  { code:'AGP75',  name:'Agri Pipe', category:'pipes', subcategory:'agri_pipe', size:'75mm',  size_mm:75,  standard:'IS 4985', qty_per_length:1, pipe_length:6, rate:395.00, unit:'pc/6m' },
  { code:'AGP90',  name:'Agri Pipe', category:'pipes', subcategory:'agri_pipe', size:'90mm',  size_mm:90,  standard:'IS 4985', qty_per_length:1, pipe_length:6, rate:560.00, unit:'pc/6m' },
  { code:'AGP110', name:'Agri Pipe', category:'pipes', subcategory:'agri_pipe', size:'110mm', size_mm:110, standard:'IS 4985', qty_per_length:1, pipe_length:6, rate:840.00, unit:'pc/6m' },
  { code:'AGP140', name:'Agri Pipe', category:'pipes', subcategory:'agri_pipe', size:'140mm', size_mm:140, standard:'IS 4985', qty_per_length:1, pipe_length:6, rate:1350.00, unit:'pc/6m' },
  { code:'AGP160', name:'Agri Pipe', category:'pipes', subcategory:'agri_pipe', size:'160mm', size_mm:160, standard:'IS 4985', qty_per_length:1, pipe_length:6, rate:1750.00, unit:'pc/6m' },

  // Agriculture Fittings
  { code:'AGE63',  name:'Elbow',   category:'fittings', subcategory:'elbow',   size:'63mm',  size_mm:63,  standard:'IS 4985', std_pkg:20, qty_box:100, rate:42.00,  unit:'pcs' },
  { code:'AGE75',  name:'Elbow',   category:'fittings', subcategory:'elbow',   size:'75mm',  size_mm:75,  standard:'IS 4985', std_pkg:15, qty_box:60,  rate:65.00,  unit:'pcs' },
  { code:'AGE90',  name:'Elbow',   category:'fittings', subcategory:'elbow',   size:'90mm',  size_mm:90,  standard:'IS 4985', std_pkg:10, qty_box:40,  rate:95.00,  unit:'pcs' },
  { code:'AGE110', name:'Elbow',   category:'fittings', subcategory:'elbow',   size:'110mm', size_mm:110, standard:'IS 4985', std_pkg:6,  qty_box:24,  rate:155.00, unit:'pcs' },
  { code:'AGT63',  name:'Tee',     category:'fittings', subcategory:'tee',     size:'63mm',  size_mm:63,  standard:'IS 4985', std_pkg:15, qty_box:75,  rate:55.00,  unit:'pcs' },
  { code:'AGT75',  name:'Tee',     category:'fittings', subcategory:'tee',     size:'75mm',  size_mm:75,  standard:'IS 4985', std_pkg:10, qty_box:50,  rate:85.00,  unit:'pcs' },
  { code:'AGT90',  name:'Tee',     category:'fittings', subcategory:'tee',     size:'90mm',  size_mm:90,  standard:'IS 4985', std_pkg:8,  qty_box:32,  rate:125.00, unit:'pcs' },
  { code:'AGT110', name:'Tee',     category:'fittings', subcategory:'tee',     size:'110mm', size_mm:110, standard:'IS 4985', std_pkg:4,  qty_box:16,  rate:210.00, unit:'pcs' },
  { code:'AGC63',  name:'Coupler', category:'fittings', subcategory:'coupler', size:'63mm',  size_mm:63,  standard:'IS 4985', std_pkg:30, qty_box:200, rate:25.00,  unit:'pcs' },
  { code:'AGC75',  name:'Coupler', category:'fittings', subcategory:'coupler', size:'75mm',  size_mm:75,  standard:'IS 4985', std_pkg:20, qty_box:120, rate:38.00,  unit:'pcs' },
  { code:'AGC90',  name:'Coupler', category:'fittings', subcategory:'coupler', size:'90mm',  size_mm:90,  standard:'IS 4985', std_pkg:15, qty_box:80,  rate:55.00,  unit:'pcs' },
  { code:'AGC110', name:'Coupler', category:'fittings', subcategory:'coupler', size:'110mm', size_mm:110, standard:'IS 4985', std_pkg:10, qty_box:50,  rate:85.00,  unit:'pcs' },

  // Fabricated Fittings
  { code:'AGFB90',  name:'Fab Bend 90',  category:'fabricated', subcategory:'fab_bend', size:'90mm',  size_mm:90,  standard:'IS 4985', std_pkg:1, qty_box:10, rate:180.00, unit:'pcs' },
  { code:'AGFB110', name:'Fab Bend 90',  category:'fabricated', subcategory:'fab_bend', size:'110mm', size_mm:110, standard:'IS 4985', std_pkg:1, qty_box:8,  rate:280.00, unit:'pcs' },
  { code:'AGFT90',  name:'Fab Tee',      category:'fabricated', subcategory:'fab_tee',  size:'90mm',  size_mm:90,  standard:'IS 4985', std_pkg:1, qty_box:8,  rate:220.00, unit:'pcs' },
  { code:'AGFT110', name:'Fab Tee',      category:'fabricated', subcategory:'fab_tee',  size:'110mm', size_mm:110, standard:'IS 4985', std_pkg:1, qty_box:6,  rate:350.00, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
