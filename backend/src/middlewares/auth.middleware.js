export const protectRoute = async (req, res, next) => {
  const auth = req.auth();
  if (!auth.isAuthenticated) {
    return res.status(401).json({ message: "You are not authenticated" , success : false });
  }
  next();
};
