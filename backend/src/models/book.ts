export interface WikiBookSearchResult {
    _id: string;
    displayName: string;
    description: string;
    author: string;
    publicationDate: Date;
    primaryTopic: string;
}

interface WikiBookAuthorInstitution {
    display_name: string | undefined;
    ror: string | undefined;
    country_code: string | undefined;
}

export interface WikiBookAuthor {
    name: string;
    institutions: WikiBookAuthorInstitution[]
}

export interface WikiBookLocation {
    pdfUrl: string | undefined;
    name: string | undefined;
    isOpenAccess: boolean | undefined;
    orgName: string | undefined;
}

export interface WikiBook {
  title: string;

  displayName: string;

  publicationYear: number;

  publicationDate: Date;

  authors: WikiBookAuthor[];

  sourceUrl: string |  undefined;

  concepts: string[];

  primaryTopic: string |  undefined;

  openStudy: boolean |  undefined;

  locations: WikiBookLocation[];

  description: string |  undefined;
}

export interface CreateDeleteWikiBookRequest {
    bookId: string;
    reasonToDelete: string;
}

export interface ApproveDeleteWikiBookRequest {
    id: string;
    reasonToApproveDelete: string;
}

export interface DenyDeleteWikiBookRequest {
    id: string;
    reasonToDenyDelete: string;
}