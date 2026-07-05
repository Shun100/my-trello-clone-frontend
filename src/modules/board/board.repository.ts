import api from "../../lib/api";
import { Card, type CardData } from "../card/card.entity";
import { Lane, type LaneData } from "../lane/lane.entity";
import { Board } from "./board.entity";

export const boardRepository = {
  /**
   * 取得
   * @param userId 
   * @returns Promise<{ board: Board, lanes: Lane[], cards: Card[] }> 
   */
  async fetch(userId: string): Promise<{ board: Board, lanes: Lane[], cards: Card[] }> {
    const result = await api.get(`/boards/${userId}`);
    
    const boardData = result.data.board;
    console.log(JSON.stringify(boardData, null, 2));

    const lanesData = result.data.lanes ?? [];
    console.log(JSON.stringify(lanesData, null, 2));

    const cardsData = result.data.cards ?? [];
    console.log(JSON.stringify(cardsData, null, 2));
    
    return {
      board: new Board(boardData),
      lanes: lanesData.map((laneData: LaneData) => new Lane(laneData)),
      cards: cardsData.map((cardData: CardData) => new Card(cardData))
    };
  }
}