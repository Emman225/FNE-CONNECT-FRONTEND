// Placeholder service for User API calls
// TODO: Replace with real Laravel API integration

import { User } from '../auth/AuthProvider';

export const userService = {
    async getAll(): Promise<User[]> {
        // Mock implementation
        return [];
    },

    async getById(id: string): Promise<User | null> {
        // Mock implementation
        return null;
    },

    async create(data: Partial<User>): Promise<User> {
        // Mock implementation
        throw new Error('Not implemented');
    },

    async update(id: string, data: Partial<User>): Promise<User> {
        // Mock implementation
        throw new Error('Not implemented');
    },

    async delete(id: string): Promise<void> {
        // Mock implementation
        throw new Error('Not implemented');
    }
};
