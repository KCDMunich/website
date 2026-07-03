export const SESSIONIZE_SPEAKERS_URL =
  "https://sessionize.com/api/v2/1yvxke5i/view/Speakers"

export const PRE_ANNOUNCED_SPEAKER_IDS = [
  "a2665c2b-13c9-4337-9c78-db85bca70e60",
  "b4047d7c-94cf-4f5e-bbdb-7619ab241f06",
  "be3da75f-4550-4f7f-9d44-863076ed4e91",
  "647c84a5-1a13-4641-8d8f-49109cadf78b",
  "8f398417-82f0-467a-b234-08e82f7f9acd",
  "38a4131f-b1ca-452a-aaba-f5bb472403ab",
]

export const SPEAKER_SESSION_MAP: Record<string, number[]> = {
  "a2665c2b-13c9-4337-9c78-db85bca70e60": [882116],
  "b4047d7c-94cf-4f5e-bbdb-7619ab241f06": [847107],
  "be3da75f-4550-4f7f-9d44-863076ed4e91": [836276],
  "647c84a5-1a13-4641-8d8f-49109cadf78b": [870316],
  "8f398417-82f0-467a-b234-08e82f7f9acd": [867444],
  "38a4131f-b1ca-452a-aaba-f5bb472403ab": [855080],
}

export interface SpeakerSession {
  id: number
  name: string
}

export interface SpeakerLink {
  title: string
  url: string
  linkType: string
}

export interface SpeakerQuestionAnswer {
  question: string
  answer: string
}

export interface Speaker {
  id: string
  fullName: string
  bio: string
  profilePicture: string
  sessions: SpeakerSession[]
  links: SpeakerLink[]
  questionAnswers: SpeakerQuestionAnswer[]
}