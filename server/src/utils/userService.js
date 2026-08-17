
import prisma from '../db/prismaClient.js';

export async function findOrCreateUser(faydaId, additionalData = {}) {
  try {
    // First, try to find existing user by fayda_id
    let user = await prisma.driver.findUnique({
      where: { fayda_id: faydaId }
    });

    if (user) {
      // Update existing user if additional data is provided
      if (Object.keys(additionalData).length > 0) {
        const data = {
          ...additionalData,
          updated_at: new Date()
        };

        // If address is an object, convert it to JSON string
        // because the Prisma address field is expected to be a String.
        if (
          data.address &&
          typeof data.address === 'object'
        ) {
          data.address = JSON.stringify(data.address);
        }

        user = await prisma.driver.update({
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
    if (additionalData.phone_number !== undefined) {
      createData.phone_number = additionalData.phone_number;
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

    if (additionalData.address !== undefined) {
      createData.address =
        typeof additionalData.address === 'object'
          ? JSON.stringify(additionalData.address)
          : additionalData.address;
    }

    user = await prisma.driver.create({
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

    // Convert address object to JSON string if necessary
    if (
      data.address &&
      typeof data.address === 'object'
    ) {
      data.address = JSON.stringify(data.address);
    }

    const user = await prisma.driver.update({
      where: { id: userId },
      data
    });

    return user;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw new Error('Failed to update user profile');
  }
}
