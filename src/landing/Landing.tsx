import { useRef, useState, type FormEvent } from 'react'
import { sendContactMessage, type ContactResult } from '../lib/contact'
import './Landing.css'

// The ideas section: Karen's references, folded into the game as
// design instructions rather than a reading list (concept v0.3 §2).
const IDEAS = [
  {
    author: 'Norbert Wiener',
    work: 'The Human Use of Human Beings, 1950',
    gives: 'Why there is no villain',
    body: 'The founding text of cybernetics: systems, feedback loops, and what happens to people inside machines that optimise. This is a game about a system, not about villains — nobody in the fashion supply chain is evil; everyone is responding rationally to feedback. You never choose to destroy a river. You choose a colour that sells.',
  },
  {
    author: 'E. F. Schumacher',
    work: 'Small Is Beautiful, 1973',
    gives: 'What repair actually looks like',
    body: 'Human-scale economics; production that fits the place it happens in. Repair in Act 2 isn\u2019t \u201cspend money on green\u201d \u2014 it\u2019s repair hubs, regional micro-mills, skills transfer, commons ownership. Cheap, local, slow, unglamorous, and it actually works. It\u2019s also why the good ending is small, not big.',
  },
  {
    author: 'Marge Piercy',
    work: 'Woman on the Edge of Time, 1976',
    gives: 'The positive vision',
    body: 'Utopia and dystopia running in parallel, reachable from the same present \u2014 and a picture of what clothing looks like in a good society: made to last, repaired, shared, ceremonial, beautiful. The reward for playing well isn\u2019t a smaller number. It\u2019s a world with better clothes in it.',
  },
  {
    author: 'Edward Burtynsky',
    work: 'Manufactured Landscapes',
    gives: 'How Act 2 looks',
    body: 'Large-format photography of industrial landscapes \u2014 tailings ponds, shipbreaking yards, vast garment factory floors. Beautiful, sublime even, and that beauty is what makes them unbearable. Act 2 borrows the register: wide, still, aerial, quiet. Scale does the emotional work. No music swelling, no text telling you it\u2019s sad.',
  },
]

export function Landing() {
  const [joinNote, setJoinNote] = useState(false)
  const contactRef = useRef<HTMLElement>(null)
  const ideasRef = useRef<HTMLElement>(null)
  const gameRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: 'smooth' })

  const onJoin = () => {
    setJoinNote(true)
    scrollTo(contactRef)
  }

  return (
    <div className="landing">
      {/* ============ hero ============ */}
      <header className="hero">
        <video
          className="hero-video"
          src="/assets/hinge/a4-bale-port-hinge.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-scrim" />
        <nav className="hero-nav">
          <span className="hero-brand">Fashion Virus</span>
          <div className="hero-links">
            <button type="button" onClick={() => scrollTo(gameRef)}>The game</button>
            <button type="button" onClick={() => scrollTo(ideasRef)}>The ideas</button>
            <button type="button" onClick={() => scrollTo(contactRef)}>Contact</button>
            <button type="button" className="hero-join" onClick={onJoin}>
              Join / Log in
            </button>
          </div>
        </nav>
        <div className="hero-content">
          <p className="eyebrow hero-kicker">A game in two acts</p>
          <img
            className="hero-logo"
            src="/assets/brand/fashion-virus-label.png"
            alt="FASHION VIRUS — a clothing label, dye-stained"
          />
          <p className="hero-tagline">Build a fashion empire. Face the fallout.</p>
          <p className="hero-sub">
            A browser game about the real cost of fast fashion &mdash; played from the inside.
          </p>
          <div className="hero-ctas">
            <a className="btn-hero" href="#play">Play the game</a>
            <button className="btn-hero-ghost" type="button" onClick={() => scrollTo(ideasRef)}>
              The ideas behind it
            </button>
          </div>
        </div>
        <p className="hero-note">25&ndash;30 minutes &middot; free &middot; plays in your browser</p>
      </header>

      {/* ============ the game ============ */}
      <section className="section" ref={gameRef}>
        <p className="eyebrow section-kicker">The game</p>
        <h2 className="section-title">The world remembers what you did.</h2>
        <p className="section-lede">
          You start with a bedroom label and a thesis. Sixteen seasons later you might have a
          global brand &mdash; and all the while a hidden ledger of water, carbon, microplastics,
          waste, land and working lives accumulates where you can&rsquo;t see it. Then the
          interface falls away, and the world you built becomes the world you must walk into.
        </p>

        <div className="acts">
          <article className="act">
            <img className="act-media" src="/assets/editorial/glitch-dress.png" alt="Editorial photograph: a dress, glitching" />
            <p className="eyebrow act-num">Act 1</p>
            <h3 className="act-name">Fashion Virus</h3>
            <p className="act-body">
              Bedroom label to global brand. Glossy, seductive, fast. You choose materials,
              labour, speed, transparency &mdash; and the interface itself slowly rots as the
              damage mounts, quietly enough that you won&rsquo;t consciously notice.
            </p>
          </article>
          <article className="act">
            <video
              className="act-media"
              src="/assets/hinge/a7-company-town-hinge.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <p className="eyebrow act-num">The hinge</p>
            <h3 className="act-name">The Reveal</h3>
            <p className="act-body">
              Awards. A valuation. Covers. A standing ovation &mdash; and it feels genuinely
              good. Then, while you&rsquo;re on stage, the ledger balances itself.
            </p>
          </article>
          <article className="act">
            <img className="act-media" src="/assets/editorial/landfill-gown.png" alt="Editorial photograph: a gown in a landfill landscape" />
            <p className="eyebrow act-num">Act 2</p>
            <h3 className="act-name">Wasteworld</h3>
            <p className="act-body">
              Five years of repair in the landscape your choices made. Destruction is fast.
              Repair is slow &mdash; and partial. That asymmetry is what makes the game honest.
            </p>
          </article>
        </div>
      </section>

      {/* ============ how it plays ============ */}
      <section className="section section-dark">
        <p className="eyebrow section-kicker">How it plays</p>
        <h2 className="section-title">Every decision has a face value and a truth.</h2>
        <div className="how-grid">
          <div className="how-card">
            <blockquote className="how-quote">
              <p className="how-offer">A hedge fund offers &pound;500,000.</p>
              <p className="how-buttons">
                <span>[ ACCEPT ]</span> cash now. <span>[ LEARN MORE ]</span> costs one turn.
              </p>
              <p className="how-truth">&hellip;they also fund controversial animal research.</p>
            </blockquote>
            <p>
              Looking costs a turn &mdash; which is exactly why nobody looks. Eight turns later a
              journalist makes the link. You can&rsquo;t say <em>&ldquo;I didn&rsquo;t
              know.&rdquo;</em> Only <em>&ldquo;I didn&rsquo;t look.&rdquo;</em>
            </p>
          </div>
          <div className="how-points">
            <div className="how-point">
              <h3>The hidden ledger</h3>
              <p>
                Water, emissions, microplastics, waste, land, labour &mdash; tracked from turn
                one, shown only at the reveal. The end screen converts it into things a person
                can picture: Olympic pools, London&ndash;New York flights, bin lorries, working
                lives.
              </p>
            </div>
            <div className="how-point">
              <h3>Real numbers, sourced</h3>
              <p>
                Between seasons, THE RECORD surfaces real, audited industry figures. Every fact
                and conversion in the game is sourced &mdash; this is a learning experience
                wearing a game&rsquo;s clothes.
              </p>
            </div>
            <div className="how-point">
              <h3>Social capital</h3>
              <p>
                Alongside cash, heat and novelty, the game tracks trust, belonging, ambassadors.
                Earned slowly &mdash; repair, transparency, paying properly &mdash; it decides
                whether you face the ending alone or held. Damage decides the world; social
                capital decides the company you keep in it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ the ideas ============ */}
      <section className="section" ref={ideasRef}>
        <p className="eyebrow section-kicker">The ideas</p>
        <h2 className="section-title">Built on ideas worth taking seriously.</h2>

        <div className="karen">
          <img
            className="karen-photo"
            src="/assets/people/karen-dennis.jpg"
            alt="Dr Karen Dennis"
          />
          <div className="karen-bio">
            <p className="eyebrow karen-kicker">The research</p>
            <h3 className="karen-name">Dr Karen Dennis</h3>
            <p className="karen-role">Founder of Ketchup Clothes &mdash; known to most as Karen Ketchup</p>
            <p>
              Fashion Virus is grounded in the research and lived practice of Dr Karen Dennis.
              Trained at the London College of Fashion, with a textile design degree from Leeds
              University, she spent six years researching the impact of textile and clothing
              production on rural communities across Zambia, India and Nepal &mdash; and she has
              been making clothes from reclaimed materials since 1990, when a project with Oxfam
              first put discarded textiles in her hands.
            </p>
            <p>
              Today she runs <strong>Ketchup Clothes</strong> in Clacton-on-Sea: part studio,
              part shop, part community hub &mdash; repairs and alterations, sewing courses
              through the Ketchup Academy, and streetwear handcrafted from materials that were on
              their way to landfill. It is, in miniature, the world this game argues for &mdash;
              repair-first, local, human-scale &mdash; running as a real business. Every dilemma
              card you&rsquo;re dealt draws on her research.
            </p>
            <a className="karen-link" href="https://ketchupclothes.com" target="_blank" rel="noreferrer">
              Visit Ketchup Clothes &rarr;
            </a>
          </div>
        </div>

        <p className="section-lede">
          Her references aren&rsquo;t background reading but design instructions. Each one solves
          a live problem in the game, and together they&rsquo;re what make it a serious work
          rather than an eco-game.
        </p>
        <div className="ideas">
          {IDEAS.map((idea) => (
            <article className="idea" key={idea.author}>
              <p className="eyebrow idea-gives">{idea.gives}</p>
              <h3 className="idea-author">{idea.author}</h3>
              <p className="idea-work">{idea.work}</p>
              <p className="idea-body">{idea.body}</p>
            </article>
          ))}
        </div>
        <p className="ideas-ancestor">
          And an ancestor: <strong>World Factory</strong> (METIS / Zo&euml; Svendsen &amp; Simon
          Daw, 2015), the card-based game-theatre work where audiences ran a Chinese clothing
          factory. We play the brand &mdash; World Factory&rsquo;s off-screen antagonist.
        </p>
      </section>

      {/* ============ ketchup clothes ============ */}
      <section className="section">
        <p className="eyebrow section-kicker">Remade in Clacton</p>
        <h2 className="section-title">Ketchup Clothes &mdash; the game&rsquo;s argument, on a real high street.</h2>
        <p className="section-lede">
          Welcome to Ketchup Clothes &mdash; Clacton&rsquo;s leading and most sustainable fashion
          shop, delivering on all your fashion needs. From alterations and wardrobe surgeries to
          &ldquo;new&rdquo; pieces made in store, Ketchup can tailor to you &mdash; quite
          literally.
        </p>
        <div className="ketchup-grid">
          <article className="ketchup-card">
            <h3>The Ketchup ethos</h3>
            <p>
              Simple to grasp, yet not commonly applied: tackle fashion waste at the root. By
              stopping consumption we can take a better look at what garments already exist in
              the fashion chain and reinsert them back into use &mdash; removing the
              &ldquo;discard&rdquo; step and linking it back to &ldquo;make&rdquo;: a circular
              fashion economy.
            </p>
            <p>
              Even if a piece of clothing isn&rsquo;t to your taste, there already exists a world
              of opportunity to transform it into something that is. And if you can&rsquo;t think
              of a way to reuse it yourself? That&rsquo;s the purpose of places like Ketchup
              &mdash; expertly crafting upcycled and pre-loved garments for decades. After all:
              one man&rsquo;s trash is another man&rsquo;s treasure.
            </p>
          </article>
          <article className="ketchup-card">
            <h3>What&rsquo;s in store</h3>
            <p>
              The Ketchup store is a treasure chest of upcycled wonders. <em>Fabric Skins</em>
              &nbsp;&mdash; Karen&rsquo;s re-cut t-shirts &mdash; give a new lease of life to
              once-discarded tees, now ready to perform as reclaimed showpieces. Festival outfits
              add a fluorescent flourish to the racks, born from items that survived their first
              festival but are by no means done with their party days. Leather and denim jackets
              merge and mingle into individual outerwear pieces.
            </p>
            <p>
              And if the artisanal sustainable look is not your aesthetic, Ketchup is no stranger
              to a commercial range too: shirts, skirts, dresses and more await a new loving
              home. Pop in store and explore Clacton&rsquo;s very own cave of wonders.
            </p>
          </article>
          <article className="ketchup-card">
            <h3>Get hands on</h3>
            <p>
              Ketchup offers interactive ways to reconnect you to your wardrobe. Unique
              <em> Wardrobe Surgeries</em> let you feel like you&rsquo;ve obtained a whole new
              closet without discarding or replacing a thing &mdash; more sustainable, and more
              cost effective. <em>Make &amp; Take parties</em> are a creative outlet for you and
              friends to collaborate, exchange garments and create new, personalised pieces.
            </p>
            <p>
              And if you&rsquo;re keen to become your own fashion designer, embark on
              Ketchup&rsquo;s <em>Training and Courses</em>, guided by fashion expert Karen, from
              beginners through to advanced &mdash; receive pre-made patterns or draft your own,
              and assemble a one-of-a-kind garment just for you.
            </p>
          </article>
        </div>
        <p className="ketchup-close">
          We look forward to welcoming you into the sustainable, innovative world of Ketchup
          Clothes.{' '}
          <a className="karen-link" href="https://ketchupclothes.com" target="_blank" rel="noreferrer">
            ketchupclothes.com &rarr;
          </a>
        </p>
      </section>

      {/* ============ pull quote ============ */}
      <section className="pull">
        <div
          className="pull-backdrop"
          style={{ backgroundImage: 'url(/assets/editorial/mended-gown.png)' }}
        />
        <div className="pull-content">
          <p className="eyebrow pull-kicker">The perfect run does not end in an empire</p>
          <p className="pull-quote">
            &ldquo;You made &pound;3&nbsp;million. The river still runs.&rdquo;
          </p>
          <a className="btn-hero" href="#play">See how yours ends</a>
        </div>
      </section>

      {/* ============ contact ============ */}
      <section className="section" ref={contactRef}>
        <p className="eyebrow section-kicker">Contact</p>
        <h2 className="section-title">Talk to us.</h2>
        {joinNote && (
          <p className="join-note">
            Player accounts &mdash; join and log in &mdash; are coming soon. Leave your email
            below and we&rsquo;ll tell you when the doors open.
          </p>
        )}
        <p className="section-lede">
          Fashion Virus is in active development, with research, education and exhibition uses in
          mind. If you&rsquo;re a funder, educator, journalist or collaborator &mdash; or a player
          with thoughts &mdash; we&rsquo;d like to hear from you.
        </p>
        <ContactForm />
      </section>

      <footer className="footer">
        <p className="footer-brand">Fashion Virus / Wasteworld</p>
        <p className="footer-line">Build a fashion empire. Face the fallout.</p>
        <p className="footer-links">
          <a href="https://ketchupclothes.com" target="_blank" rel="noreferrer">Ketchup Clothes</a>
          <span aria-hidden="true">&middot;</span>
          <a href="https://thecarboncloset.com" target="_blank" rel="noreferrer">The Carbon Closet</a>
        </p>
        <p className="footer-small">
          Anonymous decision logging for research &middot; every in-game figure is sourced and
          audited
        </p>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | ContactResult>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    // Honeypot: real visitors never fill this field.
    if (data.get('company')) return
    setStatus('sending')
    const result = await sendContactMessage({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    })
    setStatus(result)
    if (result === 'sent') form.reset()
  }

  if (status === 'sent') {
    return <p className="contact-sent">Thank you &mdash; your message is in. We&rsquo;ll reply by email.</p>
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-row">
        <label className="contact-field">
          <span className="eyebrow">Name</span>
          <input name="name" type="text" required maxLength={200} autoComplete="name" />
        </label>
        <label className="contact-field">
          <span className="eyebrow">Email</span>
          <input name="email" type="email" required maxLength={320} autoComplete="email" />
        </label>
      </div>
      <label className="contact-field">
        <span className="eyebrow">Message</span>
        <textarea name="message" required maxLength={4000} rows={6} />
      </label>
      <input className="contact-honeypot" name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn-hero contact-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending\u2026' : 'Send message'}
      </button>
      {status === 'failed' && (
        <p className="contact-error">Something went wrong sending that &mdash; please try again.</p>
      )}
      {status === 'unavailable' && (
        <p className="contact-error">The contact form isn&rsquo;t connected in this build yet.</p>
      )}
    </form>
  )
}
