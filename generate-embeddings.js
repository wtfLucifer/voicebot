import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const model = 'text-embedding-ada-002';

const inputPath = './data/tarun-memory.json';
const outputPath = './data/vector-db.json';

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
};

(async () => {
  const entries = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

  const embeddedData = [];

  for (const entry of entries) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        input: entry.question,
        model,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.data || !Array.isArray(json.data) || !json.data[0]) {
    throw new Error('API response does not contain expected data');
    }
    const embedding = json.data[0].embedding;

    embeddedData.push({
      ...entry,
      embedding,
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(embeddedData, null, 2));
  console.log('✅ Embedding database saved to', outputPath);
})();
