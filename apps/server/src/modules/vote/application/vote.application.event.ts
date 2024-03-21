export namespace VoteApplicationEvent {
  export namespace VoteCreated {
    export const key = 'vote.application.vote.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
