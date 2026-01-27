# **ODIN API**
A lightweight, blazing‑fast Cloudflare Worker API for retrieving stanzas from Norse texts.

ODIN API provides structured access to mythological and historical Nordic works, starting with the **Hávamál** in multiple languages and writing systems.  
It is designed for developers, linguists, researchers, and anyone who wants programmatic access to Old Norse wisdom.

---

## ⚡️ **Base URL**

```
https://odin-api.orlog.workers.dev
```

---

## 📚 **Available Books**

Currently supported:

- **havamal**

More texts (Völuspá, Grímnismál, Völsunga saga, etc.) will be added over time.

---

## 🌍 **Available Languages**

Depending on the book, languages may include:

- elderFuthark  
- youngFuthark  
- norse (Old Norse)  
- bokmal  
- nynorsk  
- dansk  
- svenska  
- islenska  
- deutsch  
- english  
- spanish  
- ruski  
- french  

---

## 🔧 **API Endpoints**

All endpoints follow this structure:

```
/{book}/{language}/{action}
```

### **1. Random stanza**
```
/{book}/{language}/random
```
Returns a single random stanza.

**Example:**
```
/havamal/english/random
```

---

### **2. All stanzas**
```
/{book}/{language}/all
```
Returns the full list of stanzas in the selected language.

**Example:**
```
/havamal/spanish/all
```

---

### **3. Specific stanza by ID**
```
/{book}/{language}/stanza/{id}
```

**Example:**
```
/havamal/norse/stanza/12
```

---

### **4. Search stanzas by word**
```
/{book}/{language}/search?word={query}
```

Case‑insensitive search across all stanzas.

**Example:**
```
/havamal/english/search?word=odin
```

---

### **5. Range of stanzas**
```
/{book}/{language}/from/{start}/to/{end}
```

Returns a slice of the text between two stanza numbers (inclusive).

**Example:**
```
/havamal/bokmal/from/1/to/5
```

---

## 🧱 **Response Format**

Each stanza is returned as an array:

```json
[
  "Stanza text here...",
  "Stanza 12"
]
```

Future versions will migrate to a richer object format:

```json
{
  "id": 12,
  "text": "Stanza text...",
  "source": "Codex Regius",
  "translator": "…"
}
```

---

## 🚀 **Performance**

ODIN API runs entirely on **Cloudflare Workers**, meaning:

- Global edge deployment  
- Extremely low latency  
- Zero cold starts  
- Free tier friendly  

---

## 🛠️ **Planned Features**

- Additional Eddic poems  
- Saga chapters  
- Metadata endpoints  
- JSON schema for stanzas  
- Parallel multi‑language queries  
- Runic transliteration tools  

---

## 📜 **License**

All code is MIT‑licensed.  
Textual content follows the licensing of each translation source.
