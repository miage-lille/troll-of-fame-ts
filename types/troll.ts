import type { Elf } from './elf';

export type Kill = {
  elf: Elf;
  count: number;
};

export type Troll = {
  name: string;
  kills: Kill[];
};
