import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config'; // Fix the path

const {theme: {screens}} = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value: string): number => {
  // @ts-ignore
  return +screens[value].slice(0, screens[value].indexOf('px'));
};

export const getCurrentBreakpoint = (): string => {
  let currentBreakpoint: string;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  // @ts-ignore
  return currentBreakpoint;
};
