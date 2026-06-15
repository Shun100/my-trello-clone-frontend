import api from "../../lib/api";
import { Card } from "./card.entity";

export const cardRepository = {
  create: async (title: string, laneId: string, position: number, dueDate: Date): Promise<Card> => {
    const result = await api.post('/cards/create', { title, laneId, position, dueDate });
    const card = result.data;
    return new Card(card);
  }
}