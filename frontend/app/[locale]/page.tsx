import Home from "./home/page"

export default function Page({ params }: { params: { locale: string } }) {
  return <Home params={params} />
}
