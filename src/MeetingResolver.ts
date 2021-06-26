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

  @Field()
  startTime: string

  @Field()
  endTime: string
}

@Resolver(Meeting)
export class MeetingResolver {

  @Mutation((returns) => Meeting)
  async createMeeting(
    @Arg('input') input: MeetingCreateInput,

    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.meeting.create({
      data: {
        title: input.title,
        introduction: input.introduction,
        status: input.status,
        state: input.state,
        startTime: new Date(input.startTime),
        endTime: new Date(input.endTime),
        ownerId: 1
      },
    })
  }

  @Query((returns) => Meeting, { nullable: true })
  async meeting(@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.meeting.findUnique({
      where: { id },
    })
  }
}