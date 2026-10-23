export const budgetCategories = [
  'Housing',
  'Food',
  'Bills',
  'Transportation',
  'Entertainment',
];

const storagePrefix = 'spend-horizon.user.';
const schemaVersion = 1;

function getStorageKey(userName) {
  const normalizedName = userName?.trim().toLowerCase();
  return normalizedName ? `${storagePrefix}${encodeURIComponent(normalizedName)}` : null;
}

export function createDefaultUserData() {
  return {
    schemaVersion,
    profileName: '',
    monthlyIncomeCents: {
      primaryPaycheck: 0,
      otherIncome: 0,
    },
    categoryBudgetsCents: Object.fromEntries(
      budgetCategories.map((category) => [category, 0]),
    ),
    expenses: [],
    goals: [],
  };
}

function normalizeUserData(data) {
  const defaults = createDefaultUserData();
  if (!data || typeof data !== 'object' || Array.isArray(data)) return defaults;

  return {
    ...defaults,
    ...data,
    schemaVersion,
    profileName: typeof data.profileName === 'string' ? data.profileName : '',
    monthlyIncomeCents: {
      ...defaults.monthlyIncomeCents,
      ...(data.monthlyIncomeCents || {}),
    },
    categoryBudgetsCents: {
      ...defaults.categoryBudgetsCents,
      ...(data.categoryBudgetsCents || {}),
    },
    expenses: Array.isArray(data.expenses) ? data.expenses : [],
    goals: Array.isArray(data.goals) ? data.goals : [],
  };
}

export function readUserData(userName, storage = globalThis.localStorage) {
  const key = getStorageKey(userName);
  if (!key || !storage) return createDefaultUserData();

  try {
    const savedData = storage.getItem(key);
    return savedData ? normalizeUserData(JSON.parse(savedData)) : createDefaultUserData();
  } catch {
    return createDefaultUserData();
  }
}

export function saveUserData(userName, data, storage = globalThis.localStorage) {
  const key = getStorageKey(userName);
  if (!key) throw new Error('A user name is required to save data.');
  if (!storage) throw new Error('Local storage is not available.');

  const normalizedData = normalizeUserData(data);
  storage.setItem(key, JSON.stringify(normalizedData));
  return normalizedData;
}