export interface WikiPage {
  id: string;
  title: string;
  pageid: number;
  revid: number;
  url: string;
  text: string;
  summary: string;
  word_count: number;
  timestamp: any;
}

export interface ListResults<T> {
  results: T[];
}


export interface CreateDeleteArticleRequest {
  articleId: string;
  reasonToDelete: string;
}

export interface ApproveDeleteArticleRequest {
  id: string;
  reasonToApproveDelete: string;
}

export interface DenyDeleteArticleRequest {
  id: string;
  reasonToDenyDelete: string;
}