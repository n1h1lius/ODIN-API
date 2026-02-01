export function help(){

    const usages = [
        "──────────────────────────────────────────────────────────",
        "Legacy Mode",
        "──────────────────────────────────────────────────────────",
        "About → Just a Stanza, Simple, Straightforward, No complications",
        "Usage → /{book}/{language}/{action}",
        "──────────────────────────────────────────────────────────",
        "Advanced Mode [Author]",
        "──────────────────────────────────────────────────────────",
        "About → A stanza from a specific author",
        "Usage → /advanced/{book}/author/{author}/{action}",
        "──────────────────────────────────────────────────────────",
    ];

    const actions_available = [
        "──────────────────────────────────────────────────────────",
        "Actions Available for All Modes:",
        "──────────────────────────────────────────────────────────",
        "/random  →  Returns a random stanza",
        "/all  →  Returns all stanzas",
        "/stanza/{id}  →  Returns a specific stanza",
        "/search?word={query}  →  Returns all stanzas that contain the word",
        "/from/{start}/to/{end}  →  Returns a range of stanzas",
        "──────────────────────────────────────────────────────────",
    ];

    const qol_actions = [
        "──────────────────────────────────────────────────────────",
        "Quality of Life Actions: [ LEGACY MODE ]",
        "──────────────────────────────────────────────────────────",
        "/help → Returns this json",
        "/list/books  →  Returns a list of all available books",
        "/list/language/{book}  →  Returns all languages available for one specific book",
        "──────────────────────────────────────────────────────────",
        "Quality of Life Actions: [ ADVANCED MODE ]",
        "──────────────────────────────────────────────────────────",
        "/help → Returns this json",
        "/advanced/list/books  →  Returns a list of all available books",
        "/advanced/list/sources → Returns all sources available",
        "/advanced/list/authors  →  Returns all authors available",
        "/advanced/list/translators → Returns all transtlators available",
        "──────────────────────────────────────────────────────────",
        "Quality of Life Actions: [ METADATA ]",
        "──────────────────────────────────────────────────────────",
        "/metadata/book/{translator}/{book}  →  Returns metadata about a specific book",
        "/metadata/author/{author}  →  Returns metadata about an specific author",
        "/metadata/translator/{translator}  →  Returns metadata about an specific translator",
        "──────────────────────────────────────────────────────────",
    ];

    return new Response(
        JSON.stringify({
            message: "Welcome to the ODINN API — Old Norse Lore as a Service",
            usages,
            actions_available,
            qol_actions,
            note: "More books like Voluspa, Völsunga saga and Skírnismál will be added soon",
            reference: "Visit https://github.com/n1h1lius/ODIN-API for more information."
        }),
        { headers: { "Content-Type": "application/json" } }
    );

}