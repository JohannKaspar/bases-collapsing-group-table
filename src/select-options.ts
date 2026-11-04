// Fixed dropdown options per note property, written as one property per line
// (or separated by ";"), e.g.
//   priority: critical, high, normal, low
//   status: backlog, active, blocked, done
// Returns property key (without the "note." prefix) → allowed values, in order.
export const parseSelectOptions = (raw: string): Map<string, string[]> => {
  const out = new Map<string, string[]>()
  for (const line of raw.split(/[\n;]+/)) {
    const idx = line.indexOf(':')
    if (idx < 0) continue
    const key = line.slice(0, idx).trim()
    const values = line
      .slice(idx + 1)
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
    if (key && values.length > 0) out.set(key, values)
  }
  return out
}

// Global options first; a view's own line for a property replaces the global one.
export const mergeSelectOptions = (globalRaw: string, viewRaw: string): Map<string, string[]> => {
  const merged = parseSelectOptions(globalRaw)
  for (const [k, v] of parseSelectOptions(viewRaw)) merged.set(k, v)
  return merged
}
