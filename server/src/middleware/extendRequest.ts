import type { Request } from "express"


export interface ExtendRequest extends Request{
  userData ?: {
    id: string,
    username : string,
    email : string,
    role : string
  },
  instituteNumber ?: string |number
}