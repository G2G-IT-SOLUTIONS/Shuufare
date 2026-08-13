
import prisma from '../db/prismaClient.js';

export async function findOrCreateUser(faydaId, additionalData = {}) {
  try {
    // First, try to find existing user by fayda_id
    let user = await prisma.user.findUnique({
      where: { fayda_id: faydaId }
    });

    if (user) {
      // Update existing user if additional data is provided
      if (Object.keys(additionalData).length > 0) {
        const data = {
          ...additionalData,
          updated_at: new Date()
        };

        // If location is an object, convert it to JSON string
        // because the Prisma location field is expected to be a String.
        if (
          data.location &&
          typeof data.location === 'object'
        ) {
          data.location = JSON.stringify(data.location);
        }

        user = await prisma.user.update({
          where: { fayda_id: faydaId },
          data
        });
      }

      return user;
    }

    // Create new user with basic information
    const createData = {
      fayda_id: faydaId,
      email: additionalData.email || null,
      name: additionalData.name || null,
      photo_url: additionalData.photo_url || null
    };

    // Include additional fields when creating the user
    if (additionalData.phone !== undefined) {
      createData.phone = additionalData.phone;
    }

    if (additionalData.gender !== undefined) {
      createData.gender = additionalData.gender;
    }

    if (additionalData.nationality !== undefined) {
      createData.nationality = additionalData.nationality;
    }

    if (additionalData.birthdate !== undefined) {
      createData.birthdate = additionalData.birthdate;
    }

    if (additionalData.location !== undefined) {
      createData.location =
        typeof additionalData.location === 'object'
          ? JSON.stringify(additionalData.location)
          : additionalData.location;
    }

    user = await prisma.user.create({
      data: createData
    });

    return user;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw new Error('Failed to find or create user');
  }
}

export async function updateUserProfile(userId, profileData) {
  try {
    const data = {
      ...profileData,
      updated_at: new Date()
    };

    // Convert location object to JSON string if necessary
    if (
      data.location &&
      typeof data.location === 'object'
    ) {
      data.location = JSON.stringify(data.location);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data
    });

    return user;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw new Error('Failed to update user profile');
  }
}
