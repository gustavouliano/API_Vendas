declare namespace Express {

    /**
     * Adicionado o objeto user para o objeto Request.
     */
    export interface Request {
        
        user: {
            id: string;
        }
    }
}