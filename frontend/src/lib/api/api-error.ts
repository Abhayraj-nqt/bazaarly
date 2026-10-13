export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public requestId?: string,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}
