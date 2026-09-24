/**
 * Trustline Verification Services - AI Evidential Risk Chatbot
 * Powered by Groq API (High-performance fast inference)
 */

(function () {
  'use strict';

  const GROQ_CONFIG = {
    apiKey: '',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'qwen/qwen3.8-27b',
    maxTokens: 380,
    temperature: 0.5,
  };

  const SYSTEM_PROMPT = `You are the official AI Risk & Verification Assistant for Trustline Verification Services, an elite corporate risk advisory and field investigation firm headquartered in Ahmedabad, Gujarat, India.

Foundational Profile:
- Director & Operations Head: Mr. Dinesh Patel (30+ years of institutional risk and investigative acumen).
- Incorporated: June 2023.
- Territory: Pan-Gujarat operations across all 33 districts (including Ahmedabad, Surat, Vadodara, Rajkot, Bhavnagar, Jamnagar, Gandhinagar, Bharuch, Kutch).
- Field Operatives: 25+ full-time ground reconnaissance investigators with statutory strict compliance.
- Official Credentials: GSTIN: 24ASYPP8990J1ZJ | UDYAM: UDYAM-GJ-01-0279959.
- Turnaround Time (TAT): 2 to 5 business days for standard verification; expedited options available.

Two Core Disciplines:
1. Insurance Claims Ground Investigation:
   - Health insurance reimbursement & cashless fraud audit.
   - Life/death claims authentic field verification & hospital record forensic audit.
   - Motor third-party claim investigation & accident site forensic reconstruction.
   - Hospital fraud detection, fictitious billing, and upcoding audits.
   - Legally defensible evidential dossiers compiled for underwriters and claims heads.
2. Corporate Employee Background Verification (BGV):
   - Physical residential address verification with GPS-tagged photographic evidence.
   - Dual-source education degree authentication with registrar records.
   - 7-year past employment performance & integrity checks.
   - Comprehensive court litigation & criminal record checks (eCourts, police databases).
   - High-governance C-Suite & leadership due diligence dossiers.

Communications & Contact Desk:
- Telephone: +91 99250 29005 / +91 83479 91295
- Email: trustline@trustlinevs.com
- Corporate Office: 17, Hare Krishna Complex off Ashram Road, Ahmedabad 380006
- Registered Office: Gopal Surya Complex, Sola Road, Ahmedabad 380061

Response Guidelines:
- Tone: Professional, discreet, articulate, courteous, and authoritative.
- Keep answers concise, factual, and easy to read (max 100-140 words per reply).
- Use clear bullet points when summarizing services or features.
- If inquiries involve confidential case briefs, pricing mandates, or commissioning work, invite them to use the "Request a Consultation" form on the site or contact the direct desk at trustline@trustlinevs.com / +91 99250 29005.`;

  // Storage key for chat messages
  const STORAGE_KEY = 'trustline_chat_history_v1';
  let conversationHistory = [];

  // Parse markdown formatting for messages
  function renderMarkdown(text) {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold: **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text*
    escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Bullets: lines starting with * or -
    escaped = escaped.replace(/(?:^|\n)[*-]\s+(.+)/g, '<div class="flex items-start gap-2.5 my-1.5"><span class="text-[#a28856] font-bold text-base leading-none mt-1">•</span><span class="text-[15.5px] leading-relaxed">$1</span></div>');
    // Numbered lists: 1. text
    escaped = escaped.replace(/(?:^|\n)(\d+)\.\s+(.+)/g, '<div class="flex items-start gap-2.5 my-1.5"><span class="text-[#a28856] font-bold text-[14px] leading-none mt-1">$1.</span><span class="text-[15.5px] leading-relaxed">$2</span></div>');
    // Line breaks
    escaped = escaped.replace(/\n\n+/g, '<div class="h-2.5"></div>');
    escaped = escaped.replace(/\n/g, '<br/>');

    return escaped;
  }

  // Load history from storage
  function loadHistory() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        conversationHistory = JSON.parse(saved);
      }
    } catch (e) {
      conversationHistory = [];
    }
  }

  // Save history
  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
    } catch (e) {}
  }

  // Inject CSS Styles
  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'trustline-chatbot-styles';
    style.textContent = `
      #tl-chat-launcher {
        position: fixed;
        bottom: 26px;
        right: 26px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .tl-launcher-btn {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background: #001121;
        color: #ffffff;
        border: 2.5px solid #a28856;
        box-shadow: 0 10px 28px rgba(0, 17, 33, 0.32), 0 3px 8px rgba(162, 136, 86, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }
      .tl-launcher-btn:hover {
        transform: scale(1.07);
        background: #142638;
        box-shadow: 0 14px 34px rgba(0, 17, 33, 0.42), 0 4px 10px rgba(162, 136, 86, 0.5);
      }
      .tl-launcher-badge {
        position: absolute;
        top: -1px;
        right: -1px;
        width: 16px;
        height: 16px;
        background: #10b981;
        border: 3px solid #ffffff;
        border-radius: 50%;
      }
      .tl-launcher-pill {
        background: #ffffff;
        color: #001121;
        font-size: 15px;
        font-weight: 600;
        padding: 10px 18px;
        border-radius: 24px;
        box-shadow: 0 6px 20px rgba(0, 17, 33, 0.14);
        border: 1px solid #D8D6CD;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      .tl-launcher-pill:hover {
        background: #faf9f5;
        border-color: #a28856;
        transform: translateX(-3px);
      }
      #tl-chat-window {
        position: fixed;
        bottom: 104px;
        right: 26px;
        width: 460px;
        max-width: calc(100vw - 32px);
        height: 660px;
        max-height: calc(100vh - 120px);
        background: #ffffff;
        border-radius: 14px;
        box-shadow: 0 24px 54px rgba(0, 17, 33, 0.25), 0 6px 16px rgba(0, 0, 0, 0.1);
        border: 1px solid #D8D6CD;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: 'Inter', system-ui, sans-serif;
        transform: translateY(18px) scale(0.96);
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #tl-chat-window.tl-open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
      }
      .tl-chat-header {
        background: #001121;
        color: #ffffff;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #a28856;
      }
      .tl-messages-box {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #faf9f5;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .tl-msg {
        max-width: 88%;
        font-size: 15.5px;
        line-height: 1.65;
        border-radius: 10px;
        padding: 13px 18px;
        word-break: break-word;
      }
      .tl-msg-user {
        align-self: flex-end;
        background: #142638;
        color: #ffffff;
        border-bottom-right-radius: 3px;
        box-shadow: 0 2px 6px rgba(0, 17, 33, 0.12);
      }
      .tl-msg-assistant {
        align-self: flex-start;
        background: #ffffff;
        color: #1b1c1a;
        border: 1px solid #E4E2DC;
        border-bottom-left-radius: 3px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
      .tl-chip-btn {
        background: #ffffff;
        border: 1px solid #c4c6cd;
        color: #37485c;
        font-size: 13.5px;
        font-weight: 500;
        padding: 7px 14px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: left;
      }
      .tl-chip-btn:hover {
        background: #001121;
        color: #ffffff;
        border-color: #001121;
      }
      .tl-typing-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #a28856;
        animation: tlBlink 1.4s infinite ease-in-out both;
      }
      .tl-typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .tl-typing-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes tlBlink {
        0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
        40% { transform: scale(1); opacity: 1; }
      }
      .tl-input-bar {
        padding: 12px 18px;
        background: #ffffff;
        border-top: 1px solid #E4E2DC;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .tl-input-field {
        flex: 1;
        border: 1px solid #c4c6cd;
        border-radius: 8px;
        padding: 12px 16px;
        font-size: 15.5px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.15s ease;
      }
      .tl-input-field:focus {
        border-color: #001121;
      }
      .tl-send-btn {
        background: #001121;
        color: #ffffff;
        border: 1px solid #001121;
        border-radius: 8px;
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .tl-send-btn:hover:not(:disabled) {
        background: #142638;
      }
      .tl-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  }

  // Create Chatbot DOM
  function createChatbotUI() {
    // 1. Launcher button + pill
    const launcher = document.createElement('div');
    launcher.id = 'tl-chat-launcher';
    launcher.innerHTML = `
      <div id="tl-launcher-pill" class="tl-launcher-pill">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Chat with Evidential AI</span>
      </div>
      <button id="tl-toggle-btn" class="tl-launcher-btn" aria-label="Open Trustline Assistant">
        <span class="tl-launcher-badge"></span>
        <svg id="tl-icon-chat" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg id="tl-icon-close" class="hidden" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    document.body.appendChild(launcher);

    // 2. Chat Window
    const win = document.createElement('div');
    win.id = 'tl-chat-window';
    win.innerHTML = `
      <!-- Header -->
      <div class="tl-chat-header">
        <div class="flex items-center gap-3">
          <img src="assets/images/logo-handshake.png" alt="Trustline Logo" class="h-9 w-auto object-contain bg-white/10 p-0.5 rounded"/>
          <div>
            <div class="font-bold text-[16px] leading-tight flex items-center gap-2">
              <span>Trustline Assistant</span>
              <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div class="text-[12.5px] text-[#fedfa5] opacity-90 mt-0.5">Evidential Risk &amp; Investigation AI</div>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <button id="tl-clear-btn" title="Clear chat history" class="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors text-[13px]">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
          </button>
          <button id="tl-close-win-btn" title="Close chat" class="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Quick Inquiry Chips Ribbon -->
      <div class="bg-white border-b border-[#E4E2DC] px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button class="tl-chip-btn shrink-0" data-prompt="What services do you provide for insurance claims?">🛡️ Claims</button>
        <button class="tl-chip-btn shrink-0" data-prompt="How does employee background verification work?">🔍 BGV Checks</button>
        <button class="tl-chip-btn shrink-0" data-prompt="What is your turnaround time and Gujarat coverage?">⏱️ TAT &amp; Coverage</button>
        <button class="tl-chip-btn shrink-0" data-prompt="How can I contact or retain Trustline?">📞 Contact Desk</button>
      </div>

      <!-- Messages Box -->
      <div id="tl-messages" class="tl-messages-box">
        <!-- Initial assistant greeting -->
        <div class="tl-msg tl-msg-assistant">
          <div class="font-semibold text-primary text-[13px] mb-2 flex items-center gap-1.5">
            <span>Trustline Advisory</span>
            <span class="text-[11.5px] text-secondary font-normal">• Official AI Desk</span>
          </div>
          <div class="text-[15.5px] leading-relaxed">
            Welcome to <strong>Trustline Verification Services</strong>. I am your Evidential Risk AI assistant.<br/><br/>
            Ask me anything regarding:
            <div class="my-2 space-y-1.5 pl-1 text-[15px]">
              <div class="flex items-start gap-2"><span class="text-[#a28856] font-bold">•</span><span><strong>Insurance Claims Inquiries</strong> (Health, Life, Motor)</span></div>
              <div class="flex items-start gap-2"><span class="text-[#a28856] font-bold">•</span><span><strong>Employee Background Checks</strong> (Physical address, education, court)</span></div>
              <div class="flex items-start gap-2"><span class="text-[#a28856] font-bold">•</span><span><strong>Turnaround Protocols &amp; Pan-Gujarat Operations</strong></span></div>
            </div>
            <div class="text-[13.5px] text-secondary mt-3">How may I assist your corporate inquiry today?</div>
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div id="tl-typing" class="hidden px-5 py-2.5 bg-[#faf9f5] flex items-center gap-2.5 text-secondary text-sm">
        <span class="text-[13px]">Trustline AI is thinking</span>
        <div class="flex items-center gap-1.5">
          <span class="tl-typing-dot"></span>
          <span class="tl-typing-dot"></span>
          <span class="tl-typing-dot"></span>
        </div>
      </div>

      <!-- Input Bar -->
      <form id="tl-input-form" class="tl-input-bar">
        <input id="tl-user-input" type="text" placeholder="Ask about claims, BGV, or risk advisory..." class="tl-input-field" autocomplete="off"/>
        <button id="tl-send-btn" type="submit" class="tl-send-btn" aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      <div class="bg-white px-4 py-2 border-t border-[#f0eee6] text-center text-[12px] text-secondary">
        Confidential inquiries are protected under institutional NDA.
      </div>
    `;
    document.body.appendChild(win);
  }

  // Append a message to the UI
  function appendMessage(role, content) {
    const box = document.getElementById('tl-messages');
    if (!box) return;

    const msgEl = document.createElement('div');
    msgEl.className = `tl-msg ${role === 'user' ? 'tl-msg-user' : 'tl-msg-assistant'}`;

    if (role === 'assistant') {
      msgEl.innerHTML = `
        <div class="font-semibold text-primary text-[13px] mb-1.5 flex items-center gap-1.5">
          <span>Trustline AI</span>
          <span class="text-[11.5px] text-secondary font-normal">• Evidential Advisory</span>
        </div>
        <div class="text-[15.5px] leading-relaxed">${renderMarkdown(content)}</div>
      `;
    } else {
      msgEl.textContent = content;
    }

    box.appendChild(msgEl);
    box.scrollTop = box.scrollHeight;
  }

  // Call Groq API
  async function callGroqAPI(userText) {
    const typingIndicator = document.getElementById('tl-typing');
    const sendBtn = document.getElementById('tl-send-btn');
    const inputField = document.getElementById('tl-user-input');

    if (typingIndicator) typingIndicator.classList.remove('hidden');
    if (sendBtn) sendBtn.disabled = true;
    if (inputField) inputField.disabled = true;

    // Add user message to state
    conversationHistory.push({ role: 'user', content: userText });
    saveHistory();

    // Prepare message payload
    const messagesPayload = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-8) // Keep last 8 turns for context & stay within token budget
    ];

    try {
      const response = await fetch(GROQ_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + GROQ_CONFIG.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_CONFIG.model,
          max_tokens: GROQ_CONFIG.maxTokens,
          temperature: GROQ_CONFIG.temperature,
          messages: messagesPayload
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'I apologize, I could not generate a response. Please contact our operational desk directly.';

      conversationHistory.push({ role: 'assistant', content: reply });
      saveHistory();
      appendMessage('assistant', reply);

    } catch (err) {
      console.error('Trustline Chatbot API Error:', err);
      const fallbackReply = `Our evidential AI desk is currently experiencing high mandate traffic. For immediate parameters or ground inquiries, please contact Director Dinesh Patel's desk directly at **+91 99250 29005** or email **trustline@trustlinevs.com**.`;
      appendMessage('assistant', fallbackReply);
    } finally {
      if (typingIndicator) typingIndicator.classList.add('hidden');
      if (sendBtn) sendBtn.disabled = false;
      if (inputField) {
        inputField.disabled = false;
        inputField.focus();
      }
    }
  }

  // Initialize Chatbot Event Listeners
  function initChatbot() {
    loadHistory();
    injectStyles();
    createChatbotUI();

    const launcher = document.getElementById('tl-chat-launcher');
    const toggleBtn = document.getElementById('tl-toggle-btn');
    const pill = document.getElementById('tl-launcher-pill');
    const win = document.getElementById('tl-chat-window');
    const closeWinBtn = document.getElementById('tl-close-win-btn');
    const clearBtn = document.getElementById('tl-clear-btn');
    const iconChat = document.getElementById('tl-icon-chat');
    const iconClose = document.getElementById('tl-icon-close');
    const form = document.getElementById('tl-input-form');
    const input = document.getElementById('tl-user-input');

    // Restore previous conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        appendMessage(msg.role, msg.content);
      });
    }

    function toggleChat(openState) {
      const isOpen = typeof openState === 'boolean' ? openState : !win.classList.contains('tl-open');
      if (isOpen) {
        win.classList.add('tl-open');
        iconChat.classList.add('hidden');
        iconClose.classList.remove('hidden');
        if (pill) pill.classList.add('hidden');
        setTimeout(() => input && input.focus(), 150);
      } else {
        win.classList.remove('tl-open');
        iconChat.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    }

    if (toggleBtn) toggleBtn.addEventListener('click', () => toggleChat());
    if (pill) pill.addEventListener('click', () => toggleChat(true));
    if (closeWinBtn) closeWinBtn.addEventListener('click', () => toggleChat(false));

    // Clear history
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear conversation history?')) {
          conversationHistory = [];
          localStorage.removeItem(STORAGE_KEY);
          const box = document.getElementById('tl-messages');
          if (box) {
            box.innerHTML = `
              <div class="tl-msg tl-msg-assistant">
                <div class="font-semibold text-primary text-[12px] mb-1 flex items-center gap-1">
                  <span>Trustline Advisory</span>
                  <span class="text-[10px] text-secondary font-normal">• Reset</span>
                </div>
                Conversation cleared. How can I assist your risk verification mandate today?
              </div>
            `;
          }
        }
      });
    }

    // Submit handler
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        appendMessage('user', text);
        callGroqAPI(text);
      });
    }

    // Quick chip buttons
    document.querySelectorAll('.tl-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        if (prompt) {
          appendMessage('user', prompt);
          callGroqAPI(prompt);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && win && win.classList.contains('tl-open')) {
        toggleChat(false);
      }
    });
  }

  // Mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
