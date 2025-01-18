export interface Artifact {
  id: string;
  type: 'code' | 'html';
  content: string;
  language?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

