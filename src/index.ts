// Library Imports
import { books, advanced_books} from "./js/utils/library.js";

// Parser imports
import { handleLegacy } from "./js/parsers/legacy_parser.js";
import { handleAdvanced } from "./js/parsers/advanced_parser.js";
import { handleMetadata } from "./js/parsers/metadata_parser.js";

// Utility imports
import { help } from "./js/utils/helper.js";


export default {


  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // ---------------------------------------------------------------------------------------------------------
    // 											                        PATH PARSING
    // ---------------------------------------------------------------------------------------------------------
    

    const parts = path.split("/").filter(Boolean);

    // Filter Advanced Queries
    if (parts[0] === "help" || parts[0] === undefined) {return help();}
    if (parts[0] === "advanced") {return handleAdvanced(parts, url, advanced_books);}
    if (parts[0] === "metadata") {return handleMetadata(parts, url);}

    return handleLegacy(parts, url, books);
  }


    
}


  
