export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          id: number;
          name: string;
          owner_id: number | null;
          timer_id: number | null;
          timestamp: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          owner_id?: number | null;
          timer_id?: number | null;
          timestamp?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          owner_id?: number | null;
          timer_id?: number | null;
          timestamp?: string | null;
        };
        Relationships: [];
      };
      category: {
        Row: {
          board_id: number;
          id: number;
          name: string | null;
          timestamp: string | null;
        };
        Insert: {
          board_id: number;
          id?: number;
          name?: string | null;
          timestamp?: string | null;
        };
        Update: {
          board_id?: number;
          id?: number;
          name?: string | null;
          timestamp?: string | null;
        };
        Relationships: [];
      };
      note: {
        Row: {
          category_id: number | null;
          created_at: string;
          id: number;
          text: string | null;
          type: string | null;
          visible: boolean | null;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string;
          id?: number;
          text?: string | null;
          type?: string | null;
          visible?: boolean | null;
        };
        Update: {
          category_id?: number | null;
          created_at?: string;
          id?: number;
          text?: string | null;
          type?: string | null;
          visible?: boolean | null;
        };
        Relationships: [];
      };
      note_relation: {
        Row: {
          action_id: number;
          created_at: string;
          note_id: number;
        };
        Insert: {
          action_id: number;
          created_at?: string;
          note_id: number;
        };
        Update: {
          action_id?: number;
          created_at?: string;
          note_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'note_relation_action_id_fkey';
            columns: ['action_id'];
            referencedRelation: 'note';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'note_relation_note_id_fkey';
            columns: ['note_id'];
            referencedRelation: 'note';
            referencedColumns: ['id'];
          },
        ];
      };
      timer: {
        Row: {
          id: number;
          seconds: number;
          started_timestamp: string | null;
          visible: boolean | null;
        };
        Insert: {
          id?: number;
          seconds: number;
          started_timestamp?: string | null;
          visible?: boolean | null;
        };
        Update: {
          id?: number;
          seconds?: number;
          started_timestamp?: string | null;
          visible?: boolean | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
