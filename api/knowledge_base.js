import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'knowledge_base.json');

    if (req.method === 'GET') {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            res.status(200).json(JSON.parse(data));
        } catch (err) {
            res.status(500).json({ error: 'Error reading knowledge base' });
        }
    } else if (req.method === 'POST') {
        try {
            const newEntry = req.body;
            const data = fs.readFileSync(filePath, 'utf8');
            const knowledgeBase = JSON.parse(data);
            knowledgeBase.questions.push(newEntry);
            fs.writeFileSync(filePath, JSON.stringify(knowledgeBase, null, 2));
            res.status(200).json({ message: 'Knowledge base updated' });
        } catch (err) {
            res.status(500).json({ error: 'Error updating knowledge base' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
