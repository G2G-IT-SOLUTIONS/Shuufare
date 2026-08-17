import { updateUserProfile } from '../utils/userService.js';
import prisma from '../db/prismaClient.js';

export const submitUserProfile = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: 'Unauthorized. Please authenticate first.',
      });
    }

    const userId = req.session.userId;
    // Extract profile data from request body
    const profileData = {
      phone_number: req.body.phoneNumber,
      alt_phone_number: req.body.alternativePhone,
      age: req.body.age ? parseInt(req.body.age) : null,
      gender: req.body.gender,
      has_license: req.body.drivingLicense,
      license_file_path: req.file ? `/uploads/${req.file.filename}` : null,
      is_employed: req.body.currentlyEmployed,
      ride_experience: req.body.previousExperience,
      ride_platform: req.body.platforms,
      location: req.body.currentLocation,
      accessibility: req.body.accessibilityConsiderations,
      growth_goals: req.body.goals,
      future_opportunities: req.body.future_opportunities,
      referral_source: req.body.referral_source,
      till_number: req.body.till_number,
      fcn_number: req.body.fcn_number,
      targa_number: req.body.targa_number
    };

    // Update user profile
    console.log('Updating user profile for userId:', userId, 'with data:', profileData);
    const user = await updateUserProfile(userId, profileData);

    return res.json({
      message: 'Profile submitted successfully',
      user: {
        id: user.id,
        fayda_id: user.fayda_id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
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
    
    const user = await prisma.driver.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fayda_id: true,
        name: true,
        email: true,
        photo_url: true,
        phone_number: true,
        alt_phone_number: true,
        age: true,
        gender: true,
        has_license: true,
        license_file_path: true,
        is_employed: true,
        ride_experience: true,
        ride_platform: true,
        location: true,
        address: true,
        accessibility: true,
        growth_goals: true,
        future_opportunities: true,
        referral_source: true,
        till_number: true,
        fcn_number: true,
        targa_number: true,
        created_at: true,
        updated_at: true,
        nationality: true,
        birthdate: true,
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
