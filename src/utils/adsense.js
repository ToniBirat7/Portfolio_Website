const DEFAULT_ADSENSE_CLIENT_ID = 'ca-pub-1567291488769443';

export const ADSENSE_CLIENT_ID =
  import.meta.env.VITE_ADSENSE_CLIENT_ID || DEFAULT_ADSENSE_CLIENT_ID;

export const ADSENSE_BLOG_SLOT_ID =
  import.meta.env.VITE_ADSENSE_BLOG_SLOT_ID || '';

export const hasBlogAdSlot =
  Boolean(ADSENSE_CLIENT_ID) && Boolean(ADSENSE_BLOG_SLOT_ID);
