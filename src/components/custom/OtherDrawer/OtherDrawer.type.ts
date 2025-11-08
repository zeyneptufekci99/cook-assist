export interface IOtherDrawer {
  oilList: IOtherDrawerCheckboxItem[];
  flourList: IOtherDrawerCheckboxItem[];
  spiceList: IOtherDrawerCheckboxItem[];
  isSaltChecked: boolean;
  onChangeOilList: (list: IOtherDrawerCheckboxItem[]) => void;
  onChangeFlourList: (list: IOtherDrawerCheckboxItem[]) => void;
  onChangeSpiceList: (list: IOtherDrawerCheckboxItem[]) => void;
  onChangeSalt: (checked: boolean) => void;
}

export interface IOtherDrawerCheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}
