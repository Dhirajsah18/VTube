export function normalizePaginated(data) {
  if (!data) {
    return { docs: [], hasNextPage: false };
  }

  // aggregatePaginate response
  if (Array.isArray(data.docs)) {
    return {
      docs: data.docs,
      hasNextPage: data.hasNextPage,
    };
  }

  // plain array fallback
  if (Array.isArray(data)) {
    return {
      docs: data,
      hasNextPage: false,
    };
  }

  // unexpected shape
  return {
    docs: [],
    hasNextPage: false,
  };
}
