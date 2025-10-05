"use server";

// Interface para a estrutura da resposta que esperamos da IA
interface Recommendation {
  title: string;
  author: string;
  reason: string;
}

/**
 * Server Action que chama a API Gemini para obter recomendações de livros
 * com base no gênero informado.
 * @param genre O gênero dos livros desejados.
 * @param apiKey A chave da API Gemini.
 * @returns Um objeto com as recomendações ou uma mensagem de erro.
 */
export async function getSimilarBooksByGenre(
  genre: string,
  apiKey: string
): Promise<{ recommendations?: Recommendation[]; error?: string }> {
  if (!genre) {
    return { error: "O gênero é obrigatório." };
  }
  if (!apiKey) {
    return { error: "A chave da API é obrigatória." };
  }

  const fullPrompt = `
    Recomendação de 3 livros do gênero "${genre}".
    Para cada livro, forneça:
      - título
      - autor
      - uma breve razão (uma frase) explicando por que o livro é recomendado.
    Responda no formato JSON como um array de objetos.
  `;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: fullPrompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            author: { type: "STRING" },
            reason: { type: "STRING" },
          },
          required: ["title", "author", "reason"],
        },
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("API Error Response:", await response.text());
      return { error: "Não foi possível obter recomendações da IA." };
    }

    const result = await response.json();
    const recommendationsText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!recommendationsText) {
      return { error: "A IA retornou uma resposta vazia." };
    }

    const recommendations: Recommendation[] = JSON.parse(recommendationsText);
    return { recommendations };
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return { error: "Ocorreu um erro de rede. Por favor, tente novamente." };
  }
}
