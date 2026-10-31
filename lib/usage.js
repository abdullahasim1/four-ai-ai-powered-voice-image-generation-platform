import { getDb, ensureSchema } from "./db";

/** Max image generations per user per rolling 24h window. */
export const IMAGE_DAILY_LIMIT = 25;

/**
 * Usage counted from the activities table (feature = 'image').
 * Returns { used, limit, remaining }.
 */
export async function getImageQuota(userId) {
  await ensureSchema();
  const rows = await getDb()`
    SELECT COUNT(*)::int AS count
    FROM activities
    WHERE user_id = ${userId}
      AND feature = 'image'
      AND created_at > now() - interval '24 hours'`;
  const used = rows[0]?.count ?? 0;
  return { used, limit: IMAGE_DAILY_LIMIT, remaining: Math.max(0, IMAGE_DAILY_LIMIT - used) };
}

/** Records a successful generation so it counts toward the quota. */
export async function trackImageGeneration(userId, description) {
  await ensureSchema();
  await getDb()`
    INSERT INTO activities (user_id, feature, description)
    VALUES (${userId}, 'image', ${String(description || "").slice(0, 500)})`;
}
