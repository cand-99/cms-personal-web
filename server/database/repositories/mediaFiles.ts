import prisma from '~/server/database/client'
export async function createMediaFile(mediaFile: any) {
  await prisma.mediaFile.create({
    data: mediaFile,
  })
}

export async function deleteMediaFiles(projectId: string): Promise<void> {
  await prisma.mediaFile.delete({
    where: {
      projectId,
    },
  })
}
