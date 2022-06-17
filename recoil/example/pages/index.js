import Head from 'next/head'
import * as Recoil from './../../hook/src'
import { screens } from 'tailwindcss/defaultTheme'

export default function Home () {
  const viewport = Recoil.useViewport(screens)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{viewport.currentWidth}</p>

      <p>{viewport.activeBreakpoint}</p>
    </>
  )
}
