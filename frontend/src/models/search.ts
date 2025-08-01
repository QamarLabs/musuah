
export interface QueriedAutocompleteOption {
    text: string;
    primaryTopic?: string;
    publicationYear?: number | undefined;
    author?: string;
    value: number;
}

export interface WikiPageSearchResult {
    id: string;
    title: string;
    pageid: number;
    summary: string;
    timestamp: any;
}

export interface WikiBookSearchResult {
    _id: string;
    displayName: string;
    description: string;
    author: string;
    publicationDate: Date;
    primaryTopic: string;
}