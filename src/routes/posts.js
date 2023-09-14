import express from 'express';

import { prisma } from '../utils/prisma/index.js'

const router = express.Router()

// 게시글 작성 API
router.post('/posts', async (req, res, next) => {
    const { title, content } = req.body

    const post = await prisma.posts.create({
        data: {
            title,
            content
        }
    })
    return res.status(201).json({ data: post })
})


// 게시글 조회 API
router.get('/posts', async (req, res, next) => {
    const posts = await prisma.posts.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return res.status(200).json({ data: posts })
})


// 게시글 수정 API
router.put('/posts/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        

        const post = await prisma.posts.findUnique({
            where: { id: +postId },
        });

        if (!post) {

            return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
        }


        // 게시글 수정.
        await prisma.posts.update({
            data: {
                title, content
            },
            where: {
                id: +postId,
            },
        });

        return res.status(200).json({ data: '게시글이 수정되었습니다.' });
    } catch (err) {

        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});


// 게시글 삭제 API - DELETE
router.delete('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        // 해당 postId와 일치하는 게시글을 조회
        const post = await prisma.posts.findUnique({
            where: { id: +postId },
        });

        if (!post) {
            return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
        }

        // 게시글 삭제
        await prisma.posts.delete({
            where: { id: +postId },
        });

        return res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (err) {

        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

export default router;