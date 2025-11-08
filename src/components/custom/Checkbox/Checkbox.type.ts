export interface ICheckbox {
  id: string;
  label: string;
  labelClassName?: string;
  onChange: (checked: boolean) => void;
  checkboxClassName?: string;
  checked: boolean;
}
