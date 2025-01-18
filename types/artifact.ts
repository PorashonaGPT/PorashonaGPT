export type ArtifactType = 'code' | 'html' | 'flowchart' | 'dashboard' | 'image'

export interface Artifact {
  id: string;
  type: ArtifactType;
  content: string;
  language?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  lastEditedBy?: string;
  sharedWith?: string[];
}

