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

@InputType()
export class MeetingUpdateInput extends MeetingCreateInput {
  @Field((type) => ID)
  id: number
}

@InputType()
export class MeetingDeleteInput {
  @Field((type) => ID)
  id: number
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

  @Mutation((returns) => Meeting)
  async updateMeeting(
    @Arg('input') input: MeetingUpdateInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.meeting.update({
      where: {
        id: Number(input.id)
      },
      data: {
        title: input.title,
        introduction: input.introduction,
        status: input.status,
        state: input.state,
        startTime: new Date(input.startTime),
        endTime: new Date(input.endTime),
      },
    })
  }

  @Mutation((returns) => Meeting, { nullable: true })
  async deleteMeeting(
    @Arg('input') input: MeetingDeleteInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.meeting.delete({
      where: {
        id: Number(input.id)
      },
    })
  }
}