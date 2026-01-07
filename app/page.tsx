'use client';

import { fetchPlintusList } from '@/actions/mx-data/plintus-data-action';
import { CalculationResults } from '@/components/plintus-calculator/calculation-results';
import { LengthInput } from '@/components/plintus-calculator/length-input';
import { PlintusSelect } from '@/components/plintus-calculator/plintus-select';
import type { PlintusData } from '@/interfaces/mx-data/plintus-data';
import { APP_PATH } from '@/lib/const';
import { calculateAll } from '@/lib/plintus-calculator';
import type { PlintusCalculatorFormData } from '@/schemas/plintus-calculator';
import { plintusCalculatorSchema } from '@/schemas/plintus-calculator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator, Check } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FooterCopyright } from '../components/general/footer-copyright';

export default function Home() {
  const [selectedPlintus, setSelectedPlintus] = useState<PlintusData | null>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PlintusCalculatorFormData>({
    resolver: zodResolver(plintusCalculatorSchema),
    mode: 'onChange',
  });

  const plintusId = useWatch({ control, name: 'plintusId' });
  const perimeterLength = useWatch({ control, name: 'perimeterLength' });

  // Завантажуємо дані обраного плинтуса
  useEffect(() => {
    async function loadPlintusData() {
      if (!plintusId) {
        setSelectedPlintus(null);
        return;
      }

      try {
        const plintusList = await fetchPlintusList();
        const plintus = plintusList.find((p: PlintusData) => p.id === plintusId);
        setSelectedPlintus(plintus || null);
      } catch (error) {
        console.error('Помилка завантаження даних плинтуса:', error);
        setSelectedPlintus(null);
      }
    }

    loadPlintusData();
  }, [plintusId]);

  // Виконуємо розрахунки як похідні значення (завжди показуємо результати)
  const calculationResults =
    selectedPlintus && perimeterLength && perimeterLength > 0
      ? calculateAll(perimeterLength, parseFloat(selectedPlintus.length))
      : {
          planks: 0,
          mountingGlue: 0,
          connectionGlue: 0,
          putty: 0,
        };

  const hasValidData = Boolean(selectedPlintus && perimeterLength && perimeterLength > 0);

  const totalItems =
    calculationResults.planks +
    calculationResults.mountingGlue +
    calculationResults.connectionGlue +
    calculationResults.putty;

  return (
    <div className="bg-background flex h-screen flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
        {/* Ліва частина - Форма */}
        <div className="border-border bg-muted/30 w-full border-r p-8 lg:w-[480px] lg:p-12">
          <div className="space-y-12">
            {/* Заголовок */}
            <div className="space-y-4">
              <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-2xl">
                <Calculator className="text-primary-foreground h-7 w-7" />
              </div>
              <div>
                <h1 className="text-foreground text-4xl font-bold tracking-tight text-balance">
                  Калькулятор плінтусу
                </h1>
                <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
                  Точний розрахунок матеріалів для професійного монтажу
                </p>
              </div>
            </div>

            {/* Зображення плинтуса */}
            <div className="flex justify-center">
              <div className="bg-muted relative aspect-square w-full max-w-[280px] overflow-hidden rounded-xl border">
                {selectedPlintus?.image_path ? (
                  <Image
                    src={`${APP_PATH}${selectedPlintus.image_path}`}
                    alt={selectedPlintus.title}
                    width={280}
                    height={280}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                    <span className="text-sm">Оберіть модель</span>
                  </div>
                )}
              </div>
            </div>

            {/* Поля вводу */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit(() => {})} className="space-y-8">
                <div className="space-y-3">
                  <label htmlFor="plintus-select" className="text-foreground text-sm font-medium">
                    Модель плинтуса
                  </label>
                  <PlintusSelect
                    value={plintusId}
                    onValueChange={(value) => setValue('plintusId', value)}
                    error={errors.plintusId?.message}
                  />
                </div>

                <LengthInput
                  value={perimeterLength}
                  onChange={(value) => setValue('perimeterLength', value ?? 0)}
                  error={errors.perimeterLength?.message}
                />
              </form>

              {/* Summary Badge */}
              {hasValidData && (
                <div className="border-border bg-background rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Всього позицій</span>
                    <span className="text-foreground text-2xl font-bold">{totalItems}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Права частина - Результати */}
        <div className="flex-1 p-8 lg:p-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12">
              {hasValidData && (
                <div className="bg-primary/10 text-primary mb-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
                  <Check className="h-4 w-4" />
                  Розрахунок готовий
                </div>
              )}
              <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight">
                Список матеріалів
              </h2>
              <p className="text-muted-foreground mt-2">
                {hasValidData
                  ? `Рекомендована кількість для приміщення ${perimeterLength} м`
                  : 'Введіть дані зліва, щоб побачити результати'}
              </p>
            </div>

            <CalculationResults
              results={calculationResults}
              hasData={hasValidData}
              plintusImagePath={selectedPlintus?.image_path}
              plintusPrice={selectedPlintus?.price}
              plintusWeight={selectedPlintus?.weight}
              plintusLength={selectedPlintus?.length}
              plintusWidth={selectedPlintus?.width}
              plintusHeight={selectedPlintus?.height}
            />
          </div>
        </div>
      </div>
      <FooterCopyright />
    </div>
  );
}
