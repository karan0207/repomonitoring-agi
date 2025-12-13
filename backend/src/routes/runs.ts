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

        // Trigger Kestra workflow
        const kestraUrl = 'http://localhost:8080/api/v1/executions/devops_agi/repo_maintenance_flow';

        // We need to fetch repository details to get the URL
        const repo = await prisma.repository.findUnique({ where: { id: repoId } });
        if (!repo) throw new Error("Repository not found");

        const repoUrl = `https://github.com/${repo.owner}/${repo.name}.git`;

        console.log(`[Mock] Triggering Kestra for ${repoUrl} RunID: ${run.id}`);

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
