import { hash, compare } from "bcryptjs";
import IHashProvider from "../models/IHashProvider";

class BcryptHashProvider implements IHashProvider {
    
    async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }
    
    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }
}

export default BcryptHashProvider;