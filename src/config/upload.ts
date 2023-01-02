import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

// Caminho para as imagens
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback){
            // Para não exister arquivos com nomes iguais
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            callback(null, fileName);
        }
    }),
}