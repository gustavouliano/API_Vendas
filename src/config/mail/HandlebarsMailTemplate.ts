import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
    [key: string]: string;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

export class HandlebarsMailTemplate {
    public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf8'
        });
        const parseTemplate = handlebars.compile(templateFileContent);
        try {
            return parseTemplate(variables);
        }catch(e){
            console.log(e);
            return '';
        }
    }
}
