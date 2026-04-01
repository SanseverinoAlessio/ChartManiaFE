const DEFAULT_MOBILE_BREAKPOINT = 768;

export const isMobileViewport = (
  width = typeof window !== "undefined" ? window.innerWidth : DEFAULT_MOBILE_BREAKPOINT + 1,
  breakpoint = DEFAULT_MOBILE_BREAKPOINT
) => {
  return width <= breakpoint;
};
