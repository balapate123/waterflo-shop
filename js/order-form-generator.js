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

  var _suppressIB = false;
  function fmtQty(it) {
    if (it.unit_type === 'stdpkg' && !_suppressIB) return it.qty + ' IB';
    return String(it.qty);
  }

  // Format currency for summary sheet
  function fmtCur(n) { return '\u20B9' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  // Build final Order Summary sheet listing all items
  function buildOrderSummarySheet(order, items, party) {
    var h = '<div class="form-page">';
    h += '<table class="of">';

    // Header
    h += '<tr class="hdr"><td colspan="10" class="company-name">WATERFLO PIPING SYSTEM</td></tr>';
    h += '<tr class="hdr"><td colspan="10" class="form-title">ORDER SUMMARY</td></tr>';

    // Party info
    h += '<tr class="info-row"><td colspan="10" class="party-field">PARTY NAME:- <span class="fill-val">' + esc(party.company_name) + '</span></td></tr>';
    h += '<tr class="info-row">';
    h += '<td colspan="4" class="party-field">ORDER NO:- <span class="fill-val">' + esc(order.order_no) + '</span></td>';
    h += '<td colspan="3" class="party-field">DATE:- <span class="fill-val">' + fmtDate(order.created_at) + '</span></td>';
    h += '<td colspan="3" class="party-field">STATE:- <span class="fill-val">' + esc(party.state || '') + '</span></td>';
    h += '</tr>';

    // Column headers (added Disc% column)
    h += '<tr class="sec-hdr">';
    h += '<td class="c sz" style="width:3%;text-align:center">#</td>';
    h += '<td class="c sz" style="width:11%">Code</td>';
    h += '<td class="c sz" style="width:25%">Product</td>';
    h += '<td class="c sz" style="width:7%">Size</td>';
    h += '<td class="c sz" style="width:9%">Unit</td>';
    h += '<td class="c sz" style="width:9%;text-align:right">Rate/Unit</td>';
    h += '<td class="c sz" style="width:5%;text-align:center">Qty</td>';
    h += '<td class="c sz" style="width:6%;text-align:center">Total Pcs</td>';
    h += '<td class="c sz" style="width:5%;text-align:center">Disc%</td>';
    h += '<td class="c sz" style="width:11%;text-align:right">Amount</td>';
    h += '<td class="c sz" style="width:3%"></td>';
    h += '</tr>';

    var grandTotal = 0;
    var totalDiscount = 0;
    var discountByCategory = {}; // { 'CPVC Pipes': { pct: 59.90, amt: 1234 }, ... }
    var hasPerItemDiscounts = false;

    (items || []).forEach(function(it, i) {
      var amt = (it.rate_per_unit || 0) * (it.qty || 0);
      var totalPcs = (it.pcs_per_unit || 1) * (it.qty || 0);
      var itemDiscPct = it.discount_percent || 0;
      var itemDiscAmt = itemDiscPct > 0 ? Math.round(amt * itemDiscPct / 100 * 100) / 100 : 0;
      grandTotal += amt;
      totalDiscount += itemDiscAmt;
      if (itemDiscPct > 0) {
        hasPerItemDiscounts = true;
        var catKey = it.trade_category || 'Other';
        if (!discountByCategory[catKey]) discountByCategory[catKey] = { pct: itemDiscPct, amt: 0 };
        discountByCategory[catKey].amt += itemDiscAmt;
      }
      h += '<tr class="data-row">';
      h += '<td class="c" style="text-align:center">' + (i + 1) + '</td>';
      h += '<td class="c" style="font-family:monospace;font-size:7.5px;text-align:left">' + esc(it.code) + '</td>';
      h += '<td class="c" style="text-align:left;font-size:8px">' + esc(it.name) + '</td>';
      h += '<td class="c" style="text-align:center">' + esc(it.size) + '</td>';
      h += '<td class="c" style="font-size:7.5px">' + esc(it.unit_label || '') + '</td>';
      h += '<td class="c" style="text-align:right">' + fmtCur(it.rate_per_unit) + '</td>';
      h += '<td class="c filled" style="text-align:center;font-weight:700">' + fmtQty(it) + '</td>';
      h += '<td class="c" style="text-align:center">' + totalPcs.toLocaleString('en-IN') + '</td>';
      h += '<td class="c" style="text-align:center;font-size:7.5px">' + (itemDiscPct > 0 ? itemDiscPct + '%' : '') + '</td>';
      h += '<td class="c" style="text-align:right">' + fmtCur(amt) + '</td>';
      h += '<td class="c"></td>';
      h += '</tr>';
    });

    // If no per-item discounts stored, fall back to the order-level averaged discount
    if (!hasPerItemDiscounts) {
      var fallbackDiscPct = order.discount_percent || 0;
      if (fallbackDiscPct > 0) {
        totalDiscount = Math.round(grandTotal * fallbackDiscPct / 100 * 100) / 100;
        discountByCategory['Discount'] = { pct: fallbackDiscPct, amt: totalDiscount };
      }
    }

    var netTotal = grandTotal - totalDiscount;

    h += '<tr style="background:#e8e8e8;font-weight:700">';
    h += '<td colspan="9" style="text-align:right;padding:4px 6px;font-size:9px">SUBTOTAL</td>';
    h += '<td style="text-align:right;padding:4px 6px;font-size:9px">' + fmtCur(grandTotal) + '</td>';
    h += '<td></td></tr>';

    // Show category-wise discount breakdown
    var catKeys = Object.keys(discountByCategory);
    for (var ci = 0; ci < catKeys.length; ci++) {
      var catName = catKeys[ci];
      var catDisc = discountByCategory[catName];
      h += '<tr style="background:#e8f5e9;font-weight:600">';
      h += '<td colspan="9" style="text-align:right;padding:4px 6px;font-size:9px;color:#2e7d32">DISCOUNT: ' + esc(catName) + ' (' + catDisc.pct + '%)</td>';
      h += '<td style="text-align:right;padding:4px 6px;font-size:9px;color:#2e7d32">&minus;' + fmtCur(catDisc.amt) + '</td>';
      h += '<td></td></tr>';
    }

    h += '<tr style="background:#1a237e;color:white;font-weight:700">';
    h += '<td colspan="9" style="text-align:right;padding:6px;font-size:10px">NET TOTAL</td>';
    h += '<td style="text-align:right;padding:6px;font-size:10px">' + fmtCur(netTotal) + '</td>';
    h += '<td></td></tr>';

    // Signature area
    h += '<tr><td colspan="10" style="border:none;padding:30px 10px 5px;font-size:9px">';
    h += '<div style="display:flex;justify-content:space-between">';
    h += '<div style="text-align:center;width:40%"><div style="border-top:1px solid #000;padding-top:4px">Authorized Signature</div></div>';
    h += '<div style="text-align:center;width:40%"><div style="border-top:1px solid #000;padding-top:4px">Party Signature</div></div>';
    h += '</div></td></tr>';

    h += '</table>';
    h += '</div>';
    return h;
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

    // ── Row 4: Lorry No ──
    h += '<tr class="info-row">';
    h += '<td colspan="13" class="party-field">LORRY NO     :- <span class="fill-val"></span></td>';
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
    // T.C.SOCKET: ½" "-", 6" "-"
    h += fittingRow('T.C.SOCKET', [null,'CFTCS20','CFTCS25','CFTCS32','CFTCS40','CFTCS50','CFTCS65','CFTCS80','CFTCS100',null], [0,9], L);
    // T.CONNECTOR: 2½"+ "-"
    h += fittingRow('T.CONNECTOR', ['CFTC15','CFTC20','CFTC25','CFTC32','CFTC40','CFTC50',null,null,null,null], [6,7,8,9], L);
    // CNVTR. BUSH: 2½"+ "-"
    h += fittingRow('CNVTR. BUSH', ['CFCB1515','CFCB2020','CFCB2525','CFCB3232','CFCB4040','CFCB5050',null,null,null,null], [6,7,8,9], L);
    // BEND 90º: 2½"+ "-"
    h += fittingRow('BEND 90\u00ba', ['CFB9015','CFB9020','CFB9025','CFB9032','CFB9040','CFB9050',null,null,null,null], [6,7,8,9], L);
    // N. R. V: ½""-", 2""-", 2½"+ "-"
    h += fittingRow('N. R. V', [null,'CFNRV20','CFNRV25','CFNRV32','CFNRV40',null,null,null,null,null], [0,5,6,7,8,9], L);
    // S.O.B.: ½" "-", 2"+ "-"
    h += fittingRow('S.O.B.', [null,'CFSOB20','CFSOB25','CFSOB32','CFSOB40',null,null,null,null,null], [0,5,6,7,8,9], L);

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
    h += fittingRow('B. F.T.A. (HEX)', [null,'CFBFH20','CFBFH25','CFBFM32','CFBFM40','CFBFM50','CFBFH2015',null,null,null], [0,7,8,9], L);

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
    h += mixedRow('LONG RADIUS BEND', ['CFLRB20','CFLRB25'], 'R M.T.A', ['CFM2015',null,'CFM2520',null], [1,3], L);
    // CNCLD. VALVE | R F.T.A
    h += mixedRow('CNCLD. VALVE', ['CFCV20','CFCV25'], 'R F.T.A', ['CFF2015',null,null,null], [1,2,3], L);
    // C V SHORT TRIANGLE KNOB | LONG PLUG
    h += mixedRow('C V SHORT TRIANGLE KNOB', ['CFCVST20','CFCVST25'], 'LONG PLUG', [null,null,null,'LP15'], [0,1,2], L);
    // C V LONG TRIANGLE KNOB | BRASS MTA
    h += mixedRow('C V LONG TRIANGLE KNOB', ['CFCVLT20','CFCVLT25'], 'BRASS MTA', ['CFBM2015','CFBM2515','CFBM2520',null], [3], L);
    // C V SHORT ROUND KNOB | BRASS FTA
    h += mixedRow('C V SHORT ROUND KNOB', ['CFCVSR20','CFCVSR25'], 'BRASS FTA', ['CFBF2015','CFBF2515','CFBF2520',null], [3], L);
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
    h += dc(cv('CFRC15065'), false);
    h += dc('', true); // 6"x3" "-"
    h += dc(cv('CFRC150100'), false);
    h += '<td class="c mix-lbl">TOP &amp; BOTTOM</td>';
    h += '<td class="c"></td>';
    h += dc(cv('CFTB62015'), false);
    h += dc(cv('CFTB72015'), false);
    h += '</tr>';

    // R. BUSH + ALL TOP mixer
    h += '<tr class="data-row"><td colspan="3" class="lbl">R. BUSH</td>';
    h += dc(cv('CFRB10065'), false);
    h += dc(cv('CFRB10080'), false);
    h += dc(cv('CFRB15050'), false);
    h += dc('', true); // 6"x2½" "-"
    h += dc(cv('CFRB15080'), false);
    h += dc(cv('CFRB150110'), false);
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


  // ─── uPVC ORDER FORM (Sheet 3) — Surefit® ──────────────────────────────────

  // Standard 10 sizes for uPVC pipes & main fittings
  var UPVC_SIZES = ['\u00bd"', '\u00be"', '1"', '1\u00bc"', '1\u00bd"', '2"', '2\u00bd"', '3"', '4"', '6"'];

  function buildUPVCForm(order, items, party) {
    var L = buildItemLookup(items);
    var cv = function(code, uf) { return cellVal(L, code, uf); };

    var h = '';
    h += '<div class="form-page">';
    h += '<table class="of">';

    // ── Row 0: Header ──
    h += '<tr class="hdr">';
    h += '<td colspan="3" class="brand-name">Surefit\u00ae</td>';
    h += '<td colspan="10" class="company-name">WATERFLO PIPING SYSTEM</td>';
    h += '</tr>';

    // ── Row 1: Form title ──
    h += '<tr class="hdr">';
    h += '<td colspan="13" class="form-title">uPVC ORDER FORM</td>';
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

    // ── Row 4: Lorry No ──
    h += '<tr class="info-row">';
    h += '<td colspan="13" class="party-field">LORRY NO     :- <span class="fill-val"></span></td>';
    h += '</tr>';

    // ── FITTING SIZE header ──
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">FITTING SIZE</td>';
    UPVC_SIZES.forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';

    // ── Pipe rows ──
    // PIPE (3mtr.): all 10 sizes fillable
    var pipe3m = ['UP8015','UP8020','UP8025','UP8032','UP8040','UP8050','UP8065','UP8080','UP80100','UP80150'];
    h += pipeRow('PIPE (3mtr.)', pipe3m, 'bundle3m', [], L);

    // PIPE (5mtr.): all 10 sizes fillable
    var pipe5m = ['UP8015','UP8020','UP8025','UP8032','UP8040','UP8050','UP8065','UP8080','UP80100','UP80150'];
    h += pipeRow('PIPE (5mtr.)', pipe5m, 'bundle5m', [], L);

    // ── Main Fitting rows (SCH 80) ──
    // ELBOW: all sizes
    h += fittingRow('ELBOW', ['UFE8015','UFE8020','UFE8025','UFE8032','UFE8040','UFE8050','UFE65','UFE80','UFE100','UFE150'], [], L);
    // TEE
    h += fittingRow('TEE', ['UFT8015','UFT8020','UFT8025','UFT8032','UFT8040','UFT8050','UFT65','UFT80','UFT100','UFT150'], [], L);
    // COUPLER
    h += fittingRow('COUPLER', ['UFC8015','UFC8020','UFC8025','UFC8032','UFC8040','UFC8050','UFC65','UFC80','UFC100','UFC150'], [], L);
    // M.T.A.
    h += fittingRow('M.T.A.', ['UFM8015','UFM8020','UFM8025','UFM8032','UFM8040','UFM8050','UFM65','UFM80','UFM100','UFM150'], [], L);
    // F.T.A.
    h += fittingRow('F.T.A.', ['UFF8015','UFF8020','UFF8025','UFF8032','UFF8040','UFF8050','UFF65','UFF80','UFF100','UFF150'], [], L);
    // ELBOW 45º
    h += fittingRow('ELBOW 45\u00ba', ['UFE458015','UFE458020','UFE458025','UFE458032','UFE458040','UFE458050','UFE4565','UFE4580','UFE45100','UFE45150'], [], L);
    // END CAP
    h += fittingRow('END CAP', ['UFEC8015','UFEC8020','UFEC8025','UFEC8032','UFEC8040','UFEC8050','UFEC65','UFEC80','UFEC100','UFEC150'], [], L);
    // UNION: 6" is "-"
    h += fittingRow('UNION', ['UFU8015','UFU8020','UFU8025','UFU8032','UFU8040','UFU8050','UFU65','UFU80','UFU100',null], [9], L);
    // BALL VALVE: 2½"-6" are "-"
    h += fittingRow('BALL VALVE', ['UFBV15','UFBV20','UFBV25','UFBV32','UFBV40','UFBV50',null,null,null,null], [6,7,8,9], L);
    // BALL VALVE (COMP): 2½"-6" are "-"
    h += fittingRow('BALL VALVE (COMP)', ['UFCBV15','UFCBV20','UFCBV25','UFCBV32','UFCBV40','UFCBV50',null,null,null,null], [6,7,8,9], L);
    // BALL VALVE (LONG): 6" is "-"
    h += fittingRow('BALL VALVE (LONG)', ['UFCBVL15','UFCBVL20','UFCBVL25','UFCBVL32','UFCBVL40','UFCBVL50','UFCBVL65','UFCBVL80','UFCBVL100',null], [9], L);
    // BALL VALVE (LONG THR): 2½"-6" are "-"
    h += fittingRow('BALL VALVE (LONG THR)', ['UFCTBVL15','UFCTBVL20','UFCTBVL25','UFCTBVL32','UFCTBVL40','UFCTBVL50',null,null,null,null], [6,7,8,9], L);
    // FLANGE: ½" "-", ¾" "-", 1¼" "-", 6" "-"
    h += fittingRow('FLANGE', [null,null,'UFFG25',null,'UFFG40','UFFG50','UFFG65','UFFG80','UFFG100',null], [0,1,3,9], L);
    // T.CON. SOCKET: 1¼" "-", 1½" "-", 6" "-"
    h += fittingRow('T.CON. SOCKET', ['UFTCS8015','UFTCS8020','UFTCS8025',null,null,'UFTCS8050','UFTCS65','UFTCS80','UFTCS100',null], [3,4,9], L);
    // T. CON. (Thr): 2½"-6" are "-"
    h += fittingRow('T. CON. (Thr)', ['UFTC8015','UFTC8020','UFTC8025','UFTC8032','UFTC8040','UFTC8050',null,null,null,null], [6,7,8,9], L);
    // BRASS M.T.A.: 6" is "-"
    h += fittingRow('BRASS M.T.A.', ['UFBM15','UFBM20','UFBM25','UFBM32','UFBM40','UFBM50','UFBM65','UFBM80','UFBM100',null], [9], L);
    // BRASS F.T.A.: 6" is "-"
    h += fittingRow('BRASS F.T.A.', ['UFBF15','UFBF20','UFBF25','UFBF32','UFBF40','UFBF50','UFBF65','UFBF80','UFBF100',null], [9], L);
    // N.R.V: ½" "-", 2"-6" are "-"
    h += fittingRow('N.R.V', [null,'UFNRV20','UFNRV25','UFNRV32','UFNRV40',null,null,null,null,null], [0,5,6,7,8,9], L);

    // ── BRASS / REDUCING FITTINGS SECTION ──
    // Header: ½" | ¾" | 1" | ¾"x½" | 1"x½" | 1"x¾" | - | ¾"x½" | 1"x½" | 1"x¾"
    var BRASS_SIZES_U = ['\u00bd"', '\u00be"', '1"', '\u00be"x\u00bd"', '1"x\u00bd"', '1"x\u00be"', '', '\u00be"x\u00bd"', '1"x\u00bd"', '1"x\u00be"'];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">FITTING SIZE</td>';
    BRASS_SIZES_U.forEach(function(s, i) {
      if (i === 6) h += '<td class="c na">-</td>';
      else h += '<td class="c sz">' + s + '</td>';
    });
    h += '</tr>';

    // BRASS ELBOW: 1"x¾" = "-" | R. ELBOW
    h += upvcMixedRow('BRASS ELBOW', ['UFBE15','UFBE20','UFBE25','UFBE2015','UFBE2515',null], [5], 'R. ELBOW', ['UFRE802015','UFRE802515','UFRE802520'], [], L);
    // BRASS TEE: ¾" = "-" | B. FTA
    h += upvcMixedRow('BRASS TEE', ['UFBT15',null,'UFBT25','UFBT2015','UFBT2515','UFBT2520'], [1], 'B. FTA', ['UFBF2015','UFBF2515','UFBF2520'], [], L);
    // THR. ELBOW: ¾" = "-" | B. MTA
    h += upvcMixedRow('THR. ELBOW', ['UFET802015',null,'UFET8025','UFET802515','UFET802520',null], [1,5], 'B. MTA', ['UFBM2015','UFBM2515','UFBM2520'], [], L);
    // THR. TEE: ¾" = "-", ¾"x½" = "-"
    h += upvcMixedRow('THR. TEE', ['UFTT8015',null,'UFTT8025',null,'UFTT802515','UFTT802520'], [1,3], '', [null,null,null], [0,1,2], L);

    // ── SCH 40 FITTINGS SECTION ──
    // Header: ½" | ¾" | 1" | 1¼" | 1½" | 2" | - | ½" | ¾" | 1"
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">FITTING SIZE</td>';
    ['\u00bd"','\u00be"','1"','1\u00bc"','1\u00bd"','2"','','\u00bd"','\u00be"','1"'].forEach(function(s, i) {
      if (i === 6) h += '<td class="c na">-</td>';
      else h += '<td class="c sz">' + s + '</td>';
    });
    h += '</tr>';

    // ELBOW (40) | CROSS TEE
    h += upvcMixedRow40('ELBOW (40)', ['UFE4015','UFE4020','UFE4025','UFE4032','UFE4040','UFE4050'], [], 'CROSS TEE', ['UFCT4015','UFCT4020','UFCT4025'], [], L);
    // TEE (40) | ELBOW 45°(40)
    h += upvcMixedRow40('TEE (40)', ['UFT4015','UFT4020','UFT4025','UFT4032','UFT4040','UFT4050'], [], 'ELBOW 45\u00ba(40)', ['UFE454015','UFE454020','UFE454025'], [], L);
    // COUPLER (40) | LONG PLUG: ¾" "-", 1" "-"
    h += upvcMixedRow40('COUPLER (40)', ['UFC4015','UFC4020','UFC4025','UFC4032','UFC4040','UFC4050'], [], 'LONG PLUG', ['UFLPW15',null,null], [1,2], L);
    // M.T.A (40) | CV LONG: 1" "-"
    h += upvcMixedRow40('M.T.A (40)', ['UFM4015','UFM4020','UFM4025','UFM4032','UFM4040','UFM4050'], [], 'CV LONG', ['UFCVLT15','UFCVLT20',null], [2], L);
    // F.T.A. (40) | CV SHORT: 1" "-"
    h += upvcMixedRow40('F.T.A. (40)', ['UFF4015','UFF4020','UFF4025','UFF4032','UFF4040','UFF4050'], [], 'CV SHORT', ['UFCVST15','UFCVST20',null], [2], L);

    // ── REDUCER SECTION 1 ──
    var RED1U_SIZES = ['\u00be"x\u00bd"','1"x\u00bd"','1"x\u00be"','1\u00bc"x\u00bd"','1\u00bc"x\u00be"','1\u00bc"x1"','1\u00bd"x\u00bd"','1\u00bd"x\u00be"','1\u00bd"x1"','1\u00bd"x1\u00bc"'];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">REDUCING SIZE</td>';
    RED1U_SIZES.forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';

    h += fittingRow('R. TEE (80)', ['UFRT802015','UFRT802515','UFRT802520','UFRT803215','UFRT803220','UFRT803225','UFRT804015','UFRT804020','UFRT804025','UFRT804032'], [], L);
    h += fittingRow('R. COUPLER (80)', ['UFRC802015','UFRC802515','UFRC802520','UFRC803215','UFRC803220','UFRC803225','UFRC804015','UFRC804020','UFRC804025','UFRC804032'], [], L);
    h += fittingRow('R. BUSH (80)', ['UFRB402015','UFRB802515','UFRB802520','UFRB803215','UFRB803220','UFRB803225','UFRB804015','UFRB804020','UFRB804025','UFRB804032'], [], L);

    // ── REDUCER SECTION 2 ──
    var RED2U_SIZES = ['2"x\u00bd"','2"x\u00be"','2"x1"','2"x1\u00bc"','2"x1\u00bd"','2\u00bd"x1"','2\u00bd"x1\u00bd"','2\u00bd"x2"','3"x1\u00bd"','3"x2"'];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">REDUCING SIZE</td>';
    RED2U_SIZES.forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';

    h += fittingRow('R. TEE (80)', ['UFRT805015','UFRT805020','UFRT805025','UFRT805032','UFRT805040','UFRT6525','UFRT6540','UFRT6550','UFRT8040','UFRT8050'], [], L);
    // R. COUPLER: 2½"x1" = "-", 3"x1½" = "-"
    h += fittingRow('R. COUPLER (80)', ['UFRC805015','UFRC805020','UFRC805025','UFRC805032','UFRC805040',null,'UFRC6540','UFRC6550',null,'UFRC8050'], [5,8], L);
    // R. BUSH: 2½"x1" = "-", 2½"x1½" = "-", 3"x1½" = "-"
    h += fittingRow('R. BUSH (80)', ['UFRB805015','UFRB805020','UFRB805025','UFRB805032','UFRB805040',null,null,'UFRB6550',null,'UFRB8050'], [5,6,8], L);

    // ── REDUCER SECTION 3 ──
    var RED3U_SIZES = ['3"x2\u00bd"','4"x1\u00bd"','4"x2"','4"x2\u00bd"','4"x3"','6"x2"','6"x2\u00bd"','6"x3"','6"x4"',''];
    h += '<tr class="sec-hdr"><td colspan="3" class="lbl">REDUCING SIZE</td>';
    RED3U_SIZES.forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';

    // R. TEE: 6"x2" = "-", 6"x3" = "-", last = "-"
    h += fittingRow('R. TEE (80)', ['UFRT8065','UFRT10040','UFRT10050','UFRT10065','UFRT10080',null,'UFRT15065',null,'UFRT150100',null], [5,7,9], L);
    // R. COUPLER: 4"x1½" = "-", 6"x2" = "-", 6"x3" = "-", last = "-"
    h += fittingRow('R. COUPLER (80)', ['UFRC8065',null,'UFRC10050','UFRC10065','UFRC10080',null,'UFRC150100',null,null,null], [1,5,7,8,9], L);
    // R. BUSH: 4"x1½" = "-", 6"x2½" = "-", last = "-"
    h += fittingRow('R. BUSH (80)', ['UFRB8065',null,'UFRB10050','UFRB10065','UFRB10080','UFRB15050',null,'UFRB15080','UFRB150100',null], [1,6,9], L);

    // ── Footer rows ──
    h += '<tr class="data-row"><td colspan="3" class="lbl">BOX (B) :-</td>';
    h += '<td class="c"></td><td class="c"></td><td class="c"></td>';
    h += '<td colspan="3" class="lbl">ITEM:-</td>';
    h += '<td colspan="4" class="lbl">TOTAL WT:-</td>';
    h += '</tr>';
    h += '<tr class="data-row"><td colspan="3" class="lbl">BOX (S) :-</td>';
    for (var i = 0; i < 10; i++) h += '<td class="c"></td>';
    h += '</tr>';


    h += '</table>';
    h += '</div>'; // .form-page

    return h;
  }

  // Helper: uPVC mixed row (brass section) — left 6 cols + separator + right 3 cols
  function upvcMixedRow(leftLabel, leftCodes, leftUnavail, rightLabel, rightCodes, rightUnavail, L) {
    var h = '<tr class="data-row">';
    h += '<td colspan="3" class="lbl">' + esc(leftLabel) + '</td>';
    // Left: 6 size columns (½", ¾", 1", ¾"x½", 1"x½", 1"x¾")
    for (var i = 0; i < 6; i++) {
      if (leftUnavail.indexOf(i) >= 0 || leftCodes[i] === null) {
        h += '<td class="c na">-</td>';
      } else {
        h += dc(cellVal(L, leftCodes[i]), false);
      }
    }
    // Separator / right label
    if (rightLabel) {
      h += '<td class="c mix-lbl rlbl">' + esc(rightLabel) + '</td>';
    } else {
      h += '<td class="c na">-</td>';
    }
    // Right: 3 size columns (¾"x½", 1"x½", 1"x¾")
    for (var j = 0; j < 3; j++) {
      if (rightUnavail.indexOf(j) >= 0 || rightCodes[j] === null) {
        h += '<td class="c na">-</td>';
      } else {
        h += dc(cellVal(L, rightCodes[j]), false);
      }
    }
    h += '</tr>';
    return h;
  }

  // Helper: uPVC mixed row for SCH 40 section — left 6 cols + separator + right 3 cols
  function upvcMixedRow40(leftLabel, leftCodes, leftUnavail, rightLabel, rightCodes, rightUnavail, L) {
    var h = '<tr class="data-row">';
    h += '<td colspan="3" class="lbl">' + esc(leftLabel) + '</td>';
    // Left: 6 size columns (½", ¾", 1", 1¼", 1½", 2")
    for (var i = 0; i < 6; i++) {
      if (leftUnavail.indexOf(i) >= 0 || leftCodes[i] === null) {
        h += '<td class="c na">-</td>';
      } else {
        h += dc(cellVal(L, leftCodes[i]), false);
      }
    }
    // Separator / right label
    h += '<td class="c mix-lbl rlbl">' + esc(rightLabel) + '</td>';
    // Right: 3 size columns (½", ¾", 1")
    for (var j = 0; j < 3; j++) {
      if (rightUnavail.indexOf(j) >= 0 || rightCodes[j] === null) {
        h += '<td class="c na">-</td>';
      } else {
        h += dc(cellVal(L, rightCodes[j]), false);
      }
    }
    h += '</tr>';
    return h;
  }

  // ─── Placeholder forms for sheets 2-6 ──────────────────────────────────────

  // ─── SWR ORDER FORM (Sheet 4) — ClickFit + Selfit ────────────────────────

  // Helper: 4-col SWR data row (label + 4 size cells)
  function swrRow4(label, codes, unavail, L) {
    var h = '<tr class="data-row"><td class="lbl">' + esc(label) + '</td>';
    for (var i = 0; i < 4; i++) {
      if (unavail.indexOf(i) >= 0) h += '<td class="c na">-</td>';
      else { var v = codes[i] ? cellVal(L, codes[i]) : ''; h += '<td class="c' + (v ? ' filled' : '') + '">' + esc(v) + '</td>'; }
    }
    h += '</tr>';
    return h;
  }

  // Helper: 6-col SWR data row (label + 6 size cells)
  function swrRow6(label, codes, unavail, L) {
    var h = '<tr class="data-row"><td class="lbl">' + esc(label) + '</td>';
    for (var i = 0; i < 6; i++) {
      if (unavail.indexOf(i) >= 0) h += '<td class="c na">-</td>';
      else { var v = codes[i] ? cellVal(L, codes[i]) : ''; h += '<td class="c' + (v ? ' filled' : '') + '">' + esc(v) + '</td>'; }
    }
    h += '</tr>';
    return h;
  }

  function buildSWRForm(order, items, party) {
    _suppressIB = true;
    var L = buildItemLookup(items);
    var h = '<div class="form-page swr-form">';

    // ══ HEADER ══
    h += '<table class="of swr-full">';
    h += '<tr class="hdr"><td class="company-name" style="text-align:center">WATERFLO PIPING SYSTEM</td></tr>';
    h += '<tr class="hdr"><td class="form-title">SWR &amp; COMMON SWR FITTINGS</td></tr>';
    h += '<tr class="info-row"><td class="party-field">PARTY NAME:- <span class="fill-val">' + esc(party.company_name) + '</span></td></tr>';
    h += '<tr class="info-row"><td class="party-field">';
    h += 'ORDER DATE:- <span class="fill-val">' + fmtDate(order.created_at) + '</span>';
    h += ' &nbsp;&nbsp;&nbsp; LORRY NO:- <span class="fill-val"></span>';
    h += ' &nbsp;&nbsp;&nbsp; STATE:- <span class="fill-val">' + esc(party.state || '') + '</span>';
    h += ' &nbsp;&nbsp;&nbsp; DELIVERY:- <span class="fill-val"></span>';
    h += '</td></tr>';
    h += '</table>';

    // ══ SECTION 1: SWR FITTINGS (Clickfit | Selfit) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: Clickfit SWR Fittings ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="5" class="swr-sec-title">WATERFLO CLICKFIT SWR FITTINGS</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['75','90','110','160'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';
    h += swrRow4('BEND 87.5\u00b0', ['CSFB75','CSFB90','CSFB110','CSFB160'], [], L);
    h += swrRow4('DOOR BEND 87.5\u00b0', ['CSFDB75','CSFDB90','CSFDB110','CSFDB160'], [], L);
    h += swrRow4('SINGLE TEE', ['CSFST75','CSFST90','CSFST110','CSFST160'], [], L);
    h += swrRow4('DOOR TEE', ['CSFSTD75','CSFSTD90','CSFSTD110','CSFSTD160'], [], L);
    h += swrRow4('BEND 45\u00b0', ['CSFB4575','CSFB4590','CSFB45110','CSFB45160'], [], L);
    h += swrRow4('COUPLER', ['CSFC75','CSFC90','CSFC110','CSFC160'], [], L);
    h += swrRow4('SINGLE Y', ['CSFY75','CSFY90','CSFY110',null], [3], L);
    h += swrRow4('DOOR Y', ['CSFYD75','CSFYD90','CSFYD110',null], [3], L);
    h += swrRow4('CROSS TEE', ['CSFCT75','CSFCT90','CSFCT110',null], [3], L);
    h += swrRow4('CLEANSING PIPE', ['CSFCP75',null,'CSFCP110',null], [1,3], L);
    h += swrRow4('DOUBLE Y', ['CSFDBY75',null,'CSFDBY110',null], [1,3], L);
    h += swrRow4('DOOR DOUBLE Y', ['CSFDDBY75',null,'CSFDDBY110',null], [1,3], L);
    h += swrRow4('SWEPT TEE', [null,null,'CSFSPT110',null], [0,1,3], L);
    h += swrRow4('DOOR SWEPT TEE', [null,null,'CSFDSPT110',null], [0,1,3], L);
    // Reducer sub-section
    h += '<tr class="sec-hdr"><td class="lbl">RED. SIZE</td>';
    ['110x63','110x75','110x90','160x110'].forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';
    h += swrRow4('REDUCER', [null,'CSFR1075','CSFR1090','CSFR16110'], [0], L);
    h += swrRow4('REDUCING TEE', [null,'CSFRT11075',null,null], [0,2,3], L);
    h += swrRow4('DOOR RED TEE', [null,'CSFDRT11075',null,null], [0,2,3], L);
    h += swrRow4('REDUCING Y', [null,'CSFRY11075',null,null], [0,2,3], L);
    h += swrRow4('DOOR RED Y', [null,'CSFDRY11075',null,null], [0,2,3], L);
    h += '</table></td>';

    // ── RIGHT: Selfit SWR Fittings ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="5" class="swr-sec-title">WATERFLO SELFIT SWR FITTINGS</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['75','90','110','160'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';
    h += swrRow4('BEND 87.5\u00b0',      ['SFB75','SFB90','SFB110','SFB160'],          [], L);
    h += swrRow4('DOOR BEND 87.5\u00b0', ['SFDB75','SFDB90','SFDB110','SFDB160'],      [], L);
    h += swrRow4('SINGLE TEE',           ['SFST75','SFST90','SFST110','SFST160'],       [], L);
    h += swrRow4('DOOR TEE',             ['SFSTD75','SFSTD90','SFSTD110','SFSTD160'],   [], L);
    h += swrRow4('BEND 45\u00b0',        [null,null,null,null],                         [], L);
    h += swrRow4('COUPLER',              ['SFC75','SFC90','SFC110','SFC160'],            [], L);
    h += swrRow4('SINGLE Y',             ['SFY75','SFY90','SFY110',null],               [3], L);
    h += swrRow4('DOOR Y',               ['SFYD75','SFYD90','SFYD110',null],             [3], L);
    h += swrRow4('CROSS TEE',            ['SFCT75','SFCT90','SFCT110',null],             [3], L);
    h += swrRow4('CLEANSING PIPE',       ['SFCP75',null,'SFCP110',null],                 [1,3], L);
    h += swrRow4('DOUBLE Y',             ['SFDY75',null,'SFDY110',null],                 [1,3], L);
    h += swrRow4('DOOR DOUBLE Y',        ['SFDYD75',null,'SFDYD110',null],               [1,3], L);
    h += swrRow4('SWEPT TEE',            [null,null,'SFSPT110',null],                    [0,1,3], L);
    h += swrRow4('DOOR SWEPT TEE',       [null,null,'SFSPTD110',null],                   [0,1,3], L);
    h += '<tr class="sec-hdr"><td class="lbl">RED. SIZE</td>';
    ['110x63','110x75','110x90','160x110'].forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';
    h += swrRow4('REDUCER',       [null,'SFR1075','SFR1090','SFR16110'],       [0], L);
    h += swrRow4('REDUCING TEE',  [null,'SFRT11075','SFRT11090',null],          [0,3], L);
    h += swrRow4('DOOR RED TEE',  [null,'SFRTD11075','SFRTD11090',null],        [0,3], L);
    h += swrRow4('REDUCING Y',    [null,'SFRY11075','SFRY11090',null],           [0,3], L);
    h += swrRow4('DOOR RED Y',    [null,'SFRYD11075','SFRYD11090',null],         [0,3], L);
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 2: LW SWR FITTINGS ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: LW SWR (Clickfit Ring) — sizes 75, 110 only ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="5" class="swr-sec-title" style="font-size:6px">WATERFLO LW SWR FITTINGS (Clickfit Ring)</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    h += '<td class="c sz">75</td><td class="c sz">110</td><td class="c na">-</td><td class="c na">-</td>';
    h += '</tr>';
    h += swrRow4('BEND 87.5\u00b0', ['SWB75','SWB110',null,null], [2,3], L);
    h += swrRow4('DOOR BEND 87.5\u00b0', ['SWBD75','SWBD110',null,null], [2,3], L);
    h += swrRow4('SINGLE TEE', ['SWST75','SWST110',null,null], [2,3], L);
    h += swrRow4('DOOR TEE', ['SWSTD75','SWSTD110',null,null], [2,3], L);
    h += swrRow4('BEND 45\u00b0', ['SWB4575','SWB45110',null,null], [2,3], L);
    h += swrRow4('SINGLE Y', ['SWY75','SWY110',null,null], [2,3], L);
    h += swrRow4('DOOR Y', ['SWYD75','SWYD110',null,null], [2,3], L);
    h += swrRow4('COUPLER', ['SWC75','SWC110',null,null], [2,3], L);
    h += '</table></td>';

    // ── RIGHT: SFT-LW SWR — sizes 75, 110, 90, 160 ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="5" class="swr-sec-title" style="font-size:6px">WATERFLO SFT-LW SWR FITTINGS</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    h += '<td class="c sz">75</td><td class="c sz">110</td><td class="c sz">90</td><td class="c sz">160</td>';
    h += '</tr>';
    h += swrRow4('BEND 45\u00b0', ['SFLWB4575','SFLWB45110',null,null], [2,3], L);
    h += swrRow4('BEND 87.5\u00b0', ['SFLWB75','SFLWB110',null,null], [2,3], L);
    h += swrRow4('DOOR BEND 87.5\u00b0', ['SFLWDB75','SFLWDB110',null,null], [2,3], L);
    h += swrRow4('SINGLE TEE', ['SFLWST75','SFLWST110',null,null], [2,3], L);
    h += swrRow4('DOOR TEE', ['SFLWSTD75','SFLWSTD110',null,null], [2,3], L);
    h += '<tr class="data-row"><td class="lbl"></td>';
    h += '<td class="c na">-</td><td class="c na">-</td><td class="c na">-</td><td class="c na">-</td></tr>';
    h += swrRow4('DOOR CAP', ['DC75','DC110','DC90',null], [3], L);
    h += swrRow4('CLICKFIT RING', ['CK75','CK110','CK90','CK160'], [], L);
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 3: COMMON SWR FITTINGS ══
    h += '<table class="of swr-full">';
    h += '<tr class="sec-hdr"><td style="text-align:center;font-size:8px;font-weight:700">COMMON SWR FITTINGS</td></tr>';
    h += '</table>';

    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: Traps (sizes 110x75, 110x90, 110x110, 125x110) ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['110x75','110x90','110x110','125x110'].forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';
    // Trap sizes: col0=110x75, col1=110x90, col2=110x110, col3=125x110
    h += swrRow4('NAHNI TRAP (ISI) (One Piece)', ['NTOP110075','NTOP110090','NTOP110110',null], [3], L);
    h += swrRow4('P TRAP (LONG 45)', [null,null,'PT110110R','PT125110R'], [0,1], L);
    h += swrRow4('P TRAP (LW 45\u00b0)', [null,null,'PT110110L','PT125110L'], [0,1], L);
    h += swrRow4('P TRAP (Short)', [null,null,'PT5125110',null], [0,1,3], L);
    h += swrRow4('P TRAP (Flat)', [null,null,'PT5125110L',null], [0,1,3], L);
    h += swrRow4('S TRAP', [null,null,'ST110110',null], [0,1,3], L);
    h += swrRow4('Q TRAP', [null,null,'QT110110',null], [0,1,3], L);
    h += swrRow4('RED BUSH', ['RB11075','RB11090',null,null], [], L);
    h += '<tr class="sec-hdr"><td class="lbl"></td>';
    ['110x63','110x75','110x90','110x110'].forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';
    // Nahani Trap LW sizes: col0=110x63, col1=110x75, col2=110x90, col3=110x110
    h += swrRow4('NAHNI TRAP (LW)', ['NTL11063','NTL11075','NTL11090','NTL110110'], [], L);
    h += '</table></td>';

    // ── RIGHT: Accessories (sizes 50, 63, 75, 90, 110, 160) ──
    h += '<td class="swr-cell"><table class="of swr-inner swr-wide">';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['50','63','75','90','110','160'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';
    // Accessory sizes: col0=50, col1=63, col2=75, col3=90, col4=110, col5=160
    h += swrRow6('COWL', ['VC50','VC63','VC75','VC90','VC110','VC160'], [], L);
    h += swrRow6('PIPE CLIP', [null,null,'PC75',null,'PC110',null], [0,1,3,5], L);
    h += swrRow6('SOCKET PLUG', [null,null,'SP75',null,'SP110',null], [0,1,3,5], L);
    h += swrRow6('BACKFLOW VALVE', [null,null,'BFV75','BFV90','BFV110','BFV160'], [0,1], L);
    // Sub-section: Floor Traps
    h += '<tr class="sec-hdr">';
    h += '<td colspan="2" class="lbl">FITTING SIZE</td><td class="c sz">110</td>';
    h += '<td colspan="3" class="lbl">FITTING SIZE</td><td class="c sz">110</td>';
    h += '</tr>';
    var floorItems = [
      ['FLOOR TRAP',              'MFT110',   'EXTENSION',          'ME110'],
      ['FLOOR TRAP (Cap Type)',   'MFTC110',  'W C CONN.',          'WCB110'],
      ['FLOOR TRAP (Square Jally)','MFTSJ110','HEIGHT RISER',       'HR1105040'],
      ['FLOOR TRAP(7Ht Cap Type)','MFT7110',  'JALI',               'J110'],
      ['GULLY TRAP (Square Jally)','GT110',   '',                   '']
    ];
    floorItems.forEach(function(fi) {
      var lv = fi[1] ? cellVal(L, fi[1]) : '';
      var rv = fi[3] ? cellVal(L, fi[3]) : '';
      h += '<tr class="data-row">';
      h += '<td colspan="2" class="lbl">' + esc(fi[0]) + '</td>';
      h += '<td class="c' + (lv ? ' filled' : '') + '">' + esc(lv) + '</td>';
      if (fi[2]) h += '<td colspan="3" class="lbl">' + esc(fi[2]) + '</td>';
      else h += '<td colspan="3" class="c"></td>';
      h += '<td class="c' + (rv ? ' filled' : '') + '">' + esc(rv) + '</td>';
      h += '</tr>';
    });
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 4: SOLVENT & LUBRICANT ══
    h += '<table class="of swr-full swr-solvent">';
    h += '<tr class="sec-hdr"><td colspan="11" style="text-align:center;font-size:8px;font-weight:700">SOLVENT</td></tr>';
    h += '<tr class="sec-hdr">';
    h += '<td colspan="2" style="text-align:center;font-size:7px">CPVC</td>';
    h += '<td colspan="3" style="text-align:center;font-size:7px">uPVC</td>';
    h += '<td colspan="2" style="text-align:center;font-size:7px">Agri MASTAR</td>';
    h += '<td colspan="2" style="text-align:center;font-size:7px">LUBRICANT</td>';
    h += '<td class="c sz">BOX</td><td class="c sz">S</td>';
    h += '</tr>';
    h += '<tr class="sec-hdr">';
    h += '<td colspan="2" class="c"></td>';
    h += '<td class="c"></td><td class="c sz">HD</td><td class="c sz">MD</td>';
    h += '<td colspan="2" class="c"></td><td colspan="2" class="c"></td>';
    h += '<td class="c sz">B</td><td class="c"></td>';
    h += '</tr>';
    var solventData = [
      ['15 ml', '20 ml', '25 ml', '50 gm', 'SFRL50'],
      ['29 ml', '50 ml', '50 ml', '100 gm', 'SFRL100'],
      ['59 ml (Tube)', '59 ml', '100 ml', '250 gm', 'SFRL250'],
      ['118 ml', '118 ml', '250 ml', '500 gm', 'SFRL500'],
      ['237 ml', '237 ml', '500 ml', '', null],
      ['473 ml', '473 ml', '1 ltr', '', null],
      ['946 ml', '946 ml', '5 ltr', '', null],
      ['59 ml (Tin)', '', '', '', null]
    ];
    solventData.forEach(function(sr, idx) {
      h += '<tr class="data-row">';
      h += '<td class="lbl">' + esc(sr[0]) + '</td><td class="c"></td>';
      h += '<td class="lbl">' + esc(sr[1]) + '</td><td class="c"></td><td class="c"></td>';
      h += '<td class="lbl">' + esc(sr[2]) + '</td><td class="c"></td>';
      h += '<td class="lbl">' + esc(sr[3]) + '</td>';
      var lv = sr[4] ? cellVal(L, sr[4]) : '';
      h += '<td class="c' + (lv ? ' filled' : '') + '">' + esc(lv) + '</td>';
      if (idx === 1) h += '<td colspan="2" class="lbl" style="text-align:center">ITEM</td>';
      else if (idx === 3) h += '<td colspan="2" class="lbl" style="text-align:center">TOTAL WT</td>';
      else h += '<td class="c"></td><td class="c"></td>';
      h += '</tr>';
    });


    h += '</table>';

    h += '</div>';
    _suppressIB = false;
    return h;
  }


  // ─── AGRI ORDER FORM — AgriMaster ────────────────────────────────────────

  // Helper: N-column agri data row
  function agriRowN(label, codes, unavail, L, n) {
    var h = '<tr class="data-row"><td class="lbl">' + esc(label) + '</td>';
    for (var i = 0; i < n; i++) {
      if (unavail.indexOf(i) >= 0) h += '<td class="c na">-</td>';
      else { var v = codes[i] ? cellVal(L, codes[i]) : ''; h += '<td class="c' + (v ? ' filled' : '') + '">' + esc(v) + '</td>'; }
    }
    h += '</tr>';
    return h;
  }

  function buildAGRIForm(order, items, party) {
    var L = buildItemLookup(items);

    var h = '<div class="form-page swr-form">';

    // ══ HEADER ══
    h += '<table class="of swr-full">';
    h += '<tr class="hdr"><td class="company-name" style="text-align:center"><span style="float:left;font-size:11px;font-weight:700">AgriMASTER</span>WATERFLO PIPING SYSTEM</td></tr>';
    h += '<tr class="hdr"><td class="form-title">AgriMASTER ORDER FORM</td></tr>';
    h += '<tr class="info-row"><td class="party-field">PARTY NAME:- <span class="fill-val">' + esc(party.company_name) + '</span>'
       + ' &nbsp;&nbsp;&nbsp;&nbsp; STATE:- <span class="fill-val">' + esc(party.state || '') + '</span></td></tr>';
    h += '<tr class="info-row"><td class="party-field">'
       + 'ORDER DATE:- <span class="fill-val">' + fmtDate(order.created_at) + '</span>'
       + ' &nbsp;&nbsp;&nbsp; LORRY NO:- <span class="fill-val"></span>'
       + ' &nbsp;&nbsp;&nbsp; DELIVERY:- <span class="fill-val"></span>'
       + '</td></tr>';
    h += '</table>';

    // ══ SECTION 1: SPLIT — LEFT (4kg fittings, 8 cols) | RIGHT (misc, 7 cols) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: 4kg fittings — sizes 63,75,90,110,140,160,200,250 ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['63','75','90','110','140','160','200','250'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';
    //                                   63          75          90          110          140          160          200          250
    h += agriRowN('ELBOW 4KG',        ['AFE463',   'AFE475',   'AFE490',   'AFE4110',   'AFE4140',   'AFE4160',   'AFE4200',   null],        [7], L, 8);
    h += agriRowN('ELBOW EQUAL',      ['AFEE463',  'AFEE475',  'AFEE490',  'AFEE4110',  'AFEE4140',  null,        null,        'AFEE4250'], [5,6], L, 8);
    h += agriRowN('ELBOW BLISS',      ['AFEB63',   'AFEB75',   'AFEB90',   'AFEB110',   'AFEB140',   'AFEB160',   null,        null],       [6,7], L, 8);
    h += agriRowN('TEE 4KG',          ['AFT463',   'AFT475',   'AFT490',   'AFT4110',   'AFT4140',   'AFT4160',   'AFT4200',   null],        [7], L, 8);
    h += agriRowN('TEE EQUAL',        ['AFTE463',  'AFTE475',  'AFTE490',  'AFTE4110',  null,        null,        null,        'AFTE4250'], [4,5,6], L, 8);
    h += agriRowN('TEE BLISS',        ['AFTB63',   'AFTB75',   'AFTB90',   'AFTB110',   'AFTB140',   'AFTB160',   null,        null],       [6,7], L, 8);
    h += agriRowN('COUPLER 4KG',      ['AFC463',   'AFC475',   'AFC490',   'AFC4110',   'AFC4140',   'AFC4160',   null,        null],       [6,7], L, 8);
    h += agriRowN('ELBOW THR.',       ['AFET663',  'AFET675',  'AFET690',  'AFET6110',  'AFET6140',  'AFET6160',  null,        null],       [6,7], L, 8);
    h += agriRowN('TAIL PIECE',       ['AFTP663',  'AFTP675',  'AFTP690',  'AFTP6110',  'AFTP6140',  'AFTP6160',  'AFTP6200',  'AFTP6250'],  [], L, 8);
    h += '</table></td>';

    // ── RIGHT: misc fittings — sizes 40,50,63,75,90,110,160 ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['40','50','63','75','90','110','160'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';
    //                                    40           50           63          75           90           110          160
    h += agriRowN('ELBOW LW',          ['AFELW40',  'AFELW50',  null,       'AFELW75',  'AFELW90',  'AFELW110', 'AFELW160'], [2], L, 7);
    h += agriRowN('TEE LW',            [null,       null,       null,       'AFTLW75',  'AFTLW90',  'AFTLW110', 'AFTLW160'], [0,1,2], L, 7);
    h += agriRowN('DOOR ELBOW',        [null,       'AFDE50',   'AFDE63',   'AFDE75',   'AFDE90',   'AFDE110',  null],       [0,6], L, 7);
    h += agriRowN('DOOR TEE',          [null,       'AFDT50',   'AFDT63',   'AFDT75',   'AFDT90',   'AFDT110',  null],       [0,6], L, 7);
    h += agriRowN('MTA (HEX)',         [null,       null,       null,       'AFMH75',   'AFMH90',   null,       null],       [0,1,2,5,6], L, 7);

    // Right sub-header: 20, 25x20, 32x20, 32x25, 110x63, 110x75, 110x90
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['20','25x20','32x20','32x25','110x63','110x75','110x90'].forEach(function(s) { h += '<td class="c sz rsz">' + s + '</td>'; });
    h += '</tr>';
    h += agriRowN('LONG PLUG',         ['AFLP20',   null,        null,        null,        null,        null,        null],      [1,2,3,4,5,6], L, 7);
    h += agriRowN('RED ELBOW',         [null,       'AFRE2520', 'AFRE3220', 'AFRE3225', 'AFRE611063','AFRE611075','AFRE611090'], [0], L, 7);
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 2: FULL WIDTH — 17 size columns (20–315mm) ══
    h += '<table class="of swr-full swr-inner swr-wide">';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['20','25','32','40','50','63','75','90','110','125','140','160','180','200','250','315',''].forEach(function(s,i) {
      if (i === 16) h += '<td class="c na">-</td>';
      else h += '<td class="c sz">' + s + '</td>';
    });
    h += '</tr>';
    //                                 20           25           32           40           50           63           75           90           110          125          140          160          180          200          250          315          -
    h += agriRowN('ELBOW 10 KG',    ['AFE1020',  'AFE1025',  'AFE1032',  null,        null,        'AFE1063',  'AFE1075',  'AFE1090',  'AFE10110', null,        null,        null,        null,        null,        null,        null,        null], [3,4,9,10,11,12,13,14,15,16], L, 17);
    h += agriRowN('ELBOW 6KG',      [null,       null,       null,       'AFE640',    'AFE650',    'AFE663',   'AFE675',   'AFE690',   'AFE6110',  'AFE6125',  'AFE6140',  'AFE6160',  'AFE6180',  'AFE6200',  'AFE6250',  'AFE6315',  null], [0,1,2,16], L, 17);
    h += agriRowN('TEE 10 KG',      ['AFT1020',  'AFT1025',  'AFT1032',  null,        null,        'AFT1063',  'AFT1075',  'AFT1090',  'AFT10110', null,        null,        null,        null,        null,        null,        null,        null], [3,4,9,10,11,12,13,14,15,16], L, 17);
    h += agriRowN('TEE 6KG',        [null,       null,       null,       'AFT640',    'AFT650',    'AFT663',   'AFT675',   'AFT690',   'AFT6110',  'AFT6125',  'AFT6140',  'AFT6160',  'AFT6180',  'AFT6200',  'AFT6250',  'AFT6315',  null], [0,1,2,16], L, 17);
    h += agriRowN('COUPLER 6KG',    ['AFC1020',  'AFC1025',  'AFC1032',  'AFC640',    'AFC650',    'AFC663',   'AFC675',   'AFC690',   'AFC6110',  'AFC6125',  'AFC6140',  'AFC6160',  'AFC6180',  'AFC6200',  'AFC6250',  'AFC6315',  null], [16], L, 17);
    h += agriRowN('M.T.A.',         ['AFM1020',  'AFM1025',  'AFM1032',  'AFM640',    'AFM650',    'AFM663',   'AFM675',   'AFM690',   'AFM6110',  null,       'AFM6140',  'AFM6160',  'AFM6180',  'AFM6200',  null,        null,        null], [9,14,15,16], L, 17);
    h += agriRowN('F.T.A.',         ['AFF1020',  'AFF1025',  'AFF1032',  'AFF640',    'AFF650',    'AFF663',   'AFF675',   'AFF690',   'AFF6110',  null,       'AFF6140',  'AFF6160',  'AFF6180',  'AFF6200',  null,        null,        null], [9,14,15,16], L, 17);
    h += agriRowN('END CAP 6KG',    ['AFECP1020','AFECP1025','AFECP1032','AFECP640',  'AFECP650',  'AFECP663', 'AFECP675', 'AFECP690', 'AFECP6110','AFECP6125','AFECP6140','AFECP6160','AFECP6180','AFECP6200','AFECP6250','AFECP6315', null], [16], L, 17);
    h += agriRowN('END CAP 4KG',    [null,       null,       null,       null,        null,        null,       'AFECP475', 'AFECP490', 'AFECP4110',null,       'AFECP4140','AFECP4160','AFECP4180','AFECP4200','AFECP4225', null,        null], [0,1,2,3,4,5,9,15,16], L, 17);
    h += agriRowN('END CAP THR.',   ['AFECT1020','AFECT1025','AFECT1032','AFECT640',  'AFECT650',  'AFECT663', 'AFECT675', 'AFECT690', 'AFECT6110',null,       'AFECT6140','AFECT6160',null,       'AFECT6200',null,        null,        null], [9,12,14,15,16], L, 17);
    h += agriRowN('SINGLE "Y"',     [null,       null,       null,       'AFSY640',   'AFSY650',   'AFSY663',  null,       null,       null,       null,       'AFSY6140', 'AFSY6160', null,       'AFSY6200', null,        null,        null], [0,1,2,6,7,8,9,12,14,15,16], L, 17);
    h += agriRowN('BEND 45\u00b0',  ['AFE451020','AFE451025','AFE451032','AFE45640',  'AFE45650',  'AFE45663', 'AFE45675', 'AFE45690', 'AFE456110',null,       'AFE456140','AFE456160','AFE456180','AFE456200','AFE456250','AFE456315', null], [9,16], L, 17);
    h += agriRowN('UNION 10 KG',    [null,       'AFU1025',  'AFU1032',  'AFU1040',   'AFU1050',   'AFU1063',  null,       null,       null,       null,       null,        null,        null,        null,        null,        null,        null], [0,6,7,8,9,10,11,12,13,14,15,16], L, 17);
    h += agriRowN('BALL VALVE',     ['AFBV20',   'AFBV25',   'AFBV32',   'AFBV40',    'AFBV50',    'AFBV63',   null,       null,       null,       null,       null,        null,        null,        null,        null,        null,        null], [6,7,8,9,10,11,12,13,14,15,16], L, 17);
    h += agriRowN('FOUR WAY TEE',   [null,       'AFFWT2525',null,       null,        null,        null,       null,       null,       null,       null,       null,        null,        null,        null,        null,        null,        null], [0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], L, 17);
    h += '</table>';

    // ══ SECTION 3: REDUCER SECTION 1 — 17 cols ══
    h += '<table class="of swr-full swr-inner swr-wide">';
    h += '<tr class="sec-hdr"><td class="lbl">RED. SIZE</td>';
    ['25x20','32x20','32x25','40x20','40x25','40x32','50x20','50x25','50x32','50x40','63x20','63x25','63x32','63x40','63x50','75x20','75x25'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    h += '</tr>';
    h += agriRowN('R. COUPLER', ['AFR102520','AFR103220','AFR103225','AFR64020', 'AFR64025', 'AFR64032', 'AFR65020', 'AFR65025', 'AFR65032', 'AFR65040', null,        null,        'AFR66332', 'AFR66340', 'AFR66350', null,        null],       [10,11,15,16], L, 17);
    h += agriRowN('R.TEE',      ['AFRT102520','AFRT103220','AFRT103225','AFRT64020','AFRT64025','AFRT64032','AFRT65020','AFRT65025','AFRT65032','AFRT65040','AFRT66320','AFRT66325','AFRT66332','AFRT66340','AFRT66350','AFRT67520','AFRT67525'], [], L, 17);
    h += agriRowN('R. BUSH',    ['AFRB102520','AFRB103220','AFRB103225',null,      'AFRB64025','AFRB64032',null,       'AFRB65025','AFRB65032','AFRB65040','AFRB66320','AFRB66325','AFRB66332','AFRB66340','AFRB66350','AFRB67520','AFRB67525'], [3,6], L, 17);
    h += agriRowN('R. F.T.A.',  ['AFRF102520','AFRF103220','AFRF103225','AFRF4020','AFRF4025','AFRF4032',null,       'AFRF5025', 'AFRF5032', 'AFRF5040', null,        null,        null,        null,        null,        null,        null],       [6,10,11,12,13,14,15,16], L, 17);
    h += agriRowN('S S',        [null,        null,        null,       'AFSS4020','AFSS4025','AFSS4032','AFSS5020','AFSS5025','AFSS5032',null,       'AFSS6320','AFSS6325','AFSS6332',null,        null,        null,        null],       [0,1,2,9,13,14,15,16], L, 17);
    h += agriRowN('FOUR WAY TEE',['AFFWT2520','AFFWT3220','AFFWT3225','AFFWT4020','AFFWT4025','AFFWT4032','AFFWT5020','AFFWT5025','AFFWT5032','AFFWT5040','AFFWT6320','AFFWT6325','AFFWT6332','AFFWT6340','AFFWT6350',null,        null],       [15,16], L, 17);
    h += '</table>';

    // ══ SECTION 4: REDUCER SECTION 2 — 17 cols ══
    h += '<table class="of swr-full swr-inner swr-wide">';
    h += '<tr class="sec-hdr"><td class="lbl">RED. SIZE</td>';
    ['75x32','75x40','75x50','75x63','90x20','90x25','90x32','90x40','90x50','90x63','90x75','110x20','110x25','110x32','110x50','110x63','110x75'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    h += '</tr>';
    h += agriRowN('R. COUPLER', ['AFR67532', 'AFR67540', 'AFR67550', 'AFR67563', null,       null,       'AFR69032', 'AFR69040', 'AFR69050', 'AFR69063', 'AFR69075', null,        null,        'AFR611032','AFR611050','AFR611063','AFR611075'], [4,5,11,12], L, 17);
    h += agriRowN('R.TEE',      ['AFRT67532',null,       'AFRT67550','AFRT67563','AFRT69020','AFRT69025','AFRT69032',null,       'AFRT69050','AFRT69063','AFRT69075','AFRT611020','AFRT611025','AFRT611032','AFRT611050','AFRT611063','AFRT611075'], [1,7], L, 17);
    h += agriRowN('R. BUSH',    ['AFRB67532','AFRB67540','AFRB67550','AFRB67563','AFRB69020','AFRB69025','AFRB69032','AFRB69040','AFRB69050','AFRB69063','AFRB69075',null,        null,        null,       'AFRB611050','AFRB611063','AFRB611075'], [11,12,13], L, 17);
    h += agriRowN('R. F.T.A.',  [null,       null,       null,       'AFRF7563', null,       null,       null,       null,       null,       'AFRF9063', 'AFRF9075', null,        null,        null,       null,        'AFRF11063','AFRF11075'], [0,1,2,4,5,6,7,8,11,12,13,14], L, 17);
    h += agriRowN('S S',        [null,       null,       null,       null,       'AFSS9020','AFSS9025','AFSS9032',null,       null,       null,       null,       'AFSS11020','AFSS11025','AFSS11032',null,       null,        null],       [0,1,2,3,7,8,9,10,14,15,16], L, 17);
    h += '</table>';

    // ══ SECTION 5: REDUCER SECTION 3 — 17 cols ══
    h += '<table class="of swr-full swr-inner swr-wide">';
    h += '<tr class="sec-hdr"><td class="lbl">RED. SIZE</td>';
    ['110x90','125x110','140x63','140x75','140x90','140x110','140x125','160x75','160x90','160x110','160x140','180x110','180x140','180x160','200x90','200x110','200x140'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    h += '</tr>';
    h += agriRowN('R. COUPLER', ['AFR611090','AFR6125110',null,       'AFR614075','AFR614090','AFR6140110','AFR6140125','AFR616075','AFR616090','AFR6160110','AFR6160140','AFR6180110','AFR6180140','AFR6180160',null,        'AFR6200110','AFR6200140'], [2,14], L, 17);
    h += agriRowN('R.TEE',      ['AFRT611090','AFRT6125110',null,    'AFRT414075','AFRT414090','AFRT4140110',null,       'AFRT416075','AFRT416090','AFRT4160110','AFRT4160140',null,       null,        null,        null,        'AFRT6200110','AFRT6200140'], [2,6,11,12,13,14], L, 17);
    h += agriRowN('R. BUSH',    ['AFRB611090',null,       null,      'AFRB614075','AFRB614090','AFRB140110',null,       'AFRB616075','AFRB616090','AFRB6160110','AFRB6160140',null,       null,        null,        null,        null,          null],          [1,2,6,11,12,13,14,15,16], L, 17);
    h += agriRowN('R. F.T.A.',  ['AFRF11090',null,        'AFRF14063','AFRF14075','AFRF14090','AFRF140110',null,       'AFRF16075','AFRF16090','AFRF160110',null,        null,        null,        null,        'AFRF20090', 'AFRF200110',null],          [1,6,10,11,12,13,16], L, 17);
    h += '</table>';

    // ══ SECTION 6: REDUCER SECTION 4 — mixed ══
    h += '<table class="of swr-full swr-inner swr-wide">';
    h += '<tr class="sec-hdr"><td class="lbl">RED. SIZE</td>';
    ['200x160','200x180','250x110','250x140','250x160','250x180','250x200','315x160','315x200','315x250','225'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    // Service Saddle sub-header
    h += '<td class="lbl" style="font-size:5.5px">RED. SIZE</td>';
    ['140x20','140x25','140x32','160x20','160x25'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    h += '</tr>';
    h += agriRowN('R. COUPLER', ['AFR6200160','AFR6200180','AFR6250110','AFR6250140','AFR6250160','AFR6250180','AFR6250200','AFR6315160','AFR6315200','AFR6315250',null, null,  'AFSS14020','AFSS14025','AFSS14032','AFSS16020','AFSS16025'], [10], L, 17);
    h += agriRowN('R.TEE',      ['AFRT6200160',null,       'AFRT6250110',null,       'AFRT6250160',null,       'AFRT6250200','AFRT6315160','AFRT6315200','AFRT6315250',null, null, 'AFSS16032','AFSS18020','AFSS18025','AFSS18032',null], [1,3,5,10,16], L, 17);
    h += agriRowN('R. BUSH',    ['AFRB6200160',null,       null,        null,        'AFRB6250160',null,       'AFRB6250200',null,        null,        null,        null, null,  null,       null,       null,       null,        null],       [1,2,3,5,7,8,9,10,11,12,13,14,15,16], L, 17);
    h += agriRowN('END CAP 4KG',[null,        null,       null,        null,        null,        null,        null,        null,        null,        null,       'AFECP4225', null, null,       null,       null,       null,        null],       [0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16], L, 17);
    h += '</table>';

    // ══ SECTION 7: THREADED & BRASS FITTINGS ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: Threaded Elbow/Tee/R.MTA ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['20','75','90','25x20','32x20','32x25','75x50','75x63','90x63','90x75'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    h += '</tr>';
    h += agriRowN('THR ELBOW', ['AFET20',   null,        null,       'AFRET2520','AFRET3220',null,       null,       null,       null,       null],       [1,2,5,6,7,8,9], L, 10);
    h += agriRowN('THR TEE',   ['AFTT20',   'AFTT75',   'AFTT90',   'AFRTT2520','AFRTT3220','AFRTT3225',null,       'AFRTT7563',null,       'AFRTT9075'], [6,8], L, 10);
    h += agriRowN('R. M.T.A.', [null,       null,       null,       null,       null,       'AFRM63225','AFRM67550','AFRM67563','AFRM69063','AFRM69075'], [0,1,2,3,4], L, 10);

    // Brass sub-section
    h += '<tr class="sec-hdr"><td class="lbl">FITTING SIZE</td>';
    ['\u00bd"','25x\u00bd"','32x\u00bd"','32x\u00be"'].forEach(function(s) {
      h += '<td class="c sz rsz">' + s + '</td>';
    });
    h += '<td colspan="6" class="c"></td></tr>';
    h += agriRowN('BRASS ELBOW',  ['AFBE20',  'AFBE2515', 'AFBE3215', 'AFBE3220', null,null,null,null,null,null], [4,5,6,7,8,9], L, 10);
    h += agriRowN('BRASS TEE',    ['AFBT20',  'AFBT2515', 'AFBT3215', 'AFBT3220', null,null,null,null,null,null], [4,5,6,7,8,9], L, 10);
    h += agriRowN('BRASS F.T.A.', ['AFBF20',  'AFBF2515', 'AFBF3215', 'AFBF3220', null,null,null,null,null,null], [4,5,6,7,8,9], L, 10);
    h += agriRowN('BRASS M.T.A.', ['AFBM20',  'AFBM2515', null,       null,       null,null,null,null,null,null], [2,3,4,5,6,7,8,9], L, 10);
    h += '</table></td>';

    // ── RIGHT: BSW fittings + misc ──
    h += '<td class="swr-cell"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td class="lbl">MISC</td>';
    ['50','63'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '<td class="c sz">6Kg NEW</td><td class="c sz">110mm</td>';
    h += '</tr>';
    h += agriRowN('D ELBOW 6kg', ['AFDE650',  null,       null,       null],       [1,2,3], L, 4);
    h += agriRowN('D TEE 6kg',   ['AFDT650',  null,       null,       null],       [1,2,3], L, 4);
    h += agriRowN('DOOR Y',      ['AFDY50',   'AFDY63',   null,       null],       [2,3], L, 4);
    // ELBOW/TEE 6kg New
    h += agriRowN('ELBOW 6Kg (NEW)', [null, null, null, 'AFEN6110'],  [0,1,2], L, 4);
    h += agriRowN('TEE 6Kg (NEW)',   [null, null, null, 'AFTN6110'],  [0,1,2], L, 4);

    // BSW sub-section
    h += '<tr class="sec-hdr"><td class="lbl">END CAP (BSW)</td>';
    ['90','110','140','160'].forEach(function(s) { h += '<td class="c sz">' + s + '</td>'; });
    h += '</tr>';
    h += agriRowN('END CAP BSW', ['AFECTB690','AFECTB6110','AFECTB6140','AFECTB6160'], [], L, 4);
    h += agriRowN('M.T.A. BSW',  ['AFMB690',  'AFMB6110',  'AFMB6140',  'AFMB6160'], [], L, 4);
    h += agriRowN('F.T.A. BSW',  ['AFFB690',  'AFFB6110',  'AFFB6140',  'AFFB6160'], [], L, 4);
    h += agriRowN('ELBOW BSW',   ['AFETB690', 'AFETB6110', 'AFETB6140', 'AFETB6160'], [], L, 4);
    h += '</table></td>';

    h += '</tr></table>';

    // ══ FOOTER ══
    h += '<table class="of swr-full">';
    h += '<tr class="data-row">';
    h += '<td class="lbl" style="width:20%">BOX:</td><td class="c" style="width:13%"></td>';
    h += '<td class="lbl" style="width:14%">BAG:</td><td class="c" style="width:13%"></td>';
    h += '<td class="lbl" style="width:14%">S BOX:</td><td class="c" style="width:13%"></td>';
    h += '<td class="lbl" style="width:13%">TOTAL:</td>';
    h += '</tr>';
    h += '<tr class="data-row">';
    h += '<td class="lbl">ITEM:</td><td class="c" colspan="2"></td>';
    h += '<td class="lbl">TOTAL WT:</td><td class="c" colspan="3"></td>';
    h += '</tr>';
    h += '</table>';

    h += '</div>';
    return h;
  }


  // ─── Pipes Order Form 1 (Sheet2): Regular, Plumlite, SureFit, 90 Bend, Column Pipes ──

  function buildPipesForm1(order, items, party) {
    var L = buildItemLookup(items);
    var h = '<div class="form-page swr-form">';

    // ══ HEADER ══
    h += '<table class="of swr-full">';
    h += '<tr class="hdr"><td class="company-name" style="text-align:center">WATERFLO PIPING SYSTEM</td></tr>';
    h += '<tr class="hdr"><td class="form-title">PIPES ORDER FORM</td></tr>';
    h += '<tr class="info-row"><td class="party-field">PARTY NAME:- <span class="fill-val">' + esc(party.company_name) + '</span></td></tr>';
    h += '<tr class="info-row"><td class="party-field">';
    h += 'ORDER DATE:- <span class="fill-val">' + fmtDate(order.created_at) + '</span>';
    h += ' &nbsp;&nbsp;&nbsp; STATE:- <span class="fill-val">' + esc(party.state || '') + '</span>';
    h += '</td></tr>';
    h += '</table>';

    // ══ SECTION 1: REGULAR (left) | PLUMLITE (right) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: REGULAR SCH-40 / SCH-80 ──
    h += '<td class="swr-cell" style="width:62%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="5" class="swr-sec-title">REGULAR</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl" rowspan="2">SIZE</td>';
    h += '<td colspan="2" class="c sz">SCH - 40</td>';
    h += '<td colspan="2" class="c sz">SCH - 80</td></tr>';
    h += '<tr class="sec-hdr"><td class="c sz">3 MTR</td><td class="c sz">6 MTR</td>';
    h += '<td class="c sz">3 MTR</td><td class="c sz">6 MTR</td></tr>';
    // Regular uPVC sizes ½" to 6"
    var regSizes = [
      { lbl:'\u00bd"',  s40:'UP4015',     s40_6:'UP4015_6M',  s80:'UP8015',     s80_6:'UP8015_6M' },
      { lbl:'\u00be"',  s40:'UP4020',     s40_6:'UP4020_6M',  s80:'UP8020',     s80_6:'UP8020_6M' },
      { lbl:'1"',       s40:'UP4025',     s40_6:'UP4025_6M',  s80:'UP8025',     s80_6:'UP8025_6M' },
      { lbl:'1\u00bc"', s40:'UP4032',     s40_6:'UP4032_6M',  s80:'UP8032',     s80_6:'UP8032_6M' },
      { lbl:'1\u00bd"', s40:'UP4040',     s40_6:'UP4040_6M',  s80:'UP8040',     s80_6:'UP8040_6M' },
      { lbl:'2"',       s40:'UP4050',     s40_6:'UP4050_6M',  s80:'UP8050',     s80_6:'UP8050_6M' },
      { lbl:'2\u00bd"', s40:'UP4065',     s40_6:null,          s80:'UP8065',     s80_6:null },
      { lbl:'3"',       s40:'UP4080',     s40_6:null,          s80:'UP8080',     s80_6:null },
      { lbl:'4"',       s40:'UP40100',    s40_6:null,          s80:'UP80100',    s80_6:null },
      { lbl:'6"',       s40:'UP40150',    s40_6:null,          s80:'UP80150',    s80_6:null }
    ];
    regSizes.forEach(function(r) {
      var codes = [r.s40, r.s40_6, r.s80, r.s80_6];
      h += agriRowN(r.lbl, codes, [], L, 4);
    });
    h += '</table></td>';

    // ── RIGHT: PLUMLITE SCH-40 ──
    h += '<td class="swr-cell" style="width:38%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="3" class="swr-sec-title">PLUMLITE</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl" rowspan="2">SIZE</td>';
    h += '<td colspan="2" class="c sz">SCH - 40</td></tr>';
    h += '<tr class="sec-hdr"><td class="c sz">3 MTR</td><td class="c sz">6 MTR</td></tr>';
    // Plumlite ½" to 2" (no product codes — cells remain empty)
    ['\u00bd"','\u00be"','1"','1\u00bc"','1\u00bd"','2"'].forEach(function(sz) {
      h += agriRowN(sz, [null, null], [], L, 2);
    });
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 2: SUREFIT (left) | 90 BEND (right) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: SUREFIT SCH-40 / SCH-80 ──
    h += '<td class="swr-cell" style="width:62%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="5" class="swr-sec-title">SUREFIT</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl" rowspan="2">SIZE</td>';
    h += '<td colspan="2" class="c sz">SCH - 40</td>';
    h += '<td colspan="2" class="c sz">SCH - 80</td></tr>';
    h += '<tr class="sec-hdr"><td class="c sz">3 MTR</td><td class="c sz">6 MTR</td>';
    h += '<td class="c sz">3 MTR</td><td class="c sz">6 MTR</td></tr>';
    var sfSizes = [
      { lbl:'\u00bd"',  s40:'UPS4015',     s40_6:'UPS4015_6M',  s80:'UPS8015',     s80_6:'UPS8015_6M' },
      { lbl:'\u00be"',  s40:'UPS4020',     s40_6:'UPS4020_6M',  s80:'UPS8020',     s80_6:'UPS8020_6M' },
      { lbl:'1"',       s40:'UPS4025',     s40_6:'UPS4025_6M',  s80:'UPS8025',     s80_6:'UPS8025_6M' },
      { lbl:'1\u00bc"', s40:'UPS4032',     s40_6:'UPS4032_6M',  s80:'UPS8032',     s80_6:'UPS8032_6M' },
      { lbl:'1\u00bd"', s40:'UPS4040',     s40_6:'UPS4040_6M',  s80:'UPS8040',     s80_6:'UPS8040_6M' },
      { lbl:'2"',       s40:'UPS4050',     s40_6:'UPS4050_6M',  s80:'UPS8050',     s80_6:'UPS8050_6M' }
    ];
    sfSizes.forEach(function(r) {
      h += agriRowN(r.lbl, [r.s40, r.s40_6, r.s80, r.s80_6], [], L, 4);
    });
    h += '</table></td>';

    // ── RIGHT: 90 BEND ──
    h += '<td class="swr-cell" style="width:38%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="2" class="swr-sec-title">90 BEND</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td><td class="c sz">QTY</td></tr>';
    var bendCodes = ['UFB9015','UFB9020','UFB9025','UFB9032','UFB9040','UFB9050'];
    var bendLabels = ['\u00bd"','\u00be"','1"','1\u00bc"','1\u00bd"','2"'];
    bendLabels.forEach(function(sz, i) {
      h += agriRowN(sz, [bendCodes[i]], [], L, 1);
    });
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 3: COLUMN PIPES (full width) ══
    h += '<table class="of">';
    h += '<tr class="sec-hdr"><td colspan="9" class="swr-sec-title">COLUMN PIPES</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td><td class="c sz">mm</td>';
    ['ECO','EASY','MED','ULTRA','STD','HEAVY','S.HEAVY'].forEach(function(g) {
      h += '<td class="c sz">' + g + '</td>';
    });
    h += '</tr>';

    // Column pipe rows: [label, mm, ECO, EASY, MED, ULTRA, STD, HEAVY, S.HEAVY]
    var colRows = [
      { lbl:'1"',       mm:'25',  codes:['BL-ECO25','BL-EASY25',null,'BL-ULT25','BL-STD25','BL-HVY25',null],          unavail:[2,6] },
      { lbl:'1\u00bc"', mm:'32',  codes:['BL-ECO32','BL-EASY32',null,'BL-ULT32','BL-STD32','BL-HVY32',null],          unavail:[2,6] },
      { lbl:'1\u00bd"', mm:'40',  codes:['BL-ECO40','BL-EASY40',null,'BL-ULT40','BL-STD40','BL-HVY40',null],          unavail:[2,6] },
      { lbl:'2"',       mm:'50',  codes:['BL-ECO50','BL-EASY50','BL-MED50','BL-ULT50','BL-STD50','BL-HVY50','BL-SHV50'], unavail:[] },
      { lbl:'2\u00bc"', mm:'60',  codes:[null,null,null,null,null,'BL-HVY60',null],                                     unavail:[0,1,2,3,4,6] },
      { lbl:'2\u00bd"', mm:'65',  codes:[null,null,'BL-MED65',null,'BL-STD65','BL-HVY65','BL-SHV65'],                   unavail:[0,1,3] },
      { lbl:'3"',       mm:'80',  codes:[null,null,'BL-MED80',null,'BL-STD80','BL-HVY80','BL-SHV80'],                   unavail:[0,1,3] },
      { lbl:'4"',       mm:'100', codes:[null,null,'BL-MED100','BL-ULT100','BL-STD100','BL-HVY100','BL-SHV100'],        unavail:[0,1] },
      { lbl:'5"',       mm:'125', codes:[null,null,null,null,'BL-STD125','BL-HVY125',null],                              unavail:[0,1,2,3,6] },
      { lbl:'6"',       mm:'150', codes:[null,null,null,null,'BL-STD150','BL-HVY150',null],                              unavail:[0,1,2,3,6] }
    ];
    colRows.forEach(function(r) {
      h += '<tr class="data-row"><td class="lbl">' + esc(r.lbl) + '</td><td class="c sz">' + r.mm + '</td>';
      for (var i = 0; i < 7; i++) {
        if (r.unavail.indexOf(i) >= 0) { h += '<td class="c na">-</td>'; }
        else { var v = r.codes[i] ? cellVal(L, r.codes[i]) : ''; h += '<td class="c' + (v ? ' filled' : '') + '">' + esc(v) + '</td>'; }
      }
      h += '</tr>';
    });

    // Bell-ended sub-section
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td><td class="c sz">mm</td>';
    h += '<td colspan="2" class="c sz">ECO (BELL)</td><td colspan="2" class="c sz">EASY (BELL)</td>';
    h += '<td colspan="3"></td></tr>';
    var bellRows = [
      { lbl:'1"',       mm:'25',  eco:'BL-ECOBE25',  easy:'BL-EASYBE25' },
      { lbl:'1\u00bc"', mm:'32',  eco:'BL-ECOBE32',  easy:'BL-EASYBE32' },
      { lbl:'1\u00bd"', mm:'40',  eco:'BL-ECOBE40',  easy:'BL-EASYBE40' }
    ];
    bellRows.forEach(function(r) {
      var v1 = cellVal(L, r.eco);
      var v2 = cellVal(L, r.easy);
      h += '<tr class="data-row"><td class="lbl">' + esc(r.lbl) + '</td><td class="c sz">' + r.mm + '</td>';
      h += '<td colspan="2" class="c' + (v1 ? ' filled' : '') + '">' + esc(v1) + '</td>';
      h += '<td colspan="2" class="c' + (v2 ? ' filled' : '') + '">' + esc(v2) + '</td>';
      h += '<td colspan="3"></td></tr>';
    });
    h += '</table>';

    // ══ FOOTER ══
    h += '<table class="of swr-full">';
    h += '<tr class="info-row">';
    h += '<td class="party-field">COLUMN BDL :- <span class="fill-val"></span></td>';
    h += '<td class="party-field">BUNDLE 3 MTR :- <span class="fill-val"></span></td>';
    h += '<td class="party-field">BUNDLE 6 MTR :- <span class="fill-val"></span></td>';
    h += '<td class="party-field">BAG :- <span class="fill-val"></span></td>';
    h += '</tr>';
    h += '<tr class="info-row">';
    h += '<td colspan="2" class="party-field">PARTY NAME :- <span class="fill-val">' + esc(party.company_name) + '</span></td>';
    h += '<td colspan="2" class="party-field">ORDER DATE :- <span class="fill-val">' + fmtDate(order.created_at) + '</span></td>';
    h += '</tr>';
    h += '<tr class="info-row">';
    h += '<td class="party-field">PREPARED BY :</td>';
    h += '<td class="party-field">CHECKED BY :</td>';
    h += '<td class="party-field">DISPATCH BY :</td>';
    h += '<td class="party-field">BILLING BY :</td>';
    h += '</tr>';
    h += '</table>';

    h += '</div>';
    return h;
  }


  // ─── Pipes Order Form 2 (Sheet3): Agri, SWR, UGD, Grey Plumbing, Casing, D/S ──

  function buildPipesForm2(order, items, party) {
    var L = buildItemLookup(items);
    var h = '<div class="form-page swr-form">';

    // ══ HEADER ══
    h += '<table class="of swr-full">';
    h += '<tr class="hdr"><td class="company-name" style="text-align:center">WATERFLO PIPING SYSTEM</td></tr>';
    h += '<tr class="hdr"><td class="form-title">PIPES ORDER FORM - 2</td></tr>';
    h += '<tr class="info-row"><td class="party-field">PARTY NAME:- <span class="fill-val">' + esc(party.company_name) + '</span></td></tr>';
    h += '<tr class="info-row"><td class="party-field">';
    h += 'ORDER DATE:- <span class="fill-val">' + fmtDate(order.created_at) + '</span>';
    h += ' &nbsp;&nbsp;&nbsp; STATE:- <span class="fill-val">' + esc(party.state || '') + '</span>';
    h += '</td></tr>';
    h += '</table>';

    // ══ SECTION 1: AGRI PIPE (left) | FAB. COUPLER + FAB. BEND (right) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: AGRI PIPE ──
    h += '<td class="swr-cell" style="width:45%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="6" class="swr-sec-title">AGRI PIPE</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td>';
    ['2.5 KG','4 KG','6 KG','8 KG','10 KG'].forEach(function(g) { h += '<td class="c sz">' + g + '</td>'; });
    h += '</tr>';
    // Agri pipe sizes 20-315
    var agriPipeSizes = [20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315];
    agriPipeSizes.forEach(function(sz) {
      var codes = [
        sz >= 90 ? 'AP25' + sz : null,   // 2.5kg: 90mm+
        sz >= 63 ? 'AP4' + sz : null,     // 4kg: 63mm+
        sz >= 40 ? 'AP6' + sz : null,     // 6kg: 40mm+
        sz >= 25 ? 'AP8' + sz : null,     // 8kg: 25mm+
        'AP10' + sz                        // 10kg: all sizes
      ];
      var unavail = [];
      if (sz < 90)  unavail.push(0);
      if (sz < 63)  unavail.push(1);
      if (sz < 40)  unavail.push(2);
      if (sz < 25)  unavail.push(3);
      h += agriRowN(sz + 'mm', codes, unavail, L, 5);
    });
    h += '<tr class="info-row"><td colspan="6" class="party-field" style="font-size:7px">DISCOUNT :-</td></tr>';
    h += '</table></td>';

    // ── RIGHT: FAB. COUPLER + FAB. BEND ──
    h += '<td class="swr-cell" style="width:55%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td rowspan="2" class="lbl">SIZE</td>';
    h += '<td colspan="2" class="c sz">FAB. COUPLER (BAG)</td>';
    h += '<td colspan="4" class="c sz">FAB. BEND (BAG)</td></tr>';
    h += '<tr class="sec-hdr">';
    h += '<td class="c sz">4 KG</td><td class="c sz">6 KG</td>';
    h += '<td class="c sz">4 KG</td><td class="c sz">6 KG</td><td class="c sz">10 KG</td><td class="c sz">15 KG</td></tr>';
    // FAB coupler/bend sizes 20-200
    var fabSizes = [20,25,32,40,50,63,75,90,110,140,160,180,200];
    fabSizes.forEach(function(sz) {
      var codes = [
        sz >= 63 ? 'AFC4' + sz : null,    // coupler 4kg: 63mm+
        sz >= 40 ? 'AFC6' + sz : null,     // coupler 6kg: 40mm+
        null, null, null, null              // fab bends: no product codes in catalog
      ];
      var unavail = [];
      if (sz < 63) unavail.push(0);
      if (sz < 40) unavail.push(1);
      h += agriRowN(sz + 'mm', codes, unavail, L, 6);
    });
    h += '<tr class="info-row"><td colspan="3" class="party-field" style="font-size:7px">DISCOUNT :-</td>';
    h += '<td colspan="4" class="party-field" style="font-size:7px">DISCOUNT :-</td></tr>';
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 2: Split — GREY PLUMBING + CASING (left) | UGD PIPE (right) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: GREY PLUMBING + CASING PIPE BLUE ──
    h += '<td class="swr-cell" style="width:45%"><table class="of swr-inner">';
    // Grey Plumbing
    h += '<tr class="sec-hdr"><td colspan="3" class="swr-sec-title">GREY PLUMBING</td>';
    h += '<td colspan="3" class="swr-sec-title">CASING PIPE BLUE</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td><td class="c sz">6 MTR</td><td class="c sz">3 MTR</td>';
    h += '<td class="lbl">SIZE</td><td class="c sz">SDR 52</td><td class="c sz">SDR 35</td></tr>';
    // Grey plumbing: 20-50mm (map to AgriMaster plumbing pipes AP15*)
    // Casing pipe: 110-200mm (no products in catalog)
    var greyData = [
      { gSz:'20', gCodes:['AP1520',null], cSz:'110', cCodes:[null,null] },
      { gSz:'25', gCodes:['AP1525',null], cSz:'140', cCodes:[null,null] },
      { gSz:'32', gCodes:['AP1532',null], cSz:'160', cCodes:[null,null] },
      { gSz:'40', gCodes:['AP1540',null], cSz:'180', cCodes:[null,null] },
      { gSz:'50', gCodes:['AP1550',null], cSz:'200', cCodes:[null,null] }
    ];
    greyData.forEach(function(r) {
      var v1 = r.gCodes[0] ? cellVal(L, r.gCodes[0]) : '';
      var v2 = r.gCodes[1] ? cellVal(L, r.gCodes[1]) : '';
      var v3 = r.cCodes[0] ? cellVal(L, r.cCodes[0]) : '';
      var v4 = r.cCodes[1] ? cellVal(L, r.cCodes[1]) : '';
      h += '<tr class="data-row">';
      h += '<td class="lbl">' + r.gSz + '</td>';
      h += '<td class="c' + (v1 ? ' filled' : '') + '">' + esc(v1) + '</td>';
      h += '<td class="c' + (v2 ? ' filled' : '') + '">' + esc(v2) + '</td>';
      h += '<td class="lbl">' + r.cSz + '</td>';
      h += '<td class="c' + (v3 ? ' filled' : '') + '">' + esc(v3) + '</td>';
      h += '<td class="c' + (v4 ? ' filled' : '') + '">' + esc(v4) + '</td>';
      h += '</tr>';
    });
    h += '<tr class="info-row"><td colspan="3" class="party-field" style="font-size:7px">DISCOUNT :-</td>';
    h += '<td colspan="3" class="party-field" style="font-size:7px">DISCOUNT :-</td></tr>';
    h += '</table></td>';

    // ── RIGHT: UGD PIPE ──
    h += '<td class="swr-cell" style="width:55%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="7" class="swr-sec-title">UGD PIPE</td></tr>';
    h += '<tr class="sec-hdr"><td rowspan="2" class="lbl">SIZE</td>';
    h += '<td colspan="3" class="c sz">UGD 3 MTR</td>';
    h += '<td colspan="3" class="c sz">UGD 6 MTR</td></tr>';
    h += '<tr class="sec-hdr">';
    h += '<td class="c sz">SN 2</td><td class="c sz">SN 4</td><td class="c sz">SN 8</td>';
    h += '<td class="c sz">SN 2</td><td class="c sz">SN 4</td><td class="c sz">SN 8</td></tr>';
    // UGD sizes: 110, 140(=125?), 160, 200
    var ugdSizes = [
      { lbl:'110', codes:[null,          'UGDSN410110','UGDSN810110',null,          'UGDSN420110','UGDSN820110'] },
      { lbl:'140', codes:[null,          null,          null,          null,          null,          null] },
      { lbl:'160', codes:['UGDSN210160','UGDSN410160','UGDSN810160','UGDSN220160','UGDSN420160','UGDSN820160'] },
      { lbl:'200', codes:['UGDSN210200','UGDSN410200','UGDSN810200','UGDSN220200','UGDSN420200','UGDSN820200'] }
    ];
    ugdSizes.forEach(function(r) {
      h += agriRowN(r.lbl, r.codes, [], L, 6);
    });
    h += '<tr class="info-row"><td colspan="7" class="party-field" style="font-size:7px">DISCOUNT :-</td></tr>';
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 3: SWR PIPE 3MTR (left) | SWR PIPE SF 6MTR (right) ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: SWR PIPE (3 MTR) ──
    h += '<td class="swr-cell" style="width:65%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="8" class="swr-sec-title">SWR PIPE (3 MTR)</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl" rowspan="2">SIZE</td>';
    h += '<td colspan="2" class="c sz">TYPE A</td>';
    h += '<td colspan="2" class="c sz">2.5 KG</td>';
    h += '<td colspan="2" class="c sz">TYPE B</td>';
    h += '<td class="c sz" rowspan="2"></td></tr>';
    h += '<tr class="sec-hdr">';
    h += '<td class="c sz">CLICKFIT</td><td class="c sz">SELF FIT</td>';
    h += '<td class="c sz">RF/2.5</td><td class="c sz">SF/2.5</td>';
    h += '<td class="c sz">CLICKFIT</td><td class="c sz">SELF FIT</td></tr>';
    // SWR 3MTR sizes
    var swr3Sizes = [
      { lbl:'75/110', cf_a:null, sf_a:null, rf25:null, sf25:null, cf_b:null, sf_b:null },
      { lbl:'110',    cf_a:'CSPAS10110', sf_a:'SSPA10110', rf25:null,         sf25:'SSP2510110', cf_b:'CSPBS10110', sf_b:'SSPB10110' },
      { lbl:'40',     cf_a:null,          sf_a:'SSPA1040',  rf25:null,         sf25:null,          cf_b:null,          sf_b:null },
      { lbl:'50',     cf_a:null,          sf_a:'SSPA1050',  rf25:null,         sf25:null,          cf_b:null,          sf_b:null },
      { lbl:'63',     cf_a:null,          sf_a:'SSPA1063',  rf25:null,         sf25:null,          cf_b:null,          sf_b:null },
      { lbl:'75',     cf_a:'CSPAS1075',  sf_a:'SSPA1075',  rf25:'RSP251075',  sf25:'SSP251075',   cf_b:'CSPBS1075',  sf_b:'SSPB1075' },
      { lbl:'90',     cf_a:'CSPAS1090',  sf_a:'SSPA1090',  rf25:null,         sf25:null,          cf_b:'CSPBS1090',  sf_b:'SSPB1090' },
      { lbl:'110',    cf_a:'CSPAS10110', sf_a:'SSPA10110', rf25:'RSP22510110', sf25:'SSP2510110', cf_b:'CSPBS10110', sf_b:'SSPB10110' },
      { lbl:'140',    cf_a:null,          sf_a:'SSPA10140', rf25:null,         sf25:null,          cf_b:null,          sf_b:null },
      { lbl:'160',    cf_a:'CSPAS10160', sf_a:'SSPA10160', rf25:null,         sf25:null,          cf_b:'CSPBS10160', sf_b:'SSPB10160' },
      { lbl:'200',    cf_a:null,          sf_a:'SSPA10200', rf25:null,         sf25:null,          cf_b:null,          sf_b:null },
      { lbl:'75/90/110', cf_a:null, sf_a:null, rf25:null, sf25:null, cf_b:null, sf_b:null }
    ];
    swr3Sizes.forEach(function(r) {
      h += agriRowN(r.lbl, [r.cf_a, r.sf_a, r.rf25, r.sf25, r.cf_b, r.sf_b, null], [], L, 7);
    });
    h += '<tr class="info-row"><td colspan="4" class="party-field" style="font-size:7px">DISCOUNT CLICK FIT :-</td>';
    h += '<td colspan="4" class="party-field" style="font-size:7px">DISCOUNT SELF FIT :-</td></tr>';
    h += '</table></td>';

    // ── RIGHT: SWR PIPE (SF) 6 MTR ──
    h += '<td class="swr-cell" style="width:35%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td colspan="4" class="swr-sec-title">SWR PIPE (SF)</td></tr>';
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td>';
    h += '<td class="c sz">TYPE A</td><td class="c sz">2.5 KG</td><td class="c sz">TYPE B</td></tr>';
    h += '<tr class="sec-hdr"><td></td>';
    h += '<td class="c sz">6 Mtr.</td><td class="c sz">6 Mtr.</td><td class="c sz">6 Mtr.</td></tr>';
    // SWR SF 6MTR sizes
    var swr6Sizes = [
      { lbl:'40',  a:'SSPA2040',  r25:null,         b:null },
      { lbl:'50',  a:'SSPA2050',  r25:null,         b:null },
      { lbl:'63',  a:'SSPA2063',  r25:null,         b:null },
      { lbl:'75',  a:'SSPA2075',  r25:'SSP252075',  b:'SSPB2075' },
      { lbl:'90',  a:'SSPA2090',  r25:null,         b:'SSPB2090' },
      { lbl:'110', a:'SSPA20110', r25:'SSP2520110', b:'SSPB20110' },
      { lbl:'140', a:'SSPA20140', r25:null,         b:null },
      { lbl:'160', a:'SSPA20160', r25:null,         b:'SSPB20160' },
      { lbl:'200', a:'SSPA20200', r25:null,         b:null }
    ];
    swr6Sizes.forEach(function(r) {
      h += agriRowN(r.lbl, [r.a, r.r25, r.b], [], L, 3);
    });
    h += '<tr class="info-row"><td colspan="4" class="party-field" style="font-size:7px">DISCOUNT :-</td></tr>';
    h += '</table></td>';

    h += '</tr></table>';

    // ══ SECTION 4: D/S + Footer ══
    h += '<table class="of swr-wrap"><tr>';

    // ── LEFT: Footer fields ──
    h += '<td class="swr-cell" style="width:55%"><table class="of swr-inner">';
    h += '<tr class="info-row"><td colspan="2" class="party-field">BUNDLE :- <span class="fill-val"></span></td></tr>';
    h += '<tr class="info-row"><td colspan="2" class="party-field">LOOSE PIPE :- <span class="fill-val"></span></td></tr>';
    h += '<tr class="info-row"><td colspan="2" class="party-field">BAG :- <span class="fill-val"></span></td></tr>';
    h += '<tr class="info-row"><td colspan="2" class="party-field">TRANSPORT :- <span class="fill-val"></span></td></tr>';
    h += '<tr class="info-row"><td colspan="2" class="party-field">LR. NO. :- <span class="fill-val"></span></td></tr>';
    h += '<tr class="info-row"><td colspan="2" class="party-field">VEHICLE NO. :- <span class="fill-val"></span></td></tr>';
    h += '<tr class="info-row"><td colspan="2" class="party-field">DRIVER NO. :- <span class="fill-val"></span></td></tr>';
    h += '</table></td>';

    // ── RIGHT: D/S (Down Spout) ──
    h += '<td class="swr-cell" style="width:45%"><table class="of swr-inner">';
    h += '<tr class="sec-hdr"><td class="lbl">SIZE</td>';
    h += '<td class="c sz">75/110</td><td class="c sz">75</td><td class="c sz">110</td></tr>';
    // D/S rows (no product codes in catalog — cells empty)
    ['D/S 2 FEET','D/S 3 FEET','D/S 4 FEET','D/S 6 FEET','D/S 3 MTR'].forEach(function(lbl) {
      h += agriRowN(lbl, [null, null, null], [], L, 3);
    });
    h += '</table></td>';

    h += '</tr></table>';

    // ══ FINAL FOOTER ══
    h += '<table class="of swr-full">';
    h += '<tr class="info-row">';
    h += '<td colspan="2" class="party-field">PARTY NAME :- <span class="fill-val">' + esc(party.company_name) + '</span></td>';
    h += '<td class="party-field">DATE :- <span class="fill-val">' + fmtDate(order.created_at) + '</span></td>';
    h += '</tr>';
    h += '<tr class="info-row">';
    h += '<td class="party-field">PREPARE BY :</td>';
    h += '<td class="party-field">BILLING BY :</td>';
    h += '<td class="party-field">DISPATCH BY :</td>';
    h += '</tr>';
    h += '</table>';

    h += '</div>';
    return h;
  }


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

    // Forms 2-6
    html += buildAGRIForm(order, items, party);
    html += buildUPVCForm(order, items, party);
    html += buildSWRForm(order, items, party);
    html += buildPipesForm1(order, items, party);
    html += buildPipesForm2(order, items, party);

    // Final sheet: complete order summary with all items
    html += buildOrderSummarySheet(order, items, party);

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

      /* SWR form */
      '.swr-form { font-size: 7.5px; }',
      '.swr-full { width: 100%; border-collapse: collapse; }',
      '.swr-full td { border: 1px solid #000; }',
      '.swr-wrap { width: 100%; border-collapse: collapse; border: none; }',
      '.swr-wrap > tbody > tr > td.swr-cell { width: 50%; vertical-align: top; padding: 0; border: none; }',
      '.swr-cell > table.of { width: 100%; }',
      '.swr-inner td { padding: 1px 2px; }',
      '.swr-inner .lbl { font-size: 6.5px; }',
      '.swr-inner .c { font-size: 7.5px; }',
      '.swr-inner .sz { font-size: 6px; }',
      '.swr-inner .rsz { font-size: 5.5px; }',
      '.swr-inner .filled { font-size: 8px; }',
      '.swr-sec-title { text-align: center; font-size: 7px; font-weight: 700; }',
      '.swr-wide .lbl { font-size: 5.5px; }',
      '.swr-wide .c { font-size: 6.5px; }',
      '.swr-solvent td { padding: 1px 2px; }',
      '.swr-solvent .lbl { font-size: 6.5px; }',
      '.swr-solvent .c { font-size: 7px; }',

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
