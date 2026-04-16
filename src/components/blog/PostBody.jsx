import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { trackEvent } from '../../utils/analytics.js';
import {
  getUrlHost,
  isAffiliateUrl,
  isExternalUrl,
  markdownLikelyHasAffiliateLinks,
} from '../../utils/linkAttribution.js';
import './PostBody.css';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="code-copy" onClick={handleCopy} title="Copy code">
      {copied ? (
        <>
          <i className="fas fa-check"></i> Copied
        </>
      ) : (
        <i className="far fa-copy"></i>
      )}
    </button>
  );
};

const PostBody = ({ content, postSlug }) => {
  const hasAffiliateDisclosure = markdownLikelyHasAffiliateLinks(content);

  return (
    <div className="post-body">
      {hasAffiliateDisclosure && (
        <aside
          className="affiliate-disclosure"
          aria-label="Affiliate disclosure"
        >
          Disclosure: Some links in this post may be affiliate links. If you use
          them, I may earn a commission at no extra cost to you.
        </aside>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            return !inline && match ? (
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-lang">{match[1]}</span>
                  <CopyButton text={codeString} />
                </div>
                <pre className="code-block-body" {...props}>
                  <code className={`language-${match[1]}`}>{codeString}</code>
                </pre>
              </div>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          h2: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h3 id={id}>{children}</h3>;
          },
          img: ({ src, alt }) => (
            <figure className="post-figure">
              <img src={src} alt={alt || ''} loading="lazy" />
              {alt && <figcaption>{alt}</figcaption>}
            </figure>
          ),
          blockquote: ({ children }) => (
            <blockquote className="post-quote">{children}</blockquote>
          ),
          a: ({ href, children }) => {
            const external = isExternalUrl(href);
            const affiliate = isAffiliateUrl(href);

            const onTrackedClick = () => {
              if (!external) return;
              trackEvent(
                affiliate ? 'affiliate_link_click' : 'outbound_link_click',
                {
                  href,
                  host: getUrlHost(href),
                  post_slug: postSlug,
                },
              );
            };

            if (!external) {
              return <a href={href}>{children}</a>;
            }

            if (affiliate) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  onClick={onTrackedClick}
                >
                  {children}
                </a>
              );
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onTrackedClick}
              >
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="table-wrapper">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

PostBody.propTypes = {
  content: PropTypes.string.isRequired,
  postSlug: PropTypes.string,
};

export default PostBody;
