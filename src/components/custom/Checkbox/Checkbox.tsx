import { Checkbox as SDNCheckbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { ICheckbox } from './Checkbox.type';

export const Checkbox = ({
  id,
  onChange,
  label,
  labelClassName,
  checkboxClassName,
  checked,
}: ICheckbox) => {
  return (
    <div className="flex items-center gap-3">
      <SDNCheckbox
        checked={checked}
        className={checkboxClassName}
        onCheckedChange={onChange}
        id={id}
      />
      <Label className={labelClassName} htmlFor={id}>
        {label}
      </Label>
    </div>
  );
};
