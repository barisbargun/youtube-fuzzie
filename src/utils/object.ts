// Use it for unique values 
export const ChangeObjectSides = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}