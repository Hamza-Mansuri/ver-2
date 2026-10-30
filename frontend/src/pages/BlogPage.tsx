import { useState, useMemo, type FormEvent, type ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Filter, 
  PenTool, 
  Plus, 
  Search, 
  Sparkles, 
  Tag, 
  User, 
  X 
} from 'lucide-react';
import { BLOG_CATEGORIES, getStoredBlogs, saveStoredBlog, type BlogPost } from '../data/blogData';
import Certifications from '../sections/Certifications';
import './BlogPage.css';

export default function BlogPage({ onInquiry }: { onInquiry: () => void }) {
  const { slug } = useParams<{ slug?: string }>();
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getStoredBlogs());
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Form state for publishing a new blog
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<string>('Sports Nutrition & Whey');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState('Nutraceutical Formulator');
  const [newReadTime, setNewReadTime] = useState('5 min read');
  const [newCoverImage, setNewCoverImage] = useState('/assets/gomzi-pages/cat-sports.webp');
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newKeyTakeaways, setNewKeyTakeaways] = useState('');
  const [newTags, setNewTags] = useState('Supplements, Export, Manufacturing');
  const [formError, setFormError] = useState('');

  // If a slug is present in URL, find the active post
  const activePost = useMemo(() => {
    if (!slug) return null;
    return blogs.find((b) => b.slug === slug) || null;
  }, [slug, blogs]);

  // Filtered blogs for listing
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All Articles' || blog.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim() || !newContent.trim()) {
      setFormError('Please fill in the title, summary, and article content.');
      return;
    }

    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const paragraphs = newContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const takeaways = newKeyTakeaways
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const createdPost: BlogPost = {
      id: `custom-${Date.now()}`,
      slug: `${generatedSlug}-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      category: newCategory,
      author: {
        name: newAuthorName.trim() || 'Gomzi Research Team',
        role: newAuthorRole.trim() || 'Technical Contributor',
      },
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: newReadTime.trim() || '5 min read',
      coverImage: newCoverImage,
      excerpt: newExcerpt.trim(),
      content: paragraphs.length > 0 ? paragraphs : [newContent.trim()],
      keyTakeaways: takeaways.length > 0 ? takeaways : ['Engineered to meet export compliance standards.'],
      tags: tagsArray.length > 0 ? tagsArray : ['Nutraceuticals'],
    };

    const updated = saveStoredBlog(createdPost);
    setBlogs(updated);
    setModalOpen(false);

    // Reset form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setNewKeyTakeaways('');
    setNewCoverImage('/assets/gomzi-pages/cat-sports.webp');
    setNewCoverFile(null);
    setFormError('');
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please upload an image file (JPG, PNG, WEBP).');
      return;
    }
    setNewCoverFile(file);
    setNewCoverImage(URL.createObjectURL(file));
    setFormError('');
  };

  // If viewing a single post detail view
  if (activePost) {
    const relatedPosts = blogs
      .filter((b) => b.id !== activePost.id)
      .slice(0, 3);

    return (
      <main id="main-content" className="blog-reader-page">
        {/* Reader Hero */}
        <section className="br-hero">
          <div className="container br-hero-inner">
            <nav className="br-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <Link to="/blog">Knowledge Hub</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span>{activePost.category}</span>
            </nav>

            <span className="br-category-pill">{activePost.category}</span>
            <h1 className="br-title">{activePost.title}</h1>

            <div className="br-meta">
              <div className="br-author-info">
                <div className="br-avatar">
                  <User size={16} />
                </div>
                <div>
                  <strong>{activePost.author.name}</strong>
                  <span>{activePost.author.role}</span>
                </div>
              </div>

              <div className="br-timing">
                <span><Calendar size={14} /> {activePost.date}</span>
                <span><Clock size={14} /> {activePost.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reader Body */}
        <section className="br-body section">
          <div className="container br-grid">
            <article className="br-content">
              {/* Cover Image */}
              <div className="br-cover-wrap">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="br-cover"
                />
              </div>

              {/* Excerpt Lead */}
              <p className="br-lead">{activePost.excerpt}</p>

              {/* Key Takeaways Card */}
              {activePost.keyTakeaways && activePost.keyTakeaways.length > 0 && (
                <div className="br-takeaways">
                  <div className="br-takeaways-title">
                    <Sparkles size={18} />
                    <h3>Key Insights & Technical Takeaways</h3>
                  </div>
                  <ul>
                    {activePost.keyTakeaways.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="br-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Content Paragraphs */}
              <div className="br-paragraphs">
                {activePost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="br-tags">
                <Tag size={16} className="br-tag-icon" />
                {activePost.tags.map((tag) => (
                  <span className="br-tag-pill" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Back Link */}
              <div className="br-footer-nav">
                <Link to="/blog" className="button button--secondary">
                  <ArrowLeft size={16} /> Back to all articles
                </Link>
                <button type="button" className="button button--lime" onClick={onInquiry}>
                  Discuss this formulation <ArrowUpRight size={17} />
                </button>
              </div>
            </article>

            {/* Sticky Sidebar */}
            <aside className="br-sidebar">
              <div className="br-sidebar-card">
                <h3>About Gomzi Manufacturing</h3>
                <p>
                  Gomzi Life Science LLP is a certified CDMO partner in Surat, India specializing in custom formulations, whey protein, gummies, effervescents, sachets, and export documentation across 45+ countries.
                </p>
                <button type="button" className="button button--lime" onClick={onInquiry}>
                  Start an Inquiry <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="br-related-card">
                <h4>More from the Knowledge Hub</h4>
                <div className="br-related-list">
                  {relatedPosts.map((rel) => (
                    <Link to={`/blog/${rel.slug}`} key={rel.id} className="br-related-item">
                      <span className="br-related-cat">{rel.category}</span>
                      <strong>{rel.title}</strong>
                      <span className="br-related-time">{rel.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <Certifications />
      </main>
    );
  }

  // Blog Listing Page
  return (
    <main id="main-content" className="blog-hub-page">
      {/* Hero Banner */}
      <section className="bh-hero" aria-labelledby="bh-title">
        <div className="container bh-hero-inner">
          <nav className="bh-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Knowledge Hub & Insights</span>
          </nav>

          <span className="bh-kicker">
            <span className="bh-dot" />
            SCIENCE · FORMULATION · EXPORT STRATEGY
          </span>
          <h1 id="bh-title">
            Nutraceutical insights.<br />
            <em>Manufactured for your world.</em>
          </h1>
          <p className="bh-hero-tagline">
            Expert articles on whey protein engineering, pectin gummies, effervescent technology, sachet packaging, and international regulatory compliance from India’s leading CDMO.
          </p>

          <div className="bh-hero-toolbar">
            {/* Search Input */}
            <div className="bh-search-box">
              <Search size={18} className="bh-search-icon" />
              <input
                type="text"
                placeholder="Search articles by topic, format, ingredient (e.g. whey, gummies, stability)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search blog articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="bh-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Publish Article Button */}
            <button
              type="button"
              className="button button--lime bh-publish-btn"
              onClick={() => setModalOpen(true)}
            >
              <PenTool size={16} /> Publish Article
            </button>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bh-categories-bar">
        <div className="container bh-cat-scroll">
          <span className="bh-filter-label">
            <Filter size={14} /> Categories:
          </span>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`bh-cat-pill ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bh-articles section">
        <div className="container">
          <div className="bh-grid-header">
            <p className="bh-count-info">
              Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'}
              {selectedCategory !== 'All Articles' && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            {(selectedCategory !== 'All Articles' || searchQuery) && (
              <button
                type="button"
                className="bh-reset-filter"
                onClick={() => {
                  setSelectedCategory('All Articles');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="bh-empty-state">
              <BookOpen size={48} className="bh-empty-icon" />
              <h3>No articles found</h3>
              <p>We couldn’t find any articles matching your search query. Try different keywords or reset category filters.</p>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  setSelectedCategory('All Articles');
                  setSearchQuery('');
                }}
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="bh-grid">
              {filteredBlogs.map((blog) => (
                <article className="bh-card" key={blog.id}>
                  <Link to={`/blog/${blog.slug}`} className="bh-card-image-link" tabIndex={-1}>
                    <div className="bh-card-image-wrap">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="bh-card-image"
                      />
                      <span className="bh-card-category">{blog.category}</span>
                    </div>
                  </Link>

                  <div className="bh-card-body">
                    <div className="bh-card-meta">
                      <span><Calendar size={13} /> {blog.date}</span>
                      <span><Clock size={13} /> {blog.readTime}</span>
                    </div>

                    <h2 className="bh-card-title">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    <p className="bh-card-excerpt">{blog.excerpt}</p>

                    <div className="bh-card-footer">
                      <div className="bh-card-author">
                        <span className="bh-author-name">{blog.author.name}</span>
                        <span className="bh-author-role">{blog.author.role}</span>
                      </div>

                      <Link to={`/blog/${blog.slug}`} className="bh-read-link" aria-label={`Read ${blog.title}`}>
                        <span>Read article</span>
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Publish Blog Modal Form */}
      {modalOpen && (
        <div className="bh-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bh-modal-window">
            <div className="bh-modal-header">
              <div>
                <span className="bh-kicker"><PenTool size={13} /> CONTRIBUTOR PORTAL</span>
                <h2 id="modal-title">Publish a New Article</h2>
              </div>
              <button
                type="button"
                className="bh-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePublish} className="bh-modal-form">
              {formError && <div className="bh-form-error">{formError}</div>}

              <div className="bh-form-group">
                <label htmlFor="blog-title">Article Title *</label>
                <input
                  id="blog-title"
                  type="text"
                  required
                  placeholder="e.g. Next-Generation Effervescent Formulations for Export..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="bh-form-row">
                <div className="bh-form-group">
                  <label htmlFor="blog-category">Category *</label>
                  <select
                    id="blog-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    {BLOG_CATEGORIES.filter((c) => c !== 'All Articles').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="bh-form-group">
                  <label htmlFor="blog-read-time">Estimated Read Time</label>
                  <input
                    id="blog-read-time"
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="bh-form-row">
                <div className="bh-form-group">
                  <label htmlFor="blog-author-name">Author Name</label>
                  <input
                    id="blog-author-name"
                    type="text"
                    placeholder="e.g. Dr. Rajesh Patel"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                  />
                </div>

                <div className="bh-form-group">
                  <label htmlFor="blog-author-role">Author Role / Title</label>
                  <input
                    id="blog-author-role"
                    type="text"
                    placeholder="e.g. Head of R&D"
                    value={newAuthorRole}
                    onChange={(e) => setNewAuthorRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="bh-form-group">
                <label htmlFor="blog-cover">Cover Image</label>
                <select
                  id="blog-cover"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                >
                  <option value="/assets/gomzi-pages/cat-sports.webp">Sports Nutrition & Whey (/cat-sports.webp)</option>
                  <option value="/assets/gomzi-pages/cat-child.webp">Child & Gummies (/cat-child.webp)</option>
                  <option value="/assets/gomzi-pages/cat-immune.webp">Immune & Effervescent (/cat-immune.webp)</option>
                  <option value="/assets/solutions/global-export.webp">Global Export Port (/global-export.webp)</option>
                  <option value="/assets/solutions/solutions-premix.webp">Premix Blending (/solutions-premix.webp)</option>
                  <option value="/assets/solutions/solutions-packaging.webp">Packaging Line (/solutions-packaging.webp)</option>
                  <option value="/assets/gomzi-pages/cat-gut.webp">Gut Health (/cat-gut.webp)</option>
                </select>
              </div>

              <div className="bh-form-group bh-file-upload">
                <label htmlFor="blog-cover-file">Cover Image (Upload)</label>
                <input
                  id="blog-cover-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="bh-file-input"
                  onChange={handleCoverChange}
                />
                <label className="bh-file-label" htmlFor="blog-cover-file">
                  {newCoverFile ? (
                    <>
                      <span style={{ color: '#172c20', fontWeight: 600 }}>{newCoverFile.name}</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Choose a cover image
                    </>
                  )}
                </label>
                {newCoverFile && <span className="bh-file-name">{newCoverFile.name} ({Math.round(newCoverFile.size / 1024)} KB)</span>}
              </div>

              <div className="bh-form-group">
                <label htmlFor="blog-excerpt">Summary / Excerpt *</label>
                <textarea
                  id="blog-excerpt"
                  rows={2}
                  required
                  placeholder="A concise 1-2 sentence overview of the article..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                />
              </div>

              <div className="bh-form-group">
                <label htmlFor="blog-content">Full Article Content * (Separate paragraphs with double enter)</label>
                <textarea
                  id="blog-content"
                  rows={6}
                  required
                  placeholder="Write the full technical content of the article here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>

              <div className="bh-form-group">
                <label htmlFor="blog-takeaways">Key Takeaways (1 point per line)</label>
                <textarea
                  id="blog-takeaways"
                  rows={3}
                  placeholder="Point 1&#10;Point 2&#10;Point 3"
                  value={newKeyTakeaways}
                  onChange={(e) => setNewKeyTakeaways(e.target.value)}
                />
              </div>

              <div className="bh-form-group">
                <label htmlFor="blog-tags">Tags (Comma-separated)</label>
                <input
                  id="blog-tags"
                  type="text"
                  placeholder="e.g. Whey, Protein, Formulations, Export"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>

              <div className="bh-modal-actions">
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="button button--lime">
                  Publish to Hub <Plus size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certifications Bottom */}
      <Certifications />
    </main>
  );
}

