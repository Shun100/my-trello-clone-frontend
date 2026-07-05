import { atom } from 'jotai';
import type { Board } from '../board/board.entity';

export const boardAtom = atom<Board>();