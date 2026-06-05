import type { Card } from "../card/card.entity";

export class Lane {
  id!: string;
  title!: string;
  position!: number;
  cards: Card[] = [];

  constructor(data: Lane) {
    Object.assign(this, data);
  }
}