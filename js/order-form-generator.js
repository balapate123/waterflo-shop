// ══════��════════════════════════════════════════════════════════════════════════
// Order Form Generator — Generates print-ready order forms matching Excel templates
// Currently supports: StrongFit CPVC (Sheet 1 of 6)
// ══��════════════════��═══════════════════════════════════════════════════════════

(function(window) {
  'use strict';

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function esc(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function fmtDate(d) {
    if (!d) return '';
    var dt = new Date(d);
    var dd = String(dt.getDate()).padStart(2,'0');
    var mm = String(dt.getMonth()+1).padStart(2,'0');
    var yy = dt.getFullYear();
    return dd + '-' + mm + '-' + yy;
  }

  // Build lookup from order items, keyed by code (and code_unitType for pipes)
  function buildItemLookup(items) {
    var map = {};
    (items || []).forEach(function(it) {
      // For pipe bundles, store by code_unitType for 3m/5m differentiation
      if (it.unit_type && (it.unit_type === 'bundle3m' || it.unit_type === 'bundle5m')) {
        map[it.code + '_' + it.unit_type] = it;
      }
      // Also store by code (first occurrence wins, or overwrite for non-pipes)
      if (!map[it.code] || !it.unit_type.startsWith('bundle')) {
        map[it.code] = it;
      }
    });
    return map;
  }

  // Get display value for a cell: number for box/bundle, "N IB" for packet
  function cellVal(lookup, code, unitFilter) {
    if (!code) return '';
    // Try composite key first (for pipe 3m/5m)
    if (unitFilter) {
      var it = lookup[code + '_' + unitFilter];
      if (it) return fmtQty(it);
    }
    // Fall back to code only
    var it2 = lookup[code];
    if (it2) {
      // If unitFilter specified but doesn't match, skip (e.g., want bundle5m but item is bundle3m)
      if (unitFilter && it2.unit_type !== unitFilter) return '';
      return fmtQty(it2);
    }
    return '';
  }

  function fmtQty(it) {
    if (it.unit_type === 'stdpkg') return it.qty + ' IB';
    return String(it.qty);
  }

  // Render a data cell (fillable or "-")
  function dc(val, isUnavail) {
    if (isUnavail) return '<td class="c na">-</td>';
    var cls = val ? 'c filled' : 'c';
    return '<td class="' + cls + '">' + esc(val) + '</td>';
  }

  // ─── CPVC ORDER FORM (Sheet 1) — StrongFit™ ────────────────────────────────

  // Standard 10 sizes for pipes & main fittings
  var STD_SIZES = ['\u00bd"', '\u00be"', '1"', '1\u00bc"', '1\u00bd"', '2"', '2\u00bd"', '3"', '4"', '6"'];

  function buildCPVCForm(order, items, party) {
    var L = buildItemLookup(items);
    var cv = function(code, uf) { return cellVal(L, code, uf); };

    var h = '';
    h += '<div class="form-page">';
    h += '<table class="of">';

    // ── Row 0: Header ──
    h += '<tr class="hdr">';
    h += '<td colspan="3" class="brand-name">StrOngFit\u2122</td>';
    h += '<td colspan="10" class="company-name">WATERFLO PIPING SYSTEM</td>';
    h += '</tr>';

    // ── Row 1: Form title ──
    h += '<tr class="hdr">';
    h += '<td colspan="13" class="form-title">CPVC ORDER FORM</td>';
    h += '</tr>';

    // ── Row 2: Party name ──
    h += '<tr class="info-row">';
    h += '<td colspan="13" class="party-field">PARTY NAME:- <span class="fill-val">' + esc(party.company_name) + '</span></td>';
    h += '</tr>';

    // ── Row 3: Date, State, Delivery ──
    h += '<tr class="info-row">';
    h += '<td colspan="5" class="party-field">ORDER DATE:- <span class="fill-val">' + fmtDate(order.created_at) + '</span></td>';
    h += '<td colspan="3" class="party-field">STATE:- <span class="fill-val">' + esc(party.state || '') + '</span></td>';
    h += '<td colspan="5" class="party-field">DELIVERY:- <span class="fill-val"></span></td>';
    h += '</tr>';

    // ── PIPE SIZE header ──
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">PIPE SIZE</td>';
    STD_SIZES.forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';

    // ── Pipe rows ──
    // SDR 11 (3mtr.): all 10 sizes fillable
    var sdr11_3m = ['CP1115','CP1120','CP1125','CP1132','CP1140','CP1150','CP8065','CP8080','CP80100','CP80150'];
    h += pipeRow('SDR 11 (3mtr.)', sdr11_3m, 'bundle3m', [], L);

    // SDR 11 (5mtr.): cols 6-9 (2½"-6") unavailable
    var sdr11_5m = ['CP1115','CP1120','CP1125','CP1132','CP1140','CP1150',null,null,null,null];
    h += pipeRow('SDR 11 (5mtr.)', sdr11_5m, 'bundle5m', [6,7,8,9], L);

    // SDR 13.5 (3mtr.): all 10 sizes fillable
    var sdr135_3m = ['CP13515','CP13520','CP13525','CP13532','CP13540','CP13550','CP4065','CP4080','CP40100','CP40150'];
    h += pipeRow('SDR 13.5 (3mtr.)', sdr135_3m, 'bundle3m', [], L);

    // SDR 13.5 (5mtr.): cols 6-9 unavailable
    var sdr135_5m = ['CP13515','CP13520','CP13525','CP13532','CP13540','CP13550',null,null,null,null];
    h += pipeRow('SDR 13.5 (5mtr.)', sdr135_5m, 'bundle5m', [6,7,8,9], L);

    // COLD WATER (5mtr): col0(½") "-", col1-2(¾",1") fillable, col3-9 "-"
    h += pipeRow('COLD WATER (5mtr)', [null,null,null,null,null,null,null,null,null,null], 'bundle5m', [0,3,4,5,6,7,8,9], L);

    // ── FITTING SIZE header ──
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">FITTING SIZE</td>';
    STD_SIZES.forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';

    // ── Fitting rows ──
    // ELBOW: all sizes
    h += fittingRow('ELBOW', ['CFE15','CFE20','CFE25','CFE32','CFE40','CFE50','CFE65','CFE80','CFE100','CFE150'], [], L);
    // TEE
    h += fittingRow('TEE', ['CFT15','CFT20','CFT25','CFT32','CFT40','CFT50','CFT65','CFT80','CFT100','CFT150'], [], L);
    // COUPLER
    h += fittingRow('COUPLER', ['CFC15','CFC20','CFC25','CFC32','CFC40','CFC50','CFC65','CFC80','CFC100','CFC150'], [], L);
    // END CAP
    h += fittingRow('END CAP', ['CFEC15','CFEC20','CFEC25','CFEC32','CFEC40','CFEC50','CFEC65','CFEC80','CFEC100','CFEC150'], [], L);
    // F.T.A.
    h += fittingRow('F.T.A.', ['CFF15','CFF20','CFF25','CFF32','CFF40','CFF50','CFF65','CFF80','CFF100','CFF150'], [], L);
    // M.T.A.
    h += fittingRow('M.T.A.', ['CFM15','CFM20','CFM25','CFM32','CFM40','CFM50','CFM65','CFM80','CFM100','CFM150'], [], L);
    // UNION: 6" is "-"
    h += fittingRow('UNION', ['CFU15','CFU20','CFU25','CFU32','CFU40','CFU50','CFU65','CFU80','CFU100',null], [9], L);
    // ELBOW 45º
    h += fittingRow('ELBOW 45\u00ba', ['CFE4515','CFE4520','CFE4525','CFE4532','CFE4540','CFE4550','CFE4565','CFE4580','CFE45100','CFE45150'], [], L);
    // BALL VALVE: 2½"-6" are "-"
    h += fittingRow('BALL VALVE', ['CFBV15','CFBV20','CFBV25','CFBV32','CFBV40','CFBV50',null,null,null,null], [6,7,8,9], L);
    // BRASS M.T.A.: 6" is "-"
    h += fittingRow('BRASS M.T.A.', ['CFBM15','CFBM20','CFBM25','CFBM32','CFBM40','CFBM50','CFBM65','CFBM80','CFBM100',null], [9], L);
    // BRASS F.T.A.: 6" is "-"
    h += fittingRow('BRASS F.T.A.', ['CFBF15','CFBF20','CFBF25','CFBF32','CFBF40','CFBF50','CFBF65','CFBF80','CFBF100',null], [9], L);
    // FLANGE: ½",¾",1",1¼" are "-"
    h += fittingRow('FLANGE', [null,null,null,null,'CFFG40','CFFG50','CFFG65','CFFG80','CFFG100','CFFG150'], [0,1,2,3], L);
    // T.C.SOCKET: ½""-", 1¼""-",1½""-",2""-", 6""-"
    h += fittingRow('T.C.SOCKET', [null,'CFTCS20','CFTCS25',null,null,null,'CFTCS65','CFTCS80','CFTCS100',null], [0,3,4,5,9], L);
    // T.CONNECTOR: 2½"+ "-"
    h += fittingRow('T.CONNECTOR', ['CFTC15','CFTC20','CFTC25','CFTC32','CFTC40','CFTC50',null,null,null,null], [6,7,8,9], L);
    // CNVTR. BUSH: 2½"+ "-"
    h += fittingRow('CNVTR. BUSH', ['CFCB1515','CFCB2020','CFCB2525','CFCB3232','CFCB4040','CFCB5050',null,null,null,null], [6,7,8,9], L);
    // BEND 90º: 2½"+ "-"
    h += fittingRow('BEND 90\u00ba', ['CFB9015','CFB9020','CFB9025','CFB9032','CFB9040','CFB9050',null,null,null,null], [6,7,8,9], L);
    // N. R. V: ½""-", 2""-", 2½"+ "-"
    h += fittingRow('N. R. V', [null,'CFNRV20','CFNRV25','CFNRV32','CFNRV40',null,null,null,null,null], [0,5,6,7,8,9], L);
    // S.O.B.: ½""-", 2"+ "-"
    h += fittingRow('S.O.B.', [null,'CFSOB20','CFSOB25',null,null,null,null,null,null,null], [0,5,6,7,8,9], L);

    // ── BRASS FITTING SIZE header (different sizes) ──
    var BRASS_SIZES = ['\u00bd"', '\u00be"', '1"', '1\u00bc"', '1\u00bd"', '2"', '\u00be"x\u00bd"', '1"x\u00bd"', '1"x\u00be"', ''];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">FITTING SIZE</td>';
    BRASS_SIZES.forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';

    // BRASS ELBOW: 1¼",1½",2" "-", last "-"
    h += fittingRow('BRASS ELBOW', ['CFBE15','CFBE20','CFBE25',null,null,null,'CFBE2015','CFBE2515','CFBE2520',null], [3,4,5,9], L);
    // BRASS TEE: same pattern
    h += fittingRow('BRASS TEE', ['CFBT15','CFBT20','CFBT25',null,null,null,'CFBT2015','CFBT2515','CFBT2520',null], [3,4,5,9], L);
    // B. M.T.A. (HEX): ½" "-", last 3 "-"
    h += fittingRow('B. M.T.A. (HEX)', [null,'CFBMH20','CFBMH25','CFBMH32','CFBMH40','CFBMH50','CFBMH2015',null,null,null], [0,7,8,9], L);
    // B. F.T.A. (HEX): ½" "-", last 3 "-"
    h += fittingRow('B. F.T.A. (HEX)', [null,'CFBFH20','CFBFH25','CFBFH32','CFBFH40','CFBFH50','CFBFH2015',null,null,null], [0,7,8,9], L);

    // ── MIXED SECTION (split layout: left items + right items) ──
    // Header row: left sizes ¾",1" | - | right sizes ¾"x½",1"x½",1"x¾",½"
    h += '<tr class="sec-hdr">';
    h += '<td colspan="3" class="lbl">FITTING SIZE</td>';
    h += '<td class="c sz">\u00be"</td>';
    h += '<td class="c sz">1"</td>';
    h += '<td class="c na">-</td>';
    h += '<td class="c sz">\u00be"x\u00bd"</td>';
    h += '<td class="c sz">1"x\u00bd"</td>';
    h += '<td class="c sz">1"x\u00be"</td>';
    h += '<td class="c sz">\u00bd"</td>';
    h += '<td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '</tr>';

    // CROSS TEE | R.ELBOW
    h += mixedRow('CROSS TEE', ['CFCT20','CFCT25'], 'R.ELBOW', ['CFRE2015','CFRE2515','CFRE2520',null], [3], L);
    // LONG RADIUS BEND | R M.T.A
    h += mixedRow('LONG RADIUS BEND', [null,null], 'R M.T.A', ['CFM2015',null,'CFM2520',null], [1,3], L);
    // CNCLD. VALVE | R F.T.A
    h += mixedRow('CNCLD. VALVE', ['CFCV20','CFCV25'], 'R F.T.A', ['CFF2015',null,null,null], [1,2,3], L);
    // C V SHORT TRIANGLE KNOB | LONG PLUG
    h += mixedRow('C V SHORT TRIANGLE KNOB', [null,null], 'LONG PLUG', [null,null,null,'LP15'], [0,1,2], L);
    // C V LONG TRIANGLE KNOB | BRASS MTA
    h += mixedRow('C V LONG TRIANGLE KNOB', [null,null], 'BRASS MTA', ['CFBM2015','CFBM2515','CFBM2520',null], [3], L);
    // C V SHORT ROUND KNOB | BRASS FTA
    h += mixedRow('C V SHORT ROUND KNOB', [null,null], 'BRASS FTA', [null,null,null,null], [3], L);
    // C V LONG ROUND KNOB | (all "-")
    h += '<tr class="data-row">';
    h += '<td colspan="3" class="lbl">C V LONG ROUND KNOB</td>';
    h += dc(cv('CFCVLR20'), false) + dc(cv('CFCVLR25'), false);
    h += '<td class="c na">-</td><td class="c na">-</td><td class="c na">-</td><td class="c na">-</td><td class="c na">-</td>';
    h += '<td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '</tr>';

    // ── REDUCER SECTION 1 ──
    var RED1_SIZES = ['\u00be"x\u00bd"','1"x\u00bd"','1"x\u00be"','1\u00bc"x\u00bd"','1\u00bc"x\u00be"','1\u00bc"x1"','1\u00bd"x\u00bd"','1\u00bd"x\u00be"','1\u00bd"x1"','1\u00bd"x1\u00bc"'];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">REDUCING SIZE</td>';
    RED1_SIZES.forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';

    h += fittingRow('R. COUPLER', ['CFRC2015','CFRC2515','CFRC2520','CFRC3215','CFRC3220','CFRC3225','CFRC4015','CFRC4020','CFRC4025','CFRC4032'], [], L);
    h += fittingRow('R. BUSH', ['CFRB2015','CFRB2515','CFRB2520','CFRB3215','CFRB3220','CFRB3225','CFRB4015','CFRB4020','CFRB4025','CFRB4032'], [], L);
    h += fittingRow('R. TEE', ['CFRT2015','CFRT2515','CFRT2520','CFRT3215','CFRT3220','CFRT3225','CFRT4015','CFRT4020','CFRT4025','CFRT4032'], [], L);

    // ── REDUCER SECTION 2 ──
    var RED2_SIZES = ['2"x\u00bd"','2"x\u00be"','2"x1"','2"x1\u00bc"','2"x1\u00bd"','2\u00bd"X2"','3"X1\u00bd"','3"X2"','3"X2\u00bd"','4"x2"'];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">REDUCING SIZE</td>';
    RED2_SIZES.forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';

    // R. COUPLER: 2½"X2" (col5) is "-" per form
    h += fittingRow('R. COUPLER', ['CFRC5015','CFRC5020','CFRC5025','CFRC5032','CFRC5040',null,null,'CFRC8050C','CFRC8065','CFRC10050C'], [5,6], L);
    // R. BUSH: same "-" pattern
    h += fittingRow('R. BUSH', ['CFRB5015','CFRB5020','CFRB5025','CFRB5032','CFRB5040',null,null,'CFRB8050C','CFRB8065','CFRB10050C'], [5,6], L);
    // R. TEE: all fillable
    h += fittingRow('R. TEE', ['CFRT5015','CFRT5020','CFRT5025','CFRT5032','CFRT5040','CFRT6550C','CFRT8040C','CFRT8050C','CFRT8065','CFRT10050C'], [], L);

    // ── REDUCER SECTION 3 + MIXER ADAPTORS ──
    h += '<tr class="sec-hdr">';
    h += '<td colspan="3" class="lbl">REDUCING SIZE</td>';
    h += '<td class="c sz rsz">4"x2\u00bd"</td>';
    h += '<td class="c sz rsz">4"x3"</td>';
    h += '<td class="c sz rsz">6"x2"</td>';
    h += '<td class="c sz rsz">6"x2\u00bd"</td>';
    h += '<td class="c sz rsz">6"x3"</td>';
    h += '<td class="c sz rsz">6"x4"</td>';
    h += '<td class="c sz" style="font-size:6px">MIXER ADAPTOR</td>';
    h += '<td class="c"></td>';
    h += '<td class="c sz">6"</td>';
    h += '<td class="c sz">7"</td>';
    h += '</tr>';

    // R. COUPLER row + TOP & BOTTOM mixer
    h += '<tr class="data-row"><td colspan="3" class="lbl">R. COUPLER</td>';
    h += dc(cv('CFRC10065'), false);
    h += dc(cv('CFRC10080'), false);
    h += dc('', true); // 6"x2" "-"
    h += dc(cv(''), false);
    h += dc('', true); // 6"x3" "-"
    h += dc(cv(''), false);
    h += '<td class="c mix-lbl">TOP &amp; BOTTOM</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFTB62015'), false);
    h += dc(cv('CFTB72015'), false);
    h += '</tr>';

    // R. BUSH + ALL TOP mixer
    h += '<tr class="data-row"><td colspan="3" class="lbl">R. BUSH</td>';
    h += dc(cv('CFRB10065'), false);
    h += dc(cv('CFRB10080'), false);
    h += dc(cv(''), false);
    h += dc('', true); // "-"
    h += dc(cv(''), false);
    h += dc(cv(''), false);
    h += '<td class="c mix-lbl">ALL TOP</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFAT62015'), false);
    h += dc(cv('CFAT72015'), false);
    h += '</tr>';

    // R. TEE + TOP & SIDE mixer
    h += '<tr class="data-row"><td colspan="3" class="lbl">R. TEE</td>';
    h += dc(cv('CFRT10065'), false);
    h += dc(cv('CFRT10080'), false);
    h += dc('', true); // "-"
    h += dc(cv(''), false);
    h += dc('', true); // "-"
    h += dc(cv(''), false);
    h += '<td class="c mix-lbl">TOP &amp; SIDE</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFTS62015'), false);
    h += dc(cv('CFTS72015'), false);
    h += '</tr>';

    // BUNDLE:- row + HOT UP & COLD DOWN mixer
    h += '<tr class="data-row"><td colspan="3" class="lbl">BUNDLE:-</td>';
    h += '<td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '<td class="c mix-lbl">HOT UP &amp; COLD DOWN</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFUD62015'), false);
    h += dc(cv('CFUD72015'), false);
    h += '</tr>';

    // BOX:- row + HOT SIDE & COLD DOWN mixer
    h += '<tr class="data-row"><td colspan="3" class="lbl">BOX :-</td>';
    h += '<td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '<td class="c mix-lbl">HOT SIDE &amp; COLD DOWN</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFSD62015'), false);
    h += dc(cv('CFSD72015'), false);
    h += '</tr>';

    // ITEM:- row + KITCHEN MIXER ADAPTOR
    h += '<tr class="data-row"><td colspan="3" class="lbl">ITEM:-</td>';
    h += '<td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '<td class="c mix-lbl">KITCHEN MIXER ADAPTOR</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFKMA2015'), false);
    h += dc('', true); // 7" kitchen mixer "-"
    h += '</tr>';

    // TOTAL WT:- row
    h += '<tr class="data-row"><td colspan="3" class="lbl">TOTAL WT:-</td>';
    for (var i = 0; i < 10; i++) h += '<td class="c"></td>';
    h += '</tr>';

    h += '</table>';
    h += '</div>'; // .form-page

    return h;
  }

  // Helper: pipe row
  function pipeRow(label, codes, unitFilter, unavailCols, L) {
    var h = '<tr class="data-row">';
    h += '<td colspan="3" class="lbl">' + esc(label) + '</td>';
    for (var i = 0; i < 10; i++) {
      if (unavailCols.indexOf(i) >= 0 || codes[i] === null) {
        h += '<td class="c na">-</td>';
      } else {
        var val = cellVal(L, codes[i], unitFilter);
        h += '<td class="c' + (val ? ' filled' : '') + '">' + esc(val) + '</td>';
      }
    }
    h += '</tr>';
    return h;
  }

  // Helper: fitting row (same as pipe but no unitFilter)
  function fittingRow(label, codes, unavailCols, L) {
    var h = '<tr class="data-row">';
    h += '<td colspan="3" class="lbl">' + esc(label) + '</td>';
    for (var i = 0; i < 10; i++) {
      if (unavailCols.indexOf(i) >= 0 || codes[i] === null) {
        h += '<td class="c na">-</td>';
      } else {
        var val = cellVal(L, codes[i]);
        h += '<td class="c' + (val ? ' filled' : '') + '">' + esc(val) + '</td>';
      }
    }
    h += '</tr>';
    return h;
  }

  // Helper: mixed row (left 2 cols + right 4 cols)
  function mixedRow(leftLabel, leftCodes, rightLabel, rightCodes, rightUnavail, L) {
    var h = '<tr class="data-row">';
    h += '<td colspan="3" class="lbl">' + esc(leftLabel) + '</td>';
    // Left: 2 size columns (¾", 1")
    h += dc(cellVal(L, leftCodes[0]), false);
    h += dc(cellVal(L, leftCodes[1]), false);
    // Right label
    h += '<td class="c mix-lbl rlbl">' + esc(rightLabel) + '</td>';
    // Right: 4 size columns (¾"x½", 1"x½", 1"x¾", ½")
    for (var i = 0; i < 4; i++) {
      if (rightUnavail.indexOf(i) >= 0 || rightCodes[i] === null) {
        h += '<td class="c na">-</td>';
      } else {
        h += dc(cellVal(L, rightCodes[i]), false);
      }
    }
    // 3 empty cols to fill 13 total
    h += '<td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '</tr>';
    return h;
  }


  // ─── Placeholder forms for sheets 2-6 ──────────────────────────────────────

  function buildPlaceholderForm(title, brandLabel) {
    var h = '<div class="form-page">';
    h += '<table class="of">';
    h += '<tr class="hdr"><td colspan="13" class="form-title">' + esc(brandLabel) + ' \u2014 WATERFLO PIPING SYSTEM</td></tr>';
    h += '<tr class="hdr"><td colspan="13" class="form-title">' + esc(title) + '</td></tr>';
    h += '<tr><td colspan="13" style="text-align:center;padding:40px;color:#999;font-style:italic">Form coming soon \u2014 no items for this form</td></tr>';
    h += '</table>';
    h += '</div>';
    return h;
  }


  // ─── Main: Generate all 6 forms and open in print window ────��──────────────

  function generateOrderForms(order, items, party) {
    // Filter items by brand if needed (for now, StrongFit = all items)
    var cpvcItems = items; // All items go to CPVC form for StrongFit

    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">';
    html += '<title>Order Form \u2014 ' + esc(order.order_no) + '</title>';
    html += '<style>' + getFormCSS() + '</style>';
    html += '</head><body>';

    // Form 1: CPVC
    html += buildCPVCForm(order, cpvcItems, party);

    // Forms 2-6: placeholders for now
    html += buildPlaceholderForm('AGRI ORDER FORM', 'AgriMASTER');
    html += buildPlaceholderForm('uPVC ORDER FORM', 'Surefit\u00ae');
    html += buildPlaceholderForm('SWR ORDER FORM', 'WATERFLO');
    html += buildPlaceholderForm('PIPES ORDER FORM', 'WATERFLO');
    html += buildPlaceholderForm('MISC ORDER FORM', 'WATERFLO');

    html += '</body></html>';

    var w = window.open('', '_blank', 'width=900,height=700');
    if (!w) { alert('Popup blocked — please allow popups for this site.'); return; }
    w.document.write(html);
    w.document.close();
    // Auto-trigger print after a brief render delay
    setTimeout(function() { w.focus(); w.print(); }, 400);
  }


  // ─── Print CSS ────────���────────────────────────────���───────────────────────

  function getFormCSS() {
    return [
      '* { margin:0; padding:0; box-sizing:border-box; }',
      'body { font-family: Arial, Helvetica, sans-serif; font-size: 9px; color: #000; }',
      '.form-page { page-break-after: always; padding: 8px; }',
      '.form-page:last-child { page-break-after: auto; }',
      'table.of { width: 100%; border-collapse: collapse; table-layout: fixed; }',
      'table.of td { border: 1px solid #000; padding: 2px 3px; vertical-align: middle; }',

      /* Header rows */
      '.hdr td { border: none; text-align: center; }',
      '.brand-name { font-size: 14px; font-weight: 700; text-align: left !important; color: #c62828; }',
      '.company-name { font-size: 12px; font-weight: 700; text-align: center; }',
      '.form-title { font-size: 13px; font-weight: 700; text-align: center; letter-spacing: 2px; padding: 4px 0; }',

      /* Info rows */
      '.info-row td { border-bottom: 1px solid #000; border-left: none; border-right: none; font-size: 9px; padding: 3px 4px; }',
      '.party-field { font-weight: 600; }',
      '.fill-val { font-weight: 400; text-decoration: underline; margin-left: 4px; }',

      /* Section headers */
      '.sec-hdr td { background: #e8e8e8; font-weight: 700; font-size: 8px; text-align: center; }',
      '.sec-hdr .lbl { text-align: left; font-size: 9px; padding-left: 4px; }',
      '.sz { font-size: 7.5px; white-space: nowrap; }',
      '.rsz { font-size: 6.5px; }',

      /* Data rows */
      '.data-row td { height: 16px; }',
      '.lbl { font-weight: 600; font-size: 8px; text-align: left; padding-left: 4px; white-space: nowrap; overflow: hidden; }',
      '.c { text-align: center; font-size: 9px; font-weight: 700; }',
      '.na { color: #999; font-weight: 400; }',
      '.filled { background: #fff9c4; color: #d84315; font-weight: 800; font-size: 10px; }',
      '.mix-lbl { font-size: 6.5px; font-weight: 600; text-align: left; padding-left: 2px; white-space: nowrap; }',
      '.rlbl { background: #f5f5f5; }',

      /* Print */
      '@media print {',
      '  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }',
      '  .form-page { padding: 4px; margin: 0; }',
      '  .filled { background: #fff9c4 !important; }',
      '  @page { size: A4 portrait; margin: 8mm; }',
      '}',

      /* Screen view */
      '@media screen {',
      '  .form-page { max-width: 800px; margin: 12px auto; border: 2px solid #333; background: #fff; padding: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }',
      '}'
    ].join('\n');
  }


  // ─── Expose globally ─────────���─────────────────────────────────────────────
  window.generateOrderForms = generateOrderForms;

})(window);
