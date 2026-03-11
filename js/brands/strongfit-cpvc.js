// StrongFit CPVC — Product Catalog
// w.e.f. 01/03/2023 | www.waterflo.in
// Rates are per piece (pcs) unless noted as per metre (mtr)
// rate: 0 means "Contact for Price" or "Coming Soon"

var PRODUCTS = [

  // ─── CPVC PIPES ────────────────────────────────────────────────────────────

  // SCH 40 as per ASTM F-441 (Large sizes 2½"–4")
  { code:'CP4065',  name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40',     size:'2½"', size_mm:65,  standard:'ASTM F-441', qty_bundle:5,  rate:1165.00, unit:'mtr', info:'SCH 40 • 3 mtr length' },
  { code:'CP4080',  name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40',     size:'3"',  size_mm:80,  standard:'ASTM F-441', qty_bundle:4,  rate:1556.00, unit:'mtr', info:'SCH 40 • 3 mtr length' },
  { code:'CP40100', name:'CPVC Pipe SCH 40', category:'pipes', subcategory:'sch40',     size:'4"',  size_mm:100, standard:'ASTM F-441', qty_bundle:2,  rate:3195.00, unit:'mtr', info:'SCH 40 • 3 mtr length' },

  // SCH 80 as per ASTM F-441 (Large sizes 2½"–4")
  { code:'CP8065',  name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80',     size:'2½"', size_mm:65,  standard:'ASTM F-441', qty_bundle:5,  rate:1583.00, unit:'mtr', info:'SCH 80 • 3 mtr length' },
  { code:'CP8080',  name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80',     size:'3"',  size_mm:80,  standard:'ASTM F-441', qty_bundle:4,  rate:2117.00, unit:'mtr', info:'SCH 80 • 3 mtr length' },
  { code:'CP80100', name:'CPVC Pipe SCH 80', category:'pipes', subcategory:'sch80',     size:'4"',  size_mm:100, standard:'ASTM F-441', qty_bundle:2,  rate:3117.00, unit:'mtr', info:'SCH 80 • 3 mtr length' },

  // SDR 11 Class-1 as per ASTM D 2846 (Small sizes ½"–2")
  { code:'CP1115',  name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11',  size:'½"',  size_mm:15, standard:'ASTM D 2846', qty_bundle:75, rate:86.00,  unit:'mtr', rate_3mtr:258.00,  rate_5mtr:430.00,  info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1120',  name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11',  size:'¾"',  size_mm:20, standard:'ASTM D 2846', qty_bundle:50, rate:126.00, unit:'mtr', rate_3mtr:378.00,  rate_5mtr:630.00,  info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1125',  name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11',  size:'1"',  size_mm:25, standard:'ASTM D 2846', qty_bundle:30, rate:199.00, unit:'mtr', rate_3mtr:597.00,  rate_5mtr:995.00,  info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1132',  name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11',  size:'1¼"', size_mm:32, standard:'ASTM D 2846', qty_bundle:15, rate:302.00, unit:'mtr', rate_3mtr:906.00,  rate_5mtr:1510.00, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1140',  name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11',  size:'1½"', size_mm:40, standard:'ASTM D 2846', qty_bundle:10, rate:430.00, unit:'mtr', rate_3mtr:1290.00, rate_5mtr:2150.00, info:'SDR 11 • Available in 3 & 5 mtr' },
  { code:'CP1150',  name:'CPVC Pipe SDR 11 Class-1', category:'pipes', subcategory:'sdr11',  size:'2"',  size_mm:50, standard:'ASTM D 2846', qty_bundle:8,  rate:731.00, unit:'mtr', rate_3mtr:2193.00, rate_5mtr:3655.00, info:'SDR 11 • Available in 3 & 5 mtr' },

  // SDR 13.5 Class-2 as per ASTM D 2846 (Small sizes ½"–2")
  { code:'CP13515', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'½"',  size_mm:15, standard:'ASTM D 2846', qty_bundle:75, rate:75.00,  unit:'mtr', rate_3mtr:225.00,  rate_5mtr:375.00,  info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13520', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'¾"',  size_mm:20, standard:'ASTM D 2846', qty_bundle:50, rate:110.00, unit:'mtr', rate_3mtr:330.00,  rate_5mtr:550.00,  info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13525', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'1"',  size_mm:25, standard:'ASTM D 2846', qty_bundle:30, rate:169.00, unit:'mtr', rate_3mtr:507.00,  rate_5mtr:845.00,  info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13532', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'1¼"', size_mm:32, standard:'ASTM D 2846', qty_bundle:15, rate:257.00, unit:'mtr', rate_3mtr:777.00,  rate_5mtr:1295.00, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13540', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'1½"', size_mm:40, standard:'ASTM D 2846', qty_bundle:10, rate:362.00, unit:'mtr', rate_3mtr:1086.00, rate_5mtr:1810.00, info:'SDR 13.5 • Available in 3 & 5 mtr' },
  { code:'CP13550', name:'CPVC Pipe SDR 13.5 Class-2', category:'pipes', subcategory:'sdr135', size:'2"',  size_mm:50, standard:'ASTM D 2846', qty_bundle:8,  rate:612.00, unit:'mtr', rate_3mtr:1836.00, rate_5mtr:3060.00, info:'SDR 13.5 • Available in 3 & 5 mtr' },

  // ─── CPVC FITTINGS — SDR 11 (½"–2") ASTM D 2846 ────────────────────────────

  // Elbow 90°
  { code:'CFE15', name:'Elbow', category:'fittings', subcategory:'elbow', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:1200, rate:15.00,  unit:'pcs' },
  { code:'CFE20', name:'Elbow', category:'fittings', subcategory:'elbow', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:600,  rate:17.00,  unit:'pcs' },
  { code:'CFE25', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:250,  rate:35.00,  unit:'pcs' },
  { code:'CFE32', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:25,  qty_box:125,  rate:73.50,  unit:'pcs' },
  { code:'CFE40', name:'Elbow', category:'fittings', subcategory:'elbow', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:15,  qty_box:70,   rate:141.50, unit:'pcs' },
  { code:'CFE50', name:'Elbow', category:'fittings', subcategory:'elbow', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:8,   qty_box:40,   rate:291.50, unit:'pcs' },

  // Elbow 45°
  { code:'CFE4515', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:1500, rate:16.50,  unit:'pcs' },
  { code:'CFE4520', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:40,  qty_box:200,  rate:23.50,  unit:'pcs' },
  { code:'CFE4525', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:25,  qty_box:300,  rate:41.50,  unit:'pcs' },
  { code:'CFE4532', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:25,  qty_box:150,  rate:96.00,  unit:'pcs' },
  { code:'CFE4540', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:15,  qty_box:105,  rate:147.50, unit:'pcs' },
  { code:'CFE4550', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:8,   qty_box:48,   rate:307.50, unit:'pcs' },

  // Tee
  { code:'CFT15', name:'Tee', category:'fittings', subcategory:'tee', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:800, rate:20.00,  unit:'pcs' },
  { code:'CFT20', name:'Tee', category:'fittings', subcategory:'tee', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:50,  qty_box:300, rate:28.00,  unit:'pcs' },
  { code:'CFT25', name:'Tee', category:'fittings', subcategory:'tee', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:30,  qty_box:150, rate:50.00,  unit:'pcs' },
  { code:'CFT32', name:'Tee', category:'fittings', subcategory:'tee', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,  rate:94.50,  unit:'pcs' },
  { code:'CFT40', name:'Tee', category:'fittings', subcategory:'tee', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10,  qty_box:60,  rate:172.00, unit:'pcs' },
  { code:'CFT50', name:'Tee', category:'fittings', subcategory:'tee', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:5,   qty_box:25,  rate:360.00, unit:'pcs' },

  // Coupler
  { code:'CFC15', name:'Coupler', category:'fittings', subcategory:'coupler', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:2000, rate:11.00,  unit:'pcs' },
  { code:'CFC20', name:'Coupler', category:'fittings', subcategory:'coupler', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:600,  rate:14.00,  unit:'pcs' },
  { code:'CFC25', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:400,  rate:23.00,  unit:'pcs' },
  { code:'CFC32', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:50,  qty_box:200,  rate:46.00,  unit:'pcs' },
  { code:'CFC40', name:'Coupler', category:'fittings', subcategory:'coupler', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:40,  qty_box:200,  rate:84.00,  unit:'pcs' },
  { code:'CFC50', name:'Coupler', category:'fittings', subcategory:'coupler', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:12,  qty_box:60,   rate:176.00, unit:'pcs' },

  // FTA (Female Threaded Adapter)
  { code:'CFF15',   name:'FTA', category:'fittings', subcategory:'fta', size:'½"',    size_mm:15, standard:'ASTM D 2846', std_pkg:50,  qty_box:1000, rate:17.50,  unit:'pcs' },
  { code:'CFF20',   name:'FTA', category:'fittings', subcategory:'fta', size:'¾"',    size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:600,  rate:27.50,  unit:'pcs' },
  { code:'CFF25',   name:'FTA', category:'fittings', subcategory:'fta', size:'1"',    size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:300,  rate:67.50,  unit:'pcs' },
  { code:'CFF32',   name:'FTA', category:'fittings', subcategory:'fta', size:'1¼"',   size_mm:32, standard:'ASTM D 2846', std_pkg:25,  qty_box:150,  rate:104.00, unit:'pcs' },
  { code:'CFF40',   name:'FTA', category:'fittings', subcategory:'fta', size:'1½"',   size_mm:40, standard:'ASTM D 2846', std_pkg:20,  qty_box:120,  rate:125.00, unit:'pcs' },
  { code:'CFF50',   name:'FTA', category:'fittings', subcategory:'fta', size:'2"',    size_mm:50, standard:'ASTM D 2846', std_pkg:8,   qty_box:40,   rate:195.50, unit:'pcs' },
  { code:'CFF2015', name:'FTA', category:'fittings', subcategory:'fta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:600,  rate:31.50,  unit:'pcs' },

  // MTA (Male Threaded Adapter)
  { code:'CFM15',   name:'MTA', category:'fittings', subcategory:'mta', size:'½"',    size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:1500, rate:14.00,  unit:'pcs' },
  { code:'CFM20',   name:'MTA', category:'fittings', subcategory:'mta', size:'¾"',    size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:700,  rate:21.00,  unit:'pcs' },
  { code:'CFM25',   name:'MTA', category:'fittings', subcategory:'mta', size:'1"',    size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:350,  rate:32.00,  unit:'pcs' },
  { code:'CFM32',   name:'MTA', category:'fittings', subcategory:'mta', size:'1¼"',   size_mm:32, standard:'ASTM D 2846', std_pkg:30,  qty_box:210,  rate:51.50,  unit:'pcs' },
  { code:'CFM40',   name:'MTA', category:'fittings', subcategory:'mta', size:'1½"',   size_mm:40, standard:'ASTM D 2846', std_pkg:20,  qty_box:120,  rate:75.00,  unit:'pcs' },
  { code:'CFM50',   name:'MTA', category:'fittings', subcategory:'mta', size:'2"',    size_mm:50, standard:'ASTM D 2846', std_pkg:15,  qty_box:75,   rate:144.50, unit:'pcs' },
  { code:'CFM2015', name:'MTA', category:'fittings', subcategory:'mta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:700,  rate:22.00,  unit:'pcs' },
  { code:'CFM2520', name:'MTA', category:'fittings', subcategory:'mta', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:350,  rate:35.50,  unit:'pcs' },

  // Union
  { code:'CFU15', name:'Union', category:'fittings', subcategory:'union', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:25, qty_box:500, rate:48.50,  unit:'pcs' },
  { code:'CFU20', name:'Union', category:'fittings', subcategory:'union', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:15, qty_box:200, rate:75.00,  unit:'pcs' },
  { code:'CFU25', name:'Union', category:'fittings', subcategory:'union', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:160, rate:109.00, unit:'pcs' },
  { code:'CFU32', name:'Union', category:'fittings', subcategory:'union', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:15, qty_box:60,  rate:157.00, unit:'pcs' },
  { code:'CFU40', name:'Union', category:'fittings', subcategory:'union', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:60,  rate:262.00, unit:'pcs' },
  { code:'CFU50', name:'Union', category:'fittings', subcategory:'union', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:7,  qty_box:30,  rate:448.00, unit:'pcs' },

  // End Cap
  { code:'CFEC15', name:'End Cap', category:'fittings', subcategory:'endcap', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:3500, rate:9.00,   unit:'pcs' },
  { code:'CFEC20', name:'End Cap', category:'fittings', subcategory:'endcap', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:1400, rate:12.50,  unit:'pcs' },
  { code:'CFEC25', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:700,  rate:19.50,  unit:'pcs' },
  { code:'CFEC32', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:30,  qty_box:420,  rate:41.00,  unit:'pcs' },
  { code:'CFEC40', name:'End Cap', category:'fittings', subcategory:'endcap', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:40,  qty_box:240,  rate:56.50,  unit:'pcs' },
  { code:'CFEC50', name:'End Cap', category:'fittings', subcategory:'endcap', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:20,  qty_box:100,  rate:122.50, unit:'pcs' },

  // Ball Valve
  { code:'CFBV15', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:15, qty_box:255, rate:90.00,   unit:'pcs' },
  { code:'CFBV20', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:20, qty_box:120, rate:161.00,  unit:'pcs' },
  { code:'CFBV25', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:4,  qty_box:60,  rate:282.00,  unit:'pcs' },
  { code:'CFBV32', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:3,  qty_box:45,  rate:466.50,  unit:'pcs' },
  { code:'CFBV40', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:2,  qty_box:32,  rate:855.00,  unit:'pcs' },
  { code:'CFBV50', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:1,  qty_box:16,  rate:1423.00, unit:'pcs' },

  // Concealed Valve (Full Turn)
  { code:'CFCV20', name:'Concealed Valve', category:'valves', subcategory:'concealedvalve', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:25, rate:955.00,  unit:'pcs' },
  { code:'CFCV25', name:'Concealed Valve', category:'valves', subcategory:'concealedvalve', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:1, qty_box:25, rate:1015.00, unit:'pcs' },

  // Tank Connector
  { code:'CFTC15', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:20, qty_box:300, rate:56.00,  unit:'pcs' },
  { code:'CFTC20', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:15, qty_box:210, rate:61.50,  unit:'pcs' },
  { code:'CFTC25', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:15, qty_box:120, rate:97.00,  unit:'pcs' },
  { code:'CFTC32', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:10, qty_box:70,  rate:146.00, unit:'pcs' },
  { code:'CFTC40', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:5,  qty_box:40,  rate:212.00, unit:'pcs' },
  { code:'CFTC50', name:'Tank Connector', category:'fittings', subcategory:'tankconn', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:5,  qty_box:45,  rate:335.50, unit:'pcs' },

  // Tank Connector Socket Type
  { code:'CFTCS20', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:15, qty_box:210, rate:54.50, unit:'pcs' },
  { code:'CFTCS25', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:84.50, unit:'pcs' },

  // Converter Bushing (IPS to CTS)
  { code:'CFCB1515', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:50, qty_box:400, rate:10.00, unit:'pcs' },
  { code:'CFCB2020', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:40, qty_box:320, rate:14.50, unit:'pcs' },
  { code:'CFCB2525', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:30, qty_box:240, rate:21.50, unit:'pcs' },
  { code:'CFCB3232', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:15, qty_box:150, rate:38.00, unit:'pcs' },
  { code:'CFCB4040', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:10, qty_box:120, rate:52.50, unit:'pcs' },
  { code:'CFCB5050', name:'Converter Bushing (IPS to CTS)', category:'fittings', subcategory:'convbush', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:8,  qty_box:80,  rate:79.50, unit:'pcs' },

  // Flange (SDR 11)
  { code:'CFFG40', name:'Flange', category:'fittings', subcategory:'flange', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:1, qty_box:20, rate:460.50, unit:'pcs' },
  { code:'CFFG50', name:'Flange', category:'fittings', subcategory:'flange', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:1, qty_box:16, rate:617.60, unit:'pcs' },

  // Bend 90°
  { code:'CFB9015', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'½"',  size_mm:15, standard:'ASTM D 2846', std_pkg:30, qty_box:300, rate:38.00,  unit:'pcs' },
  { code:'CFB9020', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'¾"',  size_mm:20, standard:'ASTM D 2846', std_pkg:20, qty_box:200, rate:62.00,  unit:'pcs' },
  { code:'CFB9025', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1"',  size_mm:25, standard:'ASTM D 2846', std_pkg:20, qty_box:100, rate:88.50,  unit:'pcs' },
  { code:'CFB9032', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1¼"', size_mm:32, standard:'ASTM D 2846', std_pkg:15, qty_box:90,  rate:129.50, unit:'pcs' },
  { code:'CFB9040', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'1½"', size_mm:40, standard:'ASTM D 2846', std_pkg:5,  qty_box:40,  rate:171.00, unit:'pcs' },
  { code:'CFB9050', name:'Bend 90°', category:'fittings', subcategory:'bend90', size:'2"',  size_mm:50, standard:'ASTM D 2846', std_pkg:2,  qty_box:20,  rate:381.00, unit:'pcs' },

  // Cross Tee
  { code:'CFCT20', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:50, qty_box:300, rate:50.50, unit:'pcs' },
  { code:'CFCT25', name:'Cross Tee', category:'fittings', subcategory:'crosstee', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:25, qty_box:150, rate:89.00, unit:'pcs' },

  // Step Over Bend
  { code:'CFSOB20', name:'Step Over Bend', category:'fittings', subcategory:'stepbend', size:'¾"', size_mm:20, standard:'ASTM D 2846', std_pkg:25, qty_box:150, rate:92.00,  unit:'pcs' },
  { code:'CFSOB25', name:'Step Over Bend', category:'fittings', subcategory:'stepbend', size:'1"', size_mm:25, standard:'ASTM D 2846', std_pkg:15, qty_box:90,  rate:169.00, unit:'pcs' },

  // Long Plug
  { code:'LP15', name:'Long Plug', category:'fittings', subcategory:'longplug', size:'½"', size_mm:15, standard:'ASTM D 2846', std_pkg:100, qty_box:500, rate:10.00, unit:'pcs' },

  // ─── REDUCERS — SDR 11 (ASTM D 2846) ───────────────────────────────────────

  // Reducer Tee
  { code:'CFRT2015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'¾"×½"',    size_mm:20, standard:'ASTM D 2846', std_pkg:50,  qty_box:300, rate:44.00,  unit:'pcs' },
  { code:'CFRT2515', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1"×½"',    size_mm:25, standard:'ASTM D 2846', std_pkg:30,  qty_box:150, rate:73.00,  unit:'pcs' },
  { code:'CFRT2520', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1"×¾"',    size_mm:25, standard:'ASTM D 2846', std_pkg:30,  qty_box:150, rate:63.50,  unit:'pcs' },
  { code:'CFRT3215', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1¼"×½"',   size_mm:32, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,  rate:129.00, unit:'pcs' },
  { code:'CFRT3220', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1¼"×¾"',   size_mm:32, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,  rate:137.00, unit:'pcs' },
  { code:'CFRT3225', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1¼"×1"',   size_mm:32, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,  rate:127.00, unit:'pcs' },
  { code:'CFRT4015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"×½"',   size_mm:40, standard:'ASTM D 2846', std_pkg:10,  qty_box:60,  rate:211.50, unit:'pcs' },
  { code:'CFRT4020', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"×¾"',   size_mm:40, standard:'ASTM D 2846', std_pkg:10,  qty_box:60,  rate:201.50, unit:'pcs' },
  { code:'CFRT4025', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"×1"',   size_mm:40, standard:'ASTM D 2846', std_pkg:10,  qty_box:60,  rate:202.50, unit:'pcs' },
  { code:'CFRT4032', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'1½"×1¼"',  size_mm:40, standard:'ASTM D 2846', std_pkg:10,  qty_box:60,  rate:388.50, unit:'pcs' },
  { code:'CFRT5015', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"×½"',    size_mm:50, standard:'ASTM D 2846', std_pkg:5,   qty_box:25,  rate:402.00, unit:'pcs' },
  { code:'CFRT5020', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"×¾"',    size_mm:50, standard:'ASTM D 2846', std_pkg:5,   qty_box:25,  rate:390.50, unit:'pcs' },
  { code:'CFRT5025', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"×1"',    size_mm:50, standard:'ASTM D 2846', std_pkg:5,   qty_box:25,  rate:398.50, unit:'pcs' },
  { code:'CFRT5032', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"×1¼"',   size_mm:50, standard:'ASTM D 2846', std_pkg:5,   qty_box:25,  rate:397.50, unit:'pcs' },
  { code:'CFRT5040', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2"×1½"',   size_mm:50, standard:'ASTM D 2846', std_pkg:5,   qty_box:25,  rate:397.50, unit:'pcs' },

  // Reducer Bush
  { code:'CFRB2015', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'¾"×½"',   size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:2000, rate:10.50, unit:'pcs' },
  { code:'CFRB2515', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1"×½"',   size_mm:25, standard:'ASTM D 2846', std_pkg:100, qty_box:500,  rate:17.50, unit:'pcs' },
  { code:'CFRB2520', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1"×¾"',   size_mm:25, standard:'ASTM D 2846', std_pkg:100, qty_box:1000, rate:22.50, unit:'pcs' },
  { code:'CFRB3215', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1¼"×½"',  size_mm:32, standard:'ASTM D 2846', std_pkg:100, qty_box:500,  rate:45.50, unit:'pcs' },
  { code:'CFRB3220', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1¼"×¾"',  size_mm:32, standard:'ASTM D 2846', std_pkg:100, qty_box:500,  rate:32.00, unit:'pcs' },
  { code:'CFRB3225', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1¼"×1"',  size_mm:32, standard:'ASTM D 2846', std_pkg:100, qty_box:500,  rate:27.00, unit:'pcs' },
  { code:'CFRB4015', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"×½"',  size_mm:40, standard:'ASTM D 2846', std_pkg:50,  qty_box:300,  rate:67.00, unit:'pcs' },
  { code:'CFRB4020', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"×¾"',  size_mm:40, standard:'ASTM D 2846', std_pkg:50,  qty_box:300,  rate:51.50, unit:'pcs' },
  { code:'CFRB4025', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"×1"',  size_mm:40, standard:'ASTM D 2846', std_pkg:50,  qty_box:300,  rate:50.50, unit:'pcs' },
  { code:'CFRB4032', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'1½"×1¼"', size_mm:40, standard:'ASTM D 2846', std_pkg:50,  qty_box:300,  rate:35.50, unit:'pcs' },
  { code:'CFRB5015', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"×½"',   size_mm:50, standard:'ASTM D 2846', std_pkg:20,  qty_box:140,  rate:108.50,unit:'pcs' },
  { code:'CFRB5020', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"×¾"',   size_mm:50, standard:'ASTM D 2846', std_pkg:20,  qty_box:140,  rate:99.50, unit:'pcs' },
  { code:'CFRB5025', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"×1"',   size_mm:50, standard:'ASTM D 2846', std_pkg:20,  qty_box:140,  rate:100.00,unit:'pcs' },
  { code:'CFRB5032', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"×1¼"',  size_mm:50, standard:'ASTM D 2846', std_pkg:20,  qty_box:140,  rate:107.00,unit:'pcs' },
  { code:'CFRB5040', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2"×1½"',  size_mm:50, standard:'ASTM D 2846', std_pkg:20,  qty_box:140,  rate:89.00, unit:'pcs' },

  // Reducer Coupler (SDR 11)
  { code:'CFRC2015', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'¾"×½"',   size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:1200, rate:0, unit:'pcs' },
  { code:'CFRC2515', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1"×½"',   size_mm:25, standard:'ASTM D 2846', std_pkg:100, qty_box:600,  rate:0, unit:'pcs' },
  { code:'CFRC2520', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1"×¾"',   size_mm:25, standard:'ASTM D 2846', std_pkg:100, qty_box:600,  rate:0, unit:'pcs' },
  { code:'CFRC3215', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1¼"×½"',  size_mm:32, standard:'ASTM D 2846', std_pkg:40,  qty_box:280,  rate:0, unit:'pcs' },
  { code:'CFRC3220', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1¼"×¾"',  size_mm:32, standard:'ASTM D 2846', std_pkg:40,  qty_box:280,  rate:0, unit:'pcs' },
  { code:'CFRC3225', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1¼"×1"',  size_mm:32, standard:'ASTM D 2846', std_pkg:40,  qty_box:280,  rate:0, unit:'pcs' },
  { code:'CFRC4015', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"×½"',  size_mm:40, standard:'ASTM D 2846', std_pkg:30,  qty_box:210,  rate:0, unit:'pcs' },
  { code:'CFRC4020', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"×¾"',  size_mm:40, standard:'ASTM D 2846', std_pkg:30,  qty_box:210,  rate:0, unit:'pcs' },
  { code:'CFRC4025', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"×1"',  size_mm:40, standard:'ASTM D 2846', std_pkg:30,  qty_box:210,  rate:0, unit:'pcs' },
  { code:'CFRC4032', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'1½"×1¼"', size_mm:40, standard:'ASTM D 2846', std_pkg:25,  qty_box:150,  rate:0, unit:'pcs' },
  { code:'CFRC5015', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"×½"',   size_mm:50, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,   rate:0, unit:'pcs' },
  { code:'CFRC5020', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"×¾"',   size_mm:50, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,   rate:0, unit:'pcs' },
  { code:'CFRC5025', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"×1"',   size_mm:50, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,   rate:0, unit:'pcs' },
  { code:'CFRC5032', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"×1¼"',  size_mm:50, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,   rate:0, unit:'pcs' },
  { code:'CFRC5040', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2"×1½"',  size_mm:50, standard:'ASTM D 2846', std_pkg:15,  qty_box:90,   rate:0, unit:'pcs' },

  // Reducer Elbow (SDR 11)
  { code:'CFRE2015', name:'Reducer Elbow', category:'reducers', subcategory:'redelbow', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:100, qty_box:500, rate:0, unit:'pcs' },
  { code:'CFRE2515', name:'Reducer Elbow', category:'reducers', subcategory:'redelbow', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:250, rate:0, unit:'pcs' },
  { code:'CFRE2520', name:'Reducer Elbow', category:'reducers', subcategory:'redelbow', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:50,  qty_box:250, rate:0, unit:'pcs' },

  // ─── LARGE SIZE FITTINGS — SCH 80, ASTM F-439 (2½"–4") ─────────────────────

  // Elbow (SCH 80)
  { code:'CFE65',  name:'Elbow', category:'fittings', subcategory:'elbow', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:6, rate:900.00,   unit:'pcs' },
  { code:'CFE80',  name:'Elbow', category:'fittings', subcategory:'elbow', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:1329.00,  unit:'pcs' },
  { code:'CFE100', name:'Elbow', category:'fittings', subcategory:'elbow', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:3, rate:2252.50,  unit:'pcs' },

  // Elbow 45° (SCH 80)
  { code:'CFE4565',  name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:6, rate:805.00,   unit:'pcs' },
  { code:'CFE4580',  name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:4, rate:1138.50,  unit:'pcs' },
  { code:'CFE45100', name:'Elbow 45°', category:'fittings', subcategory:'elbow45', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:3, rate:2048.00,  unit:'pcs' },

  // Tee (SCH 80)
  { code:'CFT65',  name:'Tee', category:'fittings', subcategory:'tee', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:6, rate:1329.00,  unit:'pcs' },
  { code:'CFT80',  name:'Tee', category:'fittings', subcategory:'tee', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:4, rate:1928.00,  unit:'pcs' },
  { code:'CFT100', name:'Tee', category:'fittings', subcategory:'tee', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:3, rate:3069.00,  unit:'pcs' },

  // Coupler (SCH 80)
  { code:'CFC65',  name:'Coupler', category:'fittings', subcategory:'coupler', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:4, qty_box:20, rate:567.00,   unit:'pcs' },
  { code:'CFC80',  name:'Coupler', category:'fittings', subcategory:'coupler', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:6,  rate:808.50,   unit:'pcs' },
  { code:'CFC100', name:'Coupler', category:'fittings', subcategory:'coupler', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4,  rate:1240.50,  unit:'pcs' },

  // FTA (SCH 80)
  { code:'CFF65',  name:'FTA', category:'fittings', subcategory:'fta', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:18, rate:371.50,  unit:'pcs' },
  { code:'CFF80',  name:'FTA', category:'fittings', subcategory:'fta', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:10, rate:597.50,  unit:'pcs' },
  { code:'CFF100', name:'FTA', category:'fittings', subcategory:'fta', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4,  rate:1014.00, unit:'pcs' },

  // Union (SCH 80)
  { code:'CFU65',  name:'Union', category:'fittings', subcategory:'union', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:1156.50, unit:'pcs' },
  { code:'CFU80',  name:'Union', category:'fittings', subcategory:'union', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:1, qty_box:1, rate:1573.50, unit:'pcs' },
  { code:'CFU100', name:'Union', category:'fittings', subcategory:'union', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:2, rate:2583.00, unit:'pcs' },

  // End Cap (SCH 80)
  { code:'CFEC65',  name:'End Cap', category:'fittings', subcategory:'endcap', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:6,  rate:350.50, unit:'pcs' },
  { code:'CFEC80',  name:'End Cap', category:'fittings', subcategory:'endcap', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:12, rate:518.00, unit:'pcs' },
  { code:'CFEC100', name:'End Cap', category:'fittings', subcategory:'endcap', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:2, qty_box:8,  rate:906.00, unit:'pcs' },

  // MTA (SCH 80)
  { code:'CFM65',  name:'MTA', category:'fittings', subcategory:'mta', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:18, rate:379.50, unit:'pcs' },
  { code:'CFM80',  name:'MTA', category:'fittings', subcategory:'mta', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:10, rate:523.00, unit:'pcs' },
  { code:'CFM100', name:'MTA', category:'fittings', subcategory:'mta', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4,  rate:989.00, unit:'pcs' },

  // Flange (SCH 80)
  { code:'CFFG65',  name:'Flange', category:'fittings', subcategory:'flange', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:20, rate:1203.50, unit:'pcs' },
  { code:'CFFG80',  name:'Flange', category:'fittings', subcategory:'flange', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:16, rate:1332.50, unit:'pcs' },
  { code:'CFFG100', name:'Flange', category:'fittings', subcategory:'flange', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:12, rate:2292.50, unit:'pcs' },

  // Tank Connector Socket (SCH 80)
  { code:'CFTCS65',  name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:3, qty_box:9, rate:799.00,  unit:'pcs' },
  { code:'CFTCS80',  name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:1, qty_box:6, rate:999.00,  unit:'pcs' },
  { code:'CFTCS100', name:'Tank Connector (Socket)', category:'fittings', subcategory:'tankconnsocket', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:1792.00, unit:'pcs' },

  // Reducer Tee (SCH 80)
  { code:'CFRT6550C',  name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'2½"×2"CTS', size_mm:65, standard:'ASTM F-439', std_pkg:2, qty_box:6, rate:999.00,  unit:'pcs' },
  { code:'CFRT8040C',  name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'3"×1½"CTS', size_mm:80, standard:'ASTM F-439', std_pkg:2, qty_box:4, rate:1300.00, unit:'pcs' },
  { code:'CFRT8050C',  name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'3"×2"CTS',  size_mm:80, standard:'ASTM F-439', std_pkg:2, qty_box:4, rate:1410.00, unit:'pcs' },
  { code:'CFRT8065',   name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'3"×2½"',    size_mm:80, standard:'ASTM F-439', std_pkg:2, qty_box:4, rate:1445.50, unit:'pcs' },
  { code:'CFRT10050C', name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"×2"CTS',  size_mm:100,standard:'ASTM F-439', std_pkg:1, qty_box:2, rate:2467.50, unit:'pcs' },
  { code:'CFRT10065',  name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"×2½"',    size_mm:100,standard:'ASTM F-439', std_pkg:1, qty_box:2, rate:2496.50, unit:'pcs' },
  { code:'CFRT10080',  name:'Reducer Tee', category:'reducers', subcategory:'redtee', size:'4"×3"',     size_mm:100,standard:'ASTM F-439', std_pkg:1, qty_box:2, rate:2538.00, unit:'pcs' },

  // Reducer Coupler (SCH 80)
  { code:'CFRC6550C',  name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'2½"×2"CTS', size_mm:65,  standard:'ASTM F-439', std_pkg:3, qty_box:9, rate:490.00,  unit:'pcs' },
  { code:'CFRC8050C',  name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'3"×2"CTS',  size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:6, rate:701.50,  unit:'pcs' },
  { code:'CFRC8065',   name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'3"×2½"',    size_mm:80,  standard:'ASTM F-439', std_pkg:2, qty_box:8, rate:769.50,  unit:'pcs' },
  { code:'CFRC10050C', name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'4"×2"CTS',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:1033.50, unit:'pcs' },
  { code:'CFRC10065',  name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'4"×2½"',    size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:1093.00, unit:'pcs' },
  { code:'CFRC10080',  name:'Reducer Coupler', category:'reducers', subcategory:'redcoupler', size:'4"×3"',     size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:1160.50, unit:'pcs' },

  // Reducer Bush (SCH 80)
  { code:'CFRB6550C',  name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'2½"×2"CTS', size_mm:65,  standard:'ASTM F-439', std_pkg:4, qty_box:20, rate:328.50,  unit:'pcs' },
  { code:'CFRB8050C',  name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'3"×2"CTS',  size_mm:80,  standard:'ASTM F-439', std_pkg:4, qty_box:12, rate:664.50,  unit:'pcs' },
  { code:'CFRB8065',   name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'3"×2½"',    size_mm:80,  standard:'ASTM F-439', std_pkg:4, qty_box:12, rate:423.00,  unit:'pcs' },
  { code:'CFRB10050C', name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'4"×2"CTS',  size_mm:100, standard:'ASTM F-439', std_pkg:2, qty_box:8,  rate:1137.00, unit:'pcs' },
  { code:'CFRB10065',  name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'4"×2½"',    size_mm:100, standard:'ASTM F-439', std_pkg:2, qty_box:8,  rate:992.50,  unit:'pcs' },
  { code:'CFRB10080',  name:'Reducer Bush', category:'reducers', subcategory:'redbush', size:'4"×3"',     size_mm:100, standard:'ASTM F-439', std_pkg:2, qty_box:8,  rate:882.50,  unit:'pcs' },

  // Ball Valve (SCH 80) - Coming Soon
  { code:'CFBV65',  name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:1, qty_box:1, rate:0, unit:'pcs', comingSoon:true },
  { code:'CFBV80',  name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:1, qty_box:1, rate:0, unit:'pcs', comingSoon:true },
  { code:'CFBV100', name:'Ball Valve', category:'valves', subcategory:'ballvalve', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:1, rate:0, unit:'pcs', comingSoon:true },

  // ─── BRASS FITTINGS — SDR 11 (ASTM D 2846) ─────────────────────────────────

  // Brass Elbow
  { code:'CFBE15',   name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'½"',    size_mm:15, standard:'ASTM D 2846', std_pkg:25, qty_box:250, rate:61.00,  unit:'pcs' },
  { code:'CFBE20',   name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'¾"',    size_mm:20, standard:'ASTM D 2846', std_pkg:20, qty_box:160, rate:96.00,  unit:'pcs' },
  { code:'CFBE25',   name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"',    size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80,  rate:318.00, unit:'pcs' },
  { code:'CFBE2015', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:20, qty_box:200, rate:68.50,  unit:'pcs' },
  { code:'CFBE2515', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:15, qty_box:150, rate:119.00, unit:'pcs' },
  { code:'CFBE2520', name:'Brass Elbow', category:'brass', subcategory:'brasselbow', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:15, qty_box:120, rate:186.00, unit:'pcs' },

  // Brass Tee
  { code:'CFBT15',   name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'½"',    size_mm:15, standard:'ASTM D 2846', std_pkg:25, qty_box:200, rate:74.00,  unit:'pcs' },
  { code:'CFBT20',   name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'¾"',    size_mm:20, standard:'ASTM D 2846', std_pkg:15, qty_box:120, rate:125.50, unit:'pcs' },
  { code:'CFBT25',   name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"',    size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80,  rate:255.50, unit:'pcs' },
  { code:'CFBT2015', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:20, qty_box:160, rate:81.50,  unit:'pcs' },
  { code:'CFBT2515', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80,  rate:129.50, unit:'pcs' },
  { code:'CFBT2520', name:'Brass Tee', category:'brass', subcategory:'brasstee', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:10, qty_box:80,  rate:213.00, unit:'pcs' },

  // Brass MTA
  { code:'CFBM15',   name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'½"',    size_mm:15, standard:'ASTM D 2846', std_pkg:30,  qty_box:200, rate:131.50,  unit:'pcs' },
  { code:'CFBM20',   name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'¾"',    size_mm:20, standard:'ASTM D 2846', std_pkg:20,  qty_box:100, rate:178.50,  unit:'pcs' },
  { code:'CFBM25',   name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1"',    size_mm:25, standard:'ASTM D 2846', std_pkg:10,  qty_box:120, rate:275.00,  unit:'pcs' },
  { code:'CFBM32',   name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1¼"',   size_mm:32, standard:'ASTM D 2846', std_pkg:8,   qty_box:56,  rate:622.00,  unit:'pcs' },
  { code:'CFBM40',   name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1½"',   size_mm:40, standard:'ASTM D 2846', std_pkg:6,   qty_box:48,  rate:781.00,  unit:'pcs' },
  { code:'CFBM50',   name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'2"',    size_mm:50, standard:'ASTM D 2846', std_pkg:4,   qty_box:24,  rate:1492.50, unit:'pcs' },
  { code:'CFBM2015', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:25,  qty_box:250, rate:107.00,  unit:'pcs' },
  { code:'CFBM2515', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1"×½"', size_mm:25, standard:'ASTM D 2846', std_pkg:20,  qty_box:220, rate:204.00,  unit:'pcs' },
  { code:'CFBM2520', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'1"×¾"', size_mm:25, standard:'ASTM D 2846', std_pkg:20,  qty_box:160, rate:214.50,  unit:'pcs' },

  // Brass MTA (Hex)
  { code:'CFBMH20',   name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'¾"',    size_mm:20, standard:'ASTM D 2846', std_pkg:10, qty_box:130, rate:214.50, unit:'pcs' },
  { code:'CFBMH25',   name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'1"',    size_mm:25, standard:'ASTM D 2846', std_pkg:25, qty_box:75,  rate:331.50, unit:'pcs' },
  { code:'CFBMH32',   name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'1¼"',   size_mm:32, standard:'ASTM D 2846', std_pkg:0,  qty_box:0,   rate:682.00, unit:'pcs' },
  { code:'CFBMH40',   name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'1½"',   size_mm:40, standard:'ASTM D 2846', std_pkg:0,  qty_box:0,   rate:848.50, unit:'pcs' },
  { code:'CFBMH50',   name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'2"',    size_mm:50, standard:'ASTM D 2846', std_pkg:0,  qty_box:0,   rate:1622.00,unit:'pcs' },
  { code:'CFBMH2015', name:'Brass MTA (Hex)', category:'brass', subcategory:'brasstamhex', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:15, qty_box:210, rate:131.00, unit:'pcs' },

  // Brass FTA (Large sizes from SCH 80 page)
  { code:'CFBF65',  name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:8, rate:1501.50, unit:'pcs' },
  { code:'CFBF80',  name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:1, qty_box:6, rate:2377.00, unit:'pcs' },
  { code:'CFBF100', name:'Brass FTA', category:'brass', subcategory:'brassfta', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:3628.00, unit:'pcs' },

  // Brass MTA (Large sizes from SCH 80 page)
  { code:'CFBM65',  name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'2½"', size_mm:65,  standard:'ASTM F-439', std_pkg:2, qty_box:8, rate:1829.00, unit:'pcs' },
  { code:'CFBM80',  name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'3"',  size_mm:80,  standard:'ASTM F-439', std_pkg:1, qty_box:6, rate:2690.00, unit:'pcs' },
  { code:'CFBM100', name:'Brass MTA', category:'brass', subcategory:'brassmta', size:'4"',  size_mm:100, standard:'ASTM F-439', std_pkg:1, qty_box:4, rate:3840.50, unit:'pcs' },

  // ─── MIXER ADAPTORS ─────────────────────────────────────────────────────────

  { code:'CFAT62015', name:'Mixer Adaptor – All Top 6"',            category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:402.00, unit:'pcs' },
  { code:'CFTB62015', name:'Mixer Adaptor – Top & Bottom 6"',       category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:402.00, unit:'pcs' },
  { code:'CFTS62015', name:'Mixer Adaptor – Top & Side 6"',         category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:402.00, unit:'pcs' },
  { code:'CFUD62015', name:'Mixer Adaptor – Hot Up Cold Down 6"',   category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:402.00, unit:'pcs' },
  { code:'CFSD62015', name:'Mixer Adaptor – Hot Side Cold Down 6"', category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:402.00, unit:'pcs' },

  { code:'CFAT72015', name:'Mixer Adaptor – All Top 7"',            category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:410.00, unit:'pcs' },
  { code:'CFTB72015', name:'Mixer Adaptor – Top & Bottom 7"',       category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:410.00, unit:'pcs' },
  { code:'CFTS72015', name:'Mixer Adaptor – Top & Side 7"',         category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:410.00, unit:'pcs' },
  { code:'CFUD72015', name:'Mixer Adaptor – Hot Up Cold Down 7"',   category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:410.00, unit:'pcs' },
  { code:'CFSD72015', name:'Mixer Adaptor – Hot Side Cold Down 7"', category:'mixer', subcategory:'mixer7', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:1, qty_box:30, rate:410.00, unit:'pcs' },
  { code:'CFKMA2015', name:'Kitchen Mixer Adaptor – Down',          category:'mixer', subcategory:'mixer6', size:'¾"×½"', size_mm:20, standard:'ASTM D 2846', std_pkg:3, qty_box:30, rate:345.00, unit:'pcs' },

  // ─── ACCESSORIES ────────────────────────────────────────────────────────────

  // Solvent Cement
  { code:'CFSC15',  name:'Solvent Cement 15ml',   category:'accessories', subcategory:'solventcement', size:'15ml',  size_mm:0, standard:'HSN 3506', std_pkg:50, qty_box:600, rate:50.00,   unit:'pcs' },
  { code:'CFSC29',  name:'Solvent Cement 29ml',   category:'accessories', subcategory:'solventcement', size:'29ml',  size_mm:0, standard:'HSN 3506', std_pkg:64, qty_box:384, rate:70.00,   unit:'pcs' },
  { code:'CFSC59',  name:'Solvent Cement 59ml',   category:'accessories', subcategory:'solventcement', size:'59ml',  size_mm:0, standard:'HSN 3506', std_pkg:40, qty_box:240, rate:130.00,  unit:'pcs' },
  { code:'CFSC59T', name:'Solvent Cement 59ml Tin',category:'accessories',subcategory:'solventcement', size:'59ml',  size_mm:0, standard:'HSN 3506', std_pkg:30, qty_box:240, rate:135.00,  unit:'pcs' },
  { code:'CFSC118', name:'Solvent Cement 118ml',  category:'accessories', subcategory:'solventcement', size:'118ml', size_mm:0, standard:'HSN 3506', std_pkg:24, qty_box:144, rate:205.00,  unit:'pcs' },
  { code:'CFSC237', name:'Solvent Cement 237ml',  category:'accessories', subcategory:'solventcement', size:'237ml', size_mm:0, standard:'HSN 3506', std_pkg:24, qty_box:96,  rate:350.00,  unit:'pcs' },
  { code:'CFSC473', name:'Solvent Cement 473ml',  category:'accessories', subcategory:'solventcement', size:'473ml', size_mm:0, standard:'HSN 3506', std_pkg:12, qty_box:48,  rate:650.00,  unit:'pcs' },
  { code:'CFSC946', name:'Solvent Cement 946ml',  category:'accessories', subcategory:'solventcement', size:'946ml', size_mm:0, standard:'HSN 3506', std_pkg:6,  qty_box:24,  rate:1150.00, unit:'pcs' },

  // Primer
  { code:'CUFP473', name:'Primer 473ml', category:'accessories', subcategory:'primer', size:'473ml', size_mm:0, standard:'HSN 3506', std_pkg:12, qty_box:48, rate:400.00, unit:'pcs' },

  // PTFE Tape
  { code:'PTY12', name:'PTFE Tape (Yellow) 10mtr', category:'accessories', subcategory:'ptfetape', size:'10mtr 12mm', size_mm:0, standard:'HSN 3920', std_pkg:12, qty_box:1000, rate:20.00, unit:'pcs' },
  { code:'PTY19', name:'PTFE Tape (Yellow) 10mtr', category:'accessories', subcategory:'ptfetape', size:'10mtr 19mm', size_mm:0, standard:'HSN 3920', std_pkg:19, qty_box:1000, rate:28.00, unit:'pcs' },
  { code:'PTW12', name:'PTFE Tape (White) 10mtr',  category:'accessories', subcategory:'ptfetape', size:'10mtr 12mm', size_mm:0, standard:'HSN 3920', std_pkg:12, qty_box:1000, rate:17.00, unit:'pcs' },
];

// Signal that brand data is ready
document.dispatchEvent(new Event('brand-data-ready'));
