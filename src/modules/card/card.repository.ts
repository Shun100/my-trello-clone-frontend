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
    console.log(JSON.stringify(result, null, 2));
    const card = result.data;
    return new Card(card);
  },

  async update (card: Card): Promise<void> {
    const data = {
      id:card.id,
      title:card.title,
      status: card.status,
      dueDate: card.dueDate,
      description: card.description
    };
    console.log(data);
    await api.post(`/cards/update`, data);
  },

  async updatePosition(updatePositionRequests: {
    cardId: string,
    laneId: string,
    position: number
  }[]): Promise<void> {
    await api.post('/cards/update/position', updatePositionRequests);
  },

  async delete (id: string): Promise<void> {
    await api.delete(`/cards/${id}`);
  }
}