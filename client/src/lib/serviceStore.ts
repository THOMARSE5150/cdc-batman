// Simple service scroll state store
let activeServiceId: string | null = null;

export const setActiveService = (serviceId: string) => {
  activeServiceId = serviceId;
};

export const getActiveService = (): string | null => {
  const temp = activeServiceId;
  // Clear after retrieving (one-time use)
  activeServiceId = null;
  return temp;
};