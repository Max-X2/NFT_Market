export namespace ProductApplicationEvent {
  export namespace ProductCreated {
    export const key = 'product.application.product.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
