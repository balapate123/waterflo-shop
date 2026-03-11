// Boreline Column Pipes — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// Placeholder data — update with actual prices from PDF

var PRODUCTS = [
  // Series A
  { code:'BLA40',  name:'Column Pipe Series A', category:'pipes', subcategory:'series_a', size:'40mm',  size_mm:40,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:320.00, unit:'pc/3m' },
  { code:'BLA50',  name:'Column Pipe Series A', category:'pipes', subcategory:'series_a', size:'50mm',  size_mm:50,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:480.00, unit:'pc/3m' },
  { code:'BLA65',  name:'Column Pipe Series A', category:'pipes', subcategory:'series_a', size:'65mm',  size_mm:65,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:650.00, unit:'pc/3m' },
  { code:'BLA80',  name:'Column Pipe Series A', category:'pipes', subcategory:'series_a', size:'80mm',  size_mm:80,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:890.00, unit:'pc/3m' },
  { code:'BLA100', name:'Column Pipe Series A', category:'pipes', subcategory:'series_a', size:'100mm', size_mm:100, standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:1250.00, unit:'pc/3m' },

  // Series B
  { code:'BLB40',  name:'Column Pipe Series B', category:'pipes', subcategory:'series_b', size:'40mm',  size_mm:40,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:280.00, unit:'pc/3m' },
  { code:'BLB50',  name:'Column Pipe Series B', category:'pipes', subcategory:'series_b', size:'50mm',  size_mm:50,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:420.00, unit:'pc/3m' },
  { code:'BLB65',  name:'Column Pipe Series B', category:'pipes', subcategory:'series_b', size:'65mm',  size_mm:65,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:570.00, unit:'pc/3m' },
  { code:'BLB80',  name:'Column Pipe Series B', category:'pipes', subcategory:'series_b', size:'80mm',  size_mm:80,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:780.00, unit:'pc/3m' },
  { code:'BLB100', name:'Column Pipe Series B', category:'pipes', subcategory:'series_b', size:'100mm', size_mm:100, standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:1100.00, unit:'pc/3m' },

  // Series C
  { code:'BLC50',  name:'Column Pipe Series C', category:'pipes', subcategory:'series_c', size:'50mm',  size_mm:50,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:380.00, unit:'pc/3m' },
  { code:'BLC65',  name:'Column Pipe Series C', category:'pipes', subcategory:'series_c', size:'65mm',  size_mm:65,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:510.00, unit:'pc/3m' },
  { code:'BLC80',  name:'Column Pipe Series C', category:'pipes', subcategory:'series_c', size:'80mm',  size_mm:80,  standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:700.00, unit:'pc/3m' },
  { code:'BLC100', name:'Column Pipe Series C', category:'pipes', subcategory:'series_c', size:'100mm', size_mm:100, standard:'IS 12818', qty_per_length:1, pipe_length:3, rate:980.00, unit:'pc/3m' },
];

document.dispatchEvent(new Event('brand-data-ready'));
