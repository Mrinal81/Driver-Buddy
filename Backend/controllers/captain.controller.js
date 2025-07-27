const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    console.log('Looking for captain with email:', email); // Debug log
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        console.log('No captain found with this email'); // Debug log
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Comparing passwords...'); // Debug log
    const isMatch = await captain.comparePassword(password);
    console.log('Password match result:', isMatch); // Debug log

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });
}