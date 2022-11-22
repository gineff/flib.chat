import { APIError } from "api/types";

export function apiHasError(response: unknown): response is APIError {
  return response && response.reason;
}
