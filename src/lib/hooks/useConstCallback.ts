import { useState, useRef } from "react";
import { Parameters } from "tsafe/Parameters";
/**
 * See https://github.com/garronej/powerhooks#useconstcallback for details
 */
export function useConstCallback<
  T extends ((...args: any[]) => unknown) | undefined | null,
>(callback: NonNullable<T>): T {
  const callbackRef = useRef<typeof callback>(null as any);

  callbackRef.current = callback;

  return useState(
    () =>
      (...args: Parameters<T>) =>
        callbackRef.current(...args),
  )[0] as T;
}
