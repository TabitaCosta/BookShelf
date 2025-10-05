"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { getSimilarBooksByGenre } from "../../actions/aiActions"; // função que busca só pelo gênero
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface Recommendation {
  title: string;
  author: string;
  reason: string;
}

export default function AIRecommenderByGenre() {
  const [apiKey, setApiKey] = useState("");
  const [genre, setGenre] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAILoading, startAITransition] = useTransition();

  const handleGetRecommendations = () => {
    if (!apiKey) return toast.error("Adicione a chave da API!");
    if (!genre) return toast.error("Digite um gênero!");

    startAITransition(async () => {
      setRecommendations([]);
      const result = await getSimilarBooksByGenre(genre, apiKey); // Passa a chave também

      if (result.error) {
        toast.error(result.error);
      } else if (result.recommendations) {
        setRecommendations(result.recommendations);
        toast.success("Sugestões encontradas!");
      }
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Sparkles className="text-purple-500" />
            Sugestões por gênero
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 mb-4">
            <input
              type="password"
              placeholder="Chave da API"
              className="p-2 border rounded w-full"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Digite o gênero"
              className="p-2 border rounded w-full"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>

          <Button onClick={handleGetRecommendations} disabled={isAILoading} className="w-full">
            {isAILoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                A procurar...
              </>
            ) : (
              "Encontrar livros"
            )}
          </Button>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-2 pt-4">
          <h4 className="font-semibold">A IA recomenda:</h4>
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-4">
              <h5 className="font-bold">{rec.title}</h5>
              <p className="text-sm text-gray-600 mb-2">{rec.author}</p>
              <p className="text-sm italic text-gray-700">"{rec.reason}"</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
