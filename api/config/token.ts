import jwt from "jsonwebtoken";
const { pathname: root } = new URL("../", import.meta.url);
const __dirname = root;
const SECRET = process.env.SECRET;

function generateToken(payload: any) {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "15m" });
  return token;
}

function validateToken(token: any) {
  return jwt.verify(token, SECRET);
}

export default { generateToken, validateToken };
