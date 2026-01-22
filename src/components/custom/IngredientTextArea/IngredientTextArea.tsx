import { useCallback, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import type { IIngredientTextArea } from './IngredientTextArea.type';
import { slugify } from '@/utils/slungify';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const IngredientsTextArea = ({
  onAddToList,
  ingredientList,
}: IIngredientTextArea) => {
  const [ingredient, setIngredient] = useState('');

  const handleAddToList = useCallback(() => {
    if (
      ingredient &&
      !ingredientList.some(
        (i) =>
          i.label.toLocaleLowerCase() === ingredient.trim().toLocaleLowerCase(),
      )
    ) {
      const item = {
        id: slugify(ingredient),
        label: ingredient.trim(),
      };
      onAddToList(item);
      setIngredient('');
    }
  }, [ingredient, ingredientList, onAddToList]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddToList();
      }
    },
    [handleAddToList],
  );

  return (
    <div className="w-full h-fit flex flex-row gap-4 items-start justify-center">
      <div className="flex flex-col gap-2">
        <Textarea
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyDown={onKeyDown}
          className="bg-white resize-none"
          placeholder="Malzeme gir (ör. yumurta, domates)"
        />
        <p className="text-muted-foreground text-xs">
          Her malzemeden sonra enter'a basınız ya da butona tıklayınız
        </p>
        {ingredientList.some(
          (i) =>
            i.label.toLocaleLowerCase() ===
            ingredient.trim().toLocaleLowerCase(),
        ) && (
          <p className="text-muted-foreground text-xs text-red-500">
            Daha önce yazdığınız malzemeyi tekrar yazamazsınız!
          </p>
        )}
      </div>
      <Button
        disabled={
          !ingredient ||
          ingredientList.some(
            (i) =>
              i.label.toLocaleLowerCase() ===
              ingredient.trim().toLocaleLowerCase(),
          )
        }
        onClick={handleAddToList}
        className="w-[60px] h-[60px] p-0 bg-orange-500"
      >
        <ArrowUp width={40} height={40} size={40}></ArrowUp>
      </Button>
    </div>
  );
};
