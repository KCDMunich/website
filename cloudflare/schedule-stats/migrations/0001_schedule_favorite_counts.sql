CREATE TABLE IF NOT EXISTS schedule_favorite_counts (
  event_id TEXT PRIMARY KEY,
  event_title TEXT NOT NULL DEFAULT '',
  add_count INTEGER NOT NULL DEFAULT 0,
  remove_count INTEGER NOT NULL DEFAULT 0,
  current_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS schedule_favorite_counts_current_count_idx
  ON schedule_favorite_counts (current_count DESC, add_count DESC);
