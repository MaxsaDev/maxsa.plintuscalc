'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LengthInputProps {
  value?: number;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export function LengthInput({ value, onChange, error }: LengthInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange(undefined);
      return;
    }

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="perimeter-length" className="text-foreground text-sm font-medium">
        Периметр приміщення
      </Label>
      <div className="relative">
        <Input
          id="perimeter-length"
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]*"
          placeholder="100"
          value={value ?? ''}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'length-error' : undefined}
          className="bg-background h-12 pr-12 font-bold placeholder:text-gray-200"
          style={{ fontSize: '1.875rem', fontWeight: '700' }}
        />
        <span
          className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 font-bold"
          style={{ fontSize: '1.875rem', fontWeight: '700' }}
        >
          м
        </span>
      </div>
      {error && (
        <p id="length-error" className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
