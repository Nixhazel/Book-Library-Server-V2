import fs from "fs";
import jwt from "jsonwebtoken";

// UTILITY FUNCTIONS 

export const getAllData = (pathFile: string) => {
    const result = fs.readFileSync(pathFile, "utf-8");
    return JSON.parse(result);
}

export const creatData = (pathFile: string, data: any) => {
    const stringData = JSON.stringify(data, null, 2);
    fs.writeFileSync(pathFile, stringData);
}


export const verifyToken = async (token: string, secret: string = "shhhhh") => {
    const decoded = await jwt.verify(token, secret);
    return decoded;
};
