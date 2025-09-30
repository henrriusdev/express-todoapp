export type SignupRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type GetTodosRequest = {
    userId: string;
    limit: number;
    offset: number;
}

export type CreateTodoRequest = {
    userId: string;
    title: string;
    description: string;
}

export type UpdateTodoRequest = {
    todoId: string;
    userId: string;
    title?: string;
    description?: string;
    isCompleted?: boolean;
}

export type UpdateUserRequest = {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}