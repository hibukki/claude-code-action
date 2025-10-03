#!/usr/bin/env bun

import { generateDefaultPrompt } from "./src/create-prompt";
import type { PreparedContext } from "./src/create-prompt";

// Sample data mimicking a real PR comment scenario
const sampleContext: PreparedContext = {
  repository: "owner/repo",
  claudeCommentId: "12345",
  triggerPhrase: "@claude",
  triggerUsername: "johndoe",
  eventData: {
    eventName: "issue_comment",
    commentId: "67890",
    isPR: true,
    prNumber: "123",
    commentBody: "@claude please review this PR and fix any bugs you find",
  },
};

const sampleGitHubData = {
  contextData: {
    title: "Add new authentication feature",
    body: "This PR adds JWT-based authentication to the API",
    author: { login: "testuser" },
    state: "OPEN",
    createdAt: "2023-01-01T00:00:00Z",
    additions: 150,
    deletions: 50,
    baseRefName: "main",
    headRefName: "feature-auth",
    headRefOid: "abc123def456",
    commits: {
      totalCount: 3,
      nodes: [
        {
          commit: {
            oid: "commit1abc",
            message: "Add JWT middleware",
            author: {
              name: "John Doe",
              email: "john@example.com",
            },
          },
        },
      ],
    },
    files: {
      nodes: [
        {
          path: "src/auth/jwt.ts",
          additions: 100,
          deletions: 0,
          changeType: "ADDED",
        },
        {
          path: "src/middleware/auth.ts",
          additions: 50,
          deletions: 50,
          changeType: "MODIFIED",
        },
      ],
    },
    comments: {
      nodes: [
        {
          id: "comment1",
          databaseId: "111111",
          body: "Looking good so far!",
          author: { login: "reviewer1" },
          createdAt: "2023-01-01T10:00:00Z",
        },
      ],
    },
    reviews: {
      nodes: [],
    },
  },
  comments: [
    {
      id: "comment1",
      databaseId: "111111",
      body: "Looking good so far!",
      author: { login: "reviewer1" },
      createdAt: "2023-01-01T10:00:00Z",
    },
    {
      id: "comment2",
      databaseId: "67890",
      body: "@claude please review this PR and fix any bugs you find",
      author: { login: "johndoe" },
      createdAt: "2023-01-01T11:00:00Z",
    },
  ],
  changedFiles: [],
  changedFilesWithSHA: [
    {
      path: "src/auth/jwt.ts",
      additions: 100,
      deletions: 0,
      changeType: "ADDED",
      sha: "abc123",
    },
    {
      path: "src/middleware/auth.ts",
      additions: 50,
      deletions: 50,
      changeType: "MODIFIED",
      sha: "def456",
    },
  ],
  reviewData: {
    nodes: [],
  },
  imageUrlMap: new Map<string, string>(),
  triggerDisplayName: "John Doe",
};

// Generate prompt without commit signing
console.log("=".repeat(80));
console.log("SAMPLE PROMPT (useCommitSigning: false)");
console.log("=".repeat(80));
const prompt = generateDefaultPrompt(sampleContext, sampleGitHubData, false);
console.log(prompt);
console.log("\n" + "=".repeat(80));
console.log(`Total length: ${prompt.length} characters`);
console.log("=".repeat(80));
