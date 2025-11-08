import { Badge } from '../Badge/Badge';
import type { IIngredientsContainer } from './IngredientsContainer.type';

const colorClasses = [
  'bg-red-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-indigo-400',
  'bg-teal-400',
  'bg-orange-400',
  'bg-cyan-400',
  'bg-emerald-400',
  'bg-amber-400',
];

export const IngredientsContainer = ({
  ingredientList,
  onClickClose,
}: IIngredientsContainer) => {
  return (
    <div className="w-full flex flex-row flex-wrap gap-x-1 gap-y-1 bg-white p-4 shadow-lg rounded-2xl min-h-28 h-fit max-h-96 overflow-y-auto">
      {ingredientList.length > 0 ? (
        <>
          {ingredientList.map((item, index) => {
            const colorClass = colorClasses[index % colorClasses.length];
            return (
              <Badge
                isCloseActive
                key={item.id}
                label={item.label}
                onClose={() => onClickClose(item.id)}
                className={`${colorClass} h-fit rounded-xl`}
              />
            );
          })}
        </>
      ) : (
        <div className="text-muted-foreground">
          Henüz hiç malzemeniz bulunmuyor
        </div>
      )}
    </div>
  );
};
