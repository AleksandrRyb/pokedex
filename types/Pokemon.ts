export interface NameUrlPair {
  name: string;
  url: string;
}

interface Ability extends NameUrlPair {
  is_hidden: boolean;
  slot: number;
}

interface Move extends NameUrlPair {}

interface Form extends NameUrlPair {}

interface Species extends NameUrlPair {}

interface Sprites {
  back_default: string;
  back_female: null | string;
  back_shiny: string;
  back_shiny_female: null | string;
  front_default: string;
  front_female: null | string;
  front_shiny: string;
  front_shiny_female: null | string;
  other: {
    dream_world: {
      front_default: string;
      front_female: null | string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
  versions: GenerationSprites;
}

interface GenerationSprites {
  [key: string]: VersionSprites;
}

interface VersionSprites {
  [key: string]: {
    back_default: string;
    back_gray: string;
    front_default: string;
    front_gray: string;
    back_shiny?: string;
    front_shiny?: string;
  };
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: {
    game_index: number;
    version: NameUrlPair;
  }[];
  height: number;
  held_items: {
    item: NameUrlPair;
    version_details: {
      rarity: number;
      version: NameUrlPair;
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: Move;
    version_group_details: {
      level_learned_at: number;
      version_group: NameUrlPair;
      move_learn_method: NameUrlPair;
    }[];
  }[];
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats: {
    base_stat: number;
    effort: number;
    stat: NameUrlPair;
  }[];
  types: {
    slot: number;
    type: NameUrlPair;
  }[];
  weight: number;
}
