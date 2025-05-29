import { useMemo } from 'react';

export function useChunkedArray(array, chunkSize) {
  return useMemo(() => {
    if (!Array.isArray(array) || chunkSize <= 0) return [];

    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }, [array, chunkSize]);
}
