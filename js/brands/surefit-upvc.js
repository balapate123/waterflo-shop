// SureFit uPVC Plumbing — Product Catalog
// w.e.f. 01/11/2025 | www.waterflo.in
// Placeholder data — update with actual prices from PDF

var PRODUCTS = [
  // uPVC SCH 80 Pipes
  { code:'UP8020', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'3/4"', size_mm:20, standard:'IS 15328', qty_bundle:50, rate:95.00, unit:'mtr', info:'SCH 80 - 3 mtr length' },
  { code:'UP8025', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1"', size_mm:25, standard:'IS 15328', qty_bundle:30, rate:140.00, unit:'mtr', info:'SCH 80 - 3 mtr length' },
  { code:'UP8032', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1-1/4"', size_mm:32, standard:'IS 15328', qty_bundle:20, rate:210.00, unit:'mtr', info:'SCH 80 - 3 mtr length' },
  { code:'UP8040', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'1-1/2"', size_mm:40, standard:'IS 15328', qty_bundle:15, rate:310.00, unit:'mtr', info:'SCH 80 - 3 mtr length' },
  { code:'UP8050', name:'uPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'2"', size_mm:50, standard:'IS 15328', qty_bundle:10, rate:520.00, unit:'mtr', info:'SCH 80 - 3 mtr length' },

  // uPVC Fittings
  { code:'UFE20', name:'Elbow', category:'fittings', subcategory:'elbow', size:'3/4"', size_mm:20, standard:'IS 15328', std_pkg:50, qty_box:500, rate:18.00, unit:'pcs' },
  { code:'UFE25', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1"', size_mm:25, standard:'IS 15328', std_pkg:25, qty_box:250, rate:32.00, unit:'pcs' },
  { code:'UFT20', name:'Tee', category:'fittings', subcategory:'tee', size:'3/4"', size_mm:20, standard:'IS 15328', std_pkg:50, qty_box:400, rate:24.00, unit:'pcs' },
  { code:'UFT25', name:'Tee', category:'fittings', subcategory:'tee', size:'1"', size_mm:25, standard:'IS 15328', std_pkg:25, qty_box:200, rate:45.00, unit:'pcs' },
  { code:'UFC20', name:'Coupler', category:'fittings', subcategory:'coupler', size:'3/4"', size_mm:20, standard:'IS 15328', std_pkg:100, qty_box:600, rate:12.00, unit:'pcs' },
  { code:'UFC25', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1"', size_mm:25, standard:'IS 15328', std_pkg:50, qty_box:400, rate:20.00, unit:'pcs' },

  // Ball Valve
  { code:'UFBV20', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'3/4"', size_mm:20, standard:'IS 15328', std_pkg:10, qty_box:100, rate:145.00, unit:'pcs' },
  { code:'UFBV25', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1"', size_mm:25, standard:'IS 15328', std_pkg:5, qty_box:60, rate:260.00, unit:'pcs' },
];

document.dispatchEvent(new Event('brand-data-ready'));
