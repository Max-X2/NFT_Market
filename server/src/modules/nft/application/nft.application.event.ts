export namespace NftApplicationEvent {
  export namespace NftCreated {
    export const key = 'nft.application.nft.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
