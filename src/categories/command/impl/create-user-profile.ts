export class CreateUserProfileCommand {
  constructor(public readonly userId: string, public readonly image: Buffer) {}
}
