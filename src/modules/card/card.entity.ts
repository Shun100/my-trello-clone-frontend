export class Card {
  id!: number;
  title!: string;
  position!: number;
  dueDate!: Date;
  status!: string;

  constructor(data: Card) {
    Object.assign(this, data);
  }
}