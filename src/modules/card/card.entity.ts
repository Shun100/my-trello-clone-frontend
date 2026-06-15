export class Card {
  id!: number;
  title!: string;
  position!: number;
  dueDate!: Date;
  status!: string;
  description!: string;

  constructor(data: Card) {
    Object.assign(this, data);
    this.dueDate = new Date(data.dueDate);
  }
}