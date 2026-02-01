# Introduction

ODINN API is a minimalist HTTP API that exposes Old Norse texts
(Hávamál, and later Völuspá, Völsunga saga, Skírnismál, etc.)
in a structured, machine-friendly format.

The core ideas:

- Simple, predictable URLs
- Clean JSON responses
- Separation between **Legacy Mode** and **Advanced Mode**
- Extensible data model for authors, editions, and metadata

## Goals

- Provide a stable base for linguistic, literary, and historical exploration
- Allow programmatic access to stanzas, ranges, and search
- Support multiple languages and translations

## Current focus

- `Hávamál` in multiple languages (Legacy Mode)
- `Hávamál` with author-based access (Advanced Mode, e.g. Jackson Crawford)
