export const setNestedKey = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // Handle array indices
    if (key.match(/^\d+$/)) {
      const index = parseInt(key, 10);
      if (!Array.isArray(current)) {
        throw new Error(`Expected an array at ${keys.slice(0, i).join(".")}`);
      }
      current = current[index];
    } else {
      if (!current[key]) current[key] = {}; // Ensure the path exists
      current = current[key];
    }
  }

  const lastKey = keys[keys.length - 1];

  // Handle array index for the last key
  if (lastKey.match(/^\d+$/)) {
    const index = parseInt(lastKey, 10);
    if (!Array.isArray(current)) {
      throw new Error(`Expected an array at ${keys.slice(0, -1).join(".")}`);
    }
    current[index] = value; // Update array element
  } else if (typeof value === "object" && !Array.isArray(value)) {
    // Replace the entire object at the last key
    current[lastKey] = value;
  } else {
    current[lastKey] = value; // Update specific property
  }
};

export const extractKeys = (obj, parentKey = "") => {
    let keys = [];
    Object.keys(obj).forEach((key) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (Array.isArray(obj[key])) {
            // Handle arrays (e.g., moveFlags)
            obj[key].forEach((_, index) => {
                keys.push(`${fullKey}.${index}.value`); // Add keys for each index
            });
        } else if (obj[key] && typeof obj[key] === "object" && !("value" in obj[key])) {
            keys.push(...extractKeys(obj[key], fullKey));
        } else {
            keys.push(fullKey); // Add key to list
        }
    });
    return keys;
};

export const buildQueryList = (obj, queryList, parentKey = "") => {
    Object.keys(obj).forEach((key) => {
        const EXCLUDE_KEYS = [
            // Move Values
            "power",
            "accuracy",
            "statChanges",
            "moveFlags",

            // Pokemon Values
            "baseStats",
            "ability",
            "types",
        ];

        if (EXCLUDE_KEYS.includes(key)) {
            return;
        }

        if (key === "baseStats") {
            console.log("HELLO???");
        }
        const value = obj[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === "object" && !("value" in value)) {
            // Recursively handle nested objects without a 'value' property
            buildQueryList(value, queryList, fullKey);
        } else if (value?.value !== null && value?.value !== "") {
            // Add to query list if 'value' property is not null or undefined
            let actualValue = value?.value;
            if (typeof actualValue === "string") {
                actualValue = actualValue.trim();
            }
            if (fullKey !== "name") {
                // The = makes an exact match for the specific values.
                // Since every value besides the name is controlled, we want to be exact.
                // The quotation marks are keys that have a space between them
                // In useExtendedSearch mode spaces are counted as an "and" operator
                actualValue = `="${actualValue}"`
            }
            queryList.push({ [fullKey]: actualValue });
        }
    });
};

export function applyRangeFilter(results, field, rangeValue) {
    if (!rangeValue) return results;

    const range = rangeValue.split("-");

    if (range.length !== 2) {
        console.warn(`Invalid range format for ${field}:`, rangeValue);
        return results;
    }

    const [minValue, maxValue] = range.map(Number);

    return results.filter(item => {
        const itemValue = Number(item[field]);
        return (
            !isNaN(itemValue) &&
            itemValue > minValue &&
            itemValue <= maxValue
        );
    });
}
