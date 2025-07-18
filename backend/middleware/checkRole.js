const checkRole = (allowedRoles = []) => {
    return (req,res,next) => {
        try {
            if(req.user && req.id){
                return res.status(401).json({
                    message:"User not authenticated"
                })
            }

            const role = req.role 
            if(!allowedRoles.includes(role)){
                return res.status(401).json({
                    message:"Access denied: Insufficient role"
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                message:"Role check failed"
            });
        }
    };
}