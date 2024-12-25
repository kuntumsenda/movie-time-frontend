export type ModelGenre = {
  id: number;
  name?: string;
  selected?: boolean;
};

export type ModelMenu = {
  label?: string;
  icon?: string;
  items?: ModelMenu[];
  value?: any;
  route?: any;
  path?: string;
};
