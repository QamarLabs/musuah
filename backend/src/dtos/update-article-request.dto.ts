
export class UpdateArticleRequestDto {
  articleId: string;

  title: string;

  pageid: number;

  revid: number;

  text: string;

  summary?: string;

  word_count: number;

  attributes: {[key:string]: any};

  status: "pending" | "approved" | "denied";
}