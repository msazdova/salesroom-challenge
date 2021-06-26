import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Meeting } from './Meeting'
import { User } from './User'
import { Context } from './context'

@InputType()
export class MeetingCreateInput {
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
}

@Resolver(Meeting)
export class MeetingResolver {

  @Mutation((returns) => Meeting)
  async createMeeting(
    @Arg('data') data: MeetingCreateInput,

    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.meeting.create({
      data: {
        title: data.title,
        introduction: data.introduction,
        status: data.status,
        state: data.state,
        startTime: data.startTime,
        endTime: data.endTime,
        ownerId: 123
      },
    })
  }
}