import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
export class MeetingGuest {
  @Field((type) => Int)
  meetingId: number

  @Field((type) => Int)
  userId: number
}