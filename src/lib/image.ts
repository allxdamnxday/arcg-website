// Shared blur placeholder for fill/remote images — an 8×8 navy tile at roughly
// photo luminance (#22364a), so images fade up from brand tone instead of a
// white flash. Static-imported local images get their own generated blurDataURL
// for free (placeholder="blur"); use this for remote/string-src images.
export const BLUR_NAVY =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMyMjM2NGEiLz48L3N2Zz4=";
