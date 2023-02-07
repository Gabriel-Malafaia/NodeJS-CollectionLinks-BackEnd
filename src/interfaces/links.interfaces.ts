export interface ICreateLinks {
  title: string;
  url: string;
}

export interface IEditLinks {
  title?: string;
  url?: string;
}

export interface IShowLinks {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
