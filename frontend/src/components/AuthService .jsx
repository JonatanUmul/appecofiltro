import jwt from 'jsonwebtoken';

const secretKey = 'yourSecretKey'; // Clave secreta para firmar los tokens, debe ser segura

const authService = {
  // Función para generar un token JWT dado un usuario
  generateToken: (user) => {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Cambia el tiempo de expiración según tus necesidades
  },

  // Función para verificar y decodificar un token JWT
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded.userId;
    } catch (error) {
      return null; // Retorna null si el token no es válido o ha expirado
    }
  }
};

export default authService;

