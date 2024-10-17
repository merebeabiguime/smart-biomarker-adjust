export const safeRemoveUnderscores = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj; // Preserve Date objects
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => safeRemoveUnderscores(item));
  }

  if (typeof obj === "object") {
    const newObj: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = key.startsWith("_") ? key.slice(1) : key;
      newObj[newKey] = safeRemoveUnderscores(value);
    }
    return newObj;
  }

  return obj;
};
