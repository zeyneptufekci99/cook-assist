export interface ISwitch {
  id: string;
  label: string;
  labelClassName?: string;
  switchClassName?: string;
  onChange: (checked: boolean) => void;
  value: boolean;
}
