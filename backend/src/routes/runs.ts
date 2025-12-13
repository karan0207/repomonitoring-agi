import { Router } from 'express';
import split = require('split-string');
import prisma from '../lib/prisma';

const router = Router();

// Trigger a new run
router.post('/trigger', async (req, res) => {
    try {
        const { repoId, triggerType = 'manual' } = req.body;

        if (!repoId) {
            return res.status(400).json({ error: 'Repo ID is required' });
        }

        // Create a run record
        const run = await prisma.run.create({
            data: {
                repositoryId: repoId,
                triggerType,
                status: 'queued',
            },
        });

        // TODO: Trigger Kestra workflow here

        res.json(run);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get runs for a repo
router.get('/:repoId', async (req, res) => {
    try {
        const { repoId } = req.params;
        const runs = await prisma.run.findMany({
            where: { repositoryId: repoId },
            orderBy: { startedAt: 'desc' },
            take: 10
        });
        res.json(runs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
