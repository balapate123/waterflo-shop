(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // Waterflo Order Forms — Exact Physical Form Replicas
  // 6 form pages matching physical PDF order forms
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── 1. UTILITIES ────────────────────────────────────────────────────────

  var X = '\u00d7'; // multiplication sign ×

  function esc(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function normSizeForForm(itemSize, formType) {
    var s = String(itemSize || '').trim();
    if (formType === 'mm') {
      return s.replace(/\s*mm$/i, '');
    }
    // inch: convert ASCII fractions to unicode
    s = s.replace(/1-1\/2/g, '1\u00BD').replace(/1-1\/4/g, '1\u00BC')
         .replace(/2-1\/2/g, '2\u00BD').replace(/2-1\/4/g, '2\u00BC')
         .replace(/3-1\/2/g, '3\u00BD').replace(/4-1\/2/g, '4\u00BD')
         .replace(/3\/4/g, '\u00BE').replace(/1\/2/g, '\u00BD')
         .replace(/1\/4/g, '\u00BC');
    s = s.replace(/[""\u201C\u201D]/g, '"');
    return s;
  }

  function sizeKey(raw, formType) {
    var s = normSizeForForm(raw, formType);
    return s.toLowerCase().replace(/\s+/g, '').replace(/[""\u201C\u201D]/g, '');
  }

  function nameKey(raw) {
    return String(raw || '').toLowerCase().trim()
      .replace(/\s+/g, ' ')
      .replace(/[°]/g, '')
      .replace(/\./g, '')
      .replace(/\s*\(.*?\)\s*/g, ' ')
      .trim();
  }

  function isPipeItem(item) {
    if (!item) return false;
    var n = (item.name || '').toLowerCase();
    return /pipe/i.test(n) || /column\s*pipe/i.test(n) || /casing\s*pipe/i.test(n);
  }

  function fmtQty(item) {
    var q = item.qty || item.quantity || 0;
    if (item.unit_type === 'stdpkg') return q + ' IB';
    return String(q);
  }

  function getItemBrand(item) {
    var code = (item.code || '').toUpperCase();
    if (code.startsWith('UGD')) return 'ugd';
    if (code.startsWith('CF')) return 'strongfit-cpvc';
    if (code.startsWith('CP')) return 'strongfit-cpvc';
    if (code.startsWith('UF')) return 'surefit-upvc';
    if (code.startsWith('UP')) return 'surefit-upvc';
    if (code.startsWith('AG')) return 'agrimaster';
    if (code.startsWith('CK')) return 'clickfit-swr';
    if (code.startsWith('SF')) return 'selfit';
    if (code.startsWith('SW')) return 'upvc-swr';
    if (code.startsWith('BL')) return 'boreline';
    return null;
  }

  // ─── 2. ITEM LOOKUP BUILDER ──────────────────────────────────────────────

  function getPipeLength(item) {
    var ut = (item.unit_type || '').toLowerCase();
    var ul = (item.unit_label || '').toLowerCase();
    if (ut.indexOf('3m') !== -1 || ul.indexOf('3m') !== -1) return '3mtr';
    if (ut.indexOf('5m') !== -1 || ul.indexOf('5m') !== -1) return '5mtr';
    if (ut.indexOf('6m') !== -1 || ul.indexOf('6m') !== -1) return '6mtr';
    return '';
  }

  function buildLookup(items, formType) {
    var map = {};
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var nk = nameKey(it.name);
      var sk = sizeKey(it.size, formType);
      var val = fmtQty(it);

      var key = nk + '|' + sk;
      map[key] = val;

      var pipeLen = getPipeLength(it);
      if (pipeLen) {
        map[nk + ' ' + pipeLen + '|' + sk] = val;
        var shortName = nk.replace(/\s*class-?\d+\s*/gi, ' ').replace(/\s+/g, ' ').trim();
        if (shortName !== nk) {
          map[shortName + ' ' + pipeLen + '|' + sk] = val;
        }
      }
    }
    return map;
  }

  function lookupCell(namePatterns, colHeader, formType, lookup) {
    var sk = sizeKey(colHeader, formType);
    for (var i = 0; i < namePatterns.length; i++) {
      var nk = nameKey(namePatterns[i]);
      var key = nk + '|' + sk;
      if (lookup[key]) {
        return { text: lookup[key], matched: true };
      }
    }
    return { text: '', matched: false };
  }

  // ─── 3. HTML TABLE HELPERS ───────────────────────────────────────────────

  // Render a standard grid table with label column + size columns
  // rows: [{ label, patterns, dash: [colIndex...] }]
  // dash array indicates columns that should show "-" (not available)
  function renderGrid(opts) {
    var hdrLabel = opts.hdrLabel || '';
    var cols = opts.cols;
    var rows = opts.rows;
    var ft = opts.ft || 'mm';
    var lk = opts.lk;
    var cls = opts.cls || '';

    var html = '<table class="of-tbl ' + cls + '">';
    // Header row
    html += '<tr class="of-hdr"><th class="of-lbl">' + esc(hdrLabel) + '</th>';
    for (var c = 0; c < cols.length; c++) {
      html += '<th>' + esc(cols[c]) + '</th>';
    }
    html += '</tr>';
    // Data rows
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      var patterns = row.patterns || [row.label];
      var dashSet = {};
      if (row.dash) {
        for (var d = 0; d < row.dash.length; d++) dashSet[row.dash[d]] = true;
      }
      html += '<tr><td class="of-lbl">' + esc(row.label) + '</td>';
      for (var c2 = 0; c2 < cols.length; c2++) {
        if (dashSet[c2]) {
          // Not available
          var cellDash = lookupCell(patterns, cols[c2], ft, lk);
          if (cellDash.matched) {
            html += '<td class="of-fill">' + esc(cellDash.text) + '</td>';
          } else {
            html += '<td class="of-na">-</td>';
          }
        } else {
          var cell = lookupCell(patterns, cols[c2], ft, lk);
          if (cell.matched) {
            html += '<td class="of-fill">' + esc(cell.text) + '</td>';
          } else {
            html += '<td></td>';
          }
        }
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  // Render a pipe table where rows are sizes and columns are pipe types/lengths
  // Each colDef: { header, patterns: [...] }
  function renderPipeGrid(opts) {
    var hdrLabel = opts.hdrLabel || 'SIZE';
    var sizes = opts.sizes;
    var colDefs = opts.colDefs;
    var ft = opts.ft || 'mm';
    var lk = opts.lk;
    var cls = opts.cls || '';
    var avail = opts.avail; // optional: avail[sizeIdx][colIdx] = true/false/'#'

    var html = '<table class="of-tbl ' + cls + '">';
    // Header
    html += '<tr class="of-hdr"><th class="of-lbl">' + esc(hdrLabel) + '</th>';
    for (var c = 0; c < colDefs.length; c++) {
      html += '<th>' + esc(colDefs[c].header) + '</th>';
    }
    html += '</tr>';
    // Rows
    for (var r = 0; r < sizes.length; r++) {
      html += '<tr><td class="of-lbl">' + esc(sizes[r]) + '</td>';
      for (var c2 = 0; c2 < colDefs.length; c2++) {
        var cell = lookupCell(colDefs[c2].patterns, sizes[r], ft, lk);
        if (cell.matched) {
          html += '<td class="of-fill">' + esc(cell.text) + '</td>';
        } else if (avail && avail[r] && avail[r][c2] === false) {
          html += '<td class="of-na">-</td>';
        } else {
          html += '<td></td>';
        }
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  function secTitle(text) {
    return '<div class="of-sec">' + esc(text) + '</div>';
  }

  function discountLine(text) {
    return '<div class="of-disc">' + esc(text || 'DISCOUNT :-') + '</div>';
  }

  // ─── 4. FORM HEADER / FOOTER ────────────────────────────────────────────

  function formHeader(brandHtml, formTitle, order, extra) {
    var partyName = order.company_name || order.contact_name || order.user_name || '';
    var orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN') : '';

    var html = '<div class="of-hdr-box">';
    html += '<div class="of-hdr-row">';
    html += '<div class="of-hdr-brand">' + brandHtml + '</div>';
    html += '<div class="of-hdr-title">WATERFLO PIPING SYSTEM / ' + esc(formTitle) + '</div>';
    html += '</div>';
    html += '<div class="of-meta">';
    html += '<span>PARTY NAME: <b>' + esc(partyName) + '</b></span>';
    html += '<span>ORDER DATE: <b>' + esc(orderDate) + '</b></span>';
    if (extra && extra.lorryNo !== undefined) {
      html += '<span>LORRY NO: ______</span>';
    }
    html += '<span>STATE: ______</span>';
    html += '<span>DELIVERY: ______</span>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function formFooter(text, pageInfo) {
    return '<div class="of-foot"><span>' + esc(text) + '</span><span class="of-pg">' + esc(pageInfo) + '</span></div>';
  }

  // ─── 5. FORM 1: CPVC ORDER FORM (Landscape) — StrongFit™ ───────────────

  function generateCPVCForm(order, items) {
    var ft = 'inch';
    var lk = buildLookup(items, ft);

    var html = '<div class="of-page of-land">';
    html += formHeader('StrOngFit\u2122', 'CPVC ORDER FORM', order, {});

    html += '<div class="of-row">';

    // ── LEFT COLUMN ──
    html += '<div class="of-col" style="flex:1.2">';

    // PIPE SIZE table
    var pipeCols = ['\u00BD"', '\u00BE"', '1"', '1\u00BC"', '1\u00BD"', '2"'];
    html += renderGrid({
      hdrLabel: 'PIPE SIZE', cols: pipeCols, ft: ft, lk: lk,
      rows: [
        { label: 'SDR 13.5 (5mtr.)', patterns: ['CPVC Pipe SDR 13.5 Class-2 5mtr', 'CPVC Pipe SDR 13.5 5mtr', 'CPVC Pipe SDR 135 5mtr'] },
        { label: 'SDR 13.5 (3mtr.)', patterns: ['CPVC Pipe SDR 13.5 Class-2 3mtr', 'CPVC Pipe SDR 13.5 3mtr', 'CPVC Pipe SDR 135 3mtr'] },
        { label: 'SDR 11 (5mtr.)', patterns: ['CPVC Pipe SDR 11 Class-1 5mtr', 'CPVC Pipe SDR 11 5mtr'] },
        { label: 'SDR 11 (3mtr.)', patterns: ['CPVC Pipe SDR 11 Class-1 3mtr', 'CPVC Pipe SDR 11 3mtr'] },
        { label: 'COLD WATER (5mtr)', patterns: ['CPVC Pipe Cold Water 5mtr', 'Cold Water Pipe 5mtr', 'CPVC Pipe Cold Water'] },
        { label: 'SCH-40', patterns: ['CPVC Pipe SCH 40', 'CPVC Pipe SCH-40'] },
        { label: 'SCH-80', patterns: ['CPVC Pipe SCH 80', 'CPVC Pipe SCH-80'] }
      ]
    });

    // FITTING SIZE table (main fittings)
    var fitCols = ['\u00BD"', '\u00BE"', '1"', '1\u00BC"', '1\u00BD"', '2"', '2\u00BD"', '3"', '4"', '6"'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: fitCols, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW', patterns: ['Elbow', 'CPVC Elbow'] },
        { label: 'TEE', patterns: ['Tee', 'CPVC Tee'] },
        { label: 'COUPLER', patterns: ['Coupler', 'CPVC Coupler'] },
        { label: 'M.T.A.', patterns: ['MTA', 'M.T.A.', 'Male Threaded Adaptor'] },
        { label: 'F.T.A.', patterns: ['FTA', 'F.T.A.', 'Female Threaded Adaptor'] },
        { label: 'ELBOW 45\u00B0', patterns: ['Elbow 45', 'Elbow 45\u00B0'] },
        { label: 'END CAP', patterns: ['End Cap'] },
        { label: 'UNION', patterns: ['Union'] },
        { label: 'BALL VALVE', patterns: ['Ball Valve'], dash: [6,7,8,9] },
        { label: 'FLANGE', patterns: ['Flange'], dash: [0] },
        { label: 'T.CON. SOCKET', patterns: ['Tank Connector Socket', 'Tank Connector (Socket)', 'TC Socket', 'T.C.Socket', 'T.Con. Socket'] },
        { label: 'LONG RADIUS BEND', patterns: ['Long Radius Bend', 'Step Over Bend', 'S.O.B.'] },
        { label: 'CNCLD. VALVE', patterns: ['Concealed Valve', 'Cncld. Valve'] },
        { label: 'T.CONNECTOR', patterns: ['Tank Connector', 'T.Connector', 'T Connector'] },
        { label: 'CROSS TEE', patterns: ['Cross Tee'] },
        { label: 'N.R.V', patterns: ['NRV', 'N.R.V', 'Non Return Valve'] }
      ]
    });

    html += '</div>'; // end left col

    // ── RIGHT COLUMN ──
    html += '<div class="of-col" style="flex:1">';

    // FITTING SIZE (Brass)
    var brassCols = ['\u00BD"', '\u00BE"', '1"'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: brassCols, ft: ft, lk: lk,
      rows: [
        { label: 'BRASS ELBOW', patterns: ['Brass Elbow'] },
        { label: 'BRASS TEE', patterns: ['Brass Tee'] },
        { label: 'BRASS M.T.A.', patterns: ['Brass MTA', 'Brass M.T.A.'] },
        { label: 'BRASS F.T.A.', patterns: ['Brass FTA', 'Brass F.T.A.'] },
        { label: 'LONG PLUG', patterns: ['Long Plug'] },
        { label: 'B.M.T.A (HEX)', patterns: ['Brass MTA (Hex)', 'Brass MTA Hex', 'B.M.T.A (HEX)', 'B. M.T.A. (HEX)'] },
        { label: 'B.F.T.A (HEX)', patterns: ['Brass FTA (Hex)', 'Brass FTA Hex', 'B.F.T.A (HEX)', 'B. F.T.A. (HEX)'] },
        { label: 'CNVTR. BUSH', patterns: ['Converter Bushing', 'Converter Bushing (IPS to CTS)', 'Cnvtr. Bush', 'Converter Bush'] }
      ]
    });

    // R.ELBOW / R M.T.A / R F.T.A
    var rCols = ['\u00BE"' + X + '\u00BD"', '1"' + X + '\u00BD"', '1"' + X + '\u00BE"'];
    html += renderGrid({
      hdrLabel: 'REDUCING SIZE', cols: rCols, ft: ft, lk: lk,
      rows: [
        { label: 'R.ELBOW', patterns: ['Reducer Elbow', 'R. Elbow', 'R Elbow', 'R.Elbow', 'Brass Elbow'] },
        { label: 'R M.T.A', patterns: ['Reducer MTA', 'R. MTA', 'R MTA', 'R. M.T.A', 'R M.T.A', 'Brass MTA', 'Brass M.T.A.'] },
        { label: 'R F.T.A', patterns: ['Reducer FTA', 'R. FTA', 'R FTA', 'R. F.T.A', 'R F.T.A', 'Brass FTA', 'Brass F.T.A.'] }
      ]
    });

    // CV VALVES (REDUCING SIZE)
    var cvCols = ['\u00BD"', '\u00BE"', '1"'];
    html += renderGrid({
      hdrLabel: 'CV VALVES (REDUCING SIZE)', cols: cvCols, ft: ft, lk: lk,
      rows: [
        { label: 'CV LONG ROUND KNOB', patterns: ['CV Long Round Knob', 'Concealed Valve Long Round'] },
        { label: 'CV SHORT ROUND KNOB', patterns: ['CV Short Round Knob', 'Concealed Valve Short Round'] },
        { label: 'CV LONG TRIANGLE KNOB', patterns: ['CV Long Triangle Knob', 'Concealed Valve Long Triangle'] },
        { label: 'CV SHORT TRIANGLE KNOB', patterns: ['CV Short Triangle Knob', 'Concealed Valve Short Triangle'] }
      ]
    });

    html += '</div>'; // end right col
    html += '</div>'; // end row

    // ── REDUCING SIZE tables (full width, 3 groups) ──
    var redRows = [
      { label: 'R.TEE', patterns: ['Reducer Tee', 'R. Tee', 'R Tee', 'R.Tee'] },
      { label: 'R.COUPLER', patterns: ['Reducer Coupler', 'R. Coupler', 'R Coupler', 'R.Coupler'] },
      { label: 'R.BUSH', patterns: ['Reducer Bush', 'R. Bush', 'R Bush', 'Reducer Bushing', 'R.Bush'] }
    ];

    var redG1 = ['\u00BE"'+X+'\u00BD"', '1"'+X+'\u00BD"', '1"'+X+'\u00BE"', '1\u00BC"'+X+'\u00BD"', '1\u00BC"'+X+'\u00BE"', '1\u00BC"'+X+'1"', '1\u00BD"'+X+'\u00BD"', '1\u00BD"'+X+'\u00BE"', '1\u00BD"'+X+'1"', '1\u00BD"'+X+'1\u00BC"'];
    var redG2 = ['2"'+X+'\u00BD"', '2"'+X+'\u00BE"', '2"'+X+'1"', '2"'+X+'1\u00BC"', '2"'+X+'1\u00BD"', '2\u00BD"'+X+'2"', '3"'+X+'1\u00BD"', '3"'+X+'2"', '3"'+X+'2\u00BD"', '4"'+X+'2"'];
    var redG3 = ['4"'+X+'2\u00BD"', '4"'+X+'3"', '6"'+X+'2"', '6"'+X+'2\u00BD"', '6"'+X+'3"', '6"'+X+'4"'];

    html += renderGrid({ hdrLabel: 'REDUCING SIZE', cols: redG1, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'REDUCING SIZE', cols: redG2, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'REDUCING SIZE', cols: redG3, rows: redRows, ft: ft, lk: lk });

    // ── MIXER ADAPTOR ──
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var mixCols = ['6"', '7"'];
    html += renderGrid({
      hdrLabel: 'MIXER ADAPTOR', cols: mixCols, ft: ft, lk: lk,
      rows: [
        { label: 'ALL TOP', patterns: ['Mixer Adaptor All Top', 'Mixer Adaptor - All Top'] },
        { label: 'TOP & BOTTOM', patterns: ['Mixer Adaptor Top & Bottom', 'Mixer Adaptor Top Bottom', 'Mixer Adaptor - Top & Bottom'] },
        { label: 'TOP & SIDE', patterns: ['Mixer Adaptor Top & Side', 'Mixer Adaptor Top Side', 'Mixer Adaptor - Top & Side'] },
        { label: 'HOT UP & COLD DOWN', patterns: ['Mixer Adaptor Hot Up & Cold Down', 'Mixer Adaptor Hot Up Cold Down', 'Mixer Adaptor - Hot Up & Cold Down'] },
        { label: 'HOT SIDE & COLD DOWN', patterns: ['Mixer Adaptor Hot Side & Cold Down', 'Mixer Adaptor Hot Side Cold Down', 'Mixer Adaptor - Hot Side & Cold Down'] },
        { label: 'KITCHEN MIXER ADAPTOR', patterns: ['Kitchen Mixer Adaptor'] }
      ]
    });
    html += '</div>';
    html += '</div>';

    html += formFooter('BOX: _0_  ITEM: _0_  BUNDLE: _0_0_  TOTAL WT: _0_', '1 of 7');
    html += '</div>'; // end page
    return html;
  }

  // ─── 6. FORM 2: AgriMASTER ORDER FORM (Portrait) ────────────────────────

  function generateAgriMasterForm(order, items) {
    var ft = 'mm';
    var lk = buildLookup(items, ft);

    var html = '<div class="of-page of-port">';
    html += formHeader('AgriMASTER', 'AgriMASTER ORDER FORM', order, { lorryNo: true });

    // ── Top section: Agriculture fittings side by side ──
    html += '<div class="of-row">';

    // Top left
    html += '<div class="of-col">';
    var agriL = ['63', '75', '90', '110', '140', '160', '200', '250'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: agriL, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW 4KG', patterns: ['Elbow 4KG', 'Elbow 4Kg'] },
        { label: 'ELBOW EQUAL', patterns: ['Elbow Equal', 'Elbow Equal (Plain)', 'Elbow Plain'], dash: [0,1,2,3,4,5] },
        { label: 'ELBOW BLISS', patterns: ['Elbow Bliss'] },
        { label: 'TEE 4KG', patterns: ['Tee 4KG', 'Tee 4Kg'] },
        { label: 'TEE EQUAL', patterns: ['Tee Equal'] },
        { label: 'TEE BLISS', patterns: ['Tee Bliss'] },
        { label: 'COUPLER 4KG', patterns: ['Coupler 4KG', 'Coupler 4Kg'] },
        { label: 'ELBOW THR.', patterns: ['Elbow Thr', 'Elbow Thr.', 'Elbow Threaded'] },
        { label: 'TAIL PIECE', patterns: ['Tail Piece', 'Tailpiece'] }
      ]
    });
    html += '</div>';

    // Top right
    html += '<div class="of-col">';
    var agriR = ['40', '50', '63', '75', '90', '110', '160'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: agriR, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW LW', patterns: ['Elbow LW', 'LW Elbow'] },
        { label: 'TEE LW', patterns: ['Tee LW', 'LW Tee'] },
        { label: 'DOOR ELBOW', patterns: ['Door Elbow'] },
        { label: 'DOOR TEE', patterns: ['Door Tee'] },
        { label: 'MTA (HEX)', patterns: ['MTA Hex', 'MTA (HEX)'] }
      ]
    });
    // Small reducer table
    var agriRed1 = ['20', '25'+X+'20', '32'+X+'20', '32'+X+'25', '110'+X+'63', '110'+X+'75', '110'+X+'90'];
    html += renderGrid({
      hdrLabel: 'RED. SIZE', cols: agriRed1, ft: ft, lk: lk,
      rows: [
        { label: 'LONG PLUG', patterns: ['Long Plug'] },
        { label: 'RED ELBOW', patterns: ['Red Elbow', 'Reducer Elbow'] }
      ]
    });
    html += '</div>';

    html += '</div>'; // end top row

    // ── Main fittings ──
    var mainCols = ['20', '25', '32', '40', '50', '63', '75', '90', '110', '125', '140', '160', '180', '200', '250', '315'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: mainCols, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW 10 KG', patterns: ['Elbow 10 KG', 'Elbow 10Kg', 'Elbow 10KG'] },
        { label: 'ELBOW 6KG', patterns: ['Elbow 6KG', 'Elbow 6Kg'] },
        { label: 'TEE 10 KG', patterns: ['Tee 10 KG', 'Tee 10Kg', 'Tee 10KG'] },
        { label: 'TEE 6KG', patterns: ['Tee 6KG', 'Tee 6Kg'] },
        { label: 'COUPLER 6KG', patterns: ['Coupler 6KG', 'Coupler 6Kg'] },
        { label: 'M.T.A.', patterns: ['MTA', 'M.T.A.', 'Male Threaded Adaptor'] },
        { label: 'F.T.A.', patterns: ['FTA', 'F.T.A.', 'Female Threaded Adaptor'] },
        { label: 'END CAP 6KG', patterns: ['End Cap 6KG', 'End Cap 6Kg'] },
        { label: 'END CAP 4KG', patterns: ['End Cap 4KG', 'End Cap 4Kg', 'End Cap'] },
        { label: 'END CAP THR.', patterns: ['End Cap Thr', 'End Cap Thr.', 'End Cap Threaded'] },
        { label: 'SINGLE "Y"', patterns: ['Single Y', 'Single "Y"'] },
        { label: 'BEND 45\u00B0', patterns: ['Bend 45', 'Bend 45\u00B0'] },
        { label: 'UNION 10 KG', patterns: ['Union 10 KG', 'Union 10Kg', 'Union'] },
        { label: 'BALL VALVE', patterns: ['Ball Valve'] },
        { label: 'FOUR WAY TEE', patterns: ['Four Way Tee', '4 Way Tee'] }
      ]
    });

    // ── Reducers — 4 groups ──
    var redRows = [
      { label: 'R.COUPLER', patterns: ['Reducer Coupler', 'R. Coupler', 'R Coupler', 'R.Coupler'] },
      { label: 'R.TEE', patterns: ['Reducer Tee', 'R. Tee', 'R Tee', 'R.Tee'] },
      { label: 'R.BUSH', patterns: ['Reducer Bush', 'R. Bush', 'R Bush', 'Reducer Bushing', 'R.Bush'] },
      { label: 'R.F.T.A.', patterns: ['Reducer FTA', 'R. FTA', 'R. F.T.A.', 'R.F.T.A.'] },
      { label: 'S S', patterns: ['SS', 'S S', 'Step Socket'] }
    ];

    var rG1 = ['25'+X+'20','32'+X+'20','32'+X+'25','40'+X+'20','40'+X+'25','40'+X+'32','50'+X+'20','50'+X+'25','50'+X+'32','50'+X+'40','63'+X+'20','63'+X+'25','63'+X+'32','63'+X+'40','63'+X+'50','75'+X+'20','75'+X+'25'];
    var rG2 = ['75'+X+'32','75'+X+'40','75'+X+'50','75'+X+'63','90'+X+'20','90'+X+'25','90'+X+'32','90'+X+'40','90'+X+'50','90'+X+'63','90'+X+'75','110'+X+'20','110'+X+'25','110'+X+'32','110'+X+'50','110'+X+'63','110'+X+'75'];
    var rG3 = ['110'+X+'90','125'+X+'110','140'+X+'63','140'+X+'75','140'+X+'90','140'+X+'110','140'+X+'125','160'+X+'75','160'+X+'90','160'+X+'110','160'+X+'140','180'+X+'110','180'+X+'140','180'+X+'160','200'+X+'90','200'+X+'110','200'+X+'140'];
    var rG4 = ['200'+X+'160','200'+X+'180','250'+X+'110','250'+X+'140','250'+X+'160','250'+X+'180','250'+X+'200','315'+X+'160','315'+X+'200','315'+X+'250','225'];
    // FOUR WAY TEE row at bottom of group 4
    var redRowsG4 = redRows.concat([
      { label: 'FOUR WAY TEE', patterns: ['Four Way Tee', '4 Way Tee'] }
    ]);

    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: rG1, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: rG2, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: rG3, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: rG4, rows: redRowsG4, ft: ft, lk: lk });

    // Small reducer table
    var rSmall = ['140'+X+'20','140'+X+'25','140'+X+'32','160'+X+'20','160'+X+'25','160'+X+'32','180'+X+'20','180'+X+'25','180'+X+'32'];
    html += renderGrid({
      hdrLabel: 'RED. SIZE', cols: rSmall, ft: ft, lk: lk,
      rows: [
        { label: 'R.COUPLER / SS', patterns: ['Reducer Coupler', 'R. Coupler', 'SS', 'S S'] },
        { label: 'R.TEE', patterns: ['Reducer Tee', 'R. Tee', 'R Tee', 'R.Tee'] },
        { label: 'R.BUSH', patterns: ['Reducer Bush', 'R. Bush', 'R Bush'] },
        { label: 'END CAP 4KG', patterns: ['End Cap 4KG', 'End Cap 4Kg', 'End Cap'] }
      ]
    });

    // ── Threaded section ──
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var thrCols = ['20', '75', '90', '25'+X+'20', '32'+X+'20', '32'+X+'25', '75'+X+'50', '75'+X+'63', '90'+X+'63', '90'+X+'75'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: thrCols, ft: ft, lk: lk,
      rows: [
        { label: 'THR ELBOW', patterns: ['Thr Elbow', 'THR Elbow', 'Threaded Elbow'] },
        { label: 'THR TEE', patterns: ['Thr Tee', 'THR Tee', 'Threaded Tee'] },
        { label: 'R.M.T.A.', patterns: ['Reducer MTA', 'R. MTA', 'R. M.T.A.', 'R.M.T.A.'] }
      ]
    });
    html += '</div>';

    // Right side special items
    html += '<div class="of-col">';
    var dCols = ['90', '110', '140', '160'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: dCols, ft: ft, lk: lk,
      rows: [
        { label: 'D ELBOW 6kg', patterns: ['D Elbow 6kg', 'D Elbow 6KG'] },
        { label: 'D TEE 6kg', patterns: ['D Tee 6kg', 'D Tee 6KG'] },
        { label: 'DOOR Y', patterns: ['Door Y'] }
      ]
    });
    // ELBOW 6Kg (NEW), TEE 6Kg (NEW) — same columns
    html += renderGrid({
      hdrLabel: '', cols: dCols, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW 6Kg (NEW)', patterns: ['Elbow 6Kg (NEW)', 'Elbow 6Kg New'] },
        { label: 'TEE 6Kg (NEW)', patterns: ['Tee 6Kg (NEW)', 'Tee 6Kg New'] }
      ]
    });
    html += '</div>';
    html += '</div>';

    // BSW-Thr section
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var bswCols = ['50', '63', '110'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: bswCols, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW (BSW-Thr)', patterns: ['Elbow BSW-Thr', 'Elbow (BSW-Thr)'] },
        { label: 'END CAP (BSW-Thr)', patterns: ['End Cap BSW-Thr', 'End Cap (BSW-Thr)'] },
        { label: 'M.T.A. (BSW-Thr)', patterns: ['MTA BSW-Thr', 'M.T.A. (BSW-Thr)'] },
        { label: 'F.T.A. (BSW-Thr)', patterns: ['FTA BSW-Thr', 'F.T.A. (BSW-Thr)'] },
        { label: 'ELBOW (BSW-Thr)', patterns: ['Elbow BSW-Thr', 'Elbow (BSW-Thr)'] }
      ]
    });
    html += '</div>';

    // Brass
    html += '<div class="of-col">';
    var brassCols2 = ['\u00BD', '25'+X+'\u00BD', '32'+X+'\u00BD', '32'+X+'\u00BE'];
    html += renderGrid({
      hdrLabel: 'BRASS', cols: brassCols2, ft: ft, lk: lk,
      rows: [
        { label: 'BRASS ELBOW', patterns: ['Brass Elbow'] },
        { label: 'BRASS TEE', patterns: ['Brass Tee'] },
        { label: 'BRASS F.T.A.', patterns: ['Brass FTA', 'Brass F.T.A.'] },
        { label: 'BRASS M.T.A.', patterns: ['Brass MTA', 'Brass M.T.A.'] }
      ]
    });
    html += '</div>';
    html += '</div>';

    html += formFooter('BOX: _0_  BAG: _0_  S BOX: _0_  TOTAL: ___  ITEM: _0_  TOTAL WT: _0_', '2 OF 7');
    html += '</div>'; // end page
    return html;
  }

  // ─── 7. FORM 3: Surefit uPVC ORDER FORM (Portrait) ─────────────────────

  function generateSurefitForm(order, items) {
    var ft = 'inch';
    var lk = buildLookup(items, ft);

    var html = '<div class="of-page of-port">';
    html += formHeader('Surefit \u00AE', 'uPVC ORDER FORM', order, { lorryNo: true });

    // Main fittings
    var mainCols = ['\u00BD"', '\u00BE"', '1"', '1\u00BC"', '1\u00BD"', '2"', '2\u00BD"', '3"', '4"', '6"'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: mainCols, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW', patterns: ['Elbow'] },
        { label: 'TEE', patterns: ['Tee'] },
        { label: 'COUPLER', patterns: ['Coupler'] },
        { label: 'M.T.A.', patterns: ['MTA', 'M.T.A.', 'Male Threaded Adaptor'] },
        { label: 'F.T.A.', patterns: ['FTA', 'F.T.A.', 'Female Threaded Adaptor'] },
        { label: 'ELBOW 45\u00B0', patterns: ['Elbow 45', 'Elbow 45\u00B0'] },
        { label: 'END CAP', patterns: ['End Cap'] },
        { label: 'UNION', patterns: ['Union'] },
        { label: 'BALL VALVE', patterns: ['Ball Valve'], dash: [6,7,8,9] },
        { label: 'BALL VALVE (COMP)', patterns: ['Ball Valve (Comp)', 'Ball Valve Comp'] },
        { label: 'BALL VALVE (LONG)', patterns: ['Ball Valve (Long)', 'Ball Valve Long'] },
        { label: 'BALL VALVE (LONG THR)', patterns: ['Ball Valve (Long Thr)', 'Ball Valve Long Thr'] },
        { label: 'FLANGE', patterns: ['Flange'] },
        { label: 'T.CON. SOCKET', patterns: ['Tank Connector Socket', 'T.Con. Socket', 'TC Socket'] },
        { label: 'T. CON. (Thr)', patterns: ['Tank Connector Thr', 'T. Con. (Thr)', 'TC Thr'] },
        { label: 'BRASS M.T.A.', patterns: ['Brass MTA', 'Brass M.T.A.'] },
        { label: 'BRASS F.T.A.', patterns: ['Brass FTA', 'Brass F.T.A.'] },
        { label: 'N.R.V', patterns: ['NRV', 'N.R.V', 'Non Return Valve'] }
      ]
    });

    // Brass section (left) + R.ELBOW/B.FTA/B.MTA (right) — side by side
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var brassL = ['\u00BD"', '\u00BE"', '1"', '\u00BE"'+X+'\u00BD"', '1"'+X+'\u00BD"', '1"'+X+'\u00BE"'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: brassL, ft: ft, lk: lk,
      rows: [
        { label: 'BRASS ELBOW', patterns: ['Brass Elbow'] },
        { label: 'BRASS TEE', patterns: ['Brass Tee'] },
        { label: 'THR. ELBOW', patterns: ['Thr Elbow', 'Threaded Elbow', 'THR. Elbow'] },
        { label: 'THR. TEE', patterns: ['Thr Tee', 'Threaded Tee', 'THR. Tee'] }
      ]
    });
    html += '</div>';

    html += '<div class="of-col">';
    var brassR = ['\u00BE"'+X+'\u00BD"', '1"'+X+'\u00BD"', '1"'+X+'\u00BE"'];
    html += renderGrid({
      hdrLabel: 'REDUCING SIZE', cols: brassR, ft: ft, lk: lk,
      rows: [
        { label: 'R. ELBOW', patterns: ['Reducer Elbow', 'R. Elbow', 'R Elbow'] },
        { label: 'B. FTA', patterns: ['Brass FTA', 'B. FTA', 'B.FTA'] },
        { label: 'B. MTA', patterns: ['Brass MTA', 'B. MTA', 'B.MTA'] }
      ]
    });
    html += '</div>';
    html += '</div>';

    // Grade 40 section (left) + extras (right) — side by side
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var g40L = ['\u00BD"', '\u00BE"', '1"', '1\u00BC"', '1\u00BD"', '2"'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: g40L, ft: ft, lk: lk,
      rows: [
        { label: 'ELBOW (40)', patterns: ['Elbow (40)', 'Elbow 40', 'Elbow Grade 40'] },
        { label: 'TEE (40)', patterns: ['Tee (40)', 'Tee 40', 'Tee Grade 40'] },
        { label: 'COUPLER (40)', patterns: ['Coupler (40)', 'Coupler 40', 'Coupler Grade 40'] },
        { label: 'M.T.A (40)', patterns: ['MTA (40)', 'MTA 40', 'M.T.A (40)'] },
        { label: 'F.T.A. (40)', patterns: ['FTA (40)', 'FTA 40', 'F.T.A. (40)'] }
      ]
    });
    html += '</div>';

    html += '<div class="of-col">';
    var g40R = ['\u00BD"', '\u00BE"', '1"'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: g40R, ft: ft, lk: lk,
      rows: [
        { label: 'CROSS TEE', patterns: ['Cross Tee'] },
        { label: 'ELBOW 45\u00B0(40)', patterns: ['Elbow 45 (40)', 'Elbow 45\u00B0 (40)', 'Elbow 45 40'] },
        { label: 'LONG PLUG', patterns: ['Long Plug'] },
        { label: 'CV LONG', patterns: ['CV Long', 'Concealed Valve Long'] },
        { label: 'CV SHORT', patterns: ['CV Short', 'Concealed Valve Short'] }
      ]
    });
    html += '</div>';
    html += '</div>';

    // Reducers — 3 groups
    var redRows = [
      { label: 'R. TEE (80)', patterns: ['Reducer Tee', 'R. Tee', 'R Tee'] },
      { label: 'R. COUPLER (80)', patterns: ['Reducer Coupler', 'R. Coupler', 'R Coupler'] },
      { label: 'R. BUSH (80)', patterns: ['Reducer Bush', 'R. Bush', 'R Bush', 'Reducer Bushing'] }
    ];
    var sG1 = ['\u00BE"'+X+'\u00BD"','1"'+X+'\u00BD"','1"'+X+'\u00BE"','1\u00BC"'+X+'\u00BD"','1\u00BC"'+X+'\u00BE"','1\u00BC"'+X+'1"','1\u00BD"'+X+'\u00BD"','1\u00BD"'+X+'\u00BE"','1\u00BD"'+X+'1"','1\u00BD"'+X+'1\u00BC"'];
    var sG2 = ['2"'+X+'\u00BD"','2"'+X+'\u00BE"','2"'+X+'1"','2"'+X+' 1\u00BC"','2"'+X+' 1\u00BD"','2\u00BD"'+X+'1"','2\u00BD"'+X+'1\u00BD"','2\u00BD"'+X+'2"','3"'+X+'1\u00BD"','3"'+X+'2"'];
    var sG3 = ['3"'+X+'2\u00BD"','4"'+X+'1\u00BD"','4"'+X+'2"','4"'+X+'2\u00BD"','4"'+X+'3"','6"'+X+'2"','6"'+X+'2\u00BD"','6"'+X+'3"','6"'+X+'4"'];

    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: sG1, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: sG2, rows: redRows, ft: ft, lk: lk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: sG3, rows: redRows, ft: ft, lk: lk });

    html += formFooter('BOX (B): _0_  BOX (S): _0_  ITEM: _0_  TOTAL WT: _0_', '3 of 7');
    html += '</div>'; // end page
    return html;
  }

  // ─── 8. FORM 4: SWR & COMMON SWR FITTINGS (Portrait) ───────────────────

  function generateSWRForm(order, allSWRItems, ckItems, sfItems, swItems) {
    var ft = 'mm';
    var ckLk = buildLookup(ckItems, ft);
    var sfLk = buildLookup(sfItems, ft);
    var swLk = buildLookup(swItems, ft);
    var allLk = buildLookup(allSWRItems, ft);

    var html = '<div class="of-page of-port">';
    html += formHeader('', 'SWR & COMMON SWR FITTINGS', order, { lorryNo: true });

    // Standard SWR rows (shared template for Clickfit & Selfit)
    var swrCols = ['75', '90', '110', '160'];
    function swrFitRows(prefix) {
      var p = prefix ? prefix + ' ' : '';
      return [
        { label: 'BEND 87.5\u00B0', patterns: [p+'Bend 87.5', p+'Bend 87.5\u00B0', 'Bend 87.5', 'Bend 87.5\u00B0'] },
        { label: 'DOOR BEND 87.5\u00B0', patterns: [p+'Door Bend 87.5', p+'Door Bend 87.5\u00B0', 'Door Bend 87.5', 'Door Bend 87.5\u00B0'] },
        { label: 'SINGLE TEE', patterns: [p+'Tee', p+'Single Tee', 'Tee', 'Single Tee'] },
        { label: 'DOOR TEE', patterns: [p+'Door Tee', 'Door Tee'] },
        { label: 'BEND 45\u00B0', patterns: [p+'Bend 45', p+'Bend 45\u00B0', 'Bend 45', 'Bend 45\u00B0'] },
        { label: 'COUPLER', patterns: [p+'Coupler', 'Coupler'] },
        { label: 'END CAP', patterns: [p+'End Cap', 'End Cap', p+'SelFit End Cap', 'SelFit End Cap'] },
        { label: 'SINGLE Y', patterns: [p+'Single Y', p+'Y', 'Single Y', 'Y'] },
        { label: 'DOOR Y', patterns: [p+'Door Y', 'Door Y'] },
        { label: 'CROSS TEE', patterns: [p+'Cross Tee', 'Cross Tee'] },
        { label: 'CLEANSING PIPE', patterns: [p+'Cleansing Pipe', 'Cleansing Pipe'] },
        { label: 'DOUBLE Y', patterns: [p+'Double Y', 'Double Y'] },
        { label: 'DOOR DOUBLE Y', patterns: [p+'Door Double Y', 'Door Double Y'] },
        { label: 'SWEPT TEE', patterns: [p+'Swept Tee', 'Swept Tee'] },
        { label: 'DOOR SWEPT TEE', patterns: [p+'Door Swept Tee', 'Door Swept Tee'] }
      ];
    }
    var swrRedCols = ['110'+X+'63', '110'+X+'75', '110'+X+'90', '160'+X+'110'];
    function swrRedRows(prefix) {
      var p = prefix ? prefix + ' ' : '';
      return [
        { label: 'REDUCER', patterns: [p+'Reducer', 'Reducer'] },
        { label: 'REDUCING TEE', patterns: [p+'Reducing Tee', 'Reducing Tee', 'Reducer Tee'] },
        { label: 'DOOR RED TEE', patterns: [p+'Door Reducing Tee', 'Door Red Tee', 'Door Reducer Tee'] },
        { label: 'REDUCING Y', patterns: [p+'Reducing Y', 'Reducing Y', 'Reducer Y'] },
        { label: 'DOOR RED Y', patterns: [p+'Door Reducing Y', 'Door Red Y', 'Door Reducer Y'] }
      ];
    }

    // Top row: Clickfit (left) and Selfit (right) side by side
    html += '<div class="of-row">';

    // CLICKFIT SWR
    html += '<div class="of-col">';
    html += secTitle('WATERFLO CLICKFIT SWR FITTINGS');
    html += renderGrid({ hdrLabel: 'FITTING SIZE', cols: swrCols, rows: swrFitRows('ClickFit'), ft: ft, lk: ckLk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: swrRedCols, rows: swrRedRows('ClickFit'), ft: ft, lk: ckLk });
    html += '</div>';

    // SELFIT SWR
    html += '<div class="of-col">';
    html += secTitle('WATERFLO SELFIT SWR FITTINGS');
    html += renderGrid({ hdrLabel: 'FITTING SIZE', cols: swrCols, rows: swrFitRows('SelFit'), ft: ft, lk: sfLk });
    html += renderGrid({ hdrLabel: 'RED. SIZE', cols: swrRedCols, rows: swrRedRows('SelFit'), ft: ft, lk: sfLk });
    html += '</div>';

    html += '</div>';

    // Middle row: LW SWR (left) and SFT-LW (right) side by side
    html += '<div class="of-row">';

    // LW SWR (Clickfit Ring)
    html += '<div class="of-col">';
    html += secTitle('WATERFLO LW SWR FITTINGS (Clickfit Ring)');
    var lwCols = ['75', '110'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: lwCols, ft: ft, lk: swLk,
      rows: [
        { label: 'BEND 87.5\u00B0', patterns: ['LW Bend 87.5', 'LW Bend 87.5\u00B0', 'Bend 87.5'] },
        { label: 'DOOR BEND 87.5\u00B0', patterns: ['LW Door Bend 87.5', 'LW Door Bend 87.5\u00B0', 'Door Bend 87.5'] },
        { label: 'SINGLE TEE', patterns: ['LW Tee', 'LW Single Tee', 'Tee', 'Single Tee'] },
        { label: 'DOOR TEE', patterns: ['LW Door Tee', 'Door Tee'] },
        { label: 'BEND 45\u00B0', patterns: ['LW Bend 45', 'LW Bend 45\u00B0', 'Bend 45'] },
        { label: 'SINGLE Y', patterns: ['LW Single Y', 'LW Y', 'Single Y'] },
        { label: 'DOOR Y', patterns: ['LW Door Y', 'Door Y'] },
        { label: 'COUPLER', patterns: ['LW Coupler', 'Coupler'] }
      ]
    });
    html += '</div>';

    // SFT-LW SWR
    html += '<div class="of-col">';
    html += secTitle('WATERFLO SFT-LW SWR FITTINGS');
    var sftLwCols = ['75', '110', '90', '160'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: sftLwCols, ft: ft, lk: sfLk,
      rows: [
        { label: 'BEND 45\u00B0', patterns: ['SelFit Bend 45', 'Bend 45', 'Bend 45\u00B0'] },
        { label: 'BEND 87.5\u00B0', patterns: ['SelFit Bend 87.5', 'Bend 87.5', 'Bend 87.5\u00B0'] },
        { label: 'DOOR BEND 87.5\u00B0', patterns: ['SelFit Door Bend 87.5', 'Door Bend 87.5', 'Door Bend 87.5\u00B0'] },
        { label: 'SINGLE TEE', patterns: ['SelFit Tee', 'Tee', 'Single Tee'] },
        { label: 'DOOR TEE', patterns: ['SelFit Door Tee', 'Door Tee'] },
        { label: 'DOOR CAP', patterns: ['SelFit Door Cap', 'Door Cap'] },
        { label: 'CLICKFIT RING', patterns: ['ClickFit Ring', 'Clickfit Ring'] }
      ]
    });
    html += '</div>';

    html += '</div>';

    // ── COMMON SWR FITTINGS ──
    html += secTitle('COMMON SWR FITTINGS');
    html += '<div class="of-row">';

    // Left column
    html += '<div class="of-col">';
    var comCols1 = ['110'+X+'75', '110'+X+'90', '110'+X+'110', '125'+X+'110'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: comCols1, ft: ft, lk: allLk,
      rows: [
        { label: 'NAHNI TRAP (ISI) (One Piece)', patterns: ['Nahni Trap ISI', 'Nahni Trap (ISI)', 'Nahni Trap One Piece'] },
        { label: 'P TRAP (LONG 45)', patterns: ['P Trap Long 45', 'P Trap (Long 45)'] },
        { label: 'P TRAP (LW 45\u00B0)', patterns: ['P Trap LW 45', 'P Trap (LW 45)'] },
        { label: 'P TRAP (Short)', patterns: ['P Trap Short', 'P Trap (Short)'] },
        { label: 'P TRAP (Flat)', patterns: ['P Trap Flat', 'P Trap (Flat)'] },
        { label: 'S TRAP', patterns: ['S Trap'] },
        { label: 'Q TRAP', patterns: ['Q Trap'] },
        { label: 'RED BUSH', patterns: ['Red Bush', 'Reducer Bush'] }
      ]
    });
    var comCols1b = ['110'+X+'63', '110'+X+'75', '110'+X+'90', '110'+X+'110'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: comCols1b, ft: ft, lk: allLk,
      rows: [
        { label: 'NAHNI TRAP (LW)', patterns: ['Nahni Trap LW', 'Nahni Trap (LW)'] }
      ]
    });
    html += '</div>';

    // Right column
    html += '<div class="of-col">';
    var comCols2 = ['50', '63', '75', '90', '110', '160'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: comCols2, ft: ft, lk: allLk,
      rows: [
        { label: 'COWL', patterns: ['Cowl'] },
        { label: 'PIPE CLIP', patterns: ['Pipe Clip'] },
        { label: 'SOCKET PLUG', patterns: ['Socket Plug'] },
        { label: 'BACKFLOW VALVE', patterns: ['Backflow Valve'] }
      ]
    });
    var comCols3 = ['110'];
    html += renderGrid({
      hdrLabel: 'FITTING SIZE', cols: comCols3, ft: ft, lk: allLk,
      rows: [
        { label: 'FLOOR TRAP', patterns: ['Floor Trap'] },
        { label: 'FLOOR TRAP (Cap Type)', patterns: ['Floor Trap Cap Type', 'Floor Trap (Cap Type)'] },
        { label: 'FLOOR TRAP (Square Jally)', patterns: ['Floor Trap Square Jally', 'Floor Trap (Square Jally)'] },
        { label: 'FLOOR TRAP(7Ht Cap Type)', patterns: ['Floor Trap 7Ht Cap Type', 'Floor Trap (7Ht Cap Type)'] },
        { label: 'GULLY TRAP (Square Jally)', patterns: ['Gully Trap Square Jally', 'Gully Trap (Square Jally)'] }
      ]
    });
    html += renderGrid({
      hdrLabel: '', cols: comCols3, ft: ft, lk: allLk,
      rows: [
        { label: 'EXTENSION', patterns: ['Extension'] },
        { label: 'W C CONN.', patterns: ['WC Conn', 'W C Conn', 'WC Connection'] },
        { label: 'HEIGHT RISER', patterns: ['Height Riser'] },
        { label: 'JALI', patterns: ['Jali'] }
      ]
    });
    html += '</div>';

    html += '</div>'; // end common row

    // ── SOLVENT section ──
    html += secTitle('SOLVENT');

    // CPVC solvent
    var solCpvc = ['15 ml', '29 ml', '59 ml (Tube)', '118 ml', '237 ml', '473 ml', '946 ml', '59 ml (Tin)'];
    html += renderGrid({
      hdrLabel: 'CPVC', cols: solCpvc, ft: ft, lk: allLk,
      rows: [{ label: 'CPVC', patterns: ['Solvent Cement CPVC', 'CPVC Solvent', 'Solvent Cement'] }]
    });

    // uPVC HD + MD side by side
    var solUpvc = ['20 ml', '50 ml', '59 ml', '118 ml', '237 ml', '473 ml', '946 ml'];
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    html += renderGrid({
      hdrLabel: 'uPVC HD', cols: solUpvc, ft: ft, lk: allLk,
      rows: [{ label: 'uPVC HD', patterns: ['Solvent Cement uPVC HD', 'uPVC HD Solvent', 'Solvent uPVC HD'] }]
    });
    html += '</div>';
    html += '<div class="of-col">';
    html += renderGrid({
      hdrLabel: 'MD', cols: solUpvc, ft: ft, lk: allLk,
      rows: [{ label: 'uPVC MD', patterns: ['Solvent Cement uPVC MD', 'uPVC MD Solvent', 'Solvent uPVC MD'] }]
    });
    html += '</div>';
    html += '</div>';

    // Agri MASTAR + Lubricant
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var solAgri = ['25 ml', '50 ml', '100 ml', '250 ml', '500 ml', '1 ltr', '5 ltr'];
    html += renderGrid({
      hdrLabel: 'Agri MASTAR', cols: solAgri, ft: ft, lk: allLk,
      rows: [{ label: 'Agri MASTAR', patterns: ['Solvent Cement Agri', 'Agri Solvent', 'Solvent Agri Master'] }]
    });
    html += '</div>';
    html += '<div class="of-col">';
    var solLub = ['50 gm', '100 gm', '250 gm', '500 gm'];
    html += renderGrid({
      hdrLabel: 'Lubricant', cols: solLub, ft: ft, lk: allLk,
      rows: [{ label: 'LUBRICANT', patterns: ['Lubricant'] }]
    });
    html += '</div>';
    html += '</div>';

    html += formFooter('S: _0_  B: _0_  ITEM: _0_  TOTAL WT: _0_', '4 OF 7');
    html += '</div>'; // end page
    return html;
  }

  // ─── 9. FORM 5: Pipes Page 1 (Portrait) ────────────────────────────────

  function generatePipesPage1(order, pipeItems) {
    var ft = 'mm';
    var lk = buildLookup(pipeItems, ft);

    var html = '<div class="of-page of-port">';
    html += formHeader('', 'PIPE ORDER FORM', order, { lorryNo: true });

    // ── Top section: AGRI PIPE / FAB. COUPLER / FAB. BEND side by side ──
    html += '<div class="of-row">';

    // AGRI PIPE
    html += '<div class="of-col" style="flex:1.2">';
    html += secTitle('AGRI PIPE');
    var agriSizes = ['20','25','32','40','50','63','75','90','110','125','140','160','180','200'];
    var agriCols = [
      { header: '2.5 KG', patterns: ['Agri Pipe 2.5KG', 'Agri Pipe 2.5 KG', 'Agriculture Pipe 2.5KG', 'Agri Pipe'] },
      { header: '4 KG', patterns: ['Agri Pipe 4KG', 'Agri Pipe 4 KG', 'Agriculture Pipe 4KG'] },
      { header: '6 KG', patterns: ['Agri Pipe 6KG', 'Agri Pipe 6 KG', 'Agriculture Pipe 6KG'] },
      { header: '8 KG', patterns: ['Agri Pipe 8KG', 'Agri Pipe 8 KG', 'Agriculture Pipe 8KG'] },
      { header: '10 KG', patterns: ['Agri Pipe 10KG', 'Agri Pipe 10 KG', 'Agriculture Pipe 10KG'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: agriSizes, colDefs: agriCols, ft: ft, lk: lk });
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    // FAB. COUPLER (BAG)
    html += '<div class="of-col">';
    html += secTitle('FAB. COUPLER (BAG)');
    var fabCSizes = ['20','25','32','40','50','63','75','90','110','140','160','180','200'];
    var fabCCols = [
      { header: '4 KG', patterns: ['Fab Coupler 4KG', 'Fab. Coupler 4KG', 'FAB. COUPLER 4KG', 'Fabricated Coupler 4KG'] },
      { header: '6 KG', patterns: ['Fab Coupler 6KG', 'Fab. Coupler 6KG', 'FAB. COUPLER 6KG', 'Fabricated Coupler 6KG'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: fabCSizes, colDefs: fabCCols, ft: ft, lk: lk });
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    // FAB. BEND (BAG)
    html += '<div class="of-col">';
    html += secTitle('FAB. BEND (BAG)');
    var fabBSizes = ['20','25','32','40','50','63','75','90','110','140','160','180','200'];
    var fabBCols = [
      { header: '4 KG', patterns: ['Fab Bend 4KG', 'Fab. Bend 4KG', 'FAB. BEND 4KG', 'Fabricated Bend 4KG'] },
      { header: '6 KG', patterns: ['Fab Bend 6KG', 'Fab. Bend 6KG', 'FAB. BEND 6KG', 'Fabricated Bend 6KG'] },
      { header: '10 KG', patterns: ['Fab Bend 10KG', 'Fab. Bend 10KG', 'FAB. BEND 10KG', 'Fabricated Bend 10KG'] },
      { header: '15 KG', patterns: ['Fab Bend 15KG', 'Fab. Bend 15KG', 'FAB. BEND 15KG', 'Fabricated Bend 15KG'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: fabBSizes, colDefs: fabBCols, ft: ft, lk: lk });
    html += '</div>';

    html += '</div>'; // end top row

    // ── Middle section: GREY PLUMBING / CASING PIPE / UGD ──
    html += '<div class="of-row">';

    // GREY PLUMBING
    html += '<div class="of-col">';
    html += secTitle('GREY PLUMBING');
    var greySizes = ['20','25','32','40','50'];
    var greyCols = [
      { header: '6 MTR', patterns: ['Grey Plumbing Pipe 6MTR', 'Grey Plumbing Pipe 6 MTR', 'Grey Plumbing Pipe 6mtr', 'Plumbing Pipe 6mtr'] },
      { header: '3 MTR', patterns: ['Grey Plumbing Pipe 3MTR', 'Grey Plumbing Pipe 3 MTR', 'Grey Plumbing Pipe 3mtr', 'Plumbing Pipe 3mtr'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: greySizes, colDefs: greyCols, ft: ft, lk: lk });
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    // CASING PIPE BLUE
    html += '<div class="of-col">';
    html += secTitle('CASING PIPE BLUE');
    var casingSizes = ['110','140','160','180','200'];
    var casingCols = [
      { header: 'SDR 52', patterns: ['Casing Pipe SDR 52', 'Casing Pipe Blue SDR 52', 'Casing Pipe SDR52'] },
      { header: 'SDR 35', patterns: ['Casing Pipe SDR 35', 'Casing Pipe Blue SDR 35', 'Casing Pipe SDR35'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: casingSizes, colDefs: casingCols, ft: ft, lk: lk });
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    // UGD PIPE
    html += '<div class="of-col">';
    html += secTitle('UGD PIPE');
    // UGD 3 MTR
    html += '<div class="of-sub">UGD 3 MTR</div>';
    var ugd3Sizes = ['110','140','160'];
    var ugd3Cols = [
      { header: 'SN 2', patterns: ['UGD Pipe SN 2 3MTR', 'UGD Pipe SN 2 3mtr', 'UGD Pipe SN2 3MTR'] },
      { header: 'SN 4', patterns: ['UGD Pipe SN 4 3MTR', 'UGD Pipe SN 4 3mtr', 'UGD Pipe SN4 3MTR'] },
      { header: 'SN 8', patterns: ['UGD Pipe SN 8 3MTR', 'UGD Pipe SN 8 3mtr', 'UGD Pipe SN8 3MTR'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: ugd3Sizes, colDefs: ugd3Cols, ft: ft, lk: lk });
    // UGD 6 MTR
    html += '<div class="of-sub">UGD 6 MTR</div>';
    var ugd6Sizes = ['200'];
    var ugd6Cols = [
      { header: 'SN 2', patterns: ['UGD Pipe SN 2 6MTR', 'UGD Pipe SN 2 6mtr', 'UGD Pipe SN2 6MTR'] },
      { header: 'SN 4', patterns: ['UGD Pipe SN 4 6MTR', 'UGD Pipe SN 4 6mtr', 'UGD Pipe SN4 6MTR'] },
      { header: 'SN 8', patterns: ['UGD Pipe SN 8 6MTR', 'UGD Pipe SN 8 6mtr', 'UGD Pipe SN8 6MTR'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: ugd6Sizes, colDefs: ugd6Cols, ft: ft, lk: lk });
    html += '</div>';

    html += '</div>'; // end middle row

    // ── SWR PIPE (3 MTR) section ──
    html += secTitle('SWR PIPE (3 MTR)');

    // Build complex SWR pipe table with multi-level header
    html += '<table class="of-tbl">';
    // Packing header row
    html += '<tr class="of-hdr">';
    html += '<th class="of-lbl" rowspan="2">SIZE</th>';
    html += '<th colspan="2">TYPE A</th>';
    html += '<th>2.5 KG</th>';
    html += '<th colspan="2">TYPE B</th>';
    html += '</tr>';
    // Sub-header row
    html += '<tr class="of-hdr">';
    html += '<th>CLICKFIT</th><th>SELF FIT</th>';
    html += '<th>RF/2.5 | SF/2.5</th>';
    html += '<th>CLICKFIT</th><th>SELF FIT</th>';
    html += '</tr>';

    var swrSizes = ['75/110', '110', '40', '50', '63', '75', '90', '110', '140', '160', '200', '75/90/110'];
    var swrColPatterns = [
      // TYPE A CLICKFIT
      ['ClickFit SWR Pipe Type A 3mtr', 'SWR Pipe Type A Clickfit 3mtr', 'ClickFit SWR Pipe Type A'],
      // TYPE A SELF FIT
      ['SelFit SWR Pipe Type A 3mtr', 'SWR Pipe Type A Selfit 3mtr', 'SelFit SWR Pipe Type A'],
      // 2.5 KG RF/SF
      ['SWR Pipe 2.5KG 3mtr', 'SWR Pipe 2.5 KG 3mtr', 'SWR Pipe RF/2.5 3mtr', 'SWR Pipe SF/2.5 3mtr'],
      // TYPE B CLICKFIT
      ['ClickFit SWR Pipe Type B 3mtr', 'SWR Pipe Type B Clickfit 3mtr', 'ClickFit SWR Pipe Type B'],
      // TYPE B SELF FIT
      ['SelFit SWR Pipe Type B 3mtr', 'SWR Pipe Type B Selfit 3mtr', 'SelFit SWR Pipe Type B']
    ];

    for (var swi = 0; swi < swrSizes.length; swi++) {
      html += '<tr><td class="of-lbl">' + esc(swrSizes[swi]) + '</td>';
      for (var swc = 0; swc < swrColPatterns.length; swc++) {
        var swCell = lookupCell(swrColPatterns[swc], swrSizes[swi], ft, lk);
        html += swCell.matched ? '<td class="of-fill">' + esc(swCell.text) + '</td>' : '<td></td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    html += discountLine('DISCOUNT CLICK FIT :-  /  DISCOUNT SELF FIT:-');

    // ── SWR PIPE (SF) 6 Mtr section (right side) ──
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    html += secTitle('SWR PIPE (SF)');
    var swrSfSizes = ['40','50','63','75','90','110','140','160','200'];
    var swrSfCols = [
      { header: 'TYPE A (6 Mtr.)', patterns: ['SWR Pipe Type A SF 6mtr', 'SelFit SWR Pipe Type A 6mtr', 'SWR Pipe Type A 6mtr'] },
      { header: '2.5 KG (6 Mtr.)', patterns: ['SWR Pipe 2.5KG 6mtr', 'SWR Pipe 2.5 KG 6mtr'] },
      { header: 'TYPE B (6 Mtr.)', patterns: ['SWR Pipe Type B SF 6mtr', 'SelFit SWR Pipe Type B 6mtr', 'SWR Pipe Type B 6mtr'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: swrSfSizes, colDefs: swrSfCols, ft: ft, lk: lk });
    html += '</div>';

    // D/S table
    html += '<div class="of-col">';
    html += secTitle('D/S');
    var dsSizes = ['D/S 2 FEET', 'D/S 3 FEET', 'D/S 4 FEET', 'D/S 6 FEET', 'D/S 3 MTR'];
    var dsCols = ['75/110', '75', '110'];
    html += '<table class="of-tbl">';
    html += '<tr class="of-hdr"><th class="of-lbl"></th>';
    for (var dc = 0; dc < dsCols.length; dc++) {
      html += '<th>' + esc(dsCols[dc]) + '</th>';
    }
    html += '</tr>';
    for (var ds = 0; ds < dsSizes.length; ds++) {
      html += '<tr><td class="of-lbl">' + esc(dsSizes[ds]) + '</td>';
      for (var dc2 = 0; dc2 < dsCols.length; dc2++) {
        var dsCell = lookupCell([dsSizes[ds]], dsCols[dc2], ft, lk);
        html += dsCell.matched ? '<td class="of-fill">' + esc(dsCell.text) + '</td>' : '<td></td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    html += '</div>';

    html += '</div>';

    html += formFooter('BUNDLE: ___  LOOSE PIPE: ___  BAG: ___  TRANSPORT: ___  LR. NO.: ___  VEHICLE NO.: ___  DRIVER NO.: ___', '');
    html += '<div class="of-foot"><span>PARTY NAME: ___</span><span>DATE: ___</span></div>';
    html += '</div>'; // end page
    return html;
  }

  // ─── 10. FORM 6: Pipes Page 2 (Portrait) ───────────────────────────────

  function generatePipesPage2(order, pipeItems) {
    var ft = 'inch';
    var lk = buildLookup(pipeItems, ft);

    var html = '<div class="of-page of-port">';
    html += formHeader('', 'PIPE ORDER FORM (Page 2)', order, {});

    var inchSizes6 = ['\u00BD"', '\u00BE"', '1"', '1\u00BC"', '1\u00BD"', '2"'];
    var inchSizes10 = ['\u00BD"', '\u00BE"', '1"', '1\u00BC"', '1\u00BD"', '2"', '2\u00BD"', '3"', '4"', '6"'];

    // ── Top: REGULAR SCH-40 / SCH-80 (left) + PLUMLITE (right) ──
    html += '<div class="of-row">';

    // REGULAR
    html += '<div class="of-col" style="flex:1.5">';
    html += secTitle('REGULAR');
    html += '<table class="of-tbl">';
    html += '<tr class="of-hdr">';
    html += '<th class="of-lbl" rowspan="2">SIZE</th>';
    html += '<th colspan="2">SCH - 40</th>';
    html += '<th colspan="2">SCH - 80</th>';
    html += '</tr>';
    html += '<tr class="of-hdr"><th>3 MTR</th><th>6 MTR</th><th>3 MTR</th><th>6 MTR</th></tr>';

    var regColPat = [
      ['Regular Pipe SCH 40 3MTR', 'uPVC Pipe SCH 40 3MTR', 'uPVC Pipe SCH-40 3MTR', 'Regular Pipe SCH-40 3mtr'],
      ['Regular Pipe SCH 40 6MTR', 'uPVC Pipe SCH 40 6MTR', 'uPVC Pipe SCH-40 6MTR', 'Regular Pipe SCH-40 6mtr'],
      ['Regular Pipe SCH 80 3MTR', 'uPVC Pipe SCH 80 3MTR', 'uPVC Pipe SCH-80 3MTR', 'Regular Pipe SCH-80 3mtr'],
      ['Regular Pipe SCH 80 6MTR', 'uPVC Pipe SCH 80 6MTR', 'uPVC Pipe SCH-80 6MTR', 'Regular Pipe SCH-80 6mtr']
    ];
    for (var ri = 0; ri < inchSizes10.length; ri++) {
      html += '<tr><td class="of-lbl">' + esc(inchSizes10[ri]) + '</td>';
      for (var rc = 0; rc < regColPat.length; rc++) {
        var rCell = lookupCell(regColPat[rc], inchSizes10[ri], ft, lk);
        html += rCell.matched ? '<td class="of-fill">' + esc(rCell.text) + '</td>' : '<td></td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    // PLUMLITE SCH-40
    html += '<div class="of-col">';
    html += secTitle('PLUMLITE SCH - 40');
    var plumCols = [
      { header: '3 MTR', patterns: ['Plumlite Pipe SCH 40 3MTR', 'Plumlite Pipe SCH-40 3MTR', 'Plumlite Pipe 3mtr'] },
      { header: '6 MTR', patterns: ['Plumlite Pipe SCH 40 6MTR', 'Plumlite Pipe SCH-40 6MTR', 'Plumlite Pipe 6mtr'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: inchSizes6, colDefs: plumCols, ft: ft, lk: lk });
    html += '</div>';

    html += '</div>'; // end top row

    // ── Middle: SUREFIT SCH-40/SCH-80 (left) + UPVC BEND (right) ──
    html += '<div class="of-row">';

    // SUREFIT
    html += '<div class="of-col" style="flex:1.5">';
    html += secTitle('SUREFIT');
    html += '<table class="of-tbl">';
    html += '<tr class="of-hdr">';
    html += '<th class="of-lbl" rowspan="2">SIZE</th>';
    html += '<th colspan="2">SCH - 40</th>';
    html += '<th colspan="2">SCH - 80</th>';
    html += '</tr>';
    html += '<tr class="of-hdr"><th>3 MTR</th><th>6 MTR</th><th>3 MTR</th><th>6 MTR</th></tr>';

    var sfColPat = [
      ['Surefit Pipe SCH 40 3MTR', 'Surefit Pipe SCH-40 3MTR', 'Surefit uPVC Pipe SCH 40 3mtr'],
      ['Surefit Pipe SCH 40 6MTR', 'Surefit Pipe SCH-40 6MTR', 'Surefit uPVC Pipe SCH 40 6mtr'],
      ['Surefit Pipe SCH 80 3MTR', 'Surefit Pipe SCH-80 3MTR', 'Surefit uPVC Pipe SCH 80 3mtr'],
      ['Surefit Pipe SCH 80 6MTR', 'Surefit Pipe SCH-80 6MTR', 'Surefit uPVC Pipe SCH 80 6mtr']
    ];
    for (var si = 0; si < inchSizes6.length; si++) {
      html += '<tr><td class="of-lbl">' + esc(inchSizes6[si]) + '</td>';
      for (var sc = 0; sc < sfColPat.length; sc++) {
        var sCell = lookupCell(sfColPat[sc], inchSizes6[si], ft, lk);
        html += sCell.matched ? '<td class="of-fill">' + esc(sCell.text) + '</td>' : '<td></td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    // UPVC BEND
    html += '<div class="of-col">';
    html += secTitle('UPVC BEND');
    var bendCols = [
      { header: '90\u00B0 BEND', patterns: ['uPVC Bend 90', 'uPVC Bend', 'UPVC Bend', 'uPVC Bend 90\u00B0'] }
    ];
    html += renderPipeGrid({ hdrLabel: 'SIZE', sizes: inchSizes6, colDefs: bendCols, ft: ft, lk: lk });
    html += discountLine('DISCOUNT :-');
    html += '</div>';

    html += '</div>'; // end middle row

    // ── COLUMN PIPES table ──
    html += secTitle('COLUMN PIPES');
    var colGrades = ['ECO', 'EASY', 'MED', 'ULTRA', 'STD', 'HEAVY', 'S.HEAVY', 'HEAVY PLUS'];
    var colSizes = [
      { label: '1" 25mm', key: '1"' },
      { label: '1\u00BC" 32mm', key: '1\u00BC"' },
      { label: '1\u00BD" 40mm', key: '1\u00BD"' },
      { label: '2" 50mm', key: '2"' },
      { label: '2\u00BC" 60mm', key: '2\u00BC"' },
      { label: '2\u00BD" 65mm', key: '2\u00BD"' },
      { label: '3" 80mm', key: '3"' },
      { label: '4" 100mm', key: '4"' },
      { label: '5" 125mm', key: '5"' },
      { label: '6" 150mm', key: '6"' }
    ];

    // Availability matrix: # means available (varies by grade/size)
    // We show empty cells for all — actual availability is data-dependent
    html += '<table class="of-tbl">';
    html += '<tr class="of-hdr"><th class="of-lbl">SIZE</th>';
    for (var cg = 0; cg < colGrades.length; cg++) {
      html += '<th>' + esc(colGrades[cg]) + '</th>';
    }
    html += '</tr>';
    for (var csi = 0; csi < colSizes.length; csi++) {
      html += '<tr><td class="of-lbl">' + esc(colSizes[csi].label) + '</td>';
      for (var cgi = 0; cgi < colGrades.length; cgi++) {
        var colCell = lookupCell(
          ['Column Pipe ' + colGrades[cgi], 'Boreline Pipe ' + colGrades[cgi], 'Boreline ' + colGrades[cgi], 'Column Pipe Series ' + colGrades[cgi]],
          colSizes[csi].key, ft, lk
        );
        html += colCell.matched ? '<td class="of-fill">' + esc(colCell.text) + '</td>' : '<td></td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    html += discountLine('DISCOUNT :-');

    // Bell types
    html += '<div class="of-row">';
    html += '<div class="of-col">';
    var bellSizes = ['1" 25mm', '1\u00BC" 32mm', '1\u00BD" 40mm'];
    var bellKeys = ['1"', '1\u00BC"', '1\u00BD"'];
    html += '<table class="of-tbl">';
    html += '<tr class="of-hdr"><th class="of-lbl">SIZE</th><th>ECO (BELL)</th><th>EASY (BELL)</th></tr>';
    for (var bi = 0; bi < bellSizes.length; bi++) {
      var bellEco = lookupCell(['Column Pipe ECO Bell', 'Boreline Pipe ECO Bell', 'Boreline ECO Bell'], bellKeys[bi], ft, lk);
      var bellEasy = lookupCell(['Column Pipe EASY Bell', 'Boreline Pipe EASY Bell', 'Boreline EASY Bell'], bellKeys[bi], ft, lk);
      html += '<tr><td class="of-lbl">' + esc(bellSizes[bi]) + '</td>';
      html += bellEco.matched ? '<td class="of-fill">' + esc(bellEco.text) + '</td>' : '<td></td>';
      html += bellEasy.matched ? '<td class="of-fill">' + esc(bellEasy.text) + '</td>' : '<td></td>';
      html += '</tr>';
    }
    html += '</table>';
    html += '</div>';
    html += '</div>';

    html += formFooter('COLUMN BDL: _0_  BUNDLE 3 MTR: _0_  BUNDLE 6 MTR: _0_  BAG: _0_', '');
    html += '<div class="of-foot">';
    html += '<span>PARTY NAME: ___</span><span>ORDER DATE: ___</span>';
    html += '</div>';
    html += '<div class="of-foot">';
    html += '<span>PREPARED BY: ___</span><span>DISPATCH BY: ___</span>';
    html += '<span>CHECKED BY: ___</span><span>BILLING BY: ___</span>';
    html += '</div>';

    html += '</div>'; // end page
    return html;
  }

  // ─── 11. MAIN ORCHESTRATOR ──────────────────────────────────────────────

  window.generateOrderFormPages = function(order, items) {
    // Step 1: Route items to brands by code prefix
    var brandGroups = {};
    for (var i = 0; i < items.length; i++) {
      var brand = getItemBrand(items[i]);
      if (!brand) brand = '__unknown__';
      if (!brandGroups[brand]) brandGroups[brand] = [];
      brandGroups[brand].push(items[i]);
    }

    // Step 2: Separate fittings vs pipes
    var brandFittings = {};
    var allPipes = [];
    for (var b in brandGroups) {
      if (!brandGroups.hasOwnProperty(b)) continue;
      var bItems = brandGroups[b];
      brandFittings[b] = [];
      for (var j = 0; j < bItems.length; j++) {
        if (isPipeItem(bItems[j])) {
          allPipes.push(bItems[j]);
        } else {
          brandFittings[b].push(bItems[j]);
        }
      }
    }

    // Step 3: Determine which forms to generate
    var hasBrand = function(b) { return brandGroups[b] && brandGroups[b].length > 0; };
    var pages = [];

    // Form 1: CPVC (StrongFit) — includes both fittings and CPVC pipes on same form
    var cpvcFittings = brandFittings['strongfit-cpvc'] || [];
    var cpvcPipes = [];
    for (var pi = 0; pi < allPipes.length; pi++) {
      if (getItemBrand(allPipes[pi]) === 'strongfit-cpvc') cpvcPipes.push(allPipes[pi]);
    }
    if (cpvcFittings.length > 0 || cpvcPipes.length > 0) {
      pages.push(generateCPVCForm(order, cpvcFittings.concat(cpvcPipes)));
    }

    // Form 2: AgriMaster
    if (brandFittings['agrimaster'] && brandFittings['agrimaster'].length > 0) {
      pages.push(generateAgriMasterForm(order, brandFittings['agrimaster']));
    }

    // Form 3: Surefit uPVC
    if (brandFittings['surefit-upvc'] && brandFittings['surefit-upvc'].length > 0) {
      pages.push(generateSurefitForm(order, brandFittings['surefit-upvc']));
    }

    // Form 4: SWR (shared by clickfit, selfit, upvc-swr) + solvent/common
    var ckFit = brandFittings['clickfit-swr'] || [];
    var sfFit = brandFittings['selfit'] || [];
    var swFit = brandFittings['upvc-swr'] || [];
    var allSWR = ckFit.concat(sfFit).concat(swFit);
    if (allSWR.length > 0) {
      pages.push(generateSWRForm(order, allSWR, ckFit, sfFit, swFit));
    }

    // Form 5: Pipes Page 1 (mm-based: agri, swr, ugd, grey plumbing, casing, fab)
    var mmPipes = [];
    for (var p1 = 0; p1 < allPipes.length; p1++) {
      var pBrand = getItemBrand(allPipes[p1]);
      if (pBrand !== 'surefit-upvc' && pBrand !== 'strongfit-cpvc' && pBrand !== 'boreline') {
        mmPipes.push(allPipes[p1]);
      }
    }
    if (mmPipes.length > 0) {
      pages.push(generatePipesPage1(order, mmPipes));
    }

    // Form 6: Pipes Page 2 (inch-based: regular/cpvc sch, plumlite, surefit, column/boreline, bends)
    var inchPipes = [];
    for (var p2 = 0; p2 < allPipes.length; p2++) {
      var pBrand2 = getItemBrand(allPipes[p2]);
      if (pBrand2 === 'surefit-upvc' || pBrand2 === 'strongfit-cpvc' || pBrand2 === 'boreline') {
        inchPipes.push(allPipes[p2]);
      }
    }
    if (inchPipes.length > 0) {
      pages.push(generatePipesPage2(order, inchPipes));
    }

    // Unknown brand items
    if (brandFittings['__unknown__'] && brandFittings['__unknown__'].length > 0) {
      var unkHtml = '<div class="of-page of-port">';
      unkHtml += formHeader('WATERFLO', 'UNMATCHED ITEMS', order, {});
      unkHtml += '<table class="of-tbl">';
      unkHtml += '<tr class="of-hdr"><th>CODE</th><th>NAME</th><th>SIZE</th><th>QTY</th></tr>';
      var unk = brandFittings['__unknown__'];
      for (var uk = 0; uk < unk.length; uk++) {
        unkHtml += '<tr><td>' + esc(unk[uk].code) + '</td><td>' + esc(unk[uk].name) + '</td>';
        unkHtml += '<td>' + esc(unk[uk].size) + '</td><td class="of-fill">' + esc(fmtQty(unk[uk])) + '</td></tr>';
      }
      unkHtml += '</table></div>';
      pages.push(unkHtml);
    }

    // Step 4: Assemble full HTML document
    var pagesHtml = '';
    for (var pg = 0; pg < pages.length; pg++) {
      if (pg > 0) pagesHtml += '<div class="pg-brk"></div>';
      pagesHtml += pages[pg];
    }

    var doc = '<!DOCTYPE html><html><head><meta charset="utf-8">';
    doc += '<title>Order Form - ' + esc(order.order_no || '') + '</title>';
    doc += '<style>' + getStyles() + '</style>';
    doc += '</head><body>';
    doc += pagesHtml;
    doc += '<script>window.onload = function() { window.print(); };<\/script>';
    doc += '</body></html>';

    return doc;
  };

  // ─── 12. CSS STYLES ─────────────────────────────────────────────────────

  function getStyles() {
    return [
      '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',
      'body { font-family: Arial, Helvetica, sans-serif; font-size: 8px; color: #222; background: #fff; line-height: 1.2; }',

      /* Page setup */
      '@page { margin: 5mm; }',
      '.of-page { padding: 4px; }',
      '.of-land { page: landscape; }',
      '.of-port { page: portrait; }',
      '.pg-brk { page-break-after: always; height: 0; overflow: hidden; }',

      '@media print {',
      '  @page landscape { size: A4 landscape; }',
      '  @page portrait { size: A4 portrait; }',
      '  .of-land { page: landscape; }',
      '  .of-port { page: portrait; }',
      '  .pg-brk { page-break-after: always; }',
      '  .of-fill { background-color: #fffde7 !important; color: #1a237e !important; font-weight: bold !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }',
      '}',

      /* Header */
      '.of-hdr-box { text-align: center; margin-bottom: 4px; border-bottom: 2px solid #333; padding-bottom: 3px; }',
      '.of-hdr-row { display: flex; align-items: center; justify-content: center; gap: 12px; }',
      '.of-hdr-brand { font-size: 13px; font-weight: bold; color: #1a237e; letter-spacing: 1px; }',
      '.of-hdr-title { font-size: 11px; font-weight: bold; }',
      '.of-meta { display: flex; justify-content: space-between; flex-wrap: wrap; margin-top: 3px; font-size: 8px; gap: 6px; }',
      '.of-meta span { white-space: nowrap; }',
      '.of-meta b { border-bottom: 1px solid #666; padding: 0 4px; min-width: 60px; display: inline-block; }',

      /* Layout */
      '.of-row { display: flex; gap: 4px; margin-bottom: 3px; align-items: flex-start; }',
      '.of-col { flex: 1; min-width: 0; }',

      /* Section titles */
      '.of-sec { font-size: 8px; font-weight: bold; background: #e8eaf6; padding: 2px 4px; margin: 3px 0 1px 0; border: 1px solid #999; text-align: center; }',
      '.of-sub { font-size: 7px; font-weight: bold; padding: 1px 3px; margin: 2px 0 1px 0; text-align: center; background: #f5f5f5; border: 1px solid #ccc; }',

      /* Tables */
      '.of-tbl { width: 100%; border-collapse: collapse; margin-bottom: 2px; font-size: 7px; }',
      '.of-tbl th, .of-tbl td { border: 1px solid #888; padding: 1px 2px; text-align: center; vertical-align: middle; }',
      '.of-tbl .of-hdr { background: #e3f2fd; }',
      '.of-tbl .of-hdr th { font-weight: bold; font-size: 6.5px; white-space: nowrap; }',
      '.of-lbl { text-align: left !important; font-weight: bold; font-size: 6.5px; white-space: nowrap; padding-left: 3px !important; min-width: 50px; background: #fafafa; }',
      '.of-na { color: #999; font-size: 6px; }',
      '.of-fill { background-color: #fffde7; color: #1a237e; font-weight: bold; }',

      /* Discount line */
      '.of-disc { font-size: 7px; font-weight: bold; text-align: right; padding: 1px 4px; margin-bottom: 2px; }',

      /* Footer */
      '.of-foot { display: flex; justify-content: space-between; flex-wrap: wrap; font-size: 7px; font-weight: bold; border-top: 1px solid #666; padding: 2px 4px; margin-top: 2px; gap: 8px; }',
      '.of-pg { margin-left: auto; font-style: italic; }',

      /* Screen preview margins */
      '@media screen {',
      '  body { max-width: 297mm; margin: 0 auto; }',
      '  .of-page { border: 1px solid #ccc; margin-bottom: 10px; padding: 8px; background: #fff; }',
      '  .of-fill { background-color: #fffde7; color: #1a237e; font-weight: bold; }',
      '}'
    ].join('\n');
  }

})();
