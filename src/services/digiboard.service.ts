import {supabase} from "@/client.ts";

export type Board = {
    name: string
    owner_id?: number | null
    timer_id?: number | null
    timestamp?: string | null
}

export type Notes = {
    category_id?: number | null
    created_at?: string
    id?: number
    text?: string | null
    type?: string | null
    visible?: boolean | null
}

const createBoard = async (board: Board): Promise<void> => {
    await supabase.from('board').insert(board)
}

const getBoard = async (): Promise<Board[]> => {
    const { data} = await supabase.from('board').select()
    return data as Board[];
}

const getNotesByBoardId = async (): Promise<Notes[]> => {
    const { data} = await supabase.from('note').select()
    return data as Notes[];
}


