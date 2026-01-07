'use client';

import { fetchPlintusList } from '@/actions/mx-data/plintus-data-action';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { PlintusData } from '@/interfaces/mx-data/plintus-data';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PlintusSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export function PlintusSelect({ value, onValueChange, error }: PlintusSelectProps) {
  const [plintusList, setPlintusList] = useState<PlintusData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadPlintusList() {
      try {
        const list = await fetchPlintusList();
        setPlintusList(list);
      } catch (error) {
        console.error('Помилка завантаження списку плинтусів:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlintusList();
  }, []);

  const selectedPlintus = plintusList.find((plintus) => plintus.id === value);

  if (isLoading) {
    return (
      <div className="bg-background border-input text-muted-foreground flex h-12 items-center gap-3 rounded-md border px-3">
        <Loader2 className="size-4 animate-spin" />
        <span className="text-base">Завантаження...</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'plintus-error' : undefined}
            className="bg-background h-12 w-full justify-between"
            style={{ fontSize: '1.875rem', fontWeight: '700' }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              {selectedPlintus
                ? `${selectedPlintus.title} (${parseFloat(selectedPlintus.length) / 1000} м)`
                : 'Оберіть модель плинтуса'}
            </span>
            <ChevronsUpDown className="ml-2 size-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Пошук моделі..." className="h-12 text-base" />
            <CommandList>
              <CommandEmpty>Модель не знайдена.</CommandEmpty>
              <CommandGroup>
                {plintusList.map((plintus) => (
                  <CommandItem
                    key={plintus.id}
                    value={`${plintus.title} ${plintus.id}`}
                    onSelect={() => {
                      onValueChange(plintus.id === value ? '' : plintus.id);
                      setOpen(false);
                    }}
                    className="text-base"
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4',
                        value === plintus.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {plintus.title} ({parseFloat(plintus.length) / 1000} м)
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <p id="plintus-error" className="text-destructive mt-1.5 text-base">
          {error}
        </p>
      )}
    </div>
  );
}
