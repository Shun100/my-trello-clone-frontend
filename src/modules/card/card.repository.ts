import api from "../../lib/api";
import { Card } from "./card.entity";

export const cardRepository = {
  create: async (title: string, laneId: string, position: number): Promise<Card> => {
    const result = await api.post('/cards/create', { title, laneId, position });
    const card = result.data;
    return new Card(card);
  }
}