import api from "../../lib/api";
import { Card } from "./card.entity";

export const cardRepository = {
  create: async (title: string, laneId: string, position: number, dueDate: Date): Promise<Card> => {
    const result = await api.post('/cards/create', { title, laneId, position, dueDate });
    const card = result.data;
    return new Card(card);
  },

  update: async (id: string, title: string, status: string, dueDate: string, description: string): Promise<void> => {
    await api.post(`/cards/update`, { id, title, status, dueDate, description });
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/cards/${id}`);
  }
}