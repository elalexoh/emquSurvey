export interface DataSet {
  name: string,
  users: number,
  ages: AgesRange[],
}
export interface AgesRange {
  name: string,
  count: number
}
