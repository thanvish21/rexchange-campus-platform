const KEY = 'skillforge.connections'
const FREE_LIMIT = 5

export function getConnectionsUsed() {
  try {
    return parseInt(localStorage.getItem(KEY) || '0', 10)
  } catch {
    return 0
  }
}

export function getRemainingFree() {
  return Math.max(0, FREE_LIMIT - getConnectionsUsed())
}

export function isPaywalled() {
  return getConnectionsUsed() >= FREE_LIMIT
}

export function recordConnection() {
  try {
    localStorage.setItem(KEY, String(getConnectionsUsed() + 1))
  } catch {
    /* private mode */
  }
}

export function resetConnections() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* private mode */
  }
}

export const FREE_MATCH_LIMIT = FREE_LIMIT
