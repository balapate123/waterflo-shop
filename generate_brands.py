#!/usr/bin/env python3
"""
Generate brand product JS files from PRICE LIST.xls
Reads the Excel price list and generates JS files for each Waterflo brand.
"""

import xlrd
import re
import os

XLS_PATH = 'PRICE LIST.xls'
OUT_DIR = 'js/brands'

# ─── Size Fixing ────────────────────────────────────────────────────────────────
def fix_size(s):
    """Fix garbled Latin-1 fraction characters in size strings."""
    if not s:
        return ''
    result = ''
    for c in s:
        o = ord(c)
        if o == 0xBC: result += '¼'
        elif o == 0xBD: result += '½'
        elif o == 0xBE: result += '¾'
        else: result += c
    return result.strip()

# Map mm to inch size strings
MM_TO_INCH = {
    15: '½"', 20: '¾"', 25: '1"', 32: '1¼"', 40: '1½"', 50: '2"',
    63: '2½"', 65: '2½"', 75: '3"', 80: '3"', 90: '3½"',
    100: '4"', 110: '4"', 125: '5"', 140: '5½"', 150: '6"',
    160: '160mm', 200: '200mm', 250: '250mm', 315: '315mm',
}

def extract_size_mm(code, name='', size_str=''):
    """Try to extract size_mm from product code."""
    # Try to find the numeric part at the end of the code
    m = re.search(r'(\d{2,3})$', code)
    if m:
        val = int(m.group(1))
        if 10 <= val <= 315:
            return val
    # Try from size string
    m = re.search(r'(\d+)\s*mm', size_str)
    if m:
        return int(m.group(1))
    m = re.search(r'(\d+)\s*ml', size_str, re.I)
    if m:
        return 0
    return 0

# ─── Read Excel ─────────────────────────────────────────────────────────────────
def read_sheet(wb, sheet_name):
    """Read a sheet and return list of product dicts."""
    sh = wb.sheet_by_name(sheet_name)
    products = []
    for r in range(5, sh.nrows):  # Skip header rows
        sr = sh.cell_value(r, 0)
        code = str(sh.cell_value(r, 1)).strip()
        name = str(sh.cell_value(r, 2)).strip()
        size = fix_size(str(sh.cell_value(r, 3)).strip())
        hsn = str(sh.cell_value(r, 4)).strip()
        qty_raw = sh.cell_value(r, 5)
        rate_raw = sh.cell_value(r, 7)

        if not name:
            continue
        # For Column Pipes sheet, code may be empty - generate from name+size
        if not code:
            # Generate a code from name + size for Column Pipes
            # Use abbreviation that's unique per series
            name_clean = name.replace("'", '').replace('(', ' ').replace(')', ' ')
            words = name_clean.split()
            # Build code: e.g., "Column ECO BORE" -> "COL_ECO", "Column HEAVY BORE" -> "COL_HEAVY"
            series = ''
            for w in words:
                wl = w.lower()
                if wl in ('column',): continue
                if wl in ('bore', 'ended'): continue
                series += w.upper() + '_'
            series = series.rstrip('_')
            size_str = fix_size(str(sh.cell_value(r, 3)).strip())
            size_num = ''.join(c for c in size_str if c.isdigit())
            code = series + size_num

        qty = int(qty_raw) if isinstance(qty_raw, (int, float)) and qty_raw else 0
        rate = float(rate_raw) if isinstance(rate_raw, (int, float)) and rate_raw else 0

        products.append({
            'code': code,
            'name': name,
            'size': size,
            'hsn': hsn,
            'qty_box': qty,
            'rate': rate,
        })

    # De-duplicate codes by appending suffixes
    code_counts = {}
    for p in products:
        c = p['code']
        code_counts[c] = code_counts.get(c, 0) + 1

    duped_codes = {c for c, cnt in code_counts.items() if cnt > 1}
    if duped_codes:
        seen = {}
        for p in products:
            c = p['code']
            if c in duped_codes:
                idx = seen.get(c, 0)
                seen[c] = idx + 1
                if idx > 0:
                    # Try to disambiguate based on name (e.g., 3mtr vs 6mtr)
                    name_lower = p['name'].lower()
                    if '6 mtr' in name_lower or '6mtr' in name_lower:
                        p['code'] = c + '_6M'
                    elif '5 mtr' in name_lower or '5mtr' in name_lower:
                        p['code'] = c + '_5M'
                    else:
                        p['code'] = c + '_' + str(idx + 1)

    return products

# ─── CPVC → StrongFit ───────────────────────────────────────────────────────────
def categorize_cpvc(p):
    """Assign category/subcategory for CPVC products."""
    code = p['code'].upper()
    name = p['name'].lower()

    # Pipes
    if 'pipe' in name:
        if 'sdr 11' in name and '5 mtr' in name:
            return 'pipes', 'sdr11_5mtr'
        elif 'sdr 11' in name:
            return 'pipes', 'sdr11'
        elif 'sdr 13.5' in name and '5 mtr' in name:
            return 'pipes', 'sdr135_5mtr'
        elif 'sdr 13.5' in name:
            return 'pipes', 'sdr135'
        elif 'sch 40' in name or 'sch-40' in name:
            return 'pipes', 'sch40'
        elif 'sch 80' in name or 'sch-80' in name:
            return 'pipes', 'sch80'
        return 'pipes', 'pipes'

    # Valves
    if 'ball valve' in name and 'handle' not in name:
        return 'valves', 'ballvalve'
    if 'concealed valve' in name:
        if 'qtr' in name or 'quarter' in name:
            return 'valves', 'concealedvalveqt'
        return 'valves', 'concealedvalve'
    if 'non return' in name:
        return 'valves', 'nrv'

    # Brass
    if 'brass' in name:
        if 'elbow' in name: return 'brass', 'brasselbow'
        if 'tee' in name: return 'brass', 'brasstee'
        if 'mta' in name and 'hex' in name: return 'brass', 'brasstamhex'
        if 'mta' in name: return 'brass', 'brassmta'
        if 'fta' in name and 'hex' in name: return 'brass', 'brassftahex'
        if 'fta' in name: return 'brass', 'brassfta'
        return 'brass', 'brass'

    # Mixers
    if 'mixer' in name:
        if '6"' in name or "6'" in name: return 'mixer', 'mixer6'
        if '7"' in name or "7'" in name: return 'mixer', 'mixer7'
        return 'mixer', 'mixer6'

    # Accessories
    if 'solvent' in name: return 'accessories', 'solventcement'
    if 'primer' in name: return 'accessories', 'primer'
    if 'ptfe' in name: return 'accessories', 'ptfetape'
    if 'ball valve handle' in name or code.startswith('CFBVH'): return 'accessories', 'ballvalvehandle'

    # Reducers
    if 'reducing' in name or 'reducer' in name:
        if 'elbow' in name: return 'reducers', 'redelbow'
        if 'tee' in name: return 'reducers', 'redtee'
        if 'bush' in name: return 'reducers', 'redbush'
        if 'socket' in name or 'coupler' in name: return 'reducers', 'redcoupler'
        return 'reducers', 'reducer'

    # Fittings
    if 'elbow 45' in name or code.startswith('CFE45'): return 'fittings', 'elbow45'
    if 'elbow' in name: return 'fittings', 'elbow'
    if 'tee' in name and 'cross' in name: return 'fittings', 'crosstee'
    if 'tee' in name: return 'fittings', 'tee'
    if 'coupler' in name or 'socket' in name: return 'fittings', 'coupler'
    if 'end cap' in name: return 'fittings', 'endcap'
    if 'fta' in name: return 'fittings', 'fta'
    if 'mta' in name: return 'fittings', 'mta'
    if 'union' in name: return 'fittings', 'union'
    if 'tank connector' in name:
        if 'socket' in name: return 'fittings', 'tankconnsocket'
        return 'fittings', 'tankconn'
    if 'convert' in name or 'bush' in name and 'ips' in name: return 'fittings', 'convbush'
    if 'step over' in name: return 'fittings', 'stepbend'
    if 'long radius' in name: return 'fittings', 'longradius'
    if 'bend 90' in name or code.startswith('CFB90'): return 'fittings', 'bend90'
    if 'bend' in name: return 'fittings', 'bend90'
    if 'flange' in name: return 'fittings', 'flange'
    if 'long plug' in name: return 'fittings', 'longplug'

    return 'fittings', 'other'

# ─── uPVC → SureFit ─────────────────────────────────────────────────────────────
def categorize_upvc(p):
    """Assign category/subcategory for uPVC plumbing products."""
    code = p['code'].upper()
    name = p['name'].lower()

    if 'pipe' in name:
        if 'surefit' in name:
            if 'sch-80' in name or 'sch 80' in name:
                if '6 mtr' in name: return 'pipes', 'surefit_sch80_6mtr'
                return 'pipes', 'surefit_sch80'
            if '6 mtr' in name: return 'pipes', 'surefit_sch40_6mtr'
            return 'pipes', 'surefit_sch40'
        if 'sch-80' in name or 'sch 80' in name:
            if '6 mtr' in name: return 'pipes', 'sch80_6mtr'
            return 'pipes', 'sch80'
        if '6 mtr' in name: return 'pipes', 'sch40_6mtr'
        return 'pipes', 'sch40'

    if 'ball valve' in name:
        if 'compact' in name and 'threaded' in name: return 'valves', 'compactballvalvethreaded'
        if 'compact' in name: return 'valves', 'compactballvalve'
        return 'valves', 'ballvalve'
    if 'concealed valve' in name: return 'valves', 'concealedvalve'
    if 'non return' in name: return 'valves', 'nrv'

    if 'brass' in name:
        if 'elbow' in name: return 'brass', 'brasselbow'
        if 'tee' in name: return 'brass', 'brasstee'
        if 'mta' in name: return 'brass', 'brassmta'
        if 'fta' in name: return 'brass', 'brassfta'
        return 'brass', 'brass'

    if 'solvent' in name: return 'accessories', 'solventcement'
    if 'primer' in name: return 'accessories', 'primer'
    if 'ptfe' in name: return 'accessories', 'ptfetape'

    if 'reducing' in name or 'reducer' in name:
        if 'elbow' in name: return 'reducers', 'redelbow'
        if 'tee' in name: return 'reducers', 'redtee'
        if 'bush' in name: return 'reducers', 'redbush'
        if 'socket' in name or 'coupler' in name: return 'reducers', 'redcoupler'
        return 'reducers', 'reducer'

    if 'threaded elbow' in name or 'elbow threaded' in name: return 'fittings', 'threadedelbow'
    if 'threaded tee' in name or 'tee threaded' in name: return 'fittings', 'threadedtee'
    if 'elbow 45' in name or code.startswith('UFE45'): return 'fittings', 'elbow45'
    if 'elbow' in name: return 'fittings', 'elbow'
    if 'tee' in name: return 'fittings', 'tee'
    if 'coupler' in name or 'socket' in name: return 'fittings', 'coupler'
    if 'end cap' in name: return 'fittings', 'endcap'
    if 'fta' in name: return 'fittings', 'fta'
    if 'mta' in name: return 'fittings', 'mta'
    if 'union' in name: return 'fittings', 'union'
    if 'tank connector' in name:
        if 'socket' in name: return 'fittings', 'tankconnsocket'
        return 'fittings', 'tankconn'
    if 'flange' in name: return 'fittings', 'flange'
    if 'bend 90' in name or code.startswith('UFB90'): return 'fittings', 'bend90'
    if 'bend' in name: return 'fittings', 'bend90'
    if 'long plug' in name: return 'fittings', 'longplug'

    return 'fittings', 'other'

# ─── SWR → ClickFit, SelFit, uPVC SWR, UGD ──────────────────────────────────
def split_swr(products):
    """Split SWR products into ClickFit, SelFit, uPVC SWR, UGD brands."""
    clickfit = []
    selfit = []
    upvc_swr = []
    ugd = []

    for p in products:
        code = p['code'].upper()
        name = p['name'].lower()

        if code.startswith('UGD'):
            ugd.append(p)
        # Check for LW/2.5kg items FIRST (they go to uPVC SWR brand)
        elif '2.5kg' in name or '2.5 kg' in name or '(lw)' in name.lower() or 'lw ' in name.lower() or ' lw' in name.lower():
            upvc_swr.append(p)
        elif code.startswith('RSP') or 'r/r' in name:
            upvc_swr.append(p)
        elif code.startswith('SFR') or code.startswith('SFB') or code.startswith('SFS') or code.startswith('SF') and not code.startswith('SSF'):
            # SF-prefixed LW fittings for uPVC SWR (but not SSF which is SelFit)
            upvc_swr.append(p)
        elif code.startswith('CSF') or 'clickfit' in name or code.startswith('CR'):
            clickfit.append(p)
        elif code.startswith('SSF') or code.startswith('SSP') or 'selfit' in name:
            selfit.append(p)
        else:
            # Common SWR fittings - add to both clickfit and selfit? Or just selfit
            # Check if it's a common fitting
            if any(kw in name for kw in ['nahani', 'trap', 'vent', 'door cap', 'socket plug',
                                          'jali', 'pipe clip', 'backflow', 'height riser',
                                          'multi extension', 'wc connector', 'reducer bush',
                                          'lip ring', 'o-trap', 's-trap', 'gully']):
                selfit.append(p)  # Common fittings go to SelFit
            else:
                # Default to selfit for unknown SWR
                selfit.append(p)

    return clickfit, selfit, upvc_swr, ugd

def categorize_swr(p, brand):
    """Categorize SWR product."""
    code = p['code'].upper()
    name = p['name'].lower()

    if 'pipe' in name or code.startswith('UGD'):
        if 'sn2' in code.lower() or 'sn2' in name: return 'pipes', 'sn2'
        if 'sn4' in code.lower() or 'sn4' in name: return 'pipes', 'sn4'
        if 'sn8' in code.lower() or 'sn8' in name: return 'pipes', 'sn8'
        if 'type' in name and "'a'" in name: return 'pipes', 'type_a'
        if 'type' in name and "'b'" in name: return 'pipes', 'type_b'
        if '2.5kg' in name or '2.5' in name: return 'pipes', 'swr_2_5kg'
        return 'pipes', 'pipes'

    if 'click ring' in name: return 'fittings', 'clickring'
    if 'rubber' in name: return 'fittings', 'rubber'
    if 'bend 87.5' in name or 'bend87.5' in name: return 'fittings', 'bend875'
    if 'bend 45' in name: return 'fittings', 'bend45'
    if 'double' in name and "'y'" in name and 'door' in name: return 'fittings', 'doubley_door'
    if 'double' in name and "'y'" in name: return 'fittings', 'doubley'
    if 'single' in name and "'y'" in name and 'door' in name: return 'fittings', 'singley_door'
    if 'single' in name and "'y'" in name: return 'fittings', 'singley'
    if 'reducing' in name and "'y'" in name and 'door' in name: return 'fittings', 'reducingy_door'
    if 'reducing' in name and "'y'" in name: return 'fittings', 'reducingy'
    if 'reducing' in name and 'tee' in name and 'door' in name: return 'fittings', 'reducingtee_door'
    if 'reducing' in name and 'tee' in name: return 'fittings', 'reducingtee'
    if 'swept' in name and 'door' in name: return 'fittings', 'swepttee_door'
    if 'swept' in name: return 'fittings', 'swepttee'
    if 'single tee' in name and 'door' in name: return 'fittings', 'singletee_door'
    if 'single tee' in name: return 'fittings', 'singletee'
    if 'tee' in name and 'door' in name: return 'fittings', 'tee_door'
    if 'tee' in name: return 'fittings', 'tee'
    if 'bend 87' in name and 'door' in name: return 'fittings', 'bend875_door'
    if 'bend 87' in name: return 'fittings', 'bend875'
    if 'coupler' in name: return 'fittings', 'coupler'
    if 'reducer' in name: return 'fittings', 'reducer'
    if 'cleansing' in name: return 'fittings', 'cleansingpipe'
    if 'cross tee' in name: return 'fittings', 'crosstee'
    if 'nahani' in name or 'nahni' in name: return 'fittings', 'nahanitrap'
    if 'floor trap' in name or 'multi floor' in name: return 'fittings', 'floortrap'
    if 'gully' in name: return 'fittings', 'gullytrap'
    if 'vent' in name: return 'fittings', 'ventcowl'
    if 'door cap' in name: return 'fittings', 'doorcap'
    if 'socket plug' in name: return 'fittings', 'socketplug'
    if 'jali' in name and 'square' in name: return 'fittings', 'squarejali'
    if 'jali' in name: return 'fittings', 'jali'
    if 'pipe clip' in name: return 'fittings', 'pipeclip'
    if 'backflow' in name: return 'fittings', 'backflowvalve'
    if 'height riser' in name: return 'fittings', 'heightriser'
    if 'multi extension' in name: return 'fittings', 'multiextension'
    if 'wc connector' in name: return 'fittings', 'wcconnector'
    if 'reducer bush' in name or 'reducing bush' in name: return 'fittings', 'reducerbush'
    if 'lip ring' in name: return 'fittings', 'lipring'
    if 'o-trap' in name or 'o trap' in name: return 'fittings', 'otrap'
    if 's-trap' in name or 's trap' in name: return 'fittings', 'strap'

    return 'fittings', 'other'

# ─── Agri → AgriMaster ──────────────────────────────────────────────────────────
def categorize_agri(p):
    code = p['code'].upper()
    name = p['name'].lower()

    if 'pipe' in name:
        return 'pipes', 'agri_pipe'

    if 'fabricated' in name or code.startswith('FC') or code.startswith('FB'):
        if 'coupler' in name: return 'fabricated', 'fab_coupler'
        if 'bend' in name: return 'fabricated', 'fab_bend'
        if 'tee' in name: return 'fabricated', 'fab_tee'
        return 'fabricated', 'fabricated'

    if 'solvent' in name: return 'accessories', 'solventcement'
    if 'primer' in name: return 'accessories', 'primer'
    if 'ptfe' in name: return 'accessories', 'ptfetape'
    if 'service saddle' in name: return 'accessories', 'servicesaddle'

    if 'ball valve' in name:
        if 'compact' in name: return 'valves', 'compactballvalve'
        return 'valves', 'ballvalve'
    if 'long plug' in name: return 'fittings', 'longplug'
    if 'tail piece' in name: return 'fittings', 'tailpiece'

    if 'brass' in name:
        if 'elbow' in name: return 'brass', 'brasselbow'
        if 'tee' in name: return 'brass', 'brasstee'
        if 'mta' in name: return 'brass', 'brassmta'
        if 'fta' in name: return 'brass', 'brassfta'
        return 'brass', 'brass'

    if 'reducing' in name or 'reducer' in name:
        if 'elbow' in name: return 'fittings', 'redelbow'
        if 'tee' in name: return 'fittings', 'redtee'
        if 'bush' in name: return 'fittings', 'redbush'
        if 'mta' in name: return 'fittings', 'redmta'
        if 'coupler' in name: return 'fittings', 'redcoupler'
        return 'fittings', 'reducer'

    if 'four way' in name: return 'fittings', 'fourwaytee'
    if 'door tee' in name: return 'fittings', 'doortee'
    if 'door elbow' in name: return 'fittings', 'doorelbow'
    if 'threaded' in name and 'end cap' in name: return 'fittings', 'endcapthreaded'
    if 'end cap' in name and 'plate' in name: return 'fittings', 'endcapplate'
    if 'end cap' in name: return 'fittings', 'endcap'
    if 'elbow threaded' in name or 'threaded elbow' in name: return 'fittings', 'elbowthreaded'
    if 'tee threaded' in name or 'threaded tee' in name: return 'fittings', 'teethreaded'
    if 'elbow 45' in name or 'elbow45' in name: return 'fittings', 'elbow45'
    if 'elbow' in name: return 'fittings', 'elbow'
    if 'cross tee' in name: return 'fittings', 'crosstee'
    if 'tee' in name: return 'fittings', 'tee'
    if 'coupler' in name: return 'fittings', 'coupler'
    if 'mta' in name and 'hex' in name: return 'fittings', 'mtahex'
    if 'mta' in name: return 'fittings', 'mta'
    if 'fta' in name: return 'fittings', 'fta'
    if 'union' in name: return 'fittings', 'union'
    if 'single' in name and "'y'" in name: return 'fittings', 'singley'
    if 'bend 90' in name: return 'fittings', 'bend90'
    if 'bend' in name: return 'fittings', 'bend90'
    if 'tank connector' in name:
        if 'socket' in name: return 'fittings', 'tankconnsocket'
        return 'fittings', 'tankconn'
    if 'door' in name and "'y'" in name: return 'fittings', 'doory'
    if 'flange' in name: return 'fittings', 'flange'

    return 'fittings', 'other'

# ─── Column Pipes → Boreline ────────────────────────────────────────────────────
def categorize_boreline(p):
    name = p['name'].lower()
    code = p['code'].upper()

    if 'eco' in name and 'bell' in name: return 'pipes', 'eco_bell'
    if 'eco' in name: return 'pipes', 'eco'
    if 'easy' in name and 'bell' in name: return 'pipes', 'easy_bell'
    if 'easy' in name: return 'pipes', 'easy'
    if 'medium' in name: return 'pipes', 'medium'
    if 'ultra' in name: return 'pipes', 'ultra'
    if 'standard' in name: return 'pipes', 'standard'
    if 'heavy plus' in name: return 'pipes', 'heavy_plus'
    if 'super heavy' in name: return 'pipes', 'super_heavy'
    if 'heavy' in name: return 'pipes', 'heavy'
    return 'pipes', 'column'

# ─── Solvent Cement (shared) ────────────────────────────────────────────────────
def categorize_solvent(p):
    name = p['name'].lower()
    if 'cpvc' in name: return 'accessories', 'solventcement_cpvc'
    if 'heavy' in name or 'h.d' in name: return 'accessories', 'solventcement_hd'
    if 'medium' in name or 'm.d' in name: return 'accessories', 'solventcement_md'
    if 'primer' in name: return 'accessories', 'primer'
    if 'rubber' in name: return 'accessories', 'rubber_lubricant'
    return 'accessories', 'solventcement'

# ─── Generate JS ────────────────────────────────────────────────────────────────
def format_rate(rate):
    if rate == 0:
        return '0'
    if rate == int(rate):
        return f'{int(rate)}.00'
    return f'{rate:.2f}'.rstrip('0').rstrip('.')
    # Actually keep the decimal for consistency
    if rate == int(rate):
        return f'{int(rate)}'
    return f'{rate}'

def product_to_js(p, cat, subcat, standard=''):
    """Convert a product dict to a JS object string."""
    code = p['code'].strip()
    name = p['name'].strip().replace("'", "\\'")
    size = p['size']
    rate = p['rate']
    qty = p['qty_box']
    unit = 'pcs'

    # Determine if pipe (rate per length)
    if cat == 'pipes':
        if 'mtr' in name.lower() or 'pipe' in name.lower():
            unit = 'pcs'  # Rate is per piece (per length)

    # Format rate
    rate_str = format_rate(rate)

    # Build the JS object
    parts = [
        f"code:'{code}'",
        f"name:'{name}'",
        f"category:'{cat}'",
        f"subcategory:'{subcat}'",
        f"size:'{size}'",
    ]
    if standard:
        parts.append(f"standard:'{standard}'")
    if qty:
        parts.append(f"qty_box:{qty}")
    parts.append(f"rate:{rate_str}")
    parts.append(f"unit:'{unit}'")

    return '  { ' + ', '.join(parts) + ' },'

def write_brand_file(filepath, brand_name, price_date, products, categorize_fn, standard=''):
    """Write a complete brand JS file."""
    lines = []
    lines.append(f'// {brand_name} — Product Catalog')
    lines.append(f'// w.e.f. {price_date} | www.waterflo.in')
    lines.append(f'// Generated from PRICE LIST.xls')
    lines.append('')
    lines.append('var PRODUCTS = [')
    lines.append('')

    # Group by category/subcategory
    groups = {}
    for p in products:
        cat, subcat = categorize_fn(p)
        key = (cat, subcat)
        if key not in groups:
            groups[key] = []
        groups[key].append(p)

    # Sort categories
    cat_order = ['pipes', 'fittings', 'reducers', 'brass', 'valves', 'mixer', 'fabricated', 'accessories']
    sorted_keys = sorted(groups.keys(), key=lambda k: (cat_order.index(k[0]) if k[0] in cat_order else 99, k[1]))

    prev_cat = None
    for cat, subcat in sorted_keys:
        if cat != prev_cat:
            lines.append(f'  // ─── {cat.upper()} ─────────────────────────────────────────────')
            prev_cat = cat

        # Section comment
        sample_name = groups[(cat, subcat)][0]['name']
        lines.append(f'  // {sample_name}')

        for p in groups[(cat, subcat)]:
            lines.append(product_to_js(p, cat, subcat, standard))
        lines.append('')

    lines.append('];')
    lines.append('')
    lines.append("document.dispatchEvent(new Event('brand-data-ready'));")
    lines.append('')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'  Written: {filepath} ({len(products)} products)')

# ─── Main ───────────────────────────────────────────────────────────────────────
def main():
    wb = xlrd.open_workbook(XLS_PATH)

    # 1. CPVC → StrongFit
    cpvc = read_sheet(wb, 'CPVC PIPES & FITTING')
    print(f'CPVC: {len(cpvc)} products')
    write_brand_file(os.path.join(OUT_DIR, 'strongfit-cpvc.js'), 'StrongFit CPVC Pipes & Fittings',
                     '01/11/2025', cpvc, categorize_cpvc, 'ASTM D 2846')

    # 2. uPVC → SureFit
    upvc = read_sheet(wb, 'uPVC PIPES & FITTING')
    print(f'uPVC: {len(upvc)} products')
    write_brand_file(os.path.join(OUT_DIR, 'surefit-upvc.js'), 'SureFit uPVC Plumbing System',
                     '01/11/2025', upvc, categorize_upvc, 'ASTM D 2467')

    # 3. SWR → ClickFit, SelFit, uPVC SWR, UGD
    swr = read_sheet(wb, 'SWR PIPES & FITTING')
    print(f'SWR total: {len(swr)} products')
    clickfit, selfit, upvc_swr, ugd = split_swr(swr)
    print(f'  ClickFit: {len(clickfit)}, SelFit: {len(selfit)}, uPVC SWR: {len(upvc_swr)}, UGD: {len(ugd)}')

    write_brand_file(os.path.join(OUT_DIR, 'clickfit-swr.js'), 'ClickFit uPVC SWR System',
                     '01/11/2025', clickfit, lambda p: categorize_swr(p, 'clickfit'), 'IS 13592')
    write_brand_file(os.path.join(OUT_DIR, 'selfit.js'), 'SelFit uPVC SWR System',
                     '01/11/2025', selfit, lambda p: categorize_swr(p, 'selfit'), 'IS 13592')
    write_brand_file(os.path.join(OUT_DIR, 'upvc-swr.js'), 'uPVC SWR System',
                     '01/11/2025', upvc_swr, lambda p: categorize_swr(p, 'upvc_swr'), 'IS 13592')
    write_brand_file(os.path.join(OUT_DIR, 'ugd.js'), 'UGD Drainage Pipes',
                     '01/11/2025', ugd, lambda p: categorize_swr(p, 'ugd'), 'IS 15328')

    # 4. Agri → AgriMaster
    agri = read_sheet(wb, 'AGRI PIPES & FITTING')
    print(f'Agri: {len(agri)} products')
    write_brand_file(os.path.join(OUT_DIR, 'agrimaster.js'), 'AgriMaster Agriculture Pipes & Fittings',
                     '01/11/2025', agri, categorize_agri, 'IS 4985')

    # 5. Solvent Cement — add to relevant brands (already included in main sheets usually)
    solvent = read_sheet(wb, 'SOLVENT CEMENT')
    print(f'Solvent Cement: {len(solvent)} products (standalone sheet - for reference)')
    # These are typically already included in each brand's accessories

    # 6. Column Pipes → Boreline
    column = read_sheet(wb, 'COLUMN PIPES ')
    print(f'Column Pipes: {len(column)} products')
    write_brand_file(os.path.join(OUT_DIR, 'boreline.js'), 'Boreline uPVC Column Pipes',
                     '01/11/2025', column, categorize_boreline)

    print('\nDone! All brand files generated.')

if __name__ == '__main__':
    main()
