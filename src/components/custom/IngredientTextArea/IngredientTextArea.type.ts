import type { IIngredient } from '../IngredientsContainer/IngredientsContainer.type';

export interface IIngredientTextArea {
  onAddToList: (item: IIngredient) => void;
}
