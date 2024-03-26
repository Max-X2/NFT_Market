export namespace CommentApplicationEvent {
  export namespace CommentCreated {
    export const key = 'comment.application.comment.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
