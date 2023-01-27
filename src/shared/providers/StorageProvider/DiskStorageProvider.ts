import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

class DiskStorageProvider {
    
    public async saveFile(file: string): Promise<string> {
        // Movendo da pasta upload para temp
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.directory, file)
        );
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.tmpFolder, file);
        try {
            // Verifica se o arquivo existe
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }
        return await fs.promises.unlink(filePath);
    }

}

export default DiskStorageProvider;