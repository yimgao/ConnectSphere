import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    avatar: String
    isVerified: Boolean!
    profile: Profile
    createdAt: String!
  }

  type Profile {
    id: ID!
    userId: ID!
    bio: String
    courses: [String!]!
    major: String
    year: Int
    studyStyle: [StudyStyle!]!
    availability: [Availability!]!
    location: String
    preferences: Preferences!
  }

  enum StudyStyle {
    VISUAL
    AUDITORY
    KINESTHETIC
    READING_WRITING
  }

  type TimeSlot {
    start: String!
    end: String!
  }

  type Availability {
    day: AvailabilityDay!
    timeSlots: [TimeSlot!]!
  }

  enum AvailabilityDay {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  type Preferences {
    groupSize: Int!
    studyEnvironment: [String!]!
    subjectsOfInterest: [String!]!
  }

  type Group {
    id: ID!
    name: String!
    description: String
    course: String!
    createdBy: User!
    members: [User!]!
    maxMembers: Int!
    status: GroupStatus!
    tags: [String!]!
    meetingSchedule: MeetingSchedule
    createdAt: String!
  }

  enum GroupStatus {
    ACTIVE
    INACTIVE
    ARCHIVED
  }

  type MeetingSchedule {
    frequency: String!
    day: String
    time: String
    location: String
  }

  type Message {
    id: ID!
    groupId: ID!
    sender: User!
    type: MessageType!
    content: String!
    attachments: [String!]
    isEdited: Boolean!
    editedAt: String
    replyTo: Message
    reactions: [Reaction!]!
    createdAt: String!
  }

  enum MessageType {
    TEXT
    IMAGE
    FILE
    SYSTEM
  }

  type Reaction {
    emoji: String!
    users: [User!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ProfileInput {
    bio: String
    courses: [String!]!
    major: String
    year: Int
    studyStyle: [StudyStyle!]!
    availability: [AvailabilityInput!]!
    location: String
    preferences: PreferencesInput!
  }

  input AvailabilityInput {
    day: AvailabilityDay!
    timeSlots: [TimeSlotInput!]!
  }

  input TimeSlotInput {
    start: String!
    end: String!
  }

  input PreferencesInput {
    groupSize: Int!
    studyEnvironment: [String!]!
    subjectsOfInterest: [String!]!
  }

  input GroupInput {
    name: String!
    description: String
    course: String!
    maxMembers: Int
    tags: [String!]
    meetingSchedule: MeetingScheduleInput
  }

  input MeetingScheduleInput {
    frequency: String!
    day: String
    time: String
    location: String
  }

  input MessageInput {
    groupId: ID!
    content: String!
    type: MessageType
    replyTo: ID
  }

  type Query {
    me: User
    users: [User!]!
    groups: [Group!]!
    group(id: ID!): Group
    messages(groupId: ID!, limit: Int, offset: Int): [Message!]!
    findStudyPartners(course: String, studyStyle: [StudyStyle!], availability: [AvailabilityInput!]): [User!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createProfile(input: ProfileInput!): Profile!
    updateProfile(input: ProfileInput!): Profile!
    createGroup(input: GroupInput!): Group!
    joinGroup(groupId: ID!): Group!
    leaveGroup(groupId: ID!): Group!
    sendMessage(input: MessageInput!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Subscription {
    messageAdded(groupId: ID!): Message!
    groupUpdated(groupId: ID!): Group!
  }
`;