import {Todo, User} from "./entity";

export type TodosResponse = {
    data: Todo[]
    message: string,
    success: boolean
    total: number
    limit?: number
    page?: number
}

export type TodoResponse = {
    data: Todo | null
    message: string,
    success: boolean
}

export type UserResponse = {
    data: User | null
    message: string,
    success: boolean
}