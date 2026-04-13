// StrongFit CPVC — Product Catalog
// w.e.f. 01/04/2026 | www.waterflo.in | Prices from PRICE LIST.xls
// Rates are per piece (pcs) unless noted as per metre (mtr)
// ib = items per packet (default 10, admin-editable)

var PRODUCTS = [

  // ─── CPVC PIPES ────────────────────────────────────────────────────────────────────

  // SCH 40 as per ASTM F-441 (Large sizes 2½"–6")
  { code:'CP4065', name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'2½"', size_mm:65, standard:'ASTM F-441', qty_bundle:5, rate:1165, unit:'mtr', info:'SCH 40 • 3 mtr length' },
  { code:'CP4080', name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'3"', size_mm:80, standard:'ASTM F-441', qty_bundle:4, rate:1556, unit:'mtr', info:'SCH 40 • 3 mtr length' },
  { code:'CP40100', name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'4"', size_mm:100, standard:'ASTM F-441', qty_bundle:2, rate:2195, unit:'mtr', info:'SCH 40 • 3 mtr length' },
  { code:'CP40150', name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40', size:'6"', size_mm:150, standard:'ASTM F-441', qty_bundle:1, rate:4150, unit:'mtr', info:'SCH 40 • 3 mtr length' },

  // SCH 80 as per ASTM F-441 (Large sizes 2½"–6")
  { code:'CP8065', name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'2½"', size_mm:65, standard:'ASTM F-441', qty_bundle:5, rate:1583, unit:'mtr', info:'SCH 80 • 3 mtr length' },
  { code:'CP8080', name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'3"', size_mm:80, standard:'ASTM F-441', qty_bundle:4, rate:2117, unit:'mtr', info:'SCH 80 • 3 mtr length' },
  { code:'CP80100', name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'4"', size_mm:100, standard:'ASTM F-441', qty_bundle:2, rate:3117, unit:'mtr', info:'SCH 80 • 3 mtr length' },
  { code:'CP80150', name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80', size:'6"', size_mm:150, standard:'ASTM F-441', qty_bundle:1, rate:6380, unit:'mtr', info:'SCH 80 • 3 mtr length' },

  // SDR 11 Class-1 as per ASTM D 2846 (Small sizes ½"–2")
  { code:'CP1115', name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11', size:'½"', size_mm:15, standard:'ASTM D 2846', qty_bundle:75, rate:86, unit:'mtr', rate_3mtr:258, rate_5mtr:430, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1120', name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11', size:'¾"', size_mm:20, standard:'ASTM D 2846', qty_bundle:50, rate:126, unit:'mtr', rate_3mtr:378, rate_5mtr:630, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1125', name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11', size:'1"', size_mm:25, standard:'ASTM D 2846', qty_bundle:30, rate:199, unit:'mtr', rate_3mtr:597, rate_5mtr:995, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1132', name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11', size:'1¼"', size_mm:32, standard:'ASTM D 2846', qty_bundle:15, rate:302, unit:'mtr', rate_3mtr:906, rate_5mtr:1510, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1140', name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11', size:'1½"', size_mm:40, standard:'ASTM D 2846', qty_bundle:10, rate:430, unit:'mtr', rate_3mtr:1290, rate_5mtr:2150, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1150', name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11', size:'2"', size_mm:50, standard:'ASTM D 2846', qty_bundle:8, rate:731, unit:'mtr', rate_3mtr:2193, rate_5mtr:3655, info:'SDR 11 • Available in 3 & 5 mtr' },

  // SDR 13.5 Class-2 as per ASTM D 2846 (Small sizes ½"–2")
  { code:'CP13515', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'½"', size_mm:15, standard:'ASTM D 2846', qty_bundle:75, rate:75, unit:'mtr', rate_3mtr:225, rate_5mtr:375, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13520', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'¾"', size_mm:20, standard:'ASTM D 2846', qty_bundle:50, rate:110, unit:'mtr', rate_3mtr:330, rate_5mtr:550, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13525', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'1"', size_mm:25, standard:'ASTM D 2846', qty_bundle:30, rate:169, unit:'mtr', rate_3mtr:507, rate_5mtr:845, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13532', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'1¼"', size_mm:32, standard:'ASTM D 2846', qty_bundle:15, rate:259, unit:'mtr', rate_3mtr:777, rate_5mtr:1295, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13540', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'1½"', size_mm:40, standard:'ASTM D 2846', qty_bundle:10, rate:362, unit:'mtr', rate_3mtr:1086, rate_5mtr:1810, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13550', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'2"', size_mm:50, standard:'ASTM D 2846', qty_bundle:8, rate:612, unit:'mtr', rate_3mtr:1836, rate_5mtr:3060, info:'SDR 13.5 • Available in 3 & 5 mtr' },

  // ─── CPVC FITTINGS — SDR 11 (½"–2") ASTM D 2846 ─────────────────────────────

  // Elbow 90°
  { code:'CFE15', name:'Elbow', category:'fittings', subcategory:'elbow', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:1200, rate:15, unit:'pcs' },
  { code:'CFE20', name:'Elbow', category:'fittings', subcategory:'elbow', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:17, unit:'pcs' },
  { code:'CFE25', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:35, unit:'pcs' },
  { code:'CFE32', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:125, rate:73.5, unit:'pcs' },
  { code:'CFE40', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:75, rate:141.5, unit:'pcs' },
  { code:'CFE50', name:'Elbow', category:'fittings', subcategory:'elbow', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:40, rate:291.5, unit:'pcs' },

  // Elbow 45°
  { code:'CFE4515', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:1500, rate:16.5, unit:'pcs' },
  { code:'CFE4520', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:600, rate:23.5, unit:'pcs' },
  { code:'CFE4525', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:41.5, unit:'pcs' },
  { code:'CFE4532', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:96, unit:'pcs' },
  { code:'CFE4540', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:105, rate:147.5, unit:'pcs' },
  { code:'CFE4550', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:48, rate:307.5, unit:'pcs' },

  // Tee
  { code:'CFT15', name:'Tee', category:'fittings', subcategory:'tee', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:800, rate:20, unit:'pcs' },
  { code:'CFT20', name:'Tee', category:'fittings', subcategory:'tee', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:28, unit:'pcs' },
  { code:'CFT25', name:'Tee', category:'fittings', subcategory:'tee', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:45, unit:'pcs' },
  { code:'CFT32', name:'Tee', category:'fittings', subcategory:'tee', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:94.5, unit:'pcs' },
  { code:'CFT40', name:'Tee', category:'fittings', subcategory:'tee', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:172, unit:'pcs' },
  { code:'CFT50', name:'Tee', category:'fittings', subcategory:'tee', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:360, unit:'pcs' },

  // Coupler
  { code:'CFC15', name:'Coupler', category:'fittings', subcategory:'coupler', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:2000, rate:11, unit:'pcs' },
  { code:'CFC20', name:'Coupler', category:'fittings', subcategory:'coupler', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:800, rate:14, unit:'pcs' },
  { code:'CFC25', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:400, rate:23, unit:'pcs' },
  { code:'CFC32', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:46, unit:'pcs' },
  { code:'CFC40', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:84, unit:'pcs' },
  { code:'CFC50', name:'Coupler', category:'fittings', subcategory:'coupler', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:176, unit:'pcs' },

  // End Cap
  { code:'CFEC15', name:'End Cap', category:'fittings', subcategory:'endcap', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:3500, rate:9, unit:'pcs' },
  { code:'CFEC20', name:'End Cap', category:'fittings', subcategory:'endcap', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:1400, rate:12.5, unit:'pcs' },
  { code:'CFEC25', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:700, rate:19.5, unit:'pcs' },
  { code:'CFEC32', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:420, rate:41, unit:'pcs' },
  { code:'CFEC40', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:240, rate:56.5, unit:'pcs' },
  { code:'CFEC50', name:'End Cap', category:'fittings', subcategory:'endcap', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:100, rate:122.5, unit:'pcs' },

  // FTA (Female Threaded Adapter)
  { code:'CFF15', name:'FTA', category:'fittings', subcategory:'fta', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:1000, rate:17.5, unit:'pcs' },
  { code:'CFF20', name:'FTA', category:'fittings', subcategory:'fta', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:600, rate:27.5, unit:'pcs' },
  { code:'CFF25', name:'FTA', category:'fittings', subcategory:'fta', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:39, unit:'pcs' },
  { code:'CFF32', name:'FTA', category:'fittings', subcategory:'fta', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:104, unit:'pcs' },
  { code:'CFF40', name:'FTA', category:'fittings', subcategory:'fta', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:125, unit:'pcs' },
  { code:'CFF50', name:'FTA', category:'fittings', subcategory:'fta', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:72, rate:195.5, unit:'pcs' },
  { code:'CFF2015', name:'FTA', category:'fittings', subcategory:'fta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:600, rate:31.5, unit:'pcs' },

  // MTA (Male Threaded Adapter)
  { code:'CFM15', name:'MTA', category:'fittings', subcategory:'mta', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:1500, rate:14, unit:'pcs' },
  { code:'CFM20', name:'MTA', category:'fittings', subcategory:'mta', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:700, rate:21, unit:'pcs' },
  { code:'CFM25', name:'MTA', category:'fittings', subcategory:'mta', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:350, rate:32, unit:'pcs' },
  { code:'CFM32', name:'MTA', category:'fittings', subcategory:'mta', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:210, rate:51.5, unit:'pcs' },
  { code:'CFM40', name:'MTA', category:'fittings', subcategory:'mta', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:75, unit:'pcs' },
  { code:'CFM50', name:'MTA', category:'fittings', subcategory:'mta', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:75, rate:144.5, unit:'pcs' },
  { code:'CFM2015', name:'MTA', category:'fittings', subcategory:'mta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:700, rate:22, unit:'pcs' },
  { code:'CFM2520', name:'MTA', category:'fittings', subcategory:'mta', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:350, rate:35.5, unit:'pcs' },

  // Union
  { code:'CFU15', name:'Union', category:'fittings', subcategory:'union', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:48.5, unit:'pcs' },
  { code:'CFU20', name:'Union', category:'fittings', subcategory:'union', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:225, rate:80.5, unit:'pcs' },
  { code:'CFU25', name:'Union', category:'fittings', subcategory:'union', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:160, rate:109, unit:'pcs' },
  { code:'CFU32', name:'Union', category:'fittings', subcategory:'union', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:105, rate:157, unit:'pcs' },
  { code:'CFU40', name:'Union', category:'fittings', subcategory:'union', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:262, unit:'pcs' },
  { code:'CFU50', name:'Union', category:'fittings', subcategory:'union', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:35, rate:448, unit:'pcs' },

  // Ball Valve
  { code:'CFBV15', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:255, rate:90, unit:'pcs' },
  { code:'CFBV20', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:161, unit:'pcs' },
  { code:'CFBV25', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:282, unit:'pcs' },
  { code:'CFBV32', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:45, rate:466.5, unit:'pcs' },
  { code:'CFBV40', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:32, rate:855, unit:'pcs' },
  { code:'CFBV50', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:16, rate:1423, unit:'pcs' },

  // Tank Connector (Threaded)
  { code:'CFTC15', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:56, unit:'pcs' },
  { code:'CFTC20', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:210, rate:61.5, unit:'pcs' },
  { code:'CFTC25', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:97, unit:'pcs' },
  { code:'CFTC32', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:70, rate:146, unit:'pcs' },
  { code:'CFTC40', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:212, unit:'pcs' },
  { code:'CFTC50', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:45, rate:335.5, unit:'pcs' },

  // Tank Connector (Socket Type)
  { code:'CFTCS20', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:210, rate:54.5, unit:'pcs' },
  { code:'CFTCS25', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:84.5, unit:'pcs' },
  { code:'CFTCS32', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:10, rate:100, unit:'pcs' },
  { code:'CFTCS40', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:50, rate:100, unit:'pcs' },
  { code:'CFTCS50', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:10, rate:100, unit:'pcs' },

  // Converter Bushing (IPS to CTS)
  { code:'CFCB1515', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:400, rate:10, unit:'pcs' },
  { code:'CFCB2020', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:320, rate:14.5, unit:'pcs' },
  { code:'CFCB2525', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:240, rate:21.5, unit:'pcs' },
  { code:'CFCB3232', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:38, unit:'pcs' },
  { code:'CFCB4040', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:52.5, unit:'pcs' },
  { code:'CFCB5050', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:80, rate:79.5, unit:'pcs' },

  // Concealed Valve (Full Turn)
  { code:'CFCV20', name:'Concealed Valve', category:'valves', subcategory:'concealedvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:955, unit:'pcs' },
  { code:'CFCV25', name:'Concealed Valve', category:'valves', subcategory:'concealedvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:1015, unit:'pcs' },

  // Concealed Valve Short QTR (Triangle)
  { code:'CFCVST20', name:'Concealed Valve Short QTR (Triangle)', category:'valves', subcategory:'concealedvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1050, unit:'pcs' },
  { code:'CFCVST25', name:'Concealed Valve Short QTR (Triangle)', category:'valves', subcategory:'concealedvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1300, unit:'pcs' },

  // Concealed Valve Long QTR (Triangle)
  { code:'CFCVLT20', name:'Concealed Valve Long QTR (Triangle)', category:'valves', subcategory:'concealedvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1250, unit:'pcs' },
  { code:'CFCVLT25', name:'Concealed Valve Long QTR (Triangle)', category:'valves', subcategory:'concealedvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1450, unit:'pcs' },

  // Concealed Valve Short QTR (Round)
  { code:'CFCVSR20', name:'Concealed Valve Short QTR (Round)', category:'valves', subcategory:'concealedvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1100, unit:'pcs' },
  { code:'CFCVSR25', name:'Concealed Valve Short QTR (Round)', category:'valves', subcategory:'concealedvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1375, unit:'pcs' },

  // Concealed Valve Long QTR (Round)
  { code:'CFCVLR20', name:'Concealed Valve Long QTR (Round)', category:'valves', subcategory:'concealedvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1310, unit:'pcs' },
  { code:'CFCVLR25', name:'Concealed Valve Long QTR (Round)', category:'valves', subcategory:'concealedvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:18, rate:1535, unit:'pcs' },

  // Non Return Valve
  { code:'CFNRV20', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:245, unit:'pcs' },
  { code:'CFNRV25', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:16, rate:385, unit:'pcs' },
  { code:'CFNRV32', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:21, rate:800, unit:'pcs' },
  { code:'CFNRV40', name:'Non Return Valve', category:'valves', subcategory:'nrv', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:9, rate:1135, unit:'pcs' },

  // Bend 90°
  { code:'CFB9015', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:30, unit:'pcs' },
  { code:'CFB9020', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:52, unit:'pcs' },
  { code:'CFB9025', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:100, rate:85.5, unit:'pcs' },
  { code:'CFB9032', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:129.5, unit:'pcs' },
  { code:'CFB9040', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:40, rate:171, unit:'pcs' },
  { code:'CFB9050', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:20, rate:381, unit:'pcs' },

  // Step Over Bend
  { code:'CFSOB20', name:'Step Over Bend', category:'fittings', subcategory:'stepbend', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:92, unit:'pcs' },
  { code:'CFSOB25', name:'Step Over Bend', category:'fittings', subcategory:'stepbend', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:169, unit:'pcs' },
  { code:'CFSOB32', name:'Step Over Bend', category:'fittings', subcategory:'stepbend', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:10, rate:100, unit:'pcs' },
  { code:'CFSOB40', name:'Step Over Bend', category:'fittings', subcategory:'stepbend', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:10, rate:100, unit:'pcs' },

  // Long Radius Bend
  { code:'CFLRB20', name:'Long Radius Bend', category:'fittings', subcategory:'lrb', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:140, rate:70, unit:'pcs' },
  { code:'CFLRB25', name:'Long Radius Bend', category:'fittings', subcategory:'lrb', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80, rate:108, unit:'pcs' },

  // Flange (SDR 11)
  { code:'CFFG40', name:'Flange', category:'fittings', subcategory:'flange', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:20, rate:450.5, unit:'pcs' },
  { code:'CFFG50', name:'Flange', category:'fittings', subcategory:'flange', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:16, rate:617.5, unit:'pcs' },

  // Cross Tee
  { code:'CFCT20', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:50.5, unit:'pcs' },
  { code:'CFCT25', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:89, unit:'pcs' },

  // Long Plug
  { code:'LP15', name:'Long Plug', category:'fittings', subcategory:'longplug', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:10, unit:'pcs' },

  // ─── REDUCERS — SDR 11 (ASTM D 2846) ───────────────────────────────────────────

  // Reducing Elbow
  { code:'CFRE2015', name:'Reducing Elbow', category:'reducers', subcategory:'redelbow', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:27.5, unit:'pcs' },
  { code:'CFRE2515', name:'Reducing Elbow', category:'reducers', subcategory:'redelbow', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:68, unit:'pcs' },
  { code:'CFRE2520', name:'Reducing Elbow', category:'reducers', subcategory:'redelbow', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:44, unit:'pcs' },

  // Reducing Tee
  { code:'CFRT2015', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:44, unit:'pcs' },
  { code:'CFRT2515', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:73, unit:'pcs' },
  { code:'CFRT2520', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:63.5, unit:'pcs' },
  { code:'CFRT3215', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1¼"×½"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:129, unit:'pcs' },
  { code:'CFRT3220', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1¼"×¾"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:137, unit:'pcs' },
  { code:'CFRT3225', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1¼"×1"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:127, unit:'pcs' },
  { code:'CFRT4015', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1½"×½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:211.5, unit:'pcs' },
  { code:'CFRT4020', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1½"×¾"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:210.5, unit:'pcs' },
  { code:'CFRT4025', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1½"×1"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:201.5, unit:'pcs' },
  { code:'CFRT4032', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'1½"×1¼"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60, rate:202.5, unit:'pcs' },
  { code:'CFRT5015', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'2"×½"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:388.5, unit:'pcs' },
  { code:'CFRT5020', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'2"×¾"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:402, unit:'pcs' },
  { code:'CFRT5025', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'2"×1"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:390.5, unit:'pcs' },
  { code:'CFRT5032', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'2"×1¼"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:398.5, unit:'pcs' },
  { code:'CFRT5040', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'2"×1½"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:25, rate:397.5, unit:'pcs' },

  // Reducing Socket
  { code:'CFRC2015', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:1200, rate:19.5, unit:'pcs' },
  { code:'CFRC2515', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:600, rate:28.5, unit:'pcs' },
  { code:'CFRC2520', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:31, unit:'pcs' },
  { code:'CFRC3215', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1¼"×½"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:280, rate:67, unit:'pcs' },
  { code:'CFRC3220', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1¼"×¾"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:280, rate:63, unit:'pcs' },
  { code:'CFRC3225', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1¼"×1"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:280, rate:68.5, unit:'pcs' },
  { code:'CFRC4015', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1½"×½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:180, rate:98, unit:'pcs' },
  { code:'CFRC4020', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1½"×¾"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:210, rate:108.5, unit:'pcs' },
  { code:'CFRC4025', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1½"×1"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:180, rate:110.5, unit:'pcs' },
  { code:'CFRC4032', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'1½"×1¼"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:100, unit:'pcs' },
  { code:'CFRC5015', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'2"×½"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:220.5, unit:'pcs' },
  { code:'CFRC5020', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'2"×¾"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:243, unit:'pcs' },
  { code:'CFRC5025', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'2"×1"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:186.5, unit:'pcs' },
  { code:'CFRC5032', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'2"×1¼"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:205, unit:'pcs' },
  { code:'CFRC5040', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'2"×1½"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:90, rate:230.5, unit:'pcs' },

  // Reducing Bush
  { code:'CFRB2015', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:2000, rate:10.5, unit:'pcs' },
  { code:'CFRB2515', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:1000, rate:22.5, unit:'pcs' },
  { code:'CFRB2520', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:1000, rate:17.5, unit:'pcs' },
  { code:'CFRB3215', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1¼"×½"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:45.5, unit:'pcs' },
  { code:'CFRB3220', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1¼"×¾"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:32, unit:'pcs' },
  { code:'CFRB3225', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1¼"×1"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:500, rate:27, unit:'pcs' },
  { code:'CFRB4015', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1½"×½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:67, unit:'pcs' },
  { code:'CFRB4020', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1½"×¾"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:51.5, unit:'pcs' },
  { code:'CFRB4025', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1½"×1"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:50.5, unit:'pcs' },
  { code:'CFRB4032', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'1½"×1¼"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:35.5, unit:'pcs' },
  { code:'CFRB5015', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'2"×½"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:140, rate:108.5, unit:'pcs' },
  { code:'CFRB5020', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'2"×¾"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:140, rate:99.5, unit:'pcs' },
  { code:'CFRB5025', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'2"×1"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:140, rate:100, unit:'pcs' },
  { code:'CFRB5032', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'2"×1¼"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:140, rate:107, unit:'pcs' },
  { code:'CFRB5040', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'2"×1½"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:140, rate:89, unit:'pcs' },

  // ─── LARGE SIZE FITTINGS — SCH 80, ASTM F-439 (2½"–6") ─────────────────────

  // Elbow (SCH 80)
  { code:'CFE65', name:'Elbow', category:'fittings', subcategory:'elbow', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:900, unit:'pcs' },
  { code:'CFE80', name:'Elbow', category:'fittings', subcategory:'elbow', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1329, unit:'pcs' },
  { code:'CFE100', name:'Elbow', category:'fittings', subcategory:'elbow', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:3, rate:2252.5, unit:'pcs' },
  { code:'CFE150', name:'Elbow', category:'fittings', subcategory:'elbow', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:6050, unit:'pcs' },

  // Elbow 45° (SCH 80)
  { code:'CFE4565', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:805, unit:'pcs' },
  { code:'CFE4580', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1138.5, unit:'pcs' },
  { code:'CFE45100', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:3, rate:2048, unit:'pcs' },
  { code:'CFE45150', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:5275, unit:'pcs' },

  // Tee (SCH 80)
  { code:'CFT65', name:'Tee', category:'fittings', subcategory:'tee', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:1228, unit:'pcs' },
  { code:'CFT80', name:'Tee', category:'fittings', subcategory:'tee', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1828, unit:'pcs' },
  { code:'CFT100', name:'Tee', category:'fittings', subcategory:'tee', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:3068, unit:'pcs' },
  { code:'CFT150', name:'Tee', category:'fittings', subcategory:'tee', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:7935, unit:'pcs' },

  // Coupler (SCH 80)
  { code:'CFC65', name:'Coupler', category:'fittings', subcategory:'coupler', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:20, rate:567, unit:'pcs' },
  { code:'CFC80', name:'Coupler', category:'fittings', subcategory:'coupler', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:808.5, unit:'pcs' },
  { code:'CFC100', name:'Coupler', category:'fittings', subcategory:'coupler', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1240.5, unit:'pcs' },
  { code:'CFC150', name:'Coupler', category:'fittings', subcategory:'coupler', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:2850, unit:'pcs' },

  // End Cap (SCH 80)
  { code:'CFEC65', name:'End Cap', category:'fittings', subcategory:'endcap', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:18, rate:350.5, unit:'pcs' },
  { code:'CFEC80', name:'End Cap', category:'fittings', subcategory:'endcap', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:12, rate:518, unit:'pcs' },
  { code:'CFEC100', name:'End Cap', category:'fittings', subcategory:'endcap', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:906, unit:'pcs' },
  { code:'CFEC150', name:'End Cap', category:'fittings', subcategory:'endcap', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:2650, unit:'pcs' },

  // FTA (SCH 80)
  { code:'CFF65', name:'FTA', category:'fittings', subcategory:'fta', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:18, rate:371.5, unit:'pcs' },
  { code:'CFF80', name:'FTA', category:'fittings', subcategory:'fta', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:10, rate:597.5, unit:'pcs' },
  { code:'CFF100', name:'FTA', category:'fittings', subcategory:'fta', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1014, unit:'pcs' },
  { code:'CFF150', name:'FTA', category:'fittings', subcategory:'fta', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:4000, unit:'pcs' },

  // MTA (SCH 80)
  { code:'CFM65', name:'MTA', category:'fittings', subcategory:'mta', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:18, rate:379.5, unit:'pcs' },
  { code:'CFM80', name:'MTA', category:'fittings', subcategory:'mta', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:10, rate:523, unit:'pcs' },
  { code:'CFM100', name:'MTA', category:'fittings', subcategory:'mta', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:989, unit:'pcs' },
  { code:'CFM150', name:'MTA', category:'fittings', subcategory:'mta', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:3915, unit:'pcs' },

  // Union (SCH 80)
  { code:'CFU65', name:'Union', category:'fittings', subcategory:'union', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1156.5, unit:'pcs' },
  { code:'CFU80', name:'Union', category:'fittings', subcategory:'union', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1573.5, unit:'pcs' },
  { code:'CFU100', name:'Union', category:'fittings', subcategory:'union', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:2583, unit:'pcs' },

  // Flange (SCH 80)
  { code:'CFFG65', name:'Flange', category:'fittings', subcategory:'flange', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:20, rate:1203.5, unit:'pcs' },
  { code:'CFFG80', name:'Flange', category:'fittings', subcategory:'flange', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:16, rate:1332.5, unit:'pcs' },
  { code:'CFFG100', name:'Flange', category:'fittings', subcategory:'flange', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:12, rate:2292.5, unit:'pcs' },
  { code:'CFFG150', name:'Flange', category:'fittings', subcategory:'flange', size:'6"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:3, rate:4000, unit:'pcs' },

  // Tank Connector Socket (SCH 80)
  { code:'CFTCS65', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'2½"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:9, rate:799, unit:'pcs' },
  { code:'CFTCS80', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'3"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:999, unit:'pcs' },
  { code:'CFTCS100', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'4"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1792, unit:'pcs' },

  // Reducing Tee (SCH 80)
  { code:'CFRT6550C', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'2½"×2"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:999, unit:'pcs' },
  { code:'CFRT8040C', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'3"×1½"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1300, unit:'pcs' },
  { code:'CFRT8050C', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'3"×2"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1410, unit:'pcs' },
  { code:'CFRT8065', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'3"×2½"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1445.5, unit:'pcs' },
  { code:'CFRT10050C', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'4"×2"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:2467.5, unit:'pcs' },
  { code:'CFRT10065', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'4"×2½"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:2496.5, unit:'pcs' },
  { code:'CFRT10080', name:'Reducing Tee', category:'reducers', subcategory:'redtee', size:'4"×3"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:2, rate:2538, unit:'pcs' },

  // Reducing Socket (SCH 80)
  { code:'CFRC6550C', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'2½"×2"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:9, rate:490, unit:'pcs' },
  { code:'CFRC8050C', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'3"×2"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:701.5, unit:'pcs' },
  { code:'CFRC8065', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'3"×2½"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:6, rate:769.5, unit:'pcs' },
  { code:'CFRC10050C', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'4"×2"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1033.5, unit:'pcs' },
  { code:'CFRC10065', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'4"×2½"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1093, unit:'pcs' },
  { code:'CFRC10080', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'4"×3"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:1160.5, unit:'pcs' },
  { code:'CFRC15065', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'6"×2½"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:3550, unit:'pcs' },
  { code:'CFRC150100', name:'Reducing Socket', category:'reducers', subcategory:'redcoupler', size:'6"×4"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:4, rate:3950, unit:'pcs' },

  // Reducing Bush (SCH 80)
  { code:'CFRB6550C', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'2½"×2"', size_mm:65, standard:'ASTM F-439', std_pkg:10, qty_box:20, rate:328.5, unit:'pcs' },
  { code:'CFRB8050C', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'3"×2"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:12, rate:664.5, unit:'pcs' },
  { code:'CFRB8065', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'3"×2½"', size_mm:80, standard:'ASTM F-439', std_pkg:10, qty_box:12, rate:423, unit:'pcs' },
  { code:'CFRB10050C', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'4"×2"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:1137, unit:'pcs' },
  { code:'CFRB10065', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'4"×2½"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:992.5, unit:'pcs' },
  { code:'CFRB10080', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'4"×3"', size_mm:100, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:882.5, unit:'pcs' },
  { code:'CFRB15050', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'6"×2"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:2360, unit:'pcs' },
  { code:'CFRB15080', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'6"×3"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:2000, unit:'pcs' },
  { code:'CFRB150110', name:'Reducing Bush', category:'reducers', subcategory:'redbush', size:'6"×4"', size_mm:150, standard:'ASTM F-439', std_pkg:10, qty_box:8, rate:2450, unit:'pcs' },

  // ─── BRASS FITTINGS — SDR 11 (ASTM D 2846) ───────────────────────────────────

  // Brass Elbow
  { code:'CFBE15', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:61, unit:'pcs' },
  { code:'CFBE20', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:160, rate:96, unit:'pcs' },
  { code:'CFBE25', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80, rate:318, unit:'pcs' },
  { code:'CFBE2015', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:68.5, unit:'pcs' },
  { code:'CFBE2515', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:150, rate:119, unit:'pcs' },
  { code:'CFBE2520', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:186, unit:'pcs' },

  // Brass Tee
  { code:'CFBT15', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:74, unit:'pcs' },
  { code:'CFBT20', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:125.5, unit:'pcs' },
  { code:'CFBT25', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:70, rate:255.5, unit:'pcs' },
  { code:'CFBT2015', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:160, rate:81.5, unit:'pcs' },
  { code:'CFBT2515', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80, rate:129.5, unit:'pcs' },
  { code:'CFBT2520', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80, rate:213, unit:'pcs' },

  // Brass MTA
  { code:'CFBM15', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:300, rate:131.5, unit:'pcs' },
  { code:'CFBM20', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:178.5, unit:'pcs' },
  { code:'CFBM25', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:275, unit:'pcs' },
  { code:'CFBM32', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:56, rate:622, unit:'pcs' },
  { code:'CFBM40', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:48, rate:781, unit:'pcs' },
  { code:'CFBM50', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:24, rate:1492.5, unit:'pcs' },
  { code:'CFBM65', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'2½"', size_mm:65, standard:'ASTM D 2846', std_pkg:10, qty_box:8, rate:1626, unit:'pcs' },
  { code:'CFBM80', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'3"', size_mm:80, standard:'ASTM D 2846', std_pkg:10, qty_box:6, rate:2690, unit:'pcs' },
  { code:'CFBM100', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'4"', size_mm:100, standard:'ASTM D 2846', std_pkg:10, qty_box:4, rate:3940.5, unit:'pcs' },
  { code:'CFBM2015', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:107, unit:'pcs' },
  { code:'CFBM2515', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:220, rate:204, unit:'pcs' },
  { code:'CFBM2520', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:160, rate:214.5, unit:'pcs' },

  // Brass FTA
  { code:'CFBF15', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:10, qty_box:360, rate:124, unit:'pcs' },
  { code:'CFBF20', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:171, unit:'pcs' },
  { code:'CFBF25', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:270, unit:'pcs' },
  { code:'CFBF32', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:64, rate:618, unit:'pcs' },
  { code:'CFBF40', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:48, rate:704.5, unit:'pcs' },
  { code:'CFBF50', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:32, rate:1352, unit:'pcs' },
  { code:'CFBF65', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'2½"', size_mm:65, standard:'ASTM D 2846', std_pkg:10, qty_box:8, rate:1501.5, unit:'pcs' },
  { code:'CFBF80', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'3"', size_mm:80, standard:'ASTM D 2846', std_pkg:10, qty_box:6, rate:2377, unit:'pcs' },
  { code:'CFBF100', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'4"', size_mm:100, standard:'ASTM D 2846', std_pkg:10, qty_box:4, rate:3626, unit:'pcs' },
  { code:'CFBF2015', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:250, rate:76, unit:'pcs' },
  { code:'CFBF2515', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:100.5, unit:'pcs' },
  { code:'CFBF2520', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:200, rate:109.5, unit:'pcs' },

  // Brass MTA (Hexagonal)
  { code:'CFBMH20', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:130, rate:214.5, unit:'pcs' },
  { code:'CFBMH25', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:75, rate:331.5, unit:'pcs' },
  { code:'CFBMH32', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:40, rate:682, unit:'pcs' },
  { code:'CFBMH40', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:32, rate:848.5, unit:'pcs' },
  { code:'CFBMH50', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:16, rate:1622, unit:'pcs' },
  { code:'CFBMH2015', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:210, rate:131, unit:'pcs' },

  // Brass FTA (Hexagonal)
  { code:'CFBFH20', name:'Brass FTA (Hex)', category:'brass', subcategory:'brassftahex', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:130, rate:213, unit:'pcs' },
  { code:'CFBFH25', name:'Brass FTA (Hex)', category:'brass', subcategory:'brassftahex', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:75, rate:325.5, unit:'pcs' },
  { code:'CFBFM32', name:'Brass FTA (Hex)', category:'brass', subcategory:'brassftahex', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:40, rate:692.5, unit:'pcs' },
  { code:'CFBFM40', name:'Brass FTA (Hex)', category:'brass', subcategory:'brassftahex', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:32, rate:818.5, unit:'pcs' },
  { code:'CFBFM50', name:'Brass FTA (Hex)', category:'brass', subcategory:'brassftahex', size:'2"', size_mm:50, standard:'ASTM D 2846', std_pkg:10, qty_box:16, rate:1482.5, unit:'pcs' },
  { code:'CFBFH2015', name:'Brass FTA (Hex)', category:'brass', subcategory:'brassftahex', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:210, rate:130, unit:'pcs' },

  // ─── MIXER ADAPTORS ─────────────────────────────────────────────────────────

  { code:'CFAT62015', name:'Mixer Adaptor – All Top 6"', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:402, unit:'pcs' },
  { code:'CFTB62015', name:'Mixer Adaptor – Top & Bottom 6"', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:402, unit:'pcs' },
  { code:'CFTS62015', name:'Mixer Adaptor – Top & Side 6"', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:402, unit:'pcs' },
  { code:'CFUD62015', name:'Mixer Adaptor – Hot Up Cold Down 6"', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:402, unit:'pcs' },
  { code:'CFSD62015', name:'Mixer Adaptor – Hot Side Cold Down 6"', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:402, unit:'pcs' },
  { code:'CFAT72015', name:'Mixer Adaptor – All Top 7"', category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:410, unit:'pcs' },
  { code:'CFTB72015', name:'Mixer Adaptor – Top & Bottom 7"', category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:410, unit:'pcs' },
  { code:'CFTS72015', name:'Mixer Adaptor – Top & Side 7"', category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:410, unit:'pcs' },
  { code:'CFUD72015', name:'Mixer Adaptor – Hot Up Cold Down 7"', category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:410, unit:'pcs' },
  { code:'CFSD72015', name:'Mixer Adaptor – Hot Side Cold Down 7"', category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:410, unit:'pcs' },
  { code:'CFKMA2015', name:'Kitchen Mixer Adaptor – Down', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:30, rate:345, unit:'pcs' },

  // ─── ACCESSORIES — Solvent Cement & Primer ──────────────────────────────────

  // Solvent Cement
  { code:'CFSC15', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'15ml Tube', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:600, rate:50, unit:'pcs' },
  { code:'CFSC29', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'29ml Tube', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:384, rate:70, unit:'pcs' },
  { code:'CFSC59', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'59ml Tube', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:240, rate:130, unit:'pcs' },
  { code:'CFSCT59', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'59ml Tin', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:240, rate:135, unit:'pcs' },
  { code:'CFSC118', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'118ml Tin', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:144, rate:205, unit:'pcs' },
  { code:'CFSC237', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'237ml Tin', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:96, rate:350, unit:'pcs' },
  { code:'CFSC473', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'473ml Tin', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:48, rate:650, unit:'pcs' },
  { code:'CFSC946', name:'Solvent Cement', category:'accessories', subcategory:'solventcement', size:'946ml Tin', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:24, rate:1150, unit:'pcs' },

  // Primer
  { code:'CUFP473', name:'Primer', category:'accessories', subcategory:'primer', size:'473ml Tin', size_mm:0, standard:'HSN 3506', std_pkg:10, qty_box:48, rate:400, unit:'pcs' },

];

// Signal that brand data is ready
document.dispatchEvent(new Event('brand-data-ready'));
