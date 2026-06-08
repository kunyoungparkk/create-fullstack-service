export type CreateOrigin = {
  url: string;
};

export type UpdateOrigin = {
  url?: string;
  isActive?: boolean;
};

export type SearchOrigins = {
  url?: string;
  isActive?: boolean;
  pageNumber: number;
  pageSize: number;
};

export type FindOrigins = SearchOrigins;

export type OriginRes = {
  id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
};

export type OriginsRes = {
  origins: OriginRes[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};
