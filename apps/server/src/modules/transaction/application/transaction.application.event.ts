export namespace TransactionApplicationEvent {
  export namespace TransactionCreated {
    export const key = 'transaction.application.transaction.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
