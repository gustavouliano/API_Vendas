import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

// Caminho para as imagens (em ambiente desenvolvimento)
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
// Caminho para as imagens na temp (em ambiente produção com bucket S3)
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
    directory: uploadFolder,
    tmpFolder: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback){
            // Para não exister arquivos com nomes iguais
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            callback(null, fileName);
        }
    }),
}