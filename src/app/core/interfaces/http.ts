export interface IRegistration {
  firstName: string
  lastName: string
  username: string
  password: string
}

export interface ILogin{
  username: string;
  password: string;
}
export interface IProducts {
  id: 1;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  popular: boolean;
}
