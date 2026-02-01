// js/parsers/legacy_parser.js

import { json } from "../utils/utils.js";

// ---------------------------------------------------------------------------------------------------------
//                                                  PATH PARSING
// ---------------------------------------------------------------------------------------------------------

export function handleLegacy(parts, url, books) {

    const book = parts[0];      // Book
    const lang = parts[1];      // Language
    const action = parts[2];    // Action

    // -------------------------
    //    BOOK VALIDATION
    // -------------------------
    if (!(book in books)) {
        return new Response(
        JSON.stringify({
            error: "Unknown book",
            available_books: Object.keys(books)
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
        );
    }

    // -------------------------------------------
    // LANGUAGE VALIDATION (ENGLISH FALLBACK)
    // -------------------------------------------
    const availableLangs = books[book];
    const selectedLang = lang in availableLangs ? lang : "english";
    const data = availableLangs[selectedLang];

    // -------------------------
    // ACTIONS
    // -------------------------

    // /book/lang/random
    if (action === "random") {
        const item = data[Math.floor(Math.random() * data.length)];
        return json(item);
    }

    // /book/lang/all
    if (action === "all") {
        return json(data);
    }

    // /book/lang/stanza/:id
    if (action === "stanza") {
        const id = parts[3];
        const found = data.find(
        (item) => item[1].toLowerCase() === `stanza ${id}`.toLowerCase()
        );
        return found ? json(found) : json({ error: "Stanza not found" });
    }

    // /book/lang/search?word=
    if (action === "search") {
        const word = url.searchParams.get("word");
        if (!word) return json({ error: "Missing ?word=" });

        const results = data.filter((item) =>
        item[0].toLowerCase().includes(word.toLowerCase())
        );
        return json(results);
    }

    // /book/lang/from/:start/to/:end
    if (action === "from") {
        const start = parseInt(parts[3], 10);
        const toKeyword = parts[4]; // should be "to"
        const end = parseInt(parts[5], 10);

        if (isNaN(start) || isNaN(end) || toKeyword !== "to") {
        return json({ error: "Use format /book/lang/from/{start}/to/{end}" });
        }

        if (start < 1 || end < 1 || start > end) {
        return json({ error: "Invalid range" });
        }

        // Convert stanza numbers (1-based) to array indices (0-based)
        const slice = data.slice(start - 1, end);

        if (slice.length === 0) {
        return json({ error: "No stanzas found in that range" });
        }

        return json(slice);
    }
}
