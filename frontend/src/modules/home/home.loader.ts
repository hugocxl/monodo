export async function homeLoader({ params }: { params: { date: string } }) {
  return params.date
}
