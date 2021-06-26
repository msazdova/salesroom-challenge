import 'reflect-metadata'
import { ObjectType, Field, ID, Int } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class Meeting {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field()
  title: string

  @Field()
  introduction: string

  @Field()
  status: string

  @Field()
  state: string

  @Field((type) => Date)
  startTime: Date

  @Field((type) => Date)
  endTime: Date

  @Field((type) => User, { nullable: true })
  owner: User | null

  @Field((type) => Int)
  ownerId: number

}