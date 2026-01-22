import {
  IngredientsContainer,
  IngredientsTextArea,
  type IIngredient,
} from '@/components/custom';
import { generateRecipe } from '../services/openai';

import { useState } from 'react';

export default function Home() {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  // const [oil, setOil] = useState<IOtherDrawerCheckboxItem[]>(() => {
  //   return oilList.map((item) => {
  //     return {
  //       id: item.id,
  //       label: item.label,
  //       checked: true,
  //     };
  //   });
  // });
  // const [flour, setFlour] = useState<IOtherDrawerCheckboxItem[]>(() => {
  //   return flourList.map((item) => {
  //     return {
  //       id: item.id,
  //       label: item.label,
  //       checked: true,
  //     };
  //   });
  // });
  // const [spice, setSpice] = useState<IOtherDrawerCheckboxItem[]>(() => {
  //   return spiceList.map((item) => {
  //     return {
  //       id: item.id,
  //       label: item.label,
  //       checked: true,
  //     };
  //   });
  // });

  // const [salt, setSalt] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult('');

    try {
      // Collect all ingredients
      const allIngredients: string[] = [];

      // Add user-added ingredients
      ingredients.forEach((ing) => {
        allIngredients.push(ing.label);
      });

      // Add selected oils
      // oil
      //   .filter((item) => item.checked)
      //   .forEach((item) => {
      //     allIngredients.push(item.label);
      //   });

      // Add selected flours
      // flour
      //   .filter((item) => item.checked)
      //   .forEach((item) => {
      //     allIngredients.push(item.label);
      //   });

      // Add selected spices
      // spice
      //   .filter((item) => item.checked)
      //   .forEach((item) => {
      //     allIngredients.push(item.label);
      //   });

      // Add salt if checked
      // if (salt) {
      //   allIngredients.push('tuz');
      // }

      if (allIngredients.length === 0) {
        setError('Lütfen en az bir malzeme ekleyin.');
        setLoading(false);
        return;
      }

      // Convert to string
      const ingredientsString = allIngredients.join(', ');

      // Generate recipe
      const recipe = await generateRecipe(ingredientsString);
      setResult(recipe);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Tarif oluşturulurken bir hata oluştu.';
      setError(errorMessage);
      console.error('Error generating recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = (item: IIngredient) => {
    setIngredients([...ingredients, item]);
  };

  const deleteIngredient = (id: string) => {
    setIngredients(
      ingredients.filter((ingredient: IIngredient) => ingredient.id !== id),
    );
  };

  return (
    <div className="flex flex-col gap-5 items-center h-full bg-orange-50 p-6 w-full">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        🍳 Cook Assist
      </h1>
      <IngredientsContainer
        ingredientList={ingredients}
        onClickClose={deleteIngredient}
      />
      <IngredientsTextArea
        ingredientList={ingredients}
        onAddToList={handleAddToList}
      />
      {/* <div className="text-md text-black flex flex-row gap-2">
        <OtherDrawer
          oilList={oil}
          flourList={flour}
          spiceList={spice}
          isSaltChecked={salt}
          onChangeFlourList={(list) => setFlour(list)}
          onChangeOilList={(list) => setOil(list)}
          onChangeSpiceList={(list) => setSpice(list)}
          onChangeSalt={(value) => setSalt(value)}
        />
      </div> */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? 'Hazırlanıyor...' : 'Tarif Öner'}
      </button>

      {error && (
        <div className="mt-6 max-w-2xl bg-red-50 border border-red-200 text-red-800 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Hata:</h2>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 max-w-2xl bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Tarif:</h2>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
