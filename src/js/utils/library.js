

// ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║                                                            IMPORTS                                                              ║
// ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝


// ────────────────────────────────────────────────────────── LEGACY IMPORTS ────────────────────────────────────────────────────────────   

// ─────────── HAVAMAL ────────────   
import { elderFuthark as havamalElderFuthark } from "../../books/havamal/Legacy/elder-futhark.js";
import { youngFuthark as havamalYoungFuthark } from "../../books/havamal/Legacy/young-futhark.js";
import { norse as havamalNorse } from "../../books/havamal/Legacy/norse.js";
import { bokmal as havamalBokmal } from "../../books/havamal/Legacy/bokmal.js";
import { nynorsk as havamalNynorsk } from "../../books/havamal/Legacy/nynorsk.js";
import { dansk as havamalDansk } from "../../books/havamal/Legacy/dansk.js";
import { svenska as havamalSvenska } from "../../books/havamal/Legacy/svenska.js";
import { islenska as havamalIslenska } from "../../books/havamal/Legacy/islenska.js";
import { deutsch as havamalGerman } from "../../books/havamal/Legacy/deutsch.js";
import { english as havamalEnglish } from "../../books/havamal/Legacy/english.js";
import { spanish as havamalSpanish } from "../../books/havamal/Legacy/spanish.js";
import { ruski as havamalRuski } from "../../books/havamal/Legacy/ruski.js";
import { french as havamalFrench } from "../../books/havamal/Legacy/french.js";

// ────────────────────────────────────────────────────────── ADVANCED IMPORTS ────────────────────────────────────────────────────────────   

// ─────────── HAVAMAL ────────────   
import { en_Havamal_Regius_Crawford as crawfordRegiusHavamal } from "../../books/havamal/Advanced/en_Havamal_Regius_Crawford.js";

// ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║                                                            LIBRARY                                                              ║
// ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

// ────────────────────────────────────────────────────────── LEGACY MODE ────────────────────────────────────────────────────────────       
export const books = {

    // ─────────── HAVAMAL ────────────                                         

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

};

// ────────────────────────────────────────────────────────── ADVANCED MODE ────────────────────────────────────────────────────────────     

export const advanced_books = {

    // ─────────── HAVAMAL ────────────

    havamal: {

        jackson_crawford: crawfordRegiusHavamal,

    }

};

// ────────────────────────────────────────────────────────── META DATA ────────────────────────────────────────────────────────────    

// ─────────── TRANSLATORS ────────────
export const translators = [

    {
        "id": "jackson_crawford",
        "name": "Jackson Crawford",
        "roles": [
            "Translator",
            "Old Norse Specialist",
            "Academic Lecturer"
        ],
        "fields_of_expertise": [
            "Old Norse Language",
            "Runology",
            "Poetic Edda",
            "Saga Literature",
            "Historical Linguistics"
        ],
        "notable_works": [
            "The Poetic Edda: Stories of the Norse Gods and Heroes (2015)",
            "The Wanderer's Hávamál (2019)",
            "Two Sagas of Mythical Heroes (2017)"
        ],
        "associated_books_in_api": [
            "Hávamál"
        ],
        "languages_available": [
            "english"
        ],
        "metadata": {
            "source_manuscripts": [
            "Codex Regius"
            ],
            "translation_style": "Literal, accessible, academically grounded",
            "notes": "Known for clear, modern translations aimed at general audiences while preserving philological accuracy."
        }
    },

];