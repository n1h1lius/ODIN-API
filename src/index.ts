// Library Imports
import { books, advanced_books} from "./js/utils/library.js";

// Parser imports
import { handleLegacy } from "./js/parsers/legacy_parser.js";
import { handleAdvanced } from "./js/parsers/advanced_parser.js";
import { handleMetadata } from "./js/parsers/metadata_parser.js";

// Utility imports
import { help } from "./js/utils/helper.js";



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};


export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const parts = path.split("/").filter(Boolean);

    let response;

    if (parts[0] === "help" || parts[0] === undefined) {response = help();} 
    else if (parts[0] === "advanced") {response = handleAdvanced(parts, url, advanced_books);}
    else if (parts[0] === "metadata") {response = handleMetadata(parts, url);} 
    else {response = handleLegacy(parts, url, books);}

    // Añadir CORS a la respuesta final
    return new Response(response.body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        ...corsHeaders
      }
    });
  }
}



  
