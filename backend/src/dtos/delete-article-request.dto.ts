
export class DeleteArticleRequestDto {
    articleId: string;
    pageid?: number;
    submitByUserId?: string;    
    title?: string;
    reasonToDelete: string;
    reasonToApproveDelete?: string;
    reasonToDenyDelete?: string;
    judgedByUserId?: string;
    judgedByUserName?: string;
    timestamp?: Date; // Changed from 'any' to Date type for better typing
}