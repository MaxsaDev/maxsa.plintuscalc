'use server';

import { getPlintusList } from '@/data/mx-data/plintus-data';
import type { PlintusData } from '@/interfaces/mx-data/plintus-data';

/**
 * Server Action для отримання списку плинтусів
 */
export async function fetchPlintusList(): Promise<PlintusData[]> {
  return await getPlintusList();
}
