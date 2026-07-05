export interface CardData {
  id: string ;
  laneId: string;
  title: string;
  position: number;
  dueDate: Date;
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Card implements CardData {
  id!: string;
  laneId!: string;
  title!: string;
  position!: number;
  dueDate!: Date;
  status!: string;
  description!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: CardData) {
    Object.assign(this, data);
    this.dueDate = new Date(data.dueDate);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}