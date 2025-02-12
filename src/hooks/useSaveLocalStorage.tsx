const useSaveLocalStorage = (state: string, localStorageName: string) => {
    try {
      const serializedState = (state);
      localStorage.setItem(localStorageName, serializedState);
    } catch (err) {
      console.error("Ошибка сохранения в localStorage", err);
    }
};

export default useSaveLocalStorage;