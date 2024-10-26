// Use it for unique values

export const ChangeObjectSides = (object: any) => {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]))
}

export const emptyFunction = () => {}
