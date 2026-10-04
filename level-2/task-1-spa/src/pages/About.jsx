export default function About() {
  return (
    <article className="page">
      <p className="eyebrow">About</p>
      <h1>A press with a narrow door.</h1>
      <p className="lede">
        We started in a rented room above a bakery. The smell of bread still
        gets into the paper if the windows are open. That is not a metaphor.
      </p>
      <div className="split">
        <section>
          <h2>What we print</h2>
          <p>
            Nonfiction under 30,000 words, and poetry only when it earns the
            paper. We do not take unsolicited novels.
          </p>
        </section>
        <section>
          <h2>Who reads them</h2>
          <p>
            Booksellers who still write shelf notes, and readers who finish a
            book on one train line.
          </p>
        </section>
      </div>
    </article>
  );
}
