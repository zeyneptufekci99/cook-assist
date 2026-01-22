export async function generateRecipe(ingredients: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Groq API key is missing. Please add VITE_GROQ_API_KEY to your .env file. Get your free API key from https://console.groq.com/keys"
    );
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Ücretsiz ve güçlü model (güncel)
        messages: [
          { role: "system", content: "Sen yaratıcı bir şefsinsin." },
          { role: "user", content: `Şu malzemelerle bir yemek öner: ${ingredients}` },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Groq API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Unexpected response format from Groq API");
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while generating the recipe");
  }
}
