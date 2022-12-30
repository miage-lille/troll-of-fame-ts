export type DarkElf = { name: 'Dark Elf'; value: 1 };
export type HighElf = { name: 'High Elf'; value: 2 };
export type Race = DarkElf | HighElf;

export type Swordsman = { name: 'Swordsman'; value: 1 };
export type Archer = { name: 'Archer'; value: 2 };
export type Priest = { name: 'Priest'; value: 5 };
export type Warlock = { name: 'Warlock'; value: 4 };
export type Role = Swordsman | Archer | Priest | Warlock;

export type Elf = {
  role: Role;
  race: Race;
};
