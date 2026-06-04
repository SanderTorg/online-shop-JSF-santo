export interface RootObject {
  data: Product[];
  meta: Meta;
}

export interface Product {
  description: string;
  discountedPrice: number;
  id: string;
  image: Image;
  price: number;
  rating: number;
  reviews: Review[];
  tags: string[];
  title: string;
}

export interface Image {
  alt: string;
  url: string;
}

export interface Review {
  description: string;
  id: string;
  rating: number;
  username: string;
}

export interface Meta {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: null;
  pageCount: number;
  previousPage: null;
  totalCount: number;
}
