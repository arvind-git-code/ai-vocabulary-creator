/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}
