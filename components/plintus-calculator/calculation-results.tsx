'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { APP_PATH } from '@/lib/const';
import type { CalculationResults } from '@/lib/plintus-calculator';
import Image from 'next/image';

interface CalculationResultsProps {
  results: CalculationResults;
  hasData?: boolean;
  plintusImagePath?: string;
  plintusPrice?: string;
  plintusWeight?: string;
  plintusLength?: string;
  plintusWidth?: string;
  plintusHeight?: string;
}

export function CalculationResults({
  results,
  hasData = false,
  plintusImagePath,
  plintusPrice,
  plintusWeight,
  plintusLength,
  plintusWidth,
  plintusHeight,
}: CalculationResultsProps) {
  const items = [
    {
      name: 'Плинтус Creativa',
      description: 'Плинтус для підлоги',
      image: plintusImagePath ? `${APP_PATH}${plintusImagePath}` : '',
      price: plintusPrice ? parseFloat(plintusPrice) : 0,
      weight: plintusWeight ? parseFloat(plintusWeight) : 0,
      unit: 'шт',
      value: results.planks,
      dimensions:
        plintusLength && plintusWidth && plintusHeight
          ? `${parseFloat(plintusLength)} x ${parseFloat(plintusHeight)} x ${parseFloat(plintusWidth)} мм`
          : undefined,
    },
    {
      name: 'Клей монтажний Creativa',
      description: 'Клей для монтажу плинтуса на стіну',
      image: `${APP_PATH}catalog/drpm/T-AP-KLL-C310.jpg`,
      price: 595,
      weight: 0.45,
      unit: 'тюб',
      value: results.mountingGlue,
    },
    {
      name: "Клей для з'єднань Creativa",
      description: "Клей для з'єднання плинтусів між собою",
      image: `${APP_PATH}catalog/drpm/T-AP-KLM-C300.jpg`,
      price: 260,
      weight: 0.45,
      unit: 'тюб',
      value: results.connectionGlue,
    },
    {
      name: 'Шпаклівка Creativa',
      description: 'Для замазування швів та місць зʼєднань',
      image: `${APP_PATH}catalog/drpm/T-AP-MS-C200.jpg`,
      price: 390,
      weight: 0.33,
      unit: 'тюб',
      value: results.putty,
    },
  ];

  // Розраховуємо summary
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.value, 0);
  const totalWeight = items.reduce((sum, item) => sum + item.weight * item.value, 0);
  const totalItems = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.name} className={`${!hasData ? 'opacity-50' : ''}`}>
          <Item variant="outline" className="gap-3">
            <ItemMedia
              variant="image"
              className="border-border size-16 shrink-0 self-start overflow-hidden rounded-md border"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="size-full object-cover"
                />
              ) : (
                <div className="bg-muted size-full" />
              )}
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-foreground text-xl font-semibold">{item.name}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
              {item.dimensions && (
                <div className="text-muted-foreground mt-1 text-xs font-bold">
                  {item.dimensions}
                </div>
              )}
            </ItemContent>
            <ItemActions>
              <div className="flex flex-col items-end gap-1">
                {item.price > 0 && (
                  <span className="text-muted-foreground text-xs">
                    {item.price.toLocaleString('uk-UA', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{' '}
                    ₴ / {item.unit}
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tabular-nums">{item.value}</span>
                  <span className="text-muted-foreground text-lg">{item.unit}</span>
                </div>
              </div>
            </ItemActions>
          </Item>
        </div>
      ))}

      {/* Summary */}
      {hasData && (
        <div className="border-border bg-muted/30 mt-8 rounded-xl border p-6">
          <h3 className="text-foreground mb-4 text-xl font-semibold">Підсумок</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Всього позицій</span>
              <span className="text-foreground text-lg font-semibold">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Загальна вартість</span>
              <span className="text-foreground text-lg font-semibold">
                {totalPrice.toLocaleString('uk-UA', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ₴
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Загальна вага</span>
              <span className="text-foreground text-lg font-semibold">
                {totalWeight.toLocaleString('uk-UA', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                кг
              </span>
            </div>
          </div>
          <div className="border-border mt-4 border-t pt-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Зверніть увагу: розрахунок виконується на основі цін і ваги з сайту. У момент
              оновлення даних можливі тимчасові розбіжності, тому фінальну ціну та вагу рекомендуємо
              уточнювати на сайті або у менеджера. Кількість плінтусів у калькуляторі розрахована із
              запасом, необхідним для зарізання кутів, стиків і компенсації нерівностей під час
              монтажу.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
