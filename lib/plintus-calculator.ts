/**
 * Результати розрахунків калькулятора плинтуса
 */
export interface CalculationResults {
  planks: number; // Кількість планок
  mountingGlue: number; // Монтажний клей (тюбиків)
  connectionGlue: number; // Клей для з'єднань (тюбиків)
  putty: number; // Шпатлівка (тюбиків)
}

/**
 * Розраховує кількість планок плинтуса
 * @param perimeterLength - Периметр приміщення в метрах
 * @param plintusLengthMm - Довжина планки плинтуса в міліметрах
 * @returns Кількість планок (округлення вгору)
 */
export function calculatePlanks(perimeterLength: number, plintusLengthMm: number): number {
  // Конвертуємо метри в міліметри та додаємо 5% для зарізів
  const totalLengthMm = perimeterLength * 1000 * 1.05;
  return Math.ceil(totalLengthMm / plintusLengthMm);
}

/**
 * Розраховує кількість монтажного клею
 * @param perimeterLength - Периметр приміщення в метрах
 * @returns Кількість тюбиків монтажного клею (округлення вгору)
 */
export function calculateMountingGlue(perimeterLength: number): number {
  return Math.ceil(perimeterLength / 8);
}

/**
 * Розраховує кількість клею для з'єднань
 * @param mountingGlue - Кількість тюбиків монтажного клею
 * @returns Кількість тюбиків клею для з'єднань (округлення вгору)
 */
export function calculateConnectionGlue(mountingGlue: number): number {
  return Math.ceil(mountingGlue / 6);
}

/**
 * Розраховує кількість шпатлівки
 * @param mountingGlue - Кількість тюбиків монтажного клею
 * @param connectionGlue - Кількість тюбиків клею для з'єднань
 * @returns Кількість тюбиків шпатлівки
 */
export function calculatePutty(mountingGlue: number, connectionGlue: number): number {
  // Базова шпатлівка
  const basePutty = Math.ceil(mountingGlue / 6);

  // Додаткова шпатлівка (відсікання дробової частини)
  const additionalPutty = Math.floor(connectionGlue / 3);

  return basePutty + additionalPutty;
}

/**
 * Виконує всі розрахунки калькулятора плинтуса
 * @param perimeterLength - Периметр приміщення в метрах
 * @param plintusLengthMm - Довжина планки плинтуса в міліметрах
 * @returns Об'єкт з результатами всіх розрахунків
 */
export function calculateAll(perimeterLength: number, plintusLengthMm: number): CalculationResults {
  const planks = calculatePlanks(perimeterLength, plintusLengthMm);
  const mountingGlue = calculateMountingGlue(perimeterLength);
  const connectionGlue = calculateConnectionGlue(mountingGlue);
  const putty = calculatePutty(mountingGlue, connectionGlue);

  return {
    planks,
    mountingGlue,
    connectionGlue,
    putty,
  };
}
