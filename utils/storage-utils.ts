export const saveItemToSessionStorage = <T>(key: string, value: T) => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving item to session storage: ${error}`);
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
    console.error(`Error retrieving item from session storage: ${error}`);
    return null;
  }
};
