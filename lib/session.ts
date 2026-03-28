const SESSION_STORAGE_KEY = 'idea_to_copy_session_id';

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  const existing = localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_STORAGE_KEY, id);
  return id;
}
