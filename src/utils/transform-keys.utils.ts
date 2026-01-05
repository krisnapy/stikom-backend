import { omit } from 'lodash';

/**
 * Converts a snake_case string to camelCase
 */
const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Converts all keys of an object from snake_case to camelCase
 */
const snakeToCamelKeys = <T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const camelKey = snakeToCamel(key);
    acc[camelKey] = value;
    return acc;
  }, {} as Record<string, unknown>);
};

/**
 * Transforms a Strava API activity response to match the database schema
 */
export const transformStravaActivity = (activity: Record<string, unknown>) => {
  const transformed = snakeToCamelKeys(
    omit(activity, ['start_date', 'start_date_local']),
  );

  return {
    ...transformed,
    id: activity.id as number,
    startDate: new Date(activity.start_date as string) as unknown as string,
    startDateLocal: new Date(
      activity.start_date_local as string,
    ) as unknown as string,
    startLatLng:
      Array.isArray(activity.start_latlng) && activity.start_latlng.length > 0
        ? [activity.start_latlng[0], activity.start_latlng[1]]
        : null,
    endLatLng:
      Array.isArray(activity.end_latlng) && activity.end_latlng.length > 0
        ? [activity.end_latlng[0], activity.end_latlng[1]]
        : null,
    athleteId:
      (activity.athlete as Record<string, unknown>)?.id ||
      transformed.athleteId,
    polyline: (activity.map as Record<string, unknown>)?.polyline || null,
    summaryPolyline:
      (activity.map as Record<string, unknown>)?.summary_polyline || null,
  };
};
