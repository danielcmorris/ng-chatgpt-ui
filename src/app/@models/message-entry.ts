export interface MessageEntry {

  id: string;
  runId?: string;
  threadId?: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}