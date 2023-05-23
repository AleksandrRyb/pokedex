// eslint-disable-next-line consistent-return
export const saveItemToSessionStorage = <T>(key: string, value: T) => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    return null;
  }
};

export const getItemFromSessionStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    const deserializedValue = JSON.parse(serializedValue);
    return deserializedValue as T;
  } catch (error) {
    return null;
  }
};
