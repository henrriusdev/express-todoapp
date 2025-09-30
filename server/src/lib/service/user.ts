import {userRepo as repo} from "../store/store";
import {UserResponse} from "../model/response";
import {SignupRequest, UpdateUserRequest} from "../model/request";

export async function createUser(request: SignupRequest): Promise<UserResponse> {
    try {
        const user = repo.create({
            ...request,
        })
        await repo.save(user)
        return {
            data: user,
            message: "User created successfully",
            success: true,
        }
    } catch (error) {
        console.error("Error creating user", error)
        throw error
    }
}

export async function updateUser(request: UpdateUserRequest): Promise<UserResponse> {
    try {
        const user = await repo.findOneBy({id: request.userId})
        if (!user) {
            return {
                data: null,
                message: "User not found",
                success: false,
            }
        }

        repo.merge(user, request)
        const result = await repo.save(user)
        return {
            data: result,
            message: "User updated successfully",
            success: true,
        }
    } catch (error) {
        console.error("Error updating user", error)
        throw error
    }
}

export async function deleteUser(userId: string): Promise<UserResponse> {
    try {
        const user = await repo.findOneBy({id: userId})
        if (!user) {
            return {
                data: null,
                message: "User not found",
                success: false,
            }
        }

        await repo.createQueryBuilder()
            .update()
            .set({deletedAt: "CURRENT_DATETIME"})
            .where("id = :id", {id: userId})
            .execute()

        return {
            data: user,
            message: "User deleted successfully",
            success: true,
        }
    } catch (error) {
        console.error("Error deleting user", error)
        throw error
    }
}