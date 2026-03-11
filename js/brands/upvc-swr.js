// uPVC SWR System — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// Placeholder data — update with actual prices from PDF

var PRODUCTS = [
  // SWR 2.5 Kg Pipes
  { code:'SWP75',  name:'uPVC SWR Pipe 2.5Kg', category:'pipes', subcategory:'swr_2_5kg', size:'75mm',  size_mm:75,  standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:260.00, unit:'pc/3m' },
  { code:'SWP110', name:'uPVC SWR Pipe 2.5Kg', category:'pipes', subcategory:'swr_2_5kg', size:'110mm', size_mm:110, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:450.00, unit:'pc/3m' },
  { code:'SWP160', name:'uPVC SWR Pipe 2.5Kg', category:'pipes', subcategory:'swr_2_5kg', size:'160mm', size_mm:160, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:950.00, unit:'pc/3m' },

  // Light Weight Fittings
  { code:'SWB75',  name:'LW Bend 87.5', category:'fittings', subcategory:'bend', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:20, qty_box:100, rate:35.00, unit:'pcs' },
  { code:'SWB110', name:'LW Bend 87.5', category:'fittings', subcategory:'bend', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:10, qty_box:50,  rate:65.00, unit:'pcs' },
  { code:'SWT75',  name:'LW Tee',       category:'fittings', subcategory:'tee',  size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:15, qty_box:75,  rate:45.00, unit:'pcs' },
  { code:'SWT110', name:'LW Tee',       category:'fittings', subcategory:'tee',  size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:8,  qty_box:40,  rate:88.00, unit:'pcs' },
  { code:'SWC75',  name:'LW Coupler',   category:'fittings', subcategory:'coupler', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:25, qty_box:200, rate:22.00, unit:'pcs' },
  { code:'SWC110', name:'LW Coupler',   category:'fittings', subcategory:'coupler', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:15, qty_box:100, rate:42.00, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
