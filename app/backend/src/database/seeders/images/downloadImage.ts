import * as fs from "fs";
import * as path from "path";

async function downloadImage(url: string, folderPath: string): Promise<void> {
    try {
        const fetch = await import("node-fetch");

        const response = await fetch.default(url);

        if (!response.ok) {
            console.error(`Falha ao baixar a imagem. Status da resposta: ${response.status}`);
            return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image/")) {
            console.error("O URL fornecido não aponta para uma imagem.");
            return;
        }

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const fileName = path.basename(url);
        const filePath = path.join(folderPath, fileName);

        const fileStream = fs.createWriteStream(filePath);
        const body = response.body;

        if (!body) {
            console.error("A resposta não contém um corpo.");
            return;
        }

        await new Promise<void>((resolve, reject) => {
            body.pipe(fileStream);
            body.on("error", (err) => {
                reject(err);
            });
            fileStream.on("finish", () => {
                resolve();
            });
        });

        console.log(`Imagem salva em: ${filePath}`);
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}

// Exemplo de uso:
const imageUrl = "URL_DA_IMAGEM_AQUI";
const specificFolderPath = "caminho/para/a/pasta/especifica";
downloadImage(imageUrl, specificFolderPath);
