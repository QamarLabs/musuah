export interface WikiPageRecord {
  id: string;
  _id: string;
  title: string;
  pageid: number;
  revid: number;
  url: string;
  text: string;
  summary: string;
  word_count: number;
  timestamp: any;
  attributes: { [key: string]: any };
}


export interface WikiPageRequestRecord {
  _id: string;
  newTitle: string;
  oldTitle: string;
  pageid: number;
  revid: number;
  newText: string;
  oldText: string;
  newSummary: string;
  oldSummary: string;
  new_word_count: number;
  newAttributes: { [key: string]: any }
  oldAttributes: { [key: string]: any }
  contributors: object[];
  status: string;
  timestamp: Date; // Changed from 'any' to Date type for better typing
}

export interface UpsertWikiPageRequest {
  articleId: string;
  title: string;
  pageid: number;
  revid: number;
  text: string;
  summary?: string;
  word_count: number;
  attributes: {[key:string]: any};
}

export interface DeleteWikiPageRequestRecord {
    _id: string;
    pageid: number;
    submitByUserId: string;
    title: string;
    reasonToDelete: string;
    reasonToApproveDelete: string;
    reasonToDenyDelete: string;
    judgedByUserId: string;
    judgedByUserName: string;
    timestamp: Date; // Changed from 'any' to Date type for better typing
}

export interface CreateDeleteWikiPageRequest {
  articleId: string;
  reasonToDelete: string;
}

export interface ApproveWikiPageRequest {
  id: string;
  reasonToApprove: string;
}

export interface DenyWikiPageRequest {
  id: string;
  reasonToDeny: string;
}

export interface ApproveDeleteWikiPageRequest {
  id: string;
  reasonToApproveDelete: string;
}

export interface DenyDeleteWikiPageRequest {
  id: string;
  reasonToDenyDelete: string;
}
