export interface WikiPageSearchResult {
  id: string;
  title: string;
  pageid: number;
  summary: string;
  timestamp: any;
}

export interface QueriedAutoCompleteValue<T> {
  text: string;
  value: T;
  primaryTopic?: string;
  publicationYear?: number | undefined;
  author?: string;
  timestamp: any;
}