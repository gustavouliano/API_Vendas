import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';


interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    directory: string;
    multer: {
        storage: StorageEngine;
    }
    config: {
        aws: {
            bucket: string;
        }
    }
}

// Caminho para as imagens (em ambiente desenvolvimento)
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
// Caminho para as imagens na temp (em ambiente produção com bucket S3)
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
    driver: process.env.STORAGE_DRIVER,
    directory: uploadFolder,
    tmpFolder: tmpFolder,
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback){
                // Para não exister arquivos com nomes iguais
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;
                callback(null, fileName);
            }
        }),
    },
    config: {
        aws: {
            bucket: 'api-vendas-dev'
        }
    }
} as IUploadConfig;
