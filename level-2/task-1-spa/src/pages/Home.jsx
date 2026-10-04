import { Link } from "react-router-dom";

export default function Home() {
  return (
    <article className="page">
      <p className="eyebrow">Independent publisher</p>
      <h1>Short books for the walk home.</h1>
      <p className="lede">
        Orchard Press prints essays, field notes, and the occasional stubborn
        poem. Three people, one letterpress, and a list that stays small on
        purpose.
      </p>
      <Link className="button" to="/about">
        Meet the press
      </Link>
      <ul className="titles">
        <li>
          <span>01</span>
          <div>
            <h2>Salt on the Map</h2>
            <p>A coastal notebook by I. Rahman. 96 pages.</p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h2>Room Tone</h2>
            <p>Essays on quiet apartments and loud neighbors.</p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h2>Second Pressing</h2>
            <p>How a print run of 400 is actually made.</p>
          </div>
        </li>
      </ul>
    </article>
  );
}
