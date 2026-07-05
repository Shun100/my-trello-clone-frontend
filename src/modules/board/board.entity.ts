export interface BoardData {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Board implements BoardData {
  id!: string;
  userId!: string;
  title!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: BoardData) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}