import type { ITechnology } from '~~/types/ITechnology'
export interface IProject {
  id?: string
  name: string
  image: string
  description?: string | undefined
  description_id: string
  description_en: string
  description_ja: string
  description_ko: string
  dateStart: string
  dateEnd: string
  technologyIDs?: string[] | undefined
  technology?: ITechnology[]
}
