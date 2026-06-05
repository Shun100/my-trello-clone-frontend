import api from "../../lib/api";
import { Lane } from "./lane.entity";

export const laneRepository = {
  async create(boardId: string, title: string, position: number): Promise<Lane> {
    const result = await api.post('/lane/create', { boardId, title, position });
    const lane = result.data;
    console.table(lane);
    return new Lane(lane);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/lanes/${id}`);
  }
}