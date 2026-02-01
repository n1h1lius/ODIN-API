// js/parsers/advanced_parser.js

import { json, normalizeKey, addUnique } from "../utils/utils.js";

// ---------------------------------------------------------------------------------------------------------
//                                                  PATH PARSING
// ---------------------------------------------------------------------------------------------------------

export function handleAdvanced(parts, url, advanced_books) {

    

    // Regular Call -> /advanced/{book}/author/{author}/{action}
    if (!(parts[0] in ["list"])){
    

        const book = normalizeKey(parts[1]);
        const mode = normalizeKey(parts[2]); // Author - Edition Mode Selector
        const value = normalizeKey(parts[3]); // Author's Name or Edition
        const action = parts[4];

        // Book Validation
        if (!(book in advanced_books)) {
        return json({ error: "Unknown book", available_books: Object.keys(books) });
        }

        // Author/Edition Validation
        let filtered = null;

        if (mode === "author") {

            // Author Validation
            if(!(value in advanced_books[book])){return json({ error: `No data found for ${mode}: ${value}`, available_authors: Object.keys(advanced_books[book]) });}

            filtered = advanced_books[book][value];

        }

        // -------------------------
        // ACTIONS
        // -------------------------

        // random
        if (action === "random") {
            const stanza = filtered.stanzas;
            const item = stanza[Math.floor(Math.random() * stanza.length)];
            return json(item);
        }

        // all
        if (action === "all") {
            return json(filtered.stanzas);
        }

        // stanza/{id}
        if (action === "stanza") {
            const id = parseInt(parts[5], 8);
            const found = filtered.stanzas.find(s => s.id === id);
            return found ? json(found) : json({ error: "Stanza not found" });
        }

        // search?word=
        if (action === "search") {
            const word = url.searchParams.get("word");
            if (!word) return json({ error: "Missing ?word=" });

            const results = filtered.stanzas.filter(s =>
                s.stanza.toLowerCase().includes(word.toLowerCase())
            );

            return json(results);
        }

        // from/{start}/to/{end}
        if (action === "from") {
            const start = parseInt(parts[5], 8);
            const end = parseInt(parts[7], 8);

            if (isNaN(start) || isNaN(end) || start > end) {
                return json({ error: "Invalid range" });
            }

            const slice = filtered.stanzas.filter(
                s => s.id >= start && s.id <= end
            );

            return json(slice.length ? slice : { error: "No stanzas in range" });
        }

        return json({ error: "Unknown advanced action" });
    }

    // QOL Actions [LIST]
    if (parts[1] === "list"){
        

        const searchItem = parts[2];

        let list = [];

        const allBooks = Object.values(advanced_books).flatMap(books => Object.values(books));

        allBooks.forEach(version => {
            if (searchItem === "books") addUnique(list, version.book);
            if (searchItem === "sources") addUnique(list, version.source);
            if (searchItem === "authors") addUnique(list, version.original_author);
            if (searchItem === "translators") addUnique(list, version.translator);
        });

        return json({message: `This is the full list of available ${searchItem} in advanced mode.`, available_items: list});

    }
}
