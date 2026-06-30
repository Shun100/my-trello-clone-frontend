import api from "../../lib/api";
import { Card } from "./card.entity";

export const cardRepository = {
  async create(
    title: string,
    laneId: string,
    position: number,
    dueDate: Date
  ): Promise<Card> {
    const result = await api.post('/cards/create', { title, laneId, position, dueDate });
    const card = result.data;
    return new Card(card);
  },

  async update (
    id: string,
    title: string,
    status: string,
    dueDate: string,
    description: string
  ): Promise<void> {
    await api.post(`/cards/update`, { id, title, status, dueDate, description });
  },

  async updatePosition (laneId: string, cards: Card[]): Promise<void> {
    const updateCardRequests = cards.map(card => ({
      cardId: card.id,
      laneId,
      position: card.position
    }));
    await api.post('/cards/update/position', updateCardRequests);
  },

  async delete (id: string): Promise<void> {
    await api.delete(`/cards/${id}`);
  }
}