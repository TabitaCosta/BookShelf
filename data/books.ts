export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages?: number;
  rating: number;
  synopsis?: string;
  cover?: string;
  status?: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";
};

export const books: Book[] = [
  // Literatura Brasileira
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: "Literatura Brasileira",
    year: 1899,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148153238-292-292/58469.jpg?v=638144271180800000",
  },

  // Ficção Científica
  {
    id: "2",
    title: "Neuromancer",
    author: "William Gibson",
    genre: "Ficção Científica",
    year: 1984,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/149479003-292-292/46334505.jpg?v=638156076595170000",
  },

  // Realismo Mágico
  {
    id: "3",
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    genre: "Realismo Mágico",
    year: 1967,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148152697-1000-1000/53042.jpg?v=638144270541170000",
  },

  // Ficção
  {
    id: "4",
    title: "O Estrangeiro",
    author: "Albert Camus",
    genre: "Ficção",
    year: 1942,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/150884821-300-300/156646.jpg?v=638168116947370000", // sem capa → fallback
  },

  // Fantasia
  {
    id: "5",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    year: 1954,
    rating: 5,
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo0DqLMMFiGmOUFVT8YrIfo7q--wjGmI_dQ&s",
  },

  // Romance
  {
    id: "6",
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/153286818-300-300/2112313579.jpg?v=638193183207470000",
  },

  // Biografia
  {
    id: "7",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biografia",
    year: 2011,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/151563159-1000-1000/2112329868.jpg?v=638181061222200000",
  },

  // História
  {
    id: "8",
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    genre: "História",
    year: 2011,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/156526093-1000-1000/2112366453.jpg?v=638872968300100000",
  },

  // Autoajuda
  {
    id: "9",
    title: "O Poder do Hábito",
    author: "Charles Duhigg",
    genre: "Autoajuda",
    year: 2012,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/150261323-300-300/30351365.jpg?v=638163805465000000",
  },

  // Tecnologia
  {
    id: "10",
    title: "The Innovators",
    author: "Walter Isaacson",
    genre: "Tecnologia",
    year: 2014,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/154383299-292-292/2010447109.jpg?v=638200208079630000",
  },

  // Programação
  {
    id: "11",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programação",
    year: 2008,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148174238-1000-1000/29802936.jpg?v=638144289804100000",
  },

  {
    id: "12",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    genre: "Programação",
    year: 1994,
    rating: 5,
    cover: "https://m.media-amazon.com/images/I/51nL96Abi1L._SY445_SX342_.jpg",
  },

  // Negócios
  {
    id: "13",
    title: "A Estratégia do Oceano Azul",
    author: "W. Chan Kim, Renée Mauborgne",
    genre: "Negócios",
    year: 2005,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148193200-300-300/2111985333.jpg?v=638144322202700000",
  },

  // Psicologia
  {
    id: "14",
    title: "Rápido e Devagar: Duas Formas de Pensar",
    author: "Daniel Kahneman",
    genre: "Psicologia",
    year: 2011,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/151187264-300-300/30142671.jpg?v=638173521006830000",
  },

  // Filosofia
  {
    id: "15",
    title: "A República",
    author: "Platão",
    genre: "Filosofia",
    year: -380,
    rating: 5,
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1K1HliA4i3lHAVuwmmgHUo1pITK2-6k9RQ&s",
  },

  // Poesia
  {
    id: "16",
    title: "As Flores do Mal",
    author: "Charles Baudelaire",
    genre: "Poesia",
    year: 1857,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148171437-300-300/29444339.jpg?v=638144287486930000",
  },

  {
    id: "17",
    title: "Ensaio sobre a Cegueira",
    author: "José Saramago",
    genre: "Ficção",
    year: 1995,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/150910056-300-300/2112266061.jpg?v=638168973393330000",
  },
  {
    id: "18",
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    genre: "Fantasia",
    year: 1997,
    rating: 5,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/153141245-300-300/46583624.jpg?v=638192283269800000",
  },
  {
    id: "19",
    title: "O Alquimista",
    author: "Paulo Coelho",
    genre: "Romance",
    year: 1988,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148183165-300-300/46567899.jpg?v=638144306343500000",
  },
  {
    id: "20",
    title: "Mindset: A Nova Psicologia do Sucesso",
    author: "Carol S. Dweck",
    genre: "Psicologia",
    year: 2006,
    rating: 4,
    cover:
      "https://livrariacultura.vteximg.com.br/arquivos/ids/148181713-300-300/46439767.jpg?v=638144304369500000",
  },
];
