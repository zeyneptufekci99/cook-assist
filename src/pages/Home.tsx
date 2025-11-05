import { useState } from "react";
import { generateRecipe } from "../services/openai";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const recipe = await generateRecipe(ingredients);
    setResult(recipe);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        🍳 Yemek Generate
      </h1>
      <input
        type="text"
        placeholder="Malzemeleri gir (ör. yumurta, domates)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "Hazırlanıyor..." : "Tarif Öner"}
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


