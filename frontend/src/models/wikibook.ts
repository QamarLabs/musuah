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

export interface WikiBookRecord {
    _id: string;
    title: string;
    displayName: string | undefined;
    description: string | undefined;
    publicationYear: number;
    publicationDate: Date;
    authors: WikiBookAuthor[];
    sourceUrl: string | undefined;
    concepts: string[];
    primaryTopic: string | undefined;
    openStudy: boolean;
    language: string;
    locations: WikiBookLocation[];
}

export interface DeleteWikiBookRequest {
    _id: string;
    bookId: string | undefined;
    submitByUserId: string | undefined;
    title: string | undefined;
    reasonToDelete: string | undefined;
    reasonToApproveDelete: string | undefined;
    reasonToDenyDelete: string | undefined;
    judgedByUserId: string | undefined;
    judgedByUserName: string | undefined;
    timestamp: Date;
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

