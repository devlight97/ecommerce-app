import { NextPage } from 'next'
import Link from 'next/link'

const About: NextPage = () => {
  return (
    <div>
      <h1>ABOUT PAGE</h1>
      <Link href="/">
        <a>Back Home</a>
      </Link>
    </div>
  );
}

export default About;
