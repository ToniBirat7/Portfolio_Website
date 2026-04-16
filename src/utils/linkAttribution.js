const AFFILIATE_HOST_MARKERS = [
  'amazon.',
  'impact.com',
  'shareasale.com',
  'partnerstack.com',
  'clickbank.net',
  'cj.com',
  'awin1.com',
];

const AFFILIATE_QUERY_KEYS = [
  'ref',
  'aff',
  'affiliate',
  'aff_id',
  'partner',
  'tag',
];

export function getUrlHost(href) {
  try {
    return new URL(href).host;
  } catch {
    return '';
  }
}

export function isExternalUrl(href) {
  if (!href || typeof window === 'undefined') return false;
  if (!/^https?:\/\//i.test(href)) return false;

  try {
    const target = new URL(href);
    return target.host !== window.location.host;
  } catch {
    return false;
  }
}

export function isAffiliateUrl(href) {
  if (!href) return false;

  try {
    const target = new URL(href);
    const host = target.host.toLowerCase();

    if (AFFILIATE_HOST_MARKERS.some((marker) => host.includes(marker))) {
      return true;
    }

    for (const key of AFFILIATE_QUERY_KEYS) {
      if (target.searchParams.has(key)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

export function markdownLikelyHasAffiliateLinks(markdown) {
  if (!markdown) return false;

  return /(\?|&)(ref|aff|affiliate|aff_id|partner|tag)=|amazon\.|shareasale\.com|partnerstack\.com|clickbank\./i.test(
    markdown,
  );
}
