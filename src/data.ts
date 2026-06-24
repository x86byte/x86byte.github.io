import { BlogPost, ResearchProject } from "./types";

import { lummac2Content } from "./articles/lummac2";
import { obfusk8Content } from "./articles/obfusk8";
import { roadmapContent } from "./articles/roadmap";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "sbox-compile-time-aes",
    title: "sbox - Compile-time AES-128 String Obfuscation Library",
    category: "obfuscation",
    date: "June 20, 2026",
    readTime: "6 min read",
    excerpt: "Standard string hiding relies on simple XORs or length-based separators. sbox utilizes a constexpr AES-128 block cipher to mutate raw string literals into high-entropy compile-time noise.",
    difficulty: "Advanced",
    author: "x86byte",
    tags: ["Obfuscation", "AES-128", "Constexpr", "C++17", "Stealth", "Evasion"],
    content: `
### Standard Solutions are Trivial to Defeat

Standard string obfuscation libraries rely on basic XOR loops or simple length+character separators. These are easily detected by modern automated malware emulation systems or quickly resolved by analysts writing basic IDAPython or Ghidra plugins.

\`sbox\` takes a fundamentally different path by running a fully-functional, standard-compliant **AES-128 cryptographic engine** natively inside the compiler's \`constexpr\` execution context.

### The Genesis: A 7ms Neetcode Challenge

During the Neetcode "Encode and Decode Strings" challenge, I ported the lightweight AES static execution engine from my obfuscation research tool, **Obfusk8**.

The implementation passed in **7ms** on the first submission. Cryptographic security shouldn't be a trade-off for speed or payload performance.

### Key Architectural Highlights

*   **No Separators or Delimiters**: Fixed-width blocks and mutated padding schemes eliminate predictable ASCII patterns.
*   **Binary Safe**: Handles null-bytes, absolute binary arrays, and dynamic network streams seamlessly.
*   **Compile-Time Scrubbing**: Plaintext strings are completely scrubbed during compiling. Command line tools like \`strings.exe\` (or Linux \`strings\`) return exactly zero occurrences of the sensitive texts.

### Concrete Implementation & Macros

Obfusk8 / sbox delivers atomic string materialization macros designed to render variables undecipherable within decompilers:

\`\`\`cpp
#include <iostream>
#include "sbox.hpp"

int main() {
    // Single atomic variable assignment (Inlined stack materialization)
    std::string secret = ObfStr("ama obfuscation addicted");
    
    // Batch processing multi-string macro (XOR block transition)
    std::vector<std::string> target_elements = _OBF({
        "kernel32.dll",
        "VirtualAlloc",
        "NtCreateProcess"
    });

    std::cout << "[+] String decrypted securely: " << secret << std::endl;
    return 0;
}
\`\`\`

By converting compile-time arrays to highly chaotic math streams, analysts inspecting the compiled assembly only see dynamic AES block scheduling loops, masking the intent of the API calls.
`
  },
  {
    id: "lummac2-stealer-breakdown",
    title: "LummaC2 Stealer Code Audit: Debunking 'Premium' Underground Sophistication",
    category: "reverse-engineering",
    date: "June 12, 2026",
    readTime: "12 min read",
    excerpt: "A deep dive into LummaC2's commodity code structure. We teardown its hardcoded path logic, verify weakness in the 'edx765' obfuscation, examine browser targets, and map out indicators of compromise (IOCs).",
    difficulty: "Intermediate",
    author: "x86byte",
    tags: ["Malware Analysis", "LummaC2", "Stealer", "Windows API", "Reverse Engineering", "IoCs"],
    content: lummac2Content
  },
  {
    id: "obfusk8-deep-dive",
    title: "Obfusk8: Dynamic VM Compilation & Control Flow Flattening in C++17",
    category: "obfuscation",
    date: "May 29, 2026",
    readTime: "9 min read",
    excerpt: "Explore the internals of Obfusk8: a modular, header-only C++17 library designed to disrupt static decompilers via in-code Virtualization Engines, Mixed Boolean-Arithmetic (MBA), and Structured Exception Handling.",
    difficulty: "Expert",
    author: "x86byte",
    tags: ["Obfuscation", "C++17", "Control Flow Flattening", "Mixed Boolean Arithmetic", "Virtual Machine"],
    content: obfusk8Content
  },
  {
    id: "reverse-engineering-roadmap",
    title: "The Comprehensive Reverse Engineering & Malware Analysis Roadmap",
    category: "reverse-engineering",
    date: "April 02, 2026",
    readTime: "15 min read",
    excerpt: "A complete step-by-step master plan for training low-level security practitioners. From establishing secure analysis sandboxes to manual unpacking, kernel IDT hooking, and driver deconstruction.",
    difficulty: "Advanced",
    author: "x86byte",
    tags: ["Roadmap", "Reverse Engineering", "Malware Analysis", "Kernel", "Unpacking"],
    content: roadmapContent
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "sbox",
    name: "sbox",
    description: "Compile-time AES-128 string obfuscation library for C++. It utilizes standard-compliant constexpr block encryption to transform sensitive API strings into high-entropy compile-time noise.",
    category: "obfuscation",
    githubStars: 1045,
    tags: ["constexpr", "AES-128", "C++17", "Stealth", "Evasion"],
    status: "active",
    snippetLanguage: "cpp",
    codeSnippet: `// AES compile-time block encoding
constexpr auto ObfuscateText(const char* plaintext) {
    AES128_Engine engine(GetStaticKey());
    return engine.EncryptBlock(plaintext);
}`
  },
  {
    id: "LummaC2-Stealer",
    name: "LummaC2 Stealer Teardown",
    description: "An intensive technical code teardown of LummaC2 commodity stealer malware. We highlight hardcoded configurations, weak string encoding logic, and associated IoCs.",
    category: "rootkits",
    githubStars: 890,
    tags: ["Malware Audit", "Reverse Engineering", "IoCs", "API Hashing"],
    status: "archived",
    snippetLanguage: "cpp",
    codeSnippet: `// Analysis of the weak string decoding routine
void ExtractLummaCredentials() {
    // Decodes folders using static 'edx765' marker
    char path[] = "%APPDATA%\\\\Electrum\\\\wallets\\\\edx765";
    StripLummaMarker(path);
}`
  },
  {
    id: "obfusk8",
    name: "Obfusk8 Engine",
    description: "A header-only C++17 library integrating custom Virtual Machine compiling, Mixed Boolean-Arithmetic, and Indirect Control Flow Flattening layouts.",
    category: "obfuscation",
    githubStars: 1240,
    tags: ["VM Compiling", "State Flattening", "MBA", "C++17"],
    status: "active",
    snippetLanguage: "cpp",
    codeSnippet: `// Obfusk8 entry assembly macro wrapper
_main({
    // User logic is compiled into flat, non-readable state dispatch nodes
    ExecuteProtectedPayload();
})`
  }
];
