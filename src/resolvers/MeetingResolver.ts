import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ID,
  InputType,
  Field,
} from 'type-graphql'
import { Meeting } from '../schemas/Meeting'
import { Context } from '../context'

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
        owner: {
          connect: {
            id: 1 // TODO
          }
        }
      },
    })
  }

  @Query((returns) => Meeting, { nullable: true })
  async meeting(
      @Arg('meetingId', (type) => ID) meetingId: number,
      @Ctx() ctx: Context
  ) {
    return ctx.prisma.meeting.findUnique({
      where: { id: Number(meetingId) },
    })
  }

  @Query((returns) => [Meeting])
  async listMeetings(
    @Ctx() ctx: Context) {

    return ctx.prisma.meeting.findMany({})
  }
}