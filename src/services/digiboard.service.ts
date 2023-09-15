import { supabase } from '@/client.ts';
import { Note, Board, InsertNote, InsertBoard } from '@/types/domain-models'
 
export const createBoard = async (board: InsertBoard): Promise<void> => {
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

export const createNote = async (note: InsertNote): Promise<void> => {
    await supabase.from('note').insert(note)
}


