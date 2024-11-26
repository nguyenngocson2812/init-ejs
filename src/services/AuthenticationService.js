import md5 from 'md5';
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

const SINGER_KEY = 'your_secret_key';
function generateToken(user) {
    const payload = {
        sub: user.username,
        iss: 'sonnguyen',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        jti: uuidv4(),
        scope: user.role
    };

    try {
        const token = jwt.sign(payload, SINGER_KEY);
        return token;
    } catch (error) {
        console.error("Cannot create token", error);
        throw new Error(error);
    }
}


const invalidatedTokenRepository = {
    existsById: async (jwtId) => {
        return false;
    }
};

const introspectToken = async (request) => {
    const token = request.token;

    let str;
    try {
        const decoded = jwt.verify(token, SINGER_KEY, { algorithms: ['HS512'] });
        // Check if the token is expired
        const expiryTime = new Date(decoded.exp * 1000); // Convert 'exp' from seconds to milliseconds

        str = "OK";
        const isInvalidated = await invalidatedTokenRepository.existsById(decoded.jti);

        if (isInvalidated || expiryTime <= new Date()) {
            return {
                valid: false,
                message: str
            };
        } else {
            return {
                valid: true,
                message: str
            };
        }

    } catch (error) {
        str = "NOT";
        return {
            valid: false,
            message: str
        };
    }
};

const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SINGER_KEY, { algorithms: ['HS256'] });
        const expiryTime = new Date(decodedToken.exp * 1000);
        if (expiryTime <= new Date()) {
            throw new Error('Invalid token: Token has expired');
        }
        return decodedToken;
    } catch (err) {
        throw new Error('Invalid token: ' + err.message);
    }
}


export {
    generateToken,
    verifyToken,
    introspectToken
}