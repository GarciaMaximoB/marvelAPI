export interface IComic {
  id: number;
  title: string;
  description: string;
  sale_date: string;
  characters: {
    available: number;
    items: {
      name: string;
      resourceURI: string;
    }[];
  };
  pageCount: number;
  thumbnail: { path: string; extension: string };
  source: string;
}

export interface ICharacter {
  id: number;
  name: string;
}
