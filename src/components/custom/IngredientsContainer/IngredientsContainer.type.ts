export interface IIngredientsContainer {
  ingredientList: IIngredient[];
  onClickClose: (id: string) => void;
}

export interface IIngredient {
  label: string;
  id: string;
}
