import type { IOtherDrawer } from './OtherDrawer.type';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { Checkbox } from '../Checkbox/Checkbox';

import { Switch } from '../Switch/Switch';
import { useCallback } from 'react';

export const OtherDrawer = ({
  oilList,
  flourList,
  spiceList,
  isSaltChecked,
  onChangeOilList,
  onChangeFlourList,
  onChangeSpiceList,
  onChangeSalt,
}: IOtherDrawer) => {
  const handleChange = useCallback(
    (id: string, value: boolean, type: 'oil' | 'flour' | 'spice') => {
      switch (type) {
        case 'flour':
          {
            const tempList = flourList.map((item) => {
              if (id == item.id) {
                return {
                  ...item,
                  checked: value,
                };
              } else {
                return { ...item };
              }
            });
            onChangeFlourList(tempList);
          }
          break;
        case 'spice':
          {
            const tempList = spiceList.map((item) => {
              if (id == item.id) {
                return {
                  ...item,
                  checked: value,
                };
              } else {
                return { ...item };
              }
            });
            onChangeSpiceList(tempList);
          }
          break;
        case 'oil':
          {
            const tempList = oilList.map((item) => {
              if (id == item.id) {
                return {
                  ...item,
                  checked: value,
                };
              } else {
                return { ...item };
              }
            });
            onChangeOilList(tempList);
          }
          break;
      }
    },
    [
      flourList,
      oilList,
      onChangeFlourList,
      onChangeOilList,
      onChangeSpiceList,
      spiceList,
    ]
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full h-fit bg-orange-500 text-white"
          variant="outline"
        >
          Eğer belirtmek istediğiniz un,baharat,tuz ve yağ çeşidi varsa seçmek
          için tıklayınız.
        </Button>
      </SheetTrigger>
      <SheetContent className="[&>button]:hidden" side="left">
        <SheetHeader className="mb-4">
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
          <SheetTitle className="text-4xl text-orange-500">
            Temel Öğeler
          </SheetTitle>
          <SheetDescription>
            Tuz, baharat, yağ ve un çeşitlerinizi seçiniz.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col items-start justify-center gap-4">
          <div>
            <Switch
              value={isSaltChecked}
              switchClassName="data-[state=checked]:bg-emerald-800"
              labelClassName="text-emerald-800"
              id="salt"
              label="Tuzum var"
              onChange={onChangeSalt}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="text-red-400 text-lg">Yağ Listesi</div>
            <div className="grid grid-cols-2  gap-4">
              {oilList.map((item) => (
                <Checkbox
                  key={item.id}
                  checked={item.checked}
                  checkboxClassName="border-yellow-800 data-[state=checked]:bg-yellow-800 data-[state=checked]:border-yellow-800"
                  labelClassName="text-yellow-800"
                  id={item.id}
                  label={item.label}
                  onChange={(value) => handleChange(item.id, value, 'oil')}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="text-red-400 text-lg">Un Listesi</div>
              <div className="grid grid-cols-2  gap-4">
                {flourList.map((item) => (
                  <Checkbox
                    key={item.id}
                    checked={item.checked}
                    checkboxClassName="border-pink-800 data-[state=checked]:bg-pink-800 data-[state=checked]:border-pink-800"
                    labelClassName="text-pink-800"
                    id={item.id}
                    label={item.label}
                    onChange={(value) => handleChange(item.id, value, 'flour')}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="text-red-400 text-lg">Baharat Listesi</div>
              <div className="grid grid-cols-2  gap-4">
                {spiceList.map((item) => (
                  <Checkbox
                    key={item.id}
                    checked={item.checked}
                    checkboxClassName="border-indigo-800 data-[state=checked]:bg-indigo-800 data-[state=checked]:border-indigo-800"
                    labelClassName="text-indigo-800"
                    id={item.id}
                    label={item.label}
                    onChange={(value) => handleChange(item.id, value, 'spice')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button className="bg-orange-500 text-white">Submit</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
