export default interface Link {
  readonly name: string
  readonly redirect: string
  readonly description?: string
  readonly pinned: boolean
  readonly createdBy: string
  readonly views: number
}
