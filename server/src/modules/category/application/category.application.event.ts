export namespace CategoryApplicationEvent {
  export namespace CategoryCreated {
    export const key = 'category.application.category.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
