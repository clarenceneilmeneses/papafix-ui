/* The Future.delayed equivalent.
 *
 * Every list screen goes through here so loading / empty / error states are
 * real render paths, not mockups. The StateSwitcher in the corner of those
 * screens flips the forced scenario at runtime — that control is prototype
 * chrome and would not exist in the app.
 */

import * as data from './data.js';

export const DELAY_MS = 700;

/** Mirrors Flutter's Future.delayed(...).then(() => value) */
export function defer(value, ms = DELAY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function fail(message, ms = DELAY_MS) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
}

/**
 * Resolve a loader against a forced scenario.
 * scenario: 'loaded' | 'loading' | 'empty' | 'error'
 */
export function load(scenario, loadedValue, emptyValue, errorMessage) {
  switch (scenario) {
    case 'loading':
      return new Promise(() => {});          // never settles: parks the UI in its loading state
    case 'empty':
      return defer(emptyValue);
    case 'error':
      return fail(errorMessage);
    case 'loaded':
    default:
      return defer(loadedValue);
  }
}

export const api = {
  getBookings: (scenario) =>
    load(scenario, data.bookings, [], 'Could not load your bookings.'),

  getAddresses: (scenario) =>
    load(scenario, data.addresses, [], 'Could not load your addresses.'),

  getTickets: (scenario) =>
    load(scenario, data.tickets, [], 'Could not load your messages.'),

  getTechnicians: (scenario) =>
    load(scenario, data.technicians, [], 'No technicians could be reached. Check your connection and try again.'),
};

export const SCENARIOS = ['loaded', 'loading', 'empty', 'error'];
