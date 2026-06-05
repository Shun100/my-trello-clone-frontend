import type { Lane } from "../lane/lane.entity";

export class Board {
  id!: string;
  title!: string;
  lanes!: Lane[];

  constructor(data: Board) {
    Object.assign(this, data);
  }
}