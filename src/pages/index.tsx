import Banner from "../components/banner";
import Intro from "../components/intro";
import Demo from "../components/demo";
import Detail from "../components/detail";
import Join from "../components/join";
import Roadmap from "../components/roadmap";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Intro />
      <Demo />
      <Detail />
      <Join />
      <Roadmap />
      <Footer />
    </div>
  );
}
