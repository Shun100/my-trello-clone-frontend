import api from "../../lib/api";
import { Card } from "./card.entity";

export const cardRepository = {
  create: async (title: string): Promise<Card> => {
    const result = await api.post('hoge', { title });
    const card = result.data;
    return new Card(card);
  }
}