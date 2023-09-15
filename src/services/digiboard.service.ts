import { supabase } from '@/client.ts';

export type Board = {
  name: string;
  owner_id?: number | null;
  timer_id?: number | null;
  timestamp?: string | null;
};

export type Note = {
  category_id?: number | null;
  created_at?: string;
  id?: number;
  text?: string | null;
  type?: string | null;
  visible?: boolean | null;
};

export const createBoard = async (board: Board): Promise<void> => {
    await supabase.from('board').insert(board)
}

export const getBoard = async (): Promise<Board[]> => {
    const { data} = await supabase.from('board').select()
    return data as Board[];
}

export const getNotesByBoardId = async (id: number): Promise<Note[]> => {
    const { data} = await supabase.from('note').select().eq('board_id', id)
    return data ?? [] as Note[];
}

export const createNote = async (note: Note): Promise<void> => {
    await supabase.from('note').insert(note)
}


