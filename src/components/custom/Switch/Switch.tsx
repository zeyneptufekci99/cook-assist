import { Switch as SDNSwitch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { ISwitch } from './Switch.type';

export const Switch = ({
  id,
  onChange,
  label,
  labelClassName,
  switchClassName,
  value,
}: ISwitch) => {
  return (
    <div className="flex items-center gap-3">
      <SDNSwitch
        checked={value}
        className={switchClassName}
        onCheckedChange={onChange}
        id={id}
      />
      <Label className={labelClassName} htmlFor={id}>
        {label}
      </Label>
    </div>
  );
};
