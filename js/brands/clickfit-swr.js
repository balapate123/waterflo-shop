// ClickFit uPVC SWR — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// Placeholder data — update with actual prices from PDF

var PRODUCTS = [
  // SWR Pipes - Type A (3.2mm)
  { code:'CKP75A',  name:'ClickFit SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'75mm',  size_mm:75,  standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:385.00, unit:'pc/3m' },
  { code:'CKP110A', name:'ClickFit SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'110mm', size_mm:110, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:680.00, unit:'pc/3m' },
  { code:'CKP160A', name:'ClickFit SWR Pipe Type A', category:'pipes', subcategory:'swr_type_a', size:'160mm', size_mm:160, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:1350.00, unit:'pc/3m' },

  // SWR Pipes - Type B (2.5mm)
  { code:'CKP75B',  name:'ClickFit SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'75mm',  size_mm:75,  standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:295.00, unit:'pc/3m' },
  { code:'CKP110B', name:'ClickFit SWR Pipe Type B', category:'pipes', subcategory:'swr_type_b', size:'110mm', size_mm:110, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:510.00, unit:'pc/3m' },

  // SWR Fittings
  { code:'CKB75',   name:'Bend 87.5', category:'fittings', subcategory:'bend', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:20, qty_box:100, rate:42.00, unit:'pcs' },
  { code:'CKB110',  name:'Bend 87.5', category:'fittings', subcategory:'bend', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:10, qty_box:50,  rate:78.00, unit:'pcs' },
  { code:'CKT75',   name:'Tee',       category:'fittings', subcategory:'tee',  size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:15, qty_box:75,  rate:55.00, unit:'pcs' },
  { code:'CKT110',  name:'Tee',       category:'fittings', subcategory:'tee',  size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:8,  qty_box:40,  rate:105.00, unit:'pcs' },
  { code:'CKC75',   name:'Coupler',   category:'fittings', subcategory:'coupler', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:25, qty_box:200, rate:28.00, unit:'pcs' },
  { code:'CKC110',  name:'Coupler',   category:'fittings', subcategory:'coupler', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:15, qty_box:100, rate:52.00, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
