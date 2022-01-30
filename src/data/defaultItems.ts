import { useStoredItems, ITEMS_LS_KEY, DEFAULT_DATA_KEY } from 'src/composables/stored';

const defaultData = [
  'Tocăniță de pui cu ciuperci',
  'Cartofi cu pui și legume la cuptor',
  'Pește cu piure',
  'Bors de pui',
  'Borș de cartofi',
  'Mancarică de cartofi',
  'Salată de cartofi',
  'Piept de rața',
  'Ardei umpluți',
  'Pizza',
  'Paste cu ton',
  'Taiței cu pui',
  'Couscous',
  'Lasagna',
  'Panzerotti',
  'Gulaș cu galuste',
  'Șnițele cu salata',
  'Purjoluțe cu piure',
  'Tocana de legume cu orez',
  'Borș de perisoare',
  'Cartofi la cuptor cu ciuperci și usturoi',
  'Mancare cu mazare și pui',
  'Păstăi',
  'Salată de vinete',
  'Orez prăjit cu ouă',
  'Ciorba rădăuțeană',
  'Borș cu afumatură',
  'Piept de pui cu sos de ciuperci',
  'Cartofi copți cu brânză și ciuperci',
  'Salata boeuf',
  'Borș de fasole',
  'Fasole prăjită',
  'Salată de fasole',
];

export function useDefaultData() {
  const items = useStoredItems();
  items.value.forEach((item) => {
    if (defaultData.includes(item.name)) {
      const index = defaultData.indexOf(item.name);
      defaultData.splice(index, 1);
    }
  });

  defaultData.forEach((name) => {
    items.value.push({
      id: `${Date.now()}-${Math.random().toFixed(5)}`,
      name,
      description: '',
      externalLink: '',
      isFavourite: false,
      locked: false,
    });
  });

  localStorage.setItem(ITEMS_LS_KEY, JSON.stringify(items.value));
  localStorage.setItem(DEFAULT_DATA_KEY, 'true');
}

export function hasDefaultData(): boolean {
  return !!localStorage.getItem(DEFAULT_DATA_KEY);
}
