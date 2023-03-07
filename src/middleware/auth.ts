import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/users/indexU';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        // console.log(req.headers.authorization);
        // console.log("Token", authorization);
        if (authorization === undefined) throw new Error("no auth");
        const token = authorization.split(" ")[1];
        // console.log("Token",token);
        if (!token || token === "") {
            return res.status(401).send({
                status: "error",
                path: req.url,
                method: req.method,
                data: "Access denied",
            });
        }
        const decoded = await verifyToken(token);
        if ("user" in req) {
            req.user = decoded;
        }
        
        return next();

    } catch(error) {
            return res.status(401).send({
                status: "error",
                path: req.url,
                method: req.method,
                data: "Authorization failed",
            });
    }

    next();
}
