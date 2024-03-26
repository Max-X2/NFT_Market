export namespace MarketplaceApplicationEvent {
  export namespace MarketplaceCreated {
    export const key = 'marketplace.application.marketplace.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
