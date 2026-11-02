import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Newspaper,
  Calendar,
  Globe,
  Languages,
  Sparkles,
  Share2,
  Bookmark,
  TrendingUp,
  Award,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Flame,
  Volume2,
  Check,
  Search,
  Filter,
  Eye,
  ArrowUpRight,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function SportsEPaperSystem() {
  const navigate = useNavigate()

  // Active Tab: 'daily_paper' | 'match_reports' | 'spotlight' | 'tournaments' | 'archive' | 'ads_market'
  const [activeTab, setActiveTab] = useState('daily_paper')
  const [toastMsg, setToastMsg] = useState('')

  // Toast feedback
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- E-PAPER REGION FILTER (FEATURE 22.9: District / State / Country News Segmentation) ---
  const [regionFilter, setRegionFilter] = useState('district') // 'district' | 'state' | 'country'

  // --- MULTI-LANGUAGE SELECTION (FEATURE 22.8: Multi-Language E-Paper System) ---
  const [currentLang, setCurrentLang] = useState('english') // 'tamil' | 'hindi' | 'telugu' | 'english'

  // Modal / Reader State for reading full article
  const [readingArticle, setReadingArticle] = useState(null)

  // --- SAMPLE ARTICLES DATA (FEATURE 22.1, 22.2, 22.3, 22.5, 22.11, 22.12) ---
  const articles = [
    {
      id: 'art-1',
      region: 'district',
      type: 'Top Story',
      isBreaking: true,
      title: "Hapur Heroes Win a Thriller in Final Over Stunner",
      subtitle: "District Championship • 3 min read • 15 Jul 2026",
      category: 'Cricket',
      reads: '18.4K',
      date: '15 JUL 2026',
      image: '/market/banner-world.png',
      content: `In a breathtaking climax at the District Stadium, Hapur Heroes chased down 189 against Meerut Titans with just 2 balls to spare. A blistering 82 from opener Rohit and ice-cool finishing in the 20th over sealed the coveted trophy before a capacity crowd of 8,500 roaring fans.\n\n"We practiced hitting under high-pressure death overs throughout the season," the captain told reporters post-match. The victory books Hapur's ticket to next month's State Inter-District Trophy.`,
      sponsored: false,
      productAd: {
        item: 'SS Ton Pro Grade English Willow Bat',
        price: '₹7,999',
        tag: 'Wielded by Match Top Scorer',
      },
    },
    {
      id: 'art-2',
      region: 'state',
      type: 'Rising Star Spotlight',
      isBreaking: false,
      title: "From Academy Mud Pit to State Finals: The Arjun Das Journey",
      subtitle: "State Feature • 4 min read • 15 Jul 2026",
      category: 'Player Spotlight',
      reads: '12.1K',
      date: '15 JUL 2026',
      image: '/market/banner-news.png',
      content: `Two years ago, Arjun Das was bowling barefoot in rural training camps. Today, his express 140km/h seam delivery is terrorizing top-order batsmen across the state league. This special interview feature dives into his relentless discipline, coach mentorship, and dream of making the national trials.`,
      sponsored: false,
    },
    {
      id: 'art-3',
      region: 'district',
      type: 'Breaking News',
      isBreaking: true,
      title: "Breaking: Grand Final Fixture & Venue Announced",
      subtitle: "Tournament Bulletin • 2 min read • 15 Jul 2026",
      category: 'Tournaments',
      reads: '29.7K',
      date: '15 JUL 2026',
      image: '/market/banner-videos.png',
      content: `The Apex Sports Commission has officially locked Eden Grounds as the battleground for the 2026 Premier Cup Final. Full floodlit arrangements, DRS optical ball tracking, and live TV broadcasting confirmed.`,
      sponsored: false,
    },
    {
      id: 'art-4',
      region: 'country',
      type: 'Sponsored Showcase',
      isBreaking: false,
      title: "Sponsored: Next-Gen AeroSpeed Lightweight Cricket Spikes",
      subtitle: "Gear Innovation • 2 min read • 15 Jul 2026",
      category: 'Equipment',
      reads: '8.3K',
      date: '15 JUL 2026',
      image: '/market/banner-hero.png',
      content: `Discover how the new AeroSpeed spikes provide 30% greater traction on dry turf, reducing bowler knee impact during release stride. Available exclusively through the Scoring Heroes verified marketplace.`,
      sponsored: true,
      sponsorName: 'Spartan Athletics Official',
    },
  ]

  // Filter articles based on region filter
  const filteredArticles = articles.filter((a) => {
    if (regionFilter === 'district') return a.region === 'district'
    if (regionFilter === 'state') return a.region === 'state' || a.region === 'district'
    return true
  })

  return (
    <Screen
      back
      title="Sports E-Paper"
      right={
        <button
          className="epaper-top-btn"
          onClick={() => triggerToast('E-Paper Edition: 15 JUL 2026 • Verified Press Bureau')}
          title="Edition Info"
        >
          <Newspaper size={18} color="#3de0ff" />
        </button>
      }
    >
      <div className="native-epaper-app">
        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="epaper-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Sticky Segmented Navigation Tabs */}
        <div className="epaper-nav-tabs-scroll">
          <button
            className={`epaper-nav-tab ${activeTab === 'daily_paper' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily_paper')}
          >
            <Newspaper size={14} />
            <span>Daily E-Paper</span>
          </button>
          <button
            className={`epaper-nav-tab ${activeTab === 'match_reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('match_reports')}
          >
            <TrendingUp size={14} />
            <span>Match Reports</span>
          </button>
          <button
            className={`epaper-nav-tab ${activeTab === 'spotlight' ? 'active' : ''}`}
            onClick={() => setActiveTab('spotlight')}
          >
            <Award size={14} />
            <span>Player Spotlight</span>
          </button>
          <button
            className={`epaper-nav-tab ${activeTab === 'tournaments' ? 'active' : ''}`}
            onClick={() => setActiveTab('tournaments')}
          >
            <Flame size={14} />
            <span>Tournament Desk</span>
          </button>
          <button
            className={`epaper-nav-tab ${activeTab === 'ads_market' ? 'active' : ''}`}
            onClick={() => setActiveTab('ads_market')}
          >
            <ShoppingBag size={14} />
            <span>Marketplace Ads</span>
          </button>
        </div>

        {/* ================= TAB 1: DAILY E-PAPER (MATCHING BLUEPRINT SCREEN 22.1) ================= */}
        {activeTab === 'daily_paper' && (
          <div className="epaper-tab-content">
            {/* Blueprint Newspaper Masthead Card */}
            <div className="epaper-masthead-card">
              <div className="masthead-top-row">
                <span className="masthead-sub">Daily Sports E-Paper</span>
                <span className="masthead-date">15 JUL 2026</span>
              </div>

              {/* Bold Masthead Title (Matching Blueprint: SH SPORTS DAILY) */}
              <div className="masthead-brand-title">SH SPORTS DAILY</div>

              {/* Breaking Ticker Banner (FEATURE 22.11) */}
              <div className="breaking-ticker-bar">
                <span className="breaking-label">BREAKING</span>
                <span className="breaking-text">
                  Hapur Heroes lift District Shield • Final score 189/6 (19.4 ov)
                </span>
              </div>

              {/* Headline Article Box (Matching Blueprint TODAY'S TOP SPORTS STORY) */}
              <div className="epaper-hero-headline-card">
                <div className="headline-icon-box">
                  <Newspaper size={34} color="#3de0ff" />
                </div>
                <div className="headline-badge">FEATURE ARTICLE</div>
                <div className="headline-main-title">TODAY'S TOP SPORTS STORY</div>
                <div className="headline-sub-info">
                  District • Cricket • 3 min read
                </div>
              </div>

              {/* Region Segment Tabs (Matching Blueprint: DISTRICT | STATE | COUNTRY) */}
              <div className="region-filter-segmented-row">
                <button
                  className={`region-pill-btn ${regionFilter === 'district' ? 'active' : ''}`}
                  onClick={() => {
                    setRegionFilter('district')
                    triggerToast('Filtered: District Level Stories')
                  }}
                >
                  DISTRICT
                </button>
                <button
                  className={`region-pill-btn ${regionFilter === 'state' ? 'active' : ''}`}
                  onClick={() => {
                    setRegionFilter('state')
                    triggerToast('Filtered: State Level Stories')
                  }}
                >
                  STATE
                </button>
                <button
                  className={`region-pill-btn ${regionFilter === 'country' ? 'active' : ''}`}
                  onClick={() => {
                    setRegionFilter('country')
                    triggerToast('Filtered: Country / National Stories')
                  }}
                >
                  COUNTRY
                </button>
              </div>

              {/* Multi-Language Bar (Matching Blueprint: TAMIL | HINDI | TELUGU | ENGLISH) */}
              <div className="language-selector-bar">
                {[
                  { id: 'tamil', label: 'TAMIL' },
                  { id: 'hindi', label: 'HINDI' },
                  { id: 'telugu', label: 'TELUGU' },
                  { id: 'english', label: 'ENGLISH' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    className={`lang-btn ${currentLang === lang.id ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentLang(lang.id)
                      triggerToast(`E-Paper language changed to ${lang.label}`)
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Read / Publish Article Main Button (Matching Blueprint Red Button) */}
            <button
              className="epaper-red-cta-btn"
              onClick={() => {
                setReadingArticle(articles[0])
                triggerToast('Opening Today\'s Lead Article...')
              }}
            >
              <Newspaper size={18} />
              <span>READ / PUBLISH ARTICLE</span>
            </button>

            {/* Daily Edition Articles Feed */}
            <div className="epaper-feed-section">
              <div className="feed-heading-row">
                <span className="feed-heading-title">TODAY'S FRONT PAGE STORIES</span>
                <span className="feed-count-pill">{filteredArticles.length} Articles</span>
              </div>

              <div className="feed-articles-list">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className={`feed-article-item-card ${art.sponsored ? 'sponsored' : ''}`}
                    onClick={() => setReadingArticle(art)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="art-top-meta">
                      <span className={`art-tag ${art.isBreaking ? 'breaking' : ''}`}>
                        {art.type}
                      </span>
                      <span className="art-reads">👁️ {art.reads}</span>
                    </div>

                    {art.image && (
                      <div className="art-card-img-wrap">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="feed-art-img"
                          loading="lazy"
                        />
                        <div className="art-img-category-pill">{art.category}</div>
                      </div>
                    )}

                    <h4 className="art-title">{art.title}</h4>
                    <p className="art-subtitle">{art.subtitle}</p>

                    {/* Integrated Product Ad in Story (FEATURE 22.7) */}
                    {art.productAd && (
                      <div className="story-embedded-ad-box">
                        <ShoppingBag size={14} color="#ffc83d" />
                        <span className="ad-product-name">{art.productAd.item}</span>
                        <span className="ad-price-pill">{art.productAd.price}</span>
                      </div>
                    )}

                    <div className="art-bottom-action-row">
                      <span className="read-more-link">
                        Read Full Story <ArrowUpRight size={13} />
                      </span>
                      <button
                        className="art-share-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          triggerToast(`Shared: "${art.title}"`)
                        }}
                      >
                        <Share2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: AUTO MATCH REPORTS (FEATURE 22.2) ================= */}
        {activeTab === 'match_reports' && (
          <div className="epaper-tab-content">
            <div className="epaper-feature-header-card">
              <TrendingUp size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Auto Match Report Generation System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Converts live digital scorecards & ball commentary into published journalism
                </div>
              </div>
            </div>

            {/* Sample Generated Match Report Card */}
            <div className="match-report-showcase-card">
              <span className="report-kicker">AUTO-GENERATED MATCH CHRONICLE</span>
              <h3 className="report-match-title">Hapur Heroes Win a Thriller</h3>
              <div className="report-score-banner">
                <div className="score-block">
                  <span className="score-team">Hapur Heroes</span>
                  <span className="score-val">192/5 (19.4)</span>
                </div>
                <span className="score-vs">DEF.</span>
                <div className="score-block">
                  <span className="score-team">Meerut Titans</span>
                  <span className="score-val">189/6 (20.0)</span>
                </div>
              </div>

              <p className="report-narrative-para">
                An electrifying 4th wicket partnership between Sharma (74*) and Verma (38) dismantled the Titans' pace battery in the death overs, sealing victory with 2 balls remaining.
              </p>

              {articles[0].image && (
                <div className="match-report-img-wrap">
                  <img src={articles[0].image} alt="Match Action" className="match-report-img" />
                </div>
              )}

              <div className="report-actions-row">
                <button
                  className="report-action-btn primary"
                  onClick={() => triggerToast('Match Report published to Morning Edition!')}
                >
                  <Check size={14} />
                  <span>PUBLISH TO DAILY PAPER</span>
                </button>
                <button
                  className="report-action-btn"
                  onClick={() => triggerToast('Regenerating report using tactical journalist model...')}
                >
                  <Sparkles size={14} />
                  <span>RE-GENERATE AI</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PLAYER SPOTLIGHT (FEATURE 22.5) ================= */}
        {activeTab === 'spotlight' && (
          <div className="epaper-tab-content">
            <div className="epaper-feature-header-card">
              <Award size={24} color="#ffc83d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Player Spotlight & Rising Stars
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Weekly editorial features celebrating grassroots talents and game-changers
                </div>
              </div>
            </div>

            {/* Rising Star of the Week Card (Matching Blueprint) */}
            <div className="spotlight-hero-card">
              <div className="spotlight-gold-badge">⭐ RISING STAR OF THE WEEK</div>
              <div className="spotlight-avatar-box" style={{ overflow: 'hidden', padding: 0 }}>
                <img
                  src={articles[1].image}
                  alt="Arjun Das"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="spotlight-player-name">Arjun Das (Age 19)</h3>
              <div className="spotlight-team-tag">Right-Arm Fast • 140 km/h</div>

              <div className="spotlight-stats-strip">
                <div className="spot-stat">
                  <span className="val">18</span>
                  <span className="lbl">Wickets</span>
                </div>
                <div className="spot-stat">
                  <span className="val">11.4</span>
                  <span className="lbl">Avg</span>
                </div>
                <div className="spot-stat">
                  <span className="val">5.8</span>
                  <span className="lbl">Econ</span>
                </div>
              </div>

              <p className="spotlight-editorial-quote">
                "Arjun's steep bounce from a high arm release makes him virtually unplayable on hard subcontinental wickets."
              </p>

              <button
                className="epaper-red-cta-btn"
                onClick={() => setReadingArticle(articles[1])}
              >
                <span>READ FULL SPOTLIGHT FEATURE</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: TOURNAMENT DESK (FEATURE 22.4) ================= */}
        {activeTab === 'tournaments' && (
          <div className="epaper-tab-content">
            <div className="epaper-feature-header-card">
              <Flame size={24} color="#ff4d4d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Tournament Coverage Desk
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Points tables, qualification scenarios, match previews & final reports
                </div>
              </div>
            </div>

            {/* Tournament Standing Table */}
            <div className="tournament-desk-table-card">
              <div className="desk-table-head">
                <span>DISTRICT PREMIER CUP • STANDINGS</span>
                <span className="round-pill">ROUND 5</span>
              </div>

              <div className="standings-table-rows">
                {[
                  { rank: 1, team: 'Hapur Heroes', p: 5, w: 4, nrr: '+1.42', pts: 8 },
                  { rank: 2, team: 'Meerut Titans', p: 5, w: 3, nrr: '+0.88', pts: 6 },
                  { rank: 3, team: 'Noida Knights', p: 5, w: 3, nrr: '+0.21', pts: 6 },
                  { rank: 4, team: 'Ghaziabad Bulls', p: 5, w: 1, nrr: '-0.95', pts: 2 },
                ].map((row) => (
                  <div key={row.rank} className="standing-row">
                    <span className="rank-num">0{row.rank}</span>
                    <span className="team-col">{row.team}</span>
                    <span className="stat-col">{row.p}P</span>
                    <span className="stat-col">{row.w}W</span>
                    <span className="stat-col">{row.nrr}</span>
                    <span className="pts-col">{row.pts} PTS</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="epaper-red-cta-btn"
              onClick={() => triggerToast('Exported Tournament Summary Report as PDF!')}
            >
              <span>DOWNLOAD TOURNAMENT GAZETTE</span>
            </button>
          </div>
        )}

        {/* ================= TAB 5: MARKETPLACE ADS & SPONSORSHIPS (FEATURE 22.6 & 22.12) ================= */}
        {activeTab === 'ads_market' && (
          <div className="epaper-tab-content">
            <div className="epaper-feature-header-card">
              <ShoppingBag size={24} color="#10b981" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Local Market & Sponsored News Ads
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Monetize e-paper columns with context-aware local sports commerce
                </div>
              </div>
            </div>

            <div className="ads-showcase-list">
              <div className="ad-card-item">
                <span className="ad-badge">LOCAL BUSINESS AD</span>
                <div className="ad-header-text">Pro Turf Cricket Ground Booking</div>
                <p className="ad-desc-text">
                  Floodlit turf nets, bowling machines & pavilion lounge. Book 2-hour slots for weekend fixtures.
                </p>
                <div className="ad-footer-row">
                  <span className="ad-price-tag">From ₹999/hour</span>
                  <button
                    className="ad-cta-btn"
                    onClick={() => triggerToast('Redirecting to Ground Slot Booking...')}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>

              <div className="ad-card-item sponsored">
                <span className="ad-badge sponsored">SPONSORED PRODUCT</span>
                <div className="ad-header-text">New Pro Cricket Gear Collection</div>
                <p className="ad-desc-text">
                  Official titanium-reinforced cricket helmets and ultralight batting pads as seen in today's match review.
                </p>
                <div className="ad-footer-row">
                  <span className="ad-price-tag">Up to 25% Off</span>
                  <button
                    className="ad-cta-btn"
                    onClick={() => triggerToast('Opening Marketplace Gear Store...')}
                  >
                    SHOP GEAR
                  </button>
                </div>
              </div>
            </div>

            <button
              className="epaper-red-cta-btn"
              onClick={() => triggerToast('Ad Campaign portal opened!')}
            >
              <span>PLACE YOUR AD IN E-PAPER</span>
            </button>
          </div>
        )}

        {/* ================= FULL ARTICLE READING MODAL ================= */}
        {readingArticle && (
          <div className="article-reader-modal-overlay" onClick={() => setReadingArticle(null)}>
            <div className="article-reader-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top-bar">
                <span className="modal-category">{readingArticle.category}</span>
                <button
                  className="modal-close-btn"
                  onClick={() => setReadingArticle(null)}
                >
                  ✕
                </button>
              </div>

              {readingArticle.image && (
                <div className="modal-art-hero-wrap">
                  <img
                    src={readingArticle.image}
                    alt={readingArticle.title}
                    className="modal-art-hero-img"
                  />
                </div>
              )}

              <h2 className="modal-article-title">{readingArticle.title}</h2>
              <div className="modal-meta-row">
                <span>{readingArticle.subtitle}</span>
                <span>👁️ {readingArticle.reads} Reads</span>
              </div>

              <div className="modal-article-body">
                {readingArticle.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {readingArticle.productAd && (
                <div className="modal-embedded-product-card">
                  <span className="ad-badge">FEATURED GEAR</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>
                        {readingArticle.productAd.item}
                      </div>
                      <div style={{ fontSize: 10, color: '#ffc83d' }}>
                        {readingArticle.productAd.tag}
                      </div>
                    </div>
                    <button
                      className="ad-buy-now-btn"
                      onClick={() => triggerToast('Added to Cart from Article!')}
                    >
                      BUY {readingArticle.productAd.price}
                    </button>
                  </div>
                </div>
              )}

              <div className="modal-bottom-actions">
                <button
                  className="modal-action-btn primary"
                  onClick={() => {
                    triggerToast('Story shared with sports groups!')
                    setReadingArticle(null)
                  }}
                >
                  <Share2 size={14} />
                  <span>SHARE STORY</span>
                </button>
                <button
                  className="modal-action-btn"
                  onClick={() => {
                    triggerToast('Article bookmarked to your library!')
                  }}
                >
                  <Bookmark size={14} />
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
