export interface BoardI {
  _id: string;
  name: string;
  description?: string;
  isFavourite?: boolean;
  owner: {
    _id: string;
    email: string;
    img: string;
  }
}
