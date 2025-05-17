export interface MessageEntry {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}