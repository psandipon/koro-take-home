import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const useScreenSize = () => {
  const activeBreakpoints = useBreakpoints(breakpointsTailwind);
  const smOrGreater = activeBreakpoints.greaterOrEqual("sm");
  return {
    smOrGreater,
    activeBreakpoints,
  };
};

export default useScreenSize;
