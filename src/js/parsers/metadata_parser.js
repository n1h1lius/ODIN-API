import { advanced_books, translators } from "../utils/library.js";
import { json, normalizeKey } from "../utils/utils.js";
export function handleMetadata(parts, url) {
    // -> /metadata/{mode}/{value}
    // -> /metadata/book/{translator}/{book}

    let complexityFlag = false;

    const mode = parts[1];
    const value = normalizeKey(parts[2]); 

    let dataSource = [];
    let foundMetadata = null;

    let outputMessage = `This is the full information about the ${mode} [ ${value} ] in metadata mode.`;

    if (mode === "translator") {dataSource = translators;} 
    else if (mode === "author") {dataSource = [];}
    else if (mode === "book") {dataSource = advanced_books; complexityFlag = true;}

    if (!complexityFlag){
        foundMetadata = dataSource.find(item => 
            item.id && normalizeKey(item.id) === value
        );
    } else{
        const human = parts[2];
        const book = parts[3];
        
        const allBooks = Object.values(advanced_books).flatMap(books => Object.values(books));
        
        let metadata = allBooks.find(item => 
            item.id && normalizeKey(item.id) === `${normalizeKey(book)}_${normalizeKey(human)}`
        );

        foundMetadata = {
            id: metadata.id,
            book: metadata.book,
            language: metadata.language,
            original_author: metadata.original_author,
            source: metadata.source,
            original_year: metadata.original_year,
            translator: metadata.translator,
            translator_year: metadata.translator_year,
            notes: metadata.notes
        };

        outputMessage = `This is the full information about the ${mode} [ ${book} ] from [ ${human} ] in metadata mode.`;

        
    }

    

    if (foundMetadata) {
        return json({
            message: outputMessage,
            metadata: foundMetadata
        });
    }

    return json({ error: `${mode} not found.` }, { status: 404 });
}


