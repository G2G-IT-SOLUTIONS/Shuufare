import { updateUserProfile } from '../utils/userService.js';
import prisma from '../db/prismaClient.js';

export const submitUserProfile = async (req, res, next) => {
  try {
    // Check if user is authenticated via session
    if (!req.session.userId) {
      return res.status(401).json({
        error: 'Unauthorized. Please authenticate first.',
      });
    }

    const userId = req.session.userId;

    // Extract profile data from request body
    const profileData = {
      phone: req.body.phone,
      alternative_phone: req.body.alternative_phone,
      age: req.body.age ? parseInt(req.body.age) : null,
      gender: req.body.gender,
      has_license: req.body.has_license,
      license_photo: req.body.license_photo,
      currently_employed: req.body.currently_employed,
      previous_experience: req.body.previous_experience,
      previous_platform: req.body.previous_platform,
      location: req.body.location,
      accessibility_considerations: req.body.accessibility_considerations,
      goals: req.body.goals,
      future_opportunities: req.body.future_opportunities,
      heard_from: req.body.heard_from,
      till_number: req.body.till_number,
      fcn_number: req.body.fcn_number,
      targa_number: req.body.targa_number,
    };

    // Update user profile
    const user = await updateUserProfile(userId, profileData);

    return res.json({
      message: 'Profile submitted successfully',
      user: {
        id: user.id,
        fayda_id: user.fayda_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
      },
    });
  } catch (error) {
    console.error('Submit user profile error:', error.message);
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    // Check if user is authenticated via session
    if (!req.session.userId) {
      return res.status(401).json({
        error: 'Unauthorized. Please authenticate first.',
      });
    }

    const userId = req.session.userId;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fayda_id: true,
        name: true,
        email: true,
        phone: true,
        alternative_phone: true,
        age: true,
        gender: true,
        has_license: true,
        license_photo: true,
        currently_employed: true,
        previous_experience: true,
        previous_platform: true,
        location: true,
        accessibility_considerations: true,
        goals: true,
        future_opportunities: true,
        heard_from: true,
        till_number: true,
        fcn_number: true,
        targa_number: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Get user profile error:', error.message);
    next(error);
  }
};
