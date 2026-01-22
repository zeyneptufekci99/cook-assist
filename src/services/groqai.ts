export async function generateRecipe(
  ingredients: string,
  requestDifferentRecipe: boolean = false,
): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Groq API key is missing. Please add VITE_GROQ_API_KEY to your .env file. Get your free API key from https://console.groq.com/keys',
    );
  }

  const systemPrompt = `Sen yaratıcı ve deneyimli bir şefsin. Verilen malzemelerle farklı, ilginç ve lezzetli tarifler öneriyorsun. 
Her seferinde farklı bir yaklaşım kullanıyorsun - bazen geleneksel, bazen modern, bazen farklı mutfak kültürlerinden esinleniyorsun.
Aynı malzemelerle bile her seferinde farklı bir tarif öneriyorsun. Tariflerini detaylı, anlaşılır ve adım adım açıklıyorsun.`;

  const userPrompt = requestDifferentRecipe
    ? `Aşağıdaki malzemelerle DAHA ÖNCE ÖNERMEDİĞİN, TAMAMEN FARKLI ve YARATICI bir yemek tarifi öner. Farklı bir mutfak tarzı, farklı bir pişirme yöntemi veya farklı bir sunum şekli kullan. Malzemeler: ${ingredients}`
    : `Aşağıdaki malzemelerle yaratıcı, lezzetli ve pratik bir yemek tarifi öner. Tarifi detaylı ve adım adım açıkla. Malzemeler: ${ingredients}`;

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Ücretsiz ve güçlü model (güncel)
          temperature: 0.9, // Yaratıcılık için yüksek temperature
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
          `Groq API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected response format from Groq API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating the recipe');
  }
}
