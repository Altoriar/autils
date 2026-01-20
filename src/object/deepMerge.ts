function isPlainObject(item: any): boolean {
	return item !== null && typeof item === 'object' && !Array.isArray(item);
}


/**
 * 合并对象，
 * @param target 
 * @param source 
 * @returns 
 * @example
  const defaultConfig = {
    api: { timeout: 1000, retry: 2 },
    ui: { theme: 'light', showHeader: true },
  };

  const userConfig = {
    api: { timeout: 3000 },
    ui: { theme: 'dark' },
  };

  const finalConfig = deepMerge(defaultConfig, userConfig);

  console.log(finalConfig);
  {
    api: { timeout: 3000, retry: 2 },
    ui: { theme: 'dark', showHeader: true }
  }
 */
export const deepMerge = <
	T extends Record<string, any>,
	U extends Record<string, any>,
>(
	target: T,
	source: U,
): T & U => {
	const result: Record<string, any> = { ...target };

	Object.keys(source).forEach((key) => {
		const sourceValue = source[key as keyof U];
		const targetValue = result[key];

		if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
			result[key] = deepMerge(targetValue, sourceValue);
		} else {
			result[key] = sourceValue;
		}
	});

	return result as T & U;
};
