export namespace PostDataApplicationEvent {
  export namespace PostDataCreated {
    export const key = 'postData.application.postData.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
