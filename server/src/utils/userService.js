import prisma from '../db/prismaClient.js';

export async function findOrCreateUser(faydaId, additionalData = {}) {
  try {
    // First, try to find existing user by fayda_id
    let user = await prisma.user.findUnique({
      where: { fayda_id: faydaId }
    });

    if (user) {
      // Update user with any new data if provided
      if (Object.keys(additionalData).length > 0) {
        user = await prisma.user.update({
          where: { fayda_id: faydaId },
          data: {
            ...additionalData,
            updated_at: new Date()
          }
        });
      }
      return user;
    }

    // Create new user with basic info from JWT
    user = await prisma.user.create({
      data: {
        fayda_id: faydaId,
        email: additionalData.email || null,
        name: additionalData.name || null
      }
    });

    return user;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw new Error('Failed to find or create user');
  }
}

export async function updateUserProfile(userId, profileData) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...profileData,
        updated_at: new Date()
      }
    });
    return user;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw new Error('Failed to update user profile');
  }
}
