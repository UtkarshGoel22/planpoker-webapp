/**
 * @function getItemInLocalStorage
 * Get the item value from local storage.
 *
 * @param key - The key of the item.
 */
export const getItemInLocalStorage = (key: string): string => {
  return window.localStorage.getItem(key) ?? ""
}

/**
 * @function removeItemInLocalStorage
 * Remove the item from local storage.
 *
 * @param key - The key of the item.
 */
export const removeItemInLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key)
}

/**
 * @function setItemInLocalStorage
 * Set the item in local storage.
 *
 * @param key - The key of the item.
 * @param value - The value of the item.
 */
export const setItemInLocalStorage = (key: string, value: string): void => {
  window.localStorage.setItem(key, value)
}
