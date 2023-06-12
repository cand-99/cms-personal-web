import type { IMediaFiles } from './IMediaFiles'
import type { ITechnology } from '~~/types/ITechnology'

export interface IProject {
  id?: string
  name: string
  description?: string | undefined
  description_id: string
  description_en: string
  description_ja: string
  description_ko: string
  dateStart: string
  dateEnd: string
  url: string
  isActive: boolean
  category: 'Personal' | 'Team'
  technologyIDs?: string[] | undefined
  technology?: ITechnology[]
  mediaFiles?: IMediaFiles | null
}
