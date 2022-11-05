import { APIError } from "api/types";

export function hasError(response: unknown): response is APIError {
  return response && response.reason;
}
