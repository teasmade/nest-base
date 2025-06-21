export class MessageSendEvent {
  constructor(
    public readonly templateId: string,
    public readonly recipient: string,
    public readonly data: Record<string, any>,
    public readonly triggerMetadata: Record<string, any>,
  ) {}
}
