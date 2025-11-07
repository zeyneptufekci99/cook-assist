import { generateRecipe } from '../services/openai';
import { IngredientsContainer } from '@/components/IngredientsContainer/IngredientsContainer';
import { IngredientsTextArea } from '@/components/IngredientTextArea/IngredientTextArea';
import type { IIngredient } from '@/components/IngredientsContainer/IngredientsContainer.type';
import { useState } from 'react';

export default function Home() {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // const recipe = await generateRecipe(ingredients);

    setTimeout(() => {
      console.log('deneme');
      setResult('result');
      setLoading(false);
    }, 2000);
    // setResult(recipe);
  };

  const handleAddToList = (item: IIngredient) => {
    setIngredients([...ingredients, item]);
  };

  const deleteIngredient = (id: string) => {
    setIngredients(
      ingredients.filter((ingredient: IIngredient) => ingredient.id !== id)
    );
  };

  return (
    <div className="flex flex-col gap-5 items-center h-full bg-orange-50 p-6 w-full">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        🍳 Yemek Generate
      </h1>
      <IngredientsContainer
        ingredientList={ingredients}
        onClickClose={deleteIngredient}
      />
      <IngredientsTextArea onAddToList={handleAddToList} />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? 'Hazırlanıyor...' : 'Tarif Öner'}
      </button>

      {result && (
        <div className="mt-6 max-w-2xl bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Tarif:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
