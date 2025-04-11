export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
}

export interface TodoActions {
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onChangePriority: (id: number, priority: Priority) => void;
} 