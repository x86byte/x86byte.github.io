import { useState } from "react";
import { Terminal, Shield, Copy, Check, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

interface Bin2BinSimulatorProps {
  currentLang: "en" | "es" | "fr" | "ru";
  translations: any;
}

export default function Bin2BinSimulator({ currentLang, translations }: Bin2BinSimulatorProps) {
  const [inputText, setInputText] = useState(`// Standard Secret String declaration
const char* szHost = "https://c2-node-server.com/api/v1/update";
HMODULE hKernel = LoadLibraryA("kernel32.dll");
FARPROC pFunc = GetProcAddress(hKernel, "VirtualProtect");`);

  const [obfuscatedResult, setObfuscatedResult] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pipelineState, setPipelineState] = useState<string>("");

  const runBin2BinPipeline = () => {
    setIsCompiling(true);
    setObfuscatedResult("");
    
    const steps = [
      "[*] Lexing C++ syntax tree strings...",
      "[*] Resolving opaque constant predicates...",
      "[*] Flattening basic blocks to dynamic dispatch state machines...",
      "[*] Lifting literal strings into constexpr AES encryption arrays...",
      "[+] bin2bin custom AST rewrite completed successfully!"
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setPipelineState(steps[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
        generateObfuscatedCode();
      }
    }, 450);
  };

  const generateObfuscatedCode = () => {
    // Break up text lines
    const lines = inputText.split("\n");
    let result = `// ==========================================================\n`;
    result += `// Compiled securely via bin2bin x86 AST Mutator pipeline\n`;
    result += `// Target: x86_64 PE COFF target architecture\n`;
    result += `// Seeds: [0xfd49, 0xc10a, __COUNTER__]\n`;
    result += `// ==========================================================\n\n`;
    result += `#include "Obfusk8Core.hpp"\n\n`;
    result += `_main({\n`;
    result += `    // Obfuscated State Key: 0x9B4E38AC\n`;
    result += `    volatile uint32_t _state = 0x5C3D2B10 ^ __LINE__;\n\n`;
    result += `    while (_state != 0x0) {\n`;
    result += `        switch (_state) {\n`;
    
    // First Block: Obfuscate the C2 string using compile-time AES substitution style or stack strings
    result += `            case 0x5C3D2B10:\n`;
    result += `                // Encrypted with constexpr AES-128 (ObfStr array)\n`;
    result += `                // Plaintext pointer scrubbed from static strings.exe\n`;
    result += `                {\n`;
    result += `                    volatile auto szEncryptedHost = ObfStr("https://c2-node-server.com/api/v1/update");\n`;
    result += `                    _OBF_PUSH_REG(r0, szEncryptedHost.c_str());\n`;
    result += `                }\n`;
    result += `                _state = 0xD4B3A190 ^ _obf_global_opaque_seed;\n`;
    result += `                break;\n\n`;

    // Second Block: Obfuscate the kernel loading and function resolution
    result += `            case 0xD4B3A190:\n`;
    result += `                // PEB-based indirect resolution using compile-time djb2 hashes\n`;
    result += `                {\n`;
    result += `                    // Hash for "kernel32.dll" = 0x6E3AA0FD\n`;
    result += `                    // Hash for "VirtualProtect" = 0xC810AB21\n`;
    result += `                    HMODULE hKernelSecure = (HMODULE)STEALTH_API_OBFSTR("kernel32.dll", "GetModuleHandleA");\n`;
    result += `                    FARPROC pFuncSecure = STEALTH_API_OBF(hKernelSecure, 0xC810AB21); // "VirtualProtect"\n`;
    result += `                    _OBF_CALL_VIA_OBF_PTR(pFuncSecure, _OBF_REG(r0), 0x1000, PAGE_EXECUTE_READWRITE);\n`;
    result += `                }\n`;
    result += `                _state = 0x0; // Graceful loop termination\n`;
    result += `                break;\n`;

    result += `        }\n`;
    result += `    }\n`;
    result += `})\n`;

    setObfuscatedResult(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(obfuscatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loc = translations[currentLang];

  return (
    <div id="bin2bin-container" className="bg-slate-950/60 border border-slate-900 rounded-xl p-6 hover:border-slate-800 transition-all max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-900 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="font-display font-semibold text-base text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              bin2bin AST Restructuring Tool
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-sans">
            {loc.bin2binDesc || "Simulate compile-time obfuscation of strings, variable declarations, and API calls via the bin2bin C++ Mutator."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input area */}
        <div className="space-y-3 flex flex-col h-[340px]">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>INPUT: Raw C++ Source</span>
            <span className="text-slate-600">ansi-encoding</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 w-full bg-slate-950 border border-slate-900 rounded-lg p-4 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-cyan-500/40 resize-none leading-relaxed transition-colors select-text"
            placeholder="// Input your raw C++ strings or functions..."
          />
          <button
            onClick={runBin2BinPipeline}
            disabled={isCompiling}
            className="w-full bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 py-2.5 rounded-lg font-mono text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isCompiling ? (
              <>
                <div className="animate-spin rounded-full h-3.5 w-3.5 border-t border-b border-cyan-400"></div>
                <span>Mutating Ast...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>COMPILE VIA BIN2BIN wrapper</span>
              </>
            )}
          </button>
        </div>

        {/* Output area */}
        <div className="space-y-3 flex flex-col h-[340px]">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>OUTPUT: Obfuscated AST Node</span>
            {obfuscatedResult && (
              <button
                onClick={handleCopy}
                className="text-[10px] bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 px-2 py-0.5 rounded transition-all"
              >
                {copied ? "Copied!" : "Copy Snippet"}
              </button>
            )}
          </div>

          <div className="flex-1 bg-slate-950 border border-slate-900 rounded-lg p-4 font-mono text-[11px] overflow-auto select-text relative leading-relaxed">
            {isCompiling ? (
              <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center space-y-3 font-mono text-xs text-cyan-400">
                <div className="animate-pulse">{pipelineState}</div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest">STATE-TRANSITION-IN-PROGRESS</div>
              </div>
            ) : null}

            {obfuscatedResult ? (
              <pre className="text-emerald-400/90 whitespace-pre font-medium">{obfuscatedResult}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-650 text-xs text-slate-500 font-mono">
                {"// Click compilation button to execute mutator."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
