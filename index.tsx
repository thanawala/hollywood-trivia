
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- Configuration & Data ---
const INITIAL_DATA: Record<string, string> = {
  'Movies': `Jaws
Casablanca
Psycho
Vertigo
Amadeus
Gladiator
Inception
Moonlight
Parasite
Unforgiven
Toy Story
Pulp Fiction
Citizen Kane
Die Hard
The Godfather
The Matrix
The Apartment
The Shining
The Exorcist
The Revenant
Jurassic Park
Reservoir Dogs
Schindler's List
Forrest Gump
Lawrence of Arabia
Raging Bull
Singin' in the Rain
Apocalypse Now
Blade Runner
Sunset Boulevard
Good Will Hunting
The Social Network
The Deer Hunter
The Green Mile
The Sixth Sense
The Great Escape
The Iron Giant
The Breakfast Club
The Usual Suspects
The Silence of the Lambs
Gone with the Wind
Back to the Future
Raiders of the Lost Ark
Saving Private Ryan
No Country for Old Men
Eternal Sunshine of the Spotless Mind
Butch Cassidy and the Sundance Kid
To Kill a Mockingbird
Star Wars: A New Hope
12 Angry Men
Dr. Strangelove
Double Indemnity
Rear Window
North by Northwest
All About Eve
Some Like It Hot
Bridge on the River Kwai
On the Waterfront
It Happened One Night
One Flew Over the Cuckoo's Nest
Full Metal Jacket
A Clockwork Orange
Requiem for a Dream
Taxi Driver
Braveheart
Million Dollar Baby
American Beauty
Mad Max: Fury Road
Everything Everywhere All at Once
There Will Be Blood
Portrait of a Lady on Fire
The Lord of the Rings: The Fellowship of the Ring
Pirates of the Caribbean: The Curse of the Black Pearl
Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb
Birdman or (The Unexpected Virtue of Ignorance)
Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan
The Assassination of Jesse James by the Coward Robert Ford
Terminator 2: Judgment Day
Monty Python and the Holy Grail
Close Encounters of the Third Kind
2001: A Space Odyssey
Once Upon a Time in the West
Once Upon a Time in Hollywood
Guardians of the Galaxy
Ferris Bueller's Day Off
Pan's Labyrinth
The Grand Budapest Hotel
The Shawshank Redemption
Top Gun: Maverick
Spider-Man: Into the Spider-Verse
Little Miss Sunshine
How to Train Your Dragon
Harry Potter and the Sorcerer's Stone
Three Billboards Outside Ebbing, Missouri
Planes, Trains and Automobiles
Who Framed Roger Rabbit
The Curious Case of Benjamin Button
Percy Jackson & the Olympians: The Lightning Thief
Everything Everywhere All at Once
The Banshees of Inisherin`,
  'Actors': `Cher
Zendaya
Prince
Madonna
Iman
Tom Hanks
Brad Pitt
Meryl Streep
Al Pacino
Robert De Niro
Viola Davis
Denzel Washington
Tom Cruise
Julia Roberts
Leonardo DiCaprio
Cate Blanchett
Morgan Freeman
Sandra Bullock
George Clooney
Nicole Kidman
Marlon Brando
Audrey Hepburn
Cary Grant
James Dean
Bette Davis
Humphrey Bogart
Ingrid Bergman
Gregory Peck
Elizabeth Taylor
Paul Newman
Harrison Ford
Natalie Portman
Christian Bale
Joaquin Phoenix
Amy Adams
Mahershala Ali
Frances McDormand
Gary Oldman
Olivia Colman
Daniel Day-Lewis
Philip Seymour Hoffman
Anthony Hopkins
Emma Thompson
Helen Mirren
Ralph Fiennes
Julianne Moore
Willem Dafoe
Tilda Swinton
Javier Bardem
Penelope Cruz
Jean-Claude Van Damme
Robert Downey Jr.
Samuel L. Jackson
Scarlett Johansson
Jennifer Lawrence
Matthew McConaughey
Octavia Spencer
Benedict Cumberbatch
Saoirse Ronan
Timothée Chalamet
Florence Pugh
Anya Taylor-Joy
Margot Robbie
Ryan Gosling
Emily Blunt
Cillian Murphy
Forest Whitaker
Kathy Bates
Christopher Walken
Diane Keaton
Michael Caine
Maggie Smith
Ian McKellen
Judi Dench
Patrick Stewart
Helena Bonham Carter
Sacha Baron Cohen
Peter Dinklage
Lupita Nyong'o
Ke Huy Quan
Edward Norton
Jamie Foxx
Reese Witherspoon
Charlize Theron
Benicio del Toro
Catherine Zeta-Jones
Renee Zellweger
Colin Farrell
Barry Keoghan
Jessica Chastain
Brendan Fraser
Michelle Yeoh
Angela Bassett
Allison Janney
J.K. Simmons
Christoph Waltz
Tommy Lee Jones
Anjelica Huston
Billy Bob Thornton
Mary-Kate and Ashley Olsen`,
  'Songs': `Smile
Yesterday
Respect
Skyfall
Shallow
Stayin' Alive
Moon River
Eye of the Tiger
Footloose
Ghostbusters
My Heart Will Go On
Over the Rainbow
Singing in the Rain
Tiny Dancer
Purple Rain
Lose Yourself
Let It Go
Happy
Danger Zone
What a Feeling
Fame
Grease
Mrs. Robinson
Knockin' on Heaven's Door
Unchained Melody
As Time Goes By
The Way We Were
Wind Beneath My Wings
I Will Always Love You
Can't Help Falling in Love
Somewhere Out There
Circle of Life
Beauty and the Beast
A Whole New World
You're the One That I Want
Don't You (Forget About Me)
Power of Love
Man in the Mirror
Diamonds Are a Girl's Best Friend
New York, New York
Life is a Highway
Pure Imagination
Under the Sea
Hakuna Matata
Can You Feel the Love Tonight
Raindrops Keep Fallin' on My Head
Against All Odds (Take a Look at Me Now)
(I've Had) The Time of My Life
I Don't Want to Miss a Thing
Streets of Philadelphia`,
  'Music Directors': `Vangelis
Kitaro
Yanni
Enya
John Williams
Hans Zimmer
Ennio Morricone
Danny Elfman
James Horner
Alan Silvestri
Howard Shore
Jerry Goldsmith
Bernard Herrmann
Max Steiner
Dimitri Tiomkin
Elmer Bernstein
Maurice Jarre
Nino Rota
Henry Mancini
Lalo Schifrin
Randy Newman
Thomas Newman
Michael Giacchino
Alexandre Desplat
Ludwig Göransson
Hildur Guðnadóttir
Justin Hurwitz
Trent Reznor
Atticus Ross
Nicholas Britell
Jóhann Jóhannsson
Carter Burwell
Marco Beltrami
Clint Mansell
Philip Glass
Bear McCreary
Daniel Pemberton
Terence Blanchard
Kris Bowers
Emile Mosseri
Mychael Danna
Rachel Portman
Anne Dudley
Gabriel Yared
Tan Dun
Gustavo Santaolalla
A.R. Rahman
Joe Hisaishi
Ryuichi Sakamoto
Alberto Iglesias`,
  'Directors': `Hitchcock
Spielberg
Scorsese
Nolan
Tarantino
Kubrick
Coppola
Fellini
Kurosawa
Fincher
James Cameron
Ridley Scott
Greta Gerwig
Sofia Coppola
Ava DuVernay
Chloe Zhao
Kathryn Bigelow
Patty Jenkins
Denis Villeneuve
Bong Joon-ho
Guillermo del Toro
Alfonso Cuarón
Alejandro G. Iñárritu
Wes Anderson
Paul Thomas Anderson
David Lynch
Spike Lee
Jordan Peele
Ari Aster
Robert Eggers
Orson Welles
Billy Wilder
John Huston
Frank Capra
Howard Hawks
John Ford
George Lucas
Peter Jackson
Ang Lee
Woody Allen
Clint Eastwood
Ron Howard
Sam Mendes
Danny Boyle
Damien Chazelle
Martin McDonagh
Todd Field
Yorgos Lanthimos
M. Night Shyamalan
Jean-Luc Godard`
};

const App: React.FC = () => {
  const [category, setCategory] = useState<string>('Movies');
  const [searchMode, setSearchMode] = useState<'internet' | 'local'>('local');
  const [minWords, setMinWords] = useState<number>(1);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [localScripts, setLocalScripts] = useState(INITIAL_DATA);
  const [showVault, setShowVault] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    if (searchMode === 'local') {
      const names = (localScripts[category] || "").split('\n').map(n => n.trim()).filter(n => n.length > 0);
      
      // Filter by word count AND uniqueness
      const filtered = names.filter(name => {
        const wordCount = name.split(/\s+/).filter(Boolean).length;
        return wordCount >= minWords && !usedWords.has(name.toLowerCase());
      });
      
      if (filtered.length === 0) {
        const totalMatching = names.filter(n => n.split(/\s+/).filter(Boolean).length >= minWords).length;
        if (totalMatching > 0) {
           setError(`Database Exhausted: All ${totalMatching} qualifying items for ${category} have been shown.`);
        } else {
           setError(`No ${category} found in local vault with ${minWords}+ words.`);
        }
        setLoading(false);
        return;
      }

      // Simulate engine crunching
      await new Promise(r => setTimeout(r, 800)); 
      const picked = filtered[Math.floor(Math.random() * filtered.length)];
      
      setResult(picked);
      setUsedWords(prev => new Set(prev).add(picked.toLowerCase()));
      setHistory(prev => [{ name: picked, category, mode: 'Local' }, ...prev].slice(0, 15));
      setLoading(false);
    } else {
      try {
        
        // Include a list of recently used words to avoid repeats
        const blacklist = Array.from(usedWords).slice(-15).join(', ');
        const prompt = `Provide one random Hollywood ${category} name that has at least ${minWords} words in it. 
        IMPORTANT: Do not provide any of the following names: [${blacklist}].
        Respond with ONLY the name. Do not include quotes or extra text.`;
        
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, minWords }),
        });
        
        const data = await response.json();
        const name = data.name;
        if (!name) throw new Error("The Engine returned an empty response.");

        // Client-side duplicate check
        if (usedWords.has(name.toLowerCase())) {
          // If the AI repeated itself, try one more time silently
          handleGenerate();
          return;
        }

        setResult(name);
        setUsedWords(prev => new Set(prev).add(name.toLowerCase()));
        setHistory(prev => [{ name, category, mode: 'Internet' }, ...prev].slice(0, 15));
      } catch (err: any) {
        console.error("Gemini Error:", err);
        setError(err.message || "Failed to connect to the Internet Engine. Ensure your API Key is configured.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetSession = () => {
    setUsedWords(new Set());
    setHistory([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 relative bg-[#050811] text-slate-100 selection:bg-amber-500/40 selection:text-white">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/20 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-rose-900/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <header className="text-center mb-12 z-10 animate-fade">
        <h1 className="hollywood-font mb-2">
          <span className="text-5xl md:text-7xl uppercase gradient-text leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">Hollywood</span><br/>
          <span className="text-lg md:text-2xl uppercase tracking-[0.4em] text-amber-500/80 font-bold">Data Engine</span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-semibold">Cinematic Charades Protocol V2.1</p>
          <span className="h-1 w-1 rounded-full bg-slate-700"></span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-semibold">{usedWords.size} Samples Tracked</p>
        </div>
      </header>

      <main className="w-full max-w-2xl z-10 space-y-8">
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-10 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          
          {/* Engine Mode Toggle */}
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Engine Protocol</span>
              <button onClick={resetSession} className="text-[9px] uppercase tracking-widest text-rose-500/50 hover:text-rose-400 font-bold transition-colors">Reset Session</button>
            </div>
            <div className="grid grid-cols-2 bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
              {(['internet', 'local'] as const).map(m => (
                <button 
                  key={m} 
                  onClick={() => setSearchMode(m)} 
                  className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 ${searchMode === m ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <i className={`fas ${m === 'internet' ? 'fa-bolt-lightning' : 'fa-box-archive'} text-xs ${searchMode === m ? 'opacity-100' : 'opacity-40'}`}></i>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold opacity-80 ml-2">Database Category</label>
              <div className="relative group">
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none cursor-pointer focus:border-amber-500/50 outline-none transition-all shadow-lg group-hover:border-white/20"
                >
                  {Object.keys(INITIAL_DATA).map(c => <option key={c} value={c} className="bg-[#050811]">{c}</option>)}
                </select>
                <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs"></i>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold opacity-80 ml-2">Complexity: {minWords} Words</label>
              <div className="flex bg-slate-950/60 p-1.5 rounded-2xl border border-white/10 shadow-lg">
                {[1, 2, 3, 4].map(n => (
                  <button 
                    key={n} 
                    onClick={() => setMinWords(n)} 
                    className={`flex-1 py-3 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${minWords === n ? 'bg-amber-500/20 text-amber-400 shadow-sm' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    {n}+
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={loading} 
            className={`w-full py-7 rounded-[2rem] text-xl font-black tracking-[0.4em] uppercase transition-all duration-500 shadow-2xl active:scale-[0.97] group relative overflow-hidden ${loading ? 'bg-slate-900 text-slate-600 cursor-wait' : 'bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white hover:brightness-125 hover:shadow-amber-500/20'}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-4">
              {loading ? <i className="fas fa-atom fa-spin"></i> : <i className="fas fa-clapperboard text-sm opacity-60"></i>}
              {loading ? 'Finding...' : 'Initiate Scan'}
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          </button>

          {(result || error) && (
            <div className={`relative p-10 md:p-16 rounded-[2.5rem] border-2 text-center animate-fade backdrop-blur-md ${error ? 'border-red-500/30 bg-red-500/5 text-red-400' : 'border-amber-500/30 bg-amber-500/5'}`}>
              <div className="absolute top-4 left-4 text-[8px] tracking-[0.2em] font-mono opacity-30">SECURE_OUTPUT_STREAM</div>
              {error ? (
                <div className="space-y-4">
                  <i className="fas fa-triangle-exclamation text-3xl opacity-50"></i>
                  <p className="text-xs uppercase tracking-[0.2em] leading-relaxed font-bold max-w-sm mx-auto">{error}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-[10px] uppercase tracking-[0.8em] text-amber-500/50 font-black">UNIQUE TRANSMISSION</p>
                  <h2 className="text-4xl md:text-6xl font-bold hollywood-font text-white leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{result}</h2>
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <button 
              onClick={() => setShowVault(!showVault)} 
              className="px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] text-slate-500 hover:text-amber-500 hover:bg-amber-500/5 transition-all inline-flex items-center gap-3 font-black border border-transparent hover:border-amber-500/20"
            >
              <i className={`fas ${showVault ? 'fa-circle-xmark' : 'fa-database'} text-xs opacity-50`}></i>
              {showVault ? 'Lock Vault' : 'Modify Manifest'}
            </button>
          </div>

          {showVault && (
            <div className="space-y-5 animate-fade border-t border-white/5 pt-10">
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black flex items-center gap-2">
                  <i className="fas fa-terminal text-amber-500"></i> Local {category} Database
                </span>
                <button 
                  onClick={() => { setLocalScripts(p => ({...p, [category]: ""})); setUsedWords(new Set()); }} 
                  className="text-[9px] uppercase tracking-widest text-rose-500 hover:text-rose-400 font-bold transition-colors"
                >
                  Purge Data
                </button>
              </div>
              <textarea 
                value={localScripts[category]} 
                onChange={e => setLocalScripts(p => ({...p, [category]: e.target.value}))}
                className="w-full h-56 bg-black/60 border border-white/5 rounded-[2rem] p-7 text-xs font-mono text-amber-100/40 focus:border-amber-500/30 outline-none resize-none custom-scrollbar shadow-inner leading-loose"
                placeholder={`Input ${category} names (one per line)...`}
              />
              <p className="text-[8px] text-center text-slate-600 uppercase tracking-widest font-bold">Local session data is tracking {usedWords.size} results</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="animate-fade space-y-5 pb-20">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600 flex items-center gap-4 px-6">
              <div className="h-px flex-1 bg-white/5"></div>
              Session Feed
              <div className="h-px flex-1 bg-white/5"></div>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {history.map((item, i) => (
                <div key={i} className="glass-panel p-6 rounded-3xl flex justify-between items-center border border-white/5 transition-all hover:bg-white/5 hover:translate-x-1">
                  <div className="space-y-1">
                    <p className="text-white text-lg font-bold tracking-wide">{item.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                      {item.category} <span className="mx-2 opacity-20">|</span> 
                      <span className={item.mode === 'Internet' ? 'text-indigo-400/70' : 'text-amber-500/70'}>{item.mode} Source</span>
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-slate-700 font-mono">
                    {history.length - i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-12 text-slate-700 text-[10px] tracking-[0.6em] uppercase opacity-30 font-black z-10">
        &copy; Hollywood Data Engine Protocol MMXXIV
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
