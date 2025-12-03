
const connectedUsers = new Map<string, { socketId: string, userEmail: string }>();

export const addUser = (userId: string, socketId: string, userEmail: string) => {
    connectedUsers.set(userId, { socketId, userEmail });
};

export const removeUser = (socketId: string) => {
    for (const [userId, userDtls] of connectedUsers.entries()) {
        if (userDtls.socketId === socketId) {
            connectedUsers.delete(userId);
            break;
        }
    }
};

export const getUserDetails = (userId: string): { socketId: string; userEmail: string; } | undefined => {
    return connectedUsers.get(userId);
};

export const getAllUsers = () => connectedUsers;