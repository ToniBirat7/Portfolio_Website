import YAML from 'yaml';

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, content: raw.trim() };

  const frontmatterStr = match[1];
  const content = match[2].trim();

  let attributes = {};
  try {
    attributes = YAML.parse(frontmatterStr) || {};
  } catch {
    attributes = {};
  }

  return { attributes, content };
}

export function normalizeStringArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === 'string' ? item.trim() : String(item).trim(),
      )
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeFaqs(value) {
  if (!value) return [];

  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry) return null;

      if (typeof entry === 'string') {
        const [question, ...answerParts] = entry.split('::');
        if (!question || !answerParts.length) return null;

        return {
          question: question.trim(),
          answer: answerParts.join('::').trim(),
        };
      }

      const question = entry.question || entry.q || entry.prompt;
      const answer = entry.answer || entry.a || entry.response;
      if (!question || !answer) return null;

      return {
        question: String(question).trim(),
        answer: String(answer).trim(),
      };
    })
    .filter(Boolean);
}

export function extractTOC(markdown) {
  const headings = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      id: match[2]
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-'),
    });
  }

  return headings;
}

export function calcReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 238));
}

export function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/[>*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toIsoDate(input) {
  if (!input) return null;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function toDateOnly(input) {
  const iso = toIsoDate(input);
  if (!iso) return null;
  return iso.split('T')[0];
}
