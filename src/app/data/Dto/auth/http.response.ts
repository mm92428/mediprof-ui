export interface HttpResponse<T = null> {
  message: string | null;
  statusCode: number | null;
  data: T;
}
