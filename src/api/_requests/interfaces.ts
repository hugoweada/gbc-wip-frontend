export interface RequestResult<T> {
  result: T | null;
}

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  correlationId: string;
};

export type HttpError = {
  status: number;
  message: string;
};

export function isObject<T>(x: unknown): x is T {
  return x != null && typeof x === 'object';
}

export function isRequestResult<T = unknown>(x: unknown): x is RequestResult<T> {
  return isObject<RequestResult<T>>(x) && 'result' in x;
}

export function isProblemDetails(x: unknown): x is ProblemDetails {
  return (
    isObject<ProblemDetails>(x) &&
    'title' in x &&
    'status' in x &&
    'detail' in x &&
    'correlationId' in x &&
    'detail' in x
  );
}

export function isHttpError(x: unknown): x is HttpError {
  return (
    isObject<HttpError>(x) &&
    typeof (x as any).message === 'string' &&
    !('type' in x && 'title' in x) // Optional: ensure it is not a ProblemDetails
  );
}
