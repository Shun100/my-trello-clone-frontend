export interface LaneData {
  id: string;
  boardId: string;
  title: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Lane implements LaneData {
  id!: string;
  boardId!: string;
  title!: string;
  position!: number;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: LaneData) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}