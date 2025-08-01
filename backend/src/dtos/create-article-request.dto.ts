
export class CreateArticleRequestDto {
  articleId: string;
  
  title: string;

  pageid: number;

  revid: number;


  text: string;

  summary?: string;

  word_count: number;

  attributes: {[key:string]: any};

}