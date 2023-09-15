import { Database } from './database.types';

export type Board = Database['public']['Tables']['board']['Row'];
export type InsertBoard = Database['public']['Tables']['board']['Insert'];
export type UpdateBoard = Database['public']['Tables']['board']['Update'];

export type Note = Database['public']['Tables']['note']['Row'];
export type InsertNote = Database['public']['Tables']['note']['Insert'];
export type UpdateNote = Database['public']['Tables']['note']['Update'];
