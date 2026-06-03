import { atom } from 'jotai';

export type Constants = {
  cardStatus: string[];
};

export const constantsAtom = atom<Constants | null>(null);