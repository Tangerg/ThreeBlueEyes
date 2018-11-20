export default class ArticleInfo {
  constructor({id, title, summary, authorId, author, viewNum, commentNum, starNum, createBy, pictureUrl}) {
    this.id = id
    this.title = title
    this.summary = summary
    this.authorId = authorId
    this.author = author
    this.viewNum = viewNum
    this.commentNum = commentNum
    this.starNum = starNum
    this.createBy = createBy
    this.pictureUrl = pictureUrl
  }
}

export function createArticleInfo(articleInfo) {
  return new ArticleInfo({
    id: articleInfo.id,
    title: articleInfo.title,
    summary: articleInfo.summary,
    authorId: articleInfo.authorId,
    author: articleInfo.author,
    viewNum: articleInfo.viewNum,
    commentNum: articleInfo.commentNum,
    starNum: articleInfo.starNum,
    createBy: articleInfo.createBy.substring(0, 10),
    pictureUrl: articleInfo.pictureUrl,
  })
}
