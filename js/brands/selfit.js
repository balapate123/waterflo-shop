// SelFit uPVC SWR — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// Placeholder data — update with actual prices from PDF

var PRODUCTS = [
  // SelFit Pipes
  { code:'SFP75',  name:'SelFit SWR Pipe', category:'pipes', subcategory:'selfit_pipe', size:'75mm',  size_mm:75,  standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:310.00, unit:'pc/3m' },
  { code:'SFP110', name:'SelFit SWR Pipe', category:'pipes', subcategory:'selfit_pipe', size:'110mm', size_mm:110, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:540.00, unit:'pc/3m' },
  { code:'SFP160', name:'SelFit SWR Pipe', category:'pipes', subcategory:'selfit_pipe', size:'160mm', size_mm:160, standard:'IS 13592', qty_per_length:1, pipe_length:3, rate:1080.00, unit:'pc/3m' },

  // SelFit Fittings
  { code:'SFB75',  name:'SelFit Bend 87.5', category:'fittings', subcategory:'bend', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:15, qty_box:75,  rate:48.00, unit:'pcs' },
  { code:'SFB110', name:'SelFit Bend 87.5', category:'fittings', subcategory:'bend', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:8,  qty_box:40,  rate:92.00, unit:'pcs' },
  { code:'SFT75',  name:'SelFit Tee',       category:'fittings', subcategory:'tee',  size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:12, qty_box:60,  rate:62.00, unit:'pcs' },
  { code:'SFT110', name:'SelFit Tee',       category:'fittings', subcategory:'tee',  size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:6,  qty_box:30,  rate:115.00, unit:'pcs' },
  { code:'SFC75',  name:'SelFit Coupler',   category:'fittings', subcategory:'coupler', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:20, qty_box:150, rate:32.00, unit:'pcs' },
  { code:'SFC110', name:'SelFit Coupler',   category:'fittings', subcategory:'coupler', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:12, qty_box:80,  rate:58.00, unit:'pcs' },
  { code:'SFEC75', name:'SelFit End Cap',   category:'fittings', subcategory:'endcap', size:'75mm',  size_mm:75,  standard:'IS 13592', std_pkg:25, qty_box:200, rate:18.00, unit:'pcs' },
  { code:'SFEC110',name:'SelFit End Cap',   category:'fittings', subcategory:'endcap', size:'110mm', size_mm:110, standard:'IS 13592', std_pkg:15, qty_box:100, rate:35.00, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
