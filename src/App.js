import { React } from 'react';
import './index.scss';

import { Header } from './components/Header';
// import { MainNav } from './components/MainNav';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

export default function App() {

  return (
    <>
      <Header />
      <main className="container-fluid App-main">
        {/* <MainNav /> */}
        <Content />
      </main>
      <Footer />
    </>
  )
}