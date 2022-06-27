export interface Survey {
  id: string | null
  email: string
  ageRangeId: string
  genderId: string
  favSocialMedia: string
  hours: Hours
}
export interface Hours {
  facebook: number
  instagram: number
  tiktok: number
  twitter: number
  whatsapp: number
  youtube: number
}