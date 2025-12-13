import { Router } from 'express';
import prisma from '../lib/prisma';
import { getOctokit } from '../lib/github';

const router = Router();

// Connect a repository
router.post('/connect', async (req, res) => {
    try {
        const { owner, name } = req.body;

        if (!owner || !name) {
            return res.status(400).json({ error: 'Owner and name are required' });
        }

        // Verify with GitHub
        const octokit = getOctokit();
        let githubRepo;
        try {
            const { data } = await octokit.rest.repos.get({
                owner,
                repo: name,
            });
            githubRepo = data;
        } catch (error) {
            return res.status(404).json({ error: 'Repository not found on GitHub' });
        }

        // Upsert into DB
        const repo = await prisma.repository.upsert({
            where: {
                githubRepoId: githubRepo.id,
            },
            update: {
                owner,
                name,
                defaultBranch: githubRepo.default_branch,
            },
            create: {
                githubRepoId: githubRepo.id,
                owner,
                name,
                defaultBranch: githubRepo.default_branch,
            },
        });

        res.json(repo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List connected repositories
router.get('/', async (req, res) => {
    const repos = await prisma.repository.findMany({
        orderBy: { connectedAt: 'desc' },
    });
    res.json(repos);
});

export default router;
