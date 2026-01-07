import { pool } from '@/lib/db';
import type { PlintusData } from '@/interfaces/mx-data/plintus-data';

/**
 * Отримує список всіх плинтусів дюрополімерного типу (plintus_types_id = 1)
 * @returns Масив плинтусів, відсортований за product_id
 */
export async function getPlintusList(): Promise<PlintusData[]> {
  const result = await pool.query<PlintusData>(
    `
      SELECT
        id,
        plintus_types_id,
        product_id,
        title,
        image_path,
        price,
        weight,
        length,
        width,
        height,
        created_at,
        updated_at
      FROM mx_data.plintus_data
      WHERE plintus_types_id = $1
      ORDER BY product_id ASC
    `,
    [1]
  );

  return result.rows;
}

/**
 * Отримує плинтус за ID
 * @param id - UUID плинтуса
 * @returns Плинтус або null, якщо не знайдено
 */
export async function getPlintusById(id: string): Promise<PlintusData | null> {
  const result = await pool.query<PlintusData>(
    `
      SELECT
        id,
        plintus_types_id,
        product_id,
        title,
        image_path,
        price,
        weight,
        length,
        width,
        height,
        created_at,
        updated_at
      FROM mx_data.plintus_data
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}
