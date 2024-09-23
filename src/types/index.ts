export interface IComic {
  id: number;
  title: string;
  description: string;
  sale_date: string;
  characters: [];
  pageCount: number;
  thumbnail: { path: string; extension: string };
  source: string;
}
