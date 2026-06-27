import { atom } from "jotai";
import { Lane } from "./lane.entity";

export const laneAtom = atom<Lane[]>([]); 