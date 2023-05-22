export const saveItemToSessionStorage = <T>(key: string, value: T) => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving item to session storage: ${error}`);
  }
};
