// Audit log helper — records admin mutation events to the audit_log table.
// Use logAudit(req, action, entityType, entityId, details) inside any mutation route.

function logAudit(req, action, entityType, entityId, details) {
  try {
    const db = req.app.get('db');
    const user = req.user || null;
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().split(',')[0].trim();
    const payload = details === undefined || details === null ? null : JSON.stringify(details);
    db.prepare(`
      INSERT INTO audit_log (user_id, user_email, user_role, action, entity_type, entity_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      user ? user.id : null,
      user ? user.email : null,
      user ? user.role : null,
      action,
      entityType || null,
      entityId == null ? null : String(entityId),
      payload,
      ip || null
    );
  } catch (e) {
    console.error('Audit log error:', e.message);
  }
}

function diffFields(before, patch) {
  if (!before || !patch) return null;
  const changes = {};
  for (const key of Object.keys(patch)) {
    if (patch[key] === undefined) continue;
    if (before[key] !== patch[key]) {
      changes[key] = { from: before[key], to: patch[key] };
    }
  }
  return Object.keys(changes).length ? changes : null;
}

module.exports = { logAudit, diffFields };
