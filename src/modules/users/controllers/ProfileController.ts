import { Request, Response } from "express";
import { ShowProfileService } from "../services/ShowProfileService";
import { UpdateProfileService } from "../services/UpdateProfileService";

export class ProfileController {
    
    public async show(req: Request, res: Response): Promise<Response> {
        const showProfileService = new ShowProfileService();
        const user_id = req.user.id;

        const user = await showProfileService.execute({ user_id });

        return res.json(user);
    }
    
    public async update(req: Request, res: Response): Promise<Response> {
        const updateProfileService = new UpdateProfileService();
        const { name, email, password, old_password} = req.body;
        const user_id = req.user.id;
        const user = await updateProfileService.execute({
            user_id,
            name,
            email,
            password,
            old_password
        });

        return res.json(user);
    }

}