export interface WikiPageRecord {
  id: string;
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
  contributors: string[];
  status: string;
  timestamp: Date; // Changed from 'any' to Date type for better typing
}

export interface DeleteWikiPageRequestRecord {
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

export interface ApproveDeleteWikiPageRequest {
  id: string;
  reasonToApproveDelete: string;
}

export interface DenyDeleteWikiPageRequest {
  id: string;
  reasonToDenyDelete: string;
}