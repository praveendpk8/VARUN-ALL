export type Subject = 'robotics' | 'electronics' | 'coding' | 'aerodynamics';

export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  color: string;
}

export interface District {
  id: Subject;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}
