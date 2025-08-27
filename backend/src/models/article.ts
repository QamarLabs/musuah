export interface WikiPage {
  _id: string;
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

export interface ApproveArticleRequest {
  id: string;
  reasonToApprove: string;
}

export interface DenyArticleRequest {
  id: string;
  reasonToDeny: string;
}

export interface ApproveDeleteArticleRequest {
  id: string;
  reasonToApproveDelete: string;
}

export interface DenyDeleteArticleRequest {
  id: string;
  reasonToDenyDelete: string;
}