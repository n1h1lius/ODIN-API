// ---------------------------------------------------------------------------------------------------------
// 											   HAVAMAL IMPORTS
// ---------------------------------------------------------------------------------------------------------

import { elderFuthark as havamalElderFuthark } from "./books/havamal/elder-futhark.js";
import { youngFuthark as havamalYoungFuthark } from "./books/havamal/young-futhark.js";
import { norse as havamalNorse } from "./books/havamal/norse.js";
import { bokmal as havamalBokmal } from "./books/havamal/bokmal.js";
import { nynorsk as havamalNynorsk } from "./books/havamal/nynorsk.js";
import { dansk as havamalDansk } from "./books/havamal/dansk.js";
import { svenska as havamalSvenska } from "./books/havamal/svenska.js";
import { islenska as havamalIslenska } from "./books/havamal/islenska.js";
import { deutsch as havamalGerman } from "./books/havamal/deutsch.js";
import { english as havamalEnglish } from "./books/havamal/english.js";
import { spanish as havamalSpanish } from "./books/havamal/spanish.js";
import { ruski as havamalRuski } from "./books/havamal/ruski.js";
import { french as havamalFrench } from "./books/havamal/french.js";



// import { english as voluspaEnglish } from "./books/voluspa/english.js";
// import { norse as voluspaNorse } from "./books/voluspa/norse.js";
// import { spanish as voluspaSpanish } from "./books/voluspa/spanish.js";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // ---------------------------------------------------------------------------------------------------------
    // 											                        BOOKS AVAILABLE
    // ---------------------------------------------------------------------------------------------------------
    const books = {
      // -----------------------------------------------------------------------------------------------------
      //                                              HAVAMAL
      // -----------------------------------------------------------------------------------------------------
      havamal: {
        elderFuthark: havamalElderFuthark,
        youngFuthark: havamalYoungFuthark,
        norse: havamalNorse,
        bokmal: havamalBokmal,
        nynorsk: havamalNynorsk,
        dansk: havamalDansk,
        svenska: havamalSvenska,
        islenska: havamalIslenska,
        deutsch: havamalGerman,
        english: havamalEnglish,
        spanish: havamalSpanish,
        ruski: havamalRuski,
        french: havamalFrench
      }
      // voluspa: { english: voluspaEnglish, ... }
    };

    // ---------------------------------------------------------------------------------------------------------
    // 											                        ROOT PATH - HELP
    // ---------------------------------------------------------------------------------------------------------
    if (path === "/") {
    const books_available = Object.entries(books).map(([bookName, langs]) => ({
      book: bookName,
      languages: Object.keys(langs)
    }));

    const actions_available = [
      "/{book}/{language}/random  →  Returns a random stanza",
      "/{book}/{language}/all  →  Returns all stanzas",
      "/{book}/{language}/stanza/{id}  →  Returns a specific stanza",
      "/{book}/{language}/search?word={query}  →  Returns all stanzas that contain the word",
      "/{book}/{language}/from/{start}/to/{end}  →  Returns a range of stanzas",
    ];

    return new Response(
      JSON.stringify({
      message: "Welcome to the ODINN API — Old Norse Lore as a Service",
      usage: "Use /{book}/{language}/{action}",
      example: "/havamal/norse/random",
      books_available,
      actions_available,
      note: "More books like Voluspa, Völsunga saga and Skírnismál will be added soon"
      }),
      { headers: { "Content-Type": "application/json" } }
    );
    }


    // ---------------------------------------------------------------------------------------------------------
    // 											                        PATH PARSING
    // ---------------------------------------------------------------------------------------------------------
    const parts = path.split("/").filter(Boolean);

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


    // Unkown Action
    return new Response(
      JSON.stringify({
        error: "Unknown action",
        actions: ["random", "all", "stanza/{id}", "search?word="]
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }
};

// Helper JSON
function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
