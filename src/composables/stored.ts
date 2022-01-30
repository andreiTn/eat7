import { Ref, ref } from 'vue';
import { Item, GeneratedList } from 'components/models';

export const ITEMS_LS_KEY = 'items';
export const LIST_LS_KEY = 'list';
export const DEFAULT_DATA_KEY = 'dd';
export const LIST_LENGTH = 7;

export function useStoredItems(): Ref<Item[]> {
  const storedItems = localStorage.getItem(ITEMS_LS_KEY);
  if (!storedItems) {
    return ref([]);
  }
  return ref(JSON.parse(storedItems) as Item[]);
}

export function useStoredList(): Ref<GeneratedList> {
  const storedList = localStorage.getItem(LIST_LS_KEY);
  if (!storedList) {
    return ref({
      items: [],
      description: '',
      createdAt: 0,
      expiresAt: 0,
    });
  }

  return ref(JSON.parse(storedList) as GeneratedList);
}
