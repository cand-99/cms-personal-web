import prisma from '~/server/database/client'
export async function createMediaFile(mediaFile: any) {
  await prisma.mediaFile.create({
    data: mediaFile,
  })
}
