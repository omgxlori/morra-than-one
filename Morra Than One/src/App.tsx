import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { boyBoyImage, girlGirlImage, boyGirlImage } from "./assets/images";
// import genderReveal from "./assets/videos/genderReveal.mp4";
import "./App.css";

type Result = {
  value: string;
  label: string;
  count: number;
  percentage: number;
};

type Choice = "BB" | "GG" | "BG";

function App() {
  const [results, setResults] = useState<Result[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: "",
  });
  const [currentPage, setCurrentPage] = useState("Home");
  // const [revealIsLive, setRevealIsLive] = useState(false);
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/poll/`)
      const data = await response.json();

      setResults(data.results);
      setTotalVotes(data.total_votes);
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-06-21T12:00:00");

    const updateCountdown = () => {
      const now = new Date();

      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          message: "It's reveal time! 🤍",
        });

        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        message: "",
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const submitVote = async (choice: Choice) => {
    if (!name.trim()) {
      setNameError("Please enter your name first 🤍");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/poll/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, choice }),
    });

    const data = await response.json();

    if (!response.ok) {
      setNameError(data.error);
      return;
    }

    setName("");
    setNameError("");

    const resultsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/poll/`);
    const resultsData = await resultsResponse.json();

    setResults(resultsData.results);
    setTotalVotes(resultsData.total_votes);
    setHasVoted(true);
  };

  // const toggleVideo = () => {
  //   if (!videoRef.current) return;

  //   if (videoRef.current.paused) {
  //     videoRef.current.play();
  //     setIsPlaying(true);
  //   } else {
  //     videoRef.current.pause();
  //     setIsPlaying(false);
  //   }
  // };

  return (
    <>
      <h1>{currentPage === "Home" ? "Morra Than One" : currentPage}</h1>

      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "Home" && (
        <div>
          <div className="intro-card">
            <p>Guess what! We know the genders… but you don’t 👀 (YET!)</p>

            <p>
              We’d love to hear our family and friends’ predictions on what you
              think the babies will be!
            </p>

            <p>
              Cast your votes below and then tune in on Father’s Day — Sunday,
              June 21st, 2026 at 12:00 PM EST — for our special video gender
              reveal 💙🩷
            </p>

            <p>
              We are so incredibly grateful for all of the love, excitement, and
              support surrounding our growing family already. It means more to
              us than you know 🤍
            </p>

            <p>Love, Lori & Joe</p>
          </div>
          
          <div className="countdown-container">

            <h3>GENDER REVEAL COUNTDOWN 👶🤍👶</h3>
            <div className="countdown-grid">
              <div className="countdown-card">
                <span>{timeLeft.days}</span>
                <p>Days</p>
              </div>

              <div className="countdown-card">
                <span>{timeLeft.hours}</span>
                <p>Hours</p>
              </div>

              <div className="countdown-card">
                <span>{timeLeft.minutes}</span>
                <p>Minutes</p>
              </div>

              <div className="countdown-card seconds-card">
                <span>{timeLeft.seconds}</span>
                <p>Seconds</p>
              </div>
            </div>

            </div>

            <div className="reveal-video-card">

              {/* <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/9m9L1Cj3sA4?si=gQORg8Cr7RmMSxCZ"
                title="Morra Than One Gender Reveal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              /> */}
              <a
                href="https://www.youtube.com/watch?v=9m9L1Cj3sA4"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-button"
              >
                Watch & Chat on YouTube 💙🩷
              </a>
            </div>

            

          <div className="vote-container">
            {!hasVoted ? (
              <>
              <h3>GENDER REVEAL VOTES 👶🤍👶</h3>
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameError("");
                  }}
                  placeholder="Your name"
                  className={nameError ? "input-error" : ""}
                />

                {nameError && <p className="error-message">{nameError}</p>}
              </>
            ) : (
              <>
                <h3>Thanks for voting 🤍</h3>

                <div className="rsvp-card">
                  <p>
                    Want a reminder when the reveal goes live? RSVP below and
                    we&apos;ll text you before the video reveal 💙🩷
                  </p>

                  <a
                    href="https://partiful.com/e/kfEGJRQSshT7JmkDPXd6?c=eVLgum6_"
                    target="_blank"
                    rel="noreferrer"
                    className="rsvp-button"
                  >
                    RSVP for Reminder Texts 🤍
                  </a>
                </div>
              </>
            )}

            {!hasVoted ? (
              <>
                <button
                  onClick={() => submitVote("BB")}
                  className="vote-button"
                >
                  <img src={boyBoyImage} alt="Boy Boy" />
                </button>

                <button
                  onClick={() => submitVote("GG")}
                  className="vote-button"
                >
                  <img src={girlGirlImage} alt="Girl Girl" />
                </button>

                <button
                  onClick={() => submitVote("BG")}
                  className="vote-button"
                >
                  <img src={boyGirlImage} alt="Boy Girl" />
                </button>
              </>
            ) : (
              <div className="results-blocks">
                <div className="block-results-grid">
                  {results.map((result) => (
                    <div className="block-column" key={result.value}>
                      <div className="block-stack">
                        {Array.from({ length: result.count }).map(
                          (_, index) => (
                            <div
                              className={`toy-block ${result.value.toLowerCase()}-block ${
                                index % 2 === 0 ? "turned-left" : "turned-right"
                              }`}
                              key={index}
                              style={{ animationDelay: `${index * 0.12}s` }}
                            >
                              <span>{result.value}</span>
                            </div>
                          ),
                        )}
                      </div>

                      <p className="block-label">{result.label}</p>
                      <p className="block-count">
                        {result.count} vote{result.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  ))}
                </div>

                <p>Total votes: {totalVotes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {currentPage === "Baby Registry" && (
        <div>
          <h2>Registry Coming Soon 🎁</h2>

    <p>
      We’re waiting until after the gender reveal to share our registry 💙🩷
    </p>

    <p>
      Check back after June 21st at 12:00 PM EST!
    </p>
        </div>
      )}

      {currentPage === "Baby Shower Info" && (
        <div>
          <h2>Baby Shower Details Coming Soon 🤍</h2>
        </div>
      )}
    </>
  );
}

export default App;
