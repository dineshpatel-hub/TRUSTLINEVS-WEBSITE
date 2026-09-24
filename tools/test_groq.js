const key = '';
const systemPrompt = `You are the official AI assistant for Trustline Verification Services, an elite risk mitigation and corporate investigation firm in Gujarat, India, founded by Mr. Dinesh Patel (30+ years institutional acumen).
Trustline specializes in:
1. Insurance Claims Investigation (Health, Life/Death claims, Motor accident reconstruction, hospital fraud audits, evidential dossiers).
2. Employee Background Verification (Physical address checks, education & employment history verification, criminal/court record checks, C-Suite executive vetting).
Headquarters: Ahmedabad, Gujarat. Operates across all Gujarat districts with 25+ field operatives.
TAT: Typically 2-5 business days.
Tone: Professional, confidential, articulate, executive, and helpful. Always encourage booking a consultation or contacting trustline@trustlinevs.com / +91 99250 29005 for formal mandates. Keep responses concise (under 120 words).`;

async function test() {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'qwen/qwen3.8-27b',
      max_tokens: 300,
      temperature: 0.5,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'What services do you provide for insurance claims?' }
      ]
    })
  });
  const data = await res.json();
  console.log('Groq Response:\n', data.choices?.[0]?.message?.content);
}

test().catch(console.error);
