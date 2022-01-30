export interface Group {
  id: string;
  name: string;
  description: string;
}

export type Item = {
  id: string;
  name: string;
  description: string;
  externalLink: string;
  isFavourite: boolean;
  locked?: boolean;
  dayString?: string;
  dateString?: string;
};

export type GeneratedList = {
  items: Item[],
  description: string;
  createdAt: number;
  expiresAt: number;
};
