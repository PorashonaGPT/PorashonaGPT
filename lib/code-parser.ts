interface CodeBlock {
  language: string;
  code: string;
}

export function extractCodeBlocks(text: string): { codeBlocks: CodeBlock[], cleanText: string } {
  const codeBlockRegex = /\`\`\`(\w+)?\n([\s\S]*?)\`\`\`/g;
  const codeBlocks: CodeBlock[] = [];
  let cleanText = text;

  let match;
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const language = match[1] || 'plaintext';
    const code = match[2].trim();
    codeBlocks.push({ language, code });
    cleanText = cleanText.replace(match[0], `[Code Block: ${language}]`);
  }

  return { codeBlocks, cleanText };
}

