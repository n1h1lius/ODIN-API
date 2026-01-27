#  **ODIN API** 

---
## ᚠᛁᚾ:ᚦᚢ:ᛚᛁᚦ:ᚦᛁᚾᛅ:ᛁᚦᛅ:ᛋᛘᛁᚦ:ᛁᚾᛅ
---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Workers](https://img.shields.io/badge/Platform-Cloudflare_Workers-F38020?logo=cloudflare-workers&logoColor=white)](https://workers.cloudflare.com/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

A lightweight, blazing-fast API for retrieving stanzas from Norse texts, built on the edge.

ODIN API provides structured access to mythological and historical Nordic works, starting with the **Hávamál** in multiple languages and ancient writing systems.

---

## ⚡ Quick Start

**Base URL:**
```http
[https://odin-api.orlog.workers.dev](https://odin-api.orlog.workers.dev)

```

### 📚 Available Corpus

Currently serving: `havamal`
*Upcoming: Völuspá, Grímnismál, Völsunga saga.*

### 🌍 Supported Languages & Scripts

| Ancient | Scandinavian | Central/West | Eastern |
| --- | --- | --- | --- |
| `elderFuthark` | `norse` (Old Norse) | `english` | `ruski` |
| `youngFuthark` | `bokmal` / `nynorsk` | `deutsch` |  |
|  | `dansk` / `svenska` | `spanish` |  |
|  | `islenska` | `french` |  |

---

## 🔧 API Endpoints

All requests follow the pattern: `/{book}/{language}/{action}`

<i>Click any section to expand it.</i>

<details>
<summary><b>1. Get Random Stanza</b></summary>

```http
GET /{book}/{language}/random

GET /havamal/english/random

```

</details>

<details>
<summary><b>2. Get All Stanzas</b></summary>

```http
GET /{book}/{language}/all

GET /havamal/spanish/all

```

</details>

<details>
<summary><b>3. Specific Stanza by ID</b></summary>

```http
GET /{book}/{language}/stanza/{id}

GET /havamal/norse/stanza/12

```

</details>

<details>
<summary><b>4. Search by Keyword</b></summary>

```http
GET /{book}/{language}/search?word={query}

GET /havamal/english/search?word=odin

```

</details>

<details>
<summary><b>5. Range of Stanzas</b></summary>

```http
GET /{book}/{language}/from/{id}/to/{id}

GET /havamal/bokmal/from/1/to/5

```

</details>

---

## 🧱 Response Format

Current legacy format (v1):

```json
[
  "Stanza text here...",
  "Stanza 12"
]

```

> [!NOTE]
> Future versions will migrate to a richer object format containing metadata like `source` and `translator`.

---

## 🤝 Contributing & Support

Any help is welcome! Whether you found a typo in a translation or want to add a new language:

### 🛠️ How to contribute:

1. **Reporting Errors:** Please [Open an Issue](https://www.google.com/search?q=https://github.com/n1h1lius/ODIN-API/issues) describing the bug or the typo.
2. **Adding Languages/Features:** - Fork the repository.
* Create a new branch (`git checkout -b feature/new-language`).
* Commit your changes.
* Open a **Pull Request** explaining your contribution.



### 🌐 Translation Support

If you are a linguist or native speaker and want to help us include more texts in your language, please reach out via Issues!

---

## 🚀 Performance & Tech

* **Zero Cold Starts:** Powered by V8 isolates.
* **Edge Computing:** Deployed globally via Cloudflare Workers.
* **Lightweight:** Minimal overhead for maximum speed.

---

## 📜 License

Code: **MIT**.

Content: Textual content follows the licensing of each respective translation source.

