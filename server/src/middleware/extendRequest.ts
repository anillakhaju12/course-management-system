import type { Request } from "express"


export interface ExtendRequest extends Request{
  userData ?: {
    id: string
    instituteNumber ?: string |number
  },
}