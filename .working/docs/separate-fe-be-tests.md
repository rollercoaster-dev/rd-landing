# Task: Separate Frontend and Backend Test Execution

**Goal:** Configure the project to run frontend tests using Vitest (with a browser-like environment) and backend tests using Bun's native test runner (`bun test`). This allows each part to be tested with the appropriate tooling and environment, facilitating potential future separation.

**Steps:**

1.  **Modify `package.json` Scripts:**

    - Define a `test:frontend` script that runs Vitest, ensuring it targets only frontend tests and uses the appropriate Vite configuration (which should provide the browser environment).
      - Example: `"test:frontend": "vitest run --root src/frontend"` (Adjust path/config if needed).
    - Define a `test:backend` script that runs Bun's native tester, targeting only backend tests.
      - Example: `"test:backend": "bun test --cwd src/backend"` (Verify `bun test` picks up tests correctly with `--cwd`, or check Bun's configuration options. You might need to add a `bunfig.toml` if not already present).
    - Update the main `test` script to execute both sequentially.
      - Example: `"test": "bun run test:frontend && bun run test:backend"`
    - (Optional) Update `test:watch` similarly, perhaps splitting into `test:watch:frontend` and `test:watch:backend`.
      - Example: `"test:watch:frontend": "vitest --root src/frontend"`, `"test:watch:backend": "bun test --watch --cwd src/backend"`

2.  **Update Pre-commit Hook (`.husky/pre-commit`):**

    - Change the test command from `bun run test` (or `bun test` if you kept the previous change) to the new combined script: `bun run test`.

3.  **Update CI Workflow (`.github/workflows/ci.yml`):**

    - Modify the 'Run tests' step to use the new combined script: `run: bun run test`.

4.  **Adapt Backend Tests for `bun test`:**

    - Go through backend test files (starting with `src/backend/test/setup.ts`).
    - Replace Vitest-specific utilities like `vi.mock` with alternatives compatible with `bun test`.
      - `bun test` aims for Jest compatibility. Check if `jest.mock` works or if Bun offers its own mocking/stubbing mechanism in its `Bun.test` module documentation.
      - If direct mocking is difficult, consider dependency injection patterns to make mocking easier.

5.  **Verify Frontend Test Environment:**

    - Ensure your Vite/Vitest configuration (likely `vite.config.ts` or `vitest.config.ts` usually located in the frontend directory or project root) is set up to provide a browser-like environment (e.g., using `jsdom`). This is necessary for tests using APIs like `sessionStorage`.
    - Check the `test.environment` setting in your Vitest config.

6.  **Run and Verify:**
    - Run `bun run test:frontend` and fix any errors.
    - Run `bun run test:backend` and fix any errors (especially those related to mocking).
    - Run the combined `bun run test` to ensure both pass together.
    - Commit the changes.
