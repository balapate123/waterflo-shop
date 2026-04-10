// Waterflo Multi-Brand Configuration
// Central registry for all brands

const BRANDS = [
  {
    id: 'strongfit-cpvc',
    name: 'StrongFit CPVC',
    shortName: 'StrongFit',
    tagline: 'Always Ahead In Quality',
    icon: 'SF',
    color: '#c62828',
    headerGradient: 'linear-gradient(135deg, #b71c1c 0%, #c62828 60%, #e53935 100%)',
    heroGradient: 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)',
    dataFile: 'js/brands/strongfit-cpvc.js',
    priceDate: '01/03/2023',
    unitLogic: 'cpvc',
    categories: [
      { id:'all',         label:'All Products',  icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes',       label:'Pipes',         icon:'\uD83D\uDD35', color:'#1565c0' },
      { id:'fittings',    label:'Fittings',      icon:'\u2699\uFE0F', color:'#2e7d32' },
      { id:'reducers',    label:'Reducers',      icon:'\uD83D\uDD00', color:'#e65100' },
      { id:'brass',       label:'Brass',         icon:'\uD83E\uDD49', color:'#f9a825' },
      { id:'valves',      label:'Valves',        icon:'\uD83D\uDEBF', color:'#6a1b9a' },
      { id:'mixer',       label:'Mixer Adaptors', icon:'\uD83D\uDD27', color:'#00695c' },
      { id:'accessories', label:'Accessories',   icon:'\uD83E\uDDF4', color:'#4e342e' },
    ],
    subcategoryNames: {
      sch40:'SCH 40 Pipes', sch80:'SCH 80 Pipes', sdr11:'SDR 11 Class-1 Pipes', sdr135:'SDR 13.5 Class-2 Pipes',
      elbow:'Elbow', elbow45:'Elbow 45\u00B0', tee:'Tee', coupler:'Coupler',
      fta:'FTA', mta:'MTA', union:'Union', endcap:'End Cap',
      ballvalve:'Ball Valve', concealedvalve:'Concealed Valve',
      tankconn:'Tank Connector', tankconnsocket:'Tank Connector (Socket)',
      convbush:'Converter Bushing', flange:'Flange',
      bend90:'Bend 90\u00B0', crosstee:'Cross Tee', stepbend:'Step Over Bend', longplug:'Long Plug',
      redtee:'Reducer Tee', redbush:'Reducer Bush', redcoupler:'Reducer Coupler', redelbow:'Reducer Elbow',
      brasselbow:'Brass Elbow', brasstee:'Brass Tee', brassmta:'Brass MTA',
      brasstamhex:'Brass MTA (Hex)', brassfta:'Brass FTA',
      mixer6:'3-in-1 Mixer 6"', mixer7:'3-in-1 Mixer 7"',
      solventcement:'Solvent Cement', primer:'Primer', ptfetape:'PTFE Tape',
    }
  },
  {
    id: 'surefit-upvc',
    name: 'SureFit uPVC Plumbing',
    shortName: 'SureFit',
    tagline: 'uPVC Plumbing Pipes & Fittings',
    icon: 'SF',
    color: '#1565c0',
    headerGradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 60%, #1e88e5 100%)',
    heroGradient: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
    dataFile: 'js/brands/surefit-upvc.js',
    priceDate: '01/11/2025',
    unitLogic: 'upvc-plumbing',
    categories: [
      { id:'all',         label:'All Products',  icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes',       label:'Pipes',         icon:'\uD83D\uDD35', color:'#1565c0' },
      { id:'fittings',    label:'Fittings',      icon:'\u2699\uFE0F', color:'#2e7d32' },
      { id:'reducers',    label:'Reducers',      icon:'\uD83D\uDD00', color:'#e65100' },
      { id:'brass',       label:'Brass',         icon:'\uD83E\uDD49', color:'#f9a825' },
      { id:'valves',      label:'Valves',        icon:'\uD83D\uDEBF', color:'#6a1b9a' },
      { id:'accessories', label:'Accessories',   icon:'\uD83E\uDDF4', color:'#4e342e' },
    ],
    subcategoryNames: {
      sch40:'SCH 40 Pipes', sch80:'SCH 80 Pipes',
      elbow:'Elbow', elbow45:'Elbow 45\u00B0', tee:'Tee', coupler:'Coupler',
      fta:'FTA', mta:'MTA', union:'Union', endcap:'End Cap',
      tankconn:'Tank Connector', tankconnsocket:'Tank Connector (Socket)',
      flange:'Flange', crosstee:'Cross Tee', bend90:'Bend 90\u00B0', longplug:'Long Plug',
      threadedelbow:'Threaded Elbow', threadedtee:'Threaded Tee',
      redtee:'Reducer Tee', redbush:'Reducer Bush', redcoupler:'Reducer Coupler', redelbow:'Reducer Elbow',
      brasselbow:'Brass Elbow', brasstee:'Brass Tee', brassmta:'Brass MTA', brassfta:'Brass FTA',
      ballvalve:'Ball Valve', compactbvshort:'Compact Ball Valve (Short)',
      compactbvlong:'Compact Ball Valve (Long)', threadedbvlong:'Threaded Ball Valve (Long)',
      concealedlong:'Concealed Valve (Long)', concealedshort:'Concealed Valve (Short)',
      nrv:'Non Return Valve',
      ptfetape:'PTFE Tape', solventhd:'Solvent Cement (HD)', solventmd:'Solvent Cement (MD)', primer:'Primer',
    }
  },
  {
    id: 'clickfit-swr',
    name: 'ClickFit uPVC SWR',
    shortName: 'ClickFit',
    tagline: 'Push-Fit SWR Ring Fit System',
    icon: 'CF',
    color: '#2e7d32',
    headerGradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #43a047 100%)',
    heroGradient: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
    dataFile: 'js/brands/clickfit-swr.js',
    priceDate: '01/11/2025',
    unitLogic: 'swr',
    categories: [
      { id:'all',      label:'All Products', icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes',    label:'Pipes',        icon:'\uD83D\uDD35', color:'#1565c0' },
      { id:'fittings', label:'Fittings',     icon:'\u2699\uFE0F', color:'#2e7d32' },
    ],
    subcategoryNames: {
      swr_type_a:'Type A', swr_type_b:'Type B',
      bend:'Bend', tee:'Tee', coupler:'Coupler', endcap:'End Cap',
      reducer:'Reducer', wye:'Y-Branch', door:'Door',
      cleansing_pipe:'Cleansing Pipe',
      floor_trap:'Floor Trap', nahni_trap:'Nahni Trap', p_trap:'P-Trap',
    }
  },
  {
    id: 'upvc-swr',
    name: 'uPVC SWR System',
    shortName: 'uPVC SWR',
    tagline: 'SWR Pipes & Light Weight Fittings',
    icon: 'SW',
    color: '#558b2f',
    headerGradient: 'linear-gradient(135deg, #33691e 0%, #558b2f 60%, #7cb342 100%)',
    heroGradient: 'linear-gradient(135deg, #558b2f 0%, #33691e 100%)',
    dataFile: 'js/brands/upvc-swr.js',
    priceDate: '01/11/2025',
    unitLogic: 'swr',
    categories: [
      { id:'all',      label:'All Products', icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes',    label:'Pipes',        icon:'\uD83D\uDD35', color:'#1565c0' },
      { id:'fittings', label:'Fittings',     icon:'\u2699\uFE0F', color:'#2e7d32' },
    ],
    subcategoryNames: {
      swr_2_5kg:'2.5 Kg Pipes', lw_fittings:'Light Weight Fittings',
      bend:'Bend', tee:'Tee', coupler:'Coupler', reducer:'Reducer',
    }
  },
  {
    id: 'selfit',
    name: 'SelFit uPVC SWR',
    shortName: 'SelFit',
    tagline: 'Self-Fit SWR Pipes & Fittings',
    icon: 'SE',
    color: '#00695c',
    headerGradient: 'linear-gradient(135deg, #004d40 0%, #00695c 60%, #00897b 100%)',
    heroGradient: 'linear-gradient(135deg, #00695c 0%, #004d40 100%)',
    dataFile: 'js/brands/selfit.js',
    priceDate: '01/11/2025',
    unitLogic: 'swr',
    categories: [
      { id:'all',      label:'All Products', icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes',    label:'Pipes',        icon:'\uD83D\uDD35', color:'#1565c0' },
      { id:'fittings', label:'Fittings',     icon:'\u2699\uFE0F', color:'#2e7d32' },
    ],
    subcategoryNames: {
      selfit_pipe:'SelFit Pipes', selfit_fitting:'SelFit Fittings',
      common_swr:'Common SWR Fittings',
      bend:'Bend', tee:'Tee', coupler:'Coupler', endcap:'End Cap',
      reducer:'Reducer', wye:'Y-Branch', door:'Door',
      floor_trap:'Floor Trap', nahni_trap:'Nahni Trap',
    }
  },
  {
    id: 'ugd',
    name: 'UGD Drainage Pipes',
    shortName: 'UGD',
    tagline: 'Underground Drainage Pipe System',
    icon: 'UG',
    color: '#bf360c',
    headerGradient: 'linear-gradient(135deg, #8d1b00 0%, #bf360c 60%, #e64a19 100%)',
    heroGradient: 'linear-gradient(135deg, #bf360c 0%, #8d1b00 100%)',
    dataFile: 'js/brands/ugd.js',
    priceDate: '01/11/2025',
    unitLogic: 'ugd',
    categories: [
      { id:'all',   label:'All Products', icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes', label:'Pipes',        icon:'\uD83D\uDD35', color:'#1565c0' },
    ],
    subcategoryNames: {
      sn2:'SN 2 Pipes', sn4:'SN 4 Pipes', sn8:'SN 8 Pipes',
    }
  },
  {
    id: 'agrimaster',
    name: 'AgriMaster Agriculture',
    shortName: 'AgriMaster',
    tagline: 'Agriculture Pipes & Fittings',
    icon: 'AM',
    color: '#388e3c',
    headerGradient: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 60%, #4caf50 100%)',
    heroGradient: 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)',
    dataFile: 'js/brands/agrimaster.js',
    priceDate: '01/11/2025',
    unitLogic: 'agriculture',
    categories: [
      { id:'all',         label:'All Products',       icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes',       label:'Pipes',              icon:'\uD83D\uDD35', color:'#1565c0' },
      { id:'fittings',    label:'Fittings',           icon:'\u2699\uFE0F', color:'#2e7d32' },
      { id:'fabricated',  label:'Fabricated Fittings', icon:'\uD83D\uDD29', color:'#e65100' },
    ],
    subcategoryNames: {
      agri_pipe:'Agriculture Pipes',
      casing_pipe:'Casing Pipes',
      column_pipe:'Column Pipes',
      elbow:'Elbow', tee:'Tee', coupler:'Coupler',
      endcap:'End Cap', reducer:'Reducer', valve:'Ball Valve',
      fab_bend:'Fabricated Bend', fab_tee:'Fabricated Tee',
      fab_reducer:'Fabricated Reducer',
    }
  },
  {
    id: 'boreline',
    name: 'Boreline Column Pipes',
    shortName: 'Boreline',
    tagline: 'Column Pipes for Submersible Pumps',
    icon: 'BL',
    color: '#0277bd',
    headerGradient: 'linear-gradient(135deg, #01579b 0%, #0277bd 60%, #0288d1 100%)',
    heroGradient: 'linear-gradient(135deg, #0277bd 0%, #01579b 100%)',
    dataFile: 'js/brands/boreline.js',
    priceDate: '01/11/2025',
    unitLogic: 'boreline',
    categories: [
      { id:'all',   label:'All Products', icon:'\uD83D\uDCE6', color:'#455a64' },
      { id:'pipes', label:'Column Pipes', icon:'\uD83D\uDD35', color:'#1565c0' },
    ],
    subcategoryNames: {
      series_a:'Series A', series_b:'Series B', series_c:'Series C',
      series_d:'Series D',
    }
  },
];

// Helper: get brand by ID
function getBrandById(id) {
  return BRANDS.find(b => b.id === id) || null;
}

// Read brand from URL param
function getActiveBrandId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('brand') || 'strongfit-cpvc';
}
