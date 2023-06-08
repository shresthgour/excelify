import React, { useRef } from 'react'
import Navbar from './components/Navbar'
import InteractiveExcelSheet from './components/InteractiveExcelSheet'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Footer from './components/Footer'

const App = () => {
  const targetRef = useRef(null)
  return (
    <>
      <Navbar />
      <Hero targetRef={targetRef} />
      <Stats />
      <InteractiveExcelSheet ref={targetRef} />
      <Footer/>
    </>
  )
}

export default App