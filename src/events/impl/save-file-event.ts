export class SaveFileEvent {
  constructor(public readonly userId: string, public readonly image: Buffer) {}
}
